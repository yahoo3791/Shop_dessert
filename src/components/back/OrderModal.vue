<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="modal">
    <div class="modal-dialog">
      <div class="modal-content text-black">
        <div class="modal-header">
          <h5
            class="modal-title"
            id="staticBackdropLabel">檢視訂單
          </h5>
          <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close" />
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div>
                  <p>訂單時間:{{ changeData.create_at }}</p>
                  <p>訂單編號:{{ changeData.id }}</p>
                </div>
              </div>
              <div class="col-12">
                <h5>購買商品資訊</h5>
                <div
                  v-for="item in changeData.products"
                  :key="item.id">
                  <p>書名:{{ item.product.title }}</p>
                  <p>數量:{{ item.qty }}/{{ item.product.unit }}</p>
                </div>
                應付金額:{{ changeData.total }}$
              </div>
              <div class="col-12">
                <h5>客戶資料</h5>
                <div v-for="item in changeData.user" :key="item.id">
                  {{ item }}
                </div>
                <p>
                  留言: {{ changeData.message }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal">關閉
          </button>
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
    return {
      modal,
    };
  },
  props: ['changeData'],
  mixins: [modalMixin],
};
</script>
