import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export async function getPhotos(query, page = 1, perPage = 15) {
    const baseUrl = 'https://pixabay.com';
    const endPoint = '/api/';

    const params = new URLSearchParams({
        key: '44168099-5911f69422da676ec159a331f',
        q: `${query}`,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: perPage
    });

    const url = `${baseUrl}${endPoint}?${params}`;

    try {
        const  data  = await axios(url);
        const totalHits = data.totalHits;
        if (totalHits === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                messageColor: '#FAFAFB',
                backgroundColor: '#EF4040',
                iconColor: '#FAFAFB',
                position: 'topRight'
            });
            return [];
        } else {
            return data.hits;
        }
    } catch (error) {
        console.error(error.message);
        iziToast.error({
                    message: 'An error occurred while fetching images. Please try again later.',
                    messageColor: '#FAFAFB',
                    backgroundColor: '#EF4040',
                    iconColor: '#FAFAFB',
                    position: 'topRight'
        });
        return [];
    }

    // return fetch(url)
    //     .then(res => {
    //         if (!res.ok) {
    //             throw new Error(res.status);
    //         }
    //         return res.json();
    //     })
    //     .then(data => data.hits);
}
