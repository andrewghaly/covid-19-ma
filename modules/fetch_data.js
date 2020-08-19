import createGraph from "./create_graph.js";

axios
  .get("https://andrew-cors-anywhere.herokuapp.com/https://covidtracking.com/api/v1/states/ma/daily.json",)
  .then((response) => {
    return createGraph(
      response.data.map((d) => d.positiveIncrease).reverse(),
      "daily-cases-ma",
      response.data[response.data.length - 1].date
    );
  });

axios.get("https://andrew-cors-anywhere.herokuapp.com/https://covidtracking.com/api/v1/us/daily.json").then((response) => {
  return createGraph(
    response.data.map((d) => d.positiveIncrease).reverse(),
    "daily-cases-usa",
    response.data[response.data.length - 1].date
  );
});
