export class User {
  id: string;
  name: string;
  mail: string;
  phone: number | string;
  src: string;
  status: string;
  lastLogin: Date;
  pathDefaultImg: string = 'https://firebasestorage.googleapis.com/v0/b/makerchat-81f61.appspot.com/o/user.png?alt=media&token=34047003-90af-4a64-b80a-0a42a6533b2b'

  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.name = obj ? obj.name : '';
    this.mail = obj ? obj.mail : '';
    this.phone = obj ? obj.phone : '';
    this.src = obj ? obj.src : this.pathDefaultImg;
    this.status = obj ? obj.status : '';
    this.lastLogin = obj ? obj.lastLogin : new Date();
  }

  toJson() {
    return {
      name: this.name,
      mail: this.mail,
      phone: this.phone,
      src: this.src,
      status: this.status,
      lastLogin: this.lastLogin,
    };
  }
  getUserId() {
    return this.id;
  }
}
