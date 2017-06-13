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


// 'use strict';

// var siteView = {};

// siteView.navHandler = function() {
//     $('nav li.tab').on('click', function () {
//         $('.tab-content').hide();
//         let clickedTab = $(this).data('content');
//         $('#' + clickedTab).show();
//     });
//     $('nav .tab:first').click();

//     // Toggle click the mobile menu
//     $('.icon-menu').click(function () {
//     $('nav ul').toggleClass('open');
//     });
// };

// siteView.initIndexPage = function() {
//     app.PortfolioItem.all.forEach(function (pfItem) { // eslint-disable-line
//         $('#portfolio').append(pfItem.toHtml())
//     });
//     siteView.navHandler();
// };

// // siteView.fillStats = function() {
// //     let template = Handlebars.compile($('aside-template').text()); //eslint-disable-line
// //     app.PortfolioItem.numProjs().forEach( function (projObj) {  // eslint-disable-line
// //         $('#aside-template').append(template(projObj))
// //     }); // eslint-disable-line
// //     $('aside').text(app.PortfolioItem.numProjs()); // eslint-disable-line
// //     console.log(app.PortfolioItem.numProjs());
// // };

// // When the window is resized, remove the open class if we are no longer viewing as mobile
// $(window).on('resize', function() {
//     if ( $('.icon-menu').css('display') === 'none' ) {
//         $('nav ul').removeClass('open');
//     }
// });

// // siteView.fillStats();