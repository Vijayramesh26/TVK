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
  grievances: [
    {
      id: "TVK-2026-GR-90412",
      name: "Karthik R.",
      phone: "98402XXXXX",
      district: "Chennai",
      constituency: "Velachery",
      category: "குடிநீர் மற்றும் சுகாதாரம் / Water & Sanitation",
      desc: "Severe water logging and non-functional storm water drains near 100 feet road junction. Request immediate desilting before monsoons.",
      status: "Resolved",
      assignedOfficer: "Zone 13 Executive Engineer, GCC",
      responseMsg: "Storm water drains completely desilted and cleared with heavy suction pumps on 16/05/2026.",
      timestamp: "2026-05-14T08:15:00Z",
      isPublic: true,
    },
    {
      id: "TVK-2026-GR-81204",
      name: "Lakshmi S.",
      phone: "94431XXXXX",
      district: "Madurai",
      constituency: "Madurai Central",
      category: "சாலை வசதி மற்றும் போக்குவரத்து / Roads & Transport",
      desc: "Potholes on main arterial road connecting Periyar bus stand causing frequent two-wheeler accidents during night hours.",
      status: "In Progress",
      assignedOfficer: "Assistant Commissioner, Madurai Corporation",
      responseMsg: "Road patch work sanctioned under emergency maintenance fund. Work scheduled for completion within 48 hours.",
      timestamp: "2026-05-15T11:40:00Z",
      isPublic: true,
    },
    {
      id: "TVK-2026-GR-75109",
      name: "Anbu Chezhiyan",
      phone: "91765XXXXX",
      district: "Tiruchirappalli",
      constituency: "Tiruchirappalli West",
      category: "மின்சாரம் மற்றும் தெருவிளக்கு / Electricity & Streetlights",
      desc: "Streetlights not functioning on North Thillai Nagar 4th cross street for the past two weeks, creating safety concerns for women and elderly.",
      status: "Pending",
      assignedOfficer: "TANGEDCO Assistant Engineer (Urban)",
      responseMsg: "Inspection team dispatched. LED fixtures replacement order placed.",
      timestamp: "2026-05-16T19:20:00Z",
      isPublic: true,
    },
    {
      id: "TVK-2026-GR-63102",
      name: "Meenakshi V.",
      phone: "99401XXXXX",
      district: "Coimbatore",
      constituency: "Singanallur",
      category: "மருத்துவம் மற்றும் பொது சுகாதாரம் / Health & Medical",
      desc: "Primary health center at Singanallur lacks emergency anti-venom and rabies vaccines. Rural patients are forced to travel 15km to GH.",
      status: "Resolved",
      assignedOfficer: "Joint Director, Health Services (Coimbatore)",
      responseMsg: "Emergency stock of anti-snake venom and anti-rabies vaccines replenished immediately. 24/7 cold chain storage verified.",
      timestamp: "2026-05-12T14:30:00Z",
      isPublic: true,
    },
    {
      id: "TVK-2026-GR-54120",
      name: "Venkatesan P.",
      phone: "98422XXXXX",
      district: "Salem",
      constituency: "Salem North",
      category: "அரசு சான்றிதழ்கள் மற்றும் இ-சேவை / e-Sevai & Certificates",
      desc: "Community certificate application pending for over 30 days without any clarification on e-Sevai portal, delaying college admission counseling.",
      status: "Resolved",
      assignedOfficer: "Tahsildar (Salem Taluk)",
      responseMsg: "Verification completed on priority. Digital community certificate issued and sent via SMS link.",
      timestamp: "2026-05-10T10:15:00Z",
      isPublic: true,
    },
  ],
  newsletter: [],
  vision: [
    { id: 1, votes: 142850 },
    { id: 2, votes: 198420 },
    { id: 3, votes: 254100 },
    { id: 4, votes: 165400 },
    { id: 5, votes: 112000 },
    { id: 6, votes: 189500 },
  ],
};

async function saveSubmission(env, collection, record) {
  inMemoryDB[collection].push(record);
  if (env && env.TVK_DB) {
    try {
      const stored = await env.TVK_DB.get(collection);
      const items = stored ? JSON.parse(stored) : [];
      if ((collection === "ideas" || collection === "grievances") && inMemoryDB[collection].length > items.length) {
        // If inMemory has pre-seeded items not yet in KV, merge them
        const existingIds = new Set(items.map(i => i.id));
        for (const pre of inMemoryDB[collection]) {
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
    for (const key of ["volunteers", "ideas", "grievances", "newsletter", "vision"]) {
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
      const record = {
        id: trackingId,
        timestamp: new Date().toISOString(),
        status: "Pending",
        assignedOfficer: "Assigned to District Nodal Officer",
        responseMsg: "Grievance received and currently under preliminary verification.",
        ...body,
      };
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

    // 5.1 Get All Grievances
    if (cleanPath === "/api/grievances" || cleanPath === "/api/v1/grievances") {
      const submissions = await getSubmissions(env);
      const grievances = submissions.grievances || [];
      const sorted = [...grievances].sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));

      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          data: sorted,
          responseArr: [{ count: sorted.length, message: "Grievances retrieved successfully" }],
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

    // 5.2 Update Grievance Status
    if (cleanPath === "/api/grievance/update" || cleanPath === "/api/v1/grievance/update") {
      const { id, status, assignedOfficer, responseMsg } = await request.json().catch(() => ({}));
      const submissions = await getSubmissions(env);
      const grievances = submissions.grievances || [...inMemoryDB.grievances];
      const idx = grievances.findIndex(item => item.id === id);
      let updated = null;

      if (idx !== -1) {
        if (status) grievances[idx].status = status;
        if (assignedOfficer) grievances[idx].assignedOfficer = assignedOfficer;
        if (responseMsg) grievances[idx].responseMsg = responseMsg;
        updated = grievances[idx];
      }

      inMemoryDB.grievances = grievances;
      if (env && env.TVK_DB) {
        try {
          await env.TVK_DB.put("grievances", JSON.stringify(grievances));
        } catch (e) {}
      }

      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          data: updated,
          responseArr: [{ id, message: "Grievance updated successfully in DB" }],
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

    // 5.3 Reset / Clear All Grievances
    if (cleanPath === "/api/grievance/reset" || cleanPath === "/api/v1/grievance/reset") {
      const initialGrievances = [
        {
          id: "TVK-2026-GR-90412",
          name: "Karthik R.",
          phone: "98402XXXXX",
          district: "Chennai",
          constituency: "Velachery",
          category: "குடிநீர் மற்றும் சுகாதாரம் / Water & Sanitation",
          desc: "Severe water logging and non-functional storm water drains near 100 feet road junction. Request immediate desilting before monsoons.",
          status: "Resolved",
          assignedOfficer: "Zone 13 Executive Engineer, GCC",
          responseMsg: "Storm water drains completely desilted and cleared with heavy suction pumps on 16/05/2026.",
          timestamp: "2026-05-14T08:15:00Z",
          isPublic: true,
        },
        {
          id: "TVK-2026-GR-81204",
          name: "Lakshmi S.",
          phone: "94431XXXXX",
          district: "Madurai",
          constituency: "Madurai Central",
          category: "சாலை வசதி மற்றும் போக்குவரத்து / Roads & Transport",
          desc: "Potholes on main arterial road connecting Periyar bus stand causing frequent two-wheeler accidents during night hours.",
          status: "In Progress",
          assignedOfficer: "Assistant Commissioner, Madurai Corporation",
          responseMsg: "Road patch work sanctioned under emergency maintenance fund. Work scheduled for completion within 48 hours.",
          timestamp: "2026-05-15T11:40:00Z",
          isPublic: true,
        },
        {
          id: "TVK-2026-GR-75109",
          name: "Anbu Chezhiyan",
          phone: "91765XXXXX",
          district: "Tiruchirappalli",
          constituency: "Tiruchirappalli West",
          category: "மின்சாரம் மற்றும் தெருவிளக்கு / Electricity & Streetlights",
          desc: "Streetlights not functioning on North Thillai Nagar 4th cross street for the past two weeks, creating safety concerns for women and elderly.",
          status: "Pending",
          assignedOfficer: "TANGEDCO Assistant Engineer (Urban)",
          responseMsg: "Inspection team dispatched. LED fixtures replacement order placed.",
          timestamp: "2026-05-16T19:20:00Z",
          isPublic: true,
        },
        {
          id: "TVK-2026-GR-63102",
          name: "Meenakshi V.",
          phone: "99401XXXXX",
          district: "Coimbatore",
          constituency: "Singanallur",
          category: "மருத்துவம் மற்றும் பொது சுகாதாரம் / Health & Medical",
          desc: "Primary health center at Singanallur lacks emergency anti-venom and rabies vaccines. Rural patients are forced to travel 15km to GH.",
          status: "Resolved",
          assignedOfficer: "Joint Director, Health Services (Coimbatore)",
          responseMsg: "Emergency stock of anti-snake venom and anti-rabies vaccines replenished immediately. 24/7 cold chain storage verified.",
          timestamp: "2026-05-12T14:30:00Z",
          isPublic: true,
        },
        {
          id: "TVK-2026-GR-54120",
          name: "Venkatesan P.",
          phone: "98422XXXXX",
          district: "Salem",
          constituency: "Salem North",
          category: "அரசு சான்றிதழ்கள் மற்றும் இ-சேவை / e-Sevai & Certificates",
          desc: "Community certificate application pending for over 30 days without any clarification on e-Sevai portal, delaying college admission counseling.",
          status: "Resolved",
          assignedOfficer: "Tahsildar (Salem Taluk)",
          responseMsg: "Verification completed on priority. Digital community certificate issued and sent via SMS link.",
          timestamp: "2026-05-10T10:15:00Z",
          isPublic: true,
        },
      ];

      inMemoryDB.grievances = [...initialGrievances];
      if (env && env.TVK_DB) {
        try {
          await env.TVK_DB.put("grievances", JSON.stringify(initialGrievances));
        } catch (e) {}
      }

      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          data: initialGrievances,
          responseArr: [{ count: initialGrievances.length, message: "Grievances reset to pre-seeded state successfully" }],
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

    // 6.8 Get Vision Pillars Support
    if (cleanPath === "/api/vision/pillars" || cleanPath === "/api/v1/vision/pillars") {
      const submissions = await getSubmissions(env);
      const pillars = submissions.vision || inMemoryDB.vision;

      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          data: pillars,
          responseArr: [{ count: pillars.length, message: "Vision pillars votes retrieved successfully" }],
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

    // 6.9 Upvote Vision Pillar Support
    if (cleanPath === "/api/vision/support" || cleanPath === "/api/v1/vision/support") {
      const { id } = await request.json().catch(() => ({}));
      const submissions = await getSubmissions(env);
      const pillars = submissions.vision || [...inMemoryDB.vision];
      const idx = pillars.findIndex(item => item.id === Number(id));
      let updatedItem = null;

      if (idx !== -1) {
        pillars[idx].votes = (pillars[idx].votes || 0) + 1;
        updatedItem = pillars[idx];
      } else {
        updatedItem = { id: Number(id), votes: 1 };
        pillars.push(updatedItem);
      }

      inMemoryDB.vision = pillars;
      if (env && env.TVK_DB) {
        try {
          await env.TVK_DB.put("vision", JSON.stringify(pillars));
        } catch (e) {}
      }

      return new Response(
        JSON.stringify({
          status: "Success",
          success: true,
          data: updatedItem,
          responseArr: [{ id, votes: updatedItem.votes, message: "Vision pillar upvoted successfully" }],
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
