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