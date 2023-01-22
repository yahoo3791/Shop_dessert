<template>
  <loading v-model:active="isLoading" />
  <Navbar />
  <div class="bg-dark">
    <div class="container">
      <div class="row">
        <div
          class="col-10 col-md-6 mx-auto text-white text-center"
          style="padding-top:20vh; padding-bottom:10vh">
          <h1 class="title-01">查詢訂單</h1>
          <div class="d-flex py-3">
            <input
              id="message"
              name="留言"
              class="carts-input p-2 border-0 border-bottom text-white tracking-wider"
              maxlength="100"
              placeholder="輸入您的訂單編號"
              style="width:80%"
              v-model="orderNumber"
              @keyup.enter="search">
            <i
              class="bi bi-search cursor-pointer d-block p-2 order-search"
              @click="search"
              @keydown="search" />
          </div>
        </div>
      </div>
    </div>
    <div class="container text-white"
      style="padding-bottom:20vh;padding-top:10vh"
      :class="{'d-none': !getOrder}">
      <div class="row">
        <div class="col-10 col-md-6 mx-auto">
          <h3
            class="tracking-widest font-bold text-3xl pb-3 mt-5"
            style="border-bottom: 1px solid #404040;">訂購人資訊</h3>
          <div class="row">
            <div class="col-12 text-white mb-5 d-flex">
              <div class="text-base tracking-widest text-lg">
                <p class="py-1">聯絡人姓名</p>
                <p class="py-1">聯絡人信箱</p>
                <p class="py-1">聯絡人手機</p>
                <p class="py-1">收件人地址</p>
              </div>
              <div class="ps-3 tracking-widest text-lg">
                <p class="py-1">{{ user.name }}</p>
                <p class="py-1">{{ user.email }}</p>
                <p class="py-1">{{ user.tel }}</p>
                <p class="py-1">{{ user.address }}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <h3
              class="tracking-widest font-bold text-3xl pb-3 mt-3"
              style="border-bottom: 1px solid #404040;">商品資訊</h3>
            <div class="col-12 text-white mb-5">
              <div
                class="payCart-item border-bottom d-flex py-3"
                v-for="item,k in order.products"
                :key="k">
                <img
                  :src="item.product.imageUrl"
                  class="d-block"
                  style="max-width: 100px;"
                  alt="cartImage">
                <div class="text-sm d-flex flex-column justify-content-between ps-3">
                  <p class="text-2xl">{{ item.product.title }}
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
            <h3
              class="tracking-widest font-bold text-3xl pb-3 mt-3"
              style="border-bottom: 1px solid #404040;">付款資訊
            </h3>
            <div class="col-12 tracking-widest text-lg">
              <p>訂單時間: {{ $filters.date(order.create_at)}}</p>
              <p class="py-1">訂單編號:<br>{{order.id}}</p>
              <p class="py-1">金額 {{ Math.round($filters.currency(order.total)) }}$</p>
              <p class="py-1" v-if="order.is_paid === true">付款完成</p>
              <p class="py-1" v-else-if="order.is_paid === false">尚未付款</p>
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

export default {
  data() {
    return {
      isLoading: false,
      orderNumber: '',
      order: {},
      user: {},
      getOrder: false,
    };
  },
  components: { Navbar, Footer, Loading },
  methods: {
    search() {
      const id = this.orderNumber;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`;
      this.isLoading = true;
      if (this.orderNumber === '') {
        Swal.fire({
          icon: 'error',
          title: '找不到您的訂單',
        });
        this.isLoading = false;
        return;
      }
      this.axios.get(api).then((res) => {
        this.isLoading = false;
        this.orderNumber = '';
        console.log(res.data);
        if (res.data.order === null) {
          Swal.fire({
            icon: 'error',
            title: '訂單編號錯誤',
            text: '如有需要請聯絡客服人員,感謝您!',
            footer: '辦公室地址:台北市信義區市府路101號<br>客服電話:(02)1010101<br>客服時間:週一至週五上午07:00~下午17:00<br>Email:DessertOfficer010@gmail.com',
          });
        } else {
          this.getOrder = true;
          this.order = res.data.order;
          this.user = res.data.order.user;
        }
      });
    },
  },
};
</script>
