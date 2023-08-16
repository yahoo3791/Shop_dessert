<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-danger"
            id="exampleModalLabel">刪除警告
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close" />
        </div>
        <div
          class="modal-body text-black">
          <p>購買時間:{{ deleteData.create_at }}</p>
          <p>訂單編號:{{ deleteData.id }}</p>
          <h5>購買款項</h5>
          <div
            v-for="item in deleteData.products"
            :key="item.id">
            <p>{{ item.product.title }}</p>
            <p>{{ item.qty }} / {{ item.product.unit }}</p>
          </div>
          {{ deleteData.total }}$
          <h5>顧客資訊</h5>
          <div
            v-for="item in deleteData.user"
            :key="item.id">
            {{ item }}
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal">關閉
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="checkDelete">確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  setup() {
    const checkDelete = () => {
      this.$emit('deleteItem');
    };
    return {
      checkDelete,
    };
  },
  props: ['deleteData'],
  mixins: [modalMixin],
};
</script>
