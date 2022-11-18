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
        let temp = json.slice(0, 906);
        let xData = temp.map((a: { x: number; }) => a.x);
        let yData = temp.map((a: {y: number}) => a.y)
        setDataX(xData);
        setDataY(yData);
        // setData(temp)
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  
  const options = {
    title: { text: "Data X" },
    grid: { top: 50, right: 30, bottom: 50, left: 80, width: '20%' },
    xAxis: {
      type: "category",
      data: dataX,
      name: "FREQUENCY (hz)",
      nameLocation: "middle",
      nameGap: 30,
      nameTextStyle: {
        fontWeight: "bolder",
      },
      axisLabel: {
        // showMaxLabel: true,
        interval: 90,
        formatter: function (category: string) {
          return category.substr(0, 2).replace(".", "");
        },
      },
    },
    yAxis: {
      type: "value",
      max: 0.002,
      name: "MAGNITUDE",
      nameLocation: "middle",
      nameGap: 60,
      nameTextStyle: {
        fontWeight: "bolder",
      },
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
