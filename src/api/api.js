import axios from 'axios';

const API = {
  getRoutes : async function() {
    try{
      let res = await axios.get('https://gtfs-mdc.herokuapp.com/routes/find/all');
      return res.data;
    }
    catch {
      console.log("bleh");
    }
  }
}

export default API;