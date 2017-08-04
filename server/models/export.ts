import * as moment from 'moment';
import 'moment/locale/fr';

import { formatNumber, getFinanceNumber } from './numbers';
import { currencies } from './currencies';
import { IContract } from './contract';
import { IContact } from './contact';

export function exportContract(contract: IContract): object {
  let payoffAmount = getFinanceNumber(
    (contract.loan.amount * contract.loan.interest / 100) +
    contract.loan.amount
  );
  let payoffAmountCapital =
    formatNumber(Math.floor(payoffAmount)) + ' ' +
    currencies[contract.loan.currency].plural;
  return {
    borrower: getTitle(contract.borrower),
    lender: getTitle(contract.lender),
    hasGoal: contract.loan.hasGoal,
    goal: contract.loan.goal,
    hasLent: contract.loan.hasLent,
    dateLent: formatDate(contract, 'dateLent'),
    datePayOff: formatDate(contract, 'datePayOff'),
    amountToLent: contract.loan.amount,
    payoffAmountCapital: payoffAmountCapital.toUpperCase(),
  }
}

function getTitle(contact: IContact): string {
  return contact.type === 'physical' ? getPhysicalTitle(contact) : getMoralTitle(contact);
}

function getPhysicalTitle(contact: IContact): string {
  let result = contact.isMale ? 'Monsieur' : 'Madame';
  result += ' ' + contact.firstName + ' ' + contact.lastName;
  result += ' ';
  result += contact.isMale ? 'domicilié' : 'domiciliée';
  result += ' ';
  result += contact.address.line1 ? contact.address.line1 : '';
  result += contact.address.line2 ? ', ' + contact.address.line2 : '';
  result += contact.address.line3 ? ', ' + contact.address.line3 : '';
  result += contact.address.postCode ? ', ' + contact.address.postCode : '';
  result += contact.address.city ? ', ' + contact.address.city : '';
  result += contact.address.province ? ', ' + contact.address.province : '';
  result += contact.address.country ? ', ' + contact.address.country : '';
  return result;
}

function getMoralTitle(contact: IContact): string {
  return contact.reason + ' sise à ' + contact.address;
}

function formatDate(contract: IContract, key: string): string {
  moment.locale('fr');
  return moment(contract[key]).format('LL');
}
