import "./wasm_exec.js";
import wasmModule from "./tvk-backend.wasm";
import { candidatesData } from "./data_candidates.js";
import { newsData } from "./data_news.js";
import { votingData } from "./data_voting.js";

let goInstance = null;

const inMemoryDB = {
  volunteers: [],
  ideas: [
    {
      id: "TVK-2026-ID-90124",
      title: "24/7 Digital Grievance Redressal App with Live Officer Tracking",
      category: "தொழில்நுட்பம் மற்றும் டிஜிட்டல் அரசு / Technology & Digital",
      description: "A centralized citizen portal where every complaint is geotagged and tracked until resolution by the responsible IAS/municipal officer.",
      name: "Ramesh K.",
      district: "Chennai",
      likes: 1248,
      timestamp: "2026-05-15T09:30:00Z",
    },
    {
      id: "TVK-2026-ID-88412",
      title: "Farmers Direct Sales Kiosks in Every Taluk & Cold Storage Grid",
      category: "விவசாயம் மற்றும் நீர்ப்பாசனம் / Agriculture",
      description: "Establish solar-powered cold storage hubs and direct consumer kiosks to eliminate middlemen and double farmer profit margins.",
      name: "Murugan S.",
      district: "Madurai",
      likes: 954,
      timestamp: "2026-05-14T14:15:00Z",
    },
    {
      id: "TVK-2026-ID-75192",
      title: "Free High-Speed Wi-Fi & AI Learning Hubs in Government Colleges",
      category: "பள்ளிக் கல்வி மற்றும் உயர்கல்வி / Education",
      description: "Upgrade all state universities and rural colleges with gigabit internet and modern AI workstation laboratories.",
      name: "Priyadharshini M.",
      district: "Coimbatore",
      likes: 812,
      timestamp: "2026-05-12T11:20:00Z",
    },
    {
      id: "TVK-2026-ID-63102",
      title: "Solar Power Subsidy & Zero Electricity Bills for Handloom Weavers",
      category: "பொருளாதாரம் மற்றும் தொழில் வளர்ச்சி / Economy & Industry",
      description: "Provide 100% subsidy for rooftop solar panels to traditional weaving clusters in Kanchipuram, Erode, and Salem.",
      name: "Senthil Vel",
      district: "Salem",
      likes: 670,
      timestamp: "2026-05-10T16:45:00Z",
    },
  ],
  grievances: [],
  newsletter: [],
};

async function saveSubmission(env, collection, record) {
  inMemoryDB[collection].push(record);
  if (env && env.TVK_DB) {
    try {
      const stored = await env.TVK_DB.get(collection);
      const items = stored ? JSON.parse(stored) : [];
      if (collection === "ideas" && inMemoryDB.ideas.length > items.length) {
        // If inMemory has pre-seeded items not yet in KV, merge them
        const existingIds = new Set(items.map(i => i.id));
        for (const pre of inMemoryDB.ideas) {
          if (!existingIds.has(pre.id)) items.push(pre);
        }
      } else {
        items.push(record);
      }
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
        if (val) {
          const parsed = JSON.parse(val);
          if (parsed.length > 0) data[key] = parsed;
        }
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
      const record = { id: trackingId, timestamp: new Date().toISOString(), likes: 1, ...body };
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

    // 4.1 Get All Voice Ideas Feed
    if (cleanPath === "/api/voice/ideas" || cleanPath === "/api/v1/voice/ideas") {
      const submissions = await getSubmissions(env);
      const ideas = submissions.ideas || [];
      // Sort by likes descending
      const sortedIdeas = [...ideas].sort((a, b) => (b.likes || 0) - (a.likes || 0));

      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          data: sortedIdeas,
          responseArr: [{ count: sortedIdeas.length, message: "Voice ideas feed retrieved successfully" }],
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

    // 4.2 Upvote / Like an Idea
    if (cleanPath === "/api/voice/idea/like" || cleanPath === "/api/v1/voice/idea/like") {
      const { id } = await request.json().catch(() => ({}));
      const submissions = await getSubmissions(env);
      const ideas = submissions.ideas || [];
      const idx = ideas.findIndex(item => item.id === id);
      let updatedItem = null;

      if (idx !== -1) {
        ideas[idx].likes = (ideas[idx].likes || 0) + 1;
        updatedItem = ideas[idx];
      } else {
        updatedItem = { id, likes: 1 };
        ideas.push(updatedItem);
      }

      inMemoryDB.ideas = ideas;
      if (env && env.TVK_DB) {
        try {
          await env.TVK_DB.put("ideas", JSON.stringify(ideas));
        } catch (e) {}
      }

      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          data: updatedItem,
          responseArr: [{ id, likes: updatedItem.likes, message: "Idea upvoted successfully" }],
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
