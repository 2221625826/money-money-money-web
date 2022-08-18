<template>
  <div class="root">
    <var-app-bar title="标题" />
    <var-button class="date" @click="dateShow = true">
      <h1>{{ this.date }}</h1>
    </var-button>
    <var-list :finished="finished" v-model:loading="loading" @load="load">
      <var-cell :key="item" v-for="item in list.items"> 列表项: {{ item }} </var-cell>
    </var-list>

    <var-popup position="bottom" v-model:show="dateShow">
      <var-date-picker type="month" v-model="date" shadow />
    </var-popup>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Money",
  props: {
    msg: String,
  },
  data() {
    return {
      date: ref("2022-08"),
      list: ref({
        loading: false,
        finished: false,
        items: [{ a: 0 }],
      }),
      sum: ref({
        in: 0,
        out: 0,
      }),
      dateShow: ref(false),
    };
  },
  methods: {
    load: function () {
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          this.list.items.push(this.list.items.length + 1);
        }
        this.loading = false;
        if (this.list.items.length >= 60) {
          this.finished.value = true;
        }
      }, 1000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  height: 780px;
}
.date {
  margin-top: 8%;
  margin-left: 8%;
  min-width: 30%;
  min-height: 8%;
  color: #000;
  background-color: pink;
}
</style>
