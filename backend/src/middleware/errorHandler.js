module.exports = function errorHandler(err, req, res, next) {
    try {
        console.error('❌ API Error:', err.message);

        const status = err.status || 500;

        const response = {
            success: false,
            message: err.message || 'Internal Server Error',
        };

        if (process.env.NODE_ENV !== 'production') {
            response.stack = err.stack;
        }

        return res.status(status).json(response);
    } catch (error) {
        console.error('❌ Error Handler Error:', err.message);

        const status = 500;

        const response = {
            success: false,
            message: err.message || 'Internal Server Error',
        };

        if (process.env.NODE_ENV !== 'production') {
            response.stack = err.stack;
        }

        return res.status(status).json(response);
    }
};