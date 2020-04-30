export default function createGraph(data) {
  Highcharts.chart("daily-cases", {
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
        '<tr><td style="color:black;padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.f}</b></td></tr>',
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
        name: "Daily Cases",
        data,
        pointStart: Date.UTC(2020, 2, 12),
        pointInterval: 24 * 3600 * 1000,
      },
    ],
  });
}
