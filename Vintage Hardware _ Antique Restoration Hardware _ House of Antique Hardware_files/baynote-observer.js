/*
 * Baynote Observer for houseofantiquehardware.com
 * Last updated: 2/10
 */


var bn_window_param_start = "unb~hoah~[";
var bn_window_param_end = "]~";
var bn_location_href= window.location.href;
var window_name = window.name;
		 	

function bn_isNotEmpty(name) {
	return (name != null) && (name != "");
}
function bn_getCookie(c_name) {
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1) { 
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}
function bn_setCookie(c_name,value,expiredays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+ ";path=/" +
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
function bn_checkU(action) {	
	if(action == "setWU" ) { bn_setWU(); }
	else if (action == "getWU" ) { bn_getWU(); }
}

function bn_setWU(bn_iter) {
	var bn_iter_limit = 5;
	if(typeof(bn_iter) != 'undefined' && bn_iter > bn_iter_limit) { return; }
	var bn_u_val = bn_getCookie('bn_u');
	if(bn_isNotEmpty(bn_u_val)) {
		window.name = bn_window_param_start + bn_u_val + bn_window_param_end;
	} else {
		if(typeof(bn_iter) != 'undefined' && bn_iter > 0)
			setTimeout("bn_setWU("+(bn_iter+1)+");",500);
		else
			setTimeout("bn_setWU("+1+");",500);
	}
}

function bn_getWU() {	
	var bn_u_cookieval = bn_getCookie('bn_u');	
	var start_idx = bn_window_param_start.length;
	var end_idx = window_name.indexOf(bn_window_param_end);
	
	if(end_idx > start_idx && end_idx < window_name.length) {
		var bn_u_val = window_name.substring(start_idx, end_idx);
	
		if(bn_isNotEmpty(bn_u_val)) {
			bn_setCookie('bn_u',bn_u_val,365*3);
		} else {
			bn_setCookie('bn_u',4,365*3);
		}
	}
}

function bn_getOrderInfo() {
	if (typeof(bnOrderId) != "undefined" && bn_isNotEmpty(bnOrderId))
		baynote_tag.attrs.purchaseId = bnOrderId;
	if (typeof(bnOrderTotal) != "undefined" && bn_isNotEmpty(bnOrderTotal))
		baynote_tag.attrs.totalPurchases = parseFloat(bnOrderTotal);
	if (typeof(bnOrderDetails) != "undefined" && bn_isNotEmpty(bnOrderDetails))
		baynote_tag.attrs.purchaseDetails = bnOrderDetails;
}

function bn_onClickHandler(clicked, exitInfo) {
	if (clicked === undefined)
		return false;
	var clickProdId = "";
	if (typeof bnObserver != 'undefined' && typeof bnObserver.defaultExitConfirmation != 'undefined') {
		exitResult = bnObserver.defaultExitConfirmation(clicked, exitInfo);
		if (!exitResult)
			return false;
	}
	if ((bn_isNotEmpty(clicked.tagname) && clicked.tagName == "SPAN") || (bn_isNotEmpty(clicked.tagName) && clicked.tagName == "IMG")) {
		if (clicked.parentNode && clicked.parentNode.tagName == "A") {
			var attrs = clicked.parentNode.attributes;
			for (i = 0; i < attrs.length; i++) {
				if (attrs[i].name == 'baynote_pid')
					bnProductID = attrs[i].value;
			}
      console.log(bn_isNotEmpty(bnProductID));
      if (typeof bnProductID != 'undefined' && bn_isNotEmpty(bnProductID)) {
        console.log("Setting clickProdId");
				clickProdId = bnProductID;
      }
		}
	}
	if (bn_isNotEmpty(clickProdId)) {
		if (typeof exitInfo != 'undefined' && exitInfo != null)
			exitInfo.attrs = exitInfo.attrs || {};
		exitInfo.attrs.prodId = clickProdId;
	}
  console.log(exitInfo);
	return true;
}

function bn_showObserver() {
	/* 1. set customer id */
	bn_customerId = "hoah";
	/* 2. set customer code */
	bn_code = "www";
	var bn_locHref = window.location.href;
	if (bn_locHref.indexOf("https://") == 0) {
		baynote_tag.server = "https://" + bn_customerId + "-" + bn_code + ".baynote.net";
	} else {
		baynote_tag.server = "http://" + bn_customerId + "-" + bn_code + ".baynote.net";
	}
	var metas = document.getElementsByTagName("meta");
	for (var i = 0; i < metas.length; i++) {
		if (metas[i]) {
			if((metas[i].name =="baynote_title") ) {
				baynote_tag.docAttrs.ListingPath = metas[i].content;
			}			
		}		
	}
	baynote_tag.customerId = bn_customerId;
	baynote_tag.code = bn_code;
	baynote_tag.type = "baynoteObserver";
	baynote_tag.exitConfirmation = bn_onClickHandler;
	/* 3. set customer domain (optional) */
	/*baynote_globals.cookieDomain = "@domain@";*/
	/* 4. collect purchase info (optional) */ 
	bn_getOrderInfo();
	baynote_tag.show();
}

/*
If window.name has been initialized with the baynote pattern, then call getWU to set the bn_u cookie. 
Otherwise, call bn_showObserver(), then bn_setWU()
*/

if (bn_isNotEmpty(window_name) && window_name.indexOf(bn_window_param_start) == 0) {
	//alert("window.name had been set");
	bn_getWU();
	bn_showObserver();
} else{
	bn_showObserver();
	bn_setWU();
}