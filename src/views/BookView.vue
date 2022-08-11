<template>
  <div style="height: 100%">
    <Book/>
  </div>
</template>

<script>
import Book from "@/components/Book.vue";
// @ is an alias to /src
export default {
  name: "BookView",
  components: {
    Book,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
</style>