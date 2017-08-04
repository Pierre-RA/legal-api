interface IUser {
  id: number,
  name: string,
  password: string,
  isAdmin: boolean,
  contract: string,
}

export class MockupUsers {
  userBase: IUser[];

  constructor() {
    this.userBase = [];
    this.userBase.push({
      id: 1,
      name: 'pierre@anthillsolutions.ch',
      password: 'simple-admin-password-2017',
      isAdmin: true,
      contract: 'all-star',
    });
    this.userBase.push({
      id: 2,
      name: 'test@legal.ch',
      password: 'simple-password-2017',
      isAdmin: false,
      contract: 'simple',
    });
  }

  public findById(id: number): IUser {
    for (let user of this.userBase) {
      if (user.id == id) {
        return user;
      }
    }
    throw Error('user not found');
  }

  public findByName(name: string): IUser {
    for (let user of this.userBase) {
      if (user.name == name) {
        return user;
      }
    }
    throw Error('user not found');
  }
}
