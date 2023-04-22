// targeting the svg itself
const svg = document.querySelector("svg");

// variable for the namespace 
const svgns = "http://www.w3.org/2000/svg";


function addLine(start_element, end_element){

    const startPos = getPositionAtCenter(start_element);
    const endPos = getPositionAtCenter(end_element); 

    let newLine = document.createElementNS(svgns, "line");
    newLine.setAttribute("class", "connection");
    newLine.setAttribute("x1", startPos.x);
    newLine.setAttribute("y1", startPos.y);
    newLine.setAttribute("x2", endPos.x);
    newLine.setAttribute("y2", endPos.y);
    newLine.setAttribute("stroke", "white");
    newLine.setAttribute("stroke-width", "5");

    svg.appendChild(newLine);
}

function deleteConnections(){

  // Delete every element of class "connection"
  const connections = document.getElementsByClassName("connection");
  const numConnections = connections.length;

  for (let i = 0; i < numConnections; i++){
      connections[0].remove();
  }
}

function getPositionAtCenter(element) {
    const {top, left, width, height} = element.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2
    };
}


function drawConnections(){


  deleteConnections();

  // startNode is about me
  const startNode = document.getElementById('about-me');

  const projects = document.getElementsByClassName('project');

  const endNode = document.getElementById('contact');


  for (let i = 0; i < projects.length; i++) {
    addLine(startNode, projects[i]);
    addLine(projects[i], endNode );

  }
}

window.addEventListener('load', drawConnections);

window.addEventListener('resize', drawConnections);

