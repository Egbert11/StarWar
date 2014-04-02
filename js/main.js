$(document).ready(function(){
    SetSwitchTab();
	SetUpTabClickJump();
	SetUpStarTravelHover();
    //星星排行的日，周，月，总点击事件
    starRankTab();
	starRankDisplay();
	fansContributionDisplay();

    // 每隔十分钟更新Banner数据
    updateBanner();
    setInterval(updateBanner, 10*60*1000);

	FetchAndSetStarJourneyPageData(2014,3);
});

var config = {
    baseUrl: 'http://192.168.11.42:8390/dailyactive/',
    hostid: 20051154
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

Date.prototype.getNowTime = function(){
    return Math.floor(this.getTime()/1000);
}

// set up tab switch
function SetSwitchTab(){
    $(".tabs li").on("a","click",function(){
        $(".tabs li a").removeClass("active");
        $(this).addClass("active");
        $(".main_content .content").hide();
        $("#" + $(this).attr("name")).show();
    })
}

//set up listener on the star travel page
function SetUpStarTravelHover(data){
	var cells = $("#tab3 .rank_cells .week_cell");
	$.each(cells,function(index,value){
		var cell = $(this);
		cell.unbind('hover');
		cell.hover(function(){
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
					fy = y;
					break;
				default:
					
					break;
			}
			hoverLayer.empty();
			hoverLayer.append('<span class="sjrank_title">粉丝贡献榜</span><br/>');
			var len = data.week[index].playlist.length;
			if (len > 0){
				hoverLayer.append('<span class="icon first"></span>');
				hoverLayer.append('<span class="hover_text_red">'+data.week[index].playlist[0][0] +'</span>');
				hoverLayer.append('<span class="gift_icon"></span>');
				hoverLayer.append('<span class="hover_text_blue">'+data.week[index].playlist[0][1]+'</span>');
			}
			if (len > 1){
				hoverLayer.append('<span class="icon_second"></span>');
				hoverLayer.append('<span class="hover_text_dblue">'+data.week[index].playlist[1][0] +'</span>');
				hoverLayer.append('<span class="gift_icon"></span>');
				hoverLayer.append('<span class="hover_text_blue">'+data.week[index].playlist[1][1]+'</span>');
			}
			if (len > 2){
				hoverLayer.append('<span class="icon_third"></span>');
				hoverLayer.append('<span class="hover_text_pink">'+data.week[index].playlist[2][0] +'</span>');
				hoverLayer.append('<span class="gift_icon"></span>');
				hoverLayer.append('<span class="hover_text_blue">'+data.week[index].playlist[2][1]+'</span>');
			}
				
			hoverLayer.css({display:"block",top:fy+"px",left:fx+"px"});
			hoverLayer.hover(function(){
				$(this).css({display:"block"});
			},function(){
				$(this).css({display:"none"});
			});
		},function(){	
			var hoverLayer = $("#tab3 .hoverlayer");
			hoverLayer.css({display:"none"});
		});
	});
	var cell = $("#tab3 .sjmonth_rank .sjrank_content");
	
	cell.hover(function(){
		var hoverLayer = $("#tab3 .mhoverlayer");
		hoverLayer.empty();
			var len = data.month.playlist.length;
			if (len > 0){
				hoverLayer.append('<span class="icon_first"></span>');
				hoverLayer.append('<span class="hover_text_red">'+data.month.playlist[0][0] +'</span>');
				hoverLayer.append('<span class="gift_icon"></span>');
				hoverLayer.append('<span class="hover_text_blue">'+data.month.playlist[0][1]+'</span>');
			}
			if (len > 1){
				hoverLayer.append('<span class="icon_second"></span>');
				hoverLayer.append('<span class="hover_text_dblue">'+data.month.playlist[1][0] +'</span>');
				hoverLayer.append('<span class="gift_icon"></span>');
				hoverLayer.append('<span class="hover_text_blue">'+data.month.playlist[1][1]+'</span>');
			}
			if (len > 2){
				hoverLayer.append('<span class="icon_third"></span>');
				hoverLayer.append('<span class="hover_text_pink">'+data.month.playlist[2][0] +'</span>');
				hoverLayer.append('<span class="gift_icon"></span>');
				hoverLayer.append('<span class="hover_text_blue">'+data.month.playlist[2][1]+'</span>');
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

//bind the click function with the tab jump effect
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

//星星排行的日，周，月，总点击事件
function starRankTab() {
    var zhuboNav = $(".zhuboRank .tab_style");
    zhuboNav.delegate("li a", "click",function(){
        zhuboNav.find("a").removeClass("active");
        var name = $(this).addClass("active").attr("name");

        $(".zhuboRank ul.tab2_rankList").hide();
        $(".zhuboRank").find("ul[name="+name+"]").show();
    });

    var fansNav = $(".fansRank .tab_style");
    fansNav.delegate("li a", "click",function(){
        fansNav.find("a").removeClass("active");
        var name = $(this).addClass("active").attr("name");

        $(".fansRank ul.tab2_rankList").hide();
        $(".fansRank").find("ul[name="+name+"]").show();
    });
}

//设置星星排行的数据显示
function starRankDisplay(){
	
	var starRank = {
	day:[
		"梦幻西游梦幻西游",
		"我是第二名",
		"我是第三名",
		"我是第四名",
		"我是第五名",
		"我是第六名",
		"我是第七名"
	],
	week:[
		"大话西游大话西游",
		"我是第二名",
		"我是第三名",
		"我是第四名",
		"我是第五名",
		"我是第六名"	
	],
	year:[ 
		"DotaDotaDotaDota",
		"我是第二名",
		"我是第三名",
		"我是第四名",
		"我是第五名",
		"我是第六名"		
	],
	ALL:[
		"2009200920092009",
		"我是第二名",
		"我是第三名",
		"我是第四名",
		"我是第五名",
		"我是第六名"		
	]
	};
	var i = 1;
	for(;i <= starRank.day.length;i++)
	{
		$(".tab2_zhuboRank .tab2_rankList#day1 #day1-"+i+" span:last-child").text(starRank.day[i-1]);
		switch(i){
			case 1: case 2: case 3:
				break;
			case 4: case 5: case 6: case 7: case 8: case 9: case 10:
				$(".tab2_zhuboRank .tab2_rankList#day1 #day1-"+i+" span:first-child").text(i);
				break;
		}
	}
	for(;i<=10 ;i++)
	{
		$(".tab2_zhuboRank .tab2_rankList#day1 #day1-"+i).css("display","none");
	}
}


//设置粉丝贡献的数据显示
function fansContributionDisplay(){
	var bestFan = {
		name:"梦幻西游大话西游",
		number:123456
	};
	$(".tab4_bestFanStyle").find(".tab4_bestFan .name").text(bestFan.name);
	$(".tab4_bestFanStyle").find(".tab4_bestFan .number").text("x"+bestFan.number);
	
	var dynamicState ={
		name:"CCC",
		day:22,
		reward:90,
		rank:2
	};
	
	$(".tab4_content .name#name1").text(dynamicState.name);
	$(".tab4_content .name#numOfDay1").text(dynamicState.day);
	$(".tab4_content .name#percent1").text(dynamicState.reward+"%");
	$(".tab4_content .rank#rank1").text(dynamicState.rank);
	
}

//更新Banner数据
function updateBanner(){
	var url = config.baseUrl + "get_author_rank_info";
	$.ajax({
		url:url,
        type:"GET",
		dataType:"jsonp",
        jsonp: "callback",
		data:{
			date: new Date().getNowTime(),
			hostid:config.hostid
		},
		success:function(data){
			if (data.code != 0 )return;
            handleBannerData(data);
		},
        error:function(){}
	});		
}

//处理成功获取Banner的数据
function handleBannerData(data){
    var rs = data.result;
    var pinfo = $(".pinfo_content");
    var contentArr = pinfo.find(".sub_info_content").empty();
    contentArr[0].innerHTML = "LV"+rs.day_level;
    contentArr[1].innerHTML = rs.popularity;
    contentArr[2].innerHTML = rs.charm;

    var rankcol = $(".banner .star_rank");
    var rcontentArr = rankcol.find(".sub_info_content").empty();
    rcontentArr[0].innerHTML = rs.day_charm_rank;
    rcontentArr[1].innerHTML = rs.day_popularity_rank;
    rcontentArr[2].innerHTML = rs.day_star_rank;
    rcontentArr[3].innerHTML = rs.week_star_rank;
    rcontentArr[4].innerHTML = rs.month_star_rank;

    $(".banner .star_journey").find(".journey_date").text(new Date().Format("yyyy-MM-dd"));

    var title = $(".banner .star_journey").find("p .sub_info_title");
    if (rs.total_rank != 0)
        $(title[0]).html('明星总榜第<span class="sub_info_content">'+rs.total_rank+'</span>名');
    else
        $(title[0]).html('暂时无排名');

    if (rs.total_month_rank != 0)
        $(title[1]).html('明星月榜第<span class="sub_info_content">'+rs.total_month_rank+'</span>名');
    else
        $(title[1]).html('暂时无排名');

    if (rs.total_week_rank != 0)
        $(title[2]).html('明星周榜第<span class="sub_info_content">'+rs.total_week_rank+'</span>名');
    else
        $(title[2]).html('暂时无排名');
}

//set up the data of tab3
function FetchAndSetStarJourneyPageData(year,month,hostid, size){
	var hostid = arguments[2]?arguments[2]:20051152;
	var size = arguments[3]?arguments[3]:3;
	var url = config.baseUrl + "get_author_star_milestone";
	//give a time stamp and set the responding data.
	$.ajax({
		url:url,
        type:"GET",
		dataType:"jsonp",
        jsonp: "callback",
		data:{
            year: year,
            month: month,
			hostid: hostid,
			size: size
		},
		success:function(data){
			if (data.code == 0){
				//success
				//SetTab3Data(data);
				SetUpStarTravelHover(data)

			}
		}
	});	

}

function SetTab3Data(data){

	var tab3 = $("#tab3")
	var monthrank = tab3.find(".sjmonth_rank .sub_info_content");
	monthrank.html(data.month_rank);
	var weekrank = $("#tab3 .sjweek_rank");
	weekrank.empty();
	weekrank.append('<span class="sjrank_title">明星周榜</span>');
	weekrank.append('<div class="rank_cells"></div>');

	var cells = $("#tab3 .rank_cells");
	var l = data.week_rank.length;
		
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
		cell.append('<span class="week_cell_date">'+data.week_rank[i].datestamp+'</span><br/>');
		cell.append('<span class="week_icon"></span>');	
		cell.append('<span class="sub_info_title">明星周榜第<span class="sub_info_content">'+data.week_rank[i].rank+'</span>名</span>');
	}
}

function FetchStarRoadData(year,month,hostid,size){
	
	var hostid = arguments[2]?arguments[2]:20051152;
	var size = arguments[3]?arguments[3]:3;
	var baseUrl = "http://192.168.11.42:8390/dailyactive/"
	var url = baseUrl + "get_author_star_road";	
	$.ajax({
		url:url,
		dataType:"JSONP",
		type:"GET",
		data:{
			year:year,
			month:month,
			hostid:hostid,
			size:size,
			callback:"?"
		},
		success:function(data){
			alert("success");
		}
	});
}

function SetStarRoadData(data){
	
}
