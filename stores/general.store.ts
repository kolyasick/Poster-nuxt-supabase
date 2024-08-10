import { defineStore } from "pinia";


export const useGeneralStore = defineStore("general", {
    state: () => ({
        isModalOpen: false as boolean,
    }),

    actions: {
        openModal() {
            if (!useSupabaseUser().value) {
                return navigateTo('/login')
            }
            this.$patch({
                isModalOpen: true
            })
        },
        closeModal() {
            this.$patch({
                isModalOpen: false
            })
        }
    }
})