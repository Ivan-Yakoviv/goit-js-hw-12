export function getPhotos(query) {
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

    return fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            return res.json();
        })
        .then(data => data.hits);
}
