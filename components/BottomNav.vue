<script setup lang='ts'>
import { useAuthStore } from '~/stores/auth.store'
import { useGeneralStore } from '~/stores/general.store';
import { ref } from 'vue';

const generalStore = useGeneralStore()
const authStore = useAuthStore()

</script>

<template>
  <div class="w-[calc(100%-2rem)] p-4 fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-4 bg-black/60 backdrop-blur-md rounded-2xl shadow-lg">
    <button @click="generalStore.openModal" class="flex items-center justify-center w-14 h-14 bg-white/10 rounded-full hover:bg-white/20 transition">
      <Icon class="w-8 h-8 text-white" name="material-symbols:attach-file-add-rounded" />
    </button>
    <button @click="authStore.logout()" class="flex items-center justify-center w-14 h-14 bg-white/10 rounded-full hover:bg-white/20 transition">
      <Icon class="w-8 h-8 text-white" name="mdi:logout" />
    </button>
  </div>

  <transition name="slide-up">
    <CreatePost v-if="generalStore.isModalOpen" @close="generalStore.closeModal" />
  </transition>
</template>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-enter-to, .slide-up-leave-from {
  transform: translateY(0%);
  opacity: 1;
}
</style>
