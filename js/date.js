(function startCurrentDateTimer() {
  setInterval(() => {
    var currentDate = document.getElementById("currentDate");
    currentDate.innerHTML = moment().format("L");
  }, 5000);
})();
