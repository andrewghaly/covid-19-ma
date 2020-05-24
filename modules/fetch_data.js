// import createMap from "./create_map.js";
import createGraph from "./create_graph.js";
// import case_data from "./case_data.js";
// import pingUrl from "./ping_url.js";

// let pdfToText = function (url) {
//   pdfjsLib.GlobalWorkerOptions.workerSrc =
//     "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.min.js";

//   return pdfjsLib.getDocument(url).promise.then(function (pdf) {
//     let pages = [];
//     for (let i = 0; i < pdf.numPages; i++) {
//       pages.push(i);
//     }
//     return Promise.all(
//       pages.map(function (pageNumber) {
//         return pdf.getPage(pageNumber + 1).then(function (page) {
//           return page.getTextContent().then(function (textContent) {
//             return textContent.items
//               .map(function (item) {
//                 return item.str;
//               })
//               .join(" ");
//           });
//         });
//       })
//     ).then(function (pages) {
//       return pages.join("\r\n");
//     });
//   });
// };

// const proxyUrl = "https://andrew-cors-anywhere.herokuapp.com/";

// pingUrl(proxyUrl).then((result) => {
//   const { day, month, year, url } = result;

//   pdfToText(proxyUrl + url)
//     .then(function (result) {
//       return result
//         .match(/County\s+(.+)\s+Sex/)[1]
//         .split(/\s\s\s/)
//         .map((r) => (/\d/.test(r) ? parseInt(r.replace(/\s+/g, "")) : r));
//     })
//     .then(function (result) {
//       let lastCounty = "";
//       for (let i = 0; i < result.length; i++) {
//         if (i % 2 === 0) {
//           lastCounty =
//             result[i] === "Unknown" ? result[i] : `${result[i]} County, MA`;
//         } else {
//           case_data.data.filter((c) => c.name === lastCounty)[0].value =
//             result[i];
//         }
//       }

//       createMap(case_data.data);

//       const totalCases = case_data.data
//         .map((c) => c.value)
//         .reduce((a, b) => a + b, 0);

//       document.getElementById(
//         "total-cases"
//       ).innerText = `Confirmed cases reported = ${totalCases}`;

//       document.getElementById("latest-url").setAttribute("href", url);
//       document.getElementById(
//         "latest-url"
//       ).innerText = `Latest Report as of ${month} ${day}, ${year}`;
//     });
// });

axios
  .get("https://covidtracking.com/api/v1/states/ma/daily.json")
  .then((response) => {
    return createGraph(response.data.map((d) => d.positiveIncrease).reverse());
  });
