interface IUser {
  id: number,
  name: string,
  password: string,
}

export class MockupUsers {
  userBase: IUser[];

  constructor() {
    this.userBase = [];
    this.userBase.push({
      id: 1,
      name: 'admin',
      password: 'simple-password-for-test-purpose-17-07',
    });
    this.userBase.push({
      id: 2,
      name: 'test',
      password: 'simple-test-password-2017',
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
