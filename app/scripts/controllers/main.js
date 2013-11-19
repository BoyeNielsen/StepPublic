'use strict';

angular.module('stepPublicApp')
  .controller('MainCtrl', function ($scope, $timeout,$filter,$http, $routeParams, DB) {


            $scope.showMonth = false;
            $scope.showDays = false;
            $scope.department_id = $routeParams.department_id;

            $scope.graphs = [
                        { name: 'Måned  (3 år)', value: 1 },
                        { name: 'Måned  (1 år)', value: 2 },
                        { name: 'Dag  (1 måned)', value: 3 },
                        { name: 'Timer  (1 dag)', value: 4 }
                    ];
            $scope.months = [
                { name: 'Jan', value: '01' },
                { name: 'Feb', value: '02' },
                { name: 'Mar', value: '03' },
                { name: 'Apr', value: '04' },
                { name: 'Maj', value: '05' },
                { name: 'Jun', value: '06' },
                { name: 'Jul', value: '07' },
                { name: 'Aug', value: '08' },
                { name: 'Sep', value: '09' },
                { name: 'Okt', value: '10' },
                { name: 'Nov', value: '11' },
                { name: 'Dec', value: '12' }
            ];

            $scope.years = [
              { year: 2013 }
            ];

        $scope.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

        $scope.$watch('graph', function () {
            if ($scope.graph) {

                if ($scope.graph.value == 3) {
                    $scope.showMonth = true;
                    $scope.showDays = false;
                }
                else if ($scope.graph.value == 4) {
                    $scope.showMonth = true;
                    $scope.showDays = true;
                } else {
                    $scope.showMonth = false;
                    $scope.showDays = false;
                }

            }
        }); // initialize the watch


       $scope.$watchCollection('[area,graph,year,month,day]', function (newValues,oldValues) {

            var t = {}
            t.area = $scope.area;
            t.graph = $scope.graph;
            t.year = $scope.year;
            t.month = $scope.month;
            t.day = $scope.day;


			DB.stat.getData(t).then(function (response) {

                if (typeof response.data === 'object') {

                    if (response.data.graph.value == 1) {
                        var options = {credits: {
                                enabled: false
                            },chart: {type: "column"}, title: {text: response.data.meter.category_name}, xAxis: {categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}, yAxis: {min: 0, title: {text: "" + response.data.meter.category_name + " (" + response.data.meter.category_unit + ")"}}, tooltip: {headerFormat: '<span style="font-size:10px">{point.key}</span><table>', pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} ' + response.data.meter.category_unit + "</b></td></tr>", footerFormat: "</table>", shared: true, useHTML: true}, plotOptions: {column: {pointPadding: .2, borderWidth: 0}}, series: response.data.series}
                        var chart = $('#chart_div').highcharts(options);
                    }

                    if (response.data.graph.value == 2) {
                        var options = {credits: {
                                enabled: false
                            },chart: {type: "column"}, title: {text: response.data.meter.category_name}, xAxis: {categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}, yAxis: {min: 0, title: {text: "" + response.data.meter.category_name + " (" + response.data.meter.category_unit + ")"}}, tooltip: {headerFormat: '<table>', pointFormat: '<tr>' + '<td style="padding:0"><b>{point.y:.2f} ' + response.data.meter.category_unit + "</b></td></tr>", footerFormat: "</table>", shared: true, useHTML: true}, plotOptions: {column: {pointPadding: .2, borderWidth: 0}}, series: [
                            {name: response.data.year, data: response.data.stat, color: "" + response.data.meter.category_color + "",
                                events: {
                                    click: function(e) {
                                        $scope.$apply(function () {
                                            $scope.graph = $scope.graphs[2];

                                            angular.forEach($scope.months, function(fish, key) {
                                                if(fish.name == e.point.category){
                                                    $scope.month = fish;
                                                }
                                            });
                                        });
                                    }
                                }

                            }
                        ]}
                        var chart = $('#chart_div').highcharts(options);
                    }

                    if (response.data.graph.value == 3) {

                        var chart = $('#chart_div').highcharts({
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: response.data.meter.category_name
                            },
                            xAxis: {
                                categories: response.data.xakse,
                                plotBands: response.data.weekdays
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'Forbrug (' + response.data.meter.category_unit + ')'
                                }
                            },
                            tooltip: {
                                headerFormat: '<table>',
                                pointFormat: '' +
                                    '<td style="padding:0"><b>{point.y:.2f} ' + response.data.meter.category_unit + '</b></td></tr>',
                                footerFormat: '</table>',
                                shared: true,
                                useHTML: true
                            },
                            credits: {
                                enabled: false
                            },
                            plotOptions: {
                                column: {
                                    pointPadding: 0.2,
                                    borderWidth: 0
                                }
                            },
                            series: [
                                {
                                    name: response.data.year,
                                    data: response.data.stat,
                                    color: '' + response.data.meter.category_color + '',
                                    events: {
                                        click: function(e) {
                                            $scope.$apply(function () {
                                              $scope.graph = $scope.graphs[3];
                                              $scope.day = $scope.days[e.point.category - 1];
                                            });
                                        }
                                    }
                                }
                            ]
                        });
                    }

                    if (response.data.graph.value == 4) {

                        var chart = $('#chart_div').highcharts({
                            chart: {
                                type: 'areaspline'
                            },
                            title: {
                                text: response.data.meter.category_name
                            },
                            xAxis: {
                                categories: response.data.xakse
                            },
                            yAxis: {
                                title: {
                                    text: 'Forbrug (' + response.data.meter.category_unit + ')'
                                }
                            },
                            tooltip: {
                                headerFormat: '<table>',
                                pointFormat: '<tr>' +
                                    '<td style="padding:0"><b>{point.y:.1f} ' + response.data.meter.category_unit + '</b></td></tr>',
                                footerFormat: '</table>',
                                shared: true,
                                useHTML: true
                            },
                            credits: {
                                enabled: false
                            },
                            plotOptions: {
                                areaspline: {
                                    fillOpacity: 0.5
                                }
                            },
                            series: [
                                {
                                    name: response.data.year,
                                    data: response.data.stat,
                                    color: '' + response.data.meter.category_color + ''
                                }
                            ]
                        });

                    }

                }   


            });



        });

          $scope.config = function (){

            $scope.area = null;

            DB.stat.getInfo($scope.department_id).then(function (response) {

              $scope.areas = response.data;

                $scope.year = $scope.years[$scope.years.length - 1];
                $scope.graph = $scope.graphs[1];
                $scope.area = $scope.areas[0];
                $scope.month = $scope.months[(new Date()).getMonth()];
                $scope.day = $scope.days[(new Date()).getDate() - 3]; //skal checkes da det giver et problem.
            });

        };

        $scope.config();


  });
