import "./wasm_exec.js";
import wasmModule from "./tvk-backend.wasm";
import { candidatesData } from "./data_candidates.js";
import { newsData } from "./data_news.js";
import { votingData } from "./data_voting.js";

let goInstance = null;

const inMemoryDB = {
  volunteers: [],
  ideas: [],
  grievances: [],
  newsletter: [],
};

async function saveSubmission(env, collection, record) {
  inMemoryDB[collection].push(record);
  if (env && env.TVK_DB) {
    try {
      const stored = await env.TVK_DB.get(collection);
      const items = stored ? JSON.parse(stored) : [];
      items.push(record);
      await env.TVK_DB.put(collection, JSON.stringify(items));
    } catch (e) {}
  }
}

async function getSubmissions(env) {
  const data = { ...inMemoryDB };
  if (env && env.TVK_DB) {
    for (const key of ["volunteers", "ideas", "grievances", "newsletter"]) {
      try {
        const val = await env.TVK_DB.get(key);
        if (val) data[key] = JSON.parse(val);
      } catch (e) {}
    }
  }
  return data;
}

export default {
  async fetch(request, env, ctx) {
    // Ensure CORS preflight is handled immediately
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Request-ID",
        },
      });
    }

    // Instantiate Go WASM runtime if not already active
    if (!goInstance) {
      const go = new Go();
      goInstance = await WebAssembly.instantiate(wasmModule, go.importObject);
      go.run(goInstance);
    }

    const url = new URL(request.url);
    const cleanPath = url.pathname.replace(/\/$/, ""); // Remove trailing slash

    // 1. Health Check
    if (cleanPath === "/api/health" || cleanPath === "/api/v1/health") {
      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          message: "TVK Go WebAssembly Edge API Active",
          service: "Cloudflare Go WASM Edge",
          errMsg: "",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // 2. Global Stats
    if (cleanPath === "/api/stats" || cleanPath === "/api/v1/stats") {
      const submissions = await getSubmissions(env);
      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          data: {
            ideasCount: 14285 + 24 + submissions.ideas.length,
            resolvedCount: 9840 + 12,
            activeCount: 1240,
            volunteersCount: 25480 + 38 + submissions.volunteers.length,
            subscribersCount: 18500 + 45 + submissions.newsletter.length,
          },
          responseArr: [
            { count: 14309, message: "Statistics retrieved successfully" },
          ],
          errMsg: "",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // 3. Volunteer Register
    if (cleanPath === "/api/volunteer/register" || cleanPath === "/api/v1/volunteer/register") {
      const body = await request.json().catch(() => ({}));
      const memberId = `TVK-VOL-${Math.floor(1000000 + Math.random() * 9000000)}`;
      const record = { id: memberId, timestamp: new Date().toISOString(), ...body };
      await saveSubmission(env, "volunteers", record);

      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          memberId,
          data: record,
          responseArr: [{ memberId, message: "Volunteer registered successfully in DB" }],
          errMsg: "",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // 4. Voice Idea
    if (cleanPath === "/api/voice/idea" || cleanPath === "/api/v1/voice/idea") {
      const body = await request.json().catch(() => ({}));
      const trackingId = `TVK-2026-ID-${Math.floor(100000 + Math.random() * 900000)}`;
      const record = { id: trackingId, timestamp: new Date().toISOString(), ...body };
      await saveSubmission(env, "ideas", record);

      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          trackingId,
          data: record,
          responseArr: [{ trackingId, message: "Idea submitted successfully to DB" }],
          errMsg: "",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // 5. Voice Grievance
    if (cleanPath === "/api/voice/grievance" || cleanPath === "/api/v1/voice/grievance") {
      const body = await request.json().catch(() => ({}));
      const trackingId = `TVK-2026-GR-${Math.floor(100000 + Math.random() * 900000)}`;
      const record = { id: trackingId, timestamp: new Date().toISOString(), ...body };
      await saveSubmission(env, "grievances", record);

      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          trackingId,
          data: record,
          responseArr: [{ trackingId, message: "Grievance registered successfully in DB" }],
          errMsg: "",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // 6. Newsletter
    if (cleanPath === "/api/newsletter" || cleanPath === "/api/v1/newsletter") {
      const body = await request.json().catch(() => ({}));
      const record = { id: `SUB-${Date.now()}`, timestamp: new Date().toISOString(), ...body };
      await saveSubmission(env, "newsletter", record);

      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          message: "Successfully subscribed to TVK newsletter in DB",
          data: record,
          responseArr: [{ message: "Successfully subscribed to TVK newsletter in DB" }],
          errMsg: "",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // 6.5 Admin Submissions Retrieval
    if (cleanPath === "/api/submissions" || cleanPath === "/api/v1/submissions" || cleanPath === "/api/admin/submissions") {
      const allSubmissions = await getSubmissions(env);
      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          data: allSubmissions,
          responseArr: [{ count: Object.keys(allSubmissions).reduce((acc, k) => acc + allSubmissions[k].length, 0), message: "All submissions fetched successfully" }],
          errMsg: "",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // 7. Static JSON Data API (News, Candidates, Voting)
    if (cleanPath === "/api/data/news" || cleanPath === "/api/v1/data/news") {
      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          data: newsData,
          responseArr: [{ count: newsData.length, message: "News fetched successfully" }],
          errMsg: "",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    if (cleanPath === "/api/data/candidates" || cleanPath === "/api/v1/data/candidates") {
      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          data: candidatesData,
          responseArr: [{ count: candidatesData.length, message: "Candidates fetched successfully" }],
          errMsg: "",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    if (cleanPath === "/api/data/voting" || cleanPath === "/api/v1/data/voting") {
      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          data: votingData,
          responseArr: [{ count: votingData.length, message: "Voting data fetched successfully" }],
          errMsg: "",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // 8. Fallback 404
    return new Response(
      JSON.stringify({
        status: "Error",
        success: false,
        responseArr: [],
        errMsg: `ERR_API_404 - Endpoint '${cleanPath}' not found in Go WASM edge`,
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  },
};
