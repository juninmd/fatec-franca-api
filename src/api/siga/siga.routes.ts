import * as Hapi from '@hapi/hapi';
import * as schema from './siga.schema';

import Controller from './siga.controller';

export default async (server: Hapi.Server) => {
  const controller = new Controller();
  server.bind(controller);

  server.route([
    {
      method: 'GET',
      path: '/login',
      handler: controller.login,
      options: {
        tags: ['api'],
        validate: schema.login,
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/name',
      handler: controller.getName,
      options: {
        tags: ['api'],
      },
    },
    {
      method: 'GET',
      path: '/profile',
      handler: controller.getProfile,
      options: {
        tags: ['api'],
      },
    },
    {
      method: 'GET',
      path: '/academic-calendar',
      handler: controller.getAcademicCalendar,
      options: {
        tags: ['api'],
      },
    },
    {
      method: 'GET',
      path: '/school-grade',
      handler: controller.getSchoolGrade,
      options: {
        tags: ['api'],
      },
    },
    {
      method: 'GET',
      path: '/history',
      handler: controller.getHistory,
      options: {
        tags: ['api'],
      },
    },
    {
      method: 'GET',
      path: '/schedules',
      handler: controller.getSchedules,
      options: {
        tags: ['api'],
      },
    },
    {
      method: 'GET',
      path: '/emails',
      handler: controller.getRegisteredEmails,
      options: {
        tags: ['api'],
      },
    },
    {
      method: 'GET',
      path: '/partialgrades',
      handler: controller.getPartialGrades,
      options: {
        tags: ['api'],
      },
    },
    {
      method: 'GET',
      path: '/disciplines',
      handler: controller.getEnrolledDisciplines,
      options: {
        tags: ['api'],
      },
    },
  ]);
};