function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

async function getAllRepositories(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;
  
    try {
      const response = await fetch(apiUrl);
  
      if (response.ok) {
        const repositories = await response.json();
        return repositories;
      }
  
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.error(error);
    }
}


function getNodeDistibution(numRepos) {
    let maxHeight = 4;
    
    for (let i = maxHeight; i > 0; i--) {
        let centreHeight = numRepos - i;
        if ((numRepos - centreHeight) % 2 == 0) {
            let outerHeight = (numRepos - centreHeight) / 2;
            return [outerHeight, centreHeight, outerHeight];
        }
    }
}

function findLCM(numbers) {
  	// Function to calculate the GCD using Euclid's algorithm
  	function findGCD(a, b) {
    	if (b === 0) {
      	return a;
    	}
		return findGCD(b, a % b);
	}

	// Function to calculate the LCM
	function calculateLCM(a, b) {
		return (a * b) / findGCD(a, b);
	}

	let lcm = numbers[0];

	for (let i = 1; i < numbers.length; i++) {
		lcm = calculateLCM(lcm, numbers[i]);
	}

	return lcm;
}

function nodeHover(event) {
	let index = event.srcElement.id;

	let bannerTitle = document.getElementById("info-banner-title");
	let bannerDescription = document.getElementById("info-banner-description");

	document.getElementById("info-banner").classList.add("info-anim");

	bannerTitle.innerText = titles[index];
	bannerDescription.innerText = descriptions[index];
	bannerDescription.classList.add("info-anim");
}

function nodeLeave(event) {
	let bannerTitle = document.getElementById("info-banner-title");
	let bannerDescription = document.getElementById("info-banner-description");

	document.getElementById("info-banner").classList.remove("info-anim");
	bannerDescription.classList.remove("info-anim");
	bannerTitle.innerText = "";
	bannerDescription.innerText = "";
}

function nodeClick(event) {
	let index = event.srcElement.id;
	window.open(links[index]);
}

const username = 'carlos-lorenzo';

var titles = [];
var descriptions = [];
var links = [];

getAllRepositories(username)
.then(repositories => {
	console.log(repositories);
	let currentRepo = 0;
	let nodeContainer = document.getElementById("node-container");

	let nodeDistribution = getNodeDistibution(repositories.length);

	
	
	nodeContainer.style.gridTemplateColumns = `repeat(${nodeDistribution.length}, 1fr)`;


	let numRows = findLCM(nodeDistribution);
	nodeContainer.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

	for (let i = 0; i < nodeDistribution.length; i++) {
		let row = nodeDistribution[i];
		// Your code for each iteration using `i` and `row`
		
		for (let j = 0; j < row; j++) {
			let newNode = document.createElement("div");
			newNode.className = "node";
			newNode.id = currentRepo;
			newNode.style.gridColumn = i + 1;

			let rowStart = ((numRows / row) * j) + 1;
			newNode.style.gridRowStart = rowStart;
			let rowEnd = rowStart + (numRows / row);
			newNode.style.gridRowEnd = rowEnd;
			

			let currentTitle = repositories[currentRepo].name;
			titles.push(currentTitle);

			
			let currentDescription = repositories[currentRepo].description;
			descriptions.push(currentDescription);


			newNode.addEventListener("mouseover", (event) => {
				nodeHover(event);
			});

			newNode.addEventListener("mouseleave", (event) => {
				nodeLeave(event);
			});

			if (!detectMob()) {
				let link = repositories[currentRepo].html_url;
				links.push(link);
				newNode.addEventListener("click", (event) => {
					nodeClick(event);
				})
			} 

			nodeContainer.appendChild(newNode);
			
			currentRepo += 1;
		}
	}




})









  
  