<template>
  <Navbar />
  <div class="bg-dark overflow-hidden ">
    <div class="container-fulid pt-utility">
      <div class="overflow-hidden homeContainer">
        <div class="homeBanner w-100 h-100 position-relative">
          <a href="#recommend"
            class="slider-icon position-absolute bottom-0 start-50
            translate-middle-x border border-3 text-center"
            :class="{ 'btn-hidden-toggle': slider }"
            style="width:30px;height:50px;z-index:10;border-radius: 30px;">
            <span class="d-none">eslint</span>
          </a>
          <div
            class="position-absolute top-50 start-50 translate-middle">
            <span class="badge bg-warning text-dark"
              style="font-size: 1rem">全站免運費中
            </span>
            <h1 class="font-bold text-nowrap pt-2">專業、健康、新鮮現做的甜點店
            </h1>
            <h2 class="tracking-widest mb-5">軟在口中，甜在心上。
            </h2>
            <router-link to="/user/products" class="href-none d-block text-center">
              <w-button
                type="button"
                class="w-btn">前往商店
              </w-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div
      class="container main"
      id="recommend">
      <div class="row">
        <div class="col-12 col-md-6 my-2 position-relative"
          data-aos="fade-right">
          <img src="../assets/pic/banner/grocery01.png"
            style="border:1px solid white; border-radius:5px"
            class="w-100"
            alt="巧克力打折系列圖片">
          <div class="position-absolute top-50
            translate-middle-y ps-5 tracking-widest">
            <h3>巧克力系列</h3>
            <p class="mb-2 mb-md-3">現正7折優惠中！</p>
            <router-link
              to="/user/products"
              class="href-none">
              <w-button class="w-btn">前往商店
              </w-button>
            </router-link>
          </div>
        </div>
        <div
          class="col-12 col-md-6 my-2 position-relative"
          data-aos="fade-left">
          <img
            src="../assets/pic/banner/grocery02.png"
            style="border:1px solid white; border-radius:5px"
            class="w-100"
            alt="杯子蛋糕打折系列圖片">
          <div class="position-absolute top-50
            translate-middle-y ps-5 tracking-widest">
            <h3>杯子蛋糕系列</h3>
            <p class="mb-2 mb-md-3">現正7折優惠中！</p>
            <router-link
              to="/user/products"
              class="href-none">
              <w-button class="w-btn">前往商店
              </w-button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="line my-5"></div>
      <div class="row">
        <div class="col-12 text-center my-5">
          <h3 class="title-01">熱銷商品</h3>
        </div>
        <div
          class="col-12 text-center pt-5"
          :class="{ 'd-none': productLoading }">
          <div
            class="spinner-border text-light"
            role="status"
            style="width: 3rem; height: 3rem;">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="col-6 col-md-6 col-lg-4 col-xl-3 mb-5"
          v-for="item,index in products"
          :key="index">
          <div class="text-white product-content-container
            mx-auto cursor-pointer position-relative"
            @click="more(item.id,$event,index)"
            @keydown="more(item.id,$event,index)">
              <span class="badge bg-danger position-absolute"
                style="z-index:5; top:5%; left:5%">HOT
              </span>
              <div class="product-item position-relative">
                <w-image
                  :src="item.imageUrl"
                  class="position-relative w-100 h-100 product-img"
                  alt="雜誌圖片">
                </w-image>
              <div class="w-100 productNotes-container position-absolute bottom-0 start-50">
                <i class="productNotes-icon d-block bi bi-info-square text-4xl
                  position-relative top-50 start-50 text-center" />
              </div>
              <div
                class="fav position-absolute end-0 top-0"
                @click.stop="addFav(item,index)"
                @keydown="addFav(item,index)">
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
          <router-link
            to="/user/products"
            class="href-none">
            <w-button class="w-btn">看更多
            </w-button>
          </router-link>
        </div>
      </div>
      <div class="line my-5" />
    </div>
    <div class="container">
      <div class="row flex-column-reverse flex-md-row-reverse align-items-md-center">
        <div class="col-12 col-md-6 text-center py-5 py-md-0">
          <h1 class="title-01">客製化訂單</h1>
          <p class="pb-5 p-01">
            始終找不到您心中幻想的甜點嗎？<br>
            <span>( 聯絡我們提供想法、溝通報價 )</span>
          </p>
          <router-link
            to="/user/contact"
            class="href-none">
            <w-button class="w-btn">聯絡我們
            </w-button>
          </router-link>
        </div>
        <div class="col-12 col-md-6">
          <swiper ref="{swiperRef}"
            :slidesPerView="1"
            :centeredSlides="true"
            :spaceBetween="30"
            :navigation="true"
            :modules="modules"
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
              <img src="@/assets/pic/homepage/母親節蛋糕.png" alt="母親節蛋糕圖片">
              <h2 class="position-absolute top-50 start-50 translate-middle
                text-xl font-medium tracking-wider text-nowrap">母親節蛋糕
              </h2>
            </swiper-slide>
            <swiper-slide class="position-relative">
              <img class="" src="@/assets/pic/homepage/聖誕節餅乾.png" alt="聖誕節餅乾圖片">
              <h2 class="position-absolute top-50 start-50 translate-middle
                text-xl font-medium tracking-wider">暖心餅乾
              </h2>
            </swiper-slide>
            <swiper-slide class="position-relative">
              <img class="" src="@/assets/pic/homepage/萬聖節餅乾.png" alt="萬聖節餅乾圖片">
              <h2 class="position-absolute top-50 start-50 translate-middle
                text-xl font-medium tracking-wider">搞怪餅乾
              </h2>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row py-5">
        <div class="col-12 mb-5"
          style="border-top:1px solid rgb(64, 64, 64);">
        </div>
        <div class="col-12 text-center mb-5">
          <h4 class="title-01">榮獲標章</h4>
          <p class="p-01">食在好安心</p>
        </div>
        <div
          class="col-12 col-md-3 d-flex my-3 my-md-0"
          data-aos="fade-left">
          <img
            src="@/assets/pic/icon/CAS.png"
            style="width:50px;height:50px"
            alt="CAS優良食品標誌">
          <div class="ps-2">
            <h5>CAS優良食品標誌</h5>
            <p>經學者、專家嚴格評核通過標準</p>
          </div>
        </div>
        <div
          class="col-12 col-md-3 d-flex my-3 my-md-0"
          data-aos="fade-left"
          data-aos-delay="100">
          <img src="@/assets/pic/icon/GMP.png"
            style="width:50px;height:50px" alt="GMP認證標章">
          <div class="ps-2">
            <h5>GMP認證標章</h5>
            <p>製造過程中，品質與衛生安全都符合規範</p>
          </div>
        </div>
        <div
          class="col-12 col-md-3 d-flex my-3 my-md-0"
          data-aos="fade-left"
          data-aos-delay="200">
          <img src="@/assets/pic/icon/TAP.png"
            style="width:50px;height:50px" alt="TAP產銷履歷農產品">
          <div class="ps-2">
            <h5>TAP產銷履歷農產品</h5>
            <p>驗證機構以親自前往生產場地，且也已通過產品進行抽驗。</p>
          </div>
        </div>
        <div class="col-12 col-md-3 d-flex my-3 my-md-0"
          data-aos="fade-left"
          data-aos-delay="300">
          <img src="@/assets/pic/icon/安全蔬果.png"
            style="width:50px;height:50px" alt="安全蔬果吉園圃標章">
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
            @submit="submit"
            class="position-relative form-outline form-white my-5">
            <h2 class="font-medium tracking-widest text-3xl d-block">
              訂閱甜點電子報<br>立馬獲得8折優惠卷
            </h2>
            <div class="sub d-flex flex-wrap justify-content-center pt-3">
              <VField
                v-model="subMail"
                type="email"
                name="信箱"
                id="subscription"
                rules="required|email"
                :validateOnBlur="false"
                :validateOnChange="false"
                class="sub-input d-inline-block bg-transparent
                rounded-0 tracking-widest"
                placeholder="EMAIL" />
              <button type="submit"
                class="sub-btn d-inline-block text-black tracking-wide">
                <i class="bi bi-envelope footer-envelope" />
              </button>
              <ErrorMessage
                :class="{ 'd-none': subMail == ''}"
                name="信箱"
                style="color:orangered" />
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>
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
import {
  Swiper, SwiperSlide,
} from 'swiper/vue';
import {
  Parallax, Autoplay, Navigation,
} from 'swiper';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import emitter from '@/methods/emitter';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import 'swiper/css';
import 'swiper/css/effect-fade';
import '../assets/scss/swiper/homePageSwiper.css';
import 'swiper/css/navigation';
import scrollMixins from '../mixins/scroll';

export default {
  data() {
    return {
      subMail: '',
      slider: false,
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
    Navbar, Footer, Swiper, SwiperSlide,
  },
  setup() {
    return {
      modules: [Parallax, Autoplay, Navigation],
    };
  },
  mixins: [scrollMixins],
  methods: {
    submit() {
      this.subMail = '';
      Swal.fire('感謝您的訂閱，<br>8折優惠碼:coupon012');
    },
    getData() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.productLoading = false;
      this.axios.get(api).then((res) => {
        this.productLoading = true;
        this.products = res.data.products.filter((item) => {
          if (item.num <= 5 && item.num > 0) {
            return item;
          }
          return false;
        });
      });
    },
    more(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.axios.get(api).then((res) => {
        if (res.data.success) {
          this.$router.push(`/user/product/${id}`);
        }
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
    // !!
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
      this.axios.get(api).then((res) => {
        const { carts } = res.data.data;
        if (res.data.success) {
          let num = 1;
          carts.forEach((i) => {
            num += i.qty;
          });
          this.cartsNum = num;
        }
        this.getCarts();
      });
      this.renderCarts();
      emitter.emit('updateCartsNum');
    },
    getCarts() {
      if (!this.cartsNum) {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
        this.axios.get(api)
          .then((res) => {
            const { carts } = res.data.data;
            let num = 0;
            carts.forEach((i) => {
              num += i.qty;
              this.cartsNum = num;
            });
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
      }
    },
    renderCarts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.get(api)
        .then((res) => {
          this.carts = res.data.data.carts;
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
    onChange(e) {
      const { value } = e.target;
      if (value === '價格排序低到高' && this.products.length > 1) {
        this.products.sort((a, b) => a.price - b.price);
      } else if (value === '價格排序高到低' && this.products.length > 1) {
        this.products.sort((b, a) => a.price - b.price);
      }
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
