console.perf = function() {
  console.timeline();
  console.profile();
  time = Date.now();  
}

console.perfEnd = function() {
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        time = (Date.now() - time) + 'ms';
        console.profileEnd();
        document.title = time;
        //console.log('From start to after first paint (?): ' + time);
      });
    });
  });
}
