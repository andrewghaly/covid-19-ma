import createGraph from "./create_graph.js";

axios
  .get("https://covidtracking.com/api/v1/states/ma/daily.json")
  .then((response) => {
    return createGraph(
      response.data.map((d) => d.positiveIncrease).reverse(),
      "daily-cases-ma"
    );
  });

axios.get("https://covidtracking.com/api/v1/us/daily.json").then((response) => {
  return createGraph(
    response.data.map((d) => d.positiveIncrease).reverse(),
    "daily-cases-usa"
  );
});
