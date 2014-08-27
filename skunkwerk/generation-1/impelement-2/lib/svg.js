cloneIcon = function(id, size) {
  size = size || 24;
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  var icon = document.querySelector(id);
  if (icon) {
    svg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);
    svg.style.width = svg.style.height = size + 'px';
    svg.style.pointerEvents = 'none';
    svg.appendChild(icon.cloneNode(true));
  }
  return svg;
};