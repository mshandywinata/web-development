// let a = 100; // number
// let b = 'Coffee'; // string
// let c = [true, false, false]; // array of booleans
// let d = {age: number}; // any, value invalid
// let e = [3]; // array of numbers
// let f; // any, since value is undefined
// let g = []; // array any, value is undefined

// collection of constant
const enum PaymentMethod {
  CARD = "CARD",
  BANK_TRANSFER = "BANK_TRANSFER",
  CRYPTO = "CRYPTO",
}

const enum PaymentStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

// describing shape of object
interface CreatePaymentDto {
  amount: number;
  currency: string;
  method: PaymentMethod;
}

interface Payment extends CreatePaymentDto {
  id: string;
  status: PaymentStatus;
  createdAt: Date;
}

declare function processPayment(data: CreatePaymentDto): Payment;
