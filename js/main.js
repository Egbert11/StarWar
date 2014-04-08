$(document).ready(function(){
    //获取主播id
    config.hostid = parseInt(queryStrings().micuid);

    //成长星路、星星排行、星之旅程、粉丝贡献Tab事件绑定
    initTab();

    //星星排行和粉丝贡献的日，周，月，总点击事件
    initStarRankTab();

    //每隔十分钟更新Banner数据
    updateBanner();
    setInterval(updateBanner, 10*60*1000);
	//初始化成长星路
	var calendars = document.getElementById('calendar'); 
	calendar.config = config;
	calendar.init(calendars);

    initTab3Banner();
});

var config = {
    baseUrl: 'http://192.168.11.42:8390/dailyactive/',
	avatarUrl:'http://114.113.200.138/nsep/',
    hostid: 0
};

var queryStrings=function() {
    //get url querystring
    var params=document.location.search,reg=/(?:^\?|&)(.*?)=(.*?)(?=&|$)/g,temp,args={};
    while((temp=reg.exec(params))!=null) args[temp[1]]=decodeURIComponent(temp[2]);
    return args;
};

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

//成长星路、星星排行、星之旅程、粉丝贡献Tab事件绑定
function initTab(){
    $(".tabs li").delegate("a","click",function(){
        
		$(".tabs li a").removeClass("active");
        $(this).addClass("active");
        $(".main_content .content").hide();

        var tabName = $(this).attr("name");
        $("#" + tabName).show();

        //各个排行列表的初始化
        if(tabName == "tab2"){
			var tab1 = $(".zhuboRank .tab_style li a.active").attr("id");
			switch(tab1){
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
			}
			var tab2 = $(".fansRank .tab_style li a.active").attr("id");
			switch(tab2){
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
			}
        }else if(tabName == "tab4"){
			var tab1 = $(".charmRank .tab_style li a.active").attr("id");
			switch(tab1){
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
			}
			var tab2 = $(".popularityRank .tab_style li a.active").attr("id");
			switch(tab2){
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
        }else if (tabName == "tab3"){
			var dd = new Date();
            initTab3Banner();
			fetchAndSetStarJourneyPageData(dd.getFullYear(),dd.getMonth()+1);
        }else if(tabName == "tab1"){
				var calendars = document.getElementById('calendar'); 
				calendar.init(calendars);
		}
    })
}

function initTab3Banner(){
	var tab3 = $("#tab3");
	var lbtn = tab3.find(".sjhlbtn");
	var rbtn = tab3.find(".sjhrbtn");
	var title = tab3.find(".sjheadertitle");
	title.html("");
	var dd = new Date();
	var text = dd.getFullYear() + "年 "+ (dd.getMonth()+1)+"月";
	var base_month = dd.getMonth()+1;
	title.html(text);
	lbtn.html("<");
	rbtn.html(">");
	if(dd.getFullYear() == "2014" && dd.getMonth() == "3"){lbtn.html("");}
	lbtn.unbind('click');
	rbtn.unbind('click');
	lbtn.click(function(){
		rbtn.html(">");
		var cmonth = parseInt(title.html().substr(6,1),10); 
		var text = dd.getFullYear() + "年 "+ (cmonth - 1)+"月";
		title.html(text);
		cmonth = cmonth -1;
		if (base_month - 2 >= cmonth ||(dd.getFullYear()=="2014" && cmonth<=3)){
			lbtn.html("");
		}
		fetchAndSetStarJourneyPageData(dd.getFullYear(),cmonth);
	});
	rbtn.click(function(){
		lbtn.html("<");
		var cmonth = parseInt(title.html().substr(6,1),10); 
		var text = dd.getFullYear() + "年 "+ (cmonth+1)+"月";
		title.html(text);
		cmonth = cmonth + 1;
		if (base_month <= cmonth){
			rbtn.html("");
		}	
		fetchAndSetStarJourneyPageData(dd.getFullYear(),cmonth);

	});
	rbtn.html("");
}

function setUpStarTravelHover(data){
	var rs = data.result;
	var cells = $("#tab3 .rank_cells .week_cell");
	$.each(cells,function(index,value){
		var cell = $(this);
		var sindex = cell.attr('id').substr(9,1);
		
		cell.unbind('hover');
		cell.hover(function(){
			//alert("hover");
			var hoverLayer = $("#tab3 .hoverlayer");
			var x = cell.position().left;
			var y = cell.position().top;
			var fx = 0;
			var fy = 0;
			switch(sindex){
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
				case 5:
					fx = x + 130;
					fy = y - 60 ; 
					break;
				case 4:
					fx = x -50;
					fy = y - 120;
					break;
				default:
					break;
			}
			hoverLayer.empty();
			hoverLayer.append('<span class="sjrank_title">粉丝贡献榜</span><br/>');
			var len = rs.week[sindex - 1].player_list.length;
			var d = rs.week[sindex - 1];
			initHoverLayerWithData(hoverLayer,d);
		
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
	//月榜
	var cell = $("#tab3 .sjmonth_rank .sjrank_content");
	cell.hover(function(){
		var hoverLayer = $("#tab3 .mhoverlayer");
		hoverLayer.empty();
			
			hoverLayer.append('<span class="sjrank_title">粉丝贡献榜</span><br/>');
			var len = rs.month.player_list.length;
			var d = rs.month;
			initHoverLayerWithData(hoverLayer,d);
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

function initHoverLayerWithData(hoverlayer,data){
	var len = data.player_list.length;
	if (len == 0){
				console.log(data);
				hoverlayer.append('<p class="wufensi">无粉丝贡献排行数据</p>');
		return;
	}else{
		hoverlayer.append('<div class="first_col"></div>');
		hoverlayer.append('<div class="second_col"></div>');
	}

	var first_col = hoverlayer.find(".first_col");
	var second_col = hoverlayer.find(".second_col");
			if (len > 0){
				first_col.append('<p></p>');
				var col = first_col.find("p:eq(0)");
				col.append('<span class="icon first"></span>');
				col.append('<span class="hover_text_red" title="'+data.player_list[0][0] +'">'+mySubStr(data.player_list[0][0],8) +'</span>');
				
				second_col.append('<p></p>');
				var col = second_col.find("p:eq(0)");
				col.append('<span class="gift_icon"></span>');
				col.append('<span class="hover_text_blue">'+data.player_list[0][1]+'</span>');
			}
			if (len > 1){
				first_col.append('<p></p>');
				var col = first_col.find("p:eq(1)");
				col.append('<span class="icon second"></span>');
				col.append('<span class="hover_text_dblue" title="'+data.player_list[1][0] +'">'+mySubStr(data.player_list[1][0],8) +'</span>');
				
				second_col.append('<p></p>');
				var col = second_col.find("p:eq(1)");
				col.append('<span class="gift_icon"></span>');
				col.append('<span class="hover_text_blue">'+data.player_list[1][1]+'</span>');
			}
			if (len > 2){
				first_col.append('<p></p>');
				var col = first_col.find("p:eq(2)");
				col.append('<span class="icon third"></span>');
				col.append('<span class="hover_text_pink" title="'+data.player_list[2][0] +'">'+mySubStr(data.player_list[2][0],8) +'</span>');
				
				second_col.append('<p></p>');
				var col = second_col.find("p:eq(2)");
				col.append('<span class="gift_icon"></span>');
				col.append('<span class="hover_text_blue">'+data.player_list[2][1]+'</span>');
			}
			
}

//星星排行和粉丝贡献的日，周，月，总点击事件
function initStarRankTab() {
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
function fetchStarRankList(path, dataType){
    $.ajax({
        type: 'GET',
        url: config.baseUrl + path,
        data: {
            date: new Date().getNowTime(),
            size: 10,
            date_type:dataType
        },
        dataType: 'jsonp',
        jsonp:'callback',
        success: function(data){
            if(data.code == 0){
				//更新排行榜
                updateRanklist(path, data);
            }
        },
        error: function (parsedjson, textStatus, errorThrown) {
			console.log("parsedJson: " + JSON.stringify(parsedjson));
			var list, listClass;
			switch(path){
				//主播星星排行
				case "get_author_rank":
					list = 1;
					listClass = ".zhuboRank";
					break;
				//粉丝贡献排行
				case "get_player_rank":
					list = 2;
					listClass = ".fansRank";
					break;
			}
			$("#list"+list).hide();
			if($(listClass+":has(p)").length == 0)
				$(listClass).append('<p class="nodata">暂时未有排行数据</p>');
		}
    });
}

//获取粉丝贡献中的数据
function fetchFansContributionList(path, dataType){
    $.ajax({
        type: 'GET',
        url: config.baseUrl + path,
        data: {
            date: new Date().getNowTime(),
            hostid: config.hostid,
            size: 10,
            date_type:dataType
        },
        dataType: 'jsonp',
		jsonp:'callback',
        success: function(data){
            if(data.code == 0){
                //更新排行榜
                updateRanklist(path, data);
            }
        },
        error: function (parsedjson, textStatus, errorThrown) {
			var list, listClass;
			switch(path){
				//粉丝魅力贡献排行
				case "get_player_author_rank":
					list = 3;
					listClass = ".charmRank";
					break;
				//粉丝人气贡献排行
				case "get_player_author_contribute":
					list = 4;
					listClass = ".popularityRank";
					break;
			}
			$("#list"+list).hide();
			if($(listClass+":has(p)").length == 0)
				$(listClass).append('<p class="nodata">暂时未有排行数据</p>');
		}
    });
}

//更新星星排行和粉丝贡献的排列列表
function updateRanklist(path, data) {
	var list, listClass;
	switch(path){
		//主播星星排行
		case "get_author_rank":
			list = 1;
			listClass = ".zhuboRank";
			break;
		//粉丝贡献排行
		case "get_player_rank":
			list = 2;
			listClass = ".fansRank";
			break;
		//粉丝魅力贡献排行
		case "get_player_author_rank":
			list = 3;
			listClass = ".charmRank";
			break;
		//粉丝人气贡献排行
		case "get_player_author_contribute":
			list = 4;
			listClass = ".popularityRank";
			break;
	}
	//如果没有排行数据,将对应列表置空，并提示没有数据
	if(data.result.length == 0){
		$("#list"+list).hide();
		if($(listClass+":has(p)").length == 0)
			$(listClass).append('<p class="nodata">暂时未有排行数据</p>');
		return;
	}
	//获取到了排行数据
	$("#list"+list).show();
	$(listClass+" p").remove();
	var i = 1;
	for(;i <= data.result.length;i++)
	{	
		var name = $("#list"+list+" #list"+list+"_"+i);
		//第一名的设置头像
		if(i == 1){
			var avatar = name.find("img.little_avatar");
			if(data.result[0][3] == '0')
				avatar.attr("src","image/avatar.png");
			else
				avatar.attr("src",config.avatarUrl+data.result[0][3]);
		}
		//设置标题
		name.find("span:last-child").attr('title',data.result[i-1][0]);
		//填充昵称
		name.find("span:last-child").text(mySubStr(data.result[i-1][0],18));
		name.show();
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
		$("#list"+list+" #list"+list+"_"+i).hide();
	}
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
    $(".person_name").empty().attr('title',rs.nickname).text(mySubStr(rs.nickname,36));
    $(".fo_btn_text").empty().text(rs.month_level);
    $(".avatar").attr("src",rs.author_portrait);
    var pinfo = $(".pinfo_content");
    var contentArr = pinfo.find(".sub_info_content").empty();
    contentArr[0].innerHTML = "LV"+rs.day_level;
    contentArr[1].innerHTML = rs.popularity;
    contentArr[2].innerHTML = rs.charm;

    var rankcol = $(".banner .star_rank");
    var rcontentArr = rankcol.find(".sub_info_title").empty();

    if(rs.day_charm_rank != 0)
        $(rcontentArr[0]).html('当日魅力:第<span class="sub_info_content">'+rs.day_charm_rank+'</span>名');
    else
        $(rcontentArr[0]).html("当日魅力:暂未更新");

    if(rs.day_popularity_rank != 0)
        $(rcontentArr[1]).html('当日人气:第<span class="sub_info_content">'+rs.day_popularity_rank+'</span>名');
    else
        $(rcontentArr[1]).html("当日人气:暂未更新");

    if(rs.day_star_rank != 0)
        $(rcontentArr[2]).html('当日星星:第<span class="sub_info_content">'+rs.day_star_rank+'</span>名');
    else
        $(rcontentArr[2]).html("当日星星:暂未更新");

    if(rs.week_star_rank != 0)
        $(rcontentArr[3]).html('本周星星:第<span class="sub_info_content">'+rs.week_star_rank+'</span>名');
    else
        $(rcontentArr[3]).html("本周星星:暂未更新");

    if(rs.month_star_rank != 0)
        $(rcontentArr[4]).html('本周综合:第<span class="sub_info_content">'+rs.month_star_rank+'</span>名');
    else
        $(rcontentArr[4]).html("本周综合:暂未更新");

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

//获取星之旅程的数据
function fetchAndSetStarJourneyPageData(year, month, hostid, size){
    var hostid = config.hostid;
    var size = 3;
    var url = config.baseUrl + "get_author_star_milestone";
    $.ajax({
        url:url,
        type:"GET",
        dataType:"jsonp",
        jsonp: "callback",
        data:{
            year: year,
            month: month,
            hostid: config.hostid,
            size: size
        },
        success:function(data){
            if (data.code == 0){
				console.log(data);
                setTab3Data(data);
                setUpStarTravelHover(data);
            }
        },
        error:function(){
		//增加错误处理。
		}

    });
}

function setTab3Data(data){
	var rs = data.result;
	var tab3 = $("#tab3")
	var monthrank = tab3.find(".sjmonth_rank .sjrank_content");
	monthrank.empty();
	if (rs.month.month_rank == 0){
		monthrank.append('<p style="text-align:center;margin-top:25px;margin-left:15px;color:#969696;">活动尚未开始</p>');
	}else{
		monthrank.append('<span class="sjrank_icon"></span>');
		monthrank.append('<span class="sub_info_title">明星月榜第<span class="sub_info_content">'+
			rs.month.month_rank+'</span>'+'名</span>');
	}
	//monthrank.html(rs.month.month_rank);
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
		if (rs.week[i].rank == 0 ){
			cell.addClass("week_cell_empty");
			cell.append('<span class="wupaiming">暂无排名</span>');
			//cell.append('<p style="margin-top:40px;margin-left:65px;color:#0099ff;">任务暂未开始</p>');
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
