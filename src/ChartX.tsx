import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const ChartX: React.FC = () => {
  // const [data, setData] = useState([]);
  const [dataX, setDataX] = useState([])
  const [dataY, setDataY] = useState([]);
  // console.log(data);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    const url = "http://localhost:2000/result_acc_x";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        // let temp = json.slice(0, 1000);
        let xData = json.map((a: { x: number; }) => a.x);
        let yData = json.map((a: {y: number}) => a.y)
        setDataX(xData);
        setDataY(yData);
        // setData(temp)
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  
  const options = {
    title:{text: 'Data X'},
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: dataX,
    },
    yAxis: {
      type: "value",
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        data: dataY,
        type: "line",
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  return <ReactECharts option={options} />;
};

export default ChartX;
