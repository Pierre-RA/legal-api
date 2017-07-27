export class Contract {
  borrower: Person;
  lender: Person;
  loan: Loan;

  isSound(): boolean {
    return this.borrower.isSound() &&
      this.lender.isSound() &&
      this.loan.isSound();
  }

  export(): object {
    console.log(
      this.loan.hasGoal + ' ' + this.loan.goal
    );
    return {
      borrower: this.borrower.getTitle(),
      lender: this.lender.getTitle(),
      hasGoal: this.loan.hasGoal,
      goal: this.loan.goal,
      hasLent: this.loan.hasLent,
      dateLent: this.loan.formatDate("dateLent")
    }
  }
}

export class Loan {
  currency: string;
  amount: number;
  interest: number;
  goal: string;
  hasGoal: boolean;
  hasLent: boolean;
  dateLent: Date;

  constructor(currency: string, amount: number, interest: number, goal?: string) {
    this.currency = currency;
    this.amount = amount;
    this.interest = interest;
    this.hasGoal = false;
    if (goal) {
      this.goal = goal;
      this.hasGoal = true;
    }
  }

  // TODO: use moment for dateLent
  formatDate(key: string) {
    if (key == "dateLent") {
      return this.dateLent
    }
  }

  isSound(): boolean {
    return true;
  }
}

interface Person {
  getTitle(): string;
  getAddress(): string;
  isSound(): boolean;
}

export class PhysicalPerson implements Person {
  firstName: string;
  lastName: string;
  isMale: boolean;
  address: string;

  constructor(firstName: string, lastName: string, isMale: boolean, address: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.isMale = isMale;
    this.address = address;
  }

  getCivility(): string {
    if (this.isMale) {
      return "Monsieur";
    }
    return "Madame";
  }

  getAddressPrefix(): string {
    if (this.isMale) {
      return "domicilié";
    }
    return "domiciliée";
  }

  getTitle(): string {
    return this.getCivility() + ' ' +
      this.firstName + ' ' + this.lastName + ' ' +
      this.getAddressPrefix() + ' ' + this.address;
  }

  getAddress(): string {
    return this.address;
  }

  isSound(): boolean {
    return true;
  }
}

export class MoralPerson implements Person {
  reason: string;
  address: string;

  constructor(reason: string, address: string) {
    this.reason = reason;
    this.address = address;
  }

  getTitle(): string {
    return this.reason + ' sise à ' + this.address;
  }

  getAddress(): string {
    return this.address;
  }

  isSound(): boolean {
    return true;
  }
}

export class Address {
  line1: string;
  line2: string;
  line3: string;
  postCode: string;
  city: string;
  province: string;
  country: string;
}
