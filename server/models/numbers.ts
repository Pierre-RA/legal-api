export function formatNumber(value: number): string {
  return formatMillions(value);
}

function formatDigit(value: number): string {
  const digits = [
    'zéro',
    'un',
    'deux',
    'trois',
    'quatre',
    'cinq',
    'six',
    'sept',
    'huit',
    'neuf'
  ];
  return digits[value];
}

function formatTens(value: number): string {
  const teens = [
    'dix',
    'onze',
    'douze',
    'treize',
    'quatorze',
    'quinze',
    'seize'
  ];
  const tens = [
    '',
    '',
    'vingt',
    'trente',
    'quarante',
    'cinquante',
    'soixante',
    'septante',
    'quatre-vingt',
    'nonante',
  ];
  if (value < 10) {
    return formatDigit(value);
  }
  if (value < 16) {
    return teens[value - 10];
  }
  if (value < 20) {
    return teens[0] + '-' + formatDigit(value - 10);
  }
  if (value % 10 == 0) {
    return tens[Math.floor(value / 10)];
  }
  if (value % 10 == 1) {
    return tens[Math.floor(value / 10)] + ' et un';
  }
  return tens[Math.floor(value / 10)] + '-' + formatDigit(value % 10);
}

function formatHundreds(value: number): string {
  const hundred = 'cent';
  if (value < 100) {
    return formatTens(value);
  }
  if (value == 100) {
    return hundred;
  }
  if (value < 200) {
    return hundred + ' ' + formatTens(value % 100);
  }
  return formatDigit(Math.floor(value / 100)) + ' ' + hundred + ' ' + formatTens(value % 100);
}

function formatThousands(value: number): string {
  const thousand = 'mille';
  if (value < 1000) {
    return formatHundreds(value);
  }
  if (value == 1000) {
    return thousand;
  }
  if (value < 2000) {
    return thousand + ' ' + formatHundreds(value % 1000);
  }
  return formatHundreds(Math.floor(value / 1000)) + ' ' + thousand + ' ' + formatHundreds(value % 1000);
}

function formatMillions(value: number): string {
  const million = 'million';
  if (value < 1000000) {
    return formatThousands(value);
  }
  if (value == 1000000) {
    return formatDigit(1) + ' ' + million;
  }
  return formatHundreds(Math.floor(value / 1000000)) + ' ' + million + ' ' + formatThousands(value % 10000);
}

export function getFinanceNumber(value: number): number {
  return Math.floor(value * 100) / 100;
}
