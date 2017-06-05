'use strict';

var portfolioItems = [];

function PortfolioItem ( portfolioItemObj ) {
	this.project = portfolioItemObj.project;
	this.id = portfolioItemObj.id;
	this.dev = portfolioItemObj.dev;
	this.repoURL = portfolioItemObj.repoURL;
	this.ghPagesURL = portfolioItemObj.ghPagesURL;
	this.img = portfolioItemObj.img;
	this.lastUpdated = portfolioItemObj.lastUpdated;
	this.isTeamProj = portfolioItemObj.isTeamProj;
	this.description = portfolioItemObj.description;
}

PortfolioItem.prototype.toHtml = function() {
	var templateFiller = Handlebars.compile($('#template').html());
	var filledTemplate = templateFiller(this);

	return filledTemplate;
};

portfolioItemData.forEach(function (item) {
	portfolioItems.push(new PortfolioItem(item));
});

portfolioItems.forEach(function(item) {
	$('#portfolio').append(item.toHtml());
});

