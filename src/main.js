import { getPhotos } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector(".search-form");
const input = document.querySelector("input");
const loader = document.querySelector(".loader");

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none";
}



searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = input.value.trim();

    if (query === "") {
        clearGallery();
        return;
    }

    showLoader();

    getPhotos(query)
        .then(images => {
            if (images.length === 0) {
                clearGallery();
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    messageColor: '#FAFAFB',
                    backgroundColor: '#EF4040',
                    iconColor: '#FAFAFB',
                    position: 'topRight'
                });
                input.value = "";
            } else {
                renderGallery(images);
                input.value = "";
            }
        })
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: error.message
            });
        })
        .finally(() => {
        hideLoader();
    });
});