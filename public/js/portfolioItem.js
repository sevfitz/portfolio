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

	// Find a way to use reduce... make an array of devs/ teams involved in these projects
	PortfolioItem.allDevs = function () {
		// return PortfolioItem.all.map(item => item.dev).reduce((devArray, dev) => {
		// 	!devArray.includes(dev) ? devArray.push(dev) : devArray
		// 	console.log('devarray', devArray);
		// 	return devArray;
		// }, []);
		console.log('alldevs', PortfolioItem.all.map(item => item.dev));
	};

    // ...then use that array for something
    // PortfolioItem.numProjs = function () {
	// 		return PortfolioItem.allDevs().map(dev => {
	// 			let devObj = {
	// 				name: dev
	// 				// desc: PortfolioItem.all.filter(devObj => devObj.dev === dev).map(description => description.length).reduce((total, value) => total + value.split(' ').length )
	// 			};
	// 			console.log('devObj', devObj);
	// 			return devObj;
	// 		})
	// 	};

	// PortfolioItem.loadAll = pfItem => {
	// 	pfItem.sort((a, b) => (new Date(b.lastUpdated)) - (new Date(a.lastUpdated)));  //eslint-disable-line

	// 	PortfolioItem.all = pfItem.map(pfItem => new PortfolioItem(pfItem));
	// };

	PortfolioItem.loadAll = function (pfItem) {
		pfItem.sort(function (a, b) {
			return (new Date(b.lastUpdated)) - (new Date(a.lastUpdated));
		});

		pfItem.forEach(function (item) {
			PortfolioItem.all.push(new PortfolioItem(item));
		});
	}

	// Check and compare eTags to see if we need to load the data for the first time or not
	PortfolioItem.eTagCheck = function () {
		$.ajax({
			type: 'HEAD',
			url: './index.html',
			success: PortfolioItem.eTagVerify,
			error: PortfolioItem.runWhenFails
		});
	};

	PortfolioItem.runWhenFails = function (err) {
		console.log(err);
	};

	PortfolioItem.eTagVerify = function (data, message, res) {
		if (localStorage.portfolioItems) {
			let eTag = res.getResponseHeader('eTag');
			let storedeTag = localStorage.getItem('eTag');
			if (eTag === storedeTag) {
				PortfolioItem.loadFromStorage();
			} else {
				PortfolioItem.getFromDB();
			}
		}
	};

	// we've been here before, so get portfolio items from local storage
	PortfolioItem.loadFromStorage = function () {

		// retrieve portfolio items from local storage
		localStorage.getItem('portfolioItems', JSON.parse(pfData));

		// start up the Index page
		siteView.initIndexPage();
	};

	PortfolioItem.getFromDB = function () {
		$.ajax({
			type: 'GET',
			url: './data/portfolioData.json',
			success: PortfolioItem.createItems,
			error: PortfolioItem.runWhenFails
		});
	};

	// make the portfolio items the first time
	PortfolioItem.createItems = function (pfData, message, res) {
		PortfolioItem.loadAll(pfData);

		// save the portfolio items in local storage
		localStorage.setItem('portfolioItems', JSON.stringify(pfData));

		// save the eTag in local storage to compage with later visits
		localStorage.setItem('eTag', res.getResponseHeader('eTag'));

		// start up the Index page
		siteView.initIndexPage();
	};

	module.PortfolioItem = PortfolioItem;
})(app);