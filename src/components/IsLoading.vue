<template>
  <loading>
    <div class="loadingio-spinner">
      <div class="loading-container">
        <div>
          <div>
            <div>
              <div></div>
            </div>
          </div>
          <div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </loading>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    Loading,
  },
};
</script>
