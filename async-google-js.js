'use strict';

(function (angular) {

    var app = angular.module('AsyncGoogleJs', []);

    app.provider('asyncJs', [function () {
        var maps = false;

        return {
            apiKey: null,
            $get: ['$q', function ($q) {
                return {
                    maps: false,
                    mapUrl: 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=scriptLoad',
                    loadScript: function (url) {
                        var defer = $q.defer();
                        window.scriptLoad = function () {
                            maps = true;
                            defer.resolve();
                        };

                        var script = document.createElement('script');
                        script.src = url;
                        script.onerror = function (e) {
                            setTimeout(function () {
                                defer.reject(e);
                            }, 0);
                        };
                        document.body.appendChild(script);
                        return defer.promise;
                    },
                    gmaps: function () {
                        if (!maps) {
                            return this.loadScript(this.mapUrl);
                        } else {
                            var defer = $q.defer();
                            defer.resolve();
                            return defer.promise;
                        }
                    }
                }
            }]
        }
    }
    ])
    ;
})
(angular);