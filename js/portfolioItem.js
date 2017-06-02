'use strict';

var portfolioItems = [];

function portfolioItem ( portfolioItemObj ) {
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

portfolioItem.prototype.toHtml = function() {
	var $newItem = $('article.template').clone();
	$newItem.removeClass('template');
	$newItem.attr('data-id', this.id);
	$newItem.attr('data-dev', this.dev);
	$newItem.find('').html();

	return $newItem;
};

portfolioItems.forEach(function(item) {
	$('#portfolio-items').append(item.toHtml());
});


