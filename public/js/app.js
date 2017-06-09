'use strict';

var siteView = {};

siteView.navHandler = function() {
    $('nav li.tab').on('click', function () {
        $('.tab-content').hide();
        let clickedTab = $(this).data('content');
        $('#' + clickedTab).show();
    });
    $('nav .tab:first').click();

    // Toggle click the mobile menu
    $('.icon-menu').click(function () {
    $('nav ul').toggleClass('open');
    });
};

siteView.initIndexPage = function() {
    PortfolioItem.fetchAll.forEach(function (pfItem) { // eslint-disable-line
        $('#portfolio').append(pfItem.toHtml())
    });
    siteView.navHandler();
};
