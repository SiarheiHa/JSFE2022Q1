export default class Api {
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  great() {
    console.log(this.message);
  }
}
