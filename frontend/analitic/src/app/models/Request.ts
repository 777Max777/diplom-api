export class Request {
  public queryNmae: string;
  public limit: number;

  public getQueryName(): string {
    return this.queryNmae;
  }

  public getlimit(): number {
    return this.limit;
  }
}
