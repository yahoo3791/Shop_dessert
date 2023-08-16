<template>
  <div class="position-relative">
    <ToastMessages />
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<script>
import { provide } from 'vue';
import ToastMessages from '@/components/ToastMessages.vue';
import emitter from '@/methods/emitter';

export default {
  setup() {
    provide(emitter);
  },
  components: {
    ToastMessages,
  },
  // provide() {
  //   return { emitter };
  // },
};
</script>
