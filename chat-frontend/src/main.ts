import { createApp } from "vue";
import "./index.css";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import router from "./router/index";
import App from "./App.vue";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersist);

app.use(router);
app.use(pinia);
app.mount("#app");
