import axios from 'axios';

//URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=c588cf34254b147499726788097390cf
//BASE DA URL: https://api.themoviedb.org/3/

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
})
export default api;