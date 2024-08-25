<template>
  <div id="Direction">
    <div class="grid grid-cols-12 mt-4 shadow-md">
      <div class="col-span-2 mx-auto">
        <div>
          <ArrowIcon :size="35" />
        </div>

        <div class="w-full h-16 mt-4">
          <div :class="[isPickupActive ? 'circle-black' : 'circle-gray']"></div>
          <div class="line"></div>
          <div
            :class="[!isPickupActive ? 'square-black' : 'square-gray']"
          ></div>
        </div>
      </div>

      <div class="col-span-10 pr-4">
        <div class="w-full h-5">
          <div class="mb-2 mt-5">
            <AutoCompleteInput
              theId="firstInput"
              v-model:input="pickup"
              placeholder="Enter Pickup Location"
              @isActive="isPickupActive = true"
              @clearInput="clearInput('firstInput')"
            />
          </div>

          <div class="mb-3">
            <AutoCompleteInput
              theId="secondInput"
              v-model:input="destination"
              placeholder="Where to?"
              @isActive="isPickupActive = false"
              @clearInput="clearInput('secondInput')"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-for="address in addressData" :key="address">
      <div
        @click="storeAddress(address)"
        class="flex item-center custom-border-bottom"
      >
        <div class="bg-gray-400 mx-5 my-3.5 p-1.5 rounded-full">
          <MapMarkerIcon :size="25" fillColor="#f5f5f5" />
        </div>
        <div>
          <div class="text-lg text-gray-600 mt-4">
            {{ address.display_name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import ArrowIcon from "vue-material-design-icons/ArrowLeft.vue";
import MapMarkerIcon from "vue-material-design-icons/MapMarker.vue";
import { useDirectionStore } from "@/Store/direction-store";
import AutoCompleteInput from "../components/AutoCompleteInput.vue";
import { debounce } from "lodash";
import axios from "axios";
import { useRouter } from "vue-router";

let isPickupActive = ref(false);
let pickup = ref("");
let destination = ref("");
let addressData = ref("");

const router = useRouter();
const direction = useDirectionStore();

onMounted(() => {
  document.getElementById("firstInput").focus();
});

const clearInput = (inputId) => {
  if (inputId == "firstInput") {
    pickup.value = "";
    direction.pickup = null;
  }

  if (inputId == "secondInput") {
    destination.value = "";
    direction.destination = null;
  }
};

const storeAddress = (address) => {
  if (isPickupActive.value) {
    direction.pickup = address;
    pickup.value = address.display_name;
    addressData.value = null;
  } else {
    direction.destination = address;
    destination.value = address.display_name;
  }

  if (direction.pickup != null && direction.destination != null) {
    router.push({ name: "map" });
  }
};

const findAddress = debounce(async (address) => {
  try {
    if (address == null || address == "" || address == "null") {
      addressData.value = "";
      return "";
    }

    let res = await axios.get("address/" + address);

    addressData.value = res.data;
  } catch (error) {
    console.log(error);
  }
}, 500);

watch(pickup, async (pickup) => await findAddress(pickup));
watch(destination, async (destination) => await findAddress(destination));
</script>

<style lang="scss" scoped>
#Direction {
  .bg-custom-color {
    background-color: rgb(237, 237, 237);
  }
  .circle-black {
    margin: 0 auto;
    width: 9px;
    height: 9px;
    background-color: black;
    border-radius: 100%;
  }
  .circle-gray {
    margin: 0 auto;
    width: 9px;
    height: 9px;
    background-color: rgb(191, 191, 191);
    border-radius: 100%;
  }

  .square-black {
    margin: 0 auto;
    width: 9px;
    height: 9px;
    background-color: black;
  }
  .square-gray {
    margin: 0 auto;
    width: 9px;
    height: 9px;
    background-color: rgb(191, 191, 191);
  }
  .line {
    margin: 0 auto;
    width: 2px;
    height: 45px;
    background-color: rgb(191, 191, 191);
  }

  .custom-border-bottom {
    border-bottom: 1px solid rgb(230, 230, 230);
  }
}
</style>
