<template>
  <div class="swiper-container">
    <swiper
      ref="{swiperRef}"
      :slidesPerView="2"
      :centeredSlides="true"
      :spaceBetween="30"
      :navigation="true"
      :modules="modules"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, index) in sameProduct" :key="index" class="flex-column">
        <div
          class="mx-auto product-content-container cursor-pointer"
          @click.stop="more(item.id, index)"
          @keydown="more(item.id, index)"
          style="max-width: 250px"
        >
          <img :src="item.imageUrl" alt="您可能喜歡的圖片" />
          <h5 class="product-content-h5 text-base font-medium tracking-wide py-2">
            {{ item.title }}
          </h5>
          <p class="product-content">
            <del>{{ item.origin_price }}$</del>/
            <span class="product-p">優惠價{{ item.price }}$</span>
          </p>
          <div
            v-if="item.num >= 1"
            :class="{ 'opacity-75': isLoading === true }"
            :disabled="isLoading === true"
            class="mt-2 w-btn-product"
            @click.stop="addCart(item.id, $event)"
            @keydown="addCart(item.id, $event)"
          >
            <div class="d-none spinner-border spinner-border-sm" role="status" />
            加入購物車
          </div>
          <div v-else class="w-btn-product mt-2 opacity-50">已售完</div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import '@/assets/scss/swiper/productMoreSwiper.css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { ref } from 'vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const visibleRef = ref(false);
    const indexRef = ref(0);
    const imgsRef = ref([]);
    const onShow = () => {
      visibleRef.value = true;
    };
    const showSingle = () => {
      onShow();
    };
    const onHide = () => {
      visibleRef.value = false;
    };
    return {
      modules: [Autoplay, Pagination, Navigation],
      visibleRef,
      indexRef,
      imgsRef,
      showSingle,
      onHide,
    };
  },
};
</script>
