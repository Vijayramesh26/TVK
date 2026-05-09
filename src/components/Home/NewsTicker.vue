<template>
  <div class="news-ticker-wrapper">
    <div class="ticker-label">
      <v-icon color="white" size="small" class="mr-2">mdi-bullhorn-variant</v-icon>
      {{ isTamil ? 'செய்திகள்' : 'NEWS' }}
    </div>
    <div class="ticker-container" @mouseenter="pause = true" @mouseleave="pause = false">
      <div class="ticker-content" :class="{ 'paused': pause }">
        <span v-for="(item, i) in tickerItems" :key="i" class="ticker-item" :class="{ 'is-broadcast': i === 0 }">
          <v-icon :color="i === 0 ? '#FFD700' : '#D4AF37'" :size="i === 0 ? 18 : 14" class="mr-2">
            {{ i === 0 ? 'mdi-bullhorn' : 'mdi-star-four-points' }}
          </v-icon>
          {{ item }}
        </span>
        <!-- Duplicate for seamless loop -->
        <span v-for="(item, i) in tickerItems" :key="'dup-'+i" class="ticker-item" :class="{ 'is-broadcast': i === 0 }">
          <v-icon :color="i === 0 ? '#FFD700' : '#D4AF37'" :size="i === 0 ? 18 : 14" class="mr-2">
            {{ i === 0 ? 'mdi-bullhorn' : 'mdi-star-four-points' }}
          </v-icon>
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { newsData } from "../../data/newsData";

export default {
  name: "NewsTicker",
  inject: ["t", "currentLang"],
  data: () => ({
    pause: false,
  }),
  computed: {
    isTamil() {
      return this.currentLang() === "ta";
    },
    tickerItems() {
      const broadcast = this.t("broadcast");
      // Get titles of latest 10 news items (reversed for latest first)
      const items = [...newsData]
        .reverse()
        .slice(0, 10)
        .map(item => {
          return this.t(`news.item${item.id + 1}.title`);
        });
      return [broadcast, ...items];
    }
  }
};
</script>

<style scoped>
.news-ticker-wrapper {
  background: #800000;
  height: 40px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-bottom: 2px solid #d4af37;
  position: relative;
  z-index: 100;
}

.ticker-label {
  background: #d4af37;
  color: #800000;
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  font-weight: 900;
  font-size: 0.8rem;
  letter-spacing: 1px;
  z-index: 2;
  box-shadow: 5px 0 15px rgba(0,0,0,0.3);
  position: relative;
}

.ticker-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.ticker-content {
  display: inline-flex;
  white-space: nowrap;
  animation: ticker 150s linear infinite;
  align-items: center;
  will-change: transform;
}

.ticker-content.paused {
  animation-play-state: paused;
}

.ticker-item {
  color: white;
  padding: 0 80px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.ticker-item.is-broadcast {
  color: #FFD700;
  font-weight: 900;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
}

@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@media (max-width: 600px) {
  .ticker-label {
    padding: 0 10px;
    font-size: 0.7rem;
  }
  .ticker-item {
    padding: 0 20px;
    font-size: 0.8rem;
  }
}
</style>
