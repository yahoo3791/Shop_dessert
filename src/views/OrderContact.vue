<template>
  <Navbar />
  <div class="pt-5 auto-height">
    <div class="container pt-utility auto-height-content">
      <div class="row pb-5">
        <div class="col-12 d-flex justify-content-around pb-2">
          <div class="p-01">1.確認商品並填寫資料</div>
          <div class="p-01">2.完成訂單</div>
        </div>
        <div class="col-12">
          <div class="progress">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              style="width: 50%"
            ></div>
          </div>
        </div>
      </div>
      <div class="row text-white flex-column-reverse flex-md-row">
        <div class="col-12 col-md-6">
          <div
            class="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom-404040"
          >
            <h1 class="mb-0 tracking-widest font-bold text-3xl">訂購人資訊</h1>
          </div>
          <VForm @submit="submitContact">
            <div class="py-3 position-relative">
              <h3 class="d-block formData-label tracking-wide text-lg">*聯絡人姓名</h3>
              <VField
                id="name"
                v-model="formData.user.name"
                name="姓名"
                rules="required"
                type="text"
                class="carts-input w-100 p-2 border-0 border-bottom text-white"
                placeholder="請輸入姓名"
              />
              <ErrorMessage
                class="ps-2 position-absolute text-xs text-orange d-block"
                name="姓名"
              />
            </div>
            <div class="py-3 position-relative">
              <h3 class="tracking-wide text-lg">*性別</h3>
              <div class="form-check">
                <label class="form-check-label" for="male">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gendor"
                    v-model="gendor"
                    id="male"
                    value="male"
                    checked
                  />
                  男
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label" for="female">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gendor"
                    v-model="gendor"
                    id="female"
                    value="female"
                  />
                  女
                </label>
              </div>
            </div>
            <div class="py-3 position-relative">
              <h3 class="d-block formData-label tracking-widest text-lg">*聯絡人信箱</h3>
              <VField
                id="email"
                v-model="formData.user.email"
                name="信箱"
                rules="required|email"
                type="email"
                class="carts-input w-100 p-2 border-0 border-bottom text-white"
                placeholder="請輸入電子信箱"
              />
              <ErrorMessage
                class="ps-2 position-absolute text-xs text-orange d-block"
                name="信箱"
              />
            </div>
            <div class="py-3 position-relative">
              <h3 class="d-block formData-label tracking-widest text-lg">*聯絡人手機</h3>
              <VField
                id="phone"
                v-model="formData.user.tel"
                name="手機"
                rules="required"
                type="tel"
                class="carts-input w-100 p-2 border-0 border-bottom text-white d-block"
                placeholder="請輸入手機號碼"
              />
              <ErrorMessage class="ps-2 position-absolute text-xs text-orange" name="手機" />
            </div>
            <div class="py-3 position-relative">
              <h3 class="d-block formData-label tracking-widest text-lg">*收件人地址</h3>
              <VField
                id="address"
                v-model="formData.user.address"
                name="地址"
                rules="required"
                type="address"
                class="carts-input w-100 p-2 border-0 border-bottom text-white d-block"
                placeholder="請輸入完整地址"
              />
              <ErrorMessage class="ps-2 position-absolute text-xs text-orange" name="地址" />
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
                  class="bg-white text-black w-100 border-0 border-bottom p-2 text-center text-lg"
                  style="text-align-last: center"
                >
                  <option value="信用卡" name="payment">信用卡</option>
                  <option value="超商取貨付款" name="payment">超商取貨付款</option>
                </select>
              </label>
            </div>
            <div class="text-end mb-5 mt-3 d-block d-md-none">
              <div class="form-check text-end">
                <label class="form-check-label text-white text-xl ms-auto" for="check">
                  <input class="form-check-input" type="checkbox" id="check" v-model="selection" />
                  我已確認商品資訊
                </label>
              </div>
              <button
                type="submitContact"
                class="btn btn-light fw-bold ms-2"
                :class="{ 'not-allowed': !selection }"
              >
                付款
              </button>
            </div>
          </VForm>
        </div>
        <div class="col-12 col-md-5 offset-md-1">
          <h4 class="tracking-widest font-bold text-3xl pb-3 border-bottom-404040">商品資訊</h4>
          <div
            class="payCart-item border-bottom d-flex py-3"
            v-for="item in cartsData.carts"
            :key="item.id"
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
              <del :class="{ 'd-none': !coupon }" style="text-decoration-color: red">
                總金額{{ cartsData.total }}$
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
                :disabled="codeValue === ''"
              >
                套用優惠碼
              </button>
            </div>
          </div>
          <div class="text-end mb-5 d-none d-md-block">
            <div class="form-check text-end">
              <label class="form-check-label text-white text-xl ms-auto" for="check">
                <input class="form-check-input" type="checkbox" id="check" v-model="selection" />
                我已確認商品資訊
              </label>
            </div>
            <button
              type="button"
              @click="submitContact"
              class="btn btn-light fw-bold ms-2"
              :class="{ 'not-allowed': !selection }"
            >
              付款
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
import 'vue-loading-overlay/dist/vue-loading.css';
import 'sweetalert2/src/sweetalert2.scss';

const Swal = require('sweetalert2');

export default {
  setup() {
    const cartsData = ref({});
    const selection = ref(false);
    const coupon = ref(false);
    const formData = ref({
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
      },
      message: '',
    });
    const codeValue = ref('');
    const gendor = ref('');

    const getData = () => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.axios
        .get(api)
        .then((response) => {
          this.cartsData = response.data.data;
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
    const useCoupon = () => {
      const codeData = {
        code: this.codeValue,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      this.axios
        .post(api, { data: codeData })
        .then(() => {
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
    const submitContact = () => {
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
      } else if (this.selection === false) {
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
      } else {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
        this.axios
          .post(api, { data: this.formData })
          .then((response) => {
            const { orderId } = response.data;
            this.$router.push(`/user/checkout/${orderId}`);
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
      }
    };

    onMounted(() => {
      getData();
    });
    return {
      cartsData,
      selection,
      coupon,
      formData,
      codeValue,
      gendor,
      getData,
      useCoupon,
      submitContact,
    };
  },
  components: {
    Navbar,
    Footer,
  },
};
</script>
