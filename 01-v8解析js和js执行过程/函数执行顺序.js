var uname = 'lgt'

function foo() {
  console.log(uname);
}

function bar() {
  var uname = 'bar'
  foo()
}

bar()
