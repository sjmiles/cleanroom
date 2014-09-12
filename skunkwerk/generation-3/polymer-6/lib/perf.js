console.perf = function() {
    console.timeline();
    console.profile();
    time = Date.now();  
}

console.perfEnd = function() {
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      time = (Date.now() - time) + 'ms';
      console.profileEnd();
      document.title = time;
      console.log('From body start to after first paint (?): ' + time);
      console.log('Complexity: ' + complexity(document.body));
    });
  });
}

function complexity(root) {
  var rating = 0;
  // polymer element?
  if (root.created) {
    rating += 2;
  }
  // has shadowRoot?
  if (root.shadowRoot) {
    rating += 1 + complexity(root.shadowRoot);
  }
  // has children?
  rating += root.childNodes.length;
  for (var c=root.firstElementChild; c; c=c.nextElementSibling) {
    rating += complexity(c);
  }
  return rating;
}
