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
          <h5
            class="modal-title"
            id="exampleModalLabel">刪除品項
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close" />
        </div>
        <div class="modal-body title-01 text-center py-5">
          <p class="">{{deleteData.title}}</p>
          <p class="">{{deleteNum.qty}}/{{deleteData.unit}}</p>
        </div>
        <div class="modal-footer">
          <w-button
            class="modal-btn"
            bg-color="black"
            color="white"
            data-bs-dismiss="modal">取消
          </w-button>
          <w-button
            class="modal-btn"
            bg-color="red"
            color="white"
            @click="this.$emit('checkDelete')">確定刪除
          </w-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import modalMixin from '../mixins/modalMixin';

export default {
  data() {
    return {
      modal: {},
      deleteData: {},
      deleteNum: {},
    };
  },
  mixins: [modalMixin],
  mounted() {
    emitter.on('delete-data', (item) => {
      this.deleteData = item.product;
      this.deleteNum = item;
    });
  },
};
</script>
