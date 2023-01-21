<template>
  <div class="position-relative">
    <ToastMessages />
    <router-view :key="$route.fullPath" />
  </div>
</template>
<script>
import ToastMessages from '@/components/ToastMessages.vue';
import emitter from '@/methods/emitter';

export default {
  components: { ToastMessages },
  provide() {
    return { emitter };
  },
};
</script>
