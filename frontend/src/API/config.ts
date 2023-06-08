import axios from "axios";

axios.defaults.baseURL = 'http://localhost:1337';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json'