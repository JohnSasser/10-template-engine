const empQuestions = [
	{
		type: "input",
		message: "what is your name?",
		name: "name"
	},
	{
		type: "input",
		message: "what is your employee ID?",
		name: "id"
	},
	{
		type: "input",
		message: "what is your employee email?",
		name: "email"
	},
	{
		type: "list",
		message: "what is your job title?",
		name: "title",
		choices: ["Engineer", "Intern", "Manager"]
	}
];

const engQuestion = [
	{
		type: "input",
		message: "what is your GitHub user-name?",
		name: "github"
	}
];

const mgmtQuestion = [
	{
		type: "input",
		message: "what is your office phone number?",
		name: "MgmtOfficePhone"
	}
];

const internQuestion = [
	{
		type: "input",
		message: "what is your school name?",
		name: "internSchool"
	}
];

const newQuestion = [
	{
		type: "list",
		message: "Would you like to add a team member?",
		name: "title",
		choices: ["YES!!!", "NO!"]
	}
];

// object literal
module.exports = {
	empQuestions,
	engQuestion,
	mgmtQuestion,
	internQuestion,
	newQuestion
};
