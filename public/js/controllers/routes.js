'use strict';

var app = app || {};

page('/', app.pfItemController.init);
page('/about', app.aboutController.init);
// page('*', ); // check on my 404

page();