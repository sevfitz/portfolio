'use strict';

var app = app || {};  //eslint-disable-line

(function(module) {
    const portfolioController = {};

    portfolioController.init = () => {
        $( 'main > section' ).hide();
        $( '#portfolio' ).show();
    }

    module.portfolioController = portfolioController;
}(app));