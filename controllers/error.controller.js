exports.error = (req, res, next) => {
    res.render('errors/404', {
        path: req.path
    });
}