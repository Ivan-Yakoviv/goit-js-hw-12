import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");

let lightbox;

export function renderGallery(images) {
    const markup = images.map(image => createMarkup(image)).join("");
    gallery.insertAdjacentHTML('beforeend', markup);
    if (lightbox) {
        lightbox.refresh();
    } else {
        lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250, captionsData: "alt" });
        lightbox.refresh();
    }
}

function createMarkup(image) {
    return `
                <a class="link" href="${image.largeImageURL}" class="gallery-link">
                    <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
                <ul class="info">
                 <li><h3 class="info-title">Likes</h3><p class="info-text">${image.likes}</p></li>
                 <li><h3 class="info-title">Views</h3><p class="info-text">${image.views}</p></li>
                 <li><h3 class="info-title">Comments</h3><p class="info-text">${image.comments}</p></li>
                 <li><h3 class="info-title">Downloads</h3><p class="info-text">${image.downloads}</p></li>
                </ul>
                </a>
            `;
}

export function clearGallery() {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
}