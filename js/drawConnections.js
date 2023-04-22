function drawConnection(width, angle, x, y, left){

    const neuralNetwork = document.getElementsByClassName("neural-network")[0];

    const newConnection = document.createElement("div");

    newConnection.classList.add("connection");

    if (left){
        newConnection.style.cssText = `width: ${width}%; transform: rotate(${angle}deg); transform-origin: 0% 0%; left: ${x}px; top: ${y}px;`;
    }

    else{
        newConnection.style.cssText = `width: ${width}%; transform: rotate(${angle}deg); transform-origin: 100% 100%; left: ${x}px; top: ${y}px;`;       
    }
    

    neuralNetwork.appendChild(newConnection);
}


function getPositionAtCenter(element) {
    const {top, left, width, height} = element.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2
    };
}
 
function getDistanceBetweenElements(a, b) {
   const aPosition = getPositionAtCenter(a);
   const bPosition = getPositionAtCenter(b);
 
   return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);  
}
 

function computeAngle(a, b){

    const a_rect = a.getBoundingClientRect();
    const b_rect = b.getBoundingClientRect();

    var dy = b_rect.y - a_rect.y;
    var dx = b_rect.x - a_rect.x;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
}

function widthToPercentage(width){
    // divide width by screen width * 100
    return (width / (window.innerWidth)) * 100;
}


function deleteConnections(){

    // Delete every element of class "connection"
    const connections = document.getElementsByClassName("connection");
    const numConnections = connections.length;

    for (let i = 0; i < numConnections; i++){
        connections[0].remove();
    }
}

function drawConnections(){
    
    
    deleteConnections();

    const projects = document.getElementsByClassName('project');
    const numProjects = projects.length;

    // startNode is about me
    const startNode = document.getElementById('about-me');

    // loop through all projects
    for (let i = 0; i < numProjects; i++){
        // get the current node
        const currentNode = projects[i];
    
        const width = widthToPercentage(getDistanceBetweenElements(startNode, currentNode));
        const theta = computeAngle(startNode, currentNode);

        drawConnection(width, theta, getPositionAtCenter(startNode).x, getPositionAtCenter(startNode).y, true);
    }


    // startNode is about me
    const endNode = document.getElementById('contact')

    // loop through all projects
    for (let i = 0; i < numProjects; i++){
        // get the current node
        const currentNode = projects[i];
    
        const width = widthToPercentage(getDistanceBetweenElements(endNode, currentNode));
        const theta = computeAngle(currentNode, endNode);

        drawConnection(width, theta, getPositionAtCenter(currentNode).x, getPositionAtCenter(endNode).y, false);
    }

    

}



window.addEventListener('load', drawConnections);

window.addEventListener('resize', drawConnections);
