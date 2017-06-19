'use strict';

var siteView = {};

siteView.mobileHandler = function() {
    // Toggle click the mobile menu
    $('.icon-menu').click(function () {
    $('nav ul').toggleClass('open');
    });
};

siteView.initIndexPage = function() {
    siteView.mobileHandler();
    siteView.fillStats();
    siteView.fillGHStats();
};

// When the window is resized, remove the open class if we are no longer viewing as mobile
$(window).on('resize', function() {
    if ( $('.icon-menu').css('display') === 'none' ) {
        $('nav ul').removeClass('open');
    }
});

siteView.fillStats = function() {
    let template = Handlebars.compile($('#stats-template').text()); //eslint-disable-line   
    app.PortfolioItem.numProjs().forEach( devObj => {  // eslint-disable-line
        $('#stats').append(template(devObj));
    }); // eslint-disable-line
};

siteView.fillGHStats = () => {
    let githubStatsFiller = Handlebars.compile($('#github-stats-template').text()); //eslint-disable-line   

    app.githubStats.requestStats( () => {  // eslint-disable-line
        $('#github-stats').append(githubStatsFiller(app.githubStats.data));    // eslint-disable-line
    });
};