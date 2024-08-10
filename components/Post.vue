<script setup lang="ts">
import { useRuntimeConfig } from '#app';
import { usePostStore } from '#imports';
import { useNuxtApp } from '#app';
import axios from 'axios';
import type { Post } from '~/types/db.types';

const user = useSupabaseUser();
const config = useRuntimeConfig();
const postStore = usePostStore();

const openCommentPostId = ref<number | null>(null);
const isMenuOpen = ref<boolean>(false);
const nuxtApp = useNuxtApp();

interface Props {
  post: Post;
}

const props = defineProps<Props>();

const toggleLike = async () => {
  if (!user.value || !user.value.id) {
    return navigateTo('/login');
  }

  const userId = user.value.id;

  if (props.post.isLiked) {
    props.post.isLiked = false;
    props.post.likes = props.post.likes.filter(like => like.userId !== userId);

    await unlikePost(props.post.id, userId);
  } else {
    props.post.isLiked = true;
    props.post.likes.push({ userId: userId });

    await likePost(props.post.id, userId);
  }
};

const likePost = async (postId: number, userId: string) => {
  try {
    await axios.post('/api/like-post', {
      postId: postId,
      userId: userId
    });
  } catch (error) {
    console.error('Failed to like post:', error);
  }
};

const unlikePost = async (postId: number, userId: string) => {
  try {
    await axios.post('/api/unlike-post', {
      postId: postId,
      userId: userId
    });
  } catch (error) {
    console.error(error);
  }
};

const toggleComments = (postId: number) => {
  if (openCommentPostId.value === postId) {
    openCommentPostId.value = null;
  } else {
    openCommentPostId.value = postId;
  }
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const deletePost = async (postId: number) => {
  try {
    const res = await axios.delete(`/api/delete-post/${postId}`);
    await postStore.getPosts();
    console.log(res);
    
  } catch (error) {
    console.error('Failed to delete post:', error);
  }
};
</script>

<template>

  <div class="flex bg-transparent border-l border-white/10 mx-4 md:mx-auto my-10 max-w-md md:max-w-2xl">
    <div class="flex items-center px-4 py-6 w-[650px] relative">
      <div class="w-full">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img class="w-14 h-14 rounded-full object-cover mr-4 shadow" :src="post.user?.avatar" alt="avatar">
            <div class="text-lg font-semibold">
              <h2 class="text-white/85">{{ post.user?.name }}</h2>
              <small class="text-sm font-thin text-white/60">{{ nuxtApp.$formatDate(post.createdAt) }}</small>
            </div>
          </div>
          <button v-if="user?.id === post.user?.id" @click="toggleMenu" class="relative">
            <Icon name="mdi:dots-vertical" class="w-6 h-6 text-white/60" />
            <div v-if="isMenuOpen " class="absolute right-0 mt-2 w-32 border border-white/20 hover:bg-white/10 text-white rounded-lg shadow-lg">
              <button @click="deletePost(post.id)" class="flex items-center justify-center gap-2 w-full py-2">
                <Icon name="mdi:trash-can-outline" class="w-5 h-5" />
                <span>Delete</span>
              </button>
            </div>
          </button>
        </div>
        <p class="mt-3 text-md font-normal mb-3 text-white/85 break-words">
          {{ post.title }}
        </p>
        <img class="rounded max-h-[450px] object-cover w-full" :src="config.public.bucketUrl + post.url" alt="">
        <div class="mt-4 flex items-center text-white">
          <div @click="toggleLike" class="flex text-sm mr-3 cursor-pointer">
            <svg :fill="post.isLiked ? 'red' : 'none'" viewBox="0 0 24 24" class="w-5 h-5 mr-1" :stroke="post.isLiked ? 'red' : 'currentColor'">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span>{{ post.likes.length }}</span>
          </div>
          <div @click="toggleComments(post.id)" class="flex text-sm mr-8 cursor-pointer">
            <svg fill="none" viewBox="0 0 24 24" class="w-5 h-5 mr-1" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
            </svg>
            <span>{{ post.comments.length }}</span>
          </div>
          <div class="flex text-sm mr-4">
            <svg fill="none" viewBox="0 0 24 24" class="w-5 h-5 mr-1" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
            <span>share</span>
          </div>
        </div>
        <div class="w-full h-px bg-white/10 my-4"></div>
        <transition name="comment-overlay">
          <CommentsOverlay v-if="openCommentPostId === post.id" :post="post"/>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-overlay-enter-active,
.comment-overlay-leave-active {
  transition: max-height 0.5s ease, opacity 0.5s ease;
}

.comment-overlay-enter-from,
.comment-overlay-leave-to {
  max-height: 0;
  opacity: 0;
}

.comment-overlay-enter-to,
.comment-overlay-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
