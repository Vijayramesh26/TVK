<template>
  <transition name="fade">
    <div v-if="show" class="splash-screen">
      <div class="logo-container">
        <img src="/favicon.png" alt="TVK Logo" class="pulse-logo" />
        <h1 class="splash-title">My Vetri Tamilnadu</h1>
        <div class="loading-bar"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "SplashScreen",
  props: {
    duration: { type: Number, default: 2500 },
  },
  data: () => ({
    show: true,
  }),
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
  background: #800000; /* TVK Maroon */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.logo-container {
  text-align: center;
}

.pulse-logo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: 0 0 50px rgba(255, 215, 0, 0.3);
  animation: pulse-zoom 2s infinite ease-in-out;
}

.splash-title {
  color: #ffd700; /* Gold */
  margin-top: 30px;
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0;
  animation: fade-up 1s forwards 0.5s;
}

.loading-bar {
  width: 100px;
  height: 4px;
  background: rgba(255, 215, 0, 0.2);
  margin: 20px auto 0;
  position: relative;
  overflow: hidden;
  border-radius: 2px;
}

.loading-bar::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #ffd700;
  animation: loading 2s linear forwards;
}

@keyframes pulse-zoom {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

@keyframes fade-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes loading {
  to {
    left: 100%;
  }
}

.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>
