import { randomBytes } from "node:crypto";
class OTPService {
  #generator;
  constructor() {}
  static generateOTP(): string {
    let digitRange = 9;
    let N = 6;
    let otpArray = [];

    //populate otpArray with random values form 0 through 9(inclusive)
    for (let i = 0; i < N; ++i) {
      otpArray.push(Math.floor(Math.random() * (digitRange + 1)));
    }

    console.log(`initial array: `, otpArray);
    //we shuffle the array to increase randomness.
    const OTP_NUM_ARRAY = OTPService.shuffle(otpArray);
    let OTP = "";

    console.log(`final_array array: `, OTP_NUM_ARRAY);

    OTP_NUM_ARRAY.forEach((digit) => {
      //convert each of the number in the array to string
      OTP += String(digit);
    });

    return OTP;
  }

  static shuffle(digits: number[]): number[] {
    let N = digits.length;

    for (let i = 0; i < N; ++i) {
      let randomNum = Math.floor(Math.random() * (i + 1));
      OTPService.swap(digits, randomNum, i);
    }

    return digits;
  }

  static swap(arr: number[], idx1: number, idx2: number): void {
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  }
}

