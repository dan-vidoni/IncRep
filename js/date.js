const moment = require("moment");

(function startCurrentDateTimer() {
  setInterval(() => {
    var currentDate = document.getElementById("currentDate");
    currentDate.innerHTML = moment().format("L");
  }, 1000);
})();
