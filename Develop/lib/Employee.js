//This script will use a class called Employee to create a constructor that takes in user data. Using a class creates the oppourtunity to add multiple employees without repeating code.
class Employee {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    //The following mehtods are nn reference to the htmlRenderer.js file. Each method will contain a return using the 'this' keyword.
    getId() {
        return this.id
    }

    getName() {
        return this.name
    }

    getEmail() {
        return this.email
    }

    getRole() {
        return Employee
    }   
}

//Export employee data down the chain of specific roles within the team.
module.exports = Employee;