// export function checkAnswers(input, correctAnswers) {
//   let intInput = parseInt(input);

//   if (correctAnswers.includes(intInput)) {
//     console.log("correct");
//     return "correct";
//   } else {
//     console.log("incorrect");
//     return "incorrect";
//   }
// }

export function checkAnswers(input, correctAnswers) {
  let intInput = parseInt(input);
  let answerIndex = correctAnswers.indexOf(intInput);
  if (answerIndex === -1) {
    console.log("incorrect");
    return "incorrect";
  } else {
    console.log("correct");
    return answerIndex;
  }
}

export function getRandNumbers(operator, low, high) {
  var num1 = randInt(low, high);
  var num2 = randInt(low, high, true);
  var numHigh = Math.max(num1, num2);
  var numLow = Math.min(num1, num2);
  console.log("number1: " + num1);
  console.log("number2: " + num2);
  console.log("operator: " + operator);
  if (operator === "-") {
    num1 = numHigh;
    num2 = numLow;
  }
  if (operator === "/") {
    while (num2 === 0) {
      // No division by zero
      num2 = randInt(low, high);
    }
    num1 = num1 * num2;
    console.log("num1:" + num1);
  }
  return { num1, num2 };
}

function randInt(low, high, weighted = false) {
  var rndDec = Math.random();
  if (!weighted) {
    return Math.floor(rndDec * (high - low + 1) + low);
  }
  var numList = [];
  for (var i = low; i <= high; i++) {
    numList.push(i);
    for (var j = 0; j <= i; j++) {
      numList.push(i);
    }
  }
  var rndInt = numList[Math.floor(Math.random() * numList.length)];
  return rndInt;
}

export function getCorrectAnswer(oper, num1, num2) {
  switch (oper) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "x":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return;
  }
}
