import { getPhotos } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-function.js';
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector(".search-form");
const input = document.querySelector("input");
const loader = document.querySelector(".loader");
const loadMore = document.querySelector(".load-more");
const gallery = document.querySelector(".gallery");
const scrollToTopBtn = document.querySelector(".scrollToTopBtn")

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none";
}

function scrToTop() {
     window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

let currentPage = 1;
let query = '';

searchForm.addEventListener("submit", onSearch);
loadMore.addEventListener("click", onLoadMore);
scrollToTopBtn.addEventListener("click", scrToTop);

async function onSearch(event) {
    event.preventDefault();
    clearGallery();

    query = input.value.trim();

    if (query === "") {
        clearGallery();
        return;
    }

    currentPage = 1;
    showLoader();

    try {
        const data = await getPhotos(query, currentPage);

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
            scrollToTopBtn.style.display = "none";
        } else {
            renderGallery(data.hits);
            loadMore.style.display = "flex";
            scrollToTopBtn.style.display = "flex";
            loader.style.position = "relative";
            
            if (data.totalHits <= currentPage * 15) {
                loadMore.style.display = "none";
                scrollToTopBtn.style.display = "none";
                iziToast.info({
                title: 'End of Results',
                message: "We're sorry, but you've reached the end of search results."
            });
        }
        }
    } catch(error) {
            iziToast.error({
                title: 'Error',
                message: error.message
            });
        } finally {
        hideLoader();
        // scrollToTopBtn.style.display = "flex";
    }
}

async function onLoadMore() {
    currentPage += 1;
    showLoader();

    try {
        const data = await getPhotos(query, currentPage);
        renderGallery(data.hits);

        const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth'
        });

        if (data.totalHits <= currentPage * 15) {
            loadMore.style.display = "none";
            iziToast.info({
                title: 'End of Results',
                message: "We're sorry, but you've reached the end of search results."
            });
        }
    } catch (error) {
         iziToast.error({
                title: 'Error',
                message: error.message
            });
    } finally {
        hideLoader();
    }
}