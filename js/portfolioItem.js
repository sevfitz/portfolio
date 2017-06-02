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
	var $newItem = $('article.template').clone();
	$newItem.removeClass('template');
	$newItem.attr('data-id', this.id);
	$newItem.attr('data-dev', this.dev);
	$newItem.find('h2').html(this.project);
	$newItem.find('a').attr('href', this.ghPagesURL);
	$newItem.find('img').attr('src', this.img);
	$newItem.find('p:first').html('Developed by ' + this.dev);
	$newItem.find('p:last').html('Last Updated: ' + this.lastUpdated);
	$newItem.find('div').html(this.description);
	$newItem.append('<hr>');
	return $newItem;
};

portfolioItemData.forEach(function (item) {
	portfolioItems.push(new PortfolioItem(item));
});

portfolioItems.forEach(function(item) {
	$('#portfolio').append(item.toHtml());
});

