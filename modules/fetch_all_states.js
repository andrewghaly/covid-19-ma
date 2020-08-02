import createGraph from "./create_graph.js";

const states = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District Of Columbia",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

for (let [stateCode, stateName] of Object.entries(states)) {
  fetchDataByState(stateName, stateCode);
}

function fetchDataByState(stateName, stateCode) {
  $("#all-states").append(
    `<span style="float:left;border: 1px solid black;margin:5px;">
    <h4 style="text-align: center;">${stateName}</h4>
    <div id="daily-cases-${stateCode}" class="state-graph"></div>
    </span>`
  );
  axios
    .get(
      `https://covidtracking.com/api/v1/states/${stateCode.toLowerCase()}/daily.json`
    )
    .then((response) => {
      return createGraph(
        response.data.map((d) => d.positiveIncrease).reverse(),
        `daily-cases-${stateCode}`,
        response.data[response.data.length - 1].date
      );
    });
}
