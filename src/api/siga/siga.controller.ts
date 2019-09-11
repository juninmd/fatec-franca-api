import { internal, unauthorized } from '@hapi/boom';
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
import { groupBy } from '../../utils';
import { login } from './siga.schema';

export default class SigaController {

  async login({ query }: r<typeof login>) {
    try {
      const { login, password } = query;
      const cookie = await getLogin({ username: login, password });
      const profile = await getProfile(cookie);
      const name = await getName(cookie);
      profile.name = name;
      const token = sign({ cookie, login, password }, environment.plugins.auth.secret);
      return { cookie, token, profile };
    } catch (error) {
      throw unauthorized(error.message);
    }
  }

  async getName(request: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const name = await getName(cookie);
      return { name };
    } catch (error) {
      throw internal(error.message);
    }
  }

  async getProfile(request: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const profile = await getProfile(cookie);
      return { profile };
    } catch (error) {
      throw internal(error.message);
    }
  }

  async getAcademicCalendar(request: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const academicCalendar = await getAcademicCalendar(cookie);
      return { academicCalendar };
    } catch (error) {
      throw internal(error.message);
    }
  }

  async getSchoolGrade(request: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const schoolGrade = await getSchoolGrade(cookie);
      return { schoolGrade };
    } catch (error) {
      throw internal(error.message);
    }
  }

  async getHistory(request: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const history = await getHistory(cookie);
      return { history };
    } catch (error) {
      throw internal(error.message);
    }
  }

  async getSchedules(request: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const schedulesRaw = await getSchedules(cookie);

      const schedules = schedulesRaw.map((s) => {
        const periods = s.periods;
        const disciplines = groupBy('code')(periods.map((x: any) => x.discipline));

        const periodsNew = Object.keys(disciplines).map((key: string) => {

          const discipline = disciplines[key][0];

          const hours = s.periods.filter(x => x.discipline.code === discipline.code)
            .sort((q, e) => q.startAt.getTime() - e.startAt.getTime());

          return {
            startAt: hours[0].startAt,
            endAt: hours[hours.length - 1].endAt,
            discipline: {
              code: discipline.code,
              name: discipline.name,
              teacherName: discipline.teacherName,
              classroomCode: discipline.classroomCode,
            },
          };
        });

        return {
          weekday: s.weekday,
          periods: periodsNew,
        };
      });

      return { schedules };
    } catch (error) {
      throw internal(error.message);
    }
  }

  async getRegisteredEmails(request: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const email = await getRegisteredEmails(cookie);
      return { email };
    } catch (error) {
      throw internal(error.message);
    }
  }

  async getPartialGrades(request: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const partialGrades = await getPartialGrades(cookie);
      return { partialGrades };
    } catch (error) {
      throw internal(error.message);
    }
  }

  async getEnrolledDisciplines(request: any) {
    try {
      const cookie = request.auth.credentials.cookie;
      const enrolledDisciplines = await getEnrolledDisciplines(cookie);
      return { enrolledDisciplines };
    } catch (error) {
      throw internal(error.message);
    }
  }

}
