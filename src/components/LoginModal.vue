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
      style="padding: 20vh 0">
      <div
        class="modal-content text-white bg-dark border-0"
        style="box-shadow: 0px 0px 2px white;">
        <div class="modal-header border-0">
          <div
            data-bs-dismiss="modal"
            aria-label="Close"
            class="cursor-pointer ms-auto">
            <i class="bi bi-x-lg text-white" />
          </div>
        </div>
        <div class="modal-body border-0">
          <h1 class="text-center title-01 pb-3">登入</h1>
          <VForm
            @submit="submit">
            <div class="py-3 position-relative">
              <h3 class="d-block formData-label
                tracking-widest text-xl"
                for="account">*帳號</h3>
              <VField
                id="account"
                v-model="user.username"
                name="account"
                label="帳號"
                rules="required"
                type="account"
                class="carts-input w-100 p-2 border-0 border-bottom text-white"
                placeholder="請輸入電子信箱" />
              <br>
              <ErrorMessage
                style="color:#ff4343"
                class="ps-2 position-absolute text-sm"
                name="account" />
            </div>
            <div class="py-3 position-relative">
              <h3 class="d-block formData-label
                tracking-widest text-xl"
                for="password">*密碼
              </h3>
              <VField
                id="password"
                v-model="user.password"
                name="password"
                label="密碼"
                rules="required"
                type="password"
                class="carts-input w-100 p-2 border-0 border-bottom text-white"
                placeholder="請輸入密碼" />
              <br>
              <ErrorMessage
                style="color:#ff4343"
                class="ps-2 position-absolute text-sm"
                name="password" />
            </div>
            <div class="modal-footer border-0 p-0 mt-5">
              <div
                class="me-auto">
                <a href=""
                  class="text-decoration-none text-white">忘記密碼
                </a> |
                <a href=""
                  class="text-decoration-none text-white">加入會員
                </a> |
                <div
                  class="d-inline-block cursor-pointer"
                  @click="contact"
                  @keypress="contact">
                  其他疑問
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-light fw-bold">登入
              </button>
            </div>
          </VForm>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import modalMixin from '../mixins/modalMixin';

export default {
  data() {
    return {
      modal: {},
      user: {
        username: '',
        password: '',
      },
    };
  },
  mixins: [modalMixin],
  methods: {
    submit() {
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.axios.post(api, this.user)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
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
              icon: 'success',
              title: '登入成功',
            });
            const { token, expired } = res.data;
            document.cookie = `dessertToken=${token}; expires=${new Date(expired)}`;
            this.$router.push('/dashboard/backproducts');
            this.modal.hide();
          } else {
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
              title: '登入失敗',
            });
          }
        })
        .catch((error) => {
          console.log(error);
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
    contact() {
      this.modal.hide();
      this.$router.push('/user/contact');
    },
  },
};
</script>
