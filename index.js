// fs to writeFile to .html
const fs = require("fs");
// inquirer to prompt the user for team members and position;
const inquirer = require("inquirer");
// questions for the inquirer
const questions = require("./lib/questions");
// require classes
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const teamArr = [];

// prompt with initial questions
// depending on the choice create the teamArr
// put the values from the prompts into the classes
function createEmployee() {
	inquirer
		.prompt(questions.empQuestions)
		.then(answers => {
			switch (answers.title) {
				case "Intern":
					inquirer.prompt(questions.internQuestion).then(internAnswers => {
						const newAnswers = { ...answers, internAnswers };
						teamArr.push(newAnswers);

						restartInquirer();
					});
					break;
				case "Engineer":
					inquirer.prompt(questions.engQuestion).then(engineerAnswers => {
						const newAnswers = { ...answers, engineerAnswers };
						teamArr.push(newAnswers);

						restartInquirer();
					});
					break;
				case "Manager":
					inquirer.prompt(questions.mgmtQuestion).then(managerAnswers => {
						const newAnswers = { ...answers, managerAnswers };
						teamArr.push(newAnswers);

						restartInquirer();
					});
					break;
			}
		})
		.catch(err => {
			throw err;
		});
}

function restartInquirer() {
	inquirer.prompt(questions.newQuestion).then(answer => {
		switch (answer.newQuestion) {
			case "YES!!!":
				createEmployee();
				break;
			case "NO!":
				generateHTML();
				break;
		}
	});
}

createEmployee();
