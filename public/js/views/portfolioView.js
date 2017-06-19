'use strict';
var app = app || {};  // eslint-disable-line

(function (module) {
    const portfolioView = {};

    const render = function (pfItem) {
        let template = Handlebars.compile($('#template').text());  //eslint-disable-line

        pfItem.daysAgo = parseInt((new Date() - new Date(pfItem.lastUpdated)) / 60 / 60 / 24 / 1000);

		return template(pfItem);
    }

    portfolioView.index = function (pfItems) {
        $('main > section').hide();
        $('#portfolio').show();

        pfItems.forEach(function (item) { // eslint-disable-line
            $('#portfolio').append(render(item))
            console.log(render(item));
        });
    };

    module.portfolioView = portfolioView;
}(app));