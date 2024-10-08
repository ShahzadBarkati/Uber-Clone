import { defineStore } from "pinia";

export const useDirectionStore = defineStore("direction", {
  state: () => ({
    pickup: null,
    destination: null
  }),
  persist: true,
});
