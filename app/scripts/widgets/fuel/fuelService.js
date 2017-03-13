'use strict';

/**
 * @ngdoc service
 * @name bluroeApp.powerprogress
 * @description
 * # powerprogress
 * Service in the bluroeApp.
 */
angular.module('BczUiApp')
    .service('fuelService', function ($http, $interval,HOST) {

        var vm = this;
        vm.fuelData = [];
        var createWid = false;

        vm.getTotalData = function(callback){
            $http.post(HOST + '/api/widget/gettotalfuel')
                .success(function(data) {
                    vm.totalFuelData = data.data[0];
                    callback(vm.totalFuelData);
                }, function(resp) {
                    console.log(resp)
                });            
        }

        vm.getData = function (callback) {
            getData(callback);
        }


        var getData = function(callback){
            $http.post(HOST + '/api/widget/getfuelinterval')
                .success(function(data) {
                    vm.fuelData = vm.processData(data.data);
                    createWidget(vm.fuelData[0].values[vm.fuelData[0].values.length-1]);
                    callback(vm.fuelData);
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

        function createWidget(data){
            if(!data) return;
            if(!createWid){
                createWid = true;
                var counter = 1;
                var lastDay = data.x;
                $interval(function(){
                    var tempObject = {
                        time :  convertTime(data,lastDay,counter),
                        fuel : getRandom(1, 10),
                        miles : getRandom(1, 100),

                    }
                    $http.post(HOST + '/api/widget/createwidget', tempObject)
                        .success(function(data) {

                        });
                        counter++;
                        // console.log(tempObject)
                },1000)
            }
        }

        function convertTime(data,lastDay,counter){
            var time = moment(lastDay).days(counter).unix();

            var date = new Date(time * 1000);
            var datevalues = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
            console.log(datevalues)
            return datevalues;
        }

        function getRandom(min, max){
            return parseInt(min + (Math.random() * (max - min)))
        }
    });