<template>
  <loading v-model:active="isLoading" />
  <Navbar />
  <div class="bg-dark w-100 h-100 pb-5 overflow-hidden position-relative">
    <div class="container pt-utility text-white position-relative">
      <div class="row">
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
        <div
          class="col-12 text-center"
          :class="{ 'd-none': orderOpen }"
          style="padding: 20vh 0;">
          <h1 class="title-01">購物車無加入商品</h1>
          <router-link
            to="/user/products"
            class="text-decoration-none">
            <w-button class="mt-5 w-btn">前往商城</w-button>
          </router-link>
        </div>
      </div>
      <div :class="{ 'd-none': orderHide }">
        <div class="row mx-0">
          <div class="col-12 p-0 my-4">
            <div class="d-flex justify-content-between align-items-center pb-3"
              style="border-bottom: 1px solid #404040;">
              <h1 class="mb-0 text-center tracking-widest font-bold text-3xl">購物車</h1>
              <div>
                <w-button
                  class="w-btn"
                  @click="this.$refs.DeleteCartsAll.modalShow()">
                  刪除全部
                </w-button>
                <w-button
                  class="w-btn ms-2"
                  @click="this.$router.push('/user/products')">
                  繼續購物
                </w-button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="col-12 mt-4 mb-2"
            v-for="item,key in cartsData"
            :key="item.id">
            <div
              class="d-flex d-md-none justify-content-between
              pb-2 mb-2 tracking-wide">
              <w-button
                class="w-btn ms-2"
                @click="open(item,key)">
                編輯
              </w-button>
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
                      :disabled="this.isLoading"
                      ref="updateValue"
                      @change="updateQty(item.id,key)"
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
                    alt="">
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
            pb-3">總計 {{ $filters.currency( this.orderTotal.total ) }} $
          </p>
        </div>
        <div class="row">
          <div class="col-12 mb-5">
            <w-flex class="align-center tracking-wide">
              <w-checkbox
                class="ms-auto"
                color="grey"
                v-model="selection1">
                <p class="text-white text-xl">我已確認商品資訊</p>
              </w-checkbox>
            </w-flex>
          </div>
          <div class="col-12 text-end">
            <w-button class="w-btn"
              @click="contactMethod">下一步
            </w-button>
          </div>
        </div>
        </div>
    </div>
    <DeleteCartsAll ref="DeleteCartsAll" @checkDeleteAll="deleteCarts()" />
    <DeleteCarts ref="DeleteCarts" @checkDelete="deleteProduct()" />
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
import DeleteCartsAll from '@/components/DeleteCartsAll.vue';
import DeleteCarts from '@/components/DeleteCarts.vue';

export default {
  data() {
    return {
      cartsData: {},
      isLoading: false,
      orderHide: true,
      orderOpen: false,
      orderTotal: {},
      openDoor: false,
      selection1: false,
      deleteItem: {},
      num: 1,
      productLoading: true,
    };
  },
  components: {
    Navbar, Footer, Loading, DeleteCartsAll, DeleteCarts,
  },
  methods: {
    getData() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.orderOpen = true;
      this.productLoading = false;
      this.axios.get(api).then((res) => {
        this.orderTotal = res.data.data;
        this.cartsData = res.data.data.carts;
        this.productLoading = true;
        if (this.cartsData.length === 0) {
          this.orderHide = true;
          this.orderOpen = false;
        } else {
          this.orderHide = false;
        }
      });
    },
    deleteProduct() {
      const { id } = this.deleteItem;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.axios.delete(api).then((res) => {
        this.$refs.DeleteCarts.modalHide();
        if (res.data.success) {
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
      this.axios.delete(api).then((res) => {
        this.getData();
        emitter.emit('updateCartsNum', 0);
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
      });
    },
    updateQty(id, k) {
      const num = Number(this.$refs.updateValue[k].value);
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
      this.axios.put(api, { data: updateData }).then((res) => {
        this.isLoading = false;
        this.getData();
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
            title: '更新品項成功',
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
    open(i, k) {
      if (this.openDoor === true) {
        this.$refs.right[k].style.transform = 'translateX(0px)';
        this.$refs.left[k].style.transform = 'translateX(-500px)';
        this.openDoor = false;
      } else if (this.openDoor === false) {
        this.$refs.right[k].style.transform = 'translateX(100px)';
        this.$refs.left[k].style.transform = 'translateX(0px)';
        this.openDoor = true;
      }
    },
    add(id, k) {
      this.num = this.cartsData[k].qty;
      this.num += 1;
      if (this.num >= 50) {
        this.$refs.updateValue[k].value = 1;
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
      this.axios.put(api, { data: updateData }).then((res) => {
        this.isLoading = false;
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
            title: '更新品項成功',
          });
          this.getData();
          emitter.emit('updateCartsNum');
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
      });
    },
    min(id, k) {
      this.num = this.cartsData[k].qty;
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
      this.axios.put(api, { data: updateData }).then((res) => {
        this.isLoading = false;
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
            title: '更新品項成功',
          });
          this.getData();
          emitter.emit('updateCartsNum');
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
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
