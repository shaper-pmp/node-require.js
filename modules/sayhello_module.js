exports.greeting = "Hello!";

exports.sayhello = function(greeting) {
  greeting = greeting || exports.greeting;
  alert(greeting);
};

/*Break module to test error-handling: niblets!=.5*/
