var app = angular.module("myApp",['ngRoute']);

let year = 2019;
// let hteamid = 0;

app.factory('Data', function(){
    return {
        hteamid : 0
    }
});


app.controller("teamCtrl",function ($scope,$route) {
    $scope.$route = $route;
});
app.controller("gameCtrl",function ($scope,$route) {
    $scope.$route = $route;
});
app.controller("victoryCtrl",function ($scope,$route) {
    $scope.$route = $route;
});
app.controller("victoryCtrl",function ($scope,$route) {
    $scope.$route = $route;
});
app.controller("predictionCtrl",function ($scope,$route) {
    $scope.$route = $route;
});
app.controller("nextCtrl",function ($scope,$route) {
    $scope.$route = $route;
});
app.controller("rankCtrl",function ($scope,$route) {
    $scope.$route = $route;
});
app.controller("detailCtrl",function ($scope,$route) {
    $scope.$route = $route;
});
app.controller("rateCtrl",function ($scope,$route) {
    $scope.$route = $route;
});
app.config(["$routeProvider",function ($routeProvider) {
    $routeProvider
        .when('/team',{
            templateUrl:'teams.html',
            controller:'teamCtrl'
        })
        .when('/game',{
            templateUrl:'games.html',
            controller:'gameCtrl'
        })
        .when('/victory',{
            templateUrl:'victory.html',
            controller:'victoryCtrl'
        })
        .when('/prediction',{
            templateUrl:'prediction.html',
            controller:'predictionCtrl'
        })
        .when('/next',{
            templateUrl:'next.html',
            controller:'nextCtrl'
        })
        .when('/rank',{
            templateUrl:'rank.html',
            controller:'rankCtrl'
        })
        .when('/detail',{
            templateUrl:'detail.html',
            controller:'detailCtrl'
        })
        .when('/rate',{
            templateUrl:'rate.html',
            controller:'rateCtrl'
        })
        .otherwise({
            redirectTo:'/'
        });
}]);
app.controller("myCtrl",function ($scope) {

});

app.controller('teamCtrl', function($scope, $http,Data) {

    $http.get("https://api.squiggle.com.au/?q=teams")
        .success(function (result) {
            console.log(result);
            $scope.names = result.teams;
            $scope.selectTeam = function (event) {
                console.log(event.target.getAttribute('id'));
                Data.hteamid = event.target.getAttribute('id')
                $scope.hteam = event.target.getAttribute('name')
            }
        });
});

app.controller('gameCtrl', function($scope, $http,Data) {
    let hteamid =  Data.hteamid;
    $scope.hteam = '';
    if (hteamid == 0) {
        return false;
    }
    $http.get("https://api.squiggle.com.au/?q=games;year="+year+"")
        .success(function (result) {
            if (result.games != undefined && result.games.length > 0) {
                let arr = [];
                let hteamName = '';
                result.games.forEach(function (v,k,i) {
                    if (v.hteamid == hteamid) {
                        hteamName = v.hteam
                        arr.push(v)
                    }
                })
                $scope.games = arr;
                $scope.hteam = hteamName
            }});
});

app.controller('victoryCtrl', function($scope, $http,Data) {
    let hteamid =  Data.hteamid;
    $scope.hteam = '';
    $scope.count = 0;
    if (hteamid == 0) {
        return false;
    }
    $http.get("https://api.squiggle.com.au/?q=games;year="+year+"")
        .success(function (result) {
            if (result.games != undefined && result.games.length > 0) {
                let arr = [];
                let hteamName = '';
                let c = 0;
                result.games.forEach(function (v,k,i) {
                    if (v.hteamid == hteamid && v.winnerteamid == hteamid) {
                        hteamName = v.hteam
                        arr.push(v)
                        c++;
                    }
                })
                $scope.games = arr;
                $scope.hteam = hteamName;
                $scope.count = c;
            }
        });
});

app.controller('predictionCtrl', function($scope, $http,Data) {
    let hteamid =  Data.hteamid;
    $scope.hteam = '';
    if (hteamid == 0) {
        return false;
    }

    $http.get("https://api.squiggle.com.au/?q=games;year="+year+"")
        .success(function (result) {
            if (result.games != undefined && result.games.length > 0) {
                let arr = [];
                let hteamName = '';

                let nextArr = [];

                result.games.forEach(function (v,k,i) {
                    if (v.hteamid == hteamid) {
                        hteamName = v.hteam
                        if (nextArr.length < 5) {
                            nextArr.push(v.id)
                        } else {
                            nextArr.pop()
                            nextArr.push(v.id)
                        }
                    }
                })
                console.log(nextArr)

                if (nextArr.length>0)
                {
                    nextArr.forEach(function (v,k,i) {
                        $http.get("https://api.squiggle.com.au/?q=tips;source=1;year="+year+";game="+v+"")
                    .success(function (result) {
                            if (result.tips != undefined && result.tips.length > 0) {
                                result.tips.forEach(function (v,k,i) {
                                    arr.push(v)
                                })
                            }
                        });
                    })
                    $scope.hteam = hteamName;
                    $scope.games = arr;

                }

            }});
});

app.controller('nextCtrl', function($scope, $http,Data) {
    let hteamid =  Data.hteamid;
    $scope.hteam = '';
    if (hteamid == 0) {
        return false;
    }

    $http.get("https://api.squiggle.com.au/?q=games;year="+year+"")
        .success(function (result) {
            if (result.games != undefined && result.games.length > 0) {
                let arr = [];
                let hteamName = '';

                let nextArr = [];

                result.games.forEach(function (v,k,i) {
                    if (v.hteamid == hteamid) {
                        hteamName = v.hteam
                        if (nextArr.length < 1) {
                            nextArr.push(v.id)
                        } else {
                            nextArr.pop()
                            nextArr.push(v.id)
                        }
                    }
                })

                if (nextArr.length>0)
                {
                    nextArr.forEach(function (v,k,i) {
                        $http.get("https://api.squiggle.com.au/?q=tips;year="+year+";game="+v+"")
                            .success(function (result) {
                                if (result.tips != undefined && result.tips.length > 0) {
                                    result.tips.forEach(function (v,k,i) {
                                        arr.push(v)
                                    })
                                }
                            });
                    })
                    $scope.hteam = hteamName;
                    $scope.games = arr;

                }

            }});
});

app.controller('rankCtrl', function($scope, $http,Data) {
    $http.get("https://api.squiggle.com.au/?q=ladder;source=2")
        .success(function (result) {

            let xAxis = []
            let percentage = []
            let wins = []
            let source = ''

            result.ladder.forEach(function (v,k,i) {
                xAxis.push(v.team)
                percentage.push(v.percentage)
                wins.push(v.wins)
                source = v.source
            })

            var myChart = echarts.init(document.getElementById('main'));

            let option = {
                title: {
                    text: 'RanK List(source:'+ source +')'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['percentage', 'wins']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: xAxis
                },
                series: [
                    {
                        name: 'percentage',
                        type: 'bar',
                        data: percentage
                    },
                    {
                        name: 'wins',
                        type: 'bar',
                        data: wins
                    }
                ]
            };

            myChart.setOption(option);
        });

});

app.controller('detailCtrl', function($scope, $http,Data) {
    $http.get("https://api.squiggle.com.au/?q=ladder;source=2")
        .success(function (result) {

            let o = document.getElementById('echarts-container');

            result.ladder.forEach(function (v,k,i) {
                let id = 'main-'+v.teamid
                // let div = document.createElement('div')
                // div.innerHTML = '<div id="'+id+'"style="height:400px;width: 800px" class="col-md-4"></div>'
                // o.appendChild(div)

                let xAxis = []
                let swarms = []
                let source = ''
                let team = ''
                source = v.source;
                team = v.team;


                v.swarms.forEach(function (v,k,i) {
                    xAxis.push(k)
                    swarms.push(v)
                })

                var myChart = echarts.init(document.getElementById(id));

                let option = {
                    title: {
                        text: team + '(source:'+ source +')'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: swarms,
                        type: 'line'
                    }]
                };

                myChart.setOption(option);

            })


        });

});


app.controller('rateCtrl', function($scope, $http,Data) {

    let teams = '';

    let t1 = document.getElementById('t1')
    let t2 = document.getElementById('t2')

    $http.get("https://api.squiggle.com.au/?q=teams")
        .success(function (result) {
            console.log(result);
            $scope.names = result.teams;
            result.teams.forEach(function (v,k,i) {
                teams += "<option value='"+v.id+"'>"+v.name+"</option>";
            })
            t1.innerHTML = teams;
            t2.innerHTML = teams;
        });


    $scope.caculateRate = function () {
        let hteamid = t1.options[t1.selectedIndex].value
        let ateamid = t2.options[t2.selectedIndex].value

        let rate = 0
        let total = 0

        if (ateamid != hteamid) {
            $http.get("https://api.squiggle.com.au/?q=games;year="+year+"")
                .success(function (result) {
                    if (result.games != undefined && result.games.length > 0) {

                        let wins = 0

                        result.games.forEach(function (v,k,i) {
                            if (v.hteamid == hteamid && v.ateamid == ateamid || v.hteamid == ateamid && v.ateamid == hteamid  ) {
                                total++;
                            }
                            if (v.hteamid == hteamid && v.ateamid == ateamid) {
                                if (v.winnerteamid == hteamid) {
                                    wins++
                                }
                            }
                            if (v.hteamid == ateamid && v.ateamid == hteamid) {
                                if (v.winnerteamid = ateamid){
                                    wins++
                                }
                            }
                        })
                        console.log(total);
                        console.log(wins);

                        if (total != 0) {
                            rate = (wins/total).toFixed(2) * 100
                        }
                        $scope.total = total
                        $scope.rate = rate + '%'
                    }});
        }
    }
});