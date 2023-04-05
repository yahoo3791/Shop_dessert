<template>
  <loading v-model:active="isLoading" />
  <Navbar />
  <div class="bg-dark w-100 h-100 overflow-hidden position-relative">
    <div class="container pt-utility text-white position-relative"
    :class="{ 'auto-height': !cartsSwitch }">
      <div class="row">
        <div
          class="col-12 text-center"
          :class="{ 'd-none': cartsSwitch }"
          style="padding: 20vh 0;">
          <h1 class="title-01">購物車無加入商品</h1>
          <RouterLink
            to="/user/products"
            class="text-decoration-none">
            <button
              type="button"
              class="btn btn-light fw-bold mt-5"
              >前往商城
            </button>
          </RouterLink>
        </div>
      </div>
      <div :class="{ 'd-none': !cartsSwitch }">
        <div class="row mx-0">
          <div class="col-12 p-0 my-4">
            <div class="d-flex justify-content-between
              align-items-center pb-3 border-bottom-404040">
              <h1 class="mb-0 text-center tracking-widest font-bold text-3xl">購物車</h1>
              <div>
                <button
                  type="button"
                  class="btn btn-light fw-bold"
                  @click="$refs.DeleteCartsAll.modalShow()">
                  刪除全部
                </button>
                <button
                  type="button"
                  class="btn btn-light fw-bold ms-2"
                  @click="$router.push('/user/products')">
                  繼續購物
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="col-12 mt-4 mb-2"
            v-for="item,key in cartsData.carts"
            :key="item.id">
            <div
              class="d-flex d-md-none justify-content-between
              pb-2 mb-2 tracking-wide">
              <button
                  type="button"
                  class="btn btn-light fw-bold ms-2"
                  @click="open(item,key)">
                  編輯
                </button>
              <p>{{ item.product.category }}類</p>
            </div>
            <div
              class="d-md-none cartsInput-sm-container
              position-absolute mx-auto mt-1 mb-2 text-white"
              ref="left"
              style="transform: translateX(-500px);">
              <div class="d-flex">
                <div class="mx-auto cartsInput-sm-Item">
                  <div class="border text-center cartsInput-sm-add cursor-pointer"
                    @click="add(item.id, key)"
                    @keydown="add(item.id, key)">
                    +
                  </div>
                  <label for="smNum">
                    <input
                      name="smNum"
                      id="smNum"
                      :disabled="isLoading"
                      ref="updateValue"
                      @change="updateQty(item.id, key)"
                      class="d-block text-center text-white border
                      cartsInput-sm-input"
                      type="text"
                      min="1"
                      :value="item.qty">
                  </label>
                  <div
                    class="border text-center cartsInput-sm-min cursor-pointer"
                    @click="min(item.id, key)"
                    @keydown="min(item.id, key)">
                    -
                  </div>
                </div>
              </div>
            </div>
            <div
              class="d-flex align-items-center cartsItem pb-5"
              ref="right"
              style="transform:translateX(0px);">
              <div class="d-flex">
                <div class="carts-pic">
                  <img
                    :src="item.product.imageUrl"
                    class="carts-img"
                    alt="新增至購物車內的圖片">
                </div>
                <div class="ms-3 d-flex flex-column justify-content-between text-2xl">
                  <p class="tracking-wide font-semibold">{{ item.product.title }}
                    <span class="d-none d-md-inline-block">
                      ({{ item.product.unit }})
                    </span>
                  </p>
                  <p class="leading-7 tracking-wider text-lg">
                    單價{{ item.product.price }}$
                  </p>
                  <p class="leading-7 d-block tracking-wider text-xl">
                    小計{{ $filters.currency( item.total ) }}$
                  </p>
                </div>
              </div>
              <div class="ms-auto cartsInput-md-container d-none d-md-inline-block">
                <div class="cartsInput-md-Item d-flex align-items-center">
                  <div
                    @click="min(item.id, key)"
                    @keydown="min(item.id, key)"
                    class="cartsInput-md-min cursor-pointer text-center border">-
                  </div>
                  <div class="cartsInput-md-input text-xl">
                    <label
                      for="num"
                      class="d-block h-100">
                      <input
                        id="num"
                        name="num"
                        v-model="item.qty"
                        type="text"
                        min="1"
                        style="max-width:120px"
                        class="d-block border rounded-0 bg-dark
                        text-center text-white border w-100"
                        @change="updateQty(item.id, key)"
                        ref="updateValue">
                    </label>
                  </div>
                  <div
                    @click="add(item.id, key)"
                    @keydown="add(item.id, key)"
                    class="cartsInput-md-add cursor-pointer text-center border">+</div>
                </div>
              </div>
              <div
                class="ms-auto ms-md-3 delete text-center
                cartsInput-trash cursor-pointer"
                @click="openDeleteCarts(item)"
                @keydown="openDeleteCarts(item)">
                <i class="bi bi-trash3-fill fs-3" />
              </div>
            </div>
          </div>
          <p class="text-white text-end tracking-widest font-semibold text-xl
            pb-3">總計 {{ $filters.currency( cartsData.total ) }} $
          </p>
        </div>
        <div class="row pb-5">
          <div class="col-12 mb-5">
            <div class="form-check text-end">
              <label
                class="form-check-label text-white text-xl ms-auto"
                for="check">
                <input class="form-check-input" type="checkbox"
                value="" id="check" v-model="selection1">我已確認商品資訊
              </label>
            </div>
          </div>
          <div class="col-12 text-end">
            <button
              type="button"
              class="btn btn-light fw-bold"
              :class="{'not-allowed': !selection1}"
              @click="contactMethod">
              下一步
            </button>
          </div>
        </div>
        </div>
    </div>
    <DeleteCartsAll ref="DeleteCartsAll" @checkDeleteAll="deleteCarts" />
    <DeleteCarts ref="DeleteCarts" @checkDelete="deleteProduct" />
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/FrontNavbar.vue';
import Footer from '@/components/FrontFooter.vue';
import Loading from '@/components/IsLoading.vue';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import emitter from '@/methods/emitter';
import DeleteCartsAll from '@/components/DeleteCartsAll.vue';
import DeleteCarts from '@/components/DeleteCarts.vue';

export default {
  data() {
    return {
      cartsData: {},
      deleteItem: {},
      isLoading: false,
      cartsSwitch: false,
      openDoor: false,
      selection1: false,
      num: 1,
    };
  },
  components: {
    Navbar, Footer, Loading, DeleteCartsAll, DeleteCarts,
  },
  methods: {
    getData() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.cartsSwitch = true;
      this.isLoading = true;
      this.axios.get(api)
        .then((response) => {
          this.cartsData = response.data.data;
          this.isLoading = false;
          if (this.cartsData.carts.length === 0) {
            this.cartsSwitch = false;
          }
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
    deleteProduct() {
      const { id } = this.deleteItem;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.axios.delete(api)
        .then(() => {
          this.$refs.DeleteCarts.modalHide();
          emitter.emit('updateCartsNum', 0);
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
            title: '刪除品項成功',
          });
          this.getData();
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
    openDeleteCarts(item) {
      this.$refs.DeleteCarts.modalShow();
      emitter.emit('delete-data', item);
      this.deleteItem = item;
    },
    deleteCarts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$refs.DeleteCartsAll.modalHide();
      this.axios.delete(api)
        .then((response) => {
          this.getData();
          emitter.emit('updateCartsNum', 0);
          if (response.data.success) {
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
              title: '刪除成功',
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
              title: '更新異常',
            });
          }
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
    updateQty(id, key) {
      const num = Number(this.$refs.updateValue[key].value);
      if (num <= 0 || num >= 50) {
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
        this.getData();
        return;
      }
      const updateData = {
        product_id: id,
        qty: num,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.isLoading = true;
      this.axios.put(api, { data: updateData })
        .then((response) => {
          this.getData();
          if (response.data.success) {
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
              title: '更新品項成功',
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
              title: '更新異常',
            });
          }
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
      emitter.emit('updateCartsNum');
    },
    contactMethod() {
      if (this.selection1 === false) {
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
          title: '確認訂單完成後<br>記得勾選我已確認商品資訊 <i class="bi bi-emoji-smile-fill"></i>',
        });
        return;
      }
      this.$router.push('/user/ordercontact');
    },
    open(i, key) {
      if (this.openDoor === true) {
        this.$refs.right[key].style.transform = 'translateX(0px)';
        this.$refs.left[key].style.transform = 'translateX(-500px)';
        this.openDoor = false;
      } else if (this.openDoor !== true) {
        this.$refs.right[key].style.transform = 'translateX(100px)';
        this.$refs.left[key].style.transform = 'translateX(0px)';
        this.openDoor = true;
      }
    },
    add(id, key) {
      this.num = this.cartsData.carts[key].qty;
      this.num += 1;
      if (this.num >= 50) {
        this.$refs.updateValue[key].value = 1;
        this.getData();
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
          icon: '',
          title: '單筆數量不超過50',
        });
        return;
      }
      const updateData = {
        product_id: id,
        qty: this.num,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.isLoading = true;
      this.axios.put(api, { data: updateData })
        .then(() => {
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
            title: '更新品項成功',
          });
          this.getData();
          emitter.emit('updateCartsNum');
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
            title: '更新異常',
          });
        });
    },
    min(id, key) {
      this.num = this.cartsData.carts[key].qty;
      this.num -= 1;
      if (this.num <= 0) {
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
          icon: '',
          title: '單筆數量不得低於1',
        });
        return;
      }
      const updateData = {
        product_id: id,
        qty: this.num,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.isLoading = true;
      this.axios.put(api, { data: updateData })
        .then(() => {
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
            title: '更新品項成功',
          });
          this.getData();
          emitter.emit('updateCartsNum');
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
            title: '更新異常',
          });
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
