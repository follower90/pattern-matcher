# PatternMatcher

### HOW TO INSTALL

instalation and import:

```js
const patternMatcher = require('./src/pattern-matcher');

const match = patternMatcher.match;
const type = patternMatcher.type;
```

### HOW TO USE

#### Match Array

```js
console.log(
     match([2])
        .case(type.array, val => val.map( x => x * x ))
        .case(type.instance(Date), val => 'its date: ' + val)
        .get()
);
```

#### Match Date

```js
console.log(
     match(new Date())
        .case(type.string, () => 'this is the string')
        .case(type.instance(Date), val => 'its date: ' + val)
        .get()
);
```

#### Match null

```js
console.log(
     match(null)
        .case(type.string, str => str)
        .case(type.null, () => 'Empty String')
        .get()
);
```

#### Regex match

```js
console.log(
     match('Hello, World')
        .case(type.regex(/^.*\sHell$/), val => val + ' (hell matched)')
        .case(type.regex(/^.*\sWorld$/), val => val + ' (world matched)')
        .get()
);
```


#### Match numbers

```js
console.log(
     match(12345)
        .case(type.number, val => val + ' is number')
        .default(val => val + ' is not a number')
        .get()
);
```


#### Actions switch matcher

```js
console.log(
     match({ a: 1, b: 2 })
        .case(type.custom(obj => obj.a > 1), () => 'some behavior 1')
        .case(type.custom(obj => obj.b > 1), () => 'some behavior 2')
        .case(type.custom(obj => obj.a === 0), () => 'some behavior 3')
        .default(() => 'some behavior 4')
        .get()
);
```