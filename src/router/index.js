import {createRouter, createWebHashHistory} from 'vue-router';
import orderList  from '../views/order/orderList.vue';

const routes = [
  {path: '/', redirect: '/order-list'},
  {path: '/order-list', component: orderList}
];

// 和react套路一样
export default createRouter({
  //createWebHashHistory createWebHistory()两种模式根据需要选择
  history: createWebHashHistory(),
  routes
})