<template>
  <Navbar />
  <div class="pt-5">
    <div class="container pt-utility">
      <div class="row pb-5">
        <div class="col-12 d-flex justify-content-around pb-2">
          <div class="p-01">
            1.確認商品並填寫資料
          </div>
          <div class="p-01">
            2.完成訂單
          </div>
        </div>
        <div class="col-12">
          <div class="progress">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
              style="width: 50%">
            </div>
            </div>
        </div>
      </div>
      <div class="row text-white flex-column-reverse flex-md-row">
        <div class="col-12 col-md-6">
          <div
            class="d-flex justify-content-between align-items-center pb-3 mb-3"
            style="border-bottom: 1px solid #404040"
          >
            <h1 class="mb-0 tracking-widest font-bold text-3xl">訂購人資訊</h1>
          </div>
          <VForm @submit="submit">
            <div class="py-3 position-relative">
              <h3 class="d-block formData-label tracking-wide text-lg" for="name">*聯絡人姓名</h3>
              <VField
                id="name"
                v-model="formData.user.name"
                name="姓名"
                rules="required"
                type="text"
                class="carts-input w-100 p-2 border-0 border-bottom text-white"
                placeholder="請輸入姓名"
              />
              <br />
              <ErrorMessage
                style="color: #ff4343"
                class="ps-2 position-absolute text-xs"
                name="姓名"
              />
            </div>
            <div class="py-3 position-relative">
              <h3 class="tracking-wide text-lg">*性別</h3>
                <div class="form-check">
                  <label class="form-check-label" for="male">
                    男
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gendor"
                      v-model="gendor"
                      id="male"
                      value="male"
                      checked
                    />
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label" for="female">
                    女
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gendor"
                      v-model="gendor"
                      id="female"
                      value="female"
                    />
                  </label>
                </div>
            </div>
            <div class="py-3 position-relative">
              <h3 class="d-block formData-label tracking-widest text-lg" for="email">
                *聯絡人信箱
              </h3>
              <VField
                id="email"
                v-model="formData.user.email"
                name="信箱"
                rules="required|email"
                type="email"
                class="carts-input w-100 p-2 border-0 border-bottom text-white"
                placeholder="請輸入電子信箱"
              />
              <br />
              <ErrorMessage
                style="color: #ff4343"
                class="ps-2 position-absolute text-xs"
                name="信箱"
              />
            </div>
            <div class="py-3 position-relative">
              <h3 class="d-block formData-label tracking-widest text-lg" for="phone">
                *聯絡人手機
              </h3>
              <VField
                id="phone"
                v-model="formData.user.tel"
                name="手機"
                rules="required"
                type="tel"
                class="carts-input w-100 p-2 border-0 border-bottom text-white"
                placeholder="請輸入手機號碼"
              />
              <br />
              <ErrorMessage
                style="color: #ff4343"
                class="ps-2 position-absolute text-xs"
                name="手機"
              />
            </div>
            <div class="py-3 position-relative">
              <h3 class="d-block formData-label tracking-widest text-lg" for="address">
                *收件人地址
              </h3>
              <VField
                id="address"
                v-model="formData.user.address"
                name="地址"
                rules="required"
                type="address"
                class="carts-input w-100 p-2 border-0 border-bottom text-white"
                placeholder="請輸入完整地址"
              />
              <br />
              <ErrorMessage
                style="color: #ff4343"
                class="ps-2 position-absolute text-xs"
                name="地址"
              />
            </div>
            <div class="py-3 position-relative">
              <label
                ref="formMessage"
                class="d-block formData-label tracking-wide text-lg"
                for="adress"
                >備註
                <span class="text-lg tracking-wide opacity-75" />
                <input
                  id="message"
                  v-model="formData.message"
                  name="留言"
                  class="carts-input w-100 p-2 border-0 border-bottom text-white"
                  maxlength="100"
                  placeholder="留下疑問或需求"
                />
              </label>
            </div>
            <div class="py-3 position-relative">
              <label for="payment" class="d-block text-lg"
                >*付款方式
                <select
                  name="payment"
                  id="payment"
                  class="bg-white text-black w-100 border-0 border-bottom
                  p-2 text-center text-lg"
                  style="text-align-last: center"
                >
                  <option value="信用卡" name="payment">信用卡</option>
                  <option value="超商取貨付款" name="payment">超商取貨付款</option>
                </select>
              </label>
            </div>
            <div class="text-end mb-5 mt-3 d-block d-md-none">
              <div class="form-check text-end">
                <label
                  class="form-check-label text-white text-xl ms-auto"
                  for="check">
                  <input class="form-check-input" type="checkbox"
                  value="" id="check" v-model="selection1">我已確認商品資訊
                </label>
              </div>
              <button type="submit"
                class="btn btn-light fw-bold ms-2"
                :class="{'not-allowed': !selection1}"
                >付款
              </button>
            </div>
          </VForm>
        </div>
        <div class="col-12 col-md-5 offset-md-1">
          <h4
            class="tracking-widest font-bold text-3xl pb-3"
            style="border-bottom: 1px solid #404040"
          >
            商品資訊
          </h4>
          <div
            class="payCart-item border-bottom d-flex py-3"
            v-for="(item, k) in cartsData.carts"
            :key="k"
          >
            <img :src="item.product.imageUrl" class="d-block" alt="cartImage" />
            <div class="text-2xl d-flex flex-column justify-content-between ps-3">
              <p class="tracking-wide font-semibold">
                {{ item.product.title }}
                ({{ item.product.unit }})
              </p>
              <p class="leading-7 tracking-wider text-lg">單價{{ item.product.price }}$</p>
              <p class="leading-7 tracking-wider text-lg">數量{{ item.qty }}</p>
              <p class="leading-7 d-block tracking-wider text-xl">金額{{ item.total }}$</p>
            </div>
          </div>
          <div class="text-white text-end tracking-widest font-semibold text-xl">
            <div :class="{ 'd-none': coupon }">總金額{{ cartsData.total }}$</div>
            <div>
              <del :class="{ 'd-none': !coupon }" style="text-decoration-color: red"
                >總金額{{ cartsData.total }}$
              </del>
            </div>
            <div class="col-12 pt-2 pb-3 text-red text-end tracking-widest font-semibold text-base">
              <p :class="{ 'd-none': !coupon }">
                折扣價{{ Math.round($filters.currency(cartsData.final_total)) }}$
              </p>
            </div>
          </div>
          <div class="input-group mb-5 input-group-sm ms-auto w-100">
            <label for="coupon" class="d-block form-control rounded-0">
              <input
                id="coupon"
                name="coupon"
                type="text"
                ref="codeValue"
                v-model="codeValue"
                class="tracking-widest border-0 w-100"
                placeholder="請輸入優惠碼"
              />
            </label>
            <div class="input-group-append">
              <button
                @click="useCoupon"
                class="btn btn-outline-secondary tracking-widest rounded-0"
                type="button"
                :disabled="coupon"
              >
                套用優惠碼
              </button>
            </div>
          </div>
          <div class="text-end mb-5 d-none d-md-block">
            <div class="form-check text-end">
              <label
                class="form-check-label text-white text-xl ms-auto"
                for="check">
                <input class="form-check-input" type="checkbox"
                value="" id="check" v-model="selection1">我已確認商品資訊
              </label>
            </div>
            <button type="button"
              @click="submit"
              class="btn btn-light fw-bold ms-2"
              :class="{'not-allowed': !selection1}"
              >付款
            </button>
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
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export default {
  data() {
    return {
      cartsData: {},
      selection1: false,
      formData: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      codeValue: '',
      coupon: false,
      gendor: '',
    };
  },
  components: {
    Navbar,
    Footer,
  },
  methods: {
    getData() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.axios
        .get(api)
        .then((res) => {
          this.cartsData = res.data.data;
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
    useCoupon() {
      const codeData = {
        code: this.codeValue,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      this.axios
        .post(api, { data: codeData })
        .then((res) => {
          if (res.data.success) {
            this.getData();
            this.coupon = true;
            this.$refs.codeValue.disabled = true;
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
              title: '使用優惠卷成功',
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
              title: '使用優惠卷異常',
            });
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
    submit() {
      if (
        this.formData.user.name === '' || this.formData.user.email === '' || this.formData.user.tel === '' || this.formData.user.address === ''
      ) {
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
          icon: 'info',
          title: '資料未完整填寫',
        });
      } else if (this.gendor !== '') {
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
          icon: 'info',
          title: '請填寫性別欄位 <i class="bi bi-emoji-smile-fill"></i>',
        });
        return;
      } else if (this.selection1 === false) {
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
          icon: 'info',
          title: '確認資訊完成後<br>記得勾選確認欄位 <i class="bi bi-emoji-smile-fill"></i>',
        });
        return;
      }
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.axios
        .post(api, { data: this.formData })
        .then((res) => {
          console.log(res);
          const { orderId } = res.data;
          if (res.data.success) {
            this.$router.push(`/user/checkout/${orderId}`);
          } else {
            console.log('error');
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
  },
  mounted() {
    this.getData();
  },
};
</script>
