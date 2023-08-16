// export default {
//   data() {
//     return {
//       scrollIcon: true,
//     };
//   },
//   methods: {
//     scrollToTop() {
//       window.scrollTo(0, 0);
//     },
//     handleScroll() {
//       if (window.scrollY >= 650) {
//         this.scrollIcon = false;
//       } else {
//         this.scrollIcon = true;
//       }
//     },
//   },
//   created() {
//     window.addEventListener('scroll', this.handleScroll);
//   },
// };

import { ref, onMounted } from 'vue';

export default function scroll() {
  const scrollIcon = ref(true);
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const handleScroll = () => {
    if (window.scrollY >= 650) {
      scrollIcon.value = false;
    } else {
      scrollIcon.value = true;
    }
  };
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  return { scrollToTop, scrollIcon };
}
