class CustomError extends Error{
    statusCode: number;


    constructor(message: string, statusCode: number = 500) {
        super(message); // 'Error' breaks prototype chain here
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }

}

export default CustomError;