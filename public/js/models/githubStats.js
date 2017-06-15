'use strict';

var app = app || {};   // eslint-disable-line

(function (module) {
    const githubStats = {};

    githubStats.requestStats = function (callback) {
        $.get('https://api.github.com/users/sevfitz')
            .then(results => githubStats.data = results, err => console.error(err))
            .then(callback);
    };

    module.githubStats = githubStats;
}(app));