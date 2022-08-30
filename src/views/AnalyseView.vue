<template>
  <div class="background" >
    <Analyse/>
  </div>
</template>
  
<script>
import Analyse from "@/components/Analyse.vue";

export default {
  name: "AnalyseView",
  components: {
    Analyse,
  },
};
</script>

<style scoped>
.background {
  height: 100%;
}
</style>
  