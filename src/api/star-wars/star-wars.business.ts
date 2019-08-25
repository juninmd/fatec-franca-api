import StarWarsApi from './star-wars.api';

export default class StarWarsBusiness {

  private api: StarWarsApi = new StarWarsApi();

  listPeople({ query }) {
    return this.api.listPeople(query);
  }

  readPeople({ params }) {
    return this.api.readPeople(params);
  }
}