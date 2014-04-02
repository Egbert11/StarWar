var base_month = new Date().getMonth();

var calendar = { 
	dayTable:null, //初始化TABLE 
	year:null, //初始化年 
	month:null, //初始化月份 
	allData:null,
	getFirstDay:function(year,month){ //获取每个月第一天再星期几 
		var firstDay = new Date(year,month,1); 
		return firstDay.getDay(); //getDay()方法来获取 
	}, 

	getMonthLen:function(year,month){ //获取当月总共有多少天 
		var nextMonth = new Date(year,month+1,1); //获取下个月的第一天 
		nextMonth.setHours(nextMonth.getHours() - 3); //由于获取的天是0时,所以减去3小时则可以得出该月的天数 
		return nextMonth.getDate(); //返回当天日期 
	}, 

	createCalendar:function(form,date){ //创建日历方法 
		calendar.year = date.getFullYear(); //获得当时的年份,并赋值到calendar属性year中,以便别的方法的调用 
		calendar.month = date.getMonth(); //跟上面获取年份的目的一样 
		form.getElementsByTagName('dt')[2].innerHTML = calendar.year + '年 ' + (calendar.month + 1) + '月'; //插入年份和月份
		calendar.clearCalendar(form); //清空TABLE 
		var monthLen = calendar.getMonthLen(calendar.year,calendar.month); //获取月份长度 
		var firstDay = calendar.getFirstDay(calendar.year,calendar.month); //获取月份首天为星期几 
		//清空样式
		var cell = $("#tab1 dd");
		cell.removeClass();
		for(var i = 1;i <= monthLen;i++){ //循环写入每天的值进入TABLE中
            var text = document.createTextNode(i);
			calendar.dayTable[i+firstDay-1].appendChild(text); //i为循环值,加上第一天的星期值刚可以对应TABLE位置,但由于数组从0开始算,所以需要减去1

			//增加id
			$(calendar.dayTable[i+firstDay-1]).addClass("day"+i);
//			$(calendar.dayTable[i+firstDay-1]).attr('id',"day"+i);
			if(i == new Date().getDate() && calendar.month == new Date().getMonth() && calendar.year == new Date().getFullYear()){ //判断是否是当天 
				calendar.dayTable[i+firstDay-1].id = 'today'; 
			} 
		} 
	}, 

	clearCalendar:function(form){ //清空TABLE方法 
		this.dayTable = form.getElementsByTagName('dd'); 
		for(var i = 0;i < this.dayTable.length;i++){ 
			this.dayTable[i].innerHTML = ''; 
			this.dayTable[i].id = ''; 
		} 
	}, 

	addStarInCalendar:function(form,hostid,size){//添加每日记录
		var len = form.getElementsByTagName('dd').length;
		for(var i=0;i<len;i++){
			if(form.getElementsByTagName('dd')[i].innerHTML != "" ){
				var text = '<b class="award"></b><b class="award-bg2"></b>';
				$("#calendar dd:eq("+i+")").append(text); 
			}
		}

		var baseUrl = "http://192.168.11.42:8390/dailyactive/"
		var url = baseUrl + "get_author_star_road";
		var hostid = arguments[1]? arguments[1]:20051152;
		var size = arguments[2]?arguments[2]:3;
		var dd = new Date();
		var nyear = dd.getYear();
		var nmonth = dd.getMonth() + 1;

		$.ajax({	
			url:url,
			dataType:"json",
			data:{
				year:nyear,
				month:nmonth,
				hostid:hostid,
				size:size
			},
			type:"GET",
			success:function(data){
					//数据获取失败==
					if (data.code != 0)return;
					var rs = data.result;
					var ddArr = $("#calendar dd");
					$.each(ddArr,function(index,value){
						if($(this).html()== "")return;
						var nday = $(this).html();
						if (nmonth < 10 )nmonth = "0" + nmonth;
						if (nday < 10 ) nday = "0" + nday;
						var key = nyear + "-" + nmonth + "-" + nday; 
						console.log("key"+key);
						console.log(rs[key]);
						$(this).bind({

						mouseover:function(e){
							if($(this).html() != ""){
								var hoverLayer = $("#calendar_hover");
								hoverLayer.empty();
								hoverLayer.append('<span class="sjrank_title">粉丝贡献榜</span><br/>');
								var len = rs[key].player_list.length;
								if (len > 0){
									hoverLayer.append('');	
								}
								var x = $(this).offset().left;
								var y = $(this).parent("dl").offset().top; 
								$("#calendar_hover").css("top",y+50);
								$("#calendar_hover").css("left",x-36);
								$("#calendar_hover").show();
							}
						},
						mouseout:function(){
							if($(this).html() != ""){
								$("#calendar_hover").hide();
							}
						}
					});
			
				});
			}
		});	
				

	},

	init:function(form){ //主方法 
		this.dayTable = form.getElementsByTagName('dd'); 
		this.createCalendar(form,new Date()); 
		var preMon = form.getElementsByTagName('span')[0];
		var nextMon = form.getElementsByTagName('span')[1];
		 
		console.log(preMon);
		preMon.onclick = function(){ //当点击左按钮时,减去一个月,并重绘TABLE
			calendar.createCalendar(form,new Date(calendar.year,calendar.month-1,1)); 
			calendar.addStarInCalendar(form);
			if(base_month -2 >= calendar.month){
				preMon.innerHTML = "";
			}
			nextMon.innerHTML = "&gt;";
		}
		nextMon.onclick = function(){ //当点击右按钮时,加上一个月,并重绘TABLE
			calendar.createCalendar(form,new Date(calendar.year,calendar.month+1,1)); 
			calendar.addStarInCalendar(form);
			preMon.innerHTML = "&lt;";
			if(base_month  >= calendar.month){
				nextMon.innerHTML = "";				
			}
		}
		nextMon.innerHTML = "";
		this.addStarInCalendar(form);
	}
}

window.onload = function(){
	var calendars = document.getElementById('calendar'); 
	calendar.init(calendars);
}


$(function(){
	$("#calendar dd").bind({
		mouseover:function(e){
			if($(this).html() != ""){
				var dd = new Date();
				var nyear = dd.getYear();
				var nmonth = dd.getMonth() + 1;
				var nday = $(this).html();
				var x = $(this).offset().left;
				var y = $(this).parent("dl").offset().top; 
				$("#calendar_hover").css("top",y+50);
				$("#calendar_hover").css("left",x-36);
				$("#calendar_hover").show();
			}
		},
		mouseout:function(){
			if($(this).html() != ""){
				$("#calendar_hover").hide();
			}
		}
	});

});
