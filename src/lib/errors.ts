export class DBException extends Error {
  readonly name = 'DBException';

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class OperationException extends Error {
  readonly name = 'OperationException';

  constructor(
    public readonly opName: string,
    message: string,
  ) {
    super(message);
  }

  toString() {
    return ` [${this.name} - ${this.opName}]: ${this.message}`;
  }
}
