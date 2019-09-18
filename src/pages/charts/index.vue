<template>
  <div>
      <div id="main"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted() {
    this.myChart = echarts.init(document.getElementById('main'));

   var option = {
      title: {
        text: "用户地址统计",
        subtext: "静态数据",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: "center",
        data: ["杭州", "成都", "北京", "上海", "深圳","广州"]
      },
      series: [
        {
          type: "pie",
          radius: "65%",
          center: ["50%", "50%"],
          selectedMode: "single",
          data: [
            {
              value: 2548,
              name: "杭州",
            },
            { value: 535, name: "成都" },
            { value: 510, name: "北京" },
            { value: 634, name: "上海" },
            { value: 735, name: "深圳" },
            { value: 835, name: "广州" }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
     this.myChart.setOption(option);
  }
};
</script>

<style scoped>
    #main{
        width:1000px;
        height :800px;
        margin :30px auto
    }
</style>