'use strict';

var app = app || {};  //eslint-disable-line

(function(module) {
    const portfolioController = {};

    portfolioController.init = () => {
        $( 'main > section' ).hide();
        $( '#portfolio' ).show();
    }

    portfolioController.index = (ctx) => app.portfolioView.index(ctx.pfItems);

    portfolioController.loadAll = (ctx, next) => {
        let pfData = () => {
            ctx.pfItems = app.PortfolioItem.all;
            next();
        }

        if (app.PortfolioItem.all.length) {
            ctx.pfItems = app.PortfolioItem.all;
            next();
        } else {
            app.PortfolioItem.pfData();
        }
    };

    module.portfolioController = portfolioController;
}(app));