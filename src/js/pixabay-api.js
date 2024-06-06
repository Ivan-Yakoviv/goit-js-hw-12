import axios from "axios";
export async function getPhotos(query) {
    const baseUrl = 'https://pixabay.com';
    const endPoint = '/api/';

    const params = new URLSearchParams({
        key: '44168099-5911f69422da676ec159a331f',
        q: `${query}`,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true"
    });

    const url = `${baseUrl}${endPoint}?${params}`;

    try {
        const { data } = await axios(url);
        return data.hits;
    } catch (error) {
        console.error(error.message);
   }
}
