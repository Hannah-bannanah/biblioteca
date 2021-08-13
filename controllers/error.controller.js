exports.error = (req, res, next) => {
    res.render('errors/404', {
        path: req.path
    });
}

exports.errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(400)
    res.render('errors/generalError', {
        pageTitle: 'Bad Request',
        path: '/error',
        errorCode: 400,
        errorMessage: 'libro ya existe'
    });
    // return next(err);
}