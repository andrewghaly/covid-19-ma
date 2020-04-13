import unknown_feature from "./unknown_feature.js";
export default function createMap(data) {
  Highcharts.maps["countries/us/us-ma-all"].features.push(unknown_feature);
  const countiesMap = Highcharts.geojson(
    Highcharts.maps["countries/us/us-ma-all"]
  );
  Highcharts.each(countiesMap, function (mapPoint) {
    mapPoint.name =
      mapPoint.name === "Unknown" ? "Unknown" : mapPoint.name + ", MA";
  });
  document.getElementById("counties-map").innerHTML = "Rendering map...";

  Highcharts.setOptions({
    lang: {
      thousandsSep: ",",
    },
  });

  Highcharts.mapChart("counties-map", {
    title: {
      text: "COVID-19 Cases in Massachusetts",
    },
    legend: {
      layout: "vertical",
      align: "left",
      floating: true,
      backgroundColor:
        (Highcharts.defaultOptions &&
          Highcharts.defaultOptions.legend &&
          Highcharts.defaultOptions.legend.backgroundColor) ||
        "rgba(255, 255, 255, 0.85)",
    },
    mapNavigation: {
      enabled: true,
    },
    colorAxis: {
      min: 0,
      tickInterval: 5,
      stops: [
        [0, "#F1EEF6"],
        [0.65, "#900037"],
        [1, "#500007"],
      ],
      labels: {
        format: "{value} cases",
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        mapData: countiesMap,
        data: data,
        joinBy: ["hc-key", "code"],
        name: "",
        tooltip: {
          valueSuffix: " cases ",
        },
        borderWidth: 0.5,
        states: {
          hover: {
            color: "#a4edba",
          },
        },
      },
    ],
  });
}
