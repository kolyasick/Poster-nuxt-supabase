<script setup lang='ts'>
import axios from 'axios';
import { ref } from 'vue';
import type { Post } from '~/types/db.types';

const text = ref('');
const user = useSupabaseUser();


interface Props {
    post: Post;
}

const props = defineProps<Props>();

const addComment = async () => {
    if (!text.value.trim()) {
        return;
    }

    if (!user.value) {
        navigateTo('/login');
    }

    try {
        const { data } = await axios.post<Post>('/api/add-comment', 
        { 
            text: text.value,
            postId: props.post.id,
            userId: user.value?.id
        });

        const commentUser = {
            id: user.value?.id,
            name: user.value?.user_metadata.full_name,
            email: user.value?.email || '',
            avatar: user.value?.user_metadata.avatar_url,
        };

        const newComment = {
            id: data.id,        
            postId: props.post.id, 
            text: text.value,      
            userId: commentUser.id, 
            user: commentUser,    
        };

        text.value = '';

        props.post.comments.push(newComment);
        

    } catch (error) {
        console.error('Failed to add comment:', error);
    }
};
</script>
    
<template>
    <div>
        <Comments v-for="comment in props.post.comments" :key="comment.id" :comment="comment"/>

        <div class="w-full">
            <form @submit.prevent="addComment">
                <input 
                    placeholder="Leave a comment" 
                    v-model="text"
                    class="bg-transparent text-white w-3/5 focus:outline-none border border-white/10 rounded px-2 py-1 placeholder:text-white/20" 
                    type="text">
                    <button 
                    :disabled="text === ''"
                    class="border border-white/70 px-2 py-1 rounded ml-2 
                    text-white/70 hover:bg-white/20 transition-colors 
                    disabled:text-white/10 disabled:border-white/10 disabled:hover:bg-transparent"
                >Add</button>
            </form>
        </div>
    </div>
    
</template>
    
<style>
    
</style>