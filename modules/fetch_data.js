import createGraph from "./create_graph.js";

axios
  .get(
    "https://data.cdc.gov/resource/9mfq-cb36.json?state=MA&$select=new_case,submission_date&$order=submission_date",
    {
      params: {
        $$app_token: "w9o6Tehqvczxv6EDdfQIGMhN9",
      },
    }
  )
  .then((response) => {
    return createGraph(
      response.data.map((d) => parseInt(d.new_case)),
      "daily-cases-ma",
      response.data[0].submission_date
    );
  });

axios
  .get(
    "https://data.cdc.gov/resource/9mfq-cb36.json?$select=sum(new_case),submission_date&$group=submission_date&$order=submission_date",
    {
      params: {
        $$app_token: "w9o6Tehqvczxv6EDdfQIGMhN9",
      },
    }
  )
  .then((response) => {
    return createGraph(
      response.data.map((d) => parseInt(d.sum_new_case)),
      "daily-cases-usa",
      response.data[0].submission_date
    );
  });
