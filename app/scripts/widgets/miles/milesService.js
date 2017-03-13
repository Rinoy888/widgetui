'use strict';

/**
 * @ngdoc service
 * @name bluroeApp.powerprogress
 * @description
 * # powerprogress
 * Service in the bluroeApp.
 */
angular.module('BczUiApp')
    .service('milesService', function ($http,HOST) {

        var vm = this;
        vm.milesData = [];

        vm.getTotalData = function(callback){
            $http.post(HOST + '/api/widget/gettotalmiles')
                .success(function(data) {
                    vm.totalMilesData = data.data[0];
                    callback(vm.totalMilesData);
                }, function(resp) {
                    console.log(resp)
                });            
        }

        vm.getData = function (callback) {
            getData(callback);
        }


        var getData = function(callback){
            $http.post(HOST + '/api/widget/getwidgets')
                .success(function(data) {
                    vm.milesData = vm.processData(data.data);
                    callback(vm.milesData);
                });
        }


        vm.processData = function(data){
            var tempData = [];
            for(var idx=data.length-1; idx>=0; idx--){
                tempData.push({
                    x : data[idx].time,
                    y : data[idx].fuel,
                });
            }
            return generateData(tempData);
        }


        function generateData(data) {
            return getD3Data(data).map(function(data, i) {
                return {
                    key: 'Fuel',
                    values: data
                };
            });
        }


        function getD3Data(data) {
            return d3.range(1).map(function() {
                return data;
            });
        }
    });
