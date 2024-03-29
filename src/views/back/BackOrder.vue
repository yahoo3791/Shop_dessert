<template>
  <Loading v-model:active="isLoading" />
  <div
    class="container-fluid text-center text-black"
    style="padding: 40vh 0; height: 100vh"
    v-if="data.length === 0"
  >
    <h2>尚未有訂單。</h2>
  </div>
  <div class="container-fluid pt-utility" style="height: 100vh" v-else>
    <div class="text-end">
      <button type="button" class="btn btn-danger" @click="deleteAllModal">刪除全部訂單</button>
    </div>
    <table class="table mt-4" style="table-layout: fixed">
      <thead>
        <tr class="font-medium tracking-wider">
          <th class="d-none d-md-table-cell">購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th class="d-none d-md-table-cell">應付金額</th>
          <th class="d-none d-md-table-cell">是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in data" :key="item.id">
          <tr>
            <td class="align-middle d-none d-md-table-cell">{{ $filters.date(item.create_at) }}</td>
            <td class="align-middle overflow-hidden" width="30" style="text-overflow: ellipsis">
              {{ item.user.email }}
            </td>
            <td class="align-middle overflow-auto">
              <ul class="list-unstyled">
                <li v-for="product in item.products" :key="product.id">
                  {{ product.product.title }}<br />
                  {{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="d-none d-md-table-cell align-middle">
              {{ item.total }}
            </td>
            <td class="d-none d-md-table-cell align-middle">
              <span v-if="item.is_paid"> 已付款 </span>
              <span v-else> 未付款 </span>
            </td>
            <td class="align-middle">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="ChangeModal(item)"
                >
                  檢視
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="DeleteModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <Pagination
      class="position-fixed bottom-0 start-50 translate-middle-x"
      :pages="pagination"
      @updatePage="getData"
    />
  </div>
  <orderModal ref="orderModal" :change-data="changeData" />
  <deleteModal ref="deleteModal" :delete-data="deleteData" @delete-item="deleteItem" />
  <deleteOrderAllModal ref="deleteOrderAllModal" @delete-all="deleteAll" />
</template>

<script>
import { ref, onMounted } from 'vue';
import orderModal from '@/components/back/OrderModal.vue';
import Pagination from '@/components/back/BackPagination.vue';
import deleteModal from '@/components/back/DeleteOrderModal.vue';
import deleteOrderAllModal from '@/components/back/DeleteOrderAllModal.vue';
import 'sweetalert2/src/sweetalert2.scss';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const Swal = require('sweetalert2');

export default {
  setup() {
    const data = ref({});
    const deleteData = ref({});
    const changeData = ref({});
    const pagination = ref({});
    const isLoading = ref(false);

    const getData = (page = 1) => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.axios
        .get(api)
        .then((response) => {
          this.data = response.data.orders;
          this.pagination = response.data.pagination;
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
    const deleteAllModal = () => {
      this.$refs.deleteOrderAllModal.modalShow();
    };
    const ChangeModal = (item) => {
      this.changeData = item;
      this.$refs.orderModal.modalShow();
    };
    const DeleteModal = (item) => {
      this.deleteData = item;
      this.$refs.deleteModal.modalShow();
    };
    const deleteItem = () => {
      const { id } = this.deleteData;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${id}`;
      this.axios
        .delete(api)
        .then(() => {
          this.$refs.deleteModal.modalHide();
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
    };
    const deleteAll = () => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/all`;
      this.axios
        .delete(api)
        .then(() => {
          this.$refs.deleteOrderAllModal.modalHide();
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
    };

    onMounted(() => {
      getData();
    });

    return {
      data,
      deleteData,
      changeData,
      pagination,
      isLoading,
      getData,
      deleteAllModal,
      ChangeModal,
      DeleteModal,
      deleteItem,
      deleteAll,
    };
  },
  components: {
    Loading,
    orderModal,
    Pagination,
    deleteModal,
    deleteOrderAllModal,
  },
};
</script>
