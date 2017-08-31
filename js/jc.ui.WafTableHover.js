var jc = jc || {};
jc.js = jc.js || {};
jc.js.util = jc.js.util || {};

!(function(nameSpace) {
	function WafTableHover() {
		this.keysContainerClassName = "keysContainer";
		this.valueContainerClassName = "valueContainer";
		var searchStr = $(".keysContainer").prev().prev().prev().find("td").html();
		searchStr = searchStr.replace(/&nbsp;/g, '');
		searchStr += "<p style='float:right;margin:0;padding-right:100px;'>&nbsp;&nbsp;&nbsp;<label><input class='waf-hover-check' value='row' checked type='checkbox' />停留行高亮</label>"
		searchStr += "&nbsp;&nbsp;&nbsp;<label><input class='waf-hover-check' value='col' checked type='checkbox' />停留列高亮</label></p>"
		$(".keysContainer").prev().prev().prev().find("td").html(searchStr);
	};
	WafTableHover.prototype.hoverHighLightRow = function() {
		var keysContainerClassName = this.keysContainerClassName;
		var valueContainerClassName = this.valueContainerClassName;
		$("." + valueContainerClassName + ",." + keysContainerClassName).find("td").hover(function() {
			$(this).parent().find('td').addClass("ddd")
		}, function() {
			$(this).parent().find('td').removeClass("ddd")
		});
	};
	WafTableHover.prototype.hoverHighLightCol = function() {
		var keysContainerClassName = this.keysContainerClassName;
		var valueContainerClassName = this.valueContainerClassName;
		$("." + valueContainerClassName + ",." + keysContainerClassName).find("td").hover(function() {
			var _this = this;
			var $keyTd = $("." + keysContainerClassName).find("td").eq($(this).index());
			$keyTd.addClass("ddd");
			$('.' + valueContainerClassName).each(function(i, e) {
				$(e).find("td").eq($(_this).index()).addClass("ddd")
			})
		}, function() {
			var _this = this;
			$("." + keysContainerClassName).find("td").eq($(this).index()).removeClass("ddd")
			$('.' + valueContainerClassName).each(function(i, e) {
				$(e).find("td").eq($(_this).index()).removeClass("ddd")
			})
		});
	};
	WafTableHover.prototype.clickHeighLightRow = function() {
		//改写原有的行点击高亮事件
		OnTrClick = function(ele) {
			if ($(ele).find('td').eq(0).is(".skyblue-row")) {
				$(ele).find('td').removeClass("skyblue-row")
			} else {
				$(ele).find('td').addClass("skyblue-row")
			}
		};
	};
	WafTableHover.prototype.clickHeighLightCol = function() {
		var keysContainerClassName = this.keysContainerClassName;
		var valueContainerClassName = this.valueContainerClassName;
		$("." + keysContainerClassName).on("click", "td", function() {
			var _this = this;
			if ($(this).is(".skyblue-col")) {
				$(this).removeClass("skyblue-col");
				$('.' + valueContainerClassName).each(function(i, e) {
					$(e).find("td").eq($(_this).index()).removeClass("skyblue-col");
				})
			} else {
				$(this).addClass("skyblue-col");
				$('.' + valueContainerClassName).each(function(i, e) {
					$(e).find("td").eq($(_this).index()).addClass("skyblue-col");
				})
			}
		});
	};
	WafTableHover.prototype.unbindHoverHighLightRow = function() {
		var waf_col_highLight = getCookie("waf_col_highLight");
		var keysContainerClassName = this.keysContainerClassName;
		var valueContainerClassName = this.valueContainerClassName;
		$("." + valueContainerClassName + ",." + keysContainerClassName).find("td").unbind("mouseenter").unbind("mouseleave");
		(waf_col_highLight === 'true' || waf_col_highLight === null) && this.hoverHighLightCol();
	};
	WafTableHover.prototype.unbindHoverHighLightCol = function() {
		var waf_row_highLight = getCookie("waf_row_highLight");
		var keysContainerClassName = this.keysContainerClassName;
		var valueContainerClassName = this.valueContainerClassName;
		$("." + valueContainerClassName + ",." + keysContainerClassName).find("td").unbind("mouseenter").unbind("mouseleave");
		(waf_row_highLight === 'true' || waf_row_highLight === null) && this.hoverHighLightRow();
	};
	WafTableHover.prototype.changeHighLightModel = function() {
		var _this = this;
		$('.waf-hover-check').on("click", function() {
			var colOrRow = $(this).val();
			if (colOrRow === "row") {
				if ($(this).prop("checked")) {
					_this.hoverHighLightRow();
					setCookie("waf_row_highLight", true, "d30")
				} else {
					_this.unbindHoverHighLightRow()
					setCookie("waf_row_highLight", false, "d30")
				}
			} else if (colOrRow === "col") {
				if ($(this).prop("checked")) {
					_this.hoverHighLightCol();
					setCookie("waf_col_highLight", true, "d30")
				} else {
					_this.unbindHoverHighLightCol();
					setCookie("waf_col_highLight", false, "d30")
				}
			}
		});
	};
	WafTableHover.prototype.clickFirst = function() {
		var keysContainerClassName = this.keysContainerClassName;
		var valueContainerClassName = this.valueContainerClassName;
	};
	WafTableHover.prototype.init = function() {
		var _this = this;
		var waf_row_highLight = getCookie("waf_row_highLight");
		var waf_col_highLight = getCookie("waf_col_highLight");
		(waf_row_highLight === "true" || waf_row_highLight === null) && this.hoverHighLightRow();
		(waf_col_highLight === "true" || waf_col_highLight === null) && this.hoverHighLightCol();
		waf_row_highLight === "false" && $(".waf-hover-check").eq(0).prop("checked", false);
		waf_col_highLight === "false" && $(".waf-hover-check").eq(1).prop("checked", false);
		this.clickHeighLightCol();
		this.clickHeighLightRow();
		this.changeHighLightModel();
	};
	nameSpace.WafTableHover = WafTableHover;
})(jc.js.util);