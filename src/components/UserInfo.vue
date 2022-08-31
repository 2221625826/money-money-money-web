<template>
  <div>
    <var-form ref="form" :disabled="disabled" :readonly="readonly"> </var-form>
    <Tab :active="2"/>
  </div>
</template>
  
  <script>
import Tab from "@/components/Tab.vue";
export default {
  name: "UserInfo",
  components: {
    Tab,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      userInfo: {},
      disabled: true,
      readonly: true,
    };
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
</style>
  