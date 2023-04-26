<template>
<Loading :active="isLoading" />
  <div>
    <div
      class="container pt-utility"
      style="height:100vh">
      <div class="text-end">
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="openCoupon(true)">
          新增優惠卷
        </button>
      </div>
      <div class="row">
        <div
          class="col-12"
          v-if="getCoupons.length === 0">
          <h2 class="text-black text-center"
            style="padding:30vh 0">尚未新增優惠卷。
          </h2>
        </div>
        <div
          class="col-12"
          v-else>
          <table class="table mt-4">
            <thead>
              <tr
                class="font-medium tracking-wider">
                <th>名稱</th>
                <th class="d-none d-md-table-cell">折扣百分比</th>
                <th>到期日</th>
                <th class="d-none d-md-table-cell">是否啟用</th>
                <th>編輯</th>
              </tr>
            </thead>
            <tbody
              v-for="item in getCoupons"
              :key="item.id">
              <tr>
                <td>{{ item.title }}</td>
                <td class="d-none d-md-table-cell">{{ item.percent }}</td>
                <td>{{ $filters.date(item.due_date) }}</td>
                <td class="d-none d-md-table-cell">
                  <span
                    class="text-success"
                    v-if="item.is_enabled===1">
                    啟用
                  </span>
                  <span
                    class="text-muted"
                    v-else>
                    未起用
                  </span>
                </td>
                <td class="p-0">
                  <div
                    class="btn-group">
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm"
                      @click="openCoupon(false, item)">
                      編輯
                    </button>
                    <button
                      type="button"
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
    </div>
  </div>
  <couponModal
    ref="couponModal"
    :coupon="tempCoupon"
    @save-coupon="couponData" />
  <deleteModal
    ref="deleteModal"
    :delete-item="deleteCoupon"
    @delete-coupon="deleteItem" />
</template>

<script>
import couponModal from '@/components/CouponModal.vue';
import deleteModal from '@/components/back/DeleteCoupon.vue';
import 'sweetalert2/src/sweetalert2.scss';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const Swal = require('sweetalert2');

export default {
  data() {
    return {
      tempCoupon: {},
      pagination: {},
      getCoupons: {},
      deleteCoupon: {},
      isLoading: false,
      isNew: false,
    };
  },
  inject: ['emitter'],
  methods: {
    openCoupon(isNew, item) {
      this.$refs.couponModal.modalShow();
      if (isNew === true) {
        this.tempCoupon = {};
      } else {
        this.tempCoupon = { ...item };
      }
      this.isNew = isNew;
    },
    couponData(data) {
      this.tempCoupon = data;
      this.tempCoupon.due_date = new Date(this.tempCoupon.due_date).getTime() / 1000;
      if (this.tempCoupon.is_enabled === true) {
        this.tempCoupon.is_enabled = 1;
      } else {
        this.tempCoupon.is_enabled = 0;
      }
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMethod = 'post';
      if (this.isNew === false) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        httpMethod = 'put';
      }
      this.isLoading = true;
      this.axios[httpMethod](api, { data: this.tempCoupon })
        .then(() => {
          this.isLoading = false;
          this.updateData();
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
    },
    updateData(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.axios.get(api)
        .then((response) => {
          this.isLoading = false;
          this.getCoupons = response.data.coupons;
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
    },
    openDeleteModal(item) {
      this.$refs.deleteModal.modalShow();
      this.deleteCoupon = item;
    },
    deleteItem(id) {
      this.$refs.deleteModal.modalHide();
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`;
      this.isLoading = false;
      this.axios.delete(api)
        .then(() => {
          this.updateData();
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
    },
  },
  components: {
    couponModal,
    deleteModal,
    Loading,
  },
  mounted() {
    this.updateData();
  },
};
</script>
