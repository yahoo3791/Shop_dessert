<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
    <div class="toast-header">
      <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block" />
      <strong class="me-auto">{{ msg.title }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" />
    </div>
    <div class="toast-body" v-if="msg.content">
      {{ msg.content }}
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import ToastMessages from 'bootstrap/js/dist/toast';

export default {
  setup() {
    onMounted(() => {
      const toastEl = this.$refs.toast;
      const toast = new ToastMessages(toastEl, {
        delay: 6000,
      });
      toast.show();
    });
  },
  name: 'ToastMessages',
  props: ['msg'],
};
</script>
