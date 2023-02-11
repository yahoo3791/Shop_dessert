<template>
  <Navbar />
  <Loading v-model:active="isLoading" />
  <div class="bg-dark">
    <div class="container pt-utility">
      <div class="row">
        <div class="col-12">
          <nav aria-label="breadcrumb">
            <ol
              class="breadcrumb py-2 px-1 p-md-2
              breadcrumb-style tracking-wider">
              <li class="breadcrumb-item">
                <a class="text-black text-decoration-none" href="#">首頁</a>
              </li>
              <li class="breadcrumb-item breadcrumb-item-none">我的收藏
              </li>
            </ol>
          </nav>
        </div>
        <div
          class="col-12 d-n text-center"
          :class="{ 'd-block' : favoriteData.length == 0}"
          style="padding:20vh 0;">
          <h1 class="title-01">
            目前無收藏商品
          </h1>
          <router-link
            to="/user/products"
            class="text-decoration-none">
            <w-button
              type="button"
              class="mt-5 w-btn">前往商城
            </w-button>
          </router-link>
        </div>
        <div
          class="col-12 col-md-3"
          :class="{ 'd-none' :favoriteData.length <= 1 }">
          <div
            class="px-0 px-md-0 d-flex flex-wrap justify-content-end
            justify-content-md-center align-items-center mt-3">
            <label
              for="sort"
              class="text-white pe-2 pb-md-2 d-inline-block">顯示方法
              <div
                class="bg-white tracking-wide
                font-medium d-inline-block"
                style="max-width:300px;border-radius: 5px;">
                <select
                  name="sort"
                  id="sort"
                  class="text-black tracking-wide
                  font-medium px-4 py-1 border-0"
                  @change="onChange($event)">
                  <option
                    selected="selected"
                    disabled="disabled"
                    style='display: none'
                    value=''>選擇顯示方法
                  </option>
                  <option
                  value="熱銷商品">熱銷商品
                  </option>
                  <option
                  value="價格排序低到高">價格排序低到高
                  </option>
                  <option
                  value="價格排序高到低">價格排序高到低
                  </option>
                </select>
              </div>
            </label>
          </div>
        </div>
        <div
          class="col-12 text-center pt-5"
          :class="{ 'd-none': productLoading }"
          v-if="favoriteData.length !== 0">
          <div
            class="spinner-border text-light"
            role="status"
            style="width: 3rem; height: 3rem;">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div
          class="col-12 col-md-9 text-white mt-3"
          :class="{ 'd-none' :favoriteData.length == 0 }">
          <div class="row d-flex flex-wrap align-items-center">
            <div class="col-6 col-md-6 col-lg-4 mb-5"
              v-for="item,index in filterData"
              :key="index">
              <div
                class="text-white product-content-container
                mx-auto cursor-pointer position-relative"
                @click="more(item.id,$event,index)"
                @keydown="more(item.id,$event,index)">
                <span class="badge bg-danger position-absolute"
                  v-if="(item.num <= 5 && item.num >= 1)"
                  style="z-index:5; top:5%; left:5%"
                  >HOT
                </span>
                <span class="badge bg-dark opacity-50 position-absolute"
                  v-else-if="(item.num === 0)"
                  style="z-index:5; top:5%; left:5%"
                  >SOLD OUT
                </span>
                <div class="product-item position-relative">
                  <w-image :src="item.imageUrl"
                    class="position-relative w-100 h-100 product-img"
                    alt="雜誌圖片">
                  </w-image>
                  <div class="w-100 productNotes-container position-absolute bottom-0 start-50">
                    <i
                      class="productNotes-icon d-block bi bi-info-square text-4xl
                      position-relative top-50 start-50 text-center">
                    </i>
                  </div>
                  <div
                    @click.stop="addFav(item,index)"
                    @keydown="addFav(item,index)"
                    class="fav position-absolute end-0 top-0">
                    <i class="bi fs-1 mx-2"
                    :class="favoriteData.includes(item.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
                  </div>
                </div>
                <div class="product-content pt-1">
                  <h5 class="product-content-h5 text-base font-medium tracking-wide">
                    {{ item.title }}
                  </h5>
                  <div class="d-flex justify-content-between">
                    <p>
                      <del>${{ item.origin_price }}</del>/
                      <span class="product-p">優惠價${{ item.price }}</span>
                    </p>
                  </div>
                  <div v-if="item.num >= 1"
                    :class="{'opacity-75': isLoading === true }"
                    @click.stop="addCart(item, $event)"
                    @keydown="addCart(item, $event)"
                    :disabled="isLoading ===true"
                    class="w-btn-product mt-2">
                    <div
                    @click.stop
                    class="d-none spinner-border spinner-border-sm"
                    role="status">
                    </div>
                    加入購物車
                  </div>
                  <div v-else
                  class="w-btn-product mt-2 opacity-50">
                    已售完
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Loading from '@/components/Loading.vue';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      favoriteData: [],
      products: [],
      filterData: [],
      isLoading: false,
      productLoading: true,
    };
  },
  components: { Navbar, Footer, Loading },
  methods: {
    getData() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.productLoading = false;
      this.axios.get(api)
        .then((res) => {
          this.products = res.data.products;
          if (res.data.success) {
            this.productLoading = true;
            this.getFavoriteData();
          }
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
    getFavoriteData() {
      this.filterData = this.products.filter((fav) => this.favoriteData.includes(fav.id));
    },
    addCart(item, e) {
      e.target.childNodes[0].classList.remove('d-none');
      const data = {
        product_id: item.id,
        qty: 1,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.axios.post(api, { data }).then((res) => {
        e.target.childNodes[0].classList.add('d-none');
        if (res.data.success) {
          this.isLoading = false;
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
        } else {
          this.isLoading = false;
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
        }
      });
    },
    more(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.axios.get(api)
        .then(() => {
          this.$router.push(`/user/product/${id}`);
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
      this.getFavoriteData();
    },
    onChange(e) {
      const { value } = e.target;
      if (value === '價格排序低到高' && this.filterData.length > 1) {
        this.filterData.sort((a, b) => a.price - b.price);
      } else if (value === '價格排序高到低' && this.filterData.length > 1) {
        this.filterData.sort((b, a) => a.price - b.price);
      } else if (value === '熱銷商品' && this.products.length > 1) {
        this.filterData.sort((a, b) => a.num - b.num);
      }
    },
  },
  mounted() {
    this.getData();
    this.updateFav();
    this.getFavoriteData();
  },
};
</script>
