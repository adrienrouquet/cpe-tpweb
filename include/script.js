$(document).ready(function() {
	
	var _COMMAND = null;
	
	function command(rouge, rose, blanc, prestige) {
		this._rouge = rouge;
		this._rose = rose;
		this._blanc = blanc;
		this._prestige = prestige;
		
		this.setCommand = function(id, val) {
			switch (id) {
			case "rouge":
				this._rouge = val;
				break;
			case "rose":
				this._rose = val;
				break;
			case "blanc":
				this._blanc = val;
				break;
			case "prestige":
				this._prestige = val;
				break;
			default:
				break;
			}
		};
		
		this.formatCookieDatas = function() {
			var data = this._rouge + "," + this._rose + "," + this._blanc + "," + this._prestige;
			return data;
		};
		
		this.getDatasFromCookie = function(data) {
			if (data != undefined && data.length != 0) {
				data = data.split(",");
				this._rouge = data[0];
				this._rose = data[1];
				this._blanc = data[2];
				this._prestige = data[3];
			}
		};
	}
	
	function onChange(id) {
		_COMMAND.setCommand(id, $("#" + id).val());
		setCookie("panier", _COMMAND.formatCookieDatas(), 3);		
	}
	
	function initGlobal() {
		window.myOnChange = onChange;
	}
	
	function initData() {
			$("#rouge").val(_COMMAND._rouge);
			$("#rose").val(_COMMAND._rose);
			$("#blanc").val(_COMMAND._blanc);
			$("#prestige").val(_COMMAND._prestige);
	}
	
	function setCookie(cName, value, exHours) {
		var exDate = new Date();
		exDate.setHours(exDate.getHours() + exHours);
		var cValue = escape(value) + ((exHours==null) ? "" : "; expires=" + exDate.toUTCString());
		document.cookie = cName + "=" + cValue + ";";
	}
	
	function getCookie(cName) {
		var name;
		var value;
		var ARRcookies = document.cookie.split(";");
		if ($.isArray(ARRcookies)) {
			for (var i = 0 ; i < ARRcookies.length ; i++) {
				var val = ARRcookies[i];
				name = val.substr(0,val.indexOf("="));
				value = decodeURIComponent(val.substr(val.indexOf("=")+1));
				name = name.replace(/^\s+|\s+$/g,"");
				if (name == cName)
				{
					return value;
				}				
			}
		}
	}
	
	
	(function() {
		_COMMAND = new command(0, 0, 0, 0);
		var dataFromCookie = getCookie("panier");
		data = _COMMAND.getDatasFromCookie(dataFromCookie);
		initGlobal();
		initData();
	})();
});
