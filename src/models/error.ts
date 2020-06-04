class CustomError extends Error{
    statusCode: number;

    constructor(error: Error, statusCode: number = 500) {
        super(error.message); // 'Error' breaks prototype chain here
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }

}

export default CustomError;