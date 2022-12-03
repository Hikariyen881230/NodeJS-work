function sum(n) {
    let sum = 0;
    for (i = 0; i <= n; i++) {
        sum += i;
    }
    return sum;
}
console.log(sum(3));
console.log(sum(5));
console.log(sum(10));
console.log(sum(15));
console.log(sum(100));
