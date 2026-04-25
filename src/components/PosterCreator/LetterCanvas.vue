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
  },
  data: () => ({
    ctx: null,
  }),
  watch: {
    imageUrl: "draw",
    textContent: "draw",
    title: "draw",
    date: "draw",
    referenceNo: "draw",
    showMainTitle: "draw",
    showRef: "draw",
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
    this.draw();
  },
  methods: {
    async draw() {
      if (!this.ctx) return;

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
        this.ctx.font = 'bold 80px "Inter", sans-serif';
        this.ctx.fillStyle = "#800000";
        this.ctx.fillText(
          "பத்திரிகைச் செய்தி / PRESS RELEASE",
          this.width / 2,
          startY + 80,
        );
      }

      const contentBaseY = this.showMainTitle ? startY + 180 : startY;

      this.ctx.textAlign = "left";
      this.ctx.font = '50px "Inter", sans-serif';
      this.ctx.fillStyle = "#333333";
      this.ctx.fillText(`தேதி: ${this.date}`, 150, contentBaseY + 120);

      if (this.showRef) {
        this.ctx.textAlign = "right";
        this.ctx.fillText(
          `வ.எண்: ${this.referenceNo}`,
          this.width - 150,
          contentBaseY + 120,
        );
      }

      // 4. Letter Title (Headline)
      this.ctx.textAlign = "center";
      this.ctx.font = 'bold 72px "Inter", sans-serif';
      this.ctx.fillStyle = "#800000";
      this.drawWrappedText(
        this.title,
        this.width / 2,
        contentBaseY + 280,
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
      this.ctx.font = '56px "Inter", sans-serif';
      this.ctx.fillStyle = "#1a1a1a";
      this.drawWrappedText(
        this.textContent,
        200,
        currentY,
        this.width - 400,
        85,
      );

      // 7. Footer - Signature Area
      const footerY = this.height - 200;
      this.ctx.textAlign = "right";
      this.ctx.font = 'bold 54px "Inter", sans-serif';
      this.ctx.fillStyle = "#800000";
      this.ctx.fillText("தலைமை அலுவலகம்,", this.width - 200, footerY);
      this.ctx.fillText(
        "தமிழக வெற்றிக் கழகம்.",
        this.width - 200,
        footerY + 80,
      );

      // Decorative bottom border
      this.ctx.fillStyle = "#800000";
      this.ctx.fillRect(0, this.height - 40, this.width, 40);
      this.ctx.fillStyle = "#D4AF37";
      this.ctx.fillRect(0, this.height - 80, this.width, 40);
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
