import createMap from "./create_map.js";
import case_data from "./case_data.js";

let pdfToText = function(data) {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.min.js";

  pdfjsLib.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.min.js";
  pdfjsLib.cMapUrl = "js/vendor/pdfjs/cmaps/";
  pdfjsLib.cMapPacked = true;

  return pdfjsLib.getDocument(data).promise.then(function(pdf) {
    var pages = [];
    for (var i = 0; i < pdf.numPages; i++) {
      pages.push(i);
    }
    return Promise.all(
      pages.map(function(pageNumber) {
        return pdf.getPage(pageNumber + 1).then(function(page) {
          return page.getTextContent().then(function(textContent) {
            return textContent.items
              .map(function(item) {
                return item.str;
              })
              .join(" ");
          });
        });
      })
    ).then(function(pages) {
      return pages.join("\r\n");
    });
  });
};

const currentDay = new Date(new Date().getTime() + -4 * 3600 * 1000).getDate();
const dataUrl = `https://www.mass.gov/doc/covid-19-cases-in-massachusetts-as-of-march-${currentDay}-2020/download`;

const proxyurl = "https://andrew-cors-anywhere.herokuapp.com/";
pdfToText(proxyurl + dataUrl)
  .then(function(result) {
    return result
      .match(/County\s+(.+)\s+Sex/)[1]
      .replace("Dukes and Nantucket", "Dukes   0   Nantucket")
      .split(/\s\s\s/)
      .map(r => (/\d/.test(r) ? parseInt(r.replace(/\s+/, "")) : r));
  })
  .then(function(result) {
    let lastCounty = "";
    for (let i = 0; i < result.length; i++) {
      if (i % 2 === 0) {
        lastCounty =
          result[i] === "Unknown" ? result[i] : `${result[i]} County, MA`;
      } else {
        case_data.data.filter(c => c.name === lastCounty)[0].value = result[i];
      }
    }
    createMap(case_data.data);
    const totalCases = case_data.data
      .map(c => c.value)
      .reduce((a, b) => a + b, 0);
    document.getElementById(
      "total-cases"
    ).innerText = `Confirmed cases reported = ${totalCases}`;

    document.getElementById("latest-url").setAttribute("href", dataUrl);
    document.getElementById(
      "latest-url"
    ).innerText = `Latest Report as of March ${currentDay}, 2020`;
  });
