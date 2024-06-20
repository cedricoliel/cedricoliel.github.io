const storageRef = firebase.storage().ref('Ced/Diapos');

// Fonction pour récupérer les URLs des images
async function fetchImages() {
  try {
    const imageRefs = await storageRef.listAll();
    const urls = await Promise.all(imageRefs.items.map(item => item.getDownloadURL()));
    return urls;
  } catch (error) {
    console.error("Erreur lors de la récupération des images:", error);
  }
}

// Fonction pour mettre à jour les diapositives
async function updateSlideshow() {
  const slideshow = document.getElementById('slideshow');
  slideshow.innerHTML = ''; // Effacer le contenu précédent

  const urls = await fetchImages();
  if (urls && urls.length > 0) {
    for (const [index, url] of urls.entries()) {
      const slide = document.createElement('div');
      slide.classList.add('mySlides');
      if (index === 0) {
        slide.style.display = 'block'; // Afficher la première image
      }

      const img = new Image();
      img.src = url;
      img.onload = function() {
        if (img.naturalHeight > img.naturalWidth) {
          img.style.height = '99.5%';
        } else {
          img.style.width = '99.5%';
        }
      };
      slide.appendChild(img);
      slideshow.appendChild(slide);
    }

    // Démarrer le diaporama
    startSlideshow();
  }
}

// Fonction pour démarrer le diaporama
function startSlideshow() {
  let slideIndex = 0;
  const slides = document.getElementsByClassName('mySlides');

  function showSlide() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        updateSlideshow();
      slideIndex = 1; // Réinitialiser à la première diapositive
    }
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlide, 5000); // Changer d'image toutes les 3 secondes
  }

  showSlide();
}

// Charger les images lors du premier chargement de la page
window.onload = updateSlideshow;
