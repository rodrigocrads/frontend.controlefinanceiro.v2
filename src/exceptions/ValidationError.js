export default class ValidationError extends Error {
	constructor(errors, message = '', status = 422) {
		super(message);
		this.status = status;
		this.errors = errors;
        this.name = 'ValidationError';
	}

	getMessage() {
		if (this.message !== '') return this.message;

		return Object.keys(this.errors)
			.map(error => this.errors[error].join('\n\n'))
			.join('\n\n');
	}
}