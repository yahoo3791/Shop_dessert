<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content text-black">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">優惠卷</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <div class="coupon_title mb-3">
            <label for="title"
              >優惠卷名稱
              <input type="text" name="title" id="title" v-model="tempCoupon.title" />
            </label>
          </div>
          <div class="coupon_isEnabled mb-3">
            <label for="is_enabled"
              >是否啟用
              <input
                type="checkbox"
                name="is_enabled"
                id="is_enabled"
                v-model="tempCoupon.is_enabled"
              />
            </label>
          </div>
          <div class="coupon_percent mb-3">
            <label for="percent"
              >折扣百分比
              <input type="number" name="percent" id="percent" v-model="tempCoupon.percent" />
            </label>
          </div>
          <div class="coupon_dueDate mb-3">
            <label for="due_date"
              >到期日
              <input type="date" name="due_date" id="due_date" v-model="tempCoupon.due_date" />
            </label>
          </div>
          <div class="coupon_code mb-3">
            <label for="code"
              >折扣代碼
              <input type="text" name="code" id="code" v-model="tempCoupon.code" />
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-primary" @click="saveCoupon">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import modalMixin from '@/mixins/modalMixin';

export default {
  setup() {
    const modal = ref({});
    const tempCoupon = ref({});
    const saveCoupon = () => {
      this.$emit('saveCoupon', this.tempCoupon);
      this.modal.hide();
    };
    // watch(
    //   () => coupon.value,
    //   () => {
    //     tempCoupon.value = coupon.value;
    //   },
    // );
    return {
      modal,
      tempCoupon,
      saveCoupon,
    };
  },
  props: ['coupon'],
  mixins: [modalMixin],
  // watch: {
  //   coupon() {
  //     this.tempCoupon = this.coupon;
  //   },
  // },
};
</script>
