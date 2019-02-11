// https://api.openweathermap.org/data/2.5/weather?id=1835848&appid=c5cbde66c90d6fe3bc86407aea2b9a52&units=metric

// api.openweathermap.org/data/2.5/forecast?id=1835848&appid=c5cbde66c90d6fe3bc86407aea2b9a52&units=metric

// $.ajax({
//     type: "get",
//     url: "../json/city.json",
//     dataType: "json",
//     success:function(data){
//         console.log(data);
//     },
//     error:function (xhr, status, error) {  
//         console.log(xhr, status, error);
//     }
// });

$.ajax({
    type: "get",
    url: "https://api.openweathermap.org/data/2.5/weather",
    data:{ 
        id : "1835848",
        appid : "c5cbde66c90d6fe3bc86407aea2b9a52",
        units : "metric"
    },
    dataType: "json",
    success: function (response) {
        console.log(response);
        var imgRoot = "http://openweathermap.org/img/w/";
        var imgSrc = imgRoot + response.weather[0].icon + ".png";
        var html = '';
        html += '<div><img src="' + imgSrc + '"></div>';
        html += '<h1>서울날씨 : ' + response.main.temp + '도 </h1> '
        $("body").append(html);

    }
});