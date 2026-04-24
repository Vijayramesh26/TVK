<template>
  <transition name="fade">
    <div v-if="show" class="splash-screen">
      <div class="stars-overlay"></div>
      <div class="logo-container">
        <!-- Main Logo with Glow -->
        <div class="logo-wrapper">
          <img src="../assets/tvk-logo.png" alt="TVK Logo" class="pulse-logo" />
          <div class="logo-glow"></div>
        </div>

        <!-- Animated Tamil Text -->
        <div class="text-wrapper mt-8">
          <h1 class="splash-title shadow-text">
            <span
              v-for="(char, index) in titleChars"
              :key="index"
              :style="{ animationDelay: index * 0.1 + 's' }"
              :class="{ 'char-space': char === ' ' }"
            >
              {{ char === " " ? "\u00A0" : char }}
            </span>
          </h1>
          <h2 class="splash-subtitle mt-2">
            <span
              v-for="(char, index) in subtitleChars"
              :key="index"
              :style="{ animationDelay: 0.5 + index * 0.1 + 's' }"
              :class="{ 'char-space': char === ' ' }"
            >
              {{ char === " " ? "\u00A0" : char }}
            </span>
          </h2>
        </div>

        <!-- Sleek Loading indicator -->
        <div class="progress-wrapper">
          <div class="loading-bar"></div>
          <div class="loading-text mt-2">தயாராகிறது...</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "SplashScreen",
  props: {
    duration: { type: Number, default: 3500 },
  },
  data: () => ({
    show: true,
    title: "தமிழக வெற்றிக் கழகம்",
    subtitle: "எனது வெற்றிக் தமிழகம்",
  }),
  computed: {
    titleChars() {
      if (window.Intl && window.Intl.Segmenter) {
        const segmenter = new Intl.Segmenter("ta", { granularity: "grapheme" });
        return Array.from(segmenter.segment(this.title)).map((s) => s.segment);
      }
      return Array.from(this.title);
    },
    subtitleChars() {
      if (window.Intl && window.Intl.Segmenter) {
        const segmenter = new Intl.Segmenter("ta", { granularity: "grapheme" });
        return Array.from(segmenter.segment(this.subtitle)).map(
          (s) => s.segment,
        );
      }
      return Array.from(this.subtitle);
    },
  },
  mounted() {
    setTimeout(() => {
      this.show = false;
      this.$emit("finish");
    }, this.duration);
  },
};
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, #a00000 0%, #800000 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
}

.stars-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(white 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.1;
  animation: bg-move 20s linear infinite;
}

@keyframes bg-move {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100px 100px;
  }
}

.logo-container {
  position: relative;
  text-align: center;
  z-index: 10;
  width: 90%;
  max-width: 800px;
}

.logo-wrapper {
  position: relative;
  width: clamp(120px, 30vw, 180px);
  height: clamp(120px, 30vw, 180px);
  margin: 0 auto;
}

.pulse-logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  border: 4px solid rgba(255, 215, 0, 0.5);
  animation: logo-pop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.logo-glow {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: radial-gradient(
    circle,
    rgba(255, 215, 0, 0.4) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: glow-pulse 2s infinite ease-in-out;
}

.splash-title {
  color: #ffd700;
  font-size: clamp(1.8rem, 6vw, 3.2rem);
  font-weight: 900;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2px;
  line-height: 1.2;
}

.splash-title span {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px) scale(0.5);
  animation: char-reveal 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.splash-subtitle {
  color: rgba(255, 255, 255, 0.95);
  font-size: clamp(1rem, 3vw, 1.4rem);
  font-weight: 600;
  letter-spacing: 2px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2px;
}

.splash-subtitle span {
  display: inline-block;
  opacity: 0;
  animation: fade-in 0.5s forwards;
}

.char-space {
  min-width: 0.4em;
}

.shadow-text {
  text-shadow:
    0 4px 8px rgba(0, 0, 0, 0.5),
    0 8px 24px rgba(0, 0, 0, 0.3);
}

.progress-wrapper {
  margin-top: 50px;
}

.loading-bar {
  width: 200px;
  height: 3px;
  background: rgba(255, 215, 0, 0.1);
  margin: 0 auto;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}

.loading-bar::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, #ffd700, transparent);
  animation: slide-loading 2.5s infinite ease-in-out;
}

.loading-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

@keyframes logo-pop {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes glow-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
}

@keyframes char-reveal {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

@keyframes slide-loading {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

.fade-leave-active {
  transition: all 1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.mt-8 {
  margin-top: 32px;
}
.mt-2 {
  margin-top: 8px;
}
</style>
