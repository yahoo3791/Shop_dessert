import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: '首頁',
    component: HomeView,
  },
  {
    path: '/user',
    component: () => import('../views/UserBoard.vue'),
    children: [
      {
        path: 'products',
        name: '產品',
        component: () => import('../views/ProductsView.vue'),
      },
      {
        path: 'carts',
        name: '購物車',
        component: () => import('../views/CartView.vue'),
      },
      {
        path: 'ordercontact',
        name: '訂購人資訊',
        component: () => import('../views/OrderContact.vue'),
      },
      {
        path: 'product/:productId',
        name: '看更多',
        component: () => import('../views/ProductMore.vue'),
      },
      {
        path: 'checkout/:orderId',
        name: '結帳流程',
        component: () => import('../views/CheckoutView.vue'),
      },
      {
        path: 'faq',
        name: '常見問題',
        component: () => import('../views/FaqView.vue'),
      },
      {
        path: 'contact',
        name: '聯絡方式',
        component: () => import('../views/ContactView.vue'),
      },
      {
        path: 'favorite',
        name: '我的收藏',
        component: () => import('../views/FavoriteView.vue'),
      },
      {
        path: 'checkOrder',
        name: '查詢訂單',
        component: () => import('../views/CheckOrder.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'backproducts',
        name: '管理產品',
        component: () => import('../views/back/BackProducts.vue'),
      },
      {
        path: 'order',
        name: '管理訂單',
        component: () => import('../views/back/BackOrder.vue'),
      },
      {
        path: 'coupon',
        name: '管理優惠卷',
        component: () => import('../views/back/BackCoupon.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: '首頁',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`;
  next();
});

export default router;
