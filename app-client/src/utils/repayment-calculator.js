// This simple method rounds a number to two decimal places.
function round(x) {
  return Math.round(x * 100) / 100;
}
export default class RepaymentCalculator {
  constructor(principal, interest, payments) {
    this.principal = principal;
    this.interest = interest;
    this.payments = payments;
  }
  calculate() {
    // Get the user's input from the form. Assume it is all valid.
    // Convert interest from a percentage to a decimal, and convert from
    // an annual rate to a monthly rate. Convert payment period in years
    // to the number of monthly payments.
    //   var principal = document.loandata.principal.value;
    //   var interest = document.loandata.interest.value / 100 / 12;
    //   var payments = document.loandata.years.value * 12;

    // Now compute the monthly payment figure, using esoteric math.
    var x = Math.pow(1 + this.interest, this.payments);
    this.monthly = (this.principal * x * this.interest) / (x - 1);

    // Check that the result is a finite number. If so, display the results.
    if (
      !isNaN(this.monthly) &&
      this.monthly !== Number.POSITIVE_INFINITY &&
      this.monthly !== Number.NEGATIVE_INFINITY
    ) {
      return {
        payment: round(this.monthly),
        total: round(this.monthly * this.payments),
        totalinterest: round(this.monthly * this.payments - this.principal),
      };
    }
    // Otherwise, the user's input was probably invalid, so don't
    return {
      payment: '',
      total: '',
      totalinterest: '',
    };
  }
  breakdown() {
    let equity = 0;
    for (let p = 1; p <= this.payments; p++) {
      // For each payment, figure out how much is interest
      let thisMonthsInterest = (this.principal - equity) * this.interest;
      equity += this.monthly - thisMonthsInterest; // The rest goes to equity
    }

    let bal = this.principal;
    for (let p = 1; p <= this.payments; p++) {
      let thisMonthsInterest = bal * this.interest;
      bal -= this.monthly - thisMonthsInterest; // The rest goes to equity
    }
  }
}
