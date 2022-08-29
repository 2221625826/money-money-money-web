<template>
  <div>
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
export default {
  name: "LoginView",
  components: {
    Login,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
* {
  height: 100%;
}
</style>