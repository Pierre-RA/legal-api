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
  let id;
  let token;
  let tokenId;
  let adminToken = process.env.ADMIN_TOKEN || '';

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

  it('POST /login should fail', () => {
    return request(app)
      .post('/login')
      .send({
        email: user.email,
        password: 'wrong-password'
      })
      .expect(401);
  });

  it('POST /login should success', () => {
    return request(app)
      .post('/login')
      .send({
        email: user.email,
        password: user.password
      })
      .expect(200)
      .then(res => {
        expect(res.body).have.property('token');
        token = res.body.token;
      });
  });

  it('GET /users', () => {
    return request(app)
      .get('/users/')
      .set('Authorization', 'JWT ' + token)
      .expect(200);
  });

  it('GET /users/count', () => {
    return request(app)
      .get('/users/count')
      .set('Authorization', 'JWT ' + token)
      .expect(200);
  });

  it('GET /token/count', () => {
    return request(app)
      .get('/tokens/count')
      .set('Authorization', 'JWT ' + token)
      .expect(200)
  });

  it('POST /tokens', () => {
    return request(app)
      .post('/tokens')
      .send({ email: process.env.TEST_EMAIL_ADDRESS })
      .set('Authorization', 'JWT ' + token)
      .expect(200)
      .then(res => {
        expect(res.body).have.property('_id');
        let tokenId = res.body._id;
      });
  });

  it('DELETE /tokens/:id', () => {
    return request(app)
      .delete('/tokens/' + id)
      .set('Authorization', 'JWT ' + token)
      .expect(200)
  });

  it('DELETE /users/:id', () => {
    return request(app)
      .delete('/users/' + id)
      .set('Authorization', 'JWT ' + token)
      .expect(200);
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

  it('should count 1', () => {
    return request(app)
      .get('/contacts/count')
      .set('Authorization', token)
      .expect(200)
      .then(res => {
        expect(res.body).have.property('count');
        expect(res.body.count).above(0);
      });
  });
  
  it('should remove contact', () => {
    return request(app)
      .delete('/contacts/' + contactId)
      .set('Authorization', token)
      .expect(200);
  });

  it('should remove user', () => {
    return request(app)
      .delete('/users/' + id)
      .set('Authorization', token)
      .expect(200);
  });
});

describe('Contracts', () => {
  let user = {
    email: 'test3@test.com',
    password: 'simple-test-password',
  };
  let contract = {
    "type": 0,
    "title": "Contrat de test",
    "borrower": {
        "phone": {
            "phone": "221234567",
            "country": "CH"
        },
        "address": {
            "country": "Suisse",
            "province": "Genève",
            "city": "Grand-Lancy",
            "postCode": "1212",
            "line3": "",
            "line2": "route du Grand-Lancy, 98",
            "line1": "C/O Camille Desplaz"
        },
        "_id": "59818d4319a8fe001c38ff6e",
        "type": "physical",
        "email": "lucien.chappuis@bluewin.ch",
        "firstName": "Lucienne",
        "lastName": "Chappuis",
        "reason": "",
        "isMale": false,
        "__v": 0
    },
    "lender": {
        "phone": {
            "phone": "799646355",
            "country": "CH"
        },
        "address": {
            "country": "Suisse",
            "province": "",
            "city": "Genève",
            "postCode": "1203",
            "line3": "",
            "line2": "",
            "line1": "rue des confessions, 15"
        },
        "_id": "59808b08de48c1001ccd9408",
        "type": "moral",
        "email": "pierre@anthillsolutions.ch",
        "firstName": "",
        "lastName": "",
        "reason": "anthillsolutions",
        "isMale": false,
        "__v": 0
    },
    "loan": {
        "amount": 27000,
        "silentDate": "2017-10-08T00:00:00.000Z",
        "extendNegotiationDate": "2017-10-01T00:00:00.000Z",
        "dateLent": "2017-09-01T00:00:00.000Z",
        "payoff": [
            {
                "amount": 12000,
                "date": "2017-09-17T00:00:00.000Z"
            },
            {
                "amount": 15000,
                "date": "2017-09-24T00:00:00.000Z",
            }
        ],
        "hasGoal": false,
        "goal": "",
        "interest": 3.4,
        "currency": "CHF"
    },
  };
  let id;
  let token;
  let contractId;
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

  it('should add contract', () => {
    return request(app)
      .post('/contracts')
      .set('Authorization', token)
      .send(contract)
      .expect(200)
      .then(res => {
        expect(res.body).have.property('_id');
        contractId = res.body._id;
      });
  });

  it('should get own contracts', () => {
    return request(app)
      .get('/contracts')
      .set('Authorization', token)
      .expect(200);
  });

  contract.title = 'Other';

  it('should update contract', () => {
    return request(app)
      .put('/contracts/' + contractId)
      .set('Authorization', token)
      .send(contract)
      .expect(200)
  });

  it('should count 1', () => {
    return request(app)
      .get('/contracts/count')
      .set('Authorization', token)
      .expect(200)
      .then(res => {
        expect(res.body).have.property('count');
        expect(res.body.count).above(0);
      });
  });
  
  it('should remove contract', () => {
    return request(app)
      .delete('/contracts/' + contractId)
      .set('Authorization', token)
      .expect(200);
  });

  it('should remove', () => {
    return request(app)
      .delete('/users/' + id)
      .set('Authorization', token)
      .expect(200);
  });
});
