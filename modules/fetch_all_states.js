import createGraph from "./create_graph.js";

const states = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];
states.map((s) => fetchDataByState(s));
function fetchDataByState(state) {
  $("#all-states").append(
    `<span style="float:left;">
    <h3>${state}</h3>
    <div id="daily-cases-${state}" class="state-graph"></div>
    </span>`
  );
  axios
    .get(
      `https://covidtracking.com/api/v1/states/${state.toLowerCase()}/daily.json`
    )
    .then((response) => {
      return createGraph(
        response.data.map((d) => d.positiveIncrease).reverse(),
        `daily-cases-${state}`
      );
    });
}
