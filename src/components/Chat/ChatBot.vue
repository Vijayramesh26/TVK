<template>
  <div class="chatbot-wrapper">
    <!-- Unique Custom Floating Assistant Toggle -->
    <div 
      class="chatbot-toggle-wrap elevation-12"
      @click="toggleChat"
      :class="{ 'wrap-active': isOpen }"
    >
      <div class="pulse-ring"></div>
      <div class="status-badge"></div>
      
      <div class="toggle-content">
        <v-img 
          v-if="!isOpen" 
          :src="chatIcon3d" 
          class="fab-image"
          cover
          alt="தவெக AI உதவியாளர்"
        ></v-img>
        <v-icon v-else color="white" size="32">mdi-close</v-icon>
      </div>
    </div>

    <!-- Chat Window -->
    <v-fade-transition>
      <v-card v-if="isOpen" class="chat-window elevation-24 border-gold-thin" width="380" height="550">
        <!-- Header -->
        <v-card-title class="chat-header text-white px-4 py-3 d-flex align-center">
          <v-avatar size="32" class="mr-3 border-gold-thin">
            <v-img :src="vijayLeader" alt="தளபதி விஜய் - தவெக தலைவர்"></v-img>
          </v-avatar>
          <div class="chat-header-info">
            <div class="text-subtitle-2 font-weight-bold">TVK AI Assistant</div>
            <div class="text-caption opacity-80 d-flex align-center">
              <span class="status-dot mr-1"></span>
              Online | தமிழ் & English
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-btn icon size="x-small" variant="text" color="white" @click="isOpen = false">
            <v-icon>mdi-window-minimize</v-icon>
          </v-btn>
        </v-card-title>

        <!-- Messages Area -->
        <v-card-text class="chat-messages px-3 py-4" ref="messageBox">
          <div v-for="(msg, i) in messages" :key="i" class="mb-4 d-flex" :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
            <div
              :class="[
                'message-bubble px-4 py-2 rounded-xl text-body-2 shadow-sm',
                msg.role === 'user' ? 'user-message text-white' : 'ai-message bg-white text-dark'
              ]"
            >
              {{ msg.text }}
            </div>
          </div>
          
          <!-- Typing Indicator -->
          <div v-if="isTyping" class="mb-4 d-flex justify-start">
            <div class="message-bubble ai-message bg-white px-4 py-2 rounded-xl d-flex align-center">
              <div class="typing-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </v-card-text>

        <!-- Suggestions Section -->
        <div v-if="showSuggestions" class="suggestions-container px-3 py-2 bg-grey-lighten-5">
          <div class="text-caption text-grey-darken-1 mb-2 font-weight-medium">
            {{ currentLocale === 'ta' ? 'பொதுவான கேள்விகள்:' : 'Suggested Questions:' }}
          </div>
          <div class="d-flex flex-wrap gap-2">
            <v-chip
              v-for="(sug, idx) in suggestions"
              :key="idx"
              size="small"
              variant="flat"
              color="white"
              class="sug-chip border-gold-thin mb-1"
              @click="handleSuggestion(sug)"
            >
              {{ currentLocale === 'ta' ? sug.ta : sug.en }}
            </v-chip>
          </div>
        </div>

        <!-- Input Area -->
        <v-divider></v-divider>
        <v-card-actions class="px-3 py-3 bg-white">
          <v-text-field
            v-model="userInput"
            :placeholder="currentLocale === 'ta' ? 'கேள்வி கேட்கவும்...' : 'Type a message...'"
            variant="solo-filled"
            density="comfortable"
            hide-details
            rounded="pill"
            flat
            bg-color="grey-lighten-4"
            class="chat-input"
            @keyup.enter="sendMessage"
          >
            <template v-slot:append-inner>
              <v-btn
                icon
                size="small"
                variant="text"
                color="#800000"
                @click="sendMessage"
                :disabled="!userInput.trim()"
              >
                <v-icon>mdi-send-variant</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-card-actions>
      </v-card>
    </v-fade-transition>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, inject, computed } from 'vue';
import chatIcon3d from '../../assets/chat-icon-3d.png';
import vijayLeader from '../../assets/leaders/vijay-leader.png';
import speechesData from '../../../tvk_vijay_speeches.json';
import { newsData } from '../../data/newsData';

const getLang = inject('currentLang');
const currentLocale = computed(() => getLang ? getLang() : 'ta');

const isOpen = ref(false);
const isTyping = ref(false);
const userInput = ref('');
const messageBox = ref(null);
const showSuggestions = ref(true);

const suggestions = [
  { en: "CM Vijay's first orders", ta: "முதலமைச்சர் விஜய்யின் முதல் அரசாணைகள்" },
  { en: "Free electricity scheme", ta: "இலவச மின்சாரத் திட்டம்" },
  { en: "Singapen safety force", ta: "சிங்கப்பெண் பாதுகாப்புப் படை" },
  { en: "Madhuravoyal victory", ta: "மதுரவாயல் வெற்றி விழா" },
  { en: "How to join the party?", ta: "கட்சியில் இணைய வழிமுறை" }
];

const messages = ref([
  { 
    role: 'ai', 
    text: currentLocale.value === 'ta' 
      ? 'வணக்கம்! தமிழக முதலமைச்சர் தளபதி விஜய் அவர்களின் அரசு மற்றும் தவெக குறித்த தகவல்களை வழங்க நான் தயார். உங்களுக்கு எப்படி உதவ முடியும்?' 
      : 'Hello! I am here to provide information about Chief Minister Thalapathy Vijay\'s government and TVK. How can I help you today?' 
  }
]);

const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

const scrollToBottom = async () => {
  await nextTick();
  if (messageBox.value) {
    const el = messageBox.value.$el || messageBox.value;
    el.scrollTop = el.scrollHeight;
  }
};

const handleSuggestion = (sug) => {
  userInput.value = currentLocale.value === 'ta' ? sug.ta : sug.en;
  sendMessage();
  showSuggestions.value = false;
};

const findResponse = (query) => {
  const q = query.toLowerCase();
  const isTa = currentLocale.value === 'ta';

  // Chief Minister & Government
  if (q.includes('cm') || q.includes('chief minister') || q.includes('முதலமைச்சர்') || q.includes('பதவியேற்பு') || q.includes('governance')) {
    return isTa
      ? "தளபதி விஜய் அவர்கள் இன்று (மே 10, 2026) தமிழக முதலமைச்சராகப் பதவியேற்றுள்ளார். இது தமிழக அரசியல் வரலாற்றில் ஒரு புதிய சகாப்தத்தின் தொடக்கமாகும்."
      : "Thalapathy Vijay has been sworn in as the Chief Minister of Tamil Nadu today (May 10, 2026), marking the beginning of a new era in state politics.";
  }

  // Executive Orders (Electricity, Singapen, Drugs)
  if (q.includes('order') || q.includes('அரசாணை') || q.includes('electricity') || q.includes('மின்சாரம்') || q.includes('singapen') || q.includes('சிங்கப்பெண்') || q.includes('drug') || q.includes('போதை')) {
    return isTa
      ? "முதல்வர் விஜய் கையெழுத்திட்ட முதல் அரசாணைகள்: \n1. 500 யூனிட் வரை பயன்படுத்தும் குடும்பங்களுக்கு 200 யூனிட் இலவச மின்சாரம். \n2. 'சிங்கப்பெண்' சிறப்பு பாதுகாப்புப் படை. \n3. சிறப்பு போதைப்பொருள் ஒழிப்பு பிரிவுகள்."
      : "CM Vijay's first executive orders include: \n1. 200 units of free electricity for families consuming up to 500 units. \n2. 'Singapen' special security force for women. \n3. Special anti-drug units in every district.";
  }

  // Madhuravoyal & Recent Wins
  if (q.includes('madhuravoyal') || q.includes('மதுரவாயல்') || q.includes('155') || q.includes('victory') || q.includes('வெற்றி')) {
    return isTa
      ? "மதுரவாயல் தொகுதி 155-வது வார்டில் தவெக பிரம்மாண்ட வெற்றி பெற்றுள்ளது. இன்று அங்கு எழுச்சிமிக்க வெற்றி விழா மற்றும் கொண்டாட்டங்கள் நடைபெறுகின்றன."
      : "TVK has secured a massive victory in the Madhuravoyal 155th ward. Grand victory celebrations and rallies are being held there today.";
  }

  // Ideology & Icons
  if (q.includes('ideology') || q.includes('கொள்கை') || q.includes('vision') || q.includes('நோக்கம்') || q.includes('icons')) {
    const icons = isTa ? speechesData.party_overview.guiding_icons_ta.join(', ') : speechesData.party_overview.guiding_icons.join(', ');
    const ideologies = isTa ? speechesData.party_overview.ideology_ta.join(', ') : speechesData.party_overview.ideology.join(', ');
    return isTa 
      ? `தவெக ${ideologies} கொள்கைகளை அடிப்படையாகக் கொண்டது. பி.ஆர். அம்பேத்கர், பெரியார், காமராஜ் ஆகியோர் எங்களின் வழிகாட்டும் தலைவர்கள்.`
      : `TVK is based on ${ideologies} ideologies. Our guiding icons are B.R. Ambedkar, Periyar, and K. Kamaraj.`;
  }

  // Women's Welfare (General)
  if (q.includes('women') || q.includes('பெண்') || q.includes('welfare') || q.includes('நலம்')) {
    return isTa
      ? "பெண்களின் பாதுகாப்பிற்கு 'சிங்கப்பெண்' படை அமைப்பதோடு, மாதம் ₹2,500 நிதி உதவி மற்றும் அரசு பேருந்துகளில் இலவச பயணம் ஆகியவற்றை முதல்வர் விஜய் உறுதி செய்துள்ளார்."
      : "In addition to the 'Singapen' safety force, CM Vijay has committed to ₹2,500 monthly financial assistance and free bus travel for women.";
  }

  // AI & Technology
  if (q.includes('ai') || q.includes('tech') || q.includes('தொழில்நுட்பம்')) {
    return isTa
      ? "தமிழகத்தை இந்தியாவின் AI தலைநகராக மாற்றுவதே எங்கள் இலக்கு. இதற்காக தனி AI அமைச்சகம் மற்றும் பல்கலைக்கழகம் அமைக்கப்படும்."
      : "Our goal is to make Tamil Nadu the AI capital of India, with a dedicated AI Ministry and University.";
  }

  // News & Campaign
  if (q.includes('news') || q.includes('latest') || q.includes('செய்தி') || q.includes('சமீபத்திய')) {
    const latest = newsData[0];
    return isTa
      ? `சமீபத்திய செய்தி: ${latest.title}. இது குறித்து மேலும் அறிய செய்திகள் பக்கத்திற்குச் செல்லவும்.`
      : `Latest news: ${latest.title}. Visit the News section for full details.`;
  }

  // Join Party
  if (q.includes('join') || q.includes('member') || q.includes('இணைய') || q.includes('உறுப்பினர்')) {
    return isTa
      ? "தவெக-வில் இணைய 'தமிழக வெற்றிக் கழகம்' அதிகாரப்பூர்வ செயலியைப் பதிவிறக்கவும் அல்லது இணையதளத்தில் 'உறுப்பினர் ஆகுங்கள்' பக்கத்திற்குச் செல்லவும்."
      : "To join TVK, please download the official TVK app or visit the 'Become a Member' section on our website.";
  }

  // Default fallback
  return isTa
    ? "மன்னிக்கவும், இது குறித்த கூடுதல் விவரங்கள் விரைவில் வழங்கப்படும். வேறு ஏதேனும் கேள்விகள் உள்ளதா?"
    : "I apologize, but more details on this will be provided soon. Do you have any other questions?";
};

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  const userText = userInput.value;
  messages.value.push({ role: 'user', text: userText });
  userInput.value = '';
  showSuggestions.value = false;
  await scrollToBottom();

  isTyping.value = true;
  
  // Simulate AI Response with intelligent logic
  setTimeout(async () => {
    const responseText = findResponse(userText);
    messages.value.push({ role: 'ai', text: responseText });
    isTyping.value = false;
    await scrollToBottom();
  }, 1000);
};

// Initial scroll
watch(isOpen, (newVal) => {
  if (newVal) {
    scrollToBottom();
    // Reset suggestions if chat is empty except for welcome
    if (messages.value.length === 1) {
      showSuggestions.value = true;
    }
  }
});
</script>

<style scoped>
.chatbot-toggle-wrap {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #800000 0%, #4a0000 100%);
  border: 2px solid #D4AF37;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: float 4s ease-in-out infinite;
}

.wrap-active {
  transform: rotate(180deg) scale(0.9);
  background: #D4AF37;
  border-color: #800000;
}

.toggle-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  z-index: 2;
}

.fab-image {
  width: 44px;
  height: 44px;
}

.pulse-ring {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 2px solid #D4AF37;
  border-radius: 50%;
  opacity: 0;
  animation: pulse 2s linear infinite;
  z-index: 1;
}

.status-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 12px;
  height: 12px;
  background: #4CAF50;
  border: 2px solid white;
  border-radius: 50%;
  z-index: 3;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.8);
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #4CAF50;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 5px #4CAF50;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.3); opacity: 0; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.chatbot-wrapper {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
}

.chat-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 20px !important;
  background: #fdfdfd;
}

.chat-header {
  background: linear-gradient(135deg, #800000 0%, #a00000 100%);
  border-bottom: 2px solid #D4AF37;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: #800000 #f5f5f5;
}

.message-bubble {
  max-width: 85%;
  word-wrap: break-word;
  line-height: 1.6;
  font-family: 'Inter', sans-serif;
}

.user-message {
  background: linear-gradient(135deg, #800000 0%, #600000 100%);
  border-bottom-right-radius: 4px !important;
  box-shadow: 0 4px 12px rgba(128, 0, 0, 0.15);
}

.ai-message {
  border-bottom-left-radius: 4px !important;
  border: 1px solid rgba(212, 175, 55, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.suggestions-container {
  border-top: 1px solid rgba(0,0,0,0.05);
  animation: slideInUp 0.3s ease-out;
}

.sug-chip {
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 0.75rem !important;
}

.sug-chip:hover {
  background-color: #800000 !important;
  color: white !important;
  transform: translateY(-2px);
}

.typing-dots {
  display: flex;
  gap: 4px;
}

.typing-dots span {
  width: 6px;
  height: 6px;
  background-color: #800000;
  border-radius: 50%;
  animation: typing 1s infinite ease-in-out;
}

.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0%, 100% { transform: translateY(0); opacity: 0.3; }
  50% { transform: translateY(-4px); opacity: 1; }
}

@keyframes slideInUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.chat-input :deep(.v-field__input) {
  font-size: 0.9rem;
}

.border-gold-thin {
  border: 1px solid #D4AF37 !important;
}

@media (max-width: 600px) {
  .chatbot-wrapper {
    bottom: 20px;
    right: 20px;
  }
  
  .chat-window {
    width: calc(100vw - 40px);
    height: 450px;
  }
}
</style>
