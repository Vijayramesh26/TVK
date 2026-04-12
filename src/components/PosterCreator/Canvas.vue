<template>
  <div class="poster-canvas-container">
    <canvas ref="canvas" :width="width" :height="height" class="poster-canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'PosterCanvas',
  props: {
    width: { type: Number, default: 3000 },
    height: { type: Number, default: 4243 }, // Ultra-res (Approx 300 DPI for A4)
    imageUrls: { type: Array, default: () => [] },
    textTop: { type: String, default: '' },
    textContent: { type: String, default: '' },
    constituencyNo: { type: String, default: '' },
    constituency: { type: String, default: '' },
    partNo: { type: String, default: '' },
    streetName: { type: String, default: '' },
    date: { type: String, default: '' },
    headerSrc: { type: String, default: '' },
  },
  data: () => ({
    ctx: null,
  }),
  watch: {
    imageUrls: {
      handler: 'draw',
      deep: true
    },
    textTop: 'draw',
    textContent: 'draw',
    constituencyNo: 'draw',
    constituency: 'draw',
    partNo: 'draw',
    streetName: 'draw',
    date: 'draw',
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d');
    this.draw();
  },
  methods: {
    async draw() {
      if (!this.ctx) return;

      // Enable high quality image smoothing
      this.ctx.imageSmoothingEnabled = true;
      this.ctx.imageSmoothingQuality = 'high';

      // Clear canvas
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.fillRect(0, 0, this.width, this.height);

      // 1. Draw Header
      const headerImg = await this.loadImage(this.headerSrc || '/src/assets/header.png');
      const headerHeight = this.width * (headerImg.height / headerImg.width);
      this.ctx.drawImage(headerImg, 0, 0, this.width, headerHeight);

      // 2. Draw Footer
      const footerHeight = 400; // Scaled up
      this.ctx.fillStyle = '#800000';
      this.ctx.fillRect(0, this.height - footerHeight, this.width, footerHeight);
      
      this.ctx.fillStyle = '#FFD700'; // Gold Bar at bottom
      this.ctx.fillRect(0, this.height - 120, this.width, 120);

      // 3. Draw Main Images Grid
      if (this.imageUrls && this.imageUrls.length > 0) {
        const availableHeight = this.height - headerHeight - footerHeight - 1200;
        const startY = headerHeight + 1000;
        
        const count = this.imageUrls.length;
        let cols = 1;
        let rows = 1;
        
        if (count > 1) cols = 2;
        if (count > 2) rows = Math.ceil(count / 2);
        if (count > 4) cols = 3;
        if (count > 6) rows = Math.ceil(count / 3);

        const cellWidth = (this.width * 0.9) / cols;
        const cellHeight = availableHeight / rows;
        const padding = 40;

        for (let i = 0; i < count; i++) {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = (this.width * 0.05) + col * cellWidth + padding;
          const y = startY + row * cellHeight + padding;
          
          const img = await this.loadImage(this.imageUrls[i]);
          
          const drawW = cellWidth - padding * 2;
          const drawH = cellHeight - padding * 2;
          const ratio = Math.min(drawW / img.width, drawH / img.height);
          const finalW = img.width * ratio;
          const finalH = img.height * ratio;
          
          const offX = (drawW - finalW) / 2;
          const offY = (drawH - finalH) / 2;

          this.ctx.drawImage(img, x + offX, y + offY, finalW, finalH);
        }
      }

      // 4. Draw Text
      this.ctx.textAlign = 'center';
      
      // Top Headline (Large)
      if (this.textTop) {
        this.ctx.font = 'bold 140px "Inter", sans-serif';
        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.fillText(this.textTop, this.width / 2, headerHeight + 300);
      }

      // Content Description (Smaller, below headline)
      if (this.textContent) {
        this.ctx.font = '72px "Inter", sans-serif';
        this.ctx.fillStyle = '#444444';
        this.drawWrappedText(this.textContent, this.width / 2, headerHeight + 500, this.width * 0.8, 90);
      }

      // --- FOOTER INFO ---
      this.ctx.textAlign = 'center';
      
      // Constituency Info (In the maroon footer area)
      const footerTextY = this.height - 220;
      this.ctx.font = 'bold 72px "Inter", sans-serif';
      this.ctx.fillStyle = '#FFD700'; // Gold text in maroon
      const details = `${this.constituency} - ${this.constituencyNo}வது வட்டம் | பாகம்: ${this.partNo}`;
      this.ctx.fillText(details, this.width / 2, footerTextY);
      
      // Street & Date (In the gold bar area or just above)
      this.ctx.font = '64px "Inter", sans-serif';
      this.ctx.fillStyle = '#800000'; // Maroon text in gold bar
      this.ctx.fillText(`இடம்: ${this.streetName} | தேதி: ${this.date}`, this.width / 2, this.height - 40);
    },
    loadImage(src) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
      });
    },
    drawWrappedText(text, x, y, maxWidth, lineHeight) {
      const words = text.split(' ');
      let line = '';
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = this.ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          this.ctx.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      this.ctx.fillText(line, x, y);
    },
    exportAsImage() {
      return this.$refs.canvas.toDataURL('image/png');
    }
  }
}
</script>

<style scoped>
.poster-canvas-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 12px;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);
}
.poster-canvas {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}
</style>
