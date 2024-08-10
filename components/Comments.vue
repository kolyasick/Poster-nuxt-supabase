
<script setup lang='ts'>
import { useNuxtApp } from '#app';

import type { Comment } from '~/types/db.types';

interface Props {
    comment: Comment
}

const nuxtApp = useNuxtApp();
const props = defineProps<Props>();

</script>

<template>
    <article class="text-base bg-transparent rounded-lg mb-5">
        <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-white font-semibold"><img
                        class="mr-2 w-6 h-6 rounded-full"
                        :src="comment.user.avatar"
                        alt="Michael Gough">{{ comment.user.name }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                        title="February 8th, 2022">{{ nuxtApp.$formatDate(comment.createdAt) }}</time></p>
            </div>
            <button
                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500"
                type="button">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
                <span class="sr-only">Comment settings</span>
            </button>
        </footer>
        <p class="text-gray-500 dark:text-gray-400">{{ comment.text }}</p>
    </article>
</template>
    
<style>
    
</style>