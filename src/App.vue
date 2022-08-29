<template>
  <router-view/>
  <var-tabs v-model:active="active" fixed-bottom
  color="pink"
  @click="push">
        <var-tab>账单</var-tab>
        <var-tab>收支分析</var-tab>
        <var-tab>个人中心</var-tab>
      </var-tabs>
</template>

<script>
import { ref } from 'vue';
  // @ is an alias to /src
  export default {
    data() {
      return {
        active: ref(0),
        path: ["/","/money","/login"]
      };
    },
    methods: {
      push: function (index) {
        this.$router.push(this.path[index]);
      }
    }
  };
  </script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body,
#app {
  height: 100%;
  margin:0;
	padding:0;
	border:0;
}
</style>
