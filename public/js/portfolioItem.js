'use strict';

var app = app || {};  //eslint-disable-line

(function (module) {                                    //eslint-disable-line
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
		let template = Handlebars.compile($('#template').text());  //eslint-disable-line

		this.daysAgo = parseInt((new Date() - new Date(this.lastUpdated)) / 60 / 60 / 24 / 1000);

		return template(this);
	};

	PortfolioItem.loadAll = pfItem => {
		pfItem.sort( (a, b) => (new Date(b.lastUpdated)) - (new Date(a.lastUpdated)));  //eslint-disable-line

		PortfolioItem.all = pfItem.map(pfItem => new PortfolioItem(pfItem));
		};

	PortfolioItem.fetchAll = function () {
		if (localStorage.portfolioItems) {
			$.ajax({
				type: 'HEAD',
				url: './index.html',
				success: PortfolioItem.eTagCheck,
				error: PortfolioItem.runWhenFails
			});
		} else {
			PortfolioItem.getPFData();
		}
	};

	PortfolioItem.getPFData = function () {
		$.ajax({
			type: 'GET',
			url: './data/portfolioData.json',
			success: PortfolioItem.runWhenDone,
			error: PortfolioItem.runWhenFails
		});
	};

	PortfolioItem.runWhenDone = function (pfData, message, res) {
		PortfolioItem.loadAll(pfData);
		localStorage.setItem('portfolioItems', JSON.stringify(pfData));
		localStorage.setItem('eTag', res.getResponseHeader('eTag'));
		siteView.initIndexPage();  //eslint-disable-line
	};

	PortfolioItem.runWhenFails = function (err) {
		console.log('error: ', err);
	};

	PortfolioItem.eTagCheck = function (data, message, res) {
		let eTag = res.getResponseHeader('eTag');
		let storedeTag = localStorage.getItem('eTag');
		if (eTag === storedeTag) {
			PortfolioItem.runWhenDone();
		} else {
			PortfolioItem.getPFData();
		}
	};
	module.PortfolioItem = PortfolioItem;
})(app);