<template>
  <div class="container pt-utility" style="height: 100vh">
    <Loading v-model:active="isLoading" />
    <div class="row">
      <div class="col-12 px-0 px-md-2">
        <div class="text-end">
          <button
            @click="openModal(true)"
            type="button"
            class="btn btn-outline-primary"
            data-bs-target="#exampleModal"
          >
            新增
          </button>
        </div>
      </div>
      <div class="col-12" v-if="Data.length === 0">
        <h2 class="text-black text-center" style="padding: 30vh 0">尚未新增商品。</h2>
      </div>
      <div class="col-12 px-0 px-md-2" v-else>
        <table class="table mt-4 text-nowrap" style="table-layout: fixed">
          <thead>
            <tr class="font-medium tracking-wider">
              <th>品名</th>
              <th class="d-none d-md-table-cell">分類</th>
              <th class="d-none d-md-table-cell">原價</th>
              <th>售價</th>
              <th>上線</th>
              <th width="95">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in Data" :key="item.id">
              <td class="overflow-hidden" style="text-overflow: ellipsis">
                {{ item.title }}
              </td>
              <td class="d-none d-md-table-cell">
                {{ item.category }}
              </td>
              <td class="d-none d-md-table-cell">
                {{ $filters.currency(item.origin_price) }}
              </td>
              <td>
                {{ item.price }}
              </td>
              <td>
                <span class="text-success" v-if="item.is_enabled === 1"> 啟用 </span>
                <span class="text-success" v-else> 未啟用 </span>
              </td>
              <td class="p-0">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="openModal(false, item)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="openDeleteModal(item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row" style="padding-top: calc(100vh-20vh)" v-if="Data.length !== 0">
      <div class="col-12 position-fixed bottom-0 start-50 translate-middle-x">
        <pagination :pages="Pagination" @update-page="getData" />
      </div>
    </div>
  </div>
  <productModal ref="ProductModal" :product="tempProduct" @add="UpdateData" :is-new="isNew" />
  <deleteModal ref="DeleteModal" :delete="deleteItem" @delete-item="deleteProduct" />
</template>

<script>
import {
  ref,
  onMounted,
} from 'vue';
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'sweetalert2/src/sweetalert2.scss';
import productModal from '@/components/back/ProductsModal.vue';
import deleteModal from '@/components/back/DeleteProductsModal.vue';
import 'vue-loading-overlay/dist/vue-loading.css';
import pagination from '@/components/back/BackPagination.vue';

const Swal = require('sweetalert2');

export default {
  setup() {
    const Data = ref({});
    const tempProduct = ref({});
    const deleteItem = ref({});
    const Pagination = ref({});
    const isLoading = ref(false);
    const isNew = ref(false);
    const ProductModal = ref(null);
    const DeleteModal = ref(null);

    const getData = (page = 1) => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      isLoading.value = true;
      axios
        .get(api)
        .then((response) => {
          isLoading.value = false;
          Data.value = response.data.products;
          Pagination.value = response.data.pagination;
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
    const UpdateData = (item) => {
      tempProduct.value = item;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      // 編輯
      if (!isNew.value) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      // 傳送
      isLoading.value = true;
      axios[httpMethod](api, { data: tempProduct.value })
        .then(() => {
          isLoading.value = false;
          ProductModal.value.modalHide();
          tempProduct.value = {};
          getData();
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功',
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
    const openModal = (isNew2, item) => {
      if (isNew2) {
        tempProduct.value = {};
      } else {
        tempProduct.value = { ...item };
      }
      ProductModal.value.modalShow();
      isNew.value = isNew2;
    };
    const openDeleteModal = (item) => {
      console.log(item);
      DeleteModal.value.modalShow();
      deleteItem.value = item;
    };
    const deleteProduct = () => {
      isLoading.value = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${deleteItem.value.id}`;
      axios
        .delete(api)
        .then(() => {
          DeleteModal.value.modalHide();
          isLoading.value = false;
          getData();
          this.emitter.emit('push-message', {
            style: 'success',
            title: '刪除成功',
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

    onMounted(() => {
      getData();
    });

    return {
      Data,
      tempProduct,
      deleteItem,
      Pagination,
      isLoading,
      isNew,
      UpdateData,
      openModal,
      openDeleteModal,
      deleteProduct,
    };
  },
  components: {
    productModal,
    deleteModal,
    Loading,
    pagination,
  },
  inject: ['emitter'],
};
</script>
