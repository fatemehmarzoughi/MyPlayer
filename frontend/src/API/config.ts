import axios from 'axios';
import {SITE_URL} from 'src/assets/constants/General';

axios.defaults.baseURL = SITE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
