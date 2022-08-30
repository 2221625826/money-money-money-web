<template>
  <var-tabs v-model:active="active" fixed-bottom color="pink" @click="push">
    <var-tab>账单</var-tab>
    <var-tab>收支分析</var-tab>
    <var-tab>个人中心</var-tab>
  </var-tabs>
</template>
  
  <script>
import { ref } from "vue";
// @ is an alias to /src
export default {
  name: "Tab",
  props: {
    msg: String,
  },
  data() {
    return {
      active: ref(0),
      path: ["/money", "/analyse", "/login"],
    };
  },
  methods: {
    push: function () {
      this.$router.push(this.path[this.active]);
    },
  },
};
</script>
  
<style>
</style>
  