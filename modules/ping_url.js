export default function pingUrl() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const firstDate = new Date();
  console.log();

  const currentDay = firstDate.getDate();
  const currentMonth = monthNames[firstDate.getMonth()];
  const currentYear = firstDate.getFullYear();
  const dataUrl = `https://www.mass.gov/doc/covid-19-cases-in-massachusetts-as-of-${currentMonth.toLowerCase()}-${currentDay}-${currentYear}/download`;

  console.log(dataUrl);
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  console.log(new Date(new Date().getTime() + -4 * 3600 * 1000));

  //   axios
  //     .get(proxyUrl + dataUrl)
  //     .then(function(response) {
  //       console.log(response.status);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });

  //   return {
  //     currentDay: 30,
  //     currentMonth: "March",
  //     currentYear: 2020,
  //     dataUrl: `https://www.mass.gov/doc/covid-19-cases-in-massachusetts-as-of-${currentMonth.toLowerCase()}-${currentDay}-${currentYear}/download`
  //   };
}
