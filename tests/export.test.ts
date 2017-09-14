import * as moment from 'moment';
import 'moment/locale/fr';

import {} from 'jest';
import { expect, should } from 'chai';
import { IContract } from '../server/models/contract';
import {
  exportContract,
  formatDate,
  getAddress,
  getMoralTitle,
  getPhysicalTitle,
  getTitle,
} from '../server/models/export';

let date = new Date('2017-12-01');

describe('Test export', () => {
  describe('formatDate', () => {
    it('should format date in French', () => {
      expect(formatDate(date)).equal('1 décembre 2017');
    });
  });

  describe('getAddress', () => {
    it('should getAddress', () => {
      expect(getAddress(contact))
        .equal('C/O Camille Desplaz, route du Grand-Lancy, 98, 1212, Grand-Lancy, Genève, Suisse');
    });
  });
  
  describe('getMoralTitle', () => {
    it('should get moral title', () => {
      expect(getMoralTitle(moral))
        .equal('anthillsolutions sise à rue des confessions, 15, 1203, Genève, Suisse');
    });
  });
  
  describe('getPhysicalTitle', () => {
    it('should get physical title', () => {
      expect(getPhysicalTitle(contact))
        .equal('Monsieur Lucien Chappuis domicilié C/O Camille Desplaz, route du Grand-Lancy, 98, 1212, Grand-Lancy, Genève, Suisse');
    });
  });
  
  describe('getTitle', () => {
    it('should get title', () => {
      expect(getTitle(contact))
      .equal('Monsieur Lucien Chappuis domicilié C/O Camille Desplaz, route du Grand-Lancy, 98, 1212, Grand-Lancy, Genève, Suisse');
    });
  });

  // TODO: make it right  
  // describe('exportContract', () => {
  //   it('should export', () => {
  //     expect(exportContract(contract))
  //       .deep.equal(exported);
  //   });
  // });
});

let contact = {
  "type": "physical",
  "email": "lucien.chappuis@bluewin.ch",
  "phone": "+41221234567",
  "firstName": "Lucien",
  "lastName": "Chappuis",
  "reason": "",
  "gender": "male",
  "__v": 0,
  "_id": "59818d4319a8fe001c38ff6e",
  "address": {
    "country": "Suisse",
    "province": "Genève",
    "city": "Grand-Lancy",
    "postCode": "1212",
    "line3": "",
    "line2": "route du Grand-Lancy, 98",
    "line1": "C/O Camille Desplaz"
  }
};

let moral = {
  "type": "moral",
  "email": "pierre@anthillsolutions.ch",
  "phone": "+41799646355",
  "firstName": "",
  "lastName": "",
  "reason": "anthillsolutions",
  "isMale": false,
  "__v": 0,
  "_id": "59808b08de48c1001ccd9408",
  "address": {
    "line1": "rue des confessions, 15",
    "line2": "",
    "line3": "",
    "postCode": "1203",
    "city": "Genève",
    "province": "",
    "country": "Suisse"
  }
};

let contract = {
  "_id": "59849e9a6dea17001c02f01e",
  "type": 0,
  "title": "Contrat de test",
  "borrower": {
    "type": "physical",
    "email": "lucien.chappuis@bluewin.ch",
    "phone": "+41221234567",
    "firstName": "Lucien",
    "lastName": "Chappuis",
    "reason": "",
    "gender": "male",
    "__v": 0,
    "_id": "59818d4319a8fe001c38ff6e",
    "address": {
      "country": "Suisse",
      "province": "Genève",
      "city": "Grand-Lancy",
      "postCode": "1212",
      "line3": "",
      "line2": "route du Grand-Lancy, 98",
      "line1": "C/O Camille Desplaz"
    }
  },
  "lender": {
    "type": "moral",
    "email": "pierre@anthillsolutions.ch",
    "phone": "+41799646355",
    "firstName": "",
    "lastName": "",
    "reason": "anthillsolutions",
    "isMale": false,
    "__v": 0,
    "_id": "59808b08de48c1001ccd9408",
    "address": {
      "line1": "rue des confessions, 15",
      "line2": "",
      "line3": "",
      "postCode": "1203",
      "city": "Genève",
      "province": "",
      "country": "Suisse"
    }
  },
  "__v": 0,
  "loan": {
    "amount": 27000,
    "hasGoal": false,
    "goal": "",
    "interest": 3.4,
    "currency": "CHF",
    "payoff": [
      {
        "amount": 12000,
        "date": "2017-08-19T00:00:00.000Z",
        "_id": "598c57453e2d16001c7a417e"
      },
      {
        "amount": 15000,
        "date": "2017-08-27T00:00:00.000Z",
        "_id": "598c57453e2d16001c7a417d"
      }
    ],
    "hasLent": false,
    "dateLent": "2017-08-27T00:00:00.000Z",
    "length": "2017-08-27T00:00:00.000Z",
    "extendNegotiationDate": "2017-08-27T00:00:00.000Z",
    "silentDate": "2017-08-27T00:00:00.000Z"
  },
  "date": "2017-08-27T00:00:00.000Z",
  "place": "Geneva"
};

let exported = {
  "borrower": "Monsieur Lucien Chappuis domicilié C/O Camille Desplaz, route du Grand-Lancy, 98, 1212, Grand-Lancy, Genève, Suisse",
  "lender": "anthillsolutions sise à rue des confessions, 15, 1203, Genève, Suisse",
  "hasGoal": false,
  "hasSeveralPayoffs": true,
  "numberOfPayoffs": 2,
  "goal": "",
  "amountToLent": 27000,
  "currency": "CHF",
  "currencyZone": "Suisse",
  "interest": 3.4,
  "hasInterest": true,
  "payoff": [
      {
          "amount": 12000,
          "date": "19 août 2017"
      },
      {
          "amount": 15000,
          "date": "27 août 2017"
      }
  ],
  "payoffAmountCapital": "VINGT-SEPT MILLE NEUF CENT DIX-HUIT FRANCS",
  "dateLent": "Invalid date",
  "duration": "13 jours",
  "extendNegotiationDuration": "13 jours",
  "silentDuration": "13 jours",
  "isSilent": false
};