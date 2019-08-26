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
import { r } from 'rukia-core-hapi';
import { login } from './siga.schema';

export default class SigaController {

  async login({ query }: r<typeof login>, _h: any) {
    try {
      const { login, password } = query;
      const cookie = await getLogin({ username: login, password });
      return { cookie };
    } catch (error) {
      return { error };
    }
  }

  async getName(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const name = await getName(cookie);
      return { name };
    } catch (error) {
      return { error };
    }
  }

  async getProfile(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const profile = await getProfile(cookie);
      return { profile };
    } catch (error) {
      return { error };
    }
  }

  async getAcademicCalendar(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const academicCalendar = await getAcademicCalendar(cookie);
      return { academicCalendar };
    } catch (error) {
      return { error };
    }
  }

  async getSchoolGrade(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const schoolGrade = await getSchoolGrade(cookie);
      return { schoolGrade };
    } catch (error) {
      return { error };
    }
  }

  async getHistory(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const history = await getHistory(cookie);
      return { history };
    } catch (error) {
      return { error };
    }
  }

  async getSchedules(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const schedules = await getSchedules(cookie);
      return { schedules };
    } catch (error) {
      return { error };
    }
  }

  async getRegisteredEmails(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const email = await getRegisteredEmails(cookie);
      return { email };
    } catch (error) {
      return { error };
    }
  }

  async getPartialGrades(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const partialGrades = await getPartialGrades(cookie);
      return { partialGrades };
    } catch (error) {
      return { error };
    }
  }

  async getEnrolledDisciplines(request: any, _h: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const enrolledDisciplines = await getEnrolledDisciplines(cookie);
      return { enrolledDisciplines };
    } catch (error) {
      return { error };
    }
  }

}
