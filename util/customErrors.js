class badRequest extends Error {
    constructor(errorCode, errorMessage, path, pageTitle) {
        super();
        this.errorCode = errorCode;
        this.name = this.constructor.name // good practice
        this.errorMessage = errorMessage;
        this.path = path;
        this.pageTitle = pageTitle;
        this.type = 'Bad Request';
    }
}

module.exports = badRequest;