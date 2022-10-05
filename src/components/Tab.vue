<!-- eslint-disable vue/no-mutating-props -->
<template>
  <var-tabs v-model:active="active" fixed-bottom @click="push">
    <var-tab>账单</var-tab>
    <var-tab>收支分析</var-tab>
    <var-tab>个人中心</var-tab>
  </var-tabs>
</template>
  
  <script>
// @ is an alias to /src
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tab",
  props: {
    msg: String,
    active: Number,
  },
  data() {
    return {
      path: ["/money", "/analyse", "/userInfo"],
    };
  },
  methods: {
    push: function () {
      this.$router.push(this.path[this.active]);
    },
  },
};
</script>