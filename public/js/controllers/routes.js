'use strict';

var app = app || {};

page('/', siteView.index);
page('/about', app.aboutController.index);
page('/siteinfo', app.siteinfoController.index);
page('/portfolio', app.portfolioController.loadAll, app.portfolioController.index);

page();