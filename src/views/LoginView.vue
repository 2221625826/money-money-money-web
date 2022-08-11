<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-header class="header">
        登录页面
      </el-header>
      <el-main>
        <Login class="login" />
      </el-main>
    </el-container>
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
.login {
  margin: auto;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
}
.header {
  font-size: 50px;
  text-align: center;
  color: #FFB2B2;
  padding-top: 10%;
  height: 30%;
}
</style>