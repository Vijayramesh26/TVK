import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// Enable Global CORS for frontend communication
app.use("/*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

// In-Memory Fallback State in case KV is not bound during local dev
let memoryStore = {
  ideasCount: 14285,
  resolvedCount: 9840,
  activeCount: 1240,
  volunteersCount: 25480,
  subscribersCount: 18500,
  ideas: [],
  grievances: [],
  volunteers: [],
  subscribers: []
};

// Helper to access KV or Fallback Memory Store
const getStore = async (env) => {
  if (env.TVK_KV) {
    try {
      const stats = await env.TVK_KV.get("stats", { type: "json" });
      if (stats) return stats;
    } catch (e) {
      console.error("KV get error:", e);
    }
  }
  return memoryStore;
};

const saveStore = async (env, data) => {
  if (env.TVK_KV) {
    try {
      await env.TVK_KV.put("stats", JSON.stringify(data));
    } catch (e) {
      console.error("KV put error:", e);
    }
  } else {
    memoryStore = data;
  }
};

// 1. Healthcheck Endpoint
app.get("/api/health", (c) => {
  return c.json({
    status: "online",
    timestamp: new Date().toISOString(),
    service: "TVK Cloudflare Edge API",
    version: "1.0.0",
    edgeLocation: c.req.raw.cf ? c.req.raw.cf.colo : "LOCAL_DEV"
  });
});

// 2. Global Statistics Endpoint
app.get("/api/stats", async (c) => {
  const store = await getStore(c.env);
  return c.json({
    success: true,
    data: {
      ideasCount: store.ideasCount,
      resolvedCount: store.resolvedCount,
      activeCount: store.activeCount,
      volunteersCount: store.volunteersCount,
      subscribersCount: store.subscribersCount
    }
  });
});

// 3. Citizen Voice - Submit Idea
app.post("/api/voice/idea", async (c) => {
  try {
    const body = await c.req.json();
    const store = await getStore(c.env);
    
    const trackingId = `TVK-2026-ID-${Math.floor(100000 + Math.random() * 900000)}`;
    const newIdea = {
      trackingId,
      name: body.name,
      phone: body.phone,
      district: body.district,
      category: body.category,
      description: body.description,
      submittedAt: new Date().toISOString()
    };

    store.ideasCount += 1;
    store.ideas = store.ideas || [];
    store.ideas.push(newIdea);
    await saveStore(c.env, store);

    return c.json({
      success: true,
      trackingId,
      message: "Idea submitted successfully to CM Special Cell."
    }, 201);
  } catch (error) {
    return c.json({ success: false, error: error.message }, 400);
  }
});

// 4. Citizen Voice - Submit Grievance / Complaint
app.post("/api/voice/grievance", async (c) => {
  try {
    const body = await c.req.json();
    const store = await getStore(c.env);
    
    const trackingId = `TVK-2026-GR-${Math.floor(100000 + Math.random() * 900000)}`;
    const newGrievance = {
      trackingId,
      name: body.name,
      phone: body.phone,
      district: body.district,
      category: body.category,
      priority: body.priority,
      description: body.description,
      status: "Submitted",
      submittedAt: new Date().toISOString()
    };

    store.activeCount += 1;
    store.grievances = store.grievances || [];
    store.grievances.push(newGrievance);
    await saveStore(c.env, store);

    return c.json({
      success: true,
      trackingId,
      message: "Grievance registered successfully."
    }, 201);
  } catch (error) {
    return c.json({ success: false, error: error.message }, 400);
  }
});

// 5. Volunteer Registration
app.post("/api/volunteer/register", async (c) => {
  try {
    const body = await c.req.json();
    const store = await getStore(c.env);
    
    const memberId = `TVK-VOL-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const newVolunteer = {
      memberId,
      name: body.name,
      phone: body.phone,
      age: body.age,
      gender: body.gender,
      district: body.district,
      booth: body.booth,
      skills: body.skills,
      registeredAt: new Date().toISOString()
    };

    store.volunteersCount += 1;
    store.volunteers = store.volunteers || [];
    store.volunteers.push(newVolunteer);
    await saveStore(c.env, store);

    return c.json({
      success: true,
      memberId,
      message: "Volunteer registered successfully."
    }, 201);
  } catch (error) {
    return c.json({ success: false, error: error.message }, 400);
  }
});

// 6. Newsletter Subscription
app.post("/api/newsletter", async (c) => {
  try {
    const body = await c.req.json();
    const store = await getStore(c.env);
    
    if (!body.email || !body.email.includes("@")) {
      return c.json({ success: false, message: "Invalid email" }, 400);
    }

    store.subscribersCount += 1;
    store.subscribers = store.subscribers || [];
    store.subscribers.push({ email: body.email, subscribedAt: new Date().toISOString() });
    await saveStore(c.env, store);

    return c.json({
      success: true,
      message: "Successfully subscribed to TVK newsletter."
    }, 200);
  } catch (error) {
    return c.json({ success: false, error: error.message }, 400);
  }
});

export default {
  fetch: app.fetch,
};
