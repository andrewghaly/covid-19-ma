export default function createGraph(data, divId, date) {
  const year = parseInt(date.toString().slice(0, 4));
  const month = parseInt(date.toString().slice(4, 6)) - 1;
  const day = parseInt(date.toString().slice(6, 8));
  data = data.map((point, index) => [
    Date.UTC(year, month, index + day),
    point,
  ]);
  return Highcharts.chart(divId, {
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        day: "%b<br>%e",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of Cases",
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:black;">{series.name}: </td>' +
        "<td ><b>{point.y:.2f}</b></td></tr>",
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
      series: {
        color: "#900037",
      },
    },
    series: [
      {
        regression: true,
        regressionSettings: {
          name: "Average",
          type: "polynomial",
          color: "rgba(223, 183, 83, .9)",
          dashStyle: "dash",
          lineWidth: 5,
        },
        name: "Daily Cases",
        data,
      },
    ],
  });
}
