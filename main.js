// Variable List 
const slides = document.querySelectorAll('.portfolio-slide');
const navBtn = document.querySelectorAll('.nav-btn');
const projectImg = document.querySelectorAll('.project-img');
const progress = document.querySelectorAll('.progress');
const toggleContainer = document.querySelector('.full-container');
const contact = document.querySelector('.contact-btn');

// GSAP animations

// -- Animation to show portfolio slide
const tl = new TimelineLite({paused: true});
tl.fromTo('.hero', 0.5, {
  width: '100%',
  ease: Power2.inOut,
},
{
  width: '35%'
}).to('.slide-container', 1, {
  display: 'block',
  ease: Power2.inOut
});

// -- Animation for hero section on window resize
const tlResize = new TimelineLite({paused: true});
tlResize.to('.hero', 0.5, {
  width: '100%',
  ease: Power2.inOut
});

// Full screen page section navigation
function openSection(evt, section) {
  for(let x = 0; x < slides.length; x++) {
    slides[x].style.display = 'none';
  }

  for (let x = 0; x < navBtn.length; x++) {
    navBtn[x].className = navBtn[x].className.replace(" reveal", "");
  }

  document.getElementById(section).style.display = 'flex';
  evt.currentTarget.className += ' reveal';
}

// Portfolio - manually control slideshow
function displayProject(evt, identifier) {
  for (let i = 0; i < projectImg.length; i++) {
    projectImg[i].style.display = 'none';
  }

  for (let j = 0; j < progress.length; j++) {
    progress[j].style.display = 'none';
  }

  const projectLinks = document.querySelectorAll('.project-links');
  for (let i = 0; i < projectLinks.length; i++) {
    projectLinks[i].className = projectLinks[i].className.replace(" active", "");
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
    toggleContainer.classList.add('explore-mode');
    tl.play();
  });
});


// Intersection Observers
const fadeIn = document.querySelectorAll('.fade-in');

const observerOptions = {
  threshold: .6,
  rootMargin: "0px 0px -20px 0px"
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

// Toggle explore-mode class with screen size 
function checkBreakpoint() {
  if(window.innerWidth <= 1400) {
    toggleContainer.classList.remove('explore-mode');
    document.querySelector('.slide-container').style.display = 'block';
    slides.forEach(slide => {
      slide.style.display = 'flex';
    });
    tlResize.play();
  } else {
    tlResize.reverse();
    openSection();
  };
}

window.addEventListener('resize', () => {
  checkBreakpoint();
});


// Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left:" + (e.pageX - 10) + "px;");
});

document.addEventListener('click', () => {
  cursor.classList.add('expand');

  setTimeout(() => {
    cursor.classList.remove('expand');
  }, 500)
});


// Window height reset
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
