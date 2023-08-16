<template>
  <div class="toast-container position-absolute pt-2 pe-3 top-0 end-0">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Toast from '@/components/BackToast.vue';
import emitter from '@/methods/emitter';

export default {
  setup() {
    const messages = ref([]);

    onMounted(() => {
      emitter.on('push-message', (message) => {
        const { style = 'success', title, content } = message;
        messages.value.push({ style, title, content });
      });
    });

    return {
      messages,
    };
  },
  components: {
    Toast,
  },
  inject: ['emitter'],
};
</script>
