<template>
  <Navbar />
  <div class="bg-dark">
    <div class="container-fluid pt-utility">
      <div class="row">
        <div class="col-12 col-md-9 mx-auto p-0">
          <div class="position-relative">
            <img src="@/assets/pic/banner/aboutBanner.png" class="w-100 productBanner"
              style="object-fit: cover; border-radius:5px" alt="關於我們圖片">
            <div class="position-absolute top-50 translate-middle-y"
            style="right:20%">
              <h2 class="text-3xl font-medium tracking-widest">關於我們</h2>
            </div>
          </div>
        </div>
        <div class="col-12">
          時間軸 起承轉合
        </div>
      </div>
    </div>
    <div :class="{ 'scrollIconMoveIn': !scrollIcon }"
      ref="scrollTop" class="scrollTop-container position-fixed text-center
      end-0 bottom-0 cursor-pointer m-3">
      <div @click.prevent="scrollToTop" @keydown="scrollToTop"
        class="scrollTop-btn d-block">
      </div>
    </div>
  </div>
  <Footer />
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import scrollMixins from '../mixins/scroll';

export default {
  data() {
    return {};
  },
  mixins: [scrollMixins],
  components: {
    Navbar, Footer,
  },
};
</script>
