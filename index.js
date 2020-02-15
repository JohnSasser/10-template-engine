// fs to writeFile to .html
const fs = require("fs");
// inquirer to prompt the user for team members and position;
const inquirer = require("inquirer");
// questions for the inquirer
const questions = require("./lib/questions");
// empty string for the generated card data to be loaded to the html;
let html = "";
// require classes;
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

function createEmployee() {
	inquirer
		.prompt(questions.empQuestions)
		.then(answers => {
			switch (answers.role) {
				case "Engineer":
					inquirer.prompt(questions.engQuestion).then(engineerAnswers => {
						const engineerData = new Engineer(
							answers.name,
							answers.id,
							answers.email,
							engineerAnswers.github
						);
						readEngFile(engineerData);

						restartInquirer();
					});
					break;
				case "Manager":
					inquirer.prompt(questions.mgmtQuestion).then(async managerAnswers => {
						const managerData = await new Manager(
							answers.name,
							answers.id,
							answers.email,
							managerAnswers.officeNumber
						);
						readMgnFile(answers, managerAnswers);

						restartInquirer();
					});
					break;
				case "Intern":
					inquirer
						.prompt(questions.internQuestion)
						.then(async internAnswers => {
							const internData = await new Intern(
								answers.name,
								answers.id,
								answers.email,
								internAnswers.internSchool
							);
							readInternFile(answers, internAnswers);

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
		switch (answer.role) {
			case "YES!!!":
				createEmployee();
				break;

			case "NO!":
				createHTML();
				break;
		}
	});
}

// working
function readEngFile(engineerData) {
	// console.log(engineerData);
	// data is my html string,
	fs.readFile("./html/engineer.html", "utf8", function(error, data) {
		// console.log(engineerData.name);
		const newData = data
			.replace("Ename", engineerData.name)
			.replace("Eid", engineerData.id)
			.replace("Eemail", engineerData.email)
			.replace("Egighub", engineerData.github);

		// read .html for all class values and the combine them before writing the file.
		html += newData;
		// console.log(html);
	});
}
// not working
function readMgnFile(managerData) {
	// data is my html string,
	fs.readFile("./html/manager.html", "utf8", function(error, data) {
		const newData = data
			.replace("Mname", managerData.name)
			.replace("Micon", managerData.id)
			.replace("Memail", managerData.email)
			.replace("Mgithub", managerData.officeNumber);

		// read .html for all class values and the combine them before writing the file.
		html += newData;
	});
}
// not working
function readInternFile(internData) {
	// data is my html string,
	fs.readFile("./html/intern.html", "utf8", function(error, data) {
		const newData = data
			.replace("Iname", internData.name)
			.replace("Iicon", internData.id)
			.replace("Iemail", internData.email)
			.replace("Igithub", internData.internSchool);

		// read .html for all class values and the combine them before writing the file.
		html += newData;
	});
}

function createHTML() {
	fs.readFile("./html/main.html", "utf8", (err, data) => {
		const newData = data.replace("{{html}}", html);

		fs.writeFile("./output/index.html", newData, "utf8", err => {
			if (err) return console.log(err);
		});
		console.log(".html created");
	});
}

module.exports = {};

createEmployee();
