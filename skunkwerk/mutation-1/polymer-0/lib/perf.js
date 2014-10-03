var perf = function() {
  console.timeline();
  console.profile();
  time = Date.now();  
}

var perfEnd = function() {
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      time = (Date.now() - time) + 'ms';
      console.profileEnd();
      document.title = time;
      console.log('From start to after first paint (?): ' + time);
    });
  });
}

if (0) {
  console.perf = function() {};
  console.perfEnd = function() {};
  
  perf();
  addEventListener('DOMContentLoaded', perfEnd);
} else {
  console.perf = perf;
  console.perfEnd = perfEnd;
}


