<template>
  <div
    :class="{ hideNavbar: scrollNavbar }"
    class="container-fluid fixed-top bg-dark navbar-height"
    style="z-index: 10000"
  >
    <div
      :class="{ hideSubNavbar: scrollNavbar }"
      class="d-block d-md-none navbar-overlay position-absolute
      start-0 w-100 bg-dark tracking-wider"
    >
      <div
        :class="{ 'd-none': togglerOverlay }"
        class="text-lg navbar-nav text-white text-center w-75 mx-auto tracking-wider"
      >
        <RouterLink
          to="/#/"
          class="nav-link py-3 animated fadeInDown"
          style="animation-duration: 0.5s"
        >
          首頁
        </RouterLink>
        <RouterLink
          to="/user/contact"
          class="nav-link py-3 animated fadeInDown"
          style="animation-duration: 0.6s"
        >
          聯絡我們
        </RouterLink>
        <RouterLink
          to="/user/products"
          class="nav-link py-3 animated fadeInDown"
          style="animation-duration: 0.7s"
        >
          商品
        </RouterLink>
        <div
          class="d-flex justify-content-center animated fadeInDown"
          style="animation-duration: 0.8"
        >
          <RouterLink
            to="/user/carts"
            class="nav-link px-3 py-3 position-relative"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="購物車"
          >
            <i class="bi bi-cart-fill me-1 position-relative" style="font-size: 18px">
              <span
                :class="{ 'd-none': cartsNum == 0 }"
                ref="CartsNum"
                class="d-block position-absolute navbar-badge navbar-badge-md animated"
                >{{ cartsNum }}
              </span>
            </i>
          </RouterLink>
          <RouterLink
            to="/user/favorite"
            class="nav-link px-3 py-3 position-relative"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="我的最愛"
          >
            <i class="bi bi-heart-fill me-1 position-relative" style="font-size: 18px">
              <span
                :class="{ 'd-none': favoriteData.length == 0 }"
                ref="fav"
                class="d-block position-absolute navbar-badge navbar-badge-md animated"
                >{{ favoriteData.length }}
              </span>
            </i>
          </RouterLink>
          <div
            @click="login"
            @keypress="login"
            class="nav-link px-3 py-3 position-relative cursor-pointer"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="會員"
          >
            <i class="bi bi-person-fill me-1" style="font-size: 18px" />
          </div>
          <RouterLink
            to="/user/checkOrder"
            class="nav-link px-3 py-3 position-relative"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="查詢訂單"
          >
            <i class="bi bi-clipboard2-minus-fill me-1" style="font-size: 18px" />
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <RouterLink to="/" class="d-block logo href-none logo_font text-4xl"> DESSERT </RouterLink>
      <div
        @click="openOverlay"
        @keydown="openOverlay"
        class="d-block d-md-none navbar-sm text-white ms-auto"
      >
        <div class="navbar-icon">
          <span class="d-block" ref="navbarSpan1" />
          <span class="d-block" ref="navbarSpan2" />
          <span class="d-block" ref="navbarSpan3" />
        </div>
      </div>
      <div class="navbar-md d-none d-md-flex ms-auto tracking-wider text-lg">
        <RouterLink
          to="/#/"
          class="nav-link px-3 py-3"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="回到首頁"
        >
          首頁
        </RouterLink>
        <RouterLink to="/user/contact" class="nav-link py-3"> 聯絡我們 </RouterLink>
        <RouterLink to="/user/products" class="nav-link px-3 py-3"> 商品 </RouterLink>
        <RouterLink
          to="/user/carts"
          class="nav-link px-3 py-3 position-relative"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="購物車"
        >
          <i class="bi bi-cart-fill me-1 position-relative text-1em">
            <span
              :class="{ 'd-none': cartsNum == 0 }"
              ref="CartsNum"
              class="d-block position-absolute navbar-badge navbar-badge-md animated"
            >
              {{ cartsNum }}
            </span>
          </i>
        </RouterLink>
        <RouterLink
          to="/user/favorite"
          class="nav-link px-3 py-3 position-relative"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="我的最愛"
        >
          <i class="bi bi-heart-fill me-1 position-relative text-1em">
            <span
              :class="{ 'd-none': favoriteData.length == 0 }"
              ref="fav"
              class="d-block position-absolute navbar-badge navbar-badge-md animated"
            >
              {{ favoriteData.length }}
            </span>
          </i>
        </RouterLink>
        <div
          @click="login"
          @keypress="login"
          class="nav-link px-3 py-3 position-relative cursor-pointer"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="會員"
        >
          <i class="bi bi-person-fill me-1 text-1em" />
        </div>
        <RouterLink
          to="/user/checkOrder"
          class="nav-link px-3 py-3 position-relative"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="查詢訂單"
        >
          <i class="bi bi-clipboard2-minus-fill me-1 text-1em" />
        </RouterLink>
      </div>
    </div>
  </div>
  <LoginModal ref="loginModal" />
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import 'sweetalert2/src/sweetalert2.scss';
import emitter from '@/methods/emitter';
import LoginModal from '@/components/LoginModal.vue';

const Swal = require('sweetalert2');

export default {
  setup() {
    const cartsData = ref({});
    const favoriteData = ref([]);
    const togglerOverlay = ref(true);
    const scrollNavbar = ref(false);
    const lastScrollTop = ref(0);
    const cartsNum = ref(0);
    const loginModal = ref(null);
    const navbarSpan1 = ref(null);
    const navbarSpan2 = ref(null);
    const navbarSpan3 = ref(null);
    const CartsNum = ref(null);

    const openOverlay = () => {
      if (togglerOverlay.value === true) {
        togglerOverlay.value = false;
        navbarSpan1.value.classList.add('rotate45');
        navbarSpan2.value.classList.add('rotate-none');
        navbarSpan3.value.classList.add('rotate-45');
      } else {
        togglerOverlay.value = true;
        navbarSpan1.value.classList.remove('rotate45');
        navbarSpan2.value.classList.remove('rotate-none');
        navbarSpan3.value.classList.remove('rotate-45');
      }
    };
    const scrollHandling = () => {
      // const scrollTop = document.documentElement.scrollTop
      // || window.pageYOffset || document.body.scrollTop;
      // if (document.body.clientWidth >= 768) {
      //   if (scrollTop >= lastScrollTop.value) {
      //     // 讀取下面時
      //     scrollNavbar.value = true;
      //   } else {
      //     // 讀取上面時
      //     scrollNavbar.value = false;
      //   }
      //   lastScrollTop.value = scrollTop;
      // }
    };
    const getCarts = () => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      axios
        .get(api)
        .then((res) => {
          cartsData.value = res.data.data.carts;
          cartsNum.value = res.data.data.carts.length;
        })
        .catch(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: 'error',
            title: '連線異常',
          });
        });
    };
    const updateFav = () => {
      favoriteData.value = JSON.parse(localStorage.getItem('fav')) || [];
    };
    const login = () => {
      loginModal.value.modalShow();
      togglerOverlay.value = true;
      navbarSpan1.value.classList.remove('rotate45');
      navbarSpan2.value.classList.remove('rotate-none');
      navbarSpan3.value.classList.remove('rotate-45');
    };

    onMounted(() => {
      window.addEventListener('scroll', scrollHandling());
      getCarts();
      updateFav();
      emitter.on('updateNum', () => {
        updateFav();
      });
      emitter.on('updateCartsNum', () => {
        getCarts();
      });
    });

    return {
      cartsData,
      favoriteData,
      togglerOverlay,
      scrollNavbar,
      lastScrollTop,
      cartsNum,
      openOverlay,
      scrollHandling,
      getCarts,
      updateFav,
      login,
      loginModal,
      navbarSpan1,
      navbarSpan2,
      navbarSpan3,
      CartsNum,
    };
  },
  components: {
    LoginModal,
  },
  // created() {
  //   emitter.on('updateNum', () => {
  //     this.updateFav();
  //   });
  //   emitter.on('updateCartsNum', () => {
  //     this.getCarts();
  //   });
  // },
  // unmouned() {
  //   emitter.off('updateCartsNum');
  // },
};
</script>
