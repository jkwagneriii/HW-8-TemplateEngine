//This script will use a class called Employee to create a constructor that takes in user data. Using a class creates the oppourtunity to add multiple employees without repeating code.
class Employee {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}


module.exports = Employee;