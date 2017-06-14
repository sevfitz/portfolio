'use strict';

var app = app || {};  //eslint-disable-line

(function(module) {
    const homeController = {};

    homeController.init = () => {
        $( 'main > section' ).hide();
        // $( '#home' ).show();
    }

    module.homeController = homeController;
}(app));