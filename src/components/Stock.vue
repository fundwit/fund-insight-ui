<template>
    <v-chart class="chart" :option="option" style="width: 800px; height: 600;" autoresize />
  </template>

<script setup>
import { use, format } from 'echarts/core';
import {
  DatasetComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  DataZoomComponent
} from 'echarts/components';
import { CandlestickChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { ref, provide, onMounted } from 'vue';
import VChart, { THEME_KEY } from 'vue-echarts';
import client from "../client/insight";

use([
  DatasetComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  DataZoomComponent,
  CandlestickChart,
  BarChart,
  CanvasRenderer
]);

provide(THEME_KEY, 'dark');

const code = 'sh600519'
const upColor = '#ec0000';
const upBorderColor = '#8A0000';
const downColor = '#00da3c';
const downBorderColor = '#008F28';
const option = ref({
  dataset: {
    source: []
  },
  title: {
    text: code
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: false
      }
    }
  },
  grid: [
    {
      left: '10%',
      right: '10%',
      bottom: 200
    },
    {
      left: '10%',
      right: '10%',
      height: 80,
      bottom: 80
    }
  ],
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      // inverse: true,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: 'dataMin',
      max: 'dataMax'
    },
    {
      type: 'category',
      gridIndex: 1,
      boundaryGap: false,
      axisLine: { onZero: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      min: 'dataMin',
      max: 'dataMax'
    }
  ],
  yAxis: [
    {
      scale: true,
      splitArea: {
        show: true
      }
    },
    {
      scale: true,
      gridIndex: 1,
      splitNumber: 2,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    }
  ],
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: [0, 1],
      start: 10,
      end: 100
    },
    {
      show: true,
      xAxisIndex: [0, 1],
      type: 'slider',
      bottom: 10,
      start: 10,
      end: 100
    }
  ],
  visualMap: {
    show: false,
    seriesIndex: 1,
    dimension: 6,
    pieces: [
      {
        value: 1,
        color: upColor
      },
      {
        value: -1,
        color: downColor
      }
    ]
  },
  series: [
    {
      type: 'candlestick',
      itemStyle: {
        color: upColor,
        color0: downColor,
        borderColor: upBorderColor,
        borderColor0: downBorderColor
      },
      encode: {
        x: 0,
        y: [1, 4, 3, 2]
      }
    },
    {
      name: 'Volumn',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      itemStyle: {
        color: '#7fbe9e'
      },
      large: true,
      encode: {
        x: 0,
        y: 5
      }
    }
  ]
});

onMounted(() => {
  client.getDataByDay(code).then(res => {
    if (res.status == 200) {
      //array of item: {close: "1250.560",  day: "2020-04-24", high: "1259.890", low: "1235.180", open: "1248.000", volume: "1912240"}
      let new_data = []
      for (let d of res.data[0].series) {
        let volumeSign = d[4] >= d[1] ? 1: -1
        new_data.push([
          // ['time', 'open', 'high', 'low', 'close', 'volumn', 'sign']
          d[0], d[1], d[2], d[3], d[4], d[5],volumeSign
        ])
      }
      option.value.dataset.source = new_data
    } else {
      console.log(res)
    }
  })
})

</script>

<style scoped>
.chart {
  height: 500px;
}
</style>
