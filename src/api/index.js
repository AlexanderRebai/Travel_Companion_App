import axios from 'axios';



export const getPlacesData = async (type, bounds) => {
    try {
        //request
        const response = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: bounds.sw.lat,
                tr_latitude: bounds.ne.lat,
                bl_longitude: bounds.sw.lng,
                tr_longitude: bounds.ne.lng,
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_API_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        });

        const { data: { data } } = response;

        return data;

    } catch (error) {
        console.log(error);
    }
}

export const getWeatherData = async ( lat, lng ) => {
    try {

        const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
            params: { lon: lng, lat: lat },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_API_KEY,
                'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
            }
        });

        return data

    } catch (error) {
        console.log(error);
    }
}
