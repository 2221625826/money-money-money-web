<template>
  <div>
    <var-form ref="form" :disabled="disabled" :readonly="readonly"> </var-form>
  </div>
</template>
  
  <script>

export default {
  name: "UserInfo",
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
  