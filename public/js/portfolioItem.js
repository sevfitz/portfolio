'use strict';

function PortfolioItem(portfolioItemObj) {
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

PortfolioItem.all = [];

PortfolioItem.prototype.toHtml = function () {
	let template = Handlebars.compile($('#template').text());

	this.daysAgo = parseInt((new Date() - new Date(this.lastUpdated)) / 60 / 60 / 24 / 1000);

	return template(this);
};

PortfolioItem.loadAll = function (pfItem) {
	pfItem.sort(function (a, b) {
		return (new Date(b.lastUpdated)) - (new Date(a.lastUpdated));
	});

	pfItem.forEach(function (item) {
		PortfolioItem.all.push(new PortfolioItem(item));
	});
}

PortfolioItem.fetchAll = function () {
	if (localStorage.portfolioItems) {
		$.ajax({
			type: 'HEAD',
			url: './index.html',
			success: PortfolioItem.eTagCheck
		});
	} else {
		$.ajax({
			type: 'GET',
			url: './data/portfolioData.json',
			success: PortfolioItem.runWhenDone,
			error: PortfolioItem.runWhenFails
		});
	}
};

PortfolioItem.runWhenDone = function (pfData, message, res) {
	localStorage.setItem('portfolioItems', JSON.stringify(pfData));
	PortfolioItem.loadAll(JSON.parse(localStorage.portfolioItems));
	localStorage.setItem('eTag', res.getResponseHeader('eTag'));
	siteView.initIndexPage();
};


PortfolioItem.runWhenFails = function (err) {
	console.log('error: ', err);
};

PortfolioItem.eTagCheck = function (data, message, res) {
	let eTag = res.getResponseHeader('eTag');
	let storedeTag = localStorage.getItem('eTag');
	if (eTag === storedeTag) {
		PortfolioItem.loadAll(JSON.parse(localStorage.portfolioItem));
		siteView.initIndexPage();
	} else {
		$.ajax({
			type: 'GET',
			url: './data/portfolioData.json',
			success: PortfolioItem.runWhenDone,
			error: PortfolioItem.runWhenFails
		});
	}
};