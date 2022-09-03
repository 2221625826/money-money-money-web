<template>
  <div>
      <Money />
      <Tab :active="0" />
  </div>
</template>

<script>
import Money from "@/components/Money.vue";
import Tab from "@/components/Tab.vue";
// @ is an alias to /src
export default {
  name: "BookView",
  components: {
    Money,
    Tab,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
</style>