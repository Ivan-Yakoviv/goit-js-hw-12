import { getPhotos } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-function.js';
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector(".search-form");
const input = document.querySelector("input");
const loader = document.querySelector(".loader");
const loadMore = document.querySelector(".load-more");
const gallery = document.querySelector(".gallery");

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none";
}



searchForm.addEventListener("submit", onSearch);
loadMore.addEventListener("click", loadMore);

async function onSearch(event) {
    event.preventDefault();
    
    const query = input.value.trim();

    if (query === "") {
        clearGallery();
        return;
    }

    let page = 1;
    const perPage = 15;
    showLoader();

    try {
        const data = await getPhotos(query, page, perPage);

        if (data.hits.length === 0) {
            clearGallery();
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                messageColor: '#FAFAFB',
                backgroundColor: '#EF4040',
                iconColor: '#FAFAFB',
                position: 'topRight'
            });
            input.value = "";
            loadMore.style.display = "none";
        } else {
            renderGallery(data.hits);
            loadMore.style.display = "flex";
        }
    } catch(error) {
            iziToast.error({
                title: 'Error',
                message: error.message
            });
        } finally {
        hideLoader();
    }
}

async function loadMore() {
    page += 1;
    showLoader();

    try {
        const data = await getPhotos(query, page, perPage);
        renderGallery(data.hits);
    } catch (error) {
         iziToast.error({
                title: 'Error',
                message: error.message
            });
    } finally {
        hideLoader();
    }
}