<template>
  <div id="Home" class="flex flex-col h-screen">
    <div class="m-3 mb-auto">

      <div class="my-20">
        <img width="150" src="img/uber/uber2.svg" alt="" />
      </div>


      <div class="grid grid-cols-2 gap-3 my-3">
        <ServiceSelectLarge text="Ride" image="ride" imageWidth="74" @click="router.push({ name: 'direction' })"/>
        <ServiceSelectLarge
          text="Food"
          image="food"
          imageWidth="74"
          :promo="true"
        />
      </div>
      <div class="grid grid-cols-4 gap-3 my-3">
        <ServiceSelectSmall text="2 Wheels" image="2wheels" />
        <ServiceSelectSmall text="Transit" image="transit" />
        <ServiceSelectSmall text="Reserve" image="reserve" />
        <ServiceSelectSmall text="Travel" image="travel" />
      </div>

      <div
        class="w-full bg-custom-color h-14 rounded-full flex items-center p-3"
        @click="router.push({ name: 'direction' })"
      >
        <MagnifyIcon :size="40" />
        <div class="pl-3 text-xs text-semibold text-gray-700">
          Enter pickup point
        </div>
      </div>
    </div>

    <footer
      class="w-full z-50 flex justify-around p-1 mb-2 border-t-2 border-t-gray-200"
    >
      <div class="grid item-center" @click="router.push({ name: 'home' })">
        <HomeIcon :size="40" fillColor="#1f1e1e" />
        <div
          class="w-full -mt-1 text-xs text-center text-gray-800 text-semibold"
        >
          Home
        </div>
      </div>

      <div class="grid item-center" @click="router.push({ name: 'direction' })">
        <MapMarkerIcon :size="40" fillColor="#b3b1b1" />
        <div
          class="w-full -mt-1 text-xs text-center text-gray-400 text-semibold"
        >
          Destination
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import ServiceSelectLarge from "../components/ServiceSelectLarge.vue";
import ServiceSelectSmall from "../components/ServiceSelectSmall.vue";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";
import HomeIcon from "vue-material-design-icons/Home.vue";
import MapMarkerIcon from "vue-material-design-icons/MapMarker.vue";
import { useRouter } from "vue-router";


const router = useRouter();


</script>

<style lang="scss" scoped>
#Home {
  .bg-custom-color {
    background-color: rgb(237, 237, 237);
  }
}
</style>
