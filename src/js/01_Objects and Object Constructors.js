/**
 * How to write an object constructor and instantiate the object.
 * Describe what a prototype is and how it can be used.
 *! Explain prototypal inheritance.
 * Understand the basic do’s and don’t’s of prototypical inheritance.、
 *! Explain what Object.create does.
 *? Explain what the this keyword is.
 * @author Seaming 2023-6-23
 */

// Object Constructors
function Player(name, marker) {
  this.name = name
  this.marker = marker
  this.sayName = function () {
    console.log(name)
  }
}

const player1 = new Player('steve', 'X')
const player2 = new Player('steven', 'L')

// The Prototype
console.log(Player.prototype)

// check the object’s prototype by using the Object.getPrototypeOf() function on the object
console.log(Object.getPrototypeOf(player1) === Player.prototype) // returns true
console.log(Object.getPrototypeOf(player2) === Player.prototype) // returns true

// Here, we defined the .sayHello function ‘on’ the Player.prototype object. It then became available for the player1 and the player2 objects to use! Similarly, you can attach other properties or functions you want to use on all Player objects by defining them on the objects’ prototype (Player.prototype).
Player.prototype.sayHello = function () {
  console.log("Hello, I'm a player!")
}

player1.sayHello() // logs "Hello, I'm a player!"
player2.sayHello() // logs "Hello, I'm a player!"

// Don't do this!
player1.__proto__ === Player.prototype // returns true
player2.__proto__ === Player.prototype // returns true
// why `Don't do this!`? this function (.__proto__) is deprecated!

/* -------------------------------------------------------------------------------- */

// as for now, there are also other questions about prototype: what use is an object’s prototype? What is the purpose of defining properties and functions on the prototype?

/* We can narrow it down to two reasons:

  1. We can define properties and functions common among all objects on the prototype to save memory. Defining every property and function takes up a lot of memory, especially if you have a lot of common properties and functions, and a lot of created objects! Defining them on a centralized, shared object which the objects have access to, thus saves memory.

  2. The second reason is the name of this section, Prototypal Inheritance, which we’ve referred to in passing earlier, in the introduction to the Prototype. In recap, we can say that the player1 and player2 objects inherit from the Player.prototype object, which allows them to access functions like .sayHello.
 */

// Player.prototype.__proto__
Object.getPrototypeOf(Player.prototype) === Object.prototype // true

// Output may slightly differ based on the browser
player1.valueOf() // Output: Object { name: "steve", marker: "X", sayName: sayName() }

// we didnt define the function `.value`.  where did it come from if we did not define it? It comes as a result of Object.getPrototypeOf(Player.prototype) having the value of Object.prototype! This means that Player.prototype is inheriting from Object.prototype. This .valueOf function is defined on Object.prototype just like .sayHello is defined on Player.prototype.

//But How do we know that this .valueOf function is defined on Object.prototype? We make use of another function called .hasOwnProperty:

player1.hasOwnProperty('valueOf') // false
Object.prototype.hasOwnProperty('valueOf') // true

// A N D!!
Object.prototype.hasOwnProperty('hasOwnProperty') // true

// Essentially, this is how JavaScript makes use of prototype - by having the objects contain a value - to point to prototypes and inheriting from those prototypes, and thus forming a chain. This kind of inheritance using prototypes is hence named as Prototypal inheritance. JavaScript figures out which properties exist (or do not exist) on the object and starts traversing the chain to find the property or function

// Now, how do you utilize Prototypal Inheritance? What do you need to do to use it? Just as we use Object.getPrototypeOf() to ‘get’ or view the prototype of an object, we can use Object.setPrototypeOf() to ‘set’ or mutate it. Let’s see how it works by adding a Person Object Constructor to the Player example, and making Player inherit from Person!

function Person(name) {
  this.name = name
}

Person.prototype.sayName = function () {
  console.log(`Hello, I'm ${this.name}!`)
}

function Player(name, marker) {
  this.name = name
  this.marker = marker
}

Player.prototype.getMarker = function () {
  console.log(`My marker is '${this.marker}'`)
}

// Object.getPrototypeOf(Player.prototype) should
// return the value of "Person.prototype" instead
// of "Object.prototype"
Object.getPrototypeOf(Player.prototype) // returns Object.prototype

// Now make `Player` objects inherit from `Person`
Object.setPrototypeOf(Player.prototype, Person.prototype)
Object.getPrototypeOf(Player.prototype) // returns Person.prototype

const player3 = new Player('steve', 'X')
const player4 = new Player('also steve', 'O')

player3.sayName() // Hello, I'm steve!
player4.sayName() // Hello, I'm also steve!

player3.getMarker() // My marker is 'X'
player4.getMarker() // My marker is 'O'
