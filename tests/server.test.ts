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
  let user = {
    email: 'test@test.com',
    password: 'simple-test-password',
  };
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
  it('POST /signup should fail', () => {
    return request(app)
      .post('/signup')
      .send(user)
      .expect(401);
  });
  it('GET /tokens/count should fail', () => {
    return request(app)
      .post('/tokens/count')
      .send(user)
      .expect(401);
  });
  it('POST /signup complex process', () => {
    let id;
    let token;
    let adminToken = process.env.ADMIN_TOKEN || '';
    return request(app)
      .post('/signup')
      .send(user)
      .set('Authorization', adminToken)
      .expect(200)
      .then(res => {
        expect(res.body).have.property('user');
        expect(res.body.user).have.property('isAdmin');
        id = res.body.user._id;
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
        // GET /users/count
        return request(app)
          .get('/users/count')
          .set('Authorization', 'JWT ' + token)
          .expect(200)
      })
      .then(res => {
        // GET /tokens/count
        return request(app)
          .get('/tokens/count')
          .set('Authorization', 'JWT ' + token)
          .expect(200)
      })
      .then(res => {
        // POST /tokens
        return request(app)
          .post('/tokens')
          .set('Authorization', 'JWT ' + token)
          .expect(200)
      })
      .then(res => {
        // DELETE /tokens/:id
        expect(res.body).have.property('_id');
        let id = res.body._id;
        return request(app)
          .delete('/tokens/' + id)
          .set('Authorization', 'JWT ' + token)
          .expect(200)
      })
      .then(res => {
        // DELETE /users/:id
        return request(app)
          .delete('/users/' + id)
          .set('Authorization', 'JWT ' + token)
          .expect(200);
      });
  });
});

describe('Contacts', () => {
  let user = {
    email: 'test2@test.com',
    password: 'simple-test-password',
  };
  let contact = {
    type: 'moral',
    email: 'test@test.com',
    phone: {
        phone: "791234567",
        country: 'CH'
    },
    firstName: '',
    lastName: '',
    reason: 'test',
    isMale: false,
    address: {
        country: 'Switzerland',
        province: '',
        city: 'Geneva',
        postCode: '1200',
        line3: '',
        line2: '',
        line1: 'a place'
    },
  };
  let id;
  let token;
  let contactId;
  let adminToken = process.env.ADMIN_TOKEN || '';
  it('should register', () => {
    return request(app)
      .post('/signup')
      .send(user)
      .set('Authorization', adminToken)
      .expect(200)
      .then(res => {
        expect(res.body).have.property('user');
        expect(res.body.user).have.property('isAdmin');
        id = res.body.user._id;
    });
  });
  it('should login', () => {
    return request(app)
      .post('/login')
      .send(user)
      .expect(200)
      .then(res => {
        expect(res.body).have.property('token');
        expect(res.body).have.property('user');
        token = 'JWT ' + res.body.token;
      });
  });
  it('should add contact', () => {
    return request(app)
      .post('/contacts')
      .set('Authorization', token)
      .send(contact)
      .expect(200)
      .then(res => {
        expect(res.body).have.property('_id');
        contactId = res.body._id;
      });
  });
  it('should get own contacts', () => {
    return request(app)
      .get('/contacts')
      .set('Authorization', token)
      .expect(200);
  });
  contact.reason = 'Other';
  it('should update contact', () => {
    return request(app)
      .put('/contacts/' + contactId)
      .set('Authorization', token)
      .send(contact)
      .expect(200)
  });
  it('should remove', () => {
    return request(app)
      .delete('/users/' + id)
      .set('Authorization', token)
      .expect(200);
  });
});