'use strict';

/**
 * @ngdoc function
 * @name alFjrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the alFjrApp
 */

angular.module('BczUiApp')
    .controller('FuelCtrl', function (fuelService, $interval) {
        var vm = this;

        vm.openPopup = function () {
            vm.popup = true;
            getData();
        }

        vm.closePopup = function () {
            vm.popup = false;
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
                    axisLabel: 'Distance (miles)',
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
            if(vm.popup){
                fuelService.getData(function (data) {
                    vm.data = data;
                })
            }
        }

        $interval(function () {
            getData();
        },3000)



    })
