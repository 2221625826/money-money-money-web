<template>
  <div>
    <el-form>
      <el-form-item label="账号">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" show-password />
      </el-form-item>
      <el-button class="loginBtn" type="primary" native-type="submit" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { reactive } from "vue";
let Base64 = require('js-base64').Base64;
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  props: {
    msg: String,
  },
  data() {
    return {
      form: reactive({
        username: "",
        password: "",
      }),
    };
  },
  methods: {
    login: function () {
      this.form.password = Base64.encode(this.form.password);
      this.$axios.get("/login/login", this.form).then((res) => {
        if (res.code != 200 || res.result == null) {
          localStorage.removeItem("token");
          alert(res.msg);
        } else {
          localStorage.setItem("token", res.result);
          this.$router.push("/home");
        }
      });
      this.form.password = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginBtn {
  display: block;
  margin: auto;
}
</style>
