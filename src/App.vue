<template>
  <router-view />
  
</template>

<script>
import { ref } from "vue";
// @ is an alias to /src
export default {
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
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
