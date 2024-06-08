import axios from "axios";
export async function getPhotos(query, page = 1, perPage = 15) {
    const baseUrl = 'https://pixabay.com';
    const endPoint = '/api/';

    const params = new URLSearchParams({
        key: '44168099-5911f69422da676ec159a331f',
        q: `${query}`,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page: page,
        per_page: perPage
    });

    const url = `${baseUrl}${endPoint}?${params}`;

    try {
        const res = await axios(url);
        return res.data;
    } catch (error) {
        console.error(error.message);
   }
}
