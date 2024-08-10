import { defineStore } from "pinia";


export const useLoadingStore = defineStore("loading", {
    state: () => ({
        isLoading: true as boolean,
    }),

    actions: {
      set(bool: boolean) {
        this.$patch({
          isLoading: bool
        })
      }
    }
})