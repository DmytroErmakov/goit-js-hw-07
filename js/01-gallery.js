import { galleryItems } from "./gallery-items.js";
// Change code below this line
const imageContainer = document.querySelector(".gallery");
const imageMarkup = createGaleryImgMarkup(galleryItems);

imageContainer.insertAdjacentHTML("beforeend", imageMarkup);

imageContainer.addEventListener("click", onImageContainerClick);

function createGaleryImgMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li> `;
    })
    .join("");
}

function onImageContainerClick(event) {
  event.preventDefault();
  const isGalleryImageEl = event.target.classList.contains("gallery__image");
  if (!isGalleryImageEl) {
    return;
  }

  // console.log(event.target.dataset.source);

  const instance = basicLightbox.create(
    `
    <div class="modal">
    <img src="${event.target.dataset.source}" width="1400" height="900">
    </div>
`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscKeyPress);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onEscKeyPress);
      },
    }
  );

  instance.show();

  function onEscKeyPress(event) {
    const ESC_KEY_CODE = "Escape";
    const isEscKey = event.code === ESC_KEY_CODE;
    if (!isEscKey) return;
    instance.close();
  }

  
}
