// Full screen page section navigation
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
const progress = document.querySelectorAll('.progress');

// Portfolio - manually control slideshow
function displayProject(evt, identifier) {
  for (let i = 0; i < projectImg.length; i++) {
    projectImg[i].style.display = 'none';
  }

  for (let j = 0; j < progress.length; j++) {
    progress[j].style.display = 'none';
  }

  const projectBtn = document.querySelectorAll('.project-btn');
  for (let i = 0; i < projectBtn.length; i++) {
    projectBtn[i].className = projectBtn[i].className.replace(" active", "");
  }

  document.getElementById(identifier).style.display = 'inline-block';
  evt.currentTarget.className += ' active';
  clearInterval(interval);
}

// Portfolio - autoplay slideshow
let indexValue = 0;
function slideShow() {
  for(let x = 0; x < projectImg.length; x++) {
    projectImg[x].style.display = 'none';
  }

  for(let i = 0; i < progress.length; i++) {
    progress[i].style.display = 'none';
  }

  indexValue++;
  if(indexValue > projectImg.length) {
    indexValue = 1;
  }

  if(indexValue > progress.length) {
    indexValue = 1;
  }

  projectImg[indexValue - 1].style.display = 'inline-block';
  progress[indexValue - 1].style.display = 'inline-block';
}
let interval = setInterval(slideShow, 5000);
slideShow();


navBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.full-container').classList.add('explore-mode');
  });
});


// Intersection Observers
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


// Window height reset
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
