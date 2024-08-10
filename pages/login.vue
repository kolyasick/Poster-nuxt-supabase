<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.store';

const user = useSupabaseUser();
const authStore = useAuthStore();

useSeoMeta({
    title: 'Poster | Login',
    description: 'Poster | Login',
    ogImage: '/public/poster-logo.png'
})

watchEffect(() => {
  if (user.value && user.value.email) {
    authStore.checkOrCreateUser();
  }
});
</script>

<template>
  <div class="w-full h-screen flex flex-col items-center justify-center bg-[#0f0f0f]; px-4">
    <h1 class="text-4xl sm:text-3xl font-extrabold text-white mb-10 text-center">Welcome</h1>

    <div class="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 flex flex-col gap-5">
      <button 
        @click="authStore.login('github')" 
        class="bg-[#0f0f0f] border-2 border-white hover:bg-white hover:text-[#0f0f0f] text-white rounded-lg p-4 flex items-center justify-center gap-3 transition-all duration-300"
      >
        <Icon name="mdi:github" class="w-7 h-7" />
        <p class="text-lg sm:text-base font-semibold">Login with GitHub</p>
      </button>

      <button 
        @click="authStore.login('discord')" 
        class="bg-[#0f0f0f] border-2 border-white hover:bg-white hover:text-[#0f0f0f] text-white rounded-lg p-4 flex items-center justify-center gap-3 transition-all duration-300"
      >
        <Icon name="mdi:discord" class="w-7 h-7" />
        <p class="text-lg sm:text-base font-semibold">Login with Discord</p>
      </button>
      <button 
        @click="authStore.login('google')" 
        class="bg-[#0f0f0f] border-2 border-white hover:bg-white hover:text-[#0f0f0f] text-white rounded-lg p-4 flex items-center justify-center gap-3 transition-all duration-300"
      >
        <Icon name="mdi:google" class="w-7 h-7" />
        <p class="text-lg sm:text-base font-semibold">Login with Google</p>
      </button>

      <div v-if="authStore.errors" class="text-red-500 text-center mt-4">
        <p>{{ authStore.errors }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.2);
}

button:hover {
  transform: translateY(-4px);
}

h1 {
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
}


</style>
