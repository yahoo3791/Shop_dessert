<template>
  <Loading v-model:active="isLoading" />
  <Navbar />
  <div class="container-fluid pt-utility auto-height">
    <div class="row auto-height-content">
      <div class="col-12 col-md-9 mx-auto p-0">
        <div class="position-relative">
          <img
            src="@/assets/pic/banner/productBanner.png"
            class="w-100 productBanner"
            alt="全部商品圖片"
          />
          <div class="position-absolute top-50 translate-middle-y" style="right: 20%">
            <h2 class="text-3xl font-medium tracking-widest logo_font">
              healthy、simple、
              <i class="bi bi-emoji-smile" />
            </h2>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-9 mx-auto p-0 d-flex align-items-center justify-content-between">
        <div>
          <i
            class="bi bi-search d-inline-block px-2 fs-4 cursor-pointer"
            @click="search = !search"
            @keypress="search = !search"
          />
          <label for="search">
            <input
              type="text"
              name="search"
              v-model="message"
              :class="{ 'd-none': search }"
              class="carts-input w-100 border-0 border-bottom text-white"
            />
          </label>
        </div>
        <div class="ps-3 px-md-0 d-flex flex-wrap justify-content-end align-items-center my-3">
          <label
            for="sort"
            class="text-white tracking-wide font-medium pe-2 pe-md-0 pb-md-1 d-inline-block"
            >顯示方法
            <div class="bg-white d-inline-block" style="max-width: 300px; border-radius: 5px">
              <select
                name="sort"
                id="sort"
                class="text-black tracking-wide font-medium px-4 py-1 border-0"
                @change="onChange($event)"
              >
                <option selected="selected" disabled="disabled" class="d-n" value="">
                  選擇顯示方法
                </option>
                <option value="熱銷商品">熱銷商品</option>
                <option value="價格排序低到高">價格排序低到高</option>
                <option value="價格排序高到低">價格排序高到低</option>
              </select>
            </div>
          </label>
        </div>
      </div>
      <div class="col-12 text-center pt-5" :class="{ 'd-none': productLoading }">
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
                v-if="item.num <= 5 && item.num >= 1"
                >HOT</span
              >
              <span
                class="badge bg-dark opacity-50 position-absolute badge-position"
                v-else-if="item.num === 0"
                >SOLD OUT</span
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
                  :class="favoriteData.includes(item.id) ? 'bi-heart-fill' : 'bi-heart'"
                  class="bi fs-1 mx-2" />
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
                  :class="{ 'opacity-75': isLoading }"
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
    :class="{ 'translateY-70px': !scrollIcon }"
    class="position-fixed text-center end-0 bottom-0 cursor-pointer m-3 border chat-container"
  >
    <i class="bi bi-chat-dots-fill chat-icon" />
  </RouterLink>
  <div
    :class="{ scrollIconMoveIn: !scrollIcon }"
    class="scrollTop-container position-fixed text-center end-0 bottom-0 cursor-pointer m-3"
  >
    <div @click.prevent="scrollToTop" @keydown="scrollToTop" class="scrollTop-btn d-block" />
  </div>
  <Footer />
</template>

<script>
import axios from 'axios';

import {
  ref,
  onMounted,
  computed,
  watch,
  reactive,
} from 'vue';
import { useRouter } from 'vue-router';

import Navbar from '@/components/FrontNavbar.vue';
import Footer from '@/components/FrontFooter.vue';
import Loading from '@/components/IsLoading.vue';
import 'sweetalert2/src/sweetalert2.scss';
import emitter from '@/methods/emitter';
import scroll from '../mixins/scroll';

const Swal = require('sweetalert2');

export default {
  setup() {
    const router = useRouter();
    const products = ref({});
    const carts = ref({});
    const changeProducts = ref([]);
    const favoriteData = reactive([]);
    const history = ref([]);
    const productLoading = ref(true);
    const isLoading = ref(false);
    const search = ref(true);
    const cartsNum = ref(0);
    const clickName = ref('');
    const message = ref('');
    const { scrollToTop, scrollIcon } = scroll();
    const getData = () => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      productLoading.value = false;
      axios
        .get(api)
        .then((response) => {
          productLoading.value = true;
          products.value = response.data.products;
          changeProducts.value = response.data.products;
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
    const renderCarts = () => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      axios
        .get(api)
        .then((response) => {
          carts.value = response.data.data.carts;
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
    const addCart = (item, e) => {
      e.target.childNodes[0].classList.remove('d-none');
      const data = {
        product_id: item.id,
        qty: 1,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      isLoading.value = true;
      axios
        .post(api, { data })
        .then(() => {
          isLoading.value = false;
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
      renderCarts();
      emitter.emit('updateCartsNum');
    };
    const addFav = (item) => {
      if (favoriteData.includes(item.id)) {
        favoriteData.splice(favoriteData.indexOf(item.id), 1);
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
        favoriteData.push(item.id);
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
      localStorage.setItem('fav', JSON.stringify(favoriteData));
      emitter.emit('updateNum');
    };
    const productHistory = (id) => {
      history.value.push(id);
      history.value = localStorage.setItem('setHistory', JSON.stringify(history));
    };
    const more = (id) => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      axios
        .get(api)
        .then(() => {
          router.push(`/user/product/${id}`);
          // this.$router.push(`/user/product/${id}`);
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
      productHistory(id);
    };
    const updateFav = () => {
      favoriteData.value = JSON.parse(localStorage.getItem('fav')) || [];
    };
    const onChange = (e) => {
      const { value } = e.target;
      clickName.value = value;
    };
    const searchProducts = () => {
      if (message.value !== '') {
        const keyword = message.value.trim();
        const targetProduct = products.value.filter((item) => item.title.match(keyword));
        products.value = targetProduct;
      } else {
        products.value = changeProducts;
      }
    };

    onMounted(() => {
      getData();
      updateFav();
    });

    const updateProducts = computed(() => {
      let arr = [];
      arr = products.value;
      if (clickName.value === '價格排序低到高') {
        arr.sort((a, b) => a.price - b.price);
      } else if (clickName.value === '價格排序高到低') {
        arr.sort((a, b) => b.price - a.price);
      } else if (clickName.value === '熱銷商品') {
        arr.sort((a, b) => a.num - b.num);
      }
      return arr;
    });

    watch(cartsNum, () => {
      renderCarts();
    });
    watch(message, () => {
      searchProducts();
    });

    return {
      products,
      carts,
      changeProducts,
      favoriteData,
      history,
      productLoading,
      isLoading,
      search,
      cartsNum,
      clickName,
      message,
      getData,
      addCart,
      addFav,
      more,
      updateFav,
      onChange,
      searchProducts,
      updateProducts,
      scrollToTop,
      scrollIcon,
    };
  },
  components: {
    Navbar,
    Footer,
    Loading,
  },
};
</script>
