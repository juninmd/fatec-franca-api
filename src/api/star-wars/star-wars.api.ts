import axios from 'axios';

export default class StarWarsApi {

  listPeople({ page }) {
    return axios({ baseURL: 'https://swapi.co/api/', url: 'people', params: { page } });
  }

  readPeople({ id }) {
    return axios({ baseURL: 'https://swapi.co/api/', url: `people/${id}` });
  }
}