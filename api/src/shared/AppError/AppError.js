function AppError({ type, message, details = [] } = {}) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.type = type;
    this.message = message;
    this.details = details;

    // All errors thrown with AppError are considered trusted, and will not cause the application to crash.
    // Untrusted errors will cause the application to crash and restart.
    this.trustedError = true;
}

AppError.prototype.__proto__ = Error.prototype;

module.exports = AppError;
