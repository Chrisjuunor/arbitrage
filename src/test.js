//test for arbitrage with natural numbers
let freenums = [];

for (let i = 0, t = 10; i < t; i++) {
  freenums.push(Math.floor(Math.random() * t) + 1);
}
console.log(freenums);

function checkAb() {
  for (let i = 0; i < freenums.length - 2; i++) {
    for (let j = i + 1; j < freenums.length - 1; j++) {
      for (let k = j + 1; k < freenums.length; k++) {
        const a = freenums[i];
        const b = freenums[j];
        const c = freenums[k];

        const check1 = a / b;
        const check2 = b / c;
        const check3 = c / a;

        if (b < check1 * check2) {
          const profit = check1 * check2 - b;
          console.log(
            `arbitrage possible. possible profit ${profit} with starting at ${b}`
          );
        } else if (c < check2 * check3) {
          const profit = check2 * check3 - c;
          console.log(
            `arbitrage possible. possible profit ${profit} starting at ${c}`
          );
        } else if (a < check1 * check3) {
          const profit = check1 * check3 - a;
          console.log(
            `arbitrage possible. possible profit ${profit} starting at ${a}`
          );
        } else {
          console.log("No arbitrage opportunity");
        }
      }
    }
  }
}

checkAb();
