<template>
  <div class="letter-canvas-container">
    <canvas
      ref="canvas"
      :width="width"
      :height="height"
      class="letter-canvas"
    ></canvas>
  </div>
</template>

<script>
import headerTemplate from "../../assets/Header.jpg";
import logoGold from "../../assets/tvk-logo-premium.png";

export default {
  name: "LetterCanvas",
  props: {
    width: { type: Number, default: 2480 }, // A4 at 300 DPI (approx)
    height: { type: Number, default: 3508 },
    imageUrl: { type: String, default: "" },
    textContent: { type: String, default: "" },
    title: { type: String, default: "" },
    date: { type: String, default: "" },
    referenceNo: { type: String, default: "" },
    showMainTitle: { type: Boolean, default: true },
    showRef: { type: Boolean, default: true },
    signatoryName: { type: String, default: "" },
    signatoryPosting: { type: String, default: "" },
  },
  data: () => ({
    ctx: null,
    isDrawing: false,
    pendingDraw: false,
  }),
  watch: {
    imageUrl: "draw",
    textContent: "draw",
    title: "draw",
    date: "draw",
    referenceNo: "draw",
    showMainTitle: "draw",
    showRef: "draw",
    signatoryName: "draw",
    signatoryPosting: "draw",
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
    this.draw();
  },
  methods: {
    async draw() {
      if (!this.ctx) return;
      if (this.isDrawing) {
        this.pendingDraw = true;
        return;
      }
      this.isDrawing = true;

      // Clear
      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.fillRect(0, 0, this.width, this.height);

      // 1. Official Header
      const headerImg = await this.loadImage(headerTemplate);
      const hHeight = this.width * (headerImg.height / headerImg.width);
      this.ctx.drawImage(headerImg, 0, 0, this.width, hHeight);

      const startY = hHeight + 50;
      if (this.showMainTitle) {
        this.ctx.textAlign = "center";
        const titleY = startY + 80;
        this.ctx.font = 'bold 80px "Hind Madurai", sans-serif';
        
        // Flag Gradient for Main Title
        const titleGradient = this.ctx.createLinearGradient(this.width/2, titleY - 60, this.width/2, titleY + 20);
        titleGradient.addColorStop(0, "#800000");
        titleGradient.addColorStop(0.45, "#800000");
        titleGradient.addColorStop(0.45, "#FFD700");
        titleGradient.addColorStop(0.55, "#FFD700");
        titleGradient.addColorStop(0.55, "#800000");
        titleGradient.addColorStop(1.0, "#800000");
        
        this.ctx.fillStyle = titleGradient;
        this.ctx.fillText(
          "பத்திரிகைச் செய்தி / PRESS RELEASE",
          this.width / 2,
          titleY,
        );
      }

      const contentBaseY = this.showMainTitle ? startY + 180 : startY;

      this.ctx.textAlign = "left";
      this.ctx.font = '500 50px "Hind Madurai", sans-serif';
      this.ctx.fillStyle = "#333333";
      this.ctx.fillText(`தேதி: ${this.date}`, 150, contentBaseY + 120);

      if (this.showRef) {
        this.ctx.textAlign = "right";
        this.ctx.font = '500 45px "Hind Madurai", sans-serif';
        this.ctx.fillText(
          `வ.எண்: ${this.referenceNo}`,
          this.width - 150,
          contentBaseY + 120,
        );
      }

      // 4. Letter Title (Headline)
      this.ctx.textAlign = "center";
      this.ctx.font = 'bold 72px "Hind Madurai", sans-serif';
      
      const headlineY = contentBaseY + 280;
      const headlineGradient = this.ctx.createLinearGradient(this.width/2, headlineY - 50, this.width/2, headlineY + 20);
      headlineGradient.addColorStop(0, "#800000");
      headlineGradient.addColorStop(0.45, "#800000");
      headlineGradient.addColorStop(0.45, "#FFD700");
      headlineGradient.addColorStop(0.55, "#FFD700");
      headlineGradient.addColorStop(0.55, "#800000");
      headlineGradient.addColorStop(1.0, "#800000");
      
      this.ctx.fillStyle = headlineGradient;
      this.drawWrappedText(
        this.title,
        this.width / 2,
        headlineY,
        this.width - 400,
        95,
      );

      const headlineLines =
        Math.ceil(
          this.ctx.measureText(this.title).width / (this.width - 400),
        ) || 1;
      let currentY = contentBaseY + 280 + headlineLines * 90 + 50;

      // 5. Main Image (If provided)
      if (this.imageUrl) {
        try {
          const mainImg = await this.loadImage(this.imageUrl);
          const maxImgW = this.width - 200; // Almost edge-to-edge
          const maxImgH = 1800; // Allow much taller images

          let drawW = mainImg.width;
          let drawH = mainImg.height;
          const scale = Math.min(maxImgW / drawW, maxImgH / drawH);
          drawW *= scale;
          drawH *= scale;

          const imgX = (this.width - drawW) / 2;
          this.ctx.drawImage(mainImg, imgX, currentY, drawW, drawH);
          currentY += drawH + 100;
        } catch (e) {
          console.error("Letter image load fail", e);
        }
      }

      // 6. Content Text
      this.ctx.textAlign = "left";
      this.ctx.font = '500 56px "Hind Madurai", sans-serif';
      this.ctx.fillStyle = "#1a1a1a";
      this.drawWrappedText(
        this.textContent,
        200,
        currentY,
        this.width - 400,
        85,
      );

      // 7. Footer - Signature Area
      const footerY = this.height - 350;
      this.ctx.fillStyle = "#800000";
      this.ctx.textAlign = "center";
      const sigX = this.width - 550; 

      // Styled Honorific (Script Style)
      this.ctx.font = '55px "Kavivanar", cursive';
      this.ctx.fillStyle = "#800000";
      this.ctx.fillText("என்றும் தளபதி வழியில்...", sigX, footerY);

      this.ctx.font = 'bold 90px "Hind Madurai", sans-serif';

      // Create Flag Gradient for the Name (Maroon-Yellow-Maroon)
      const nameY = footerY + 110;
      const gradient = this.ctx.createLinearGradient(
        sigX,
        nameY - 60,
        sigX,
        nameY + 30,
      );

      gradient.addColorStop(0, "#800000"); // Top Maroon
      gradient.addColorStop(0.4, "#800000"); // End Top Maroon
      gradient.addColorStop(0.4, "#FFD700"); // Start Thin Yellow
      gradient.addColorStop(0.5, "#FFD700"); // End Thin Yellow
      gradient.addColorStop(0.5, "#800000"); // Start Bottom Maroon
      gradient.addColorStop(1.0, "#800000"); // Bottom Maroon

      this.ctx.fillStyle = gradient;
      this.ctx.fillText(this.signatoryName || "ஆகாஷ் R", sigX, nameY);

      this.ctx.fillStyle = "#800000"; // Revert to Maroon for the rest
      this.ctx.font = 'bold 50px "Hind Madurai", sans-serif';
      this.ctx.fillText(this.signatoryPosting || "155-வது வட்டக் கழகச் செயலாளர்", sigX, footerY + 200);

      // Decorative bottom border
      this.ctx.fillStyle = "#800000";
      this.ctx.fillRect(0, this.height - 40, this.width, 40);
      this.ctx.fillStyle = "#D4AF37";
      this.ctx.fillRect(0, this.height - 80, this.width, 40);

      this.isDrawing = false;
      if (this.pendingDraw) {
        this.pendingDraw = false;
        this.draw();
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
      if (!text) return;
      const paragraphs = text.split("\n");
      for (let p = 0; p < paragraphs.length; p++) {
        const words = paragraphs[p].split(" ");
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
        y += lineHeight * 1.5; // Paragraph spacing
      }
    },
    exportAsImage() {
      return this.$refs.canvas.toDataURL("image/png");
    },
  },
};
</script>

<style scoped>
.letter-canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  padding: 20px;
  overflow: hidden;
}
.letter-canvas {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  background: white;
}
</style>
