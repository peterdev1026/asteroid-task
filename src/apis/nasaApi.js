import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.nasa.gov/neo/rest/v1',

});

/*
Za podatke o asteroidima koristite public NASA API. Primer:
https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-12-30&end_date=2018-01-
06&api_key=x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2
Za validaciju ovog poziva koristimo vec generisan api_key:
'x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2'

import axios from 'axios';

const KEY = 'x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2';

*/