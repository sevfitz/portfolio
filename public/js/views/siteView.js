'use strict';

var siteView = {};

siteView.mobileHandler = function () {
    // Toggle click the mobile menu
    console.log('inside mobile handler');
    $('.icon-menu').click(function () {
        $('nav ul').toggleClass('open');
    });
};

siteView.fillStats = function () {
    let template = Handlebars.compile($('#stats-template').text()); //eslint-disable-line   
    app.PortfolioItem.numProjs().forEach(devObj => {  // eslint-disable-line
        console.log('inside siteView.fillstats', app.PortfolioItem.numProjs());
        $('#stats').empty().append(template(devObj));
    }); // eslint-disable-line
};

siteView.fillGHStats = () => {
    let githubStatsFiller = Handlebars.compile($('#github-stats-template').text()); //eslint-disable-line   

    app.githubStats.requestStats(() => {  // eslint-disable-line
        $('#github-stats').empty().append(githubStatsFiller(app.githubStats.data));    // eslint-disable-line
    });
};

siteView.index = function () {
    $('main > section').hide();

    siteView.mobileHandler();
    siteView.fillStats();
    siteView.fillGHStats();
};


// When the window is resized, remove the open class if we are no longer viewing as mobile
$(window).on('resize', function () {
    if ($('.icon-menu').css('display') === 'none') {
        $('nav ul').removeClass('open');
    }
});