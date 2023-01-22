<template>
  <div class="container pt-utility" style="height: 100vh">
    <loading v-model:active="isLoading" />
    <div class="row">
      <div class="col-12 px-0 px-md-2">
        <div class="text-end">
          <button
            @click="openModal(true)"
            type="button"
            class="btn btn-outline-primary"
            data-bs-target="#exampleModal">
            新增
          </button>
        </div>
      </div>
      <div
        class="col-12"
        v-if="this.Data.length === 0">
        <h2
        class="text-black text-center"
        style="padding:30vh 0">尚未新增商品。</h2>
      </div>
      <div class="col-12 px-0 px-md-2" v-else>
        <table
          class="table mt-4 text-nowrap"
          style="table-layout: fixed">
          <thead>
            <tr
              class="font-medium tracking-wider">
              <th>品名</th>
              <th class="d-none d-md-table-cell">分類</th>
              <th class="d-none d-md-table-cell">原價</th>
              <th>售價</th>
              <th>上線</th>
              <th width="95">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in this.Data"
              :key="item.id">
              <td
                style="overflow: hidden; text-overflow:ellipsis">
                {{ item.title }}
              </td>
              <td
                class="d-none d-md-table-cell">
                {{ item.category }}
              </td>
              <td
                class="d-none d-md-table-cell">
                {{ $filters.currency(item.origin_price)}}
              </td>
              <td>
                {{item.price}}
              </td>
              <td>
                <span
                  class="text-success"
                  v-if="item.is_enabled === 1">
                  啟用
                </span>
                <span
                  class="text-success"
                  v-else>
                  未啟用
                </span>
              </td>
              <td class="p-0">
                <div class="btn-group">
                  <button
                    class="btn btn-outline-primary btn-sm"
                    @click="openModal(false, item)">
                    編輯
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    @click="openDeleteModal(item)">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class="row"
      style="padding-top: calc(100vh-20vh)"
      v-if="this.Data.length !== 0">
      <div
        class="col-12 position-fixed bottom-0 start-50 translate-middle-x">
        <pagination
          :pages="Pagination"
          @update-page="getData" />
      </div>
    </div>
  </div>
  <productModal
    ref="productModal"
    :product="tempProduct"
    @add="UpdateData"
    :is-new="isNew" />
  <deleteModal
    ref="deleteModal"
    :delete="deleteItem"
    @delete-item="deleteProduct" />
</template>

<script>
import Loading from 'vue-loading-overlay';
import productModal from '../../components/back/ProductsModal.vue';
import deleteModal from '../../components/back/DeleteProductsModal.vue';
import 'vue-loading-overlay/dist/vue-loading.css';
import pagination from '../../components/back/Pagination.vue';

export default {
  data() {
    return {
      Data: {},
      tempProduct: {},
      isNew: false,
      deleteItem: {},
      isLoading: false,
      Pagination: {},
    };
  },
  components: {
    productModal,
    deleteModal,
    Loading,
    pagination,
  },
  inject: ['emitter'],
  methods: {
    getData(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.axios.get(api).then((res) => {
        console.log(res);
        this.isLoading = false;
        this.Data = res.data.products;
        this.Pagination = res.data.pagination;
      });
    },
    UpdateData(item) {
      this.tempProduct = item;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      // 傳送
      this.isLoading = true;
      this.axios[httpMethod](api, { data: this.tempProduct }).then((res) => {
        this.isLoading = false;
        this.$refs.productModal.modalHide();
        this.tempProduct = {};
        if (res.data.success) {
          this.getData();
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功',
          });
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: res.data.message.join('、'),
          });
        }
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.$refs.productModal.modalShow();
      this.isNew = isNew;
    },
    openDeleteModal(item) {
      this.$refs.deleteModal.modalShow();
      this.deleteItem = item;
    },
    deleteProduct() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.deleteItem.id}`;
      this.isLoading = false;
      this.axios.delete(api).then((res) => {
        this.$refs.deleteModal.modalHide();
        if (res.data.success) {
          this.getData();
          this.emitter.emit('push-message', {
            style: 'success',
            title: '刪除成功',
          });
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '刪除失敗',
            content: res.data.message.join('、'),
          });
        }
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>
