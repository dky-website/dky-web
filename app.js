var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var hbsHelpers = require('handlebars-helpers')();
var session = require('express-session');

var routes = require('./routes/index');
var show = require('./routes/show');
var product = require('./routes/product');
var article = require('./routes/article');
var users = require('./routes/user');

var rocket = require('./utils/rocket');
var Constant = require('./utils/const');
var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    partialsDir: ['views/partials/'],
    extname: '.hbs',
    helpers: hbsHelpers
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser('dankeyun'));

app.use(session({
    secret: 'dankeyun',
    resave: true,
    saveUninitialized:true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    var jobs = [],
        menuAbout = {},
        menuProduct = {},
        menuShow = {},
        menuService = {},
        menuContact = {};
    menuAbout.title = '关于我们';
    menuAbout.subMenu = [];
    menuProduct.title = '产品';
    menuProduct.subMenu = [];
    menuShow.title = 'SHOW';
    menuShow.subMenu = [];
    menuService.title = '服务';
    menuService.subMenu = [];
    menuContact.title = '联络';
    menuContact.subMenu = [];

    jobs.push(rocket.get(Constant.WEB_ROOT + '/front/fmenu/list'));

    Promise.all([...jobs]).then(function([menuResult]) {
        var menuResult = JSON.parse(menuResult);
        menuResult.data.map(function(menu, index) {
            switch(menu.type) {
                case '1': {
                    // 关于我们
                    menuAbout.subMenu.push({name: menu.menuName, url: '/article/1#' + menu.id})
                    // if (menu.hasChildren) {
                    //     menu.children.map(function(subMenu, idx) {
                    //         var url = '/article/1#' + subMenu.id;
                    //         menuAbout.subMenu.push({name: subMenu.menuName, url: url})
                    //     })
                    // }
                }; break;
                case '2': {
                    // 产品
                    menuProduct.subMenu.push({name: menu.menuName, url: '/product#' + menu.menuName})
                    // if (menu.hasChildren) {
                    //     menu.children.map(function(subMenu, idx) {
                    //         var url = '/product#' + subMenu.menuName;
                    //         menuProduct.subMenu.push({name: subMenu.menuName, url: url})
                    //     })
                    // }
                }; break;
                case '3': {
                    // show
                    menuShow.subMenu.push({name: menu.menuName, url: ('/show/' + menu.id + '/1')})
                    // if (menu.hasChildren) {
                    //     menu.children.map(function(subMenu, idx) {
                    //         menuShow.subMenu.push({name: subMenu.menuName, url: ('/show/' + subMenu.id)})
                    //     })
                    // }
                }; break;
                case '4': {
                    // 服务
                    menuService.subMenu.push({name: menu.menuName, url: '/article/4#' + menu.id})
                    // if (menu.hasChildren) {
                    //     menu.children.map(function(subMenu, idx) {
                    //         var url = '/article/4#' + subMenu.id;
                    //         menuService.subMenu.push({name: subMenu.menuName, url: url})
                    //     })
                    // }
                }; break;
                case '5': {
                    // 联络
                    menuContact.subMenu.push({name: menu.menuName, url: '/article/5#' + menu.id})
                    // if (menu.hasChildren) {
                    //     menu.children.map(function(subMenu, idx) {
                    //         var url = '/article/5#' + subMenu.id;
                    //         menuContact.subMenu.push({name: subMenu.menuName, url: url})
                    //     })
                    // }
                }; break;
                default: ;
            }
        })
        app.locals.menuAbout = menuAbout;
        app.locals.menuProduct = menuProduct;
        app.locals.menuShow = menuShow;
        app.locals.menuService = menuService;
        app.locals.menuContact = menuContact;
        next();
    }).catch(function(error) {
        app.locals.menuAbout = menuAbout;
        app.locals.menuProduct = menuProduct;
        app.locals.menuShow = menuShow;
        app.locals.menuService = menuService;
        app.locals.menuContact = menuContact;
        next();
    });
});


app.use('/', routes);
app.use('/show', show);
app.use('/product', product);
app.use('/article', article);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
