## Event Loop
_Split class in groups of two or three_

1) How many threads does the browser's Javascript runtime have?
    - *Bonus*: What is a thread?

2) In what order will the colors output to the console?
```
const foo = () => {
  console.log('pink');
}
const bar = () => {
  console.log('black');
  foo();
  console.log('blue');
}
bar();
```

3) What is "the stack"?

4) For each line of code below, how many frames are on the call stack?
```
const getDate = () => new Date().toDateString()

const greet = (name, greeting) => {
  return `${greeting}, ${name}. You arrived on ${getDate()}.`
}

greet('mike', 'hello')
```

5) What is it called when the javascript engine (node or browser) exceeds the amount of frames it can handle on the stack?

6) What is the order of the colors output to the console?
```
const foo = () => {
  console.log('pink');
}
const bar = () => {
  console.log('black'); 
  setTimeout(foo, 0);
  console.log('blue');
}
bar();
```

7) What keeps track of these asynchronous webAPI's?
    - setTimeout
    - addEventListener()
    - fetch()

    a) call stack
    b) callback que
    c) event loop
    d) browser
    e) Javascript runtime

8) What is the name of the type of function (called someFunc in the example) that gets called after an asynchronous event?
```
document.querySelector('button').addEventListener('click', someFunc);
```

9) A function you've never seen before... What would you guess this function does? Is it synchronous or asynchronous?
```
request('http://www.pokemonapi.dev/info/squirtle', function(error, response, body) {  
    console.log(body);
    console.log('Done!');
});
```

10) In Javascript land, what does it mean for code to be "blocking"?

11) Which function, when executed, will not block the UI?
```
const countToOneBillionv1 = () => {
  for (let i = 0; i < 10; i++) {
    longRunningOperation(i)
  }
}

const countToOneBillionv2 = () => {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => longRunningOperation(i), 0)
  }
}
```

12) What is the order of the colors output to the console?
```
fetch('http://pokemon.dev/api/id/squirtle')
  .then(result => {
    console.log('blue')
    return fetch('http://pokemon.dev/api/id/charmander')
  })
  .then(result => {
    console.log('red')
  })

console.log('green')
```

13) What is the order of the colors output to the console?
```
const foo = async () => {
  console.log('green')
  const result = await fetch('http://pokemon.dev/api/id/squirtle')
  console.log('blue')
  const result = await fetch('http://pokemon.dev/api/id/charmander')
  console.log('red')
}
foo();
```

14) What is the order of the colors output to the console?
```
const myArray = ['red', 'blue', 'green'];
myArray.forEach(function(item) {
  console.log(item);
});

setTimeout(function() {
  console.log('orange');
}, 50);

for (let i=0; i < myArray.length; i++) {
  console.log(myArray[i]);
  if (i === (myArray.length - 1)) {
    setTimeout(function() {
      console.log('black');
    }, 0);
  }
}

```
