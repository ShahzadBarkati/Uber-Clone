<template>
  <div id="ServiceSelectLarge">
    <div class="w-full rounded-2xl bg-custom-color custom-height">
      <div v-if="promo" class="w-full relative z-10">
        <span
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-700 p-0.5 px-2 rounded-3xl text-gray-100 text-xs"
        >
          Promo
        </span>
      </div>
      <div class="flex justify-between p-2">
        <div class="text-lg ml-2 mt-14 text-gray-400">
          {{ text }}
        </div>
        <div class="mt-3 mr-1">
          <img :width="imageWidth" :src="'img/uber/' + image + '.png'" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps } from "vue";
const props = defineProps({
  text: String,
  image: String,
  imageWidth: String,
  promo: {
    type: Boolean,
    default: false,
  },
});

const { text, image, imageWidth } = toRefs(props);
</script>

<style lang="scss" scoped>
#ServiceSelectLarge {
  .bg-custom-color {
    background-color: rgb(237, 237, 237);
  }

  .custom-height {
    height: 100px;
  }
}
</style>
