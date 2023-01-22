<template>
  <Navbar/>
    <div class="container pt-utility pb-5">
      <div class="row">
        <div class="col-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb py-2 px-1 p-md-2 breadcrumb-style tracking-wider">
              <li class="breadcrumb-item">
                <a class="text-black text-decoration-none" href="#">首頁</a>
              </li>
              <li class="breadcrumb-item breadcrumb-item-none">聯絡方式</li>
            </ol>
          </nav>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 offset-md-1">
            <div class="row">
              <div class="col-12">
                <a href="mailto:mgzofficer@gmail.com"
                  class="salesServer-item d-block text-decoration-none text-white py-3 my-3">
                  <div
                    class="d-flex align-items-center"
                    data-aos="fade-up"
                    data-aos-anchor-placement="bottom-bottom">
                    <i
                    class="bi bi-envelope text-5xl text-end"
                    style="width:30%" />
                    <div class="ps-4">
                      <p class="p-01">發送EMAIL給客服中心</p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="col-12">
                <a href="tel:(02)1010101"
                  class="salesServer-item d-block text-decoration-none text-white py-3 my-3">
                  <div class="d-flex align-items-center"
                    data-aos="fade-up"
                    data-aos-anchor-placement="bottom-bottom"
                    data-aos-delay="200">
                    <i class="bi bi-telephone text-5xl text-end"
                    style="width:30%" />
                    <div class="ps-4">
                      <h3 class="p-01">撥打電話(02)1010101</h3>
                    </div>
                  </div>
                </a>
              </div>
              <div class="col-12">
                <a href="https://goo.gl/maps/115xT6CDWXH6J2kD6"
                  target="_blank"
                  rel="noreferrer noopenner"
                  class="salesServer-item d-block text-decoration-none text-white py-3 my-3">
                  <div class="d-flex align-items-center"
                    data-aos="fade-up"
                    data-aos-anchor-placement="bottom-bottom"
                    data-aos-delay="400">
                    <i class="bi bi-house text-5xl text-end"
                    style="width:30%" />
                    <div class="ps-4">
                      <p class="p-01">客服中心：<br>台北市信義區市府路101號</p>
                    </div>
                  </div>
                </a>
              </div>
              <div
                class="col-12 text-center pb-5"
                data-aos="fade-up"
                data-aos-delay="500">
                <p>◎ 客服時間:週一至週五,上午7:00~下午17:00</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-5 offset-md-1">
            <h4 class="tracking-widest font-bold text-3xl pb-3 mt-5"
              style="border-bottom: 1px solid #404040;">寄送表單聯絡我們</h4>
            <VForm
              action=""
              @submit="submit">
              <div class="py-3 position-relative">
                <h3 class="d-block formData-label
                    tracking-wide text-lg">*聯絡人姓名</h3>
                <VField
                  id="name"
                  name="姓名"
                  rules="required"
                  type="text"
                  class="carts-input w-100 p-2 border-0 border-bottom text-white"
                  placeholder="請輸入姓名"
                  v-model="this.formData.user.name" />
                <br>
                <ErrorMessage
                  style="color:#ff4343"
                  class="ps-2 position-absolute text-xs"
                  name="姓名" />
              </div>
              <div class="py-3 position-relative">
                <h3 class="tracking-wide text-lg">*性別</h3>
                <w-radio
                  class="ps-2"
                  color="white"
                  value="male"
                  name="gendor"
                  v-model="gendor">
                  <p class="text-white">男</p>
                </w-radio>
                <w-radio
                  class="ps-3"
                  color="white"
                  value="female"
                  name="gendor"
                  v-model="gendor">
                  <p class="text-white">女</p>
                </w-radio>
              </div>
              <div class="py-3 position-relative">
                <h3
                  class="d-block formData-label
                  tracking-widest text-lg"
                  for="email">
                  *聯絡人信箱</h3>
                <VField
                  id="email"
                  name="信箱"
                  rules="required|email"
                  type="email"
                  class="carts-input w-100 p-2
                  border-0 border-bottom text-white"
                  placeholder="請輸入電子信箱"
                  v-model="formData.user.email" />
                <br>
                <ErrorMessage
                  style="color:#ff4343"
                  class="ps-2 position-absolute text-xs"
                  name="信箱" />
              </div>
              <div class="py-3 position-relative">
                  <h3
                    class="d-block formData-label
                    tracking-widest text-lg"
                    for="phone">*聯絡人手機</h3>
                  <VField
                    id="phone"
                    name="手機"
                    rules="required"
                    type="tel"
                    class="carts-input w-100 p-2 border-0 border-bottom text-white"
                    placeholder="請輸入手機號碼"
                    v-model="formData.user.tel" />
                <br>
                <ErrorMessage
                  style="color:#ff4343"
                  class="ps-2 position-absolute text-xs"
                  name="手機" />
              </div>
              <div class="py-3 position-relative">
                <label
                  ref="formMessage"
                  class="d-block formData-label
                  tracking-wide text-lg pb-2"
                  for="address">*留言區
                  <span class="text-sm tracking-wide opacity-75" />
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    class="carts-textarea text-white border p-3 tracking-wide w-100"
                    placeholder="留下疑問或需求"
                    maxlength="300"
                    v-model="this.formData.message" />
                </label>
              </div>
              <div class="text-end mb-5 mt-3">
                <w-button
                  type="submit"
                  @click="submit()"
                  class="w-btn">寄送
                </w-button>
              </div>
            </VForm>
          </div>
        </div>
      </div>
    </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export default {
  data() {
    return {
      formData: {
        user: {
          name: '',
          email: '',
          tel: '',
        },
        message: '',
      },
      gendor: '',
    };
  },
  components: { Navbar, Footer },
  methods: {
    submit() {
      if (this.formData.user.name === '' || this.formData.user.email === '' || this.formData.user.tel === '' || this.formData.message === '') {
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
          icon: 'info',
          title: '資料未完整填寫',
        });
      } else if (this.gendor !== true) {
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
          icon: 'info',
          title: '請填寫性別欄位 <i class="bi bi-emoji-smile-fill"></i>',
        });
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
          icon: 'success',
          title: '成功寄送<i class="bi bi-emoji-smile-fill"></i>',
        });
        this.formData.user.name = '';
        this.formData.user.email = '';
        this.formData.user.tel = '';
        this.formData.message = '';
      }
    },
  },
};
</script>
