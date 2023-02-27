<template>
  <swiper
    :slidesPerView="1"
    :centeredSlides="true"
    :spaceBetween="30"
    :navigation="true"
    :modules="modules"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :speed="600"
    :options="swiperOption"
    :breakpoints="{
      '768': {
        slidesPerView: 2,
        spaceBetween: 40,
      },
    }"
    class="mySwiper position-relative customized-container">
    <div class="position-absolute swiper-bg top-0" />
    <swiper-slide class="position-relative">
      <img src="@/assets/pic/homepage/母親節蛋糕.png" alt="母親節蛋糕圖片">
      <h2 class="position-absolute top-50 start-50 translate-middle
        text-xl font-medium tracking-wider text-nowrap">母親節蛋糕
      </h2>
    </swiper-slide>
    <swiper-slide class="position-relative">
      <img class="" src="@/assets/pic/homepage/聖誕節餅乾.png" alt="聖誕節餅乾圖片">
      <h2 class="position-absolute top-50 start-50 translate-middle
        text-xl font-medium tracking-wider">暖心餅乾
      </h2>
    </swiper-slide>
    <swiper-slide class="position-relative">
      <img class="" src="@/assets/pic/homepage/萬聖節餅乾.png" alt="萬聖節餅乾圖片">
      <h2 class="position-absolute top-50 start-50 translate-middle
        text-xl font-medium tracking-wider">搞怪餅乾
      </h2>
    </swiper-slide>
  </swiper>
</template>

<script>
import {
  Swiper, SwiperSlide,
} from 'swiper/vue';
// import 'swiper/css';
import '@/assets/scss/swiper/homePageSwiper.css';
// import { Navigation, Pagination } from 'swiper';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        autoplay: {
          delay: 100,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    };
  },
};
</script>
