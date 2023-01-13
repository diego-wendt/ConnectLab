export class CustomError extends Error {
  message: string;
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.message = message;
    this.code = code;
  }
}

// export class UserNotFoundError extends UserError {
//     message: string
//     code: number

//     constructor() {
//       super(message)
//       this.message = message
//       this.code = code
//     }
//   }
