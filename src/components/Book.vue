<template>
  <div>
    <el-input
        v-model="input1"
        :prefix-icon="Search"
      />
  </div>
</template>

<script>
import { Search } from "@element-plus/icons-vue";
export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Book",
  props: {
    msg: String,
  },
  data() {
    return {
      input1: "",
    };
  },
  methods: {
    
  },
  setup(){
  return {
     Search,
   }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
