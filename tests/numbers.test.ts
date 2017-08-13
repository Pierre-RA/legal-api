import {} from 'jest';
import { expect, should } from 'chai';
import { formatNumber, getFinanceNumber } from '../server/models/numbers';

describe('formatNumber 0', () => {
  it('should give exact number', () => {
    expect(formatNumber(0)).equal('zéro');
  });
  it('should give exact number 11', () => {
    expect(formatNumber(11)).equal('onze');
  });
  it('should give exact number 18', () => {
    expect(formatNumber(18)).equal('dix-huit');
  });
  it('should give exact number 89', () => {
    expect(formatNumber(89)).equal('quatre-vingt-neuf');
  });
  it('should give exact number 100', () => {
    expect(formatNumber(100)).equal('cent');
  });
  it('should give exact number 114', () => {
    expect(formatNumber(114)).equal('cent quatorze');
  });
  it('should give exact number 1000', () => {
    expect(formatNumber(1000)).equal('mille');
  });
  it('should give exact number 1974', () => {
    expect(formatNumber(1974)).equal('mille neuf cent septante-quatre');
  });
  it('should give exact number 12428', () => {
    expect(formatNumber(12428)).equal('douze mille quatre cent vingt-huit');
  });
  it('should give exact number 241389', () => {
    expect(formatNumber(241389)).equal('deux cent quarante et un mille trois cent quatre-vingt-neuf');
  });
  it('should give exact number 1000000', () => {
    expect(formatNumber(1000000)).equal('un million');
  });
  it('should give exact number 2000040', () => {
    expect(formatNumber(2000040)).equal('deux million quarante');
  });
  it('should round nicely', () => {
    expect(getFinanceNumber(20.0)).equal(20);
  });
  it('should round nicely', () => {
    expect(getFinanceNumber(20.0234)).equal(20.02);
  });
});
