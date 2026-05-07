<template>
  <div class="canvas-container">
    <canvas ref="idCanvas" width="600" height="950" style="display: none;"></canvas>
    <div class="preview-card" v-if="previewUrl">
      <img :src="previewUrl" alt="ID Card Preview" class="img-fluid rounded-xl shadow-2xl" />
    </div>
  </div>
</template>

<script>
import bgImage from "../../assets/id-card-bg.png";
import tvkLogo from "../../assets/tvk-logo.png";
import leaderImage from "../../assets/leaders/vijay-leader.png";

export default {
  name: "IDCardCanvas",
  props: {
    name: String,
    district: String,
    constituency: String,
    bloodGroup: String,
    photoUrl: String,
    memberId: String,
  },
  data: () => ({
    previewUrl: null,
  }),
  watch: {
    name: "drawCard",
    district: "drawCard",
    constituency: "drawCard",
    bloodGroup: "drawCard",
    photoUrl: "drawCard",
  },
  mounted() {
    this.drawCard();
  },
  methods: {
    async drawCard() {
      const canvas = this.$refs.idCanvas;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      const [logo, leader] = await Promise.all([
        this.loadImage(tvkLogo),
        this.loadImage(leaderImage),
      ]);

      // 0. Round the edges of the whole card
      ctx.save(); // Save state for clipping
      ctx.beginPath();
      ctx.roundRect(0, 0, canvas.width, canvas.height, 40);
      ctx.clip();

      // 1. Draw Plain Party Flag Background (Maroon - Richer Gradient)
      const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGrad.addColorStop(0, "#800000"); // Deep Maroon
      bgGrad.addColorStop(1, "#4a0000"); // Darker Maroon
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Metallic Flag Stripes (Top and Bottom)
      const goldGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      goldGrad.addColorStop(0, "#D4AF37");
      goldGrad.addColorStop(0.5, "#FBF5B7"); // Shine
      goldGrad.addColorStop(1, "#D4AF37");
      
      ctx.fillStyle = goldGrad;
      ctx.fillRect(0, 0, canvas.width, 25); // Top Stripe
      ctx.fillRect(0, canvas.height - 25, canvas.width, 25); // Bottom Stripe

      // 3. Subtle Side Decoration (Ghost Logo)
      ctx.globalAlpha = 0.08;
      ctx.drawImage(logo, -100, 300, 450, 450);
      ctx.globalAlpha = 1.0;

      // 4. Header Section - Premium Glass Look
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, canvas.width, 180);

      // 5. Draw Logo (Top Left)
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 15;
      ctx.drawImage(logo, 35, 45, 80, 80);
      ctx.shadowBlur = 0;

      // Party Name - Elegant Typography
      ctx.textAlign = "left";
      ctx.fillStyle = goldGrad;
      ctx.font = "900 30px 'Inter', sans-serif";
      ctx.fillText("தமிழக வெற்றிக் கழகம்", 130, 75);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "700 16px 'Inter', sans-serif";
      ctx.fillText("TAMILAGA VETTRI KAZHAGAM", 130, 105);

      // 6. Leader Portrait (Top Right - Floating Full Image)
      const leaderW = 190;
      const leaderH = 230;
      const leaderX = 410;
      const leaderY = 30;
      
      // Shadow for leader
      ctx.shadowColor = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = 20;
      ctx.drawImage(leader, leaderX, leaderY, leaderW, leaderH);
      ctx.shadowBlur = 0;

      // 7. User Portrait (Main Center - With Glow)
      const userSize = 140;
      const userY = 370;
      
      // Tighter Glow behind photo
      ctx.beginPath();
      const glow = ctx.createRadialGradient(canvas.width / 2, userY, userSize - 20, canvas.width / 2, userY, userSize + 40);
      glow.addColorStop(0, "rgba(212, 175, 55, 0.3)");
      glow.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = glow;
      ctx.arc(canvas.width / 2, userY, userSize + 40, 0, Math.PI * 2);
      ctx.fill();

      if (this.photoUrl) {
        const photo = await this.loadImage(this.photoUrl);
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvas.width / 2, userY, userSize, 0, Math.PI * 2);
        ctx.clip();
        
        const aspect = photo.width / photo.height;
        let dW, dH;
        if (aspect > 1) { dH = userSize * 2; dW = dH * aspect; }
        else { dW = userSize * 2; dH = dW / aspect; }
        
        ctx.drawImage(photo, (canvas.width / 2) - (dW / 2), userY - (dH / 2), dW, dH);
        ctx.restore();
        
        ctx.strokeStyle = goldGrad;
        ctx.lineWidth = 10;
        ctx.stroke();
      }

      // 8. Details Container (Deep Glassmorphism)
      const boxY = 540;
      ctx.beginPath();
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.roundRect(40, boxY, 520, 360, 32);
      ctx.fill();
      
      ctx.beginPath();
      ctx.strokeStyle = "rgba(212, 175, 55, 0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // 9. Text Content - Refined Spacing & Weight
      ctx.textAlign = "left";
      const details = [
        { label: "NAME / பெயர்", value: this.name || "ENTER YOUR NAME" },
        { label: "DISTRICT / மாவட்டம்", value: this.district || "SELECT DISTRICT" },
        { label: "CONSTITUENCY / தொகுதி", value: this.constituency || "ENTER CONSTITUENCY" },
        { label: "BLOOD GROUP / இரத்த வகை", value: this.bloodGroup || "O +ve" }
      ];

      let startTextY = boxY + 50;
      details.forEach(item => {
        ctx.fillStyle = "#D4AF37";
        ctx.font = "900 13px 'Inter', sans-serif";
        ctx.fillText(item.label, 80, startTextY);
        
        ctx.fillStyle = "white";
        ctx.font = "800 22px 'Inter', sans-serif";
        ctx.fillText(item.value.toUpperCase(), 80, startTextY + 30);
        startTextY += 72;
      });

      // 10. QR Code & ID - Modern Layout
      const qrSize = 95;
      const qrX = 435;
      const qrY = boxY + 230;
      
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.roundRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20, 18);
      ctx.fill();

      try {
        const qrData = encodeURIComponent(`TVK Supporter: ${this.name || 'User'} | ID: ${this.memberId} | District: ${this.district} | https://tvk.party`);
        const qrImg = await this.loadImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}`);
        ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
      } catch (e) {
        ctx.fillStyle = "#333";
        ctx.fillRect(qrX, qrY, qrSize, qrSize);
      }

      ctx.fillStyle = "#D4AF37";
      ctx.font = "900 12px 'Inter', sans-serif";
      ctx.fillText("MEMBER ID", 85, boxY + 315);
      ctx.fillStyle = "white";
      ctx.font = "bold 19px 'Inter', sans-serif";
      ctx.fillText(this.memberId || "TVK-2026-XXXX", 85, boxY + 340);

      // 11. Final Polish - Lighting Effect Overlay
      const lightGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      lightGrad.addColorStop(0, "rgba(255, 255, 255, 0.1)");
      lightGrad.addColorStop(0.5, "transparent");
      lightGrad.addColorStop(1, "rgba(0, 0, 0, 0.2)");
      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = "bold 12px 'Inter', sans-serif";
      ctx.fillText("THIS IS A DIGITAL SUPPORTER ASSET • TVK OFFICIAL © 2026", canvas.width / 2, 925);

      ctx.restore(); // Restore from the initial roundRect clip
      this.previewUrl = canvas.toDataURL("image/png");
    },
    loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = src;
      });
    },
    exportAsImage() {
      return this.$refs.idCanvas.toDataURL("image/png");
    }
  }
};
</script>

<style scoped>
.preview-card img {
  max-width: 100%;
  height: auto;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  border: 1px solid rgba(212, 175, 55, 0.2);
}
</style>
