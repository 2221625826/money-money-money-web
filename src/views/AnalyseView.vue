<template>
  <div class="background" >
    <Analyse/>
    <Tab :active="1"/>
  </div>
</template>
  
<script>
import Analyse from "@/components/Analyse.vue";
import Tab from "@/components/Tab.vue";
export default {
  name: "AnalyseView",
  components: {
    Analyse,
    Tab,
  },
};
</script>

<style scoped>
.background {
  height: 100%;
}
</style>
  