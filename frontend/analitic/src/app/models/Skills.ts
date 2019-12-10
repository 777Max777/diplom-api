export class Skills {
  public name: string;
  public value: number;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = +value;
  }
}
