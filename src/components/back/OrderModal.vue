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
                  <p>訂單時間:{{this.changeData.create_at}}<br>
                    訂單編號:{{this.changeData.id}}
                  </p>
                </div>
              </div>
              <div class="col-12">
                <h5>購買商品資訊</h5>
                <div
                  v-for="item,k in this.changeData.products"
                  :key="k">
                  <p>書名:{{item.product.title}} <br>
                    數量:{{item.qty}}/{{item.product.unit}}
                  </p>
                </div>
                應付金額:{{this.changeData.total}}$
              </div>
              <div class="col-12">
                <h5>客戶資料</h5>
                <div v-for="item,k in this.changeData.user" :key="k">
                  {{item}}
                </div>
                <p>
                  留言: {{this.changeData.message}}
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
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      modal: {},
    };
  },
  props: ['changeData'],
  mixins: [modalMixin],
};
</script>
