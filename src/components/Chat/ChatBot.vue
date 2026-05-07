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
        ></v-img>
        <v-icon v-else color="white" size="32">mdi-close</v-icon>
      </div>
    </div>

    <!-- Chat Window -->
    <v-fade-transition>
      <v-card v-if="isOpen" class="chat-window elevation-24 border-gold-thin" width="350" height="500">
        <!-- Header -->
        <v-card-title class="chat-header text-white px-4 py-3 d-flex align-center">
          <v-avatar size="32" class="mr-3 border-gold-thin">
            <v-img :src="chatbotIcon"></v-img>
          </v-avatar>
          <div class="chat-header-info">
            <div class="text-subtitle-2 font-weight-bold">TVK AI Assistant</div>
            <div class="text-caption opacity-80">Online | தமிழ் & English</div>
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
                'message-bubble px-4 py-2 rounded-xl text-body-2',
                msg.role === 'user' ? 'user-message bg-maroon text-white' : 'ai-message bg-grey-lighten-4 text-dark'
              ]"
            >
              {{ msg.text }}
            </div>
          </div>
          <div v-if="isTyping" class="mb-4 d-flex justify-start">
            <div class="message-bubble ai-message bg-grey-lighten-4 px-4 py-2 rounded-xl">
              <v-progress-circular indeterminate size="16" width="2" color="#800000"></v-progress-circular>
            </div>
          </div>
        </v-card-text>

        <!-- Input Area -->
        <v-divider></v-divider>
        <v-card-actions class="px-3 py-2 bg-white">
          <v-text-field
            v-model="userInput"
            :placeholder="currentLocale === 'ta' ? 'கேள்வி கேட்கவும்...' : 'Type a message...'"
            variant="solo-filled"
            density="compact"
            hide-details
            rounded="xl"
            flat
            bg-color="grey-lighten-4"
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
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-card-actions>
      </v-card>
    </v-fade-transition>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick, inject, computed } from 'vue';
import chatIcon3d from '../../assets/chat-icon-3d.png';
import vijayLeader from '../../assets/leaders/vijay-leader.png';

const t = inject('t');
const getLang = inject('currentLang');
const currentLocale = computed(() => getLang ? getLang() : 'ta');

const isOpen = ref(false);
const isTyping = ref(false);
const userInput = ref('');
const messageBox = ref(null);

const messages = ref([
  { 
    role: 'ai', 
    text: currentLocale.value === 'ta' 
      ? 'வணக்கம்! நான் TVK-வின் AI உதவியாளர். உங்களுக்கு எப்படி உதவ முடியும்?' 
      : 'Hello! I am TVK\'s AI Assistant. How can I help you today?' 
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

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  const userText = userInput.value;
  messages.value.push({ role: 'user', text: userText });
  userInput.value = '';
  await scrollToBottom();

  isTyping.value = true;
  
  // Simulate AI Response
  setTimeout(async () => {
    let responseText = '';
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('vijay') || lowerText.includes('விஜய்')) {
      responseText = currentLocale.value === 'ta' 
        ? 'தளபதி விஜய் அவர்கள் தமிழக வெற்றிக் கழகத்தின் தலைவர். அவர் தமிழகத்தின் முன்னேற்றத்திற்காக உழைக்கத் தயாராக உள்ளார்.' 
        : 'Thalapathy Vijay is the President of TVK. He is dedicated to the progress of Tamil Nadu.';
    } else if (lowerText.includes('join') || lowerText.includes('இணைய')) {
      responseText = currentLocale.value === 'ta' 
        ? 'எங்கள் கட்சியில் இணைய முகப்புப் பக்கத்தில் உள்ள "உறுப்பினர் ஆகுங்கள்" பொத்தானை அழுத்தவும்.' 
        : 'To join our party, please click the "Become a Member" button on the home page.';
    } else {
      responseText = currentLocale.value === 'ta' 
        ? 'மன்னிக்கவும், இது குறித்த கூடுதல் விவரங்கள் விரைவில் வழங்கப்படும். வேறு ஏதேனும் கேள்விகள் உள்ளதா?' 
        : 'I apologize, but more details on this will be provided soon. Do you have any other questions?';
    }

    messages.value.push({ role: 'ai', text: responseText });
    isTyping.value = false;
    await scrollToBottom();
  }, 1500);
};

// Initial scroll
watch(isOpen, (newVal) => {
  if (newVal) {
    scrollToBottom();
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
  align-center: center;
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
  border-radius: 16px !important;
  background: white;
}

.chat-header {
  background: linear-gradient(135deg, #800000 0%, #a00000 100%);
  border-bottom: 2px solid #D4AF37;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
}

.message-bubble {
  max-width: 80%;
  word-wrap: break-word;
  line-height: 1.5;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.user-message {
  border-bottom-right-radius: 4px !important;
}

.ai-message {
  border-bottom-left-radius: 4px !important;
  border: 1px solid #e0e0e0;
}

.bg-maroon {
  background-color: #800000 !important;
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
    height: 400px;
  }
}
</style>
