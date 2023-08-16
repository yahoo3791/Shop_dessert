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
          <h5 class="modal-title" id="exampleModalLabel">刪除警告</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <p>
            確定要刪除<span class="text-red">{{ deleteItem.code }}</span
            >優惠碼
          </p>
          <p>刪除後無法復原</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-primary" @click="deleteCoupon">確定刪除</button>
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

    const deleteCoupon = () => {
      this.$emit('deleteCoupon', this.deleteItem.id);
    };

    return {
      modal,
      deleteCoupon,
    };
  },
  mixins: [modalMixin],
  props: ['deleteItem'],
};
</script>
