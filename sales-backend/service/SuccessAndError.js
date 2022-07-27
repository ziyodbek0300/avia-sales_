const Success = (code, result, message) => {
    return {
        code: code ? code : 200,
        success: true,
        result: result,
        message: message
    }
}

const Error = (code, error, message) => {
    return {
        code: code ? code : 404,
        success: false,
        error: error,
        message: message
    }
}

exports.Success = Success
exports.ErrorSend = Error