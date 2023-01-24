<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal">
    <div
      class="modal-dialog"
      style="margin:30vh auto;">
      <div class="modal-content text-black">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close">
          </button>
        </div>
        <div
          class="modal-body title-01 text-center py-5">
          清除購物車
        </div>
        <div class="modal-footer">
          <w-button
            type="button"
            class="modal-btn"
            bg-color="black"
            color="white"
            data-bs-dismiss="modal">取消
          </w-button>
          <w-button
            type="button"
            class="modal-btn"
            bg-color="red"
            color="white"
            @click="$emit('checkDeleteAll')">確定刪除
          </w-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      modal: {},
    };
  },
  mixins: [modalMixin],
};
</script>
