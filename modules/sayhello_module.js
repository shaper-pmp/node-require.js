exports.greeting = "Hello!";

exports.sayhello = function(greeting) {
  greeting = greeting || exports.greeting;
  alert(greeting);
};
