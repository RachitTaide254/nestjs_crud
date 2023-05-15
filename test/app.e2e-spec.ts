import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create new user', () => {
    return request(app.getHttpServer())
      .post('/signup')
      .send({
        userName: 'phik',
        email: 'phik@gmail.com',
        password: 'phik',
      })
      .expect(201);
  });

  it('getAll user', () => {
    return request(app.getHttpServer())
      .get('/allusers')
      .expect(200);
  });

  it('should update user', () => {
    return request(app.getHttpServer())
      .put('/user/edit')
      .send({
        userName: 'phik12',
        email: 'phik@gmail.com',
      })
      .expect(200);
  });

  it('should delete user', () => {
    return request(app.getHttpServer()).delete('/user/delete').send({
      email: 'phik@gmail.com',
    })
    .expect(204);
  });
});
