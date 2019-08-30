import {
  getAcademicCalendar,
  getEnrolledDisciplines,
  getHistory,
  getName,
  getPartialGrades,
  getProfile,
  getRegisteredEmails,
  getSchedules,
  getSchoolGrade,
  login as getLogin,
} from 'fatec-franca-core-api';
import { sign } from 'jsonwebtoken';
import { r } from 'rukia-core-hapi';
import environment from '../../configs/environment.config';
import { login } from './siga.schema';

export default class SigaController {

  async login({ query }: r<typeof login>, _h: any) {
    try {
      const { login, password } = query;
      const cookie = await getLogin({ username: login, password });
      const token = sign({ cookie, login, password }, environment.plugins.auth.secret);
      return { cookie, token };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getName(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const name = await getName(cookie);
      return { name };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getProfile(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const profile = await getProfile(cookie);
      return { profile };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getAcademicCalendar(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const academicCalendar = await getAcademicCalendar(cookie);
      return { academicCalendar };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getSchoolGrade(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const schoolGrade = await getSchoolGrade(cookie);
      return { schoolGrade };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getHistory(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const history = await getHistory(cookie);
      return { history };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getSchedules(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const schedules = await getSchedules(cookie);
      return { schedules };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getRegisteredEmails(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const email = await getRegisteredEmails(cookie);
      return { email };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getPartialGrades(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const partialGrades = await getPartialGrades(cookie);
      return { partialGrades };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getEnrolledDisciplines(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const enrolledDisciplines = await getEnrolledDisciplines(cookie);
      return { enrolledDisciplines };
    } catch (error) {
      return { error: error.message };
    }
  }

}
