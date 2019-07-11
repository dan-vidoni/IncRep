(function startTimer() {
  if (window.localStorage.dataStartZileFaraAccidente) {
    countUpFromTime(window.localStorage.dataStartZileFaraAccidente);
  } else {
    countUpFromTime(new Date(Date.now()));
  }
})();

function resetZileTimer() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  countUpFromTime(now);
}

function countDays(days) {
  var startdate = moment();
  startdate.set({hour:0,minute:0,second:0,millisecond:0});
  startdate = startdate.subtract(days, "days");
  window.localStorage.dataStartZileFaraAccidente = startdate.toDate();
  countUpFromTime(startdate.toDate());
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
  counter.getElementsByClassName("days")[0].innerHTML = days;
  // counter.getElementsByClassName("hours")[0].innerHTML = hours;
  // counter.getElementsByClassName("minutes")[0].innerHTML = mins;
  // counter.getElementsByClassName("seconds")[0].innerHTML = secs;

  clearTimeout(countUpFromTime.interval);
  countUpFromTime.interval = setTimeout(function() {
    countUpFromTime(countFrom);
  }, 1000);
}
