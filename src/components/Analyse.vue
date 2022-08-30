<template>
  <div class="backgroud">
    <var-app-bar  title="收支分析" />
    <var-space justify="space-around" align="center" class="choose">
      <var-button>年度分析</var-button>
      <var-button>本月分析</var-button>
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
  name: "Analyse",
  props: {
    msg: String,
  },
  data() {
    return {
      year: 2022,
      month: 8,
      m: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      data: [
        { value: 1048, name: "1" },
        { value: 735, name: "2" },
        { value: 580, name: "3" },
        { value: 484, name: "4" },
        { value: 300, name: "5" },
      ],
    };
  },
  methods: {
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
            data: this.data,
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
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
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
    this.initPieChart();
    this.initLineChart();
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
  