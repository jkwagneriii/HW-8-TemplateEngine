const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!) 

//Empty array to store individual objects
let productionTeam = [];

//Intro questions for all users
const mainQuestions = [
    {
        name: 'id',
        type: 'input',
        message: 'What is your employee ID?'
    },
    {
        name: 'name',
        type: 'input',
        message: 'What is your name?'
    },
    {
        name: 'email',
        type: 'input',
        message: 'What is your email address?'
    },
    {
        name: 'role',
        type: 'list',
        message: 'Select your current company role.',
        choices: ["Manager", "Engineer", "Intern"]
    }
]

//If the user selects manager they will be asked...
const managerQuestions = [
    {
        name: 'officeNumber',
        type: 'input',
        message: 'What is your office phone number?'
    }
]

//If the user selects engineer they will be asked...
const engineerQuestions = [
    {
        name: 'github',
        type: 'input',
        message: 'What is your Github username?'
    }
]

//If the user selects intern they will be asked...
const internQuestions = [
    {
        name: 'school',
        type: 'input',
        message: 'What school do you attend?'
    }
]

//Use confirm instead of input to receive boolean values
//If the user wants to add another team member then...
const addAnotherQuestions = [
    {
        name: 'addAnother',
        type: 'confirm',
        message: 'Would you like to add another team member?'
    }
]

//The main function for this application. This will prompt the user a series of questions which will then render into an html file with corresponding style classes.
function employeePrompt () {

    //Welcome message
    console.log('Welcome to the team! Please provide some more information before we started!')

    //see https://www.npmjs.com/package/inquirer
    inquirer
    .prompt(mainQuestions)
    .then(function(data) {

        //After the introductory questions the user will be asked one more additional question based on the data from their 'role' response.
        if (data.role === "Manager") {
            inquirer.prompt(managerQuestions)
            .then(function(managerData){
            console.log(managerData);
            //create new manager
            createNewManager(data, managerData);
        })

        } else if (data.role === "Engineer") {
            inquirer.prompt(engineerQuestions)
            .then(function(engineerData){
            console.log(engineerData);
            //create new engineer
            createNewEngineer(data, engineerData);
        }) 

        } else if (data.role === "Intern") {
            inquirer.prompt(internQuestions)
            .then(function(internData){
            console.log(internData);
            //create new intern
            createNewIntern(data, internData);
        })
    }
});
};

// Function that allows more team members to be added or to go ahead and populate the HTML document.
function addAnother() {
    inquirer.prompt(addAnotherQuestions).then(function(anotherData) {
        console.log(anotherData);

        if(anotherData.addAnother === true) {
            employeePrompt();
        } else {
            //Can't get this to work yet. Where does render go??
            populateHTML()
        }
    })
}

//Save and push managerData to empty ProductionTeam array.
function createNewManager (data, managerData) {
    var myNewManager = new Manager(data.id, data.name, data.email, managerData.officeNumber);
    productionTeam.push(myNewManager);
    console.log('Production Team', productionTeam);
    // prompts add another question function to see whether they want to add another or stop
    addAnother();
};

//Save and push EngineerData to empty ProductionTeam array.
function createNewEngineer (data, engineerData) {
    var myNewEngineer = new Engineer (data.id, data.name, data.email, engineerData.github);
    productionTeam.push(myNewEngineer);
    console.log('Production Team', productionTeam);
    // prompts add another question function to see whether they want to add another or stop
    addAnother();
};

//Save and push InternData to empty ProductionTeam array.
function createNewIntern (data, internData) {
    var myNewIntern = new Intern (data.id, data.name, data.email, internData.school);
    productionTeam.push(myNewIntern);
    console.log('Production Team', productionTeam);
    // prompts add another question function to see whether they want to add another or stop
    addAnother();
};


// Populate HTML function
function populateHTML() {
    var rawHtml = render(productionTeam)
    console.log('raw html ??',rawHtml)
    fs.writeFile(outputPath,rawHtml, function(errr){
        console.log('did something go wrong', errr);
    })
}

//Run the initial question command.
employeePrompt();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
