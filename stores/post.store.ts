import axios from "axios";
import { defineStore } from "pinia";
import type { Post } from '~/types/db.types';
import type { Like } from "~/types/db.types";
import { useSupabaseClient } from "#imports";
import { useSupabaseUser } from "#imports";

export const usePostStore = defineStore("post", {
    state: () => ({
        posts: [] as Post[],
    }),

    actions: {
        async getPosts() {
            try {
                const {data} = await axios.get('/api/get-all-posts')
                this.posts = data.map((post: Post) => ({
                    ...post,
                    isLiked: post.likes.some((like: Like) => like.userId === useSupabaseUser().value?.id)
                }))
            } catch (err) {
                console.error(err)
            }
        },
        async createPost(text: string, file: File | null) {
          const title = text;
          const userId = useSupabaseUser().value.id;
        
          if (!file) {
            try {
              const response = await axios.post('/api/create-post', {
                title,
                userId,
              });
            } catch (err) {
              console.error('Error creating post:', err);
            }
            return;
          }
        
          try {
            const { data, error } = await useSupabaseClient().storage
              .from('poster-files')
              .upload(`${file.name + Date.now()}`, file);
        
            if (error) {
              console.error('Upload error:', error);
              return;
            }
        
            const url = data?.path;
        
            const response = await axios.post('/api/create-post', {
              title,
              url,
              userId,
            });
          } catch (err) {
            console.error('Error creating post with file:', err);
          }
        }
        
    }
})