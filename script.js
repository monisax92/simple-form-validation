const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm-password');

//fail or success handlers

const showError = (input, msg) => {
	const parentField = input.parentElement;
	parentField.classList.remove('valid');
	parentField.classList.add('invalid');

	const errorMsg = parentField.querySelector('small');
	errorMsg.innerText = msg;
};

const showSuccess = input => {
	const parentField = input.parentElement;
	parentField.classList.remove('invalid');
	parentField.classList.add('valid');
};

//validation functions

const checkIfNotEmpty = inputsArray => {
	inputsArray.forEach(input => {
		if (input.value.trim() === '') {
			showError(
				input,
				`${input.id[0].toUpperCase() + input.id.slice(1)} is required.`
			);
		}
	});
};

const checkLength = (input, min = 0, max = 1000) => {
	if (input.value.length < min) {
		showError(input, `Too short ${input.id}. Min is ${min}.`);
	} else if (input.value.length > max) {
		showError(input, `Too long ${input.id}. Max is ${max}.`);
	} else {
		showSuccess(input);
	}
};

const checkEmailFormat = email => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	if (re.test(email.value.trim())) showSuccess(email);
	else showError(email, 'Invalid email.');
};

const checkPasswordMatch = (pass1, pass2) => {
	if (pass1.value !== pass2.value) showError(pass2, 'Passwords do not match.');
	else showSuccess(pass2);
};

//event listeners

form.addEventListener('submit', e => {
	e.preventDefault();

	checkIfNotEmpty([username, email, password, confirm]);
	checkLength(username, 3, 20);
	checkLength(password, 8);
	checkEmailFormat(email);
	checkPasswordMatch(password, confirm);
});
