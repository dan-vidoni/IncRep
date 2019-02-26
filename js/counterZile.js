(function startTimer() {
  countUpFromTime(new Date(Date.now()));
})();

function resetZileTimer() {
  countUpFromTime(new Date(Date.now()));
}

function countUpFromTime(countFrom) {
  countFrom = new Date(countFrom).getTime();
  var now = new Date(),
    countFrom = new Date(countFrom),
    timeDifference = now - countFrom;

  var secondsInADay = 60 * 60 * 1000 * 24,
    secondsInAHour = 60 * 60 * 1000;

  days = Math.floor((timeDifference / secondsInADay) * 1);
  hours = Math.floor(((timeDifference % secondsInADay) / secondsInAHour) * 1);
  mins = Math.floor(
    (((timeDifference % secondsInADay) % secondsInAHour) / (60 * 1000)) * 1
  );
  secs = Math.floor(
    ((((timeDifference % secondsInADay) % secondsInAHour) % (60 * 1000)) /
      1000) *
      1
  );

  var counter = document.getElementById("zileAccidentCuIncapacitate");
  // counter.getElementsByClassName("days")[0].innerHTML = days;
  // counter.getElementsByClassName("hours")[0].innerHTML = hours;
  // counter.getElementsByClassName("minutes")[0].innerHTML = mins;
  counter.getElementsByClassName("seconds")[0].innerHTML = secs;

  clearTimeout(countUpFromTime.interval);
  countUpFromTime.interval = setTimeout(function() {
    countUpFromTime(countFrom);
  }, 1000);
  //TODO change interval time to one minute - maybe
}
