function openSection(evt, section) {
  const slides = document.getElementsByClassName('portfolio-slide');
  for(let x = 0; x < slides.length; x++) {
    slides[x].style.opacity = '0';
  }

  for (let x = 0; x < navBtn.length; x++) {
    navBtn[x].className = navBtn[x].className.replace(" reveal", "");
  }

  document.getElementById(section).style.opacity = '1';
  document.getElementById(section).style.zIndex = '10';
  evt.currentTarget.className += ' reveal';
}

const navBtn = document.querySelectorAll('.nav-btn');
const projectImg = document.querySelectorAll('.project-img');
const projectLinks = document.querySelectorAll('.project-links');
let leftBtn = document.querySelector('.btn-left');
const rightBtn = document.querySelector('.btn-right');

function displayProject(evt, identifier) {
  for (let i = 0; i < projectImg.length; i++) {
  projectImg[i].style.opacity = '0';
  }

  const projectBtn = document.querySelectorAll('.project-btn');
  for (let i = 0; i < projectBtn.length; i++) {
    projectBtn[i].className = projectBtn[i].className.replace(" active", "");
  }

  document.getElementById(identifier).style.opacity = '1';
  evt.currentTarget.className += ' active';
}

let indexValue = 0;
function slideShow() {
  for(let x = 0; x < projectImg.length; x++) {
    projectImg[x].style.opacity = '0';
  }

  for(let i = 0; i < projectLinks.length; i++) {
    projectLinks[i].style.display = 'none';
  }

  indexValue++;
  if(indexValue > projectImg.length) {
    indexValue = 1;
  }

  if(indexValue > projectLinks.length) {
    indexValue = 1;
  }

  projectImg[indexValue - 1].style.opacity = '1';
  projectLinks[indexValue - 1].style.display = 'flex';
}
let interval = setInterval(slideShow, 5000);
slideShow();

rightBtn.addEventListener('click', () => {
  clearInterval(interval);
  slideShow(interval);
});

// function slideBack() {
  
// }

leftBtn.addEventListener('click', () => {
  clearInterval(interval);
  if(indexValue === projectLinks.item(1)) {
    leftBtn.disabled = true;
  } 

  projectImg[indexValue--].style.opacity = '1';
  projectLinks[indexValue--].style.display = 'flex';
  slideShow();
  // slideBack();
});


navBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.full-container').classList.add('explore-mode');
  });
});


const fadeIn = document.querySelectorAll('.fade-in');

const observerOptions = {
  threshold: .6,
  rootMargin: "0px 0px -40px 0px"
};

const scrollsIn = new IntersectionObserver
(function(
  entries, 
  scrollsIn
) {
  entries.forEach(entry => {
    if(!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      scrollsIn.unobserve(entry.target);
    }
  });
},
observerOptions);

fadeIn.forEach(element => {
  scrollsIn.observe(element);
});


let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
