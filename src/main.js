import{ createApp } from "vue";
import App from "./App.vue";
import router from './router';

// 把组件加载到dom的id为root的元素下
// createApp(App).use(router).mount("#root");

const app=createApp(App);
app.use(router);
app.mount("#root")