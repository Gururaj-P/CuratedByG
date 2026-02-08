document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.getElementById('galleryGrid');

  // ----- ARTWORK DATA -----
  const artworks = [];

  // Blender images (38 items)
  for (let i = 1; i <= 38; i++) {
    const num = String(i).padStart(2, '0');

    artworks.push({
        title: `Blender Artwork ${i}`,
        thumb: `../assets/images/blender/thumb/BlenderArtThumb${num}.webp`,
        large: `../assets/images/blender/large/BlenderArtLarge${num}.webp`,
        category: 'blender'
    });
  }


  // Example paintings (you can expand this later)
  for (let i = 1; i <= 2; i++) {
    const num = String(i).padStart(2, '0');

    artworks.push({
        title: `Painting ${i}`,
        thumb: `../assets/images/paintings/thumb/PaintingThumb${num}.webp`,
        large: `../assets/images/paintings/large/PaintingLarge${num}.webp`,
        category: 'painting'
    });
  }


  // ----- CREATE GALLERY ITEMS -----
  artworks.forEach(art => {
    const item = document.createElement('div');
    item.classList.add('gallery-item');
    item.dataset.category = art.category;

    item.innerHTML = `
      <img 
        src="${art.thumb}" 
        data-large="${art.large}"
        alt="${art.title}" 
        loading="lazy"
      >
      <div class="gallery-caption">${art.title}</div>
    `;

    galleryGrid.appendChild(item);
  });

  // ----- FILTERING LOGIC -----
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      document.querySelectorAll('.gallery-item').forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ----- LIGHTBOX LOGIC -----
// ----- LIGHTBOX LOGIC WITH NAVIGATION -----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

let currentIndex = 0;
let galleryImages = [];

function openLightbox(index) {
  currentIndex = index;

  const img = galleryImages[currentIndex];

  const largeSrc = img.getAttribute('data-large');
  const title = img.getAttribute('alt');

  lightboxImg.src = largeSrc;
  lightboxCaption.textContent = title;

  lightbox.classList.add('active');
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  openLightbox(currentIndex);
}

function showPrev() {
  currentIndex =
    (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  openLightbox(currentIndex);
}

// Collect images AFTER they are added to DOM
function getVisibleImages() {
  return Array.from(
    document.querySelectorAll('.gallery-item')
  )
    .filter(item => item.style.display !== 'none')
    .map(item => item.querySelector('img'));
}

// Attach click events dynamically
document.addEventListener('click', function (e) {
  if (e.target.matches('.gallery-item img')) {
    galleryImages = getVisibleImages();

    const clickedImg = e.target;
    const index = galleryImages.indexOf(clickedImg);

    openLightbox(index);
  }
});

nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') lightbox.classList.remove('active');
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});

});
