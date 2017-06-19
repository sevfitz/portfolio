'use strict';

var app = app || {};  //eslint-disable-line

(function(module) {
    const portfolioController = {};

    portfolioController.index = (ctx) => app.portfolioView.index(ctx.pfItems);

    portfolioController.loadAll = (ctx, next) => {
        let pfData = () => {
            ctx.pfItems = app.PortfolioItem.all;
            next();
        };

        if (app.PortfolioItem.all.length) {
            ctx.pfItems = app.PortfolioItem.all;
        } else {
            app.PortfolioItem.fetchAll(pfData);
        }
    };

    module.portfolioController = portfolioController;
}(app));