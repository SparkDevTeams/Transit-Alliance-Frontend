import axios from 'axios';
const baseUrl = 'https://gtfs-comparison.azurewebsites.net/';

const API = {
  getTripInfo: async function (body) {
    try {
      let res = await axios.post(baseUrl, body);
      return res.data;
    }
    catch (e) {
      return e;
    }
  }
}

export default API;