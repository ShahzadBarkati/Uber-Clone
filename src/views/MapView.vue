<template>
  <div id="MapView">
    <div id="map"></div>

    <div id="VehicleSelection" class="w-full">
      <div class="w-full h-2 border-t"></div>
      <div
        class="w-full text-center border-t-2 p-1.5 text-gray-700 text-lg font-semibold"
      >
        Estimated Distance: {{ totalDistance }} & Estimated Time:
        {{ totalTime }}
      </div>
      <div class="scrollSelection">
        <div class="bg-custom-gray">
          <div class="flex items-center px-4 py-5">
            <img width="75" src="img/uber/ride.png" alt="" />
            <div class="w-full ml-3">
              <div class="flex items-center justify-between">
                <div class="text-2xl mb-1">Uber X</div>
                <div class="text-xl mb-1">Rs {{ calculatePrice(1) }}/-</div>
              </div>
              <div class="text-gray-500">{{ totalTime }}</div>
            </div>
          </div>
        </div>

        <div class="">
          <div class="flex items-center px-4 py-5">
            <img width="75" src="img/uber/comfort.png" alt="" />
            <div class="w-full ml-3">
              <div class="flex items-center justify-between">
                <div class="text-2xl mb-1">Comfort</div>
                <div class="text-xl mb-1">Rs {{ calculatePrice(1.25) }}/-</div>
              </div>
              <div class="text-gray-500">{{ totalTime }}</div>
            </div>
          </div>
        </div>

        <div class="">
          <div class="flex items-center px-4 py-5">
            <img width="75" src="img/uber/uberxl.png" alt="" />
            <div class="w-full ml-3">
              <div class="flex items-center justify-between">
                <div class="text-2xl mb-1">Uber XL</div>
                <div class="text-xl mb-1">Rs {{ calculatePrice(1.5) }}/-</div>
              </div>
              <div class="text-gray-500">{{ totalTime }}</div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex item-center justify-center bg-white px-4 py-6 w-full absolute bottom-0 shadow-inner"
      >
        <button
          class="bg-black text-2xl text-white py-4 px-4 rounded-sm w-full"
        >
          Confirm UberX
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

import { useDirectionStore } from "@/Store/direction-store";

const map = ref(null);
const time = ref(0);
const distance = ref(0);
const direction = useDirectionStore();

onMounted(() => {
  setTimeout(() => {
    initMap();
  }, 50);
});

const initMap = () => {
  map.value = L.map("map", {
    zoomControl: false,
  }).setView([20.5576062, 74.5246514], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 6,
    maxZoom: 19,
  }).addTo(map.value);

  if (direction.pickup != null && direction.destination != null) {
    const routingControl = L.Routing.control({
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [{ color: "blue", opacity: 0.6, weight: 5 }],
        extendToWaypoints: true,
        missingRouteTolerance: 1,
      },
      show: true,
      waypoints: [
        L.latLng(direction.pickup.lat, direction.pickup.lon), // Start Point
        L.latLng(direction.destination.lat, direction.destination.lon), // End Point
      ],
      routeWhileDragging: true,
    }).addTo(map.value);

    console.log(routingControl);

    routingControl.on("routesfound", function (e) {
      const routes = e.routes;
      time.value = routes[0].summary.totalTime; // Gets total time in seconds
      distance.value = routes[0].summary.totalDistance; // Gets total distance in meters
    });
  }
};

const totalDistance = computed(() => {
  if (distance.value > 0) {
    return (distance.value / 1000).toFixed(1) + " km";
  }

  return "0 km";
});

const totalTime = computed(() => {
  if (time.value > 0) {
    const hours = Math.floor(time.value / 3600);
    const minutes = Math.floor((time.value % 3600) / 60);

    return hours + " hrs " + minutes + " mins";
  }

  return "0 mins";
});

const calculatePrice = (multiplier) => {
  console.log(distance.value);
  
  if (distance.value > 0) {
    return ((distance.value / 900) * multiplier).toFixed(2);
  }

  return 0;
};
</script>

<style lang="scss">
#MapView {
  #map {
    width: 100%;
    height: 50vh;
    top: 0;
    left: 0;
  }

  .gm-style-cc {
    display: none;
  }

  #VehicleSelection {
    .bg-custom-gray {
      background-color: rgb(237, 237, 237);
    }
    .scrollSelection {
      height: calc(50vh - 120px);
      position: absolute;
      overflow-y: auto;
      width: 100%;
    }
  }
}
</style>
