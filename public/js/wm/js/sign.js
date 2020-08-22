$(document).ready(function() {
	$.ajax({
		type: "get",
		url: "/home/task/sign.html?type=check",
		dataType: "json",
		success: function(a) {
			$(".sign-box").show();
			s = a.login;
			c = a.even;
			f = a.reward;
			t = a.st;
			$(".sign-popup .even").html(c);
			15 <= c ? $(".sign-box .img").addClass("sign30") : 7 <= c ? $(".sign-box .img").addClass("sign15") : $(".sign-box .img").addClass("sign7");
			1 == s ? (setTimeout(function() {
				$(".sign-box").addClass("is-visible")
			}, 3E3), $(".sign-popup a.sign").click(function() {
				sign()
			})) : 2 == s ? ($(".sign-popup .tips").html("本次签到赠送<em>" + f + "</em>阅币"), $(".but").addClass("ok").html('<a href="/home/task/index.html">今日已签</a>')) : 3 == s ? ($(".sign-popup .tips").html("<font color='#ff0000'>新用户注册<br />第二天后才支持签到</font>"), $(".t-popup .sign-popup .box .but,.t-popup .sign-popup .box p.min").hide()) : $(".but").addClass("hover").html('<a href="/home/public/login.html">登陆签到</a>')
		}
	});
	$(".sign-popup a.close").click(function() {
		$(".sign-box").removeClass("is-visible")
	});
	$(".tsign,.signbtn").click(function() {
		$(".sign-box").addClass("is-visible")
	})
});

function sign() {
	$.ajax({
		type: "get",
		url: "/home/task/sign.html?type=sign",
		dataType: "json",
		success: function(a) {
			t = a.st;
			h = a.even;
			f = a.reward;
			1 == t ? ($(".sign-popup .even").html(h), $(".sign-popup .heart").addClass("heartAnimation"), $(".sign-popup .tips").html("本次签到赠送<em>" + f + "</em>阅币"), $(".but").addClass("ok").html('<a href="/home/task/index.html">签到成功</a>'), setTimeout(function() {
				$(".sign-box").removeClass("is-visible").fadeOut()
			}, 1E4)) : 2 == t ? (myTips("请先登陆会员"), $(".sign-box").removeClass("is-visible").fadeOut()) : 3 == t ? (myTips("新用户注册24小时后才支持签到"), $(".sign-box").removeClass("is-visible").fadeOut()) : $(".sign-box").addClass("is-visible")
		}
	});
}