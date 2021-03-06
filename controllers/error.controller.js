exports.error = (req, res, next) => {
    res.render('errors/404', {
        path: req.path
    });
}

exports.errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(err.errorCode)
    res.render('errors/generalError', {
        pageTitle: 'Bad Request',
        path: '/error',
        errorCode: err.errorCode,
        errorMessage: 'libro ya existe'
    });
    // return next(err);
}