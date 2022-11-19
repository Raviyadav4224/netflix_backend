import ErrorResponse from '../utils/errorResponse.js'

const errorHandler = (error, req, res, next) => {

    error.message = error.message || "Internal Server down"
    console.log(error);
    if (error.code === 11000) {
        const message = 'Dupliate field value enter'
        error = new ErrorResponse(message, 400)
    }

    if (error.name === 'validationError') {
        const message = Object.values(error.error).map((val) => val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server error"
    })
}

export default errorHandler