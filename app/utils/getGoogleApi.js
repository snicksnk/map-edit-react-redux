const loadGoogleMapsAPI = require('load-google-maps-api');

export default function getGoogleApi() {
  return loadGoogleMapsAPI({
    key: 'AIzaSyAshdAQdqtRyMmG7ffJrhlB6v7GKrdKjis',
    libraries: ['places']
  });
}
