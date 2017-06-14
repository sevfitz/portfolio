'use strict';

var app = app || {};  //eslint-disable-line

(function(module) {
    const siteinfoController = {};

    siteinfoController.init = () => {
        $( 'main > section' ).hide();
        $( '#about-site' ).show();
    }

    module.siteinfoController = siteinfoController;
}(app));