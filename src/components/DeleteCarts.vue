<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" style="margin: 30vh auto">
      <div class="modal-content text-black">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">刪除品項</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body title-01 text-center py-5">
          <p>{{ deleteData.title }}</p>
          <p>{{ deleteNum.qty }}/{{ deleteData.unit }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary fw-bold" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger fw-bold" @click="$emit('checkDelete')">
            確定刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import emitter from '@/methods/emitter';
import modalMixin from '../mixins/modalMixin';

export default {
  setup() {
    const modal = ref({});
    const deleteData = ref({});
    const deleteNum = ref({});
    onMounted(() => {
      emitter.on('delete-data', (item) => {
        deleteData.value = item.product;
        deleteNum.value = item;
      });
    });

    return {
      modal,
      deleteData,
      deleteNum,
    };
  },
  mixins: [modalMixin],
};
</script>
