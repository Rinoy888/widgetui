'use strict';

/**
 * @ngdoc function
 * @name alFjrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the alFjrApp
 */

angular.module('BczUiApp')
    .controller('MilesCtrl', function ( milesService,$interval,$http) {
        var vm = this;

        vm.openPopup = function () {
            vm.popup = true;
            getData();
        }

        vm.closePopup = function () {
            vm.popup = false;
        }

        vm.init = function(){        
            $interval(function () {
                getData();
            },1000)
            getData();
        }

        vm.options = {
            chart: {
                type: 'multiBarChart',
                height: 270,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 45,
                    left: 45
                },
                clipEdge: true,
                //staggerLabels: true,
                duration: 500,
                stacked: true,
                xAxis: {
                    axisLabel: 'Time (days)',
                    showMaxMin: false,
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'Fuel',
                    axisLabelDistance: -20,
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                }
            }
        }



        function getData() {
            milesService.getData(function (data) {
                vm.data = data;
            })
            milesService.getTotalData(function (data) {
                vm.currentData = data;
            })
        }

        vm.init();
    })
