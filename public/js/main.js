// https://api.openweathermap.org/data/2.5/weather?id=1835848&appid=c5cbde66c90d6fe3bc86407aea2b9a52&units=metric

// api.openweathermap.org/data/2.5/forecast?id=1835848&appid=c5cbde66c90d6fe3bc86407aea2b9a52&units=metric

var apiURL = "https://api.openweathermap.org/data/2.5/";
var appId = "c5cbde66c90d6fe3bc86407aea2b9a52";
var units = "metric"
var files = ["weather", "forecast"];
var options = {
    appId : appId,
    units : units
};

cityInit();
function cityInit(){
    $("#modal").show();
    $.ajax({
        type: "get",
        url: "../json/city.json",
        dataType: "json",
        success: function (data) {
            var html = '<option value="">도시를 선택하세요.</option>';
            for (var i in data.cities) {
                html += '<option value="' + data.cities[i].id + '">';
                html += data.cities[i].name + ' [' + data.cities[i].id + ']</option>';
            }
            $("#city").html(html);
        }
    });
};

$(".nav").click(function () {
    var n = $(this).index();
    $(".nav").css({
        "color": "#222",
        "border-top": "5px solid #fff",
        "border-right": "5px solid #fff",
        "border-left": "5px solid #fff",
        "z-index": 10
    });
    $(this).css({
        "color": "#03f",
        "border-top": "5px solid #666",
        "border-right": "5px solid #666",
        "border-left": "5px solid #666",
        "z-index": 100
    });
    $(".cont").hide();
    $(".cont").eq(n).show();
});
$(".nav").eq(0).trigger("click");

$("#city").change(function(){
    options.id = $(this).val();
    var sendData = {
        type: "get",
        data: options,
        dataType: "json",
    }    
    sendData.url = apiURL + files[0];
    sendData.success = dailyInit;
    $.ajax(sendData);
    sendData.url  = apiURL + files[1] ; 
    sendData.success = weeklyInit ;
    $.ajax(sendData);
});

function dailyInit(data){
    var $daily = $("#daily");
    $("#modal").hide();
    var src = "../img/icon/" + data.weather[0].icon + ".png";
    var temp = data.main.temp + "℃";
    var temp_high = data.main.temp_max + "℃";
    var temp_low = data.main.temp_min + "℃";
    var html = '';
    html += '<ul>';
    // html += '<h1>' + $("#city > option:selected").text() + '</h1>'
    html += '<li class="icon"><img src ="' + src + '"  class="img"></li>';
    html += '<li class="city_name">' + $("#city > option:selected").text() + '</li>'
    html += '<li class="w3-center"><button class="w3-blue w3-button" onclick="cityInit();">도시선택</button></li>';
    html += '<li class="temp">현재평균온도 : ' + '<strong class="w3-text-indigo">' + temp + '</strong>' + '</li>';
    html += '<li class="temp2">최고/최저온도 : ' +  '<strong class="w3-text-indigo">' + temp_high +  '</strong>' +' / '  +  '<strong class="w3-text-indigo">' +  temp_low + '</strong>' + '</li>';
    html += '';
    html += '</ul>';
    $daily.html(html);
};

function weeklyInit(data){
    var $weekly = $("#weekly");
    var src, temp, temp_high, temp_low, date ; 
    $("#modal").hide();
    
    var html = '<div>';
    for (var i in data.list) {
        src = "../img/icon/" + data.list[i].weather[0].icon + ".png";
        temp = data.list[i].main.temp + "℃";
        temp_high = data.list[i].main.temp_max + "℃";
        temp_low = data.list[i].main.temp_min + "℃";
        date = data.list[i].dt_txt;
        html += '<ul class="clear">';
        html += '<li class="icon"><img src="' + src + '" class="img"></li>';
        html += '<li class="content">';
        html += '<div>예보날짜 : ' + date + '</div>';
        html += '<div>현재온도 : ' + temp + '</div>';
        html += '<div>최고/최저온도 : ' + temp_high + '/' + temp_low + '</div>';
        html += '</li>';
        html += '</ul>';
    }
    html += '</div>';
    $weekly.html(html);
}