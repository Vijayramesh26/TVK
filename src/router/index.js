import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/Home/Main.vue"),
    meta: {
      title: "TVK Official Page | தமிழக வெற்றிக் கழகம் | Thalapathy Vijay",
      description:
        "The official website of TVK (தமிழக வெற்றிக் கழகம்). Led by Thalapathy Vijay, aiming for secular social justice and development. | தளபதி விஜய் அவர்களின் த.வெ.க அதிகாரப்பூர்வ தளம்.",
    },
  },
  {
    path: "/results",
    name: "Results",
    component: () => import("../components/Results/Main.vue"),
    meta: {
      title:
        "TVK Election Results 2026 | தேர்தல் முடிவுகள் | Official Polling Stats",
      description:
        "Official 2026 Tamil Nadu Election results and polling statistics for TVK. Explore constituency-wise voting data. | த.வெ.க 2026 தேர்தல் முடிவுகள் மற்றும் புள்ளிவிவரங்கள்.",
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../components/Dashboard/Main.vue"),
    meta: {
      title: "TVK Dashboard | த.வெ.க நிர்வாகக் குழு & Stats | High-Command",
      description:
        "Official TVK administration and statistics dashboard. Explore the growth of Tamilaga Vettri Kazhagam. | த.வெ.க நிர்வாகம் மற்றும் புள்ளிவிவரங்கள்.",
    },
  },
  {
    path: "/create",
    name: "PosterCreator",
    component: () => import("../components/PosterCreator/Main.vue"),
    meta: {
      title:
        "TVK Canvas Poster Creator | போஸ்டர் உருவாக்கம் | Official Materials",
      description:
        "Design official TVK campaign posters with our Canvas Creator. Supporting Thalapathy Vijay 2026. | த.வெ.க அதிகாரப்பூர்வ தேர்தல் போஸ்டர் உருவாக்கம்.",
    },
  },
  {
    path: "/letter",
    name: "LetterCreator",
    component: () => import("../components/LetterCreator/Main.vue"),
    meta: {
      title: "TVK Official Letter Creator | கடித உருவாக்கம் | Press Releases",
      description:
        "Draft and generate official TVK press releases and letters. Support Thalapathy Vijay. | த.வெ.க அதிகாரப்பூர்வ பத்திரிகைச் செய்தி உருவாக்கம்.",
    },
  },
  {
    path: "/candidates",
    name: "Candidates",
    component: () => import("../components/Candidates/Main.vue"),
    meta: {
      title:
        "TVK 2026 Candidates List | த.வெ.க வேட்பாளர்கள் | Assembly Nominees",
      description:
        "List of TVK candidates for the 2026 Tamil Nadu Assembly Elections. Meet our representatives. | 2026 சட்டமன்றத் தேர்தலுக்கான த.வெ.க வேட்பாளர் பட்டியல்.",
    },
  },
  {
    path: "/news",
    name: "NewsArchive",
    component: () => import("../components/News/Archive.vue"),
    meta: {
      title: "TVK News Archive | செய்திக் களஞ்சியம் | Official Press Releases",
      description:
        "The complete archive of Tamilaga Vettri Kazhagam news, press releases, and historical milestones. | த.வெ.க-வின் அனைத்துச் செய்திகளின் தொகுப்பு.",
    },
  },
  {
    path: "/kolgai",
    name: "Ideology",
    component: () => import("../components/Ideology/Main.vue"),
    meta: {
      title:
        "TVK Manifesto (Kolgai) 2026 | கொள்கைகள் & வாக்குறுதிகள் | TVK Policies",
      description:
        "Official TVK Manifesto (கொள்கை) 2026. Social justice, economy, and education vision. | த.வெ.க-வின் அதிகாரப்பூர்வ கொள்கைகள் மற்றும் வாக்குறுதிகள்.",
    },
  },
  {
    path: "/news/:slug",
    name: "NewsDetail",
    component: () => import("../components/News/Detail.vue"),
    props: true,
    meta: {
      title: "TVK News | த.வெ.க செய்திகள் | Press Release",
      description:
        "Detailed official news and press releases from Tamilaga Vettri Kazhagam. Speech transcripts and meeting updates. | த.வெ.க-வின் அதிகாரப்பூர்வ செய்திகள்.",
    },
  },
  {
    path: "/supporter-card",
    name: "SupporterCard",
    component: () => import("../components/IDCardCreator/Main.vue"),
    meta: {
      title: "TVK Supporter Card | ஆதரவாளர் அட்டை | Membership ID",
      description:
        "Create your official TVK Digital Supporter Card. | த.வெ.க டிஜிட்டல் ஆதரவாளர் அட்டை உருவாக்கம்.",
    },
  },
  {
    path: "/quotes",
    name: "QuoteGenerator",
    component: () => import("../components/QuoteGenerator/Main.vue"),
    meta: {
      title: "TVK Daily Inspiration | தளபதியின் பொன்மொழிகள் | Official Quotes",
      description:
        "Daily powerful quotes from Thalapathy Vijay. | தளபதி விஜய் அவர்களின் எழுச்சிமிகு பொன்மொழிகள்.",
    },
  },
  {
    path: "/journey",
    name: "Timeline",
    component: () => import("../components/Timeline/Main.vue"),
    meta: {
      title: "TVK Journey | த.வெ.க வரலாற்றுப் பயணம் | Party Timeline",
      description:
        "The historic journey of Tamilaga Vettri Kazhagam. | தமிழக வெற்றிக் கழகத்தின் வரலாற்றுப் பயணம்.",
    },
  },
  {
    path: "/search",
    name: "AISearch",
    component: () => import("../components/AISearch/Main.vue"),
    meta: {
      title: "TVK AI Archive | தளபதி ஆவணக் காப்பகம் | Speech Search",
      description:
        "AI-powered search for Thalapathy Vijay's speeches and vision. | தளபதியின் உரைகளைத் தேடுங்கள்.",
    },
  },
  {
    path: "/voice",
    name: "VoicePortal",
    component: () => import("../components/Voice/Main.vue"),
    meta: {
      title: "TVK Citizen Voice | மக்கள் களம் | Ideas & Grievance Redressal",
      description:
        "Submit governance ideas and file official grievances directly with the CM Special Cell. | உங்கள் யோசனைகள் மற்றும் குறைகளை முதலமைச்சர் தனிப்பிரிவிடம் சமர்ப்பியுங்கள்.",
    },
  },
  {
    path: "/volunteer",
    name: "VolunteerPortal",
    component: () => import("../components/Volunteer/Main.vue"),
    meta: {
      title: "TVK Volunteer Force | தன்னார்வலர் படை | Youth Brigade Registration",
      description:
        "Join the grassroots movement for political transformation in Tamil Nadu. | தமிழகத்தின் அரசியல் மாற்றத்திற்கான களப்பணியில் இணையுங்கள்.",
    },
  },
  {
    path: "/schemes",
    name: "SchemesPortal",
    component: () => import("../components/Schemes/Main.vue"),
    meta: {
      title: "TVK Government Schemes | அரசு திட்டங்கள் & தகுதி அறியும் கருவி",
      description:
        "Explore Chief Minister Thalapathy Vijay's flagship welfare schemes and check your eligibility. | முதலமைச்சரின் முன்னோடித் திட்டங்கள் மற்றும் தகுதி அறியும் கருவி.",
    },
  },
  {
    path: "/connect",
    name: "ConnectPortal",
    component: () => import("../components/Connect/Main.vue"),
    meta: {
      title: "TVK Constituency Connect | தொகுதி இணைப்பு | Local Community Hub",
      description:
        "Connect with local TVK WhatsApp groups, district secretaries, and local branch events. | உங்கள் தொகுதி வாட்ஸ்அப் குழுக்கள் மற்றும் நிகழ்வுகளை அறியுங்கள்.",
    },
  },
  {
    path: "/voter-slip",
    name: "VoterSlip",
    component: () => import("../components/VoterSlip/Main.vue"),
    meta: {
      title: "TVK Digital Booth Slip | வாக்காளர் பூத் சீட்டு | Polling Details",
      description:
        "Generate your official TVK Digital Voter Booth Slip and check your polling station details instantly.",
    },
  },
  {
    path: "/vision-2026",
    name: "Vision2026",
    component: () => import("../components/Vision/Main.vue"),
    meta: {
      title: "TVK Vision 2026-2030 | தொலைநோக்கு திட்டங்கள் | Executive Roadmap",
      description:
        "Explore Chief Minister Thalapathy Vijay's First 100 Days Executive Action Plan and key flagship governance pillars.",
    },
  },
  {
    path: "/grievances",
    alias: "/grievance-dashboard",
    name: "GrievanceDashboard",
    component: () => import("../components/GrievanceDashboard/Main.vue"),
    meta: {
      title: "TVK Grievance Redressal Dashboard | மக்கள் குறைதீர்வு மையம்",
      description:
        "Track real-time status of citizen grievances and inspect direct remedial actions taken by responsible IAS and departmental officers.",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
