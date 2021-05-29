import items from './gallery-items.js';

const refs = {
  backdrop :document.querySelector('.lightbox'),
  backdropContent: document.querySelector('.lightbox__content'),
  galleryList: document.querySelector('.gallery'),
  galleryLink:document.querySelector('gallery__link'),
  galleryImages:document.querySelector('gallery__image'),
  Overlay: document.querySelector('.lightbox__overlay'),
  backdropImage: document.querySelector('.lightbox__image'),
  backdropcloseBtn: document.querySelector('.lightbox__button'),
  overlay:document.querySelector('.lightbox__overlay'),
}

const makeGalleryCards = makeGallery(items);
refs.galleryList.insertAdjacentHTML('beforeEnd', makeGalleryCards);

function makeGallery(items) {
  return items
    .map(({ original, preview, description }) => {
      return `<li class="gallery__item">
  <a
      class="gallery__link"
  >
    <img
      class="gallery__image"
      src='${preview}'
      data-source='${original}'
      alt='${description}'
    />
  </a>
</li>`
    })
    .join('');
}

refs.galleryList.addEventListener('click',onGalleryListClic);
refs.backdropcloseBtn.addEventListener('click', onBackdropClose);
refs.overlay.addEventListener('click', onOverlayClick);
const arrayImages = [];

function onGalleryListClic(event) {
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  onBackdropOpen();
  
refs.backdropImage.src = '';
refs.backdropImage.src = event.target.dataset.source;
refs.backdropImage.alt = event.target.alt;
}

function onBackdropOpen() {
  window.addEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.add('is-open');
  }

function onBackdropClose() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.remove('is-open');
}

function onOverlayClick(eve) {
  if (eve.currentTarget === eve.target) {
    onBackdropClose();
  }
}
function onEscKeyPress(eve) {
  if (eve.code === 'Escape') {
    onBackdropClose();
  }  
}

  
// window.addEventListener('keydown', onPressArrowLeftAndRight);

// function onPressArrowLeftAndRight(event) {
//   let newIndex;
//   const currentId = arrayImages.indexOf(refs.backdropImage.src);
//   if (event.key === 'ArrowLeft') {
//     if (currentId > -1) {
//       newIndex = currentId - 1;
//       if (newIndex == -1) {
//         newIndex = arrayImages.length - 1;
//       }
//     }
//   } else if (event.key === 'ArrowRight') {
//     newIndex = currentId + 1;
//     if (currentId === (arrayImages.length)) {
//       newIndex = 0;
//     }
//   }
//   refs.backdropImage.src = arrayImages[currentId];
// }