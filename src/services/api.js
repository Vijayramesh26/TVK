// Cloudflare Edge Worker API Client Service

// Set your deployed Cloudflare URL or local Go server here (or via .env: VITE_API_BASE_URL)
const API_BASE = import.meta.env?.VITE_API_BASE_URL || "https://tvk-golang-backend.vijay26301.workers.dev";

export const apiService = {
  /**
   * Health Check
   */
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/api/health`);
      return await res.json();
    } catch (e) {
      return { status: "offline", service: "TVK Simulated Edge API" };
    }
  },

  /**
   * Get Global Stats
   */
  async getStats() {
    try {
      const res = await fetch(`${API_BASE}/api/stats`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) return data.data;
      }
    } catch (e) {
      // Fallback to simulated data
    }
    return {
      ideasCount: 14285,
      resolvedCount: 9840,
      activeCount: 1240,
      volunteersCount: 25480,
      subscribersCount: 18500,
    };
  },

  /**
   * Submit Citizen Idea
   */
  async submitIdea(ideaData) {
    try {
      const res = await fetch(`${API_BASE}/api/voice/idea`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ideaData),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Graceful fallback
    }
    const trackingId = `TVK-2026-ID-${Math.floor(100000 + Math.random() * 900000)}`;
    return { success: true, trackingId, simulated: true };
  },

  /**
   * Submit Grievance / Complaint
   */
  async submitGrievance(grievanceData) {
    try {
      const res = await fetch(`${API_BASE}/api/voice/grievance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(grievanceData),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Graceful fallback
    }
    const trackingId = `TVK-2026-GR-${Math.floor(100000 + Math.random() * 900000)}`;
    return { success: true, trackingId, simulated: true };
  },

  /**
   * Register Volunteer
   */
  async registerVolunteer(volunteerData) {
    try {
      const res = await fetch(`${API_BASE}/api/volunteer/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volunteerData),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Graceful fallback
    }
    const memberId = `TVK-VOL-${Math.floor(1000000 + Math.random() * 9000000)}`;
    return { success: true, memberId, simulated: true };
  },

  /**
   * Subscribe Newsletter
   */
  async subscribeNewsletter(email) {
    try {
      const res = await fetch(`${API_BASE}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Graceful fallback
    }
    return { success: true, message: "Successfully subscribed", simulated: true };
  },

  /**
   * Get Static News Data
   */
  async getNewsData() {
    try {
      const res = await fetch(`${API_BASE}/api/data/news`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) return data.data;
      }
    } catch (e) {
      // Fallback
    }
    return null;
  },

  /**
   * Get Static Candidates Data
   */
  async getCandidatesData() {
    try {
      const res = await fetch(`${API_BASE}/api/data/candidates`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) return data.data;
      }
    } catch (e) {
      // Fallback
    }
    return null;
  },

  /**
   * Get Static Voting Data
   */
  async getVotingData() {
    try {
      const res = await fetch(`${API_BASE}/api/data/voting`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) return data.data;
      }
    } catch (e) {
      // Fallback
    }
    return null;
  },
};

