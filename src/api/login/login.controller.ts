import { getName, login as getLogin } from 'fatec-franca-core-api';
import { r } from 'rukia-core-hapi';
import { login } from './login.schema';

export default class LoginController {

  async login({ query }: r<typeof login>, _h: any) {
    try {
      const { login, password } = query;
      const cookie = await getLogin({ username: login, password });
      const student = await getName(cookie);
      return { student };
    } catch (error) {
      return { error };
    }
  }

}
