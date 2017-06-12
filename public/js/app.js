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
    app.PortfolioItem.all.forEach(function (pfItem) { // eslint-disable-line
        $('#portfolio').append(pfItem.toHtml())
    });
    siteView.navHandler();
};

// When the window is resized, remove the open class if we are no longer viewing as mobile
$(window).on('resize', function() {
    if ( $('.icon-menu').css('display') === 'none' ) {
        $('nav ul').removeClass('open');
    }
});
