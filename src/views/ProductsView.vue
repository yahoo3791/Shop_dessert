<template>
  <Loading v-model:active="isLoading" />
  <Navbar />
  <div class="container-fluid pt-utility">
    <div class="row">
      <div class="col-12 col-md-9 mx-auto p-0">
        <div class="position-relative">
          <img
            src="@/assets/pic/banner/productBanner.png"
            class="w-100 productBanner"
            alt="全部商品圖片"
          />
          <div
            class="position-absolute top-50 translate-middle-y"
            style="right: 20%">
            <h2
              class="text-3xl font-medium tracking-widest logo_font">
              healthy、simple、
              <i class="bi bi-emoji-smile" />
            </h2>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-9 mx-auto p-0 d-flex
        align-items-center justify-content-between">
        <div>
          <i
            class="bi bi-search d-inline-block px-2 fs-4 cursor-pointer"
            @click="search = !search;"
            @keypress="search = !search" />
          <label for="search">
            <input
              type="text"
              name="search"
              v-model="message"
              :class="{'d-none': search}"
              class="carts-input w-100 border-0 border-bottom text-white"
            >
          </label>
        </div>
        <div class="ps-3 px-md-0 d-flex flex-wrap justify-content-end align-items-center my-3">
          <label
            for="sort"
            class="text-white tracking-wide font-medium
            pe-2 pe-md-0 pb-md-1 d-inline-block"
            >顯示方法
            <div
              class="bg-white d-inline-block"
              style="max-width: 300px; border-radius: 5px">
              <select
                name="sort"
                id="sort"
                class="text-black tracking-wide font-medium px-4 py-1 border-0"
                @change="onChange($event)"
              >
                <option
                  selected="selected"
                  disabled="disabled"
                  class="d-n"
                  value="">
                  選擇顯示方法
                </option>
                <option
                  value="熱銷商品">
                  熱銷商品
                </option>
                <option
                  value="價格排序低到高">
                  價格排序低到高
                </option>
                <option
                  value="價格排序高到低">
                  價格排序高到低
                </option>
              </select>
            </div>
          </label>
        </div>
      </div>
      <div
        class="col-12 text-center pt-5"
        :class="{'d-none': productLoading}">
        <div class="spinner-border text-light spinner-border-3rem" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="col-12 col-md-9 mx-auto">
        <div class="row">
          <div
            class="col-6 col-md-6 col-lg-4 col-xl-3 mb-5"
            v-for="item in updateProducts"
            :key="item.id"
          >
            <div
              class="text-white product-content-container mx-auto cursor-pointer position-relative"
              @click="more(item.id)"
              @keydown="more(item.id)"
            >
              <span
                class="badge bg-danger position-absolute badge-position"
                v-if="item.num <= 5 && item.num >= 1">HOT</span
              >
              <span
                class="badge bg-dark opacity-50 position-absolute badge-position"
                v-else-if="item.num === 0">SOLD OUT</span
              >
              <div class="product-item position-relative">
                <img
                  :src="item.imageUrl"
                  class="position-relative w-100 h-100 product-img"
                  alt="商品圖片"
                />
                <div class="w-100 productNotes-container position-absolute bottom-0 start-50">
                  <i
                    class="productNotes-icon d-block bi bi-info-square
                    text-4xl position-relative top-50 start-50 text-center"
                  />
                </div>
                <div
                  class="fav position-absolute end-0 top-0"
                  @click.stop="addFav(item)"
                  @keydown="addFav(item)"
                >
                  <i
                    class="bi fs-1 mx-2"
                    :class="favoriteData.includes(item.id) ? 'bi-heart-fill' : 'bi-heart'"
                  />
                </div>
              </div>
              <div class="product-content pt-1">
                <h5 class="product-content-h5 text-base font-medium tracking-wide">
                  {{ item.title }}
                </h5>
                <div class="d-block d-md-flex justify-content-md-between">
                  <p>
                    <del>{{ item.origin_price }}$</del>/
                    <span class="product-p">優惠價{{ item.price }}$</span>
                  </p>
                </div>
                <div
                  v-if="item.num >= 1"
                  :class="{'opacity-75': isLoading}"
                  @click.stop="addCart(item, $event)"
                  @keydown="addCart(item, $event)"
                  :disabled="isLoading"
                  class="w-btn-product mt-2 w-100"
                >
                  <div class="d-none spinner-border spinner-border-sm" role="status" />
                  加入購物車
                </div>
                <div v-else class="w-btn-product w-100 mt-2 opacity-50">已售完</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <RouterLink
    to="/user/contact"
    class="position-fixed text-center
    end-0 bottom-0 cursor-pointer m-3 border chat-container"
    :class="{'translateY-70px': !scrollIcon}">
    <i class="bi bi-chat-dots-fill chat-icon" />
  </RouterLink>
  <div
    :class="{'scrollIconMoveIn': !scrollIcon}"
    ref="scrollTop"
    class="scrollTop-container position-fixed text-center end-0 bottom-0 cursor-pointer m-3"
  >
  <div
    @click.prevent="scrollToTop"
    @keydown="scrollToTop"
    class="scrollTop-btn d-block" />
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/FrontNavbar.vue';
import Footer from '@/components/FrontFooter.vue';
import Loading from '@/components/IsLoading.vue';
import 'sweetalert2/src/sweetalert2.scss';
import emitter from '@/methods/emitter';
import scrollMixins from '../mixins/scroll';

const Swal = require('sweetalert2');

export default {
  data() {
    return {
      products: {},
      carts: {},
      changeProducts: [],
      favoriteData: [],
      history: [],
      productLoading: true,
      isLoading: false,
      search: true,
      cartsNum: 0,
      clickName: '',
      message: '',
    };
  },
  components: {
    Navbar, Footer, Loading,
  },
  mixins: [scrollMixins],
  methods: {
    getData() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.productLoading = false;
      this.axios
        .get(api)
        .then((response) => {
          this.productLoading = true;
          this.products = response.data.products;
          this.changeProducts = response.data.products;
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
    addCart(item, e) {
      e.target.childNodes[0].classList.remove('d-none');
      const data = {
        product_id: item.id,
        qty: 1,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.axios
        .post(api, { data })
        .then(() => {
          this.isLoading = false;
          e.target.childNodes[0].classList.add('d-none');
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
            icon: 'success',
            title: '成功加入購物車',
          });
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
            title: '加入購物車失敗',
          });
        });
      this.renderCarts();
      emitter.emit('updateCartsNum');
    },
    addFav(item) {
      if (this.favoriteData.includes(item.id)) {
        this.favoriteData.splice(this.favoriteData.indexOf(item.id), 1);
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
          icon: 'success',
          title: '成功移除收藏',
        });
      } else {
        this.favoriteData.push(item.id);
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
          icon: 'success',
          title: '成功加入收藏',
        });
      }
      localStorage.setItem('fav', JSON.stringify(this.favoriteData));
      emitter.emit('updateNum');
    },
    more(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.axios
        .get(api)
        .then(() => {
          this.$router.push(`/user/product/${id}`);
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
      this.productHistory(id);
    },
    renderCarts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.axios
        .get(api)
        .then((response) => {
          this.carts = response.data.data.carts;
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
    productHistory(id) {
      this.history.push(id);
      this.history = localStorage.setItem('setHistory', JSON.stringify(this.history));
    },
    updateFav() {
      this.favoriteData = JSON.parse(localStorage.getItem('fav')) || [];
    },
    onChange(e) {
      const { value } = e.target;
      this.clickName = value;
    },
    searchProducts() {
      if (this.message !== '') {
        const keyword = this.message.trim();
        const targetProduct = this.products.filter((item) => item.title.match(keyword));
        this.products = targetProduct;
      } else {
        this.products = this.changeProducts;
      }
    },
  },
  watch: {
    cartsNum: {
      handler() {
        this.renderCarts();
      },
      immediate: true,
    },
    message: {
      handler() {
        this.searchProducts();
      },
      immediate: true,
    },
  },
  computed: {
    updateProducts() {
      let arr = [];
      arr = this.products;
      if (this.clickName === '價格排序低到高') {
        arr.sort((a, b) => a.price - b.price);
      } else if (this.clickName === '價格排序高到低') {
        arr.sort((a, b) => b.price - a.price);
      } else if (this.clickName === '熱銷商品') {
        arr.sort((a, b) => a.num - b.num);
      }
      return arr;
    },
  },
  mounted() {
    this.getData();
    this.updateFav();
  },
};
</script>
