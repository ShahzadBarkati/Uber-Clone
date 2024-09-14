<template>
  <div id="MapView">
    <div class="leaflet-top leaflet-left" style="pointer-events: auto">
      <button
        class="absolute z-50 rounded-full bg-white p-1 top-8 left-4"
        @click="goBack()"
      >
        <ArrowLeftIcon :size="40" />
      </button>
    </div>

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
import { onMounted, ref, computed } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import ArrowLeftIcon from "vue-material-design-icons/ArrowLeft.vue";
import { useRouter } from "vue-router";
import { useDirectionStore } from "@/Store/direction-store";

const map = ref(null);
const router = useRouter();
const direction = useDirectionStore();

const time = ref(0);
const distance = ref(0);

if (!direction.pickup || !direction.destination) {
  router.push({ name: "direction" });
}

const LatLon = {
  start: {
    lat: direction.pickup.lat,
    lon: direction.pickup.lon,
  },
  end: {
    lat: direction.destination.lat,
    lon: direction.destination.lon,
  },
};

const DefaultIcon = L.icon({
  iconUrl: "images/marker-icon.png",
  shadowUrl: "images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

onMounted(() => {
  setTimeout(() => {
    initMap();
  }, 100);
});

const initMap = () => {
  map.value = L.map("map", {
    zoomControl: false,
    fullscreenControl: false,
  }).setView([LatLon.start.lat, LatLon.start.lon], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 6,
    maxZoom: 19,
  }).addTo(map.value);

  const control = L.Routing.control({
    fitSelectedRoutes: true,
    lineOptions: {
      styles: [{ color: "blue", opacity: 0.8, weight: 5 }],
      extendToWaypoints: true,
      missingRouteTolerance: 1,
    },
    show: true,
    routeWhileDragging: true,
    waypoints: [
      L.latLng(LatLon.start.lat, LatLon.start.lon),
      L.latLng(LatLon.end.lat, LatLon.end.lon),
    ],
  }).addTo(map.value);

  control.on("routesfound", function (e) {
    const routes = e.routes;
    time.value = routes[0].summary.totalTime; // Gets total time in seconds
    distance.value = routes[0].summary.totalDistance; // Gets total distance in meters
  });

  control.getContainer().style.display = "none";
};

const goBack = () => {
  direction.pickup = null;
  direction.destination = null;
  router.push({ name: "direction" });
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
