<template>
  <Loading v-model:active="isLoading" />
  <Navbar />
  <div class="bg-dark pt-5 auto-height">
    <div class="auto-height-content">
      <div class="container pt-5">
        <div class="row pb-5">
          <div class="col-12">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb py-2 px-1 p-md-2 breadcrumb-style tracking-normal">
                <li class="breadcrumb-item">
                  <RouterLink to="/" class="text-white text-decoration-none"> 首頁 </RouterLink>
                </li>
                <li class="breadcrumb-item breadcrumb-item-none">
                  <RouterLink to="/user/products" class="text-white text-decoration-none">
                    商品列表
                  </RouterLink>
                </li>
                <li class="breadcrumb-item breadcrumb-item-none">內容</li>
              </ol>
            </nav>
          </div>
          <div class="col-12 text-center pt-5" :class="{ 'd-none': productLoading }">
            <div class="spinner-border text-light spinner-border-3rem" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
      <div class="container" :class="{ 'd-none': !productLoading }">
        <div class="row justify-content-center align-items-center">
          <div class="col-12 col-md-4">
            <img :src="product.imageUrl" class="w-100 h-100" alt="productImage" />
            <div class="position-absolute swiper-bg top-0" />
          </div>
          <div class="col-12 col-md-5 offset-md-1 d-flex flex-column justify-content-between">
            <div>
              <div>
                <h1 class="text-2xl font-bold tracking-wider my-4 mb-md-4 text-white">
                  <span class="badge bg-danger" v-if="product.num <= 5 && product.num >= 1"
                    >HOT
                  </span>
                  <span class="badge bg-secondary opacity-50" v-else-if="product.num === 0"
                    >SOLD OUT
                  </span>
                  {{ product.title }}
                </h1>
              </div>
              <div class="p-01">
                <p class="mt-5 text-indent2rem">{{ product.content }}</p>
                <h5 class="mt-5">成份:</h5>
                <p>{{ product.description }}</p>
                <h5 class="mt-5">尺寸:</h5>
                <div class="productUnitBtn">{{ product.unit }}</div>
              </div>
            </div>
            <div class="productmore-item py-5">
              <div class="d-flex align-items-center">
                <del class="text-white">原價{{ product.origin_price }}$</del>
                <div class="productmore-price d-inline-block ps-2">
                  <p class="font-semibold text-2xl text-red">優惠價{{ product.price }}$</p>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between mt-2">
                <div class="numInput-item d-flex justify-content-end align-items-center">
                  <div
                    @click="min"
                    @keypress="min"
                    class="cursor-pointer numInput-prev text-center"
                  >
                    -
                  </div>
                  <div class="counter border">
                    <label for="num" class="d-block h-100">
                      <input
                        id="num"
                        name="num"
                        v-model="num"
                        type="text"
                        min="1"
                        class="d-block rounded-0 bg-dark border-0 text-center text-white h-100"
                      />
                    </label>
                  </div>
                  <div @click="add" @keydown="add" class="cursor-pointer numInput-next text-center">
                    +
                  </div>
                </div>
                <a
                  class="shareFb d-inline-block ms-auto text-white text-decoration-none"
                  href="#"
                  target="_blank"
                >
                  <i class="bi bi-facebook fs-4" />
                  分享
                </a>
                <div
                  class="fav text-red ms-auto me-3 cursor-pointer"
                  @click.stop="addFav(product)"
                  @keydown="addFav(product)"
                >
                  <i class="bi mx-2 fs-1"> </i>
                  <!-- :class="favoriteData.includes(product.id) ? 'bi-heart-fill' : 'bi-heart'" -->
                </div>
                <div
                  v-if="product.num >= 1"
                  :class="{ 'opacity-75': isLoading === true }"
                  @click="addCart(product.id, $event)"
                  @keydown="addCart(item, $event)"
                  :disabled="isLoading === true"
                  class="w-btn-product cursor-pointer"
                >
                  <div @click.stop class="d-none spinner-border spinner-border-sm" role="status" />
                  加入購物車
                </div>
                <div v-else class="w-btn-product opacity-50">已售完</div>
              </div>
            </div>
          </div>
          <div class="line" />
          <div class="col-12 col-md-9 mx-auto">
            <div class="mb-5">
              <h4 class="pb-2 tracking-wide font-medium text-xl border-bottom-404040">保存方式</h4>
              <p>-最佳賞味期限-</p>
              <p>可冷藏保存1週，冷凍保存2週。請見商品標示日期。</p>
              <p>
                建議放入冷藏前請將蛋糕用保鮮盒密封好，再存放食用前於室溫回溫20-30分鐘風味更佳！開封後請儘速食用完畢。
              </p>
              <p class="mt-3">餅乾：常溫密封約可保存2週，冷凍密封約可保存2-3個月，回溫即可食用。</p>
              <p>蛋糕：放置冷藏約可保存5天。</p>
              <p>慕斯：密封冷藏約可保存2-3天，密封冷凍約可保存7-10天，回溫即可食用。</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-if="sameProduct.length !== 0">
        <div class="row justify-content-center">
          <div class="col-12 col-md-9 py-5 my-5 text-white">
            <h4 class="pb-2 tracking-wide font-medium text-xl border-bottom-404040">
              您可能喜歡這些...
            </h4>
            <swiper-container
              class="mySwiper"
              :slidesPerView="2"
              :centeredSlides="false"
              :spaceBetween="30"
              :navigation="true"
              :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
              }"
            >
              <swiper-slide v-for="item in sameProduct" :key="item.id" class="py-5">
                <div
                  class="mx-auto product-content-container cursor-pointer"
                  @click.stop="more(item.id)"
                  @keydown="more(item.id)"
                >
                  <img :src="item.imageUrl" class="w-100" alt="您可能喜歡的圖片" />
                  <h5 class="product-content-h5 text-base font-medium tracking-wide py-2">
                    {{ item.title }}
                  </h5>
                  <p class="product-content">
                    <del>{{ item.origin_price }}$</del>/
                    <span class="product-p">優惠價{{ item.price }}$</span>
                  </p>
                  <div
                    v-if="item.num >= 1"
                    :class="{ 'opacity-75': isLoading === true }"
                    :disabled="isLoading === true"
                    class="mt-2 w-btn-product"
                    @click.stop="addCart(item.id, $event)"
                    @keydown="addCart(item.id, $event)"
                  >
                    <div class="d-none spinner-border spinner-border-sm" role="status" />
                    加入購物車
                  </div>
                  <div v-else class="w-btn-product mt-2 opacity-50">已售完</div>
                </div>
              </swiper-slide>
            </swiper-container>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import {
  ref,
  onMounted,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

import { register } from 'swiper/element/bundle';
import '@/assets/scss/swiper/productMoreSwiper.css';
import Navbar from '@/components/FrontNavbar.vue';
import Footer from '@/components/FrontFooter.vue';
import Loading from '@/components/IsLoading.vue';
import 'sweetalert2/src/sweetalert2.scss';

import emitter from '@/methods/emitter';

const Swal = require('sweetalert2');

register();

export default {
  setup() {
    const productAll = ref({});
    const product = ref({});
    const favoriteData = ref([]);
    const sameProduct = ref([]);
    const isLoading = ref(false);
    const productLoading = ref(true);
    const num = ref(1);
    const route = useRoute();
    const router = useRouter();

    const getData = () => {
      const id = route.params.productId;
      productLoading.value = false;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      axios
        .get(api)
        .then((response) => {
          productLoading.value = true;
          product.value = response.data.product;
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
    const addCart = (id, e) => {
      e.target.children[0].classList.remove('d-none');
      if (num.value <= 0 || num.value >= 50) {
        e.target.children[0].classList.add('d-none');
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
          icon: 'warning',
          title: '請輸入正確數字:等於1小於51',
        });
        num.value = 1;
      }
      const cartData = {
        product_id: id,
        qty: Number(num.value),
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      isLoading.value = true;
      axios
        .post(api, { data: cartData })
        .then(() => {
          isLoading.value = false;
          e.target.children[0].classList.add('d-none');
          emitter.emit('updateCartsNum');
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
          num.value = 1;
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
    };
    const add = () => {
      num.value += 1;
      if (num.value >= 50) {
        num.value = 50;
      }
    };
    const min = () => {
      num.value -= 1;
      if (num.value <= 0) {
        num.value = 1;
      }
    };
    const updateData = () => {
      const data = JSON.parse(localStorage.getItem('setHistory')) || [];
      if (data.length === 0) {
        return;
      }
      const clickProduct = productAll.value.filter((item) => item.id === data[0]);
      const updateProducts = productAll.value.filter((item) => item.id !== data[0]);
      updateProducts.forEach((item) => {
        if (clickProduct[0].category === item.category) {
          sameProduct.value.push(item);
        }
      });
    };
    const getDataAll = () => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      axios
        .get(api)
        .then((response) => {
          productAll.value = response.data.products;
          updateData();
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
    const more = (id) => {
      router.replace(`/user/product/${id}`);
      localStorage.setItem('setHistory', JSON.stringify([id]));
    };
    const addFav = (item) => {
      if (favoriteData.value.includes(item.id)) {
        favoriteData.value.splice(favoriteData.value.indexOf(item.id), 1);
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
        favoriteData.value.push(item.id);
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
      localStorage.setItem('fav', JSON.stringify(favoriteData.value));
      emitter.emit('updateNum');
    };
    const updateFav = () => {
      favoriteData.value = JSON.parse(localStorage.getItem('fav')) || [];
    };
    onMounted(() => {
      getData();
      getDataAll();
      updateFav();
      const fbHref = `https://www.facebook.com/sharer.php?u=${window.location.href}`;
      document.querySelector('.shareFb').setAttribute('href', fbHref);
    });
    return {
      productAll,
      product,
      favoriteData,
      sameProduct,
      isLoading,
      productLoading,
      num,
      getData,
      addCart,
      add,
      min,
      getDataAll,
      updateData,
      more,
      addFav,
      updateFav,
    };
  },
  components: {
    Loading,
    Navbar,
    Footer,
  },
};
</script>
