import { defineStore } from "pinia";
import { usePostStore } from "#imports";
import axios from "axios";

type Provider = "google" | "github" | "discord";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        errors: null as string | null,
    }),
    actions: {
        async login(prov: Provider) {
            const {error, data} = await useSupabaseClient().auth.signInWithOAuth({
                provider: prov,
                options: {
                    redirectTo: 'https://poster-kolyasick.netlify.app' + '/login'
                }
            })
        },
        async checkOrCreateUser() {
      
          const { email, user_metadata, id } = useSupabaseUser().value;
          const name = user_metadata.full_name || user_metadata.name || 'Unknown';
          const avatar = user_metadata.avatar_url || '';
      
          if (!email || !name || !avatar || !id) {
              console.error('Missing user data:', { email, name, avatar, id });
              return;
          }
      
          try {
              const response = await axios.post('/api/create-user', {
                  id,
                  email,
                  name,
                  avatar,
              });
      
              if (response.status !== 200) {
                  throw new Error(response.data || 'Failed to create/check user');
              }
      
             return navigateTo('/');
          } catch (error) {
              console.error('Error in checkOrCreateUser:', error);
          }
        },
      
        async logout() {
            const {error} = await useSupabaseClient().auth.signOut()
            if (error) this.errors = error.message
            else navigateTo('/login')
        }
    },
});
