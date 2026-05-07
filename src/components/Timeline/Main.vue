<template>
  <v-container class="py-16 timeline-wrapper">
    <div class="text-center mb-16">
      <v-chip color="#D4AF37" variant="elevated" class="mb-4 font-weight-black">THE JOURNEY</v-chip>
      <h1 class="text-h2 font-weight-black color-maroon mb-4">
        {{ isTamil ? 'த.வெ.க-வின் வரலாற்றுப் பயணம்' : 'The TVK Journey' }}
      </h1>
      <p class="text-h6 text-grey-darken-1 max-w-lg mx-auto">
        {{ isTamil ? 'ஆரம்பம் முதல் வெற்றி வரை - எமது கட்சியின் முக்கிய மைல்கற்கள்.' : 'From inception to victory - the key milestones of our revolutionary path.' }}
      </p>
    </div>

    <div class="timeline-container">
      <div v-for="(item, index) in timelineItems" :key="index" 
           class="timeline-item" :class="{ 'item-left': index % 2 === 0, 'item-right': index % 2 !== 0 }">
        
        <!-- Timeline Line & Dot -->
        <div class="timeline-dot-wrapper">
          <div class="timeline-dot"></div>
        </div>

        <!-- Content Card -->
        <v-card class="timeline-card rounded-xl elevation-10 overflow-hidden border-gold-thin"
                data-aos="fade-up" :data-aos-delay="index * 100">
          <div class="timeline-image-wrapper">
            <v-img :src="item.image" cover height="240" class="timeline-img">
              <div class="image-overlay d-flex align-end pa-4">
                <span class="text-h5 font-weight-black text-white glow-text">{{ item.date }}</span>
              </div>
            </v-img>
          </div>
          
          <v-card-text class="pa-6">
            <h3 class="text-h5 font-weight-black color-maroon mb-2">{{ isTamil ? item.title_ta : item.title_en }}</h3>
            <p class="text-body-1 text-grey-darken-2 mb-4">{{ isTamil ? item.desc_ta : item.desc_en }}</p>
            
            <div v-if="item.quote" class="quote-box pa-4 rounded-lg bg-light-maroon border-left-gold">
              <p class="text-body-2 font-italic mb-0">"{{ isTamil ? item.quote_ta : item.quote_en }}"</p>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <!-- Final Victory Marker -->
    <div class="text-center mt-16">
      <v-avatar size="120" color="#800000" class="elevation-10 border-gold-thick mb-4">
        <v-icon color="#D4AF37" size="64">mdi-trophy-variant</v-icon>
      </v-avatar>
      <h2 class="text-h4 font-weight-black color-maroon">
        {{ isTamil ? 'வெற்றி நிச்சயம்!' : 'Victory is Ours!' }}
      </h2>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "PartyTimeline",
  inject: ["currentLang"],
  computed: {
    isTamil() {
      return this.currentLang() === "ta";
    }
  },
  data: () => ({
    timelineItems: [
      {
        date: "FEB 2024",
        title_en: "The Announcement",
        title_ta: "கட்சி அறிவிப்பு",
        desc_en: "Thalapathy Vijay officially announces the formation of Tamilaga Vettri Kazhagam.",
        desc_ta: "தமிழக வெற்றிக் கழகம் என்ற புதிய அரசியல் கட்சியைத் தளபதி விஜய் அதிகாரப்பூர்வமாக அறிவித்தார்.",
        quote_en: "Politics is not a hobby; it is my sacred duty.",
        quote_ta: "அரசியல் எனக்கு ஒரு பொழுதுபோக்கு அல்ல; அது எனது புனிதமான கடமை.",
        image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=2070&auto=format&fit=crop"
      },
      {
        date: "AUG 2024",
        title_en: "Flag & Anthem Reveal",
        title_ta: "கொடி மற்றும் பாடல் அறிமுகம்",
        desc_en: "The iconic Maroon and Gold flag with the Twin Elephants is unveiled to the world.",
        desc_ta: "இரட்டை யானைகள் கொண்ட த.வெ.க-வின் அதிகாரப்பூர்வ கொடி உலகிற்கு அறிமுகப்படுத்தப்பட்டது.",
        quote_en: "Our flag represents social justice and equality.",
        quote_ta: "நமது கொடி சமூக நீதியையும் சமத்துவத்தையும் குறிக்கிறது.",
        image: "https://images.unsplash.com/photo-1521193089946-7aa29d1fe776?q=80&w=2070&auto=format&fit=crop"
      },
      {
        date: "OCT 2025",
        title_en: "Historic Vikkiravandi Conference",
        title_ta: "வரலாற்றுச் சிறப்புமிக்க விக்கிரவாண்டி மாநாடு",
        desc_en: "Over 8 lakh supporters gather for the first-ever state political conference.",
        desc_ta: "8 லட்சத்திற்கும் அதிகமான ஆதரவாளர்கள் பங்கேற்ற த.வெ.க-வின் முதல் மாநில மாநாடு.",
        quote_en: "I am here as your son, your brother, your voice.",
        quote_ta: "நான் இங்கு உங்கள் மகனாக, உங்கள் சகோதரனாக, உங்கள் குரலாக நிற்கிறேன்.",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
      },
      {
        date: "FEB 2026",
        title_en: "Madurai State Conference",
        title_ta: "மதுரை மாநில மாநாடு",
        desc_en: "The second major conference where the party's election strategy was solidified.",
        desc_ta: "மதுரையில் நடைபெற்ற இரண்டாவது மாபெரும் மாநாடு - தேர்தல் வியூகம் வகுக்கப்பட்டது.",
        quote_en: "Tamil Nadu deserves a change, and we are that change.",
        quote_ta: "தமிழகம் ஒரு மாற்றத்தை எதிர்பார்க்கிறது, அந்த மாற்றம் நாமே.",
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd458ad20?q=80&w=2070&auto=format&fit=crop"
      },
      {
        date: "APR 2026",
        title_en: "The Election Victory",
        title_ta: "தேர்தல் வெற்றி",
        desc_en: "TVK sweeps the assembly elections, marking a new era for Tamil Nadu.",
        desc_ta: "சட்டமன்றத் தேர்தலில் த.வெ.க அமோக வெற்றி பெற்று, புதிய சகாப்தத்தைப் படைத்தது.",
        quote_en: "This victory belongs to the people of Tamil Nadu.",
        quote_ta: "இந்த வெற்றி தமிழக மக்கள் ஒவ்வொருவருக்கும் சொந்தமானது.",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop"
      }
    ]
  })
};
</script>

<style scoped>
.timeline-wrapper {
  background: url('https://www.transparenttextures.com/patterns/cubes.png');
}

.timeline-container {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 0;
}

.timeline-container::after {
  content: '';
  position: absolute;
  width: 4px;
  background-color: #D4AF37;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -2px;
  border-radius: 2px;
}

.timeline-item {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
}

.timeline-dot-wrapper {
  position: absolute;
  width: 24px;
  height: 24px;
  right: -12px;
  top: 40px;
  z-index: 10;
}

.timeline-dot {
  width: 100%;
  height: 100%;
  background-color: #800000;
  border: 4px solid #D4AF37;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
}

.item-left { left: 0; }
.item-right { left: 50%; }

.item-right .timeline-dot-wrapper {
  left: -12px;
}

.timeline-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2) !important;
}

.image-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  height: 100%;
}

.quote-box {
  background: rgba(128, 0, 0, 0.05);
}

.border-left-gold {
  border-left: 4px solid #D4AF37;
}

.color-maroon { color: #800000; }
.color-gold { color: #D4AF37; }

.border-gold-thick {
  border: 6px solid #D4AF37 !important;
}

.border-gold-thin {
  border: 1px solid rgba(212, 175, 55, 0.3) !important;
}

@media screen and (max-width: 960px) {
  .timeline-container::after {
    left: 31px;
  }
  .timeline-item {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }
  .item-right {
    left: 0%;
  }
  .timeline-dot-wrapper {
    left: 20px !important;
    right: auto !important;
  }
}
</style>
