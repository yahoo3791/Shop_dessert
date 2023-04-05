<template>
  <Loading v-model:active="isLoading" />
  <Navbar />
  <div class="bg-dark overflow-hidden ">
    <div class="container-fulid pt-utility">
      <div class="overflow-hidden homeContainer">
        <div class="homeBanner w-100 h-100 position-relative">
          <a href="#recommend"
            class="slider-icon position-absolute bottom-0 start-50
            translate-middle-x border border-3 text-center">
            <span class="d-none">eslint</span>
          </a>
          <div
            class="position-absolute top-50 start-50 translate-middle">
            <span class="badge bg-warning text-dark fs-6">全站免運費中
            </span>
            <h1 class="font-bold text-nowrap pt-2">專業、健康、新鮮現做的甜點店
            </h1>
            <h2 class="tracking-widest mb-5">軟在口中，甜在心上。
            </h2>
            <RouterLink to="/user/products" class="href-none d-block text-center">
              <button type="button"
                class="btn btn-light fw-bold">前往商店
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="container main"
      id="recommend">
      <div class="row">
        <div class="col-12 col-md-6 my-2 position-relative"
          data-aos="fade-right">
            <img src="../assets/pic/banner/grocery01.png"
              class="w-100 groceryImg"
              alt="巧克力打折系列圖片">
            <div class="position-absolute top-50
              translate-middle-y ps-5 tracking-widest">
              <h3>巧克力系列</h3>
              <p class="mb-2 mb-md-3">現正7折優惠中！</p>
              <RouterLink
                to="/user/products"
                class="href-none">
                <button type="button"
                  class="btn btn-light fw-bold">前往商店
                </button>
              </RouterLink>
            </div>
        </div>
        <div class="col-12 col-md-6 my-2 position-relative "
          data-aos="fade-left">
          <img
            src="../assets/pic/banner/grocery02.png"
            class="w-100 groceryImg"
            alt="杯子蛋糕打折系列圖片">
          <div class="position-absolute top-50
            translate-middle-y ps-5 tracking-widest">
            <h3>杯子蛋糕系列</h3>
            <p class="mb-2 mb-md-3">現正7折優惠中！</p>
            <RouterLink
              to="/user/products"
              class="href-none">
              <button type="button"
                class="btn btn-light fw-bold">前往商店
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="line my-5" />
      <div class="row">
        <div class="col-12 text-center my-5">
          <h3 class="title-01">熱銷商品</h3>
        </div>
        <div class="col-12 text-center pt-5"
          :class="{ 'd-none': productLoading }">
          <div
            class="spinner-border text-light spinner-border-3rem"
            role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="col-6 col-md-6 col-lg-4 col-xl-3 mb-5"
          v-for="item in products"
          :key="item.id">
          <div class="text-white product-content-container
            mx-auto cursor-pointer position-relative"
            @click="more(item.id)"
            @keydown="more(item.id)">
              <span class="badge bg-danger position-absolute badge-position">HOT
              </span>
              <div class="product-item position-relative">
                <img
                  :src="item.imageUrl"
                  class="position-relative w-100 h-100 product-img"
                  alt="商品圖片" />
              <div class="w-100 productNotes-container position-absolute bottom-0 start-50">
                <i class="productNotes-icon d-block bi bi-info-square text-4xl
                  position-relative top-50 start-50 text-center" />
              </div>
              <div
                class="fav position-absolute end-0 top-0"
                @click.stop="addFav(item)"
                @keydown="addFav(item)">
                <i class="bi mx-2 fs-1"
                :class="favoriteData.includes(item.id) ? 'bi-heart-fill' : 'bi-heart'" />
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
                :class="{'opacity-75': isLoading === true }"
                @click.stop="addCart(item, $event)"
                @keydown="addCart(item, $event)"
                :disabled="isLoading ===true"
                class="w-btn-product mt-2 w-100">
                <div
                  @click.stop
                  class="d-none spinner-border
                  spinner-border-sm"
                  role="status">
                </div>
                加入購物車
              </div>
              <div
                v-else
                class="w-btn-product w-100 mt-2 opacity-50">
                已售完
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center my-5">
          <RouterLink
            to="/user/products"
            class="href-none">
              <button type="button"
                class="btn btn-light fw-bold">看更多
              </button>
          </RouterLink>
        </div>
      </div>
      <div class="line my-5" />
    </div>
    <div class="container">
      <div class="row flex-column-reverse flex-md-row-reverse align-items-md-center">
        <div class="col-12 col-md-6 text-center py-5 py-md-0">
          <h1 class="title-01">客製化訂單</h1>
          <p class="p-01">始終找不到您心中幻想的甜點嗎？</p>
          <p class="pb-5">( 聯絡我們提供想法、溝通報價 )</p>
          <RouterLink
            to="/user/contact"
            class="href-none">
              <button type="button"
                class="btn btn-light fw-bold">聯絡我們
              </button>
          </RouterLink>
        </div>
        <div class="col-12 col-md-6">
          <swiper-container
            :slidesPerView="1"
            :centeredSlides="true"
            :spaceBetween="30"
            :navigation="true"
            :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }"
            :speed="600"
            :breakpoints="{
              '768': {
                slidesPerView: 2,
                spaceBetween: 40,
              },
            }"
            class="mySwiper position-relative customized-container">
            <div class="position-absolute swiper-bg top-0" />
            <swiper-slide class="position-relative">
              <img class="w-100" src="../assets/pic/homepage/母親節蛋糕.png" alt="母親節蛋糕">
              <h2 class="position-absolute top-50 start-50 translate-middle
                text-xl font-medium tracking-wider text-nowrap">母親節蛋糕
              </h2>
            </swiper-slide>
            <swiper-slide class="position-relative">
              <img class="w-100" src="@/assets/pic/homepage/聖誕節餅乾.png" alt="聖誕節餅乾圖片">
              <h2 class="position-absolute top-50 start-50 translate-middle
                text-xl font-medium tracking-wider">暖心餅乾
              </h2>
            </swiper-slide>
            <swiper-slide class="position-relative">
              <img class="w-100" src="@/assets/pic/homepage/萬聖節餅乾.png" alt="萬聖節餅乾圖片">
              <h2 class="position-absolute top-50 start-50 translate-middle
                text-xl font-medium tracking-wider">搞怪餅乾
              </h2>
            </swiper-slide>
          </swiper-container>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row py-5">
        <div class="line" />
        <div class="col-12 text-center mb-5">
          <h4 class="title-01">榮獲標章</h4>
          <p class="p-01">食在好安心</p>
        </div>
        <div
          class="col-12 col-md-3 d-flex my-3 py-3 my-md-0 markContainer"
          data-aos="fade-left">
          <img
            class="markImg"
            src="@/assets/pic/icon/CAS.png"
            alt="CAS優良食品標誌">
          <div class="ps-2">
            <h5>CAS優良食品標誌</h5>
            <p>經學者、專家嚴格評核通過標準</p>
          </div>
        </div>
        <div
          class="col-12 col-md-3 d-flex my-3 py-3 my-md-0 markContainer"
          data-aos="fade-left"
          data-aos-delay="100">
          <img src="@/assets/pic/icon/GMP.png"
            class="markImg"
            alt="GMP認證標章">
          <div class="ps-2">
            <h5>GMP認證標章</h5>
            <p>製造過程中，品質與衛生安全都符合規範</p>
          </div>
        </div>
        <div
          class="col-12 col-md-3 d-flex my-3 py-3 my-md-0 markContainer"
          data-aos="fade-left"
          data-aos-delay="200">
          <img src="@/assets/pic/icon/TAP.png"
            class="markImg"
            alt="TAP產銷履歷農產品">
          <div class="ps-2">
            <h5>TAP產銷履歷農產品</h5>
            <p>驗證機構以親自前往生產場地，且也已通過產品進行抽驗。</p>
          </div>
        </div>
        <div
        class="col-12 col-md-3 d-flex my-3 py-3 my-md-0 markContainer"
          data-aos="fade-left"
          data-aos-delay="300">
          <img src="@/assets/pic/icon/安全蔬果.png"
            class="markImg"
            alt="安全蔬果吉園圃標章">
          <div class="ps-2">
            <h5>安全蔬果吉園圃標章</h5>
            <p>輔導農民正確使用農藥，以生產優質安全蔬果。</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fulid">
      <div class="subBg">
        <div class="mx-auto"
          style="max-width:450px;">
          <VForm
            @submit="submitEmail"
            class="position-relative form-outline form-white my-5">
            <h2 class="font-medium tracking-widest text-3xl d-block">
              訂閱甜點電子報<br>立馬獲得8折優惠卷
            </h2>
            <div class="sub d-flex flex-wrap justify-content-center pt-3">
              <VField
                v-model="subMail"
                type="email"
                name="email"
                id="subscription"
                rules="required|email"
                label="信箱"
                :validateOnBlur="false"
                :validateOnChange="false"
                class="sub-input d-inline-block bg-transparent
                rounded-0 tracking-widest"
                placeholder="EMAIL" />
              <button type="submitEmail"
                class="sub-btn d-inline-block text-black tracking-wide">
                <i class="bi bi-envelope footer-envelope" />
              </button>
              <ErrorMessage
                class="text-orange"
                :class="{ 'd-none': subMail == ''}"
                name="email" />
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>
  <RouterLink to="/user/contact"
    class="position-fixed text-center
    end-0 bottom-0 cursor-pointer m-3 border chat-container"
    :class="{ 'translateY-70px':!scrollIcon }">
    <i
      class="bi bi-chat-dots-fill chat-icon" />
  </RouterLink>
  <div
    :class="{ 'scrollIconMoveIn':!scrollIcon  }"
    ref="scrollTop"
    class="scrollTop-container position-fixed text-center
    end-0 bottom-0 cursor-pointer m-3">
    <div
      @click="scrollToTop"
      @keydown="scrollToTop"
      class="scrollTop-btn d-block">
    </div>
  </div>
  <Footer/>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import emitter from '@/methods/emitter';
import { register } from 'swiper/element/bundle';
import '@/assets/scss/swiper/homePageSwiper.css';
import Loading from '@/components/IsLoading.vue';
import Navbar from '../components/FrontNavbar.vue';
import Footer from '../components/FrontFooter.vue';
import scrollMixins from '../mixins/scroll';

register();

export default {
  data() {
    return {
      subMail: '',
      products: {},
      isLoading: false,
      cartsNum: 0,
      carts: {},
      favoriteData: [],
      history: [],
      productLoading: true,
    };
  },
  components: {
    Navbar, Footer, Loading,
  },
  mixins: [scrollMixins],
  methods: {
    submitEmail() {
      this.subMail = '';
      Swal.fire('感謝您的訂閱，<br>8折優惠碼:coupon012');
    },
    getData() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.productLoading = false;
      this.axios.get(api).then((response) => {
        this.productLoading = true;
        this.products = response.data.products.filter((item) => {
          if (item.num <= 5 && item.num > 0) {
            return item;
          }
          return false;
        });
      });
    },
    more(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.axios.get(api).then(() => {
        this.$router.push(`/user/product/${id}`);
      });
      this.productHistory(id);
    },
    productHistory(id) {
      this.history = JSON.parse(localStorage.getItem('setHistory')) || [];
      if (this.history.includes(id)) {
        this.history.splice(this.history.indexOf(id), 1);
      } else {
        this.history.push(id);
        localStorage.setItem('setHistory', JSON.stringify(this.history));
      }
    },
    addCart(item, e) {
      e.target.childNodes[0].classList.remove('d-none');
      const data = {
        product_id: item.id,
        qty: 1,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.axios.post(api, { data }).then(() => {
        e.target.childNodes[0].classList.add('d-none');
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
          icon: 'success',
          title: '成功加入購物車',
        });
      });
      this.renderCarts();
      emitter.emit('updateCartsNum');
    },
    renderCarts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.get(api)
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
    updateFav() {
      this.favoriteData = JSON.parse(localStorage.getItem('fav')) || [];
    },
  },
  mounted() {
    this.getData();
    this.updateFav();
  },
};
</script>
