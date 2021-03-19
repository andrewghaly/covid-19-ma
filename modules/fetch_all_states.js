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
  DC: "District of Columbia",
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
let charts = [];
let isDailyCaseVisisble = true;

function fetchDataByState(stateName, stateCode) {
  $("#all-states").append(
    `<span style="float:left;border: 1px solid black;margin:5px;">
    <h4 style="text-align: center;">${stateName}</h4>
    <div id="daily-cases-${stateCode}" class="state-graph"></div>
    </span>`
  );
  axios
    .get(
      `https://data.cdc.gov/resource/9mfq-cb36.json?state=${stateCode}&$select=new_case,submission_date&$order=submission_date`,
      {
        params: {
          $$app_token: "w9o6Tehqvczxv6EDdfQIGMhN9",
        },
      }
    )
    .then((response) => {
      charts.push(
        createGraph(
          response.data.map((d) => parseInt(d.new_case)),
          `daily-cases-${stateCode}`,
          response.data[0].submission_date
        )
      );
    });
}

$("#toggle-all").on("click", () => {
  isDailyCaseVisisble = !isDailyCaseVisisble;
  charts.map((m) => m.series[0].setVisible(isDailyCaseVisisble));
});
