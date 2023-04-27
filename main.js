const navBtn = document.querySelectorAll('.nav-btn');

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
