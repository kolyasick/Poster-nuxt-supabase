<script setup lang="ts">
import { useGeneralStore } from '~/stores/general.store';
import { usePostStore } from '~/stores/post.store';

const generalStore = useGeneralStore();
const postStore = usePostStore();

const text = ref<string>('');
const file = ref<File | null>(null);
const fileUrl = ref<string>('');
const errors = ref<string | null>(null);

const isLoading = ref<boolean>(false);

const closeModal = () => {
  generalStore.closeModal();
  text.value = '';
  file.value = null;
  fileUrl.value = '';
  errors.value = null;
};

const getFile = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    file.value = target.files[0];
  }
  fileUrl.value = URL.createObjectURL(file.value!);
};

const createPost = async () => {
  if (!text.value.trim()) {
    errors.value = 'Text cannot be empty';
    return;
  }
  try {
    errors.value = null;
    isLoading.value = true;

    await postStore.createPost(text.value, file.value);
    await postStore.getPosts();

    closeModal();
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center z-40">

    <div v-if="isLoading" class="absolute inset-0 bg-black bg-opacity-50 z-50"></div>

    <div v-if="isLoading" class="absolute inset-0 flex flex-col items-center justify-center text-white z-50">
      <Icon class="w-16 h-16 animate-spin" name="eos-icons:bubble-loading"/>
      <div class="w-full mt-1 text-center">Loading...</div>
    </div>

    <div class="relative bg-black bg-opacity-70 rounded-lg p-6 w-full max-w-lg border border-white/20 shadow-lg transform transition-all duration-300 ease-in-out backdrop-blur-lg">
      <Icon @click="closeModal" class="absolute cursor-pointer w-7 h-7 top-2 right-2 text-white/70 hover:text-white transition" name="material-symbols:close-rounded"/>
      <form>
        <div class="mt-6">
          <label for="text" class="block text-sm font-medium text-white/70 mb-2">Enter your text</label>
          <input v-model="text" type="text" id="text" placeholder="Type something..." class="w-full border border-white/20 transition rounded-lg px-4 py-2 bg-black bg-opacity-50 focus:outline-none focus:border-white text-white placeholder-gray-500" />
        </div>
        <span v-if="errors && text == ''" class="text-red-500">{{ errors }}</span>

        <div class="flex items-center justify-center w-full my-4">
          <label v-if="!fileUrl" for="dropzone-file" class="flex transition flex-col items-center justify-center w-full h-64 border-2 border-white/20 border-dashed rounded-lg cursor-pointer hover:border-white bg-black bg-opacity-50">
            <div class="flex flex-col items-center justify-center pt-5 pb-6 text-white/70">
              <svg class="w-10 h-10 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p class="mb-2 text-sm font-semibold">Click to upload or drag and drop</p>
              <p class="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input @input="getFile" id="dropzone-file" type="file" class="hidden" />
          </label>
          <div v-if="fileUrl" class="w-full mt-2">
            <img :src="fileUrl" class="w-full rounded-lg object-cover max-h-[400px]" />
          </div>
        </div>

        <button @click.prevent="createPost" type="submit" class="w-full bg-transparent border border-white/20 hover:bg-white hover:text-black transition text-white px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-white">
          Create Post
        </button>
      </form>
    </div>
  </div>
</template>
