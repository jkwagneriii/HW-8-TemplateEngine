// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./lib/Employee");

const Engineer = function(gitUserName) {
    this.gitUserName = gitUserName;
}

module.exports = Engineer;