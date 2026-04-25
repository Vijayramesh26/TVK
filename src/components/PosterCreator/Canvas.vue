<template>
  <div class="poster-canvas-container">
    <canvas
      ref="canvas"
      :width="width"
      :height="height"
      class="poster-canvas"
    ></canvas>
  </div>
</template>

<script>
import headerTemplate from "../../assets/Header.jpg";
import whistleSymbol from "../../assets/voteForWhistle.jpg";

export default {
  name: "PosterCanvas",
  props: {
    width: { type: Number, default: 3000 },
    height: { type: Number, default: 4243 }, // Ultra-res (Approx 300 DPI for A4)
    imageUrls: { type: Array, default: () => [] },
    textTop: { type: String, default: "" },
    textContent: { type: String, default: "" },
    constituencyNo: { type: String, default: "" },
    constituency: { type: String, default: "" },
    partNo: { type: String, default: "" },
    streetName: { type: String, default: "" },
    date: { type: String, default: "" },
    headerSrc: { type: String, default: "" },
    candidateUrl: { type: String, default: "" },
    vattarUrl: { type: String, default: "" },
    badgeUrl: { type: String, default: "" },
  },
  data: () => ({
    ctx: null,
  }),
  watch: {
    imageUrls: {
      handler: "draw",
      deep: true,
    },
    candidateUrl: "draw",
    textTop: "draw",
    textContent: "draw",
    constituencyNo: "draw",
    constituency: "draw",
    partNo: "draw",
    streetName: "draw",
    date: "draw",
    vattarUrl: "draw",
    badgeUrl: "draw",
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
    this.draw();
  },
  methods: {
    async draw() {
      if (!this.ctx) return;

      // Enable high quality image smoothing
      this.ctx.imageSmoothingEnabled = true;
      this.ctx.imageSmoothingQuality = "high";

      // Clear canvas
      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.fillRect(0, 0, this.width, this.height);

      // 1. Draw Header
      const headerImg = await this.loadImage(this.headerSrc || headerTemplate);
      const headerHeight = this.width * (headerImg.height / headerImg.width);
      this.ctx.drawImage(headerImg, 0, 0, this.width, headerHeight);

      // Draw Whistle Symbol - Below Header LEFT
      try {
        const whistleImg = await this.loadImage(whistleSymbol);
        const whistleSize = 450;
        const whistleX = 100;
        const whistleY = headerHeight + 50;

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(
          whistleX + whistleSize / 2,
          whistleY + whistleSize / 2,
          whistleSize / 2,
          0,
          Math.PI * 2,
        );
        this.ctx.clip();
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.drawImage(
          whistleImg,
          whistleX,
          whistleY,
          whistleSize,
          whistleSize,
        );
        this.ctx.restore();
      } catch (e) {
        console.error("Whistle load error", e);
      }

      // Draw Candidate Image - Below Header RIGHT
      if (this.candidateUrl) {
        try {
          const candImg = await this.loadImage(this.candidateUrl);
          const candSize = 540; // Slightly larger for better prominence
          const candX = this.width - candSize - 100;
          const candY = headerHeight + 50;

          // 1. Draw Gold Circular Border (Background)
          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.arc(
            candX + candSize / 2,
            candY + candSize / 2,
            candSize / 2,
            0,
            Math.PI * 2,
          );
          this.ctx.fillStyle = "#D4AF37"; // Gold border base
          this.ctx.fill();
          
          // 2. Draw White Inner Background & Clip Image
          this.ctx.beginPath();
          this.ctx.arc(
            candX + candSize / 2,
            candY + candSize / 2,
            candSize / 2 - 15, // Inner radius for border thickness
            0,
            Math.PI * 2,
          );
          this.ctx.clip();
          this.ctx.fillStyle = "white";
          this.ctx.fill();

          const scale = Math.max(
            candSize / candImg.width,
            candSize / candImg.height,
          );
          const drawW = candImg.width * scale;
          const drawH = candImg.height * scale;
          const offX = (candSize - drawW) / 2;
          const offY = (candSize - drawH) / 2;

          this.ctx.drawImage(candImg, candX + offX, candY + offY, drawW, drawH);
          this.ctx.restore();

          // 3. Optional Overlay Stroke for extra sharpness
          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.arc(
            candX + candSize / 2,
            candY + candSize / 2,
            candSize / 2 - 2, 
            0,
            Math.PI * 2,
          );
          this.ctx.strokeStyle = "#800000"; // Maroon thin outline
          this.ctx.lineWidth = 4;
          this.ctx.stroke();
          this.ctx.restore();
        } catch (e) {
          console.error("Candidate load error", e);
        }
      }

      // 2. Draw Footer
      // Footer Bar (Maroon with gold stroke)
      this.ctx.fillStyle = "#800000";
      this.ctx.strokeStyle = "#D4AF37";
      this.ctx.lineWidth = 10;
      const footerH = 300;
      const footerY = this.height - footerH;
      this.ctx.fillRect(0, footerY, this.width, footerH);
      this.ctx.strokeRect(0, footerY, this.width, footerH);

      this.ctx.fillStyle = "#FFD700"; // Gold Bar at bottom
      this.ctx.fillRect(0, this.height - 120, this.width, 120);

      // 3. Draw Main Images Grid
      if (this.imageUrls && this.imageUrls.length > 0) {
        // Reduced gap and expanded vertical area to fill the screen better
        const startY = headerHeight + 850;
        const availableHeight = this.height - startY - footerH - 120;

        const count = this.imageUrls.length;
        let cols = 1;
        if (count >= 2 && count <= 4) cols = 2;
        else if (count >= 5) cols = 3;

        const rows = Math.ceil(count / cols);
        const cellWidth = this.width / cols;
        const cellHeight = availableHeight / rows;
        const padding = 0; // Seamless fill as requested

        for (let i = 0; i < count; i++) {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = col * cellWidth;
          const y = startY + row * cellHeight;

          const img = await this.loadImage(this.imageUrls[i]);

          const drawW = cellWidth;
          const drawH = cellHeight;

          // 'Contain' logic: fit entire image without cropping
          const scale = Math.min(drawW / img.width, drawH / img.height);
          const finalW = img.width * scale;
          const finalH = img.height * scale;

          const offX = (drawW - finalW) / 2;
          const offY = (drawH - finalH) / 2;

          // Fill cell background
          this.ctx.fillStyle = "#FFFFFF";
          this.ctx.fillRect(x, y, drawW, drawH);
          // Draw the full image centered in the cell
          this.ctx.drawImage(img, x + offX, y + offY, finalW, finalH);
        }
      }

      // 4. Draw Text
      this.ctx.textAlign = "center";

      // Top Headline (Large)
      if (this.textTop) {
        this.ctx.font = 'bold 110px "Inter", sans-serif';
        this.ctx.fillStyle = "#800000";
        this.ctx.fillText(
          this.textTop,
          this.width / 2,
          headerHeight + 320,
          1400,
        );
      }

      // Content Description (Smaller, below headline)
      if (this.textContent) {
        this.ctx.font = '62px "Inter", sans-serif';
        this.ctx.fillStyle = "#444444";
        this.drawWrappedText(
          this.textContent,
          this.width / 2,
          headerHeight + 520,
          1400,
          80,
        );
      }

      // --- FOOTER INFO ---
      this.ctx.textAlign = "center";

      // Constituency Info (In the maroon footer area)
      const footerTextY = this.height - 220;
      this.ctx.font = 'bold 72px "Inter", sans-serif';
      this.ctx.fillStyle = "#FFD700"; // Gold text in maroon
      const details = `${this.constituency} - ${this.constituencyNo}வது வட்டம் | பாகம்: ${this.partNo}`;
      this.ctx.fillText(details, this.width / 2, footerTextY);

      // Street & Date (In the gold bar area or just above)
      this.ctx.font = '64px "Inter", sans-serif';
      this.ctx.fillStyle = "#800000"; // Maroon text in gold bar
      this.ctx.fillText(
        `இடம்: ${this.streetName} | தேதி: ${this.date}`,
        this.width / 2,
        this.height - 40,
      );

      // --- NEW: Bottom Right Badge (155.png) ---
      if (this.badgeUrl) {
        try {
          const badgeImg = await this.loadImage(this.badgeUrl);
          const bW = 400;
          const bH = bW * (badgeImg.height / badgeImg.width);
          this.ctx.drawImage(
            badgeImg,
            this.width - bW - 50,
            this.height - bH - 150,
            bW,
            bH,
          );
        } catch (e) {
          console.error("Badge load error", e);
        }
      }

      // --- NEW: Vattaraseyalalar (Leader) Photo ---
      if (this.vattarUrl) {
        try {
          const vImg = await this.loadImage(this.vattarUrl);
          const vSize = 400;
          const vX = 100;
          const vY = this.height - vSize - 150;

          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.arc(
            vX + vSize / 2,
            vY + vSize / 2,
            vSize / 2,
            0,
            Math.PI * 2,
          );
          this.ctx.clip();

          this.ctx.fillStyle = "white";
          this.ctx.fill();

          const scale = Math.max(vSize / vImg.width, vSize / vImg.height);
          const dW = vImg.width * scale;
          const dH = vImg.height * scale;
          this.ctx.drawImage(
            vImg,
            vX + (vSize - dW) / 2,
            vY + (vSize - dH) / 2,
            dW,
            dH,
          );
          this.ctx.restore();
        } catch (e) {
          console.error("Leader photo error", e);
        }
      }
    },
    loadImage(src) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
      });
    },
    drawWrappedText(text, x, y, maxWidth, lineHeight) {
      const words = text.split(" ");
      let line = "";
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = this.ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          this.ctx.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      this.ctx.fillText(line, x, y);
    },
    exportAsImage() {
      return this.$refs.canvas.toDataURL("image/png");
    },
  },
};
</script>

<style scoped>
.poster-canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  border-radius: 12px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
.poster-canvas {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
</style>
