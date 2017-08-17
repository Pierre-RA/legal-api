import * as request from 'supertest';
import * as dotenv from 'dotenv';
import {} from 'jest';
import { expect, should } from 'chai';
import * as app from '../server/server';

dotenv.config();

describe('GET /', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/')
      .expect(200)
      .then(res => {
        expect(res.body).have.property('message');
      });
  });
});

describe('GET /users', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/')
      .expect(200)
      .then(res => {
        expect(res.body).have.property('message');
      });
  });
});

describe('login process', () => {
  it('POST /login should return 401 with no data', () => {
    return request(app)
      .post('/login')
      .expect(401)
      .then(res => {
        expect(res.body).have.property('message');
      });
  });
  it('POST /login should return 401 with wrong user', () => {
    return request(app)
      .post('/login')
      .send({
        email: 'blob@blob.com',
        password: 'blob',
      })
      .expect(401)
      .then(res => {
        expect(res.body).have.property('message');
      });
  });
  it('POST /signup complex process', () => {
    let user = {
      email: 'test@test.com',
      password: 'simple-test-password',
    };
    let id;
    let token;
    return request(app)
      .post('/signup')
      .send(user)
      .expect(401)
      .then(res => {
        let adminToken = process.env.ADMIN_TOKEN || '';
        return request(app)
          .post('/signup')
          .send(user)
          .set('Authorization', adminToken)
          .expect(200)
      })
      .then(res => {
        expect(res.body).have.property('_id');
        expect(res.body).have.property('isAdmin');
        id = res.body._id;
        return request(app)
          .post('/login')
          .send({
            email: user.email,
            password: 'wrong-password'
          })
          .expect(401)
      })
      .then(res => {
        return request(app)
          .post('/login')
          .send({
            email: user.email,
            password: user.password
          })
          .expect(200)
      })
      .then(res => {
        expect(res.body).have.property('token');
        token = res.body.token;
        return request(app)
          .get('/users/')
          .set('Authorization', 'JWT ' + token)
          .expect(200)
      })
      .then(res => {
        return request(app)
          .get('/users/count')
          .set('Authorization', 'JWT ' + token)
          .expect(200)
      })
      .then(res => {
        return request(app)
          .delete('/users/' + id)
          .set('Authorization', 'JWT ' + token)
          .expect(200);
      });
  });
});
