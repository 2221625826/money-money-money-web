<template>
  <div class="backgroud">
    <var-app-bar  title="收支分析" />
    <var-space justify="space-around" align="center" class="choose">
      <var-button>年度分析</var-button>
      <var-button @click="getMonth">本月分析</var-button>
    </var-space>
    <var-list>
      <var-space direction="column" justify="space-around" align="center">
        <div id="pie" class="chart"></div>
        <div id="line" class="chart"></div>
      </var-space>
    </var-list>
  </div>
</template>
  
<script>
import * as echarts from "echarts";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Analyse",
  props: {
    msg: String,
  },
  data() {
    return {
      year: 2022,
      month: 8,
      pie: [],
      lineX: [],
      line: [],
    };
  },
  methods: {
    getMonth: function() {
      let request = {
        year: this.year,
        month: this.month
      }
      this.$axios.get("/analyse/pie", request).then((res) => {
        if (res.code != 200 || res.data == null) {
          alert(res.msg);
        } else {
          this.pie = res.data;
          this.initPieChart();
        }
      });
      this.$axios.get("/analyse/line", request).then((res) => {
        if (res.code != 200 || res.data == null) {
          alert(res.msg);
        } else {
          this.lineX = res.data.name;
          this.line = res.data.value;
          this.initLineChart();
        }
      });
    },
    initPieChart: function () {
      let chart = echarts.init(document.getElementById("pie"));
      // 把配置和数据放这里
      chart.setOption({
        tooltip: {
          trigger: "item", //点击触发显示数据
        },
        series: [
          {
            type: "pie", //图类型
            radius: "70%", //饼图半径
            data: this.pie,
            emphasis: {
              //高亮
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgb(255, 192, 203)",
              },
            },
          },
        ],
      });
      window.onresize = function () {
        chart.resize(); //自适应大小
      };
    },
    initLineChart: function () {
      let chart = echarts.init(document.getElementById("line"));
      // 把配置和数据放这里
      chart.setOption({
        xAxis: {
          type: "category",
          data: this.lineX,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.line,
            type: "line",
          },
        ],
      });
      window.onresize = function () {
        chart.resize(); //自适应大小
      };
    },
  },
  mounted() {
    this.getMonth();
  },
  unmounted() {
    echarts.dispose;
  },
};
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.backgroud {
  background-color: pink;
  min-height: 100%;
}
.chart {
  width: 300px;
  height: 300px;
}

.choose {
  height: 100px;
}
</style>
  