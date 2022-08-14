export default class ValidationError extends Error {
	constructor(errors, message = "Erro de validação!") {
		super(message);
		this.name = 'ValidationError';
		this.errors = this.getErrorsList(errors);
	}

	getErrorsList(errors) {
		return Object.keys(errors)
			.reduce((prev, curr) => {
				return [
					...prev,
					...errors[curr]
				]
			}, []);
	}
}