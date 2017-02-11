angular.module("ui.materialize.carousel", [])
        .directive("carousel", ["$timeout", function($timeout){
            return {
                restrict: 'A',
                scope: {
                    duration: '@',
                    dist: '@',
                    shift: '@',
                    padding: '@',
                    fullWidth: '@',
                    indicators: '@',
                    noWrap: '@'
                },
                link: function(scope, element, attrs) {

                    $timeout(function(){
                        element.addClass("carousel");
                        element.carousel({
                            duration: (angular.isDefined(scope.duration)) ? scope.duration : 200,
                            dist: (angular.isDefined(scope.dist)) ? scope.dist : -100,
                            shift: (angular.isDefined(scope.shift)) ? scope.shift : 0,
                            padding: (angular.isDefined(scope.padding)) ? scope.padding : 0,
                            fullWidth: (angular.isDefined(scope.fullWidth)) ? scope.fullWidth : false,
                            indicators: (angular.isDefined(scope.indicators)) ? scope.indicators : false,
                            noWrap: (angular.isDefined(scope.noWrap)) ? scope.noWrap : false
                        });
                    });
                }
            };
        }]);

 angular.module("ui.materialize.materialboxed", [])
        .directive("materialboxed", ["$timeout", function($timeout){
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    $timeout(function(){
                        element.materialbox();
                    });

                }
            };
        }]);


 angular.module("ui.materialize.modal", [])
        .directive("modal", ["$compile", "$timeout", function ($compile, $timeout) {
            return {
                scope: {
                    dismissible: "=",
                    opacity: "@",
                    inDuration: "@",
                    outDuration: "@",
                    ready: '&?',
                    complete: '&?',
                    open: '=?',
                    enableTabs: '@?'
                },
                link: function (scope, element, attrs) {
                    $timeout(function () {
                        var modalEl = $(attrs.href ? attrs.href : '#' + attrs.target);
                        $compile(element.contents())(scope);

                        var complete = function () {
                            angular.isFunction(scope.complete) && scope.$apply(scope.complete);

                            scope.open = false;
                            scope.$apply();
                        };
                        var ready = function() {
                          angular.isFunction(scope.ready) && scope.$apply(scope.ready);
                          // Need to keep open boolean in sync.
                          scope.open = true;
                          scope.$apply();

                          // If tab support is enabled we need to re-init the tabs
                          // See https://github.com/Dogfalo/materialize/issues/1634
                          if (scope.enableTabs) {
                             modalEl.find('ul.tabs').tabs();
                          }
                        };
                        var options = {
                            dismissible: (angular.isDefined(scope.dismissible)) ? scope.dismissible : undefined,
                            opacity: (angular.isDefined(scope.opacity)) ? scope.opacity : undefined,
                            in_duration: (angular.isDefined(scope.inDuration)) ? scope.inDuration : undefined,
                            out_duration: (angular.isDefined(scope.outDuration)) ? scope.outDuration : undefined,
                            ready: ready,
                            complete: complete,
                        };
                        modalEl.modal(options);
                        element.modal(options);

                        // Setup watch for opening / closing modal programatically.
                        if (angular.isDefined(attrs.open) && modalEl.length > 0) {
                          scope.$watch('open', function(value, lastValue) {
                            if (!angular.isDefined(value)) { return; }
                            (value === true) ? modalEl.modal('open') : modalEl.modal('close');
                          });
                        }
                    });
                }
            };
        }]);
        


angular.module("ui.materialize.sidenav", [])
        .directive("sidenav", [function () {
            return {
                scope: {
                    menuwidth: "@",
                    closeonclick: "@"
                },
                link: function (scope, element, attrs) {
                    element.sideNav({
                        menuWidth: (angular.isDefined(scope.menuwidth)) ? parseInt(scope.menuwidth, 10) : undefined,
                        edge: attrs.sidenav ? attrs.sidenav : "left",
                        closeOnClick: (angular.isDefined(scope.closeonclick)) ? scope.closeonclick == "true" : undefined
                    });
                }
            };
        }]);
        