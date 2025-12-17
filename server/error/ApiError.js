class ApiError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
    }

    static err(status, message) {
        return new ApiError(status, message)
    }
}

module.exports = ApiError