//TODO: abstract out the jlet to a bower
var J = {}
var fixtureHTML = ""

afterEach(function(){
  J = {}
});

function jlet(name, callback){
  var value, called = false;
  var memoizer = function() {
    if (called) {
      return value;
    } else {
      called = true;
    }

    return value = callback();
  };

  Object.defineProperty(J, name, {
    get: function(){
      return memoizer()
    },
    set: function(){
    }
  });
}

before(function(){
  fixtureHTML = fixture.innerHTML
});


beforeEach(function(){
  var fixture = document.querySelector('#fixture');

  fixture.innerHTML = fixtureHTML
});

function inNextTick(callback){
  return function(done){
    setTimeout(function(){
      callback(done)
    })
  };
}

function asyncBeforeEach(callback){
  beforeEach(function(done){
    callback()
    setTimeout(function(){ done() })
  })
}
