<template>
  <nav aria-label="Page navigation example">
    <ul
      class="pagination justify-content-center">
      <li class="page-item">
        <a
          class="page-link text-secondary"
          href="#"
          aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pages.total_pages"
        :key="page.id">
        <a
          class="page-link text-secondary"
          href="#"
          @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item">
        <a
          class="page-link text-secondary"
          href="#"
          aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  setup() {
    const updatePage = (page) => {
      this.$emit('update-page', page);
    };
    return {
      updatePage,
    };
  },
  props: ['pages'],
};
</script>
