<template>
  <div>
    <var-space direction="column" justify="center" style="height: 80%">
      <var-space justify="center">
        <h1>登录页面</h1>
      </var-space>
      <var-form>
        <var-space direction="row" justify="center">
          <p>账号:</p>
          <var-input v-model="form.username" />
        </var-space>
        <var-space direction="row" justify="center ">
          <p>密码:</p>
          <var-input v-model="form.password" type="password"/>
        </var-space>
      </var-form>
      <var-space justify="center">
        <var-button class="loginBtn" type="primary" @click="login"
          >登录</var-button
        >
      </var-space>
    </var-space>
  </div>
</template>

<script>
import { ref } from "vue";
let Base64 = require('js-base64').Base64;
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  props: {
    msg: String,
  },
  data() {
    return {
      form: ref({
        username: "",
        password: "",
      }),
    };
  },
  methods: {
    login: function () {
      this.form.password = Base64.encode(this.form.password);
      this.$axios.get("/user/login", this.form).then((res) => {
        if (res.code != 200 || res.data == null) {
          localStorage.removeItem("token");
          alert(res.msg);
        } else {
          localStorage.setItem("token", res.data);
          this.$router.push("/money");
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
  min-width: 30%;
}

p {
  font-size: 20px;
}
</style>
