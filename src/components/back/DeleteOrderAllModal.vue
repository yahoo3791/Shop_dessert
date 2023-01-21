<template>
  <div class="modal fade" id="exampleModal" tabindex="-1"
  aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content text-black">
        <div class="modal-header">
          <h5 class="modal-title text-danger" id="exampleModalLabel">刪除警告</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
          aria-label="Close" />
        </div>
        <div class="modal-body">
          確定要刪除全部訂單嗎 <span class="text-red">(刪除後無法恢復)</span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary"
          data-bs-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-danger"
          @click="deleteAll">刪除</button>
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
  methods: {
    deleteAll() {
      this.$emit('deleteAll');
    },
  },
  mixins: [modalMixin],
};
</script>
