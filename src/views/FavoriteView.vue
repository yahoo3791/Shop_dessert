<template>
  <Navbar />
  <Loading v-model:active="isLoading" />
  <div class="bg-dark auto-height">
    <div class="container pt-utility auto-height-content">
      <div class="row">
        <div class="col-12" :class="{ 'd-none': favoriteData.length == 0 }">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb py-2 px-1 p-md-2 breadcrumb-style tracking-wider">
              <li class="breadcrumb-item">
                <RouterLink to="/" class="text-white text-decoration-none"> 首頁 </RouterLink>
              </li>
              <li class="breadcrumb-item breadcrumb-item-none">我的收藏</li>
            </ol>
          </nav>
        </div>
        <div
          class="col-12 d-n text-center"
          :class="{ 'd-block': favoriteData.length == 0 }"
          style="padding: 20vh 0"
        >
          <h1 class="title-01">目前無收藏商品</h1>
          <RouterLink to="/user/products" class="text-decoration-none">
            <button type="button" class="btn btn-light fw-bold mt-5">前往商城</button>
          </RouterLink>
        </div>
        <div
          class="col-12 text-center pt-5"
          :class="{ 'd-none': productLoading }"
          v-if="favoriteData.length !== 0"
        >
          <div class="spinner-border text-light spinner-border-3rem" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="d-flex flex-column-reverse flex-md-row">
          <div
            class="col-12 col-md-9 text-white mt-3"
            :class="{ 'd-none': favoriteData.length == 0 }"
          >
            <div class="row d-flex flex-wrap align-items-center">
              <div
                class="col-6 col-md-6 col-lg-4 mb-5"
                v-for="item in updateProducts"
                :key="item.id"
              >
                <div
                  class="text-white product-content-container mx-auto
                  cursor-pointer position-relative"
                  @click="more(item.id)"
                  @keydown="more(item.id)"
                >
                  <span
                    class="badge bg-danger position-absolute badge-position"
                    v-if="item.num <= 5 && item.num >= 1"
                    >HOT
                  </span>
                  <span
                    class="badge bg-dark opacity-50 position-absolute badge-position"
                    v-else-if="item.num === 0"
                    >SOLD OUT
                  </span>
                  <div class="product-item position-relative">
                    <img
                      :src="item.imageUrl"
                      class="position-relative w-100 h-100 product-img"
                      alt="商品圖片"
                    />
                    <div class="w-100 productNotes-container
                    position-absolute bottom-0 start-50">
                      <i
                        class="productNotes-icon d-block bi bi-info-square
                        text-4xl position-relative top-50 start-50 text-center"
                      >
                      </i>
                    </div>
                    <div
                      @click.stop="addFav(item, index)"
                      @keydown="addFav(item, index)"
                      class="fav position-absolute end-0 top-0"
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
                    <div class="d-flex justify-content-between">
                      <p>
                        <del>${{ item.origin_price }}</del
                        >/
                        <span class="product-p">優惠價${{ item.price }}</span>
                      </p>
                    </div>
                    <div
                      v-if="item.num >= 1"
                      :class="{ 'opacity-75': isLoading === true }"
                      @click.stop="addCart(item, $event)"
                      @keydown="addCart(item, $event)"
                      :disabled="isLoading === true"
                      class="w-btn-product mt-2"
                    >
                      <div
                        @click.stop
                        class="d-none spinner-border spinner-border-sm"
                        role="status"
                      ></div>
                      加入購物車
                    </div>
                    <div v-else class="w-btn-product mt-2 opacity-50">已售完</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-3"
          :class="{ 'd-none': favoriteData.length <= 1 }">
            <div
              class="px-0 px-md-0 d-flex flex-wrap justify-content-end
              justify-content-md-center align-items-center mt-3"
            >
              <label for="sort" class="text-white ps-2 pb-md-2 d-inline-block"
                >顯示方法
                <div
                  class="bg-white tracking-wide font-medium d-inline-block"
                  style="max-width: 300px; border-radius: 5px"
                >
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
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import axios from 'axios';

import Navbar from '@/components/FrontNavbar.vue';
import Footer from '@/components/FrontFooter.vue';
import Loading from '@/components/IsLoading.vue';
import 'sweetalert2/src/sweetalert2.scss';
import emitter from '@/methods/emitter';

const Swal = require('sweetalert2');

export default {
  setup() {
    const router = useRouter();
    const favoriteData = ref([]);
    const products = ref([]);
    const filterData = ref([]);
    const isLoading = ref(false);
    const productLoading = ref(true);
    const clickName = ref('');

    const getFavoriteData = () => {
      filterData.value = products.value.filter((fav) => favoriteData.value.includes(fav.id));
    };
    const getData = () => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      productLoading.value = false;
      axios
        .get(api)
        .then((response) => {
          products.value = response.data.products;
          productLoading.value = true;
          getFavoriteData();
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
    const addCart = (item, e) => {
      e.target.childNodes[0].classList.remove('d-none');
      const data = {
        product_id: item.id,
        qty: 1,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      isLoading.value = true;
      this.axios.post(api, { data }).then(() => {
        isLoading.value = false;
        e.target.childNodes[0].classList.add('d-none');
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
      });
    };
    const more = (id) => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      axios
        .get(api)
        .then(() => {
          router.push(`/user/product/${id}`);
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
      getFavoriteData();
    };
    const onChange = (e) => {
      const { value } = e.target;
      clickName.value = value;
    };
    const updateProducts = computed(() => {
      let arr = [];
      arr = filterData.value;
      if (clickName.value === '價格排序低到高') {
        arr.sort((a, b) => a.price - b.price);
      } else if (clickName.value === '價格排序高到低') {
        arr.sort((a, b) => b.price - a.price);
      } else if (clickName.value === '熱銷商品') {
        arr.sort((a, b) => a.num - b.num);
      }
      return arr;
    });

    onMounted(() => {
      getData();
      updateFav();
      getFavoriteData();
    });

    return {
      favoriteData,
      products,
      filterData,
      isLoading,
      productLoading,
      clickName,
      getData,
      updateFav,
      getFavoriteData,
      addCart,
      more,
      addFav,
      onChange,
      updateProducts,
    };
  },
  components: { Navbar, Footer, Loading },
};
</script>
