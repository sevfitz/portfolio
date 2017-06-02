'use strict';

var siteView = {};

siteView.navHandler = function() {
    $('nav li.tab').on('click', function () {
        $('.tab-content').hide();
        var clickedTab = $(this).data('content');
        $('#' + clickedTab).show();
    });
    $('nav .tab:first').click();
};

$(function() {
    siteView.navHandler();
});