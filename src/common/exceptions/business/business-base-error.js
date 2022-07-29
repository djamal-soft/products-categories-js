class BusinessBaseError extends Error {
    
    constructor(prefix, message) {
        super(`${prefix}: ${message}`);
    }
}

module.exports = BusinessBaseError;