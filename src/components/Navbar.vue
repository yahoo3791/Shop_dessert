<template>
  <div
    :class="{'hideNavbar': scrollNavbar}"
    class="container-fluid fixed-top bg-dark navbar-height"
    style="z-index:10000">
    <div
      :class="{'hideSubNavbar':scrollNavbar}"
      class="d-block d-md-none navbar-overlay position-absolute
      start-0 w-100 bg-dark tracking-wider">
        <div
          :class="{'d-none': togglerOverlay }"
          class="text-lg navbar-nav
          text-white text-center w-75 mx-auto tracking-wider">
            <router-link
              to="/#/"
              class="nav-link py-3 animated fadeInDown"
              style="animation-duration: .5s;">
              首頁
            </router-link>
            <router-link
              to="/user/contact"
              class="nav-link py-3 animated fadeInDown"
              style="animation-duration: .5s;">
              聯絡我們
            </router-link>
            <router-link
              to="/user/products"
              class="nav-link py-3 animated fadeInDown"
              style="animation-duration: .5s;">
              商品
            </router-link>
          <div
            class="d-flex justify-content-center animated fadeInDown"
            style="animation-duration: .5s;">
              <router-link to="/user/carts"
                class="nav-link px-3 py-3 position-relative"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="購物車">
                <i class="bi bi-cart-fill me-1 position-relative"
                  style="font-size:18px">
                  <span
                    :class="{'d-none': cartsNum == 0 }"
                    ref="cartsNum"
                    class="d-block position-absolute navbar-badge navbar-badge-md
                    animated">{{ cartsNum }}
                  </span>
                </i>
              </router-link>
              <router-link
                to="/user/favorite"
                class="nav-link px-3 py-3 position-relative"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="我的最愛">
                <i class="bi bi-heart-fill me-1 position-relative"
                  style="font-size:18px">
                  <span
                    :class="{'d-none': favoriteData.length == 0 }"
                    ref="fav"
                    class="d-block position-absolute navbar-badge navbar-badge-md
                    animated">{{ favoriteData.length }}
                  </span>
                </i>
              </router-link>
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
            <router-link
              to="/user/checkOrder"
              class="nav-link px-3 py-3 position-relative"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="查詢訂單">
              <i class="bi bi-clipboard2-minus-fill me-1"
              style="font-size:18px" />
            </router-link>
          </div>
        </div>
    </div>
    <div class="d-flex align-items-center">
      <a
        href="#"
        class="d-block logo href-none logo_font text-4xl">
        DESSERT
      </a>
      <div
        @click="openOverlay"
        @keydown="openOverlay"
        class="d-block d-md-none navbar-sm text-white ms-auto">
        <div
          class="navbar-icon"
          style="width:40px;height:40px">
          <span class="d-block" ref="navbarSpan1" />
          <span class="d-block" ref="navbarSpan2" />
          <span class="d-block" ref="navbarSpan3" />
        </div>
      </div>
      <div
        class="navbar-md d-none d-md-flex ms-auto tracking-wider text-lg">
        <router-link
          to="/#/"
          class="nav-link px-3 py-3"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="回到首頁">
          首頁
        </router-link>
        <router-link
          to="/user/contact"
          class="nav-link py-3">
          聯絡我們
        </router-link>
        <router-link
          to="/user/products"
          class="nav-link px-3 py-3">
          商品
        </router-link>
        <router-link
          to="/user/carts"
          class="nav-link px-3 py-3 position-relative"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="購物車">
          <i
            class="bi bi-cart-fill me-1 position-relative"
            tyle="font-size:1em">
            <span
              :class="{'d-none': cartsNum == 0 }"
              ref="cartsNum"
              class="d-block position-absolute navbar-badge navbar-badge-md
              animated">
              {{ cartsNum }}
            </span>
          </i>
        </router-link>
        <router-link
          to="/user/favorite"
          class="nav-link px-3 py-3 position-relative"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="我的最愛">
          <i
            class="bi bi-heart-fill me-1 position-relative"
            style="font-size:1em">
            <span
              :class="{ 'd-none': favoriteData.length == 0 }"
              ref="fav"
              class="d-block position-absolute navbar-badge navbar-badge-md
              animated">
              {{ favoriteData.length }}
            </span>
          </i>
        </router-link>
        <div
          @click="login"
          @keypress="login"
          class="nav-link px-3 py-3 position-relative cursor-pointer"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="會員">
          <i class="bi bi-person-fill me-1"
          style="font-size:1em" />
        </div>
        <router-link
          to="/user/checkOrder"
          class="nav-link px-3 py-3 position-relative"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="查詢訂單">
          <i class="bi bi-clipboard2-minus-fill me-1"
            style="font-size:1em" />
        </router-link>
      </div>
    </div>
  </div>
  <LoginModal ref="LoginModal" />
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import emitter from '@/methods/emitter';
import LoginModal from '@/components/LoginModal.vue';

export default {
  data() {
    return {
      togglerOverlay: true,
      lastScrollTop: 0,
      scrollNavbar: false,
      cartsNum: 0,
      cartsData: {},
      favoriteData: [],
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
          const { carts } = res.data.data;
          let num = 0;
          carts.forEach((i) => {
            num += i.qty;
          });
          this.cartsNum = num;
        })
        .catch((error) => {
          console.log(error);
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
  mounted() {
    window.addEventListener('scroll', this.scrollHandling);
    this.getCarts();
    emitter.on('updateNum', () => {
      this.updateFav();
    });
    emitter.on('updateCartsNum', () => {
      this.getCarts();
    });
    this.updateFav();
  },
};
</script>
