<template>
  <div class="container">
    <Loading v-model:active="isLoading" />
    <div
      class="modal fade" tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="modal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h5
              class="modal-title"
              id="exampleModalLabel">
              <span
                v-if="isNew === true">
                新增產品
              </span>
              <span
                v-else>
                編輯產品
              </span>
            </h5>
            <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close" />
          </div>
          <div class="modal-body text-black">
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label
                    for="image"
                    class="form-label w-100 font-medium tracking-wider">
                    輸入圖片網址
                    <input
                      v-model="data.imageUrl"
                      type="text"
                      class="form-control"
                      id="image"
                      name="image"
                      placeholder="請輸入圖片連結">
                  </label>
                </div>
                <div class="mb-3">
                  <label
                    for="customFile"
                    class="form-label w-100 font-medium tracking-wider">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" />
                    <input
                      ref="fileInput"
                      @change="uploadFile"
                      type="file"
                      id="customFile"
                      class="form-control">
                  </label>
                </div>
              </div>
              <div class="col-12">
                <div class="mb-3">
                  <label
                    for="title"
                    class="form-label w-100 font-medium tracking-wider">標題
                    <input
                      v-model="data.title"
                      type="text"
                      class="form-control"
                      id="title"
                      placeholder="請輸入標題">
                  </label>
                </div>
                <div class="row gx-2">
                  <div class="mb-3 col-md-6">
                    <label
                      for="category"
                      class="form-label w-100 font-medium tracking-wider">分類
                      <input
                        v-model="data.category"
                        type="text"
                        class="form-control"
                        id="category"
                        placeholder="請輸入分類">
                    </label>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label
                      for="num"
                      class="form-label w-100 font-medium tracking-wider">數量
                      <input
                        v-model="data.num"
                        type="number"
                        class="form-control"
                        id="num"
                        placeholder="請輸入數量">
                    </label>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label
                      for="price"
                      class="form-label w-100 font-medium tracking-wider">單位
                      <input
                        v-model="data.unit"
                        type="text"
                        class="form-control"
                        id="unit"
                        placeholder="請輸入單位">
                    </label>
                  </div>
                </div>
                <div class="row gx-2">
                  <div class="mb-3 col-md-6">
                    <label
                      for="origin_price"
                      class="form-label w-100 font-medium tracking-wider">原價
                      <input
                        v-model="data.origin_price"
                        type="number"
                        class="form-control"
                        id="origin_price"
                        placeholder="請輸入原價">
                    </label>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label
                      for="price"
                      class="form-label w-100 font-medium tracking-wider">售價
                      <input
                        v-model="data.price"
                        type="number"
                        class="form-control"
                        id="price"
                        placeholder="請輸入售價">
                    </label>
                  </div>
                </div>
                <hr>
                <div class="mb-3">
                  <label
                    for="description"
                    class="form-label w-100 font-medium tracking-wider">產品描述
                    <textarea
                      v-model="data.description"
                      type="text"
                      class="form-control"
                      id="description"
                      placeholder="請輸入產品描述">
                    </textarea>
                  </label>
                </div>
                <div class="mb-3">
                  <label
                    for="content"
                    class="form-label w-100 font-medium tracking-wider">說明內容
                    <textarea
                      v-model="data.content"
                      type="text"
                      class="form-control"
                      id="content"
                      placeholder="請輸入產品說明內容">
                    </textarea>
                  </label>
                </div>
                <div class="mb-3">
                  <div class="text-end">
                    <label
                      class="form-check-label font-medium tracking-wider"
                      for="is_enabled">
                      <input
                        v-model="data.is_enabled"
                        class="form-check-input"
                        type="checkbox"
                        :true-value="1"
                        :false-value="0"
                        id="is_enabled"
                        name="is_enabled">
                        是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal">
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="add">
              確認
          </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'sweetalert2/src/sweetalert2.scss';
import Modalmixin from '@/mixins/modalMixin';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const Swal = require('sweetalert2');

export default {
  props: {
    product: {
      type: Object,
      default() { return {}; },
    },
    isNew: null,
  },
  watch: {
    product() {
      this.data = this.product;
    },
  },
  components: {
    Loading,
  },
  data() {
    return {
      modal: {},
      data: {},
      isLoading: false,
    };
  },
  methods: {
    add() {
      this.$emit('add', this.data);
    },
    uploadFile() {
      const uploadFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.isLoading = true;
      this.axios.post(url, formData)
        .then((response) => {
          this.isLoading = false;
          this.data.imageUrl = response.data.imageUrl;
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
  mixins: [Modalmixin],
};
</script>
