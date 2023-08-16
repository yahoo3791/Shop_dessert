<template>
  <Loading v-model:active="isLoading" />
  <Navbar />
  <div class="bg-dark w-100 h-100 overflow-hidden position-relative auto-height">
    <div class="container pt-utility text-white position-relative auto-height-content">
      <div class="row">
        <div class="col-12 text-center" :class="{ 'd-none': cartsSwitch }" style="padding: 20vh 0">
          <h1 class="title-01">購物車無加入商品</h1>
          <RouterLink to="/user/products" class="text-decoration-none">
            <button type="button" class="btn btn-light fw-bold mt-5">前往商城</button>
          </RouterLink>
        </div>
      </div>
      <div :class="{ 'd-none': !cartsSwitch }">
        <div class="row mx-0">
          <div class="col-12 p-0 my-4">
            <div
              class="d-flex justify-content-between align-items-center pb-3 border-bottom-404040"
            >
              <h1 class="mb-0 text-center tracking-widest font-bold text-3xl">購物車</h1>
              <div>
                <button
                  type="button"
                  class="btn btn-light fw-bold"
                  @click="this.$refs.deleteAll.modalShow()"
                >
                  刪除全部
                </button>
                <button
                  type="button"
                  class="btn btn-light fw-bold ms-2"
                  @click="$router.push('/user/products')"
                >
                  繼續購物
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 mt-4 mb-2" v-for="(item, key) in cartsData.carts" :key="item.id">
            <div class="d-flex d-md-none justify-content-between pb-2 mb-2 tracking-wide">
              <button type="button" class="btn btn-light fw-bold ms-2" @click="open(item, key)">
                編輯
              </button>
              <p>{{ item.product.category }}類</p>
            </div>
            <div
              class="d-md-none cartsInput-sm-container position-absolute
              mx-auto mt-1 mb-2 text-white"
              ref="left"
              style="transform: translateX(-500px)"
            >
              <div class="d-flex">
                <div class="mx-auto cartsInput-sm-Item">
                  <div
                    class="border text-center cartsInput-sm-add cursor-pointer"
                    @click="add(item.id, key)"
                    @keydown="add(item.id, key)"
                  >
                    +
                  </div>
                  <label for="smNum">
                    <input
                      name="smNum"
                      id="smNum"
                      :disabled="isLoading"
                      ref="updateValue"
                      @change="updateQty(item.id, key)"
                      class="d-block text-center text-white border cartsInput-sm-input"
                      type="text"
                      min="1"
                      :value="item.qty"
                    />
                  </label>
                  <div
                    class="border text-center cartsInput-sm-min cursor-pointer"
                    @click="min(item.id, key)"
                    @keydown="min(item.id, key)"
                  >
                    -
                  </div>
                </div>
              </div>
            </div>
            <div
              class="d-flex align-items-center cartsItem pb-5"
              ref="right"
              style="transform: translateX(0px)"
            >
              <div class="d-flex">
                <div class="carts-pic">
                  <img :src="item.product.imageUrl" class="carts-img" alt="新增至購物車內的圖片" />
                </div>
                <div class="ms-3 d-flex flex-column justify-content-between text-2xl">
                  <p class="tracking-wide font-semibold">
                    {{ item.product.title }}
                    <span class="d-none d-md-inline-block"> ({{ item.product.unit }}) </span>
                  </p>
                  <p class="leading-7 tracking-wider text-lg">單價{{ item.product.price }}$</p>
                  <p class="leading-7 d-block tracking-wider text-xl">
                    小計{{ $filters.currency(item.total) }}$
                  </p>
                </div>
              </div>
              <div class="ms-auto cartsInput-md-container d-none d-md-inline-block">
                <div class="cartsInput-md-Item d-flex align-items-center">
                  <div
                    @click="min(item.id, key)"
                    @keydown="min(item.id, key)"
                    class="cartsInput-md-min cursor-pointer text-center border"
                  >
                    -
                  </div>
                  <div class="cartsInput-md-input text-xl">
                    <label for="num" class="d-block h-100">
                      <input
                        id="num"
                        name="num"
                        v-model="item.qty"
                        type="text"
                        min="1"
                        style="max-width: 120px"
                        class="d-block border rounded-0 bg-dark text-center text-white border w-100"
                        @change="updateQty(item.id, key)"
                        ref="updateValue"
                      />
                    </label>
                  </div>
                  <div
                    @click="add(item.id, key)"
                    @keydown="add(item.id, key)"
                    class="cartsInput-md-add cursor-pointer text-center border"
                  >
                    +
                  </div>
                </div>
              </div>
              <div
                class="ms-auto ms-md-3 delete text-center cartsInput-trash cursor-pointer"
                title="刪除品項"
                @click="openDeleteCarts(item)"
                @keydown="openDeleteCarts(item)"
              >
                <i class="bi bi-trash3-fill fs-3" />
              </div>
            </div>
          </div>
          <p class="text-white text-end tracking-widest font-semibold text-xl pb-3">
            總計 {{ $filters.currency(cartsData.total) }} $
          </p>
        </div>
        <div class="row pb-5">
          <div class="col-12 mb-5">
            <div class="form-check text-end">
              <label class="form-check-label text-white text-xl ms-auto" for="check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="check"
                  v-model="selection"
                />
                我已確認商品資訊
              </label>
            </div>
          </div>
          <div class="col-12 text-end">
            <button
              type="button"
              class="btn btn-light fw-bold"
              :class="{ 'not-allowed': !selection }"
              @click="contactMethod"
            >
              下一步
            </button>
          </div>
        </div>
      </div>
    </div>
    <DeleteCartsAll ref="deleteAll" @checkDeleteAll="deleteCarts" />
    <DeleteCarts ref="deleteOne" @checkDelete="deleteProduct" />
  </div>
  <Footer />
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import Navbar from '@/components/FrontNavbar.vue';
import Footer from '@/components/FrontFooter.vue';
import Loading from '@/components/IsLoading.vue';
import 'sweetalert2/src/sweetalert2.scss';
import emitter from '@/methods/emitter';
import DeleteCartsAll from '@/components/DeleteCartsAll.vue';
import DeleteCarts from '@/components/DeleteCarts.vue';

const Swal = require('sweetalert2');

export default {
  setup() {
    const cartsData = ref({});
    const deleteItem = ref({});
    const isLoading = ref(false);
    const cartsSwitch = ref(false);
    const openDoor = ref(false);
    const selection = ref(false);
    const num = ref(1);
    const deleteAll = ref(null);
    const deleteOne = ref(null);
    const right = ref(null);
    const left = ref(null);
    const getData = () => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      cartsSwitch.value = true;
      isLoading.value = true;
      axios
        .get(api)
        .then((response) => {
          cartsData.value = response.data.data;
          isLoading.value = false;
          if (cartsData.value.carts.length === 0) {
            cartsSwitch.value = false;
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
    };
    const deleteProduct = () => {
      const { id } = deleteItem.value;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      axios
        .delete(api)
        .then(() => {
          deleteOne.value.modalHide();
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
          getData();
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
    const openDeleteCarts = (item) => {
      deleteOne.value.modalShow();
      emitter.emit('delete-data', item);
      deleteItem.value = item;
    };
    const deleteCarts = () => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      deleteAll.value.modalHide();
      axios
        .delete(api)
        .then((response) => {
          getData();
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
    };
    const updateQty = (id, key) => {
      const number = Number(this.$refs.updateValue[key].value);
      if (number <= 0 || number >= 50) {
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
        getData();
        return;
      }
      const updateData = {
        product_id: id,
        qty: number,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      isLoading.value = true;
      axios
        .put(api, { data: updateData })
        .then((response) => {
          getData();
          if (response.data.success) {
            isLoading.value = false;
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
            isLoading.value = false;
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
    };
    const contactMethod = () => {
      if (selection.value === false) {
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
          title:
            '確認訂單完成後<br>記得勾選我已確認商品資訊 <i class="bi bi-emoji-smile-fill"></i>',
        });
        return;
      }
      this.$router.push('/user/ordercontact');
    };
    const open = (i, key) => {
      console.log(key);
      console.log(right[key].value);
      if (openDoor.value === true) {
        right[key].value.style.transform = 'translateX(0px)';
        left[key].value.style.transform = 'translateX(-500px)';
        openDoor.value = false;
      } else if (openDoor.value !== true) {
        right[key].value.style.transform = 'translateX(100px)';
        left[key].value.style.transform = 'translateX(0px)';
        openDoor.value = true;
      }
    };
    const add = (id, key) => {
      num.value = cartsData.value.carts[key].qty;
      num.value += 1;
      if (num.value >= 50) {
        this.$refs.updateValue[key].value = 1;
        getData();
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
        qty: num.value,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      isLoading.value = true;
      axios
        .put(api, { data: updateData })
        .then(() => {
          isLoading.value = false;
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
          getData();
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
    };
    const min = (id, key) => {
      num.value = cartsData.value.carts[key].qty;
      num.value -= 1;
      if (num.value <= 0) {
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
        qty: num.value,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      isLoading.value = true;
      axios
        .put(api, { data: updateData })
        .then(() => {
          isLoading.value = false;
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
          getData();
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
    };

    onMounted(() => {
      getData();
    });

    return {
      cartsData,
      deleteItem,
      isLoading,
      cartsSwitch,
      openDoor,
      selection,
      num,
      getData,
      deleteProduct,
      openDeleteCarts,
      deleteCarts,
      updateQty,
      contactMethod,
      open,
      add,
      min,
      deleteAll,
      deleteOne,
    };
  },
  components: {
    Navbar,
    Footer,
    Loading,
    DeleteCartsAll,
    DeleteCarts,
  },
};
</script>
