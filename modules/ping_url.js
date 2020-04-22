export default function pingUrl(proxyUrl) {
  function getDateAndUrl(date) {
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
      "December",
    ];

    const day = 19;
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const url = `https://www.mass.gov/doc/covid-19-cases-in-massachusetts-as-of-${month.toLowerCase()}-${day}-${year}/download`;
    return { day, month, year, url };
  }

  const todaysDate = getDateAndUrl(new Date());

  let yesterdaysDate = new Date();
  yesterdaysDate = getDateAndUrl(
    new Date(yesterdaysDate.setDate(yesterdaysDate.getDate() - 1))
  );

  return axios
    .get(proxyUrl + todaysDate.url)
    .then(() => {
      return todaysDate;
    })
    .catch(() => {
      return yesterdaysDate;
    });
}
