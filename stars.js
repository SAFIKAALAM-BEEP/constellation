const skyContainer = document.getElementById('sky-container');

const constellations = [
  {
    name: 'Ursa Major',
    story: "The Great Bear - Zeus transformed a beautiful nymph into a bear to protect her, placing her among the stars.",
    stars: [
        { name: 'Dubhe', x: 15, y: 10 },
        { name: 'Merak', x: 20, y: 15 },
        { name: 'Phecda', x: 25, y: 25 },
        { name: 'Megrez', x: 30, y: 35 },
        { name: 'Alioth', x: 35, y: 40 },
        { name: 'Mizar', x: 40, y: 45 },
        { name: 'Alkaid', x: 45, y: 50 }
      ],
      lines: [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6]],
      offsetX: 5,  
      offsetY: 10  
    },
    {
      name: 'Orion',
      story: "The Hunter - A mighty hunter placed among the stars by Zeus after being killed by a scorpion.",
      stars: [
        { name: 'Betelgeuse', x: 50, y: 15 },
        { name: 'Rigel', x: 60, y: 20 },
        { name: 'Bellatrix', x: 40, y: 25 },
        { name: 'Saiph', x: 65, y: 30 },
        { name: 'Alnitak', x: 52, y: 25 },
        { name: 'Alnilam', x: 55, y: 30 },
        { name: 'Mintaka', x: 58, y: 35 }
      ],
      lines: [[0,2], [2,4], [4,5], [5,6], [6,1], [1,3]],
      offsetX: 50,  
      offsetY: 20   
    },
    {
      name: 'Scorpius',
      story: "The Scorpion - The mighty scorpion that killed Orion, placed opposite him in the sky.",
      stars: [
        { name: 'Antares', x: 75, y: 60 },
        { name: 'Shaula', x: 80, y: 70 },
        { name: 'Sargas', x: 78, y: 65 },
        { name: 'Dschubba', x: 72, y: 55 }
      ],
      lines: [[0,1], [1,2], [2,3]],
      offsetX: 30,  
      offsetY: 60  
    }
  ];

const spaceObjects = [
  { name: 'Nyan Cat', image: '🐱', x: 15, y: 25, link: 'nyan-cat' },
  { name: 'Voyager 1', image: '🛸', x: 85, y: 45, link: 'voyager-1' },
  { name: 'Pixel Spaceship', image: '🚀', x: 65, y: 75, link: 'spaceship' }
];

function createConstellationInfo(constellation) {
  const info = document.createElement('div');
  info.className = 'constellation-info';
  info.innerHTML = `<h3>${constellation.name}</h3><p>${constellation.story}</p>`;
  return info;
}

function createConstellationLines(constellation) {
  constellation.lines.forEach(([start, end]) => {
    const startStar = constellation.stars[start];
    const endStar = constellation.stars[end];
    
    const line = document.createElement('div');
    line.className = 'constellation-line';
    
    const length = Math.hypot(
      (endStar.x - startStar.x) * window.innerWidth / 100,
      (endStar.y - startStar.y) * window.innerHeight / 100
    );
    
    const angle = Math.atan2(
      (endStar.y - startStar.y) * window.innerHeight / 100,
      (endStar.x - startStar.x) * window.innerWidth / 100
    );
    
    line.style.width = `${length}px`;
    line.style.height = '1px';
    line.style.left = `${startStar.x}%`;
    line.style.top = `${startStar.y}%`;
    line.style.transform = `rotate(${angle}rad)`;
    
    skyContainer.appendChild(line);
  });
}

// Create stars and constellations
constellations.forEach((constellation, index) => {
  const constellationInfo = createConstellationInfo(constellation);
  skyContainer.appendChild(constellationInfo);
  
  constellation.stars.forEach(star => {
    const starElement = document.createElement('div');
    starElement.className = 'star';
    starElement.className = 'star constellation'; 
    starElement.style.left = `${star.x}%`;
    starElement.style.top = `${star.y}%`;
    
    const label = document.createElement('span');
    label.className = 'star-label';
    label.textContent = star.name;
    starElement.appendChild(label);
    
    starElement.addEventListener('click', () => {
      // Navigate to star's folder and its HTML page
      const starPage = `star-${star.name.toLowerCase()}.html`;
      window.location.href = starPage;
    });
    
    starElement.addEventListener('mouseover', () => {
      constellationInfo.style.display = 'block';
      constellationInfo.style.left = `${star.x}%`;
      constellationInfo.style.top = `${star.y}%`;
    });
    
    starElement.addEventListener('mouseout', () => {
      constellationInfo.style.display = 'none';
    });
    
    skyContainer.appendChild(starElement);
  });
  
  createConstellationLines(constellation);
});

// Create space objects
spaceObjects.forEach(object => {
  const element = document.createElement('div');
  element.className = 'space-object';
  element.innerHTML = object.image;
  element.style.left = `${object.x}%`;
  element.style.top = `${object.y}%`;
  
  element.addEventListener('click', () => {
    // Link to space object's page
    window.location.href = `${object.link}.html`;
  });
  
  skyContainer.appendChild(element);
});

function updateBackground() {
  const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  let backgroundColor;
  
  if (scrollPercent < 0.3) {
    backgroundColor = '#1a237e'; // Dark blue
  } else if (scrollPercent < 0.6) {
    backgroundColor = '#4a148c'; // Deep purple
  } else {
    backgroundColor = '#000000'; // Black
  }
  
  skyContainer.style.backgroundColor = backgroundColor;
}

window.addEventListener('scroll', updateBackground);
updateBackground();


function createRandomStars(numStars) {
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      const randomX = Math.random() * 250;  
      const randomY = Math.random() * 250;  
      
      star.style.left = `${randomX}%`;
      star.style.top = `${randomY}%`;
      
      const randomSize = Math.random() * 3 + 1; 
      star.style.width = `${randomSize}px`;
      star.style.height = `${randomSize}px`;
      star.style.opacity = Math.random() * 0.5 + 0.5; 
  
     
      const randomDuration = Math.random() * 2 + 1; 
      star.style.animationDuration = `${randomDuration}s`;
      
      skyContainer.appendChild(star);
    }
  }

createRandomStars(1000);
