import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./assets/tailwind.css";

import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

import { createPinia } from "pinia";
const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
