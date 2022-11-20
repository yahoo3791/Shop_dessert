<template>
  <Navbar />
<loading v-model:active="isLoading">
  <div class="loadingio-spinner-interwind-il303leqtya">
    <div class="ldio-k17d8xi3rys">
      <div>
        <div>
          <div>
            <div></div>
          </div>
        </div>
        <div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</loading>
  <div class="bg-dark">
    <div class="container-fluid pt-utility">
      <div class="row">
        <div class="col-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb p-2 breadcrumb-style tracking-wider">
              <li class="breadcrumb-item">
                <a class="text-black text-decoration-none" href="#">首頁</a>
              </li>
              <li class="breadcrumb-item breadcrumb-item-none">我的收藏</li>
            </ol>
          </nav>
        </div>
        <div class="col-12 d-n"
          :class="{ 'd-block' : this.favoriteData.length == 0}">
          <h1 class="text-white text-center fs-4"
          style="padding:20vh 0;">
          我的收藏是空的<br>快去添加喜愛的商品吧！</h1>
        </div>
        <div class="col-12 col-md-3" :class="{ 'd-none' :this.favoriteData.length <= 1 }">
          <div class="px-0 px-md-0 d-flex flex-wrap justify-content-end
          justify-content-md-center align-items-center mt-3">
            <label for="sort" class="text-white pe-2 pb-md-2 d-inline-block">顯示方法(底下加輪播)
              <div class="bg-white tracking-wide
                font-medium d-inline-block"
                style="max-width:300px;border-radius: 5px;">
                <select name="sort" id="sort"
                    class="text-black tracking-wide font-medium px-4 py-1 border-0"
                    @change="onChange($event)">
                  <option selected="selected" disabled="disabled"
                    style='display: none' value=''>選擇顯示方法
                  </option>
                  <option value="價格排序低到高">價格排序低到高</option>
                  <option value="價格排序高到低">價格排序高到低</option>
                </select>
              </div>
            </label>
          </div>
        </div>
        <div class="col-12 col-md-9 text-white mt-3"
        :class="{ 'd-none' :this.favoriteData.length == 0 }">
          <div class="row d-flex flex-wrap align-items-center">
            <div class="col-6 col-md-6 col-lg-4 mb-5"
            v-for="item,index in filterData" :key="index">
              <div class="text-white product-content-container mx-auto cursor-pointer"
              @click.prevent="more(item.id,$event,index)"
              @keydown="more(item.id,$event,index)">
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
                  <div @click.stop="addFav(item,index)"
                    @keydown="addFav(item,index)"
                    class="fav position-absolute end-0 top-0">
                    <i class="bi fs-2 mx-2"
                    :class="favoriteData.includes(item.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
                  </div>
                </div>
                <div class="product-content pt-1">
                  <h5 class="product-content-h5 text-base
                  font-medium tracking-wide">{{ item.title }}</h5>
                  <p class="product-p">${{ item.price }}</p>
                  <div @click.stop="addCart(item, $event)"
                    @keydown="addCart(item, $event)"
                    :class="{'opacity-75': this.isLoading === true }"
                    :disabled="this.isLoading ===true"
                    class="d-block mt-2 p-1 text-center product-btn
                    tracking-wide font-medium bg-white text-decoration-none">
                    <div @click.stop class="d-none spinner-border spinner-border-sm" role="status">
                    </div>
                    加入購物車
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
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
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
    };
  },
  components: { Navbar, Footer, Loading },
  methods: {
    getData() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.axios.get(api).then((res) => {
        this.products = res.data.products;
        if (res.data.success) {
          this.getFavoriteData();
        }
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
        this.isLoading = false;
        e.target.childNodes[0].classList.add('d-none');
        if (res.data.success) {
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
      this.axios.get(api).then(() => {
        this.$router.push(`/user/product/${id}`);
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
      }
    },
  },
  created() {
  },
  mounted() {
    this.getData();
    this.updateFav();
    this.getFavoriteData();
  },
};
</script>