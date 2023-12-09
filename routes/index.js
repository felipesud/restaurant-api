const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

router.use('/clients', require('./client.routes'));
router.use('/staff', require('./staff'));
router.use('/restaurants', require('./restaurant'));
router.use('/menus', require('./menu'));
router.use('/orders', require('./order'));
router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err){
        if(err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
