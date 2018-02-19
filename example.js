const patternMatcher = require('./src/pattern-matcher');

const match = patternMatcher.match;
const type = patternMatcher.type;

const safeAddingFunc = (value, increment) => 
    match(value)
        .case(type.number, x => x + increment)
        .default(() => increment)
        .get();

console.log(safeAddingFunc(2, 4)); // 6
console.log(safeAddingFunc(new Date(), 4)); // 4
console.log(safeAddingFunc(undefined, 4)); // 4
