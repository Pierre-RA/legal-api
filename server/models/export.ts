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
  let payoff: any = contract.loan.payoff;
  payoff = payoff.map(item => {
    return {
      amount: item.amount,
      date: formatDate(item.date),
    }
  });
  return {
    borrower: getTitle(contract.borrower),
    lender: getTitle(contract.lender),
    hasGoal: contract.loan.hasGoal,
    hasSeveralPayoffs: contract.loan.payoff.length > 1,
    numberOfPayoffs: contract.loan.payoff.length,
    goal: contract.loan.goal,
    hasLent: contract.loan.hasLent,
    amountToLent: contract.loan.amount,
    currency: contract.loan.currency,
    payoff: payoff,
    payoffAmountCapital: payoffAmountCapital.toUpperCase(),
    // TODO: convert to duration
    duration: contract.loan.length,
    // TODO: convert to duration
    extendNegotiationDuration: contract.loan.extendNegotiationDate,
    // TODO: convert to duration
    silentDuration: contract.loan.silentDate,
    isSilent: (contract.loan.silentDate != null),
  };
}

function getTitle(contact: IContact): string {
  return contact.type === 'physical' ? getPhysicalTitle(contact) : getMoralTitle(contact);
}

function getPhysicalTitle(contact: IContact): string {
  let result = '';
  // result += '<w:p><w:r><w:t>';
  result += contact.isMale ? 'Monsieur' : 'Madame';
  result += ' ' + contact.firstName + ' ' + contact.lastName;
  result += ' ';
  result += contact.isMale ? 'domicilié' : 'domiciliée';
  result += ' ';
  result += getAddress(contact);
  // result += '</w:t></w:r></w:p>';
  return result;
}

function getMoralTitle(contact: IContact): string {
  let result = '';
  // result += '<w:p><w:r><w:t>';
  result += contact.reason + ' sise à ' + getAddress(contact);
  // result += '</w:t></w:r></w:p>';
  return result;
}

function getAddress(contact: IContact): string {
  let result = '';
  result += contact.address.line1 ? contact.address.line1 : '';
  result += contact.address.line2 ? ', ' + contact.address.line2 : '';
  result += contact.address.line3 ? ', ' + contact.address.line3 : '';
  result += contact.address.postCode ? ', ' + contact.address.postCode : '';
  result += contact.address.city ? ', ' + contact.address.city : '';
  result += contact.address.province ? ', ' + contact.address.province : '';
  result += contact.address.country ? ', ' + contact.address.country : '';
  return result;
}

function formatDate(date: Date): string {
  moment.locale('fr');
  return moment(date).format('LL');
}
