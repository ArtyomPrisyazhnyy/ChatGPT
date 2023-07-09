<template>
  <main>
    <div id="chat_container">
      <div
        v-for="(chat, i) in wrapper"
        :key="i"
        class="wrapper"
        :class="{ ai: chat.isAi }"
      >
        <ChatComponent :chat="chat" :key="i" />
      </div>
    </div>
    <form @submit.prevent="fetchAnswer">
      <textarea
        rows="1"
        cols="1"
        placeholder="Введите сообщение..."
        v-model="question"
      ></textarea>
      <button type="submit"><img src="@/assets/send.svg" alt="Отправить" /></button>
    </form>
  </main>
</template>


<script setup>
import { ref } from "vue";
import ChatComponent from "@/components/ChatComponent.vue";
import axios from "axios";

const question = ref("");
const wrapper = ref([]);
const loading = ref(false);

const fetchAnswer = async () => {
  try {
    loading.value = true;
    wrapper.value.push({
      isAi: false,
      value: question.value,
    });
    wrapper.value.push({
      isAi: true,
      value: "Loading....",
    });
    
    const response = await axios.post("http://localhost:8000", {
      question: question.value,
    });
    
    const data = response.data;
    console.log(data);
    const parsedData = data.bot.trim();
    wrapper.value.pop();
    wrapper.value.push({
      isAi: true,
      value: parsedData,
    });
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
    question.value = "";
  }
};
</script>
