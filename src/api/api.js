import axios from 'axios';

const API = {
  getRoutes : async function() {
    try{
      let res = await axios.get('https://gtfs-mdc.herokuapp.com/routes/find/all?token=582EB861-9C13-4C89-B491-15F0AFBF9F47');
      return res.data;
    }
    catch {
      console.log("bleh");
    }
  }
}

export default API;