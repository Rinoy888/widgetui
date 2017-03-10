'use strict';

/**
 * @ngdoc function
 * @name alFjrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the alFjrApp
 */

angular.module('BczUiApp')
    .controller('FuelCtrl', function (fuelService, $interval,$http) {
        var vm = this;

        vm.openPopup = function () {
            vm.popup = true;
            getData();
        }

        vm.closePopup = function () {
            vm.popup = false;
        }

        
        var index = 0;
        $http.get('data.json').success(function(data) {
           vm.fueldata = data;
            vm.setdata(index);
           console.log(vm.fueldata[index])
        });


        vm.toggleData = function(){
            if( index < vm.fueldata.length-1){
                index++;
            }else{
                index = 0;
            }
            vm.setdata(index);
        }

        vm.init = function(){
            $interval(function(){
                vm.toggleData();
            },3000)

        }

        vm.setdata = function(index){
            vm.currentData = vm.fueldata[index];
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

        vm.init();

    })
