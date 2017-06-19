'use strict';

var app = app || {};  //eslint-disable-line

(function (module) {                                    //eslint-disable-line
	function PortfolioItem(portfolioItemObj) {
		Object.keys(portfolioItemObj).forEach(key => this[key] = portfolioItemObj[key]);
	}

	PortfolioItem.all = [];

	// Find a way to use reduce... make an array of devs/teams involved in these projects
	PortfolioItem.allDevs = function () {
		return PortfolioItem.all.map(item => item.dev)
		.reduce((devArray, dev) => {
			!devArray.includes(dev) ? devArray.push(dev) : devArray
			return devArray;
		}, []);
	};

    // ...then use that array for something
    PortfolioItem.numProjs = function () {
			return PortfolioItem.allDevs().map(dev => {
				let devObj = {
					name: dev,
					desc: PortfolioItem.all.filter(pfObj => pfObj.dev === dev)
					.map(item => item.description.split(' ').length)
					.reduce((total, value) => total + value )
				};
				return devObj;
			})
		};

	PortfolioItem.fetchAll = callback => {
		PortfolioItem.loadAll = pfItem => {
			pfItem.sort((a, b) => (new Date(b.lastUpdated)) - (new Date(a.lastUpdated)));  //eslint-disable-line

			PortfolioItem.all = pfItem.map(pfItem => new PortfolioItem(pfItem));
		};

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
			if (!localStorage.portfolioItems) {
				PortfolioItem.getFromDB();
			} else {
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
			})
		};

		// make the portfolio items the first time
		PortfolioItem.createItems = function (pfData, message, res) {
			PortfolioItem.loadAll(pfData);

			// save the portfolio items in local storage
			localStorage.setItem('portfolioItems', JSON.stringify(pfData));

			// save the eTag in local storage to compare with later visits
			localStorage.setItem('eTag', res.getResponseHeader('eTag'));

			// start up the Index page
			siteView.initIndexPage();
		};
		callback();
	};

	module.PortfolioItem = PortfolioItem;
})(app);