$(document).ready(function(){
    SetSwitchTab();
	SetUpTabClickJump();

	SetUpStarTravelHover();
    //星星排行和粉丝贡献的日，周，月，总点击事件
    starRankTab();
	//各个排行列表的初始化
	fetchStarRankList("get_author_rank","day");
	fetchStarRankList("get_player_rank","day");
	fetchFansContributionList("get_player_author_rank","day");
	fetchFansContributionList("get_player_author_contribute","day");
	
	FetchAndSetBannerData();
	FetchAndSetStarJourneyPageData(2014,3);
});

// set up tab switch
function SetSwitchTab(){
    $(".tabs li").on("a","click",function(){
        $(".tabs li a").removeClass("active");
        $(this).addClass("active");
        $(".main_content .content").hide();
        $("#" + $(this).attr("name")).show();
    })
}

//set up listener on the star travel page;
function SetUpStarTravelHover(data){
	var rs = data.result;
	var cells = $("#tab3 .rank_cells .week_cell");
	$.each(cells,function(index,value){
		var cell = $(this);
		cell.unbind('hover');
		cell.hover(function(){
			//alert("hover");
			var hoverLayer = $("#tab3 .hoverlayer");
			var x = cell.position().left;
			var y = cell.position().top;
			var fx = 0;
			var fy = 0;
			switch(index+1){
				case 1:
					fx = x + 100;
					fy = y +50;
					break;
				case 2:
					fx = x +100;
					fy = y + 50;
					break;
				case 3:
					fx = x - 152;
					fy = y + 50;
					break;
				case 4:
					fx = x + 130;
					fy = y - 60 ; 
					break;
				case 5:
					fx = x -50;
					fy = y - 60;
					break;
				default:
					break;
			}
			hoverLayer.empty();
			hoverLayer.append('<span class="sjrank_title">粉丝贡献榜</span><br/>');
			var len = rs.week[index].player_list.length;
			if (len > 0){
				hoverLayer.append('<span class="icon first"></span>');
				hoverLayer.append('<span class="hover_text_red">'+rs.week[index].player_list[0][0] +'</span>');
				hoverLayer.append('<span class="gift_icon"></span>');
				hoverLayer.append('<span class="hover_text_blue">'+rs.week[index].player_list[0][1]+'</span>');
			}
			if (len > 1){
				hoverLayer.append('<span class="icon_second"></span>');
				hoverLayer.append('<span class="hover_text_dblue">'+rs.week[index].player_list[1][0] +'</span>');
				hoverLayer.append('<span class="gift_icon"></span>');
				hoverLayer.append('<span class="hover_text_blue">'+rs.week[index].player_list[1][1]+'</span>');
			}
			if (len > 2){
				hoverLayer.append('<span class="icon_third"></span>');
				hoverLayer.append('<span class="hover_text_pink">'+rs.week[index].player_list[2][0] +'</span>');
				hoverLayer.append('<span class="gift_icon"></span>');
				hoverLayer.append('<span class="hover_text_blue">'+rs.week[index].player_list[2][1]+'</span>');
			}
				
			hoverLayer.css({display:"block",top:fy+"px",left:fx+"px"});
//			alert(fx+"px"+fy+"px");
			hoverLayer.hover(function(){
				$(this).css({display:"block"});
			},function(){
				$(this).css({display:"none"});
			});
//			alert("hover");
		},function(){	
			var hoverLayer = $("#tab3 .hoverlayer");
			hoverLayer.css({display:"none"});
		});
	});
	var cell = $("#tab3 .sjmonth_rank .sjrank_content");
	cell.hover(function(){
		var hoverLayer = $("#tab3 .mhoverlayer");
		hoverLayer.empty();
			
			hoverLayer.append('<span class="sjrank_title">粉丝贡献榜</span><br/>');
			var len = rs.month.player_list.length;
			if (len > 0){
				hoverLayer.append('<span class="icon_first"></span>');
				hoverLayer.append('<span class="hover_text_red">'+rs.month.player_list[0][0] +'</span>');
				hoverLayer.append('<span class="gift_icon"></span>');
				hoverLayer.append('<span class="hover_text_blue">'+rs.month.player_list[0][1]+'</span>');
			}
			if (len > 1){
				hoverLayer.append('<span class="icon_second"></span>');
				hoverLayer.append('<span class="hover_text_dblue">'+rs.month.player_list[1][0] +'</span>');
				hoverLayer.append('<span class="gift_icon"></span>');
				hoverLayer.append('<span class="hover_text_blue">'+rs.month.player_list[1][1]+'</span>');
			}
			if (len > 2){
				hoverLayer.append('<span class="icon_third"></span>');
				hoverLayer.append('<span class="hover_text_pink">'+rs.month.player_list[2][0] +'</span>');
				hoverLayer.append('<span class="gift_icon"></span>');
				hoverLayer.append('<span class="hover_text_blue">'+rs.month.player_list[2][1]+'</span>');
			}

		hoverLayer.css({display:"block",top:"55px",left:"330px"});
		hoverLayer.unbind("hover");
		hoverLayer.hover(function(){
			$(this).css({display:"block"});
		},function(){
			$(this).css({display:"none"});
		});
	},function(){
		var hoverLayer = $("#tab3 .mhoverlayer");
		hoverLayer.css({display:"none"});
	});
}

//bind the click function with the tab jump effect; 
function SetUpTabClickJump(){
	var tabs = $(".tabs li a");
	$.each(tabs,function(index,value){
		$(this).click(function(){
			var nowSelectedTab = $(".tabs .active");
			nowSelectedTab.removeClass("active");
			$(this).addClass("active");
			var contents = $(".content");
			$.each(contents,function(index,value){
				$(this).removeClass('cactive');
			});
			var nIndex = index + 1;
			var nowContent = $("#tab"+nIndex);
			nowContent.addClass('cactive');
		});
	});
}

//星星排行和粉丝贡献的日，周，月，总点击事件
function starRankTab() {
	//将排名列表的奇偶名次背景进行修饰
	$(".rankList").children(":odd").css("background-color","#eefafd");
    var tab = $(".tab_style");
    tab.find("a").bind("click",function(){
        var parent = $(this).parent().parent();
        parent.find("a").removeClass("active");
        $(this).addClass("active");
        //点击tab的id触发相应的接口调用
        var whichTab = $(this).attr("id");
        switch(whichTab){
            case "1":
                fetchStarRankList("get_author_rank","day");
                break;
            case "2":
                fetchStarRankList("get_author_rank","week");
                break;
            case "3":
                fetchStarRankList("get_author_rank","month");
                break;
            case "4":
                fetchStarRankList("get_author_rank","all");
                break;
            case "5":
                fetchStarRankList("get_player_rank","day");
                break;
            case "6":
                fetchStarRankList("get_player_rank","week");
                break;
            case "7":
                fetchStarRankList("get_player_rank","month");
                break;
            case "8":
                fetchStarRankList("get_player_rank","all");
                break;
			case "9":
                fetchFansContributionList("get_player_author_rank","day");
                break;
            case "10":
                fetchFansContributionList("get_player_author_rank","week");
                break;
            case "11":
                fetchFansContributionList("get_player_author_rank","month");
                break;
            case "12":
                fetchFansContributionList("get_player_author_rank","all");
                break;
            case "13":
                fetchFansContributionList("get_player_author_contribute","day");
                break;
            case "14":
                fetchFansContributionList("get_player_author_contribute","week");
                break;
            case "15":
                fetchFansContributionList("get_player_author_contribute","month");
                break;
            case "16":
                fetchFansContributionList("get_player_author_contribute","all");
                break;
        }
    });
}


//获取星星排行中的数据
function fetchStarRankList(url, dataType){
    $.ajax({
            type: 'GET',
            url: "http://192.168.11.42:8390/dailyactive/"+url,
            data: {
				date: getNowTime(),
				size: 10,
				date_type:dataType
			},
            dataType: 'jsonp',
			jsonp:"callback",
            success: function(data){
				if(data.code == 0){
					var i = 1;
					var list;
					if(url == "get_author_rank"){
						//粉丝列表
						list = 1;
					}else{
						//主播列表
						list = 2;
					}
					//如果没有数据
					if(data.result.length == 0){
						$("#list"+list).hide();
						if(list == 1){
							if($(".zhuboRank:has(p)").length == 0)
								$(".zhuboRank").append('<p style="margin:8px 0 0 55px">暂时未有排行数据</p>');
						}else {
							if($(".fansRank:has(p)").length == 0)
								$(".fansRank").append('<p style="margin:8px 0 0 55px">暂时未有排行数据</p>');
						}
						return;
					}
					//获取到了排行数据
					$("#list"+list).show();
					if(list == 1){
							$(".zhuboRank p").remove();
					}else {
							$(".fansRank p").remove();
					}
					for(;i <= data.result.length;i++)
					{
						var name = $("#list"+list+" #list"+list+"_"+i);
						//填充昵称
						name.find("span:last-child").text(mySubStr(data.result[i-1][0],18));
						switch(i){
							case 1: case 2: case 3:
								break;
							case 4: case 5: case 6: case 7: case 8: case 9: case 10:
								//填充排名序号
								name.find("span:first-child").text(i);
								break;
						}
					}
					//若人数不足10个，将剩下的隐藏
					for(;i<=10 ;i++)
					{
						$("#list"+list+" #list"+list+"_"+i).css("display","none");
					}
				}
			},
			error:function(){}
	});
}

//获取粉丝贡献中的数据
function fetchFansContributionList(url, dataType){
    $.ajax({
            type: 'GET',
            url: "http://192.168.11.42:8390/dailyactive/"+url,
            data: {
				date: getNowTime(),
				hostid:20051152,
				size: 10,
				date_type:dataType
			},
            dataType: 'jsonp',
			jsonp:"callback",
            success: function(data){
				if(data.code == 0){
					var i = 1;
					var list;
					if(url == "get_player_author_rank"){
						//粉丝魅力贡献排行
						list = 3;
					}else{
						//粉丝人气贡献排行
						list = 4;
					}
					//如果没有数据
					if(data.result.length == 0){
						$("#list"+list).hide();
						if(list == 3){
							if($(".charmRank:has(p)").length == 0)
								$(".charmRank").append('<p style="margin:8px 0 0 55px">暂时未有排行数据</p>');
						}else {
							if($(".popularityRank:has(p)").length == 0)
								$(".popularityRank").append('<p style="margin:8px 0 0 55px">暂时未有排行数据</p>');
						}
						return;
					}
					//获取到了排行数据
					$("#list"+list).show();
					if(list == 3){
							$(".charmRank p").remove();
					}else {
							$(".popularityRank p").remove();
					}
					for(;i <= data.result.length;i++)
					{
						var name = $("#list"+list+" #list"+list+"_"+i);
						//填充昵称
						name.find("span:last-child").text(mySubStr(data.result[i-1][0],18));
						switch(i){
							case 1: case 2: case 3:
								break;
							case 4: case 5: case 6: case 7: case 8: case 9: case 10:
								//填充排名序号
								name.find("span:first-child").text(i);
								break;
						}
					}
					//若人数不足10个，将剩下的隐藏
					for(;i<=10 ;i++)
					{
						$("#list"+list+" #list"+list+"_"+i).css("display","none");
					}
				}
			},
			error:function(){}
	});
}

//获取当前时间
function getNowTime(){
	return Math.floor(new Date().getTime()/1000);
}

//对于过长的字符串返回它的子串
function mySubStr(str, maxlen) {
    str = str.trim();
    var len = 0;
    var i;
    for (i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }
            else {
            len += 2;
        }
        if (len > maxlen)
		{
			return str.substring(0, i)+'...';
		}
    }
    return str.substring(0, i);
}

//get the data from banner;
function FetchAndSetBannerData(hostid){
	var hostid = arguments[0] ?  arguments[0] : 1338955;
	var date = new Date().getTime()/1000;
	date = Math.floor(date);
//	var nyear = dd.getFullYear();
//	var nmonth = dd.getMonth()+1;
//	var nday = dd.getDate();
//	if (nmonth < 10)nmonth = "0"+nmonth;
//	if (nday < 10)nday = "0" + nday;
//	var date = nyear + '-' + nmonth + '-' + nday;
	var baseUrl = "http://192.168.11.42:8390/dailyactive/"
	var url = baseUrl + "get_author_rank_info";
	//fetchDataFromServer
	$.ajax({
		url:url,
		dataType:"jsonp",
		type:"GET",
		data:{
			date:date,
			hostid:hostid,
			//callback:"?"
		},
		jsonp:"callback",
		success:function(data){
			//maybe 分离到其他函数去。
			if (data.code != 0 )return;
			var rs = data.result;
			var pinfo = $(".pinfo_content");
			//var person_name = pinfo.find(".person_name");
			//person_name.html(data.anchor_name);
			var contentArr = pinfo.find(".sub_info_content");
			var anchorRank = contentArr[0];
			$(anchorRank).html("LV"+rs.day_level);
			var anchorRenqi = contentArr[1];
			$(anchorRenqi).html(rs.popularity);
			var anchorfo = contentArr[2];
			$(anchorfo).html("等待接口");
	
			var rankcol = $(".banner .star_rank"); 	
			var rcontentArr = rankcol.find(".sub_info_content");
			var todayMei = rcontentArr[0];
			$(todayMei).html(rs.day_charm_rank);
			var todayren = rcontentArr[1];
			$(todayren).html(rs.day_popularity_rank);
			var todaystar = rcontentArr[2];
			$(todaystar).html(rs.day_star_rank);
			var weekstar = rcontentArr[3];
			$(weekstar).html(rs.week_star_rank);
			var monthzong = rcontentArr[4];
			$(monthzong).html(rs.month_star_rank);
		
			var starJourney = $(".banner .star_journey");
			var title = starJourney.find("p .sub_info_title");
			$.each(title,function(index,value){
					$(this).empty();
					$(this).html("");
			});
			//var rankArr = starJourney.find(".sub_info_content");
			var dateArr = starJourney.find(".journey_date");
			
			if (rs.total_rank != 0)
				$(title[0]).html('明星总榜第<span class="sub_info_content">'+rs.total_rank+'</span>名');
				//$(zongbang).html(rs.total_rank);
			else
				$(title[0]).html('无排名');
				;
			
			var zongbangdate = dateArr[0];
			$(zongbangdate).html("等待接口");
			if (rs.total_month_rank != 0)
				$(title[1]).html('明星月榜第<span class="sub_info_content">'+rs.total_month_rank+'</span>名');
			else
				$(title[1]).html('无排名');

				
			//$(monthbang).html(j.b);
			var monthbangdate = dateArr[1];
			$(monthbangdate).html("等待接口");
			var weekbang = rankArr[2];
			var weekbangdate = dateArr[2];
			if (rs.total_week_rank != 0)
				$(title[2]).html('明星周榜第<span class="sub_info_content">'+rs.total_week_rank+'</span>名');
			else
				$(title[2]).html('无排名');

			//$(weekbang).html(j.c);
			$(weekbangdate).html("等待接口");
			
		}
	});		
	//
	//mock it up with fake data.
	data = {
		avatar:"2333.png",
		anchor_name:"herokingsley",
		anchor_rank:6,
		anchor_renqi:123,
		anchor_fo:2333333
	};
	//update the content of the anchor info

	var pic = $(".banner .avatar");
	//pic.attr("src",data.avatar);
	/*
	var pinfo = $(".pinfo_content");
	var person_name = pinfo.find(".person_name");
	person_name.html(data.anchor_name);
	var contentArr = pinfo.find(".sub_info_content");
	var anchorRank = contentArr[0];
	$(anchorRank).html("LV"+data.anchor_rank);
	var anchorRenqi = contentArr[1];
	$(anchorRenqi).html(data.anchor_renqi);
	var anchorfo = contentArr[2];
	$(anchorfo).html(data.anchor_fo);
	*/
	d = {
		a:10,
		b:11,
		c:13,
		d:14,
		e:15
	};
	//update the value of the star rank col
	/*
	var rankcol = $(".banner .star_rank"); 	
	var rcontentArr = rankcol.find(".sub_info_content");
	var todayMei = rcontentArr[0];
	$(todayMei).html(d.a);
	var todayren = rcontentArr[1];
	$(todayren).html(d.b);
	var todaystar = rcontentArr[2];
	$(todaystar).html(d.c);
	var weekstar = rcontentArr[3];
	$(weekstar).html(d.d);
	var monthzong = rcontentArr[4];
	$(monthzong).html(d.e);
	*/
	//setup star journey data;
	//
	var j = {
		a:10,
		aa:"2011-10-09",
		b:15,
		bb:"1111-11-11",
		c:20,
		cc:"1234-05-06"
	};	

	var starJourney = $(".banner .star_journey");
	var rankArr = starJourney.find(".sub_info_content");
	var dateArr = starJourney.find(".journey_date");
	var zongbang = rankArr[0];
	$(zongbang).html(j.a);
	var zongbangdate = dateArr[0];
	$(zongbangdate).html(j.aa);
	var monthbang = rankArr[1];
	$(monthbang).html(j.b);
	var monthbangdate = dateArr[1];
	$(monthbangdate).html(j.bb);
	var weekbang = rankArr[2];
	var weekbangdate = dateArr[2];
	$(weekbang).html(j.c);
	$(weekbangdate).html(j.cc);
}

//set up the data of tab3
function FetchAndSetStarJourneyPageData(year,month,hostid, size){
	var hostid = arguments[2]?arguments[2]:20051152;
	var size = arguments[3]?arguments[3]:3;
	var baseUrl = "http://192.168.11.42:8390/dailyactive/"
	var url = baseUrl + "get_author_star_milestone";	
	var test = baseUrl + "get_player_author_rank";
	//give a time stamp and set the responding data.
	$.ajax({
		url:url,
		dataType:"JSONP",
		type:"GET",
		data:{
			hostid:hostid,
			size:size,
			//date_type:"day",
			year:year,
			month:month,
			//hostid:hostid,
			//size:size
		},
		jsonpCallback:"callback",
		success:function(data){
			if (data.code == 0){
				//success
				SetTab3Data(data);			
				SetUpStarTravelHover(data)

			}
		}
	});	

}

function SetTab3Data(data){
/*
		var data = {
		month_rank:10,
		week_rank:[{
			datestamp:"2014 1.1-7",
			rank:10
		},{
			datestamp:"2014 1.8-14",
			rank:11
		},{
			datestamp:"2014 1.15-21",
			rank:12
		},{
			datestamp:"2014 1.22-28",
			rank:13
		},{
			datestamp:"2014 1.29-32",
			rank:14
		}]
	};
*/
	var rs = data.result;
	var tab3 = $("#tab3")
	var monthrank = tab3.find(".sjmonth_rank .sub_info_content");
	monthrank.html(rs.month.month_rank);
	var weekrank = $("#tab3 .sjweek_rank");
	weekrank.empty();
	weekrank.append('<span class="sjrank_title">明星周榜</span>');
	weekrank.append('<div class="rank_cells"></div>');
	var cells = $("#tab3 .rank_cells");
	var l = rs.week.length;
		
	for (var i=0;i< 5;i++){
		var index = i+1;
		var key = "#week_cell" + index;
		var cell_str  = '<div id="' + "week_cell" + index + '"></div>';
		cells.append(cell_str);
		var cell = cells.find(key);
		if (index > l){
			cell.addClass("week_cell_empty");
			cell.append("");
			continue;
		}
		cell.addClass("week_cell");
		var aDate = rs.week[i].date;
		aDate = aDate.substr(0,4) + " " + aDate.substr(5,2)+"."+aDate.substr(8,2) +"—" +aDate.substr(19,2);
		cell.append('<span class="week_cell_date">'+aDate+'</span><br/>');
		cell.append('<span class="week_icon"></span>');	
		cell.append('<span class="sub_info_title">明星周榜第<span class="sub_info_content">'+rs.week[i].rank+'</span>名</span>');
		
	}
	cells.append('<div class="hoverlayer"></div>');

}
//
//function FetchStarRoadData(year,month,hostid,size){
//	
//	var hostid = arguments[2]?arguments[2]:20051152;
//	var size = arguments[3]?arguments[3]:3;
//	var baseUrl = "http://192.168.11.42:8390/dailyactive/"
//	var url = baseUrl + "get_author_star_road";	
//	$.ajax({
//		url:url,
//		dataType:"JSONP",
//		type:"GET",
//		data:{
//			year:year,
//			month:month,
//			hostid:hostid,
//			size:size,
//			callback:"?"
//		},
//		success:function(data){
//			alert("success");
//		}
//	});
//}
//
//	
//
