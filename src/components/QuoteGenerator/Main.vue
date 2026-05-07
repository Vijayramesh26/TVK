<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <div class="text-center mb-8">
          <v-chip color="#D4AF37" variant="elevated" class="mb-4 font-weight-black">DAILY INSPIRATION</v-chip>
          <h1 class="text-h3 font-weight-black color-maroon mb-2">
            {{ isTamil ? 'தளபதியின் பொன்மொழிகள்' : 'Thalapathy Quotes' }}
          </h1>
          <p class="text-subtitle-1 text-grey-darken-1">
            {{ isTamil ? 'தளபதி விஜய் அவர்களின் எழுச்சிமிகு உரைகளிலிருந்து தேர்ந்தெடுக்கப்பட்ட பொன்மொழிகள்.' : 'Powerful and inspiring quotes from Thalapathy Vijay\'s historic speeches.' }}
          </p>
        </div>

        <v-card class="quote-card rounded-xl elevation-24 overflow-hidden border-gold-thick mb-8">
          <div class="quote-container pa-8 pa-md-16 text-center d-flex flex-column align-center justify-center">
            <v-icon size="80" color="#D4AF37" class="quote-icon-start">mdi-format-quote-open</v-icon>
            
            <transition name="fade" mode="out-in">
              <div :key="currentQuote.quote_en" class="quote-content">
                <p class="text-h4 text-md-h3 font-weight-black text-white mb-8 quote-text italic">
                  "{{ isTamil ? currentQuote.quote_ta : currentQuote.quote_en }}"
                </p>
                <div class="quote-context px-6 py-3 rounded-pill d-inline-block">
                  <span class="text-subtitle-1 font-weight-bold color-gold">
                    — {{ isTamil ? currentQuote.event_ta : currentQuote.event }} ({{ currentQuote.date }})
                  </span>
                </div>
              </div>
            </transition>

            <v-icon size="80" color="#D4AF37" class="quote-icon-end">mdi-format-quote-close</v-icon>
          </div>

          <v-divider></v-divider>
          
          <v-card-actions class="pa-8 bg-white-soft justify-center ga-6">
            <v-btn
              color="#800000"
              size="x-large"
              class="rounded-pill font-weight-black px-10 elevation-4"
              prepend-icon="mdi-refresh"
              @click="shuffleQuote"
            >
              {{ isTamil ? 'அடுத்த மொழி' : 'NEXT QUOTE' }}
            </v-btn>
            
            <v-btn
              variant="elevated"
              color="#D4AF37"
              size="x-large"
              class="rounded-pill font-weight-black px-10 text-maroon"
              prepend-icon="mdi-download"
              @click="downloadQuote"
            >
              {{ isTamil ? 'பதிவிறக்கம்' : 'DOWNLOAD' }}
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- Hidden canvas for image generation -->
        <canvas ref="quoteCanvas" style="display: none;"></canvas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import speechesData from "../../../tvk_vijay_speeches.json";

export default {
  name: "QuoteGenerator",
  inject: ["t", "currentLang"],
  data: () => ({
    allQuotes: [],
    currentQuote: {},
    bgGradients: [
      "linear-gradient(135deg, #800000 0%, #4a0000 100%)",
      "linear-gradient(135deg, #4a0000 0%, #800000 100%)",
      "linear-gradient(135deg, #800000 0%, #D4AF37 150%)"
    ]
  }),
  computed: {
    isTamil() {
      return this.currentLang() === "ta";
    }
  },
  created() {
    this.extractQuotes();
    this.shuffleQuote();
  },
  methods: {
    extractQuotes() {
      const quotes = [];
      speechesData.speeches.forEach(speech => {
        if (speech.key_quotes) {
          speech.key_quotes.forEach(q => {
            quotes.push({
              ...q,
              event: speech.title,
              event_ta: speech.title_ta,
              date: speech.date
            });
          });
        }
      });
      this.allQuotes = quotes;
    },
    shuffleQuote() {
      const randomIndex = Math.floor(Math.random() * this.allQuotes.length);
      this.currentQuote = this.allQuotes[randomIndex];
    },
    async downloadQuote() {
      const canvas = this.$refs.quoteCanvas;
      const ctx = canvas.getContext("2d");
      
      // HD Canvas size
      canvas.width = 1200;
      canvas.height = 1200;

      // Draw background
      const grad = ctx.createLinearGradient(0, 0, 1200, 1200);
      grad.addColorStop(0, "#800000");
      grad.addColorStop(1, "#2a0000");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 1200);

      // Add gold texture/pattern
      ctx.globalAlpha = 0.1;
      for(let i=0; i<50; i++) {
        ctx.fillStyle = "#D4AF37";
        ctx.beginPath();
        ctx.arc(Math.random()*1200, Math.random()*1200, Math.random()*2, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Draw Gold border
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 40;
      ctx.strokeRect(20, 20, 1160, 1160);

      // Quote text
      const text = this.isTamil ? this.currentQuote.quote_ta : this.currentQuote.quote_en;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "italic 900 60px 'Inter', sans-serif";
      
      this.wrapText(ctx, `"${text}"`, 600, 500, 1000, 80);

      // Context
      ctx.fillStyle = "#D4AF37";
      ctx.font = "700 40px 'Inter', sans-serif";
      const contextText = `— ${this.isTamil ? this.currentQuote.event_ta : this.currentQuote.event} (${this.currentQuote.date})`;
      ctx.fillText(contextText, 600, 950);

      // Branding
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "900 30px 'Inter', sans-serif";
      ctx.fillText("TVK OFFICIAL | தமிழக வெற்றிக் கழகம்", 600, 1100);

      // Download
      const link = document.createElement("a");
      link.download = `tvk-quote-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    },
    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
      const words = text.split(' ');
      let line = '';
      let currentY = y;

      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, currentY);
    }
  }
};
</script>

<style scoped>
.color-maroon { color: #800000; }
.color-gold { color: #D4AF37; }
.text-white { color: #ffffff !important; }
.text-maroon { color: #800000 !important; }

.quote-card {
  background: #800000;
  position: relative;
}

.quote-container {
  position: relative;
  min-height: 450px;
  background: linear-gradient(135deg, #800000 0%, #2a0000 100%);
  z-index: 1;
}

.quote-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');
  opacity: 0.3;
  pointer-events: none;
}

.quote-icon-start {
  position: absolute;
  top: 40px;
  left: 40px;
  opacity: 0.4;
}

.quote-icon-end {
  position: absolute;
  bottom: 40px;
  right: 40px;
  opacity: 0.4;
}

.quote-text {
  line-height: 1.5;
  letter-spacing: -0.02em;
  text-shadow: 0 10px 20px rgba(0,0,0,0.4);
  max-width: 90%;
  position: relative;
  z-index: 2;
}

.quote-context {
  background: rgba(212, 175, 55, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  position: relative;
  z-index: 2;
}

.border-gold-thick {
  border: 4px solid #d4af37 !important;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}
.fade-leave-to {
  opacity: 0;
  transform: scale(1.05) translateY(-20px);
}

.italic {
  font-style: italic;
}

.bg-white-soft {
  background-color: #fafafa !important;
}
</style>
