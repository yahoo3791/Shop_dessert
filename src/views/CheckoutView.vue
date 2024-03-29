<template>
  <Loading v-model:active="isLoading" />
  <Navbar />
  <div class="bg-dark auto-height">
    <div class="container">
      <div class="row pb-5" style="padding-top: 20vh">
        <div class="col-12 d-flex justify-content-around pb-2">
          <div class="p-01">1.確認商品並填寫資料</div>
          <div class="p-01">2.完成訂單</div>
        </div>
        <div class="col-12">
          <div class="progress">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated w-100"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-white text-center" style="padding-top: 10vh">
          <h1 class="tracking-widest font-bold">付款成功! 感謝您的惠顧</h1>
          <p>以下是您的訂單資訊</p>
        </div>
      </div>
    </div>
    <div class="container text-white auto-height-content">
      <div class="row">
        <div class="col-10 col-md-6 mx-auto">
          <h3 class="tracking-widest font-bold text-3xl pb-3 mt-5 border-bottom-404040">
            訂購人資訊
          </h3>
          <div class="row">
            <div class="col-12 text-white mb-5 d-flex">
              <div class="tracking-widest text-lg">
                <p class="py-1">聯絡人姓名</p>
                <p class="py-1">聯絡人信箱</p>
                <p class="py-1">聯絡人手機</p>
                <p class="py-1">收件人地址</p>
              </div>
              <div class="ps-3 tracking-widest text-lg">
                <p class="py-1">{{ userData.name }}</p>
                <p class="py-1">{{ userData.email }}</p>
                <p class="py-1">{{ userData.tel }}</p>
                <p class="py-1">{{ userData.address }}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <h3 class="pb-3 mt-3 tracking-widest font-bold text-3xl border-bottom-404040">
              商品資訊
            </h3>
            <div class="col-12 text-white mb-5">
              <div
                class="payCart-item border-bottom d-flex py-3"
                v-for="item in details.products"
                :key="item.id"
              >
                <img
                  :src="item.product.imageUrl"
                  class="d-block"
                  style="max-width: 100px"
                  alt="cartImage"
                />
                <div class="text-sm d-flex flex-column justify-content-between ps-3">
                  <p class="text-2xl">
                    {{ item.product.title }}
                  </p>
                  <p class="leading-7 tracking-wider text-lg">
                    <i class="bi bi-x" />{{ item.qty }}
                  </p>
                  <p class="leading-7 d-block tracking-wider text-xl">
                    {{ item.total }}<i class="bi bi-currency-dollar" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <h3 class="pb-3 mt-3 tracking-widest font-bold text-3xl border-bottom-404040">
              付款資訊
            </h3>
            <div class="col-12 tracking-widest text-lg">
              <p v-if="details.create_at">訂單成立成功</p>
              <p class="py-1">訂單編號:</p>
              <p>{{ $route.params.orderId }}</p>
              <p>(查詢訂單時輸入此編號)</p>
              <p class="py-1">總金額{{ Math.round($filters.currency(details.total)) }}$</p>
              <p class="py-1" v-if="details.is_paid === true">付款完成</p>
              <p class="py-1" v-else>尚未付款</p>
            </div>
          </div>
          <div class="col-12 pt-2 pb-5 text-end my-5">
            <button
              type="button"
              class="btn btn-light fw-bold me-2"
              @click="$router.push('/user/checkOrder')"
            >
              查詢訂單
            </button>
            <button
              type="button"
              class="btn btn-light fw-bold"
              @click="$router.push('/user/products')"
            >
              繼續購物
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/FrontNavbar.vue';
import Footer from '@/components/FrontFooter.vue';
import Loading from '@/components/IsLoading.vue';
import 'sweetalert2/src/sweetalert2.scss';

const Swal = require('sweetalert2');

export default {
  setup() {
    const details = ref({});
    const userData = ref({});
    const isLoading = ref(false);

    const payOrder = () => {
      const { orderId } = this.$route.params;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${orderId}`;
      this.isLoading = true;
      this.axios
        .post(api)
        .then(() => {
          this.isLoading = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '付款成功',
            showConfirmButton: false,
            timer: 1500,
          });
          this.render();
        })
        .catch(() => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '付款失敗',
            text: '請聯絡我們客服人員',
          });
        });
    };
    const render = () => {
      const { orderId } = this.$route.params;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${orderId}`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((response) => {
          this.isLoading = false;
          this.details = response.data.order;
          this.userData = response.data.order.user;
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
    onMounted(() => {
      render();
      payOrder();
    });
    return {
      details,
      userData,
      isLoading,
      payOrder,
      render,
    };
  },
  components: {
    Navbar,
    Footer,
    Loading,
  },
};
</script>
