'use strict';

var app = app || {};

page('/', app.homeController.init);
page('/about', app.aboutController.init);
page('/siteinfo', app.siteinfoController.init);
page('/portfolio', app.portfolioController.init);

page();