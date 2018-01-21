/*
* @Author: admin
* @Date:   2018-01-19 11:17:31
* @Last Modified by:   admin
* @Last Modified time: 2018-01-20 15:36:14
*/
var weather;
var city
$.ajax({
	url: 'https://www.toutiao.com/stream/widget/local_weather/data/?city=太原',
	type: 'get',
	dataType: 'jsonp',
	success:function(obj){
		weather=obj.data.weather;
		console.log(obj);

	}
	
})
$.ajax({
    url: 'https://www.toutiao.com/stream/widget/local_weather/city/',
    type: 'get',
    dataType: 'jsonp',
   success:function(obj){
       city=obj.data;
        console.log(obj);

    }
})


//渲染页面数据
function updata(){
   var cityName=document.getElementsByClassName("header")[0];
      cityName.innerHTML=weather.city_name;
   var wendu=document.getElementsByClassName("weidu")[0];
    wendu.innerHTML=weather.current_temperature+"°";
    var now_weather=document.getElementsByClassName("xianshi")[0];
    now_weather.innerHTML=weather.dat_condition;
    var air=document.getElementsByTagName("h3")[0];
    air.innerHTML=weather.quality_level;

    var dat_high_temperature=document.getElementById("dat_high_temperature");
      dat_high_temperature.innerHTML=weather.dat_high_temperature;

    var dat_low_temperature=document.getElementById("dat_low_temperature");
     dat_low_temperature.innerHTML=weather.dat_low_temperature;
    var day_condition=document.getElementById("day_condition");
      day_condition.innerHTML=weather.day_condition;
     //图片
    var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
    dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);` ;
    var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
    tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);` ;
    var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
    tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
    var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
    tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
    var tomorrow_condition=document.getElementById("tomorrow_condition");
    tomorrow_condition.innerHTML=weather.tomorrow_condition;


    for(var i in weather.hourly_forecast){
    	var now=document.createElement("div");
    	now.className="now";
    	//huo qu now de fu yuan su 
    	var nowp=document.getElementById("now");
    	//ba now cha ru fu yuan su 
    	nowp.appendChild(now);

    	var now_time=document.createElement("h2");
    	    now_time.className="now_time";
    	    now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
            now.appendChild(now_time);

          var now_icon=document.createElement("div")
           now_icon.className="now_icon";
           now_icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png)`
           now.appendChild(now_icon);
           var now_temperature=document.createElement("div");
    	   now_temperature.className="now_temperature";
    	    now_temperature.innerHTML=weather.hourly_forecast[i].temperature+"°";
            now.appendChild(now_temperature);

  }
            //
            for(var j in weather.forecast_list){
	         var recent=document.createElement("div");
    	      recent.className="recent";
    	      //huo qu now de fu yuan su 
    	     var recentp=document.getElementById("recent");
    	     //ba now cha ru fu yuan su 
    	   recentp.appendChild(recent);

     var recent_time=document.createElement("div");
             recent_time.className="recent_time";
            recent_time.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/"+weather.forecast_list[j].date.substring(8);
            recent.appendChild(recent_time);
        // var month=document.createElement("span");
        //   month.className="month";
        //   month.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/";
        //   recent_time.appendChild(month);
        //   var day=document.createElement("span");
        //   day.className="day";
        //   day.innerHTML=weather.forecast_list[j].date.substring(8);
        //   recent_time.appendChild(day);
    	    var condition =document.createElement("h2");
    	   condition.className="h2";
    	    condition.innerHTML=weather.forecast_list[j].condition;
            recent.appendChild(condition);
           //   var date=document.createElement("date");
           // date=.innerHTML=weather.date;
 //  console.log(weather)
 // for(var j in )
        



            var  weather_icon_id=document.createElement("div");
                 weather_icon_id.className="recent_pic";
              weather_icon_id.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png);`;
              recent.appendChild(weather_icon_id);

         var high_temperature=document.createElement("h3");
           high_temperature.className="h3";
           high_temperature.innerHTML=weather.forecast_list[j].high_temperature+"°";
            recent.appendChild(high_temperature);

            var low_temperature=document.createElement("h4");
           low_temperature.className="h4";
           low_temperature.innerHTML=weather.forecast_list[j].low_temperature+"°";
            recent.appendChild(low_temperature);

               var wind_direction=document.createElement("h5")
                 wind_direction.className="h5";
                  wind_direction.innerHTML=weather.forecast_list[j].wind_direction;
                 recent.appendChild(wind_direction);

                  var wind_level=document.createElement("h6");
                 wind_level.className="h6";
              wind_level.innerHTML=weather.forecast_list[j].wind_level;
               recent.appendChild(wind_level);
            }
          var header=document.getElementsByClassName("header")[0];
          var city_box=document.getElementsByClassName("city_box")[0];
             header.onclick=function(){
                 $(".text").val("");
                 $(".button").html("取消");
            city_box.style="display:block";
          }
              for(var k in city){
            console.log(k);
            var cityp=document.getElementById("city");
            var biaoti=document.createElement("h1");
            biaoti.className="biaoti";
            biaoti.innerHTML=k;
            cityp.appendChild(biaoti);

         var con=document.createElement("div");
             con.className="con";
             for(var y in city[k]){
            // console.log(y);
             var son=document.createElement("div");
               son.className="son";
               son.innerHTML=y;
               con.appendChild(son);
                     }
                     cityp.appendChild(con);
              }


 }

function AJAX(str){
  $.ajax({
       url: `https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
       type: 'get',
       dataType: 'jsonp',
       success:function(obj){
        weather=obj.data.weather;
        updata();
       
        $(".city_box").css({"display":"none"});
                        }
    
      })


}
//当页面加载完成
window.onload=function(){
 updata();
 $(".son").on("click",function(){
             var cityh=this.innerHTML;
                 AJAX(cityh);
                               })
    // input huo qu jiao dian  button bian queren
    // focus huo qu jiao dian 
    // html she zhi huo gai bian nei rong
               $(".text").on("focus",function(){
                $(".button").html("确认");
                                 })
 var button=document.getElementsByClassName("button")[0];
    //console.log(button);
   button.onclick=function(){
     // console.log(1);
     var btn=this.innerHTML;
     if(btn=="取消"){
     //console.log(1);
     var city_box1=document.getElementsByClassName("city_box")[0];
     city_box1.style="display:none";
                    }
     else{
     // if(btn=="确认"){
      var str1=document.getElementsByClassName("text")[0].value;
     // console.log(str);
     // for(var i in city){
     //    if(str==i){
     //        AJAX(str);
     //        return;
     //              }
     //    else{
     //        for(var j in city[i]){
     //            if(str==j){
     //                AJAX(str);
     //                return;
     //                      }
     //                             }
     //        }
     //                   }
     //                   
  for(var i in city){
      for(var j in city[i]){
        if(str1==j){
            AJAX(str1);
            return;
        }
    }
}
alert("没有该城市气象信息");

                  //}
        }
                          }
}
