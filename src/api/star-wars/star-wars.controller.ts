import { r } from 'rukia-core-hapi';
import StarWarsBusiness from './star-wars.business';
import { listPeople } from './star-wars.schema';

export default class StarWarsController {

  private business: StarWarsBusiness = new StarWarsBusiness();

  async listPeople({ query }: r<typeof listPeople>, _h: any) {
    try {
      const { data: { results, ...meta } } = await this.business.listPeople({ query });
      return { results, meta };
    } catch (error) {
      return { error };
    }
  }

  async readPeople({ params }: any, _h: any) {
    try {
      const { data: { results, ...meta } } = await this.business.readPeople({ params });
      return { results, meta };
    } catch (error) {
      return { error };
    }
  }
}