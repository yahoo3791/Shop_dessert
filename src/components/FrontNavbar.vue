<template>
  <div
    :class="{'hideNavbar': scrollNavbar}"
    class="container-fluid fixed-top bg-dark navbar-height"
    style="z-index:10000">
    <div
      :class="{'hideSubNavbar': scrollNavbar}"
      class="d-block d-md-none navbar-overlay position-absolute
      start-0 w-100 bg-dark tracking-wider">
        <div
          :class="{'d-none': togglerOverlay}"
          class="text-lg navbar-nav
          text-white text-center w-75 mx-auto tracking-wider">
            <RouterLink
              to="/#/"
              class="nav-link py-3 animated fadeInDown"
              style="animation-duration: .5s;">
              首頁
            </RouterLink>
            <RouterLink
              to="/user/contact"
              class="nav-link py-3 animated fadeInDown"
              style="animation-duration: .6s;">
              聯絡我們
            </RouterLink>
            <RouterLink
              to="/user/products"
              class="nav-link py-3 animated fadeInDown"
              style="animation-duration: .7s;">
              商品
            </RouterLink>
          <div
            class="d-flex justify-content-center animated fadeInDown"
            style="animation-duration: .8;">
              <RouterLink to="/user/carts"
                class="nav-link px-3 py-3 position-relative"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="購物車">
                <i class="bi bi-cart-fill me-1 position-relative"
                  style="font-size:18px">
                  <span
                    :class="{'d-none': cartsNum == 0}"
                    ref="cartsNum"
                    class="d-block position-absolute navbar-badge navbar-badge-md
                    animated">{{ cartsNum }}
                  </span>
                </i>
              </RouterLink>
              <RouterLink
                to="/user/favorite"
                class="nav-link px-3 py-3 position-relative"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="我的最愛">
                <i class="bi bi-heart-fill me-1 position-relative"
                  style="font-size:18px">
                  <span
                    :class="{'d-none': favoriteData.length == 0}"
                    ref="fav"
                    class="d-block position-absolute navbar-badge navbar-badge-md
                    animated">{{ favoriteData.length }}
                  </span>
                </i>
              </RouterLink>
            <div
              @click="login"
              @keypress="login"
              class="nav-link px-3 py-3 position-relative cursor-pointer"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="會員">
                <i class="bi bi-person-fill me-1"
                style="font-size:18px" />
            </div>
            <RouterLink
              to="/user/checkOrder"
              class="nav-link px-3 py-3 position-relative"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="查詢訂單">
              <i class="bi bi-clipboard2-minus-fill me-1"
              style="font-size:18px" />
            </RouterLink>
          </div>
        </div>
    </div>
    <div class="d-flex align-items-center">
      <RouterLink
        to="/"
        class="d-block logo href-none logo_font text-4xl">
        DESSERT
      </RouterLink>
      <div
        @click="openOverlay"
        @keydown="openOverlay"
        class="d-block d-md-none navbar-sm text-white ms-auto">
        <div
          class="navbar-icon">
          <span class="d-block" ref="navbarSpan1" />
          <span class="d-block" ref="navbarSpan2" />
          <span class="d-block" ref="navbarSpan3" />
        </div>
      </div>
      <div
        class="navbar-md d-none d-md-flex ms-auto tracking-wider text-lg">
        <RouterLink
          to="/#/"
          class="nav-link px-3 py-3"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="回到首頁">
          首頁
        </RouterLink>
        <RouterLink
          to="/user/contact"
          class="nav-link py-3">
          聯絡我們
        </RouterLink>
        <RouterLink
          to="/user/products"
          class="nav-link px-3 py-3">
          商品
        </RouterLink>
        <RouterLink
          to="/user/carts"
          class="nav-link px-3 py-3 position-relative"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="購物車">
          <i
            class="bi bi-cart-fill me-1 position-relative text-1em">
            <span
              :class="{'d-none': cartsNum == 0}"
              ref="cartsNum"
              class="d-block position-absolute navbar-badge navbar-badge-md
              animated">
              {{ cartsNum }}
            </span>
          </i>
        </RouterLink>
        <RouterLink
          to="/user/favorite"
          class="nav-link px-3 py-3 position-relative"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="我的最愛">
          <i
            class="bi bi-heart-fill me-1 position-relative text-1em">
            <span
              :class="{'d-none': favoriteData.length == 0}"
              ref="fav"
              class="d-block position-absolute navbar-badge navbar-badge-md
              animated">
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
          title="會員">
          <i class="bi bi-person-fill me-1 text-1em" />
        </div>
        <RouterLink
          to="/user/checkOrder"
          class="nav-link px-3 py-3 position-relative"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="查詢訂單">
          <i class="bi bi-clipboard2-minus-fill me-1 text-1em" />
        </RouterLink>
      </div>
    </div>
  </div>
  <LoginModal ref="LoginModal" />
</template>

<script>
import 'sweetalert2/src/sweetalert2.scss';
import emitter from '@/methods/emitter';
import LoginModal from '@/components/LoginModal.vue';

const Swal = require('sweetalert2');

export default {
  data() {
    return {
      cartsData: {},
      favoriteData: [],
      togglerOverlay: true,
      scrollNavbar: false,
      lastScrollTop: 0,
      cartsNum: 0,
    };
  },
  components: {
    LoginModal,
  },
  methods: {
    openOverlay() {
      if (this.togglerOverlay === true) {
        this.togglerOverlay = false;
        this.$refs.navbarSpan1.classList.add('rotate45');
        this.$refs.navbarSpan2.classList.add('rotate-none');
        this.$refs.navbarSpan3.classList.add('rotate-45');
      } else {
        this.togglerOverlay = true;
        this.$refs.navbarSpan1.classList.remove('rotate45');
        this.$refs.navbarSpan2.classList.remove('rotate-none');
        this.$refs.navbarSpan3.classList.remove('rotate-45');
      }
    },
    scrollHandling() {
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset
      || document.body.scrollTop;
      if (document.body.clientWidth >= 768) {
        if (scrollTop >= this.lastScrollTop) {
          // 讀取下面時
          this.scrollNavbar = true;
        } else {
          // 讀取上面時
          this.scrollNavbar = false;
        }
        this.lastScrollTop = scrollTop;
      }
    },
    getCarts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.get(api)
        .then((res) => {
          this.cartsData = res.data.data.carts;
          this.cartsNum = res.data.data.carts.length;
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
    },
    updateFav() {
      this.favoriteData = JSON.parse(localStorage.getItem('fav')) || [];
    },
    login() {
      this.$refs.LoginModal.modalShow();
      this.togglerOverlay = true;
      this.$refs.navbarSpan1.classList.remove('rotate45');
      this.$refs.navbarSpan2.classList.remove('rotate-none');
      this.$refs.navbarSpan3.classList.remove('rotate-45');
    },
  },
  created() {
    emitter.on('updateNum', () => {
      this.updateFav();
    });
    emitter.on('updateCartsNum', () => {
      this.getCarts();
    });
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandling);
    this.getCarts();
    this.updateFav();
  },
  unmouned() {
    emitter.off('updateCartsNum');
  },
};
</script>
