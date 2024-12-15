const skyContainer = document.getElementById('sky-container');

// reference points to each constellation "starting star"
const ursaX = 30;
const ursaY = 50; 

const constellations = [
    {
      name: 'Ursa Major',
      story: "The Great Bear - Zeus transformed a beautiful nymph into a bear to protect her, placing her among the stars.",
      stars: [
        { name: 'Alkaid', x: 30, y: 50 }, // 0 
        { name: 'Alioth', x: ursaX + 5, y: ursaY - 5 }, // 1
        { name: 'Megrez', x: ursaX + 12, y: ursaY - 3 }, // 2
        { name: 'Dubhe', x: ursaX + 20, y: ursaY - 10 }, // 3

        { name: 'Phecda', x: ursaX + 13, y: ursaY + 3 }, // 4
        // Phecda connects to...

        { name: 'Χ', x: ursaX + 12, y: ursaY + 13 }, // 5
        // X connects to...
        { name: 'Alula Australis', x: ursaX + 10, y: ursaY + 30 }, // 6
        { name: 'Tania Australis', x: ursaX + 14, y: ursaY + 24 }, // 7
      
        { name: 'Merak', x: ursaX + 19.5, y: ursaY + 2 }, // 8
        { name: 'U', x: ursaX + 25, y: ursaY + 1 }, // 9
        
        { name: 'Musida', x: ursaX + 30, y: ursaY - 5 }, // 10
        
        // U connects to...
        { name: 'θ', x: ursaX + 24, y: ursaY + 13.5 }, // 11
        { name: 'Tania Australis', x: ursaX + 28, y: ursaY + 15} // 12
  
      ],
      lines: [[0,1], [1,2], [2,3], [2, 4], [4,5], [5,6], [5,7], [4,8], [3,8], [8,9], [3,10], [9,10], [9,11], [11,12]]
    },
    {
      name: 'Scorpius',
      story: "The Scorpion - A creature sent by Gaia to defeat Orion, now immortalized in the stars.",
      stars: [
        { name: 'Antares', x: 180, y: 150 },
        { name: 'Shaula', x: 190, y: 160 },
        { name: 'Sargas', x: 185, y: 155 },
        { name: 'Dschubba', x: 175, y: 145 },
        { name: 'Lesath', x: 195, y: 165 },
        { name: 'Graffias', x: 170, y: 140 }
      ],
      lines: [[0,1], [1,2], [2,3], [0,4], [0,5]]
    },
    {
      name: 'Sagittarius',
      story: "The Archer - Aiming an arrow towards the heart of the Scorpion.",
      stars: [
        { name: 'Kaus Australis', x: 200, y: 120 },
        { name: 'Kaus Media', x: 205, y: 125 },
        { name: 'Kaus Borealis', x: 210, y: 130 },
        { name: 'Nunki', x: 195, y: 115 },
        { name: 'Ascella', x: 210, y: 110 }
      ],
      lines: [[0,1], [1,2], [0,3], [0,4]]
    },
    {
      name: 'Cancer',
      story: "The Crab - Sent by Hera to distract Hercules during his battle.",
      stars: [
        { name: 'Altarf', x: 80, y: 120 },
        { name: 'Asellus Borealis', x: 85, y: 125 },
        { name: 'Asellus Australis', x: 90, y: 130 },
        { name: 'Acubens', x: 75, y: 115 }
      ],
      lines: [[0,1], [1,2], [0,3]]
    },
 
    {
      name: 'Leo',
      story: "The Lion - Representing the Nemean Lion defeated by Hercules.",
      stars: [
        { name: 'Regulus', x: 100, y: 70 },
        { name: 'Denebola', x: 105, y: 75 },
        { name: 'Algieba', x: 110, y: 80 },
        { name: 'Zosma', x: 95, y: 65 }
      ],
      lines: [[0,1], [1,2], [0,3]]
    }

    //Libra
  ];

const spaceObjects = [
  { name: 'Nyan Cat', image: 'media/nyan-cat.gif', x: 0, y: 25, link: 'nyan-cat', size: 300, rotate: false, has_link: true },
  { name: 'Asteroid', image: 'media/asteroid.gif', x: 5, y: 50, link: 'space', size: 300, rotate: false, has_link: true },
  { name: 'Galaga', image: 'media/galaga.gif', x: 0, y: 75, link: 'media', size: 250, rotate: false, has_link: true },
  { name: 'orca', image:'media/orca.gif', x: 75, y: 75, link: '', size: 250, rotate: false, has_link: false, description: 'Did you know orcas have starting wearing salmon as hats again? How do they keep it balanced on their heads?', description_img: 'media/orca2.gif'},
  { name: 'Voyager 1', image: 'media/voyager-1.png', x: 80, y: 30, link: 'space', size: 300, rotate: true, has_link: true },
  { name: 'DVD', image: 'media/dvd.gif', x: 80, y: 120, link: 'media', size: 300, rotate: false , has_link: true},
  { name: 'Tetris', image: 'media/tetris.gif', x: 75, y: 200, link: 'media', size: 300, rotate: false, has_link: true },
  { name: 'Book', image: 'media/book.gif', x: 5, y: 120, link: 'media', size: 300, rotate: false, has_link: true }

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

function createRandomStars(numStars) {
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    const randomX = Math.random() * 250;  
    const randomY = Math.random() * 250;  
    
    star.style.left = `${randomX}%`;
    star.style.top = `${randomY}%`;
    
    const randomSize = Math.random() * 6 + 1; 
    star.style.width = `${randomSize}px`;
    star.style.height = `${randomSize}px`;
    star.style.opacity = Math.random() * 0.5 + 0.5; 
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    star.style.backgroundColor = randomColor;

   
    const randomDuration = Math.random() * 2 + 1; 
    star.style.animationDuration = `${randomDuration}s`;
    
    skyContainer.appendChild(star);
  }
}

createRandomStars(2000);

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
      const constellationPage = `${constellation.name.toLowerCase().replace(/\s+/g, '-')}.html`;
      window.location.href = constellationPage;
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
  element.style.left = `${object.x}%`;
  element.style.top = `${object.y}%`;

  const img = document.createElement('img');
  img.src = object.image;
  img.alt = object.name;
  img.style.width = `${object.size}px`;
  img.style.height = 'auto'; 
  element.appendChild(img);

  if (object.rotate) {
    element.classList.add('rotate');
  }

  if (!object.has_link) {
    element.addEventListener('click', () => {
      showPopout(object, element);
    });
  }
  else {
    element.addEventListener('click', () => {
      window.location.href = `${object.link}.html`;
    });
  }
  skyContainer.appendChild(element);
});

// Function to show popout
function showPopout(object, element) {
  const popout = document.createElement('div');
  popout.className = 'space-object-popout';

  if (object.description) {
    const description = document.createElement('p');
    description.textContent = object.description;
    popout.appendChild(description);
  }

  if (object.description_img) {
    const descImg = document.createElement('img');
    descImg.src = object.description_img;
    descImg.alt = 'Description Image';
    popout.appendChild(descImg);
  }

  // Position the popout above the space object
  const rect = element.getBoundingClientRect();
  popout.style.left = `${rect.left + window.scrollX}px`;  
  popout.style.top = `${rect.top + window.scrollY - popout.offsetHeight}px`;

  document.body.appendChild(popout);

  // Remove the popout when clicked
  popout.addEventListener('click', () => {
    popout.remove();
  });
}

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