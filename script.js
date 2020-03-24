import case_data from "./case_data.js";

function getData(data) {
  const countiesMap = Highcharts.geojson(
      Highcharts.maps["countries/us/us-ma-all"]
    ),
    lines = Highcharts.geojson(
      Highcharts.maps["countries/us/us-ma-all"],
      "mapline"
    ),
    borderLines = Highcharts.grep(lines, function(l) {
      return l.properties["hc-group"] === "__border_lines__";
    }),
    separatorLines = Highcharts.grep(lines, function(l) {
      return l.properties["hc-group"] === "__separator_lines__";
    });
  Highcharts.each(countiesMap, function(mapPoint) {
    mapPoint.name = mapPoint.name + ", MA";
  });
  document.getElementById("container").innerHTML = "Rendering map...";
  setTimeout(function() {
    Highcharts.mapChart("container", {
      title: {
        text: "COVID-19 Cases in Massachusetts"
      },
      legend: {
        layout: "vertical",
        align: "left",
        floating: true,
        backgroundColor:
          (Highcharts.defaultOptions &&
            Highcharts.defaultOptions.legend &&
            Highcharts.defaultOptions.legend.backgroundColor) ||
          "rgba(255, 255, 255, 0.85)"
      },
      mapNavigation: {
        enabled: true
      },
      colorAxis: {
        min: 0,
        tickInterval: 5,
        stops: [
          [0, "#F1EEF6"],
          [0.65, "#900037"],
          [1, "#500007"]
        ],
        labels: {
          format: "{value} cases"
        }
      },
      plotOptions: {
        mapline: {
          showInLegend: false,
          enableMouseTracking: false
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          mapData: countiesMap,
          data: data,
          joinBy: ["hc-key", "code"],
          name: "",
          tooltip: {
            valueSuffix: " cases "
          },
          borderWidth: 0.5,
          states: {
            hover: {
              color: "#a4edba"
            }
          },
          shadow: false
        },
        {
          type: "mapline",
          name: "State borders",
          data: borderLines,
          color: "white",
          shadow: false
        },
        {
          type: "mapline",
          name: "Separator",
          data: separatorLines,
          color: "gray",
          shadow: false
        }
      ]
    });
  }, 0);
}
getData(case_data.data);
