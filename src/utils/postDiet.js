import axios from 'axios';

async function postDiet(url, data) {
    try {
        const response = await axios.post(url, data);
        return response.data
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default postDiet;