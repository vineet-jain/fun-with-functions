// Write 3 binary function for sum, difference and multiple
function add (num1, num2) {
    return (num1 + num2);
}

function sub (num1, num2) {
    return (num1 - num2);
}

function mul (num1, num2) {
    return num1 * num2;
}
console.log('--Exercise1--output--start');
console.log(add(3, 4));
console.log(sub(3, 4));
console.log(mul(3, 4));
console.log('--Exercise1--output--end');
// write a function to return the function 
function identify(num) {
    return function() {
        return num;
    };
}
var three = identify(3);
console.log('--Exercise2--output--start');
console.log(three());
console.log(identify(3)());
console.log('--Exercise2--output--end');
//write a function addf that adds from two invocations?
// addf(3)(4) //7

function addf(first) {
    //return (second) => first + second;
    return function (second) {
        return first + second;
    };
}
console.log('--Exercise3--output--start');
console.log(addf(3)(4));
console.log('--Exercise3--output--end');

//write a function curry that takes a binary function and an argument, and returns a function that can take a second argument.
//var add3 = curry(add, 3);
//add3(4) //7
//curry (mul, 5) (6) //30

function curry(binary, first) {
    return function(second) {
        return binary(first, second);
    };
}
console.log('--Exercise4--output--start');
console.log(curry(mul, 5) (6));
console.log('--Exercise4--output--end');

//write a function curryr that takes a binary function and a second argument, and return a function that can take a first argument
// var sub3 = curryr(sub, 3);
//sub3(11) //8
//sub3(3) //0

function curryr(binary, second) {
    return function(first) {
        return binary(first, second);
    };
}
console.log('--Exercise5--output--start');
var val1 = curryr(sub, 3);
console.log(val1(11));
console.log('--Exercise5--output--end');

//write a function liftf that takes a binary function, and makes it callable with two invocations.
// var addf = lift(add);
// addf(3)(4) //7
// liftf(mul)(5)(6) //30

function liftf(binary) {
    return function (first) {
        return function (second) {
            return binary(first, second);
        };
    };
}
console.log('--Exercise6--output--start');
var addf = liftf(add);
console.log(addf(3)(4));
console.log('--Exercise6--output--end');

//without writing any new functions, show four ways to create the inc function.
//var inc = _ _ _;
//inc(5) //6
//inc(inc(5))   //7

inc1 = addf(1);
inc2 = curry(add, 1);
inc3 = curryr(add,1);
inc4 = liftf(add) (1);

console.log('--Exercise7--output--start');
console.log(inc1(1));
console.log(inc2(2));
console.log(inc3(3));
console.log(inc4(4));
console.log('--Exercise7--output--end');
// write a function Twice that takes a binary function and return a unary function and returns a unary function that passes its argument to the binary function twice.
//add(11, 11) //22
//var doubl = twice(add);
//doubl(11) //22
//var square = twice(mul);
//square(11) //121

function twice(binary) {
return function(first) {
    return binary(first, first);
    }
}
console.log('--Exercise8--output--start');
var doubl = twice(add);
console.log(doubl(11));
console.log('--Exercise8--output--end');

// write reverse, a function that reverses the argument of a binary function
// var bus = reverse(sub);
// bus(3,2); //-1

function reverse(binary) {
    return function(first, second) {
        return binary(second, first);
    }
}
console.log('--Exercise9--output--start');
var bus = reverse(sub);
console.log(bus(3,2));
console.log('--Exercise9--output--end');

// write a function composeu that takes two unary functions and return a unary function that calls them both.
// composeu(doubl, square) (5) //100
function square (num) {
    return num * num;
}

function composeu(unaryFirst, unarySecond) {
    return function(num) {
        return unarySecond(unaryFirst(num));
    }
}
console.log('--Exercise10--output--start');
console.log(composeu(doubl, square) (5));
console.log('--Exercise10--output--end');

// write a function composeb that takes two binary functions and returns a function that calls them both.
//composeb(add, mul) (2,3,7) //35

function composeb(f, g) {
    return function (a, b, c) {
        return g(f(a,b), c);
    }
}
console.log('--Exercise11--output--start');
console.log(composeb(add, mul)(2,3,7));
console.log('--Exercise11--output--end');

// write a limit function that allows a binary function to be called a limited number of times
// var add_ltd = limit(add, 1);
// add_ltd(3, 4) //7
// add_ltd(3, 5) //undefined

//TODO - implement the using my approach, define the variable in parent function

function limit(binFun, count) {
    return function(first, second) {
        if(count > 0) {
            count--;
            return binFun(first, second);
        }
    };
}
var add_ltd = limit(add, 1);
console.log('--Exercise12--output--start');
console.log(add_ltd(3, 4));
console.log(add_ltd(3, 5));
console.log('--Exercise12--output--end');

//Generator a function that returns a value from a sequence
//Write a from factory that produces a generator that will produce a series of values.
//var gen = from(0);
//gen() //0
//gen() //1
//gen() //2

function from(start) {
    return function() {
       var next = start;
       start += 1;
       return next;
    };
}
console.log('--Exercise13--output--start');
var gen = from(0);
console.log(gen());
console.log(gen());
console.log(gen());
console.log('--Exercise13--output--end');
// write a TO factory that takes a generator and an end value, and returns a generator that will produce numbers up to that limit.
// var gen = to(from(3), 5);
// gen() //3
// gen() //4
// gen() //undefined

function to(gen, end) {
    return function() {
        var value = gen();
        if(value < end) {
            return value;
        }
    };
}
console.log('--Exercise14--output--start');
var gen = to(from(3), 5);
console.log(gen());
console.log(gen());
console.log(gen());
console.log('--Exercise14--output--end');

//Write a fromTo factory that produces a generator that will produce values in a range.
// var gen = fromTo(0, 3);
// gen() //0
// gen() //1
// gen() //2
// gen() //undefined

function fromTo(start, end) {
    return to(from(start), end);
}
console.log('--Exercise15--output--start');
var gen = fromTo(0, 3);
console.log(gen());
console.log(gen());
console.log(gen());
console.log(gen());
console.log('--Exercise15--output--end');


// write an element factory that takes an array and a generator and returns a generator that will produce elements from the arrary.

// var gen = element(
//     ["a","b","c","d"],
//     fromTo(1,3)
// );

// gen() //"b"
// gen() //"c"
// gen() //undefined


function element(arr, f) {
    return function() {
        var index = f();
        if(index !== undefined) {
            return arr[index];
        }
    }
}

var gen = element(
    ["a","b","c","d"],
    fromTo(1,3)
);
console.log('--Exercise16--output--start');
console.log(gen());
console.log(gen());
console.log(gen());
console.log('--Exercise16--output--end');

// modify the element factory so that the generator argument is optional. If generator argument is optional. If a generator is not provided, then each of the elements of the array will be produced.

// var gen = element(
//     ["a","b","c","d"]
// );

// gen() //"a"
// gen() //"b"
// gen() //"c"
// gen() //"d"
// gen() // undefined

function element(arr, f) {

    if(f === undefined) {
        f = fromTo(
            0,
            arr.length
        );
    }
    return function() {
        // if(f != undefined) {
             var index = f();
            if(index !== undefined) {
                return arr[index];
            }
        // } else {
        //     // var index = arr.lenght;
        //     // return arr.splice( index, 1 )[0]
        //     //return arr.pop();
        //     return arr.shift();
        // }
       
    }
}

var gen = element(
    ["a","b","c","d"]
);

console.log('--Exercise17--output--start');
console.log(gen());
console.log(gen());
console.log(gen());
console.log(gen());
console.log(gen());
console.log('--Exercise17--output--end');

//Write a collect generator that takes a generator and an array and produce a function that will collect the results in the array.

// var array = [];
// var gen = collect(fromTo(0, 2), array);
// gen() // 0
// gen() // 1
// gen() //undefined
// array // [0,1]

function collect(gen, array) {
    return function() {
        val = gen();
        if(val !== undefined) {
            array.push(val);
        }
        return val;
    }
}

var array = [];
var gen = collect(fromTo(0, 2), array);
console.log('--Exercise18--output--start');
console.log(gen());
console.log(gen());
console.log(gen());
console.log(array);
console.log('--Exercise18--output--end');

// write a filter factory that takes a generator and a predicate and produces a generator that produces only the values approved by the predicate
// var gen = filter (
//     fromTo(0,5),
//     function third(value) {
//         return (value % 3) === 0;
//     }
// );

// gen() //0
// gen() //3
// gen() //undefined

// TODO doWhile impl
function filter(gen, pre) {
    return function () {
        //console.log(gen);
        var val;
        do {
            val = gen();
        } while (
            val !== undefined
            && !pre(val)
        );
        return val;
    }
}
// TODO recursion implementation
// function filter(gen, predicate) {
//     return function recur() {
//         var value = gen();
//         if(value === undefined || predicate(value)) {
//             return value;
//         }
//         return recur();
//     };
// }

var gen = filter (
    fromTo(0,5),
    function third(value) {
        return (value % 3) === 0;
    }
);

console.log('--Exercise19--output--start');
console.log(gen());
console.log(gen());
console.log(gen());
console.log('--Exercise19--output--end');


// Write a concat factory that takes two generators that combined the sequences.
// var gen = concat (
//     fromTo(0, 3),
//     fromTo(0, 2)
// );
// gen() //0
// gen() //1
// gen() //2
// gen() //0
// gen() //1
// gen() //undefined

function concat(f, g) {
    return function() {
        val = f();
        return val !== undefined ? val : g();
    }
}

var gen = concat (
    fromTo(0, 3),
    fromTo(0, 2)
);

console.log('--Exercise20--output--start');
console.log(gen());
console.log(gen());
console.log(gen());
console.log(gen());
console.log(gen());
console.log(gen());
console.log('--Exercise20--output--end');

// make a factory gensymf that makes generators that make unique SymbolConstructor
// var geng = gensymf("G");
// var genh = gensymf("H");
// geng() //G1
// genh() //H1
// geng() //G2
// genh() //H2

//TODO - redo
function gensymf(initials) {
    var gen = from(1);
    return function() {
       return initials + gen();
    };
}

var geng = gensymf("G");
var genh = gensymf("H");

console.log('--Exercise21--output--start');
console.log(geng());
console.log(genh());
console.log(geng());
console.log(genh());
console.log('--Exercise21--output--end');

// Make a factory factory gensymff that takes a starting value and returns a factory
// var gensymf = gensymff(1);
// var geng = gensymf("G");
// var genh = gensymf("H");
// geng() //G1
// genh() //H1
// geng() //G2
// genh() //H2

function gensymff(start) {
    return function(prefix) {
        var gen = from(start);
        return function() {
            return prefix + gen();
        }; 
    }
}

var gensymf = gensymff(1);
var geng = gensymf("G");
var genh = gensymf("H");
console.log('--Exercise22--output--start');
console.log(geng());
console.log(genh());
console.log(geng());
console.log(genh());
console.log('--Exercise22--output--end');

// Make a factory fibonaccif that returns a generator that will return the next fibonnaci number
// var fib = fibonaccif(0,1);
// fib() //0
// fin() //1
// fib() //1
// fib() //2

// TODO use switch instead of if/else, 4 ways to do thia
function fibonaccif(first, second) {
    var call=0;
    return function() {
        if(call === 0) {
            sum = first;
        } else if(call === 1) {
            sum = add(first, second);
        }
        else {
            sum = add(first, second);
            first = second;
            second = sum;   
        }
        call++
        return sum;
    }
}


var fib = fibonaccif(0,1);
console.log('--Exercise23--output--start');
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log('--Exercise23--output--end');

// write a counter constructor that returns an object counting two functions that implement an up/down counter, hiding the counter
// var object = counter();
// var up = object.up;
// var down = object.down;
// up() //1
// down() //0
// done() //-1
// up() //0 

function counter() {
    var count = 0;
    return {
        up: function() {
        return count++;
    },
    down: function() {
        return count--;
    }
    }
}

var object = counter();
var up = object.up;
var down = object.down;
console.log('--Exercise24--output--start');
console.log(up());
console.log(down());
console.log(down());
console.log(up());
console.log('--Exercise24--output--end');

// make a revocable constructor that takes a binary function, and returns an object containing an invoke function that can invoke the binary function, and a revoke function that disables the invoke function.

// var rev = revocable(add);
// var add_rev = rev.invoke;
// add_rev(3,4); //7
// rev.revoke(); 
// add_rev(5,7); //undefined

function revocable(binFun) {
    var isRevoked = false;
    return {
        invoke: function(first, second) {
            if(!isRevoked) {
                return binFun(first, second);
            } else {
                return undefined;
            }
        },
        revoke: function() {
            isRevoked = true;
        }
    }
}

console.log('--Exercise25--output--start');
var rev = revocable(add);
var add_rev = rev.invoke;
console.log(add_rev(3,4));
rev.revoke(); 
console.log(add_rev(5,7));
console.log('--Exercise25--output--end');

// write a constructor m that takes a value and an optional source string and returns them in an object.down
// JSON.stringify(m())

function m(value, source) {
    return {
        value:value,
        source: (typeof source === "string")
                ? source    
                :String(value)
    };
}

//console.log(JSON.stringify(m(3)));

// wrtie a function addm that takes two m object and returns an m object
// JSON.stringify(addm(m(3)), m(4))) // {"value":7,"source":"(3+4)"}
// JSON.stringify(addm(m(1)), m(MATH.PI, "pi"))) // {"value":4.14159,"source":"(1+pi)"}

function addm(oM1, oM2) {
    // return m(add(oM1.value, oM1.value));
    return m(
        oM1.value + oM2.value,
        "(" + oM1.source + "+"
        + oM2.source + ")"
    );
}

console.log(JSON.stringify(addm(m(3), m(4))));


// write a function liftm that takes a binary function and a string and return a function that acts on m objects.
// var addm = liftm(add, "+");
// JSON.stringify(addm(m(3), m(4))) //{"value": 7, "source": "(3+4)"}

function liftm(binFn, op) {
    return function (a, b) {
        return m(
            binFn(a.value, b.value),
            "(" + a.source + op
                + b.source + ")"
        );
    } ;
}

var addm = liftm(add, "+");
//TODO : FIX this
//console.log(JSON.stringify(addm(m(3), m(4))));

// Modify function liftm so that the functions if produces can accept arguments that are either numbers or m objects
// var addm = liftm(add, "+");
// JSON.stringify(addm(3, 4)) // {"value":7, "source":"(3+4)"}

// type of number used here
function liftm(binFn, op) {
    return function (a, b) {
        if(a instanceof m && b instanceof m) {
                return m(
                binFn(a.value, b.value),
                "(" + a.source + op
                    + b. source + ")"
            );
        } else {
            return m(
                a+ b,
                "(" + a + "+"
                + b + ")"
            );
        }
        
    } ;
}

var addm = liftm(add, "+");
console.log(JSON.stringify(addm(3, 4)));

// make a continuize that takes a unary function, and returns a function that takes a callback and an Arguments.
// sqrtc = continuize(Math.sqrt);
// sqrtc(alert, 81) //9

function continuize(uFun) {
    return function(cb, arg) {
        return cb(uFun(arg));
    }
}

sqrtc = continuize(Math.sqrt);
sqrtc(console.log, 81);



