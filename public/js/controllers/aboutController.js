'use strict';

var app = app || {};  //eslint-disable-line

(function(module) {
    const aboutController = {};

    aboutController.index = () => {
        $( 'main > section' ).hide();
        $( '#about-me' ).show();
    }

    module.aboutController = aboutController;
}(app));