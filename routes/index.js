/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);

	app.get('/api/users', routes.api.user.list);
	app.get('/api/users/:id', routes.api.user.get);
	app.post('/api/users/register', routes.api.user.create);
	app.put('/api/users/upload',routes.api.user.upload);
	app.put('/api/users/update', routes.api.user.update);
	app.delete('/api/users/:id', routes.api.user.remove);
	app.post('/api/users/login',routes.api.user.login);
	app.put('/api/users/resetpassword',routes.api.user.forgetpassword);
	

	app.get('/api/events', routes.api.event.list);
	app.get('/api/events/:id', routes.api.event.get);
	app.post('/api/events/create', routes.api.event.create);
	app.put('/api/events/:id', routes.api.event.update);
	app.delete('/api/events/:id', routes.api.event.remove);

	app.get('/api/flayers', routes.api.flayer.list);
	app.get('/api/flayers/:id', routes.api.flayer.get);
	app.post('/api/flayers/create', routes.api.flayer.create);
	app.put('/api/flayers/:id', routes.api.flayer.update);
	app.delete('/api/flayers/:id', routes.api.flayer.remove);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
