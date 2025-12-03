import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo() {
    return {
      name: 'JobPrep Backend API',
      version: '1.0.0',
      description: 'Plateforme IA de préparation aux entretiens',
      endpoints: {
        auth: '/api/auth',
        users: '/api/users',
        onboarding: '/api/onboarding',
        resume: '/api/resume',
        letters: '/api/letters',
        tests: '/api/tests',
        speech: '/api/speech',
        admin: '/api/admin',
        docs: '/api/docs',
      },
    };
  }

  getHealth() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
