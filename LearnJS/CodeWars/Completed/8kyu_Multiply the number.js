// https://www.codewars.com/kata/5708f682c69b48047b000e07/train/javascript

debugger
function multiply(number){
  let result = number * 5;

  while ((number / 10) > 1) {
    number /= 10;
    result *= 5;
  }

  return result
}

multiply(10) // output 250