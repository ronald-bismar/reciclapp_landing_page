// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollTop({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

var header = document.querySelector("header");

window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;
  if (scrollY <= 490)
    header.style.backgroundColor = "rgba(76, 175, 80," + scrollY / 300 + ")";
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});


//Community section
const slider = document.querySelector(".testimonial-slider");
const testimonialContainer = document.querySelector(".testimonial-list")
const nextBtn = slider.querySelector(".next");
const prevBtn = slider.querySelector(".prev");
const dotsContainer = slider.querySelector(".dots-container");

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let autoSlideInterval;

//* event listeners

function initApp() {
  slider.addEventListener("touchstart", handleTouchStart);
  slider.addEventListener("touchend", handleTouchEnd);
  slider.addEventListener("mouseover", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);
  nextBtn.addEventListener("click", nextTestimonial);
  prevBtn.addEventListener("click", prevTestimonial);
}

//* auto slide

function startAutoSlide() {
  autoSlideInterval = setInterval(nextTestimonial,8000); // 5s
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

//* touch navigation

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
  touchEndX = event.changedTouches[0].clientX;

  handleTouchSwipe();
}

function handleTouchSwipe() {
  const swipeThreshold = 50; // swipe sensitivity

  if (touchStartX - touchEndX > swipeThreshold) {
    nextTestimonial(); // swipe left
  } else if (touchEndX - touchStartX > swipeThreshold) {
    prevTestimonial(); // swipe right
  }
}

// function renderTestimonialTitle

function renderTestimonials(testimonialsObjects) {
    console.log(testimonialsObjects.length)

  testimonialsObjects.forEach((testimonialObject) => {
    console.log(testimonialObject.text)
    const testimonial = document.createElement("div");
    testimonial.classList.add("testimonial");
    const icon = document.createElement('i')
    icon.classList.add('bi')
    icon.classList.add('bi-quote')
    testimonial.appendChild(icon)
    const blockquote = document.createElement('blockquote')
    blockquote.textContent = testimonialObject.text
    testimonial.appendChild(blockquote)
    const userInfo = document.createElement('div')
    userInfo.classList.add('user-info')
    testimonial.appendChild(userInfo)
    const userInfoDetails = document.createElement('div')
    userInfoDetails.classList.add('user-details')
    userInfo.appendChild(userInfoDetails)
    const nameUser = document.createElement('p')
    nameUser.classList.add('name')
    nameUser.textContent = testimonialObject.author
    userInfoDetails.appendChild(nameUser)
    testimonialContainer.appendChild(testimonial)
  });

  // Añade esto al final de tu función para verificar
console.log('Elementos en el contenedor:', testimonialContainer.children.length);
}


//* dot navigation

function renderDotButtons(testimonialsObject) {
    console.log('testimonials length: '+ testimonialsObject.length)

const testimonials = slider.querySelectorAll(".testimonial");

  for (let i = 0; i < testimonials.length; i++) {
    const button = document.createElement("button");
    button.classList.add("dot");
    button.classList.toggle("active", i === currentIndex);
    button.ariaLabel = `Jump to Testimonial ${i + 1}`;
    button.addEventListener("click", () => showTestimonial(i, testimonialsObject));
    dotsContainer.appendChild(button);
  }
}

//* slide functions

function showTestimonial(index, testimonialsObject) {
    const title = testimonialsObject[index].title
    const testimonials = slider.querySelectorAll(".testimonial");
    const titleContainer = document.querySelector('.testimonial-title')
    titleContainer.textContent = title
  currentIndex = index;

  // update slide position
  testimonials.forEach((testimonial) => {
    testimonial.style.transform = `translateX(${-index * 100}%)`;
  });

  // update active dot
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function nextTestimonial() {
    const testimonials = slider.querySelectorAll(".testimonial");
  const nextIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(nextIndex, testimonialsObjects);
}

function prevTestimonial() {
    const testimonials = slider.querySelectorAll(".testimonial");
  const prevIndex =
    (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(prevIndex, testimonialsObjects);
}


class Testimonial {
  constructor(title, text, author) {
    this.title = title;
    this.text = text;
    this.author = author;
  }
}

let testimonialsObjects = [
  new Testimonial(
    "Mision",
    "Reciclapp tiene como mision promover el reciclaje y la sostenibilidad ambiental mediante una aplicacion intuitiva que eduque oriente y facilite el acceso a los recursos necesarios para desechar residuos correctamente y a reducir el impacto ambiental de los residuos por un planeta mejor.",
    "Desarrollador de Reciclapp"
  ),
  new Testimonial(
    "Vision",
    "Contribuir a un mundo mas limpio y sostenible mediante la educacion y la tecnologia, fomentando una cultura de reciclaje y reduccion de residuos que inspire a las comunidades a cuidar el medio ambiente.",
    "Desarrolladores de Reciclapp"
  ),
  new Testimonial(
    "Beneficios",
    "Reciclapp ofrece una plataforma que facilita el reciclaje y la gestion de residuos, permitiendo a los usuarios aprender sobre la correcta separacion de materiales, encontrar puntos de recoleccion cercanos y recibir recordatorios para mantener un estilo de vida sostenible. Con Reciclapp, cada accion cuenta hacia un futuro mas limpio.",
    "Ronald Bismar desarrollador de Reciclapp"
  )
];

//* initialize
renderTestimonials(testimonialsObjects)
renderDotButtons(testimonialsObjects);
startAutoSlide();
initApp();
