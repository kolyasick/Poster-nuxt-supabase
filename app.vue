<script setup lang="ts">



</script>


<template>
  <VitePwaManifest />

  <div class="h-screen">
    <NuxtPage/>
  </div>
</template>


<style>
body{
  @apply bg-[#0f0f0f];
  font-family: cursive;
}
span, img {
  user-select: none
}
</style>