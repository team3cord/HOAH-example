var sn = 0;
var st = 0;
var stp = 0;
var pp = 0;
var ac = 0;
var gui = 0;
function indicateTradePrice(priceLevel,pageType){
	if(document.getElementById("pricingtext")){
		if(priceLevel == 'Trade Discount' && pageType != 'clearance'){
			document.getElementById("pricingtext").innerHTML = "Trade Price:";
			document.getElementById("pricingtext").style.color = "#339900";
			document.getElementById("price").style.color = "#339900";
		}
		if(priceLevel == 'Trade Discount' && pageType == 'clearance'){
			document.getElementById("pricingtext").innerHTML = "Trade Price:";
			document.getElementById("pricingtext").style.color = "#339900";
			document.getElementById("clearanceNow").style.color = "#339900";
			document.getElementById("pct").style.color = "#339900";
		}
	}
}
function PopupPic(sPicURL) {
	sPicURL = escape(sPicURL);
     window.open( "/site/latch_popup.htm?http://shopping.netsuite.com"+sPicURL, "", "resizable=1,HEIGHT=200,WIDTH=200");
}

function popClearance(){
	clearanceURL = '/site/popups/clearance_pop.html';
	window.open(clearanceURL,'clearancepop','resizable=1,scrollbars=1,width=470,height=620');
}
function hideButtons() 
{
	// hide the features list elements that are blank on item detail pages
				for (i=1; i<6; i++) {
					if (document.getElementById("bul"+i).innerHTML =="") {
					document.getElementById("bul"+i).style.visibility = "hidden";
					}
				}
}
function stripCharacter(words,character) {
		var spaces = words.length;
		for(var x = 1; x<spaces; ++x){
		 words = words.replace(character, "");   
	 }
	 return words;
}
function toggleDescription(dID){
	var thisClass = jQuery("#" + dID).attr('class');
	if(thisClass == 'itemDescription'){
		jQuery("#" + dID).removeClass('itemDescription');
		jQuery("#" + dID).addClass('itemDescriptionLong');
		jQuery("#more" + dID).html('[less...]');
	}
	else{
		jQuery("#" + dID).removeClass('itemDescriptionLong');
		jQuery("#" + dID).addClass('itemDescription');
		jQuery("#more" + dID).html('[more...]');
	}
}
// go to a new page based on choice made in select list (added 7/22/13 BW)
function selectToLoc(selList){
	try{
	pageURL = selList.options[selList.options.selectedIndex].value;
	window.location.href=pageURL;
	}
	catch(err){
	}
}
/* OMTR add to cart */

/****************
* Sample Code - Adds another onSubmit to the form
* 	Parameters
*		form - a form object that you want to add the handle to
*		onSubmit - the function that will replace the form handler
****************/
function addOmnitureOnSubmit(elem, onClick)
{
	if(elem.onclick && !elem.omn_onclickBk) // check for an onClick and make sure it hasn't already been backed up
	{
		elem.omn_onclickBk = elem.onsubmit; // Back up the existing onClick
		elem.onclick = onClick // Add the new onClick
	}
	else if (!elem.onclick) // if no onClick
	{
		elem.onclick = onclick; // Add the new onClick
		elem.omn_onclickBk = true; // Add a flag to Omniture onClick has already been added so it can't be added again and cause an infinitie loop		
	}
}
function OmnitureOnClick(event)
{
	var b  = true // Set the boolean variable to return
	var elem = this;
	if(typeof(elem.omn_onclickBk) == 'function') // if an onClick was backed up run that function 1st
	{
		b = elem.omn_onclickBk(event); //Call the backed up onClick
	}
	/********************Begin Analytics Logic *************************/
		//put you logic here to run after the form validation has passed successfully
		s.pageName='Add to Cart';
		s.events='scAdd';
		s.t();
	/********************End Analytics Logic **************************/	
	return b; //return a boolean
}
// GA Tracking Code for detail page clicks
function trackGAclick(clicktarget){
	var visitorCustomVarSlot5 = '';
	_gaq.push(function() {
	  var pageTracker = _gat._getTrackerByName();
	  visitorCustomVarSlot5 = pageTracker._getVisitorCustomVar(5); 
	});
	if (visitorCustomVarSlot5 == ''){
		visitorCustomVarSlot5 = "Unknown";
	}
	var iNum = jQuery("#itemNumber").text();
	var pTitle = jQuery("#tierH1").text();
	if(iNum.length > 0) {
		if(iNum.indexOf(":") != -1){
			iNum = jQuery.trim(iNum.split(":")[1]);
		}
	}
	if(iNum.length == 0 && pTitle.length > 0){
		iNum = pTitle;
	}
	if(typeof console != 'undefined'){ console.log("Tracking GA click for: " + iNum) };
	_gaq.push(['_trackEvent', clicktarget, iNum, visitorCustomVarSlot5 ]);
}
function GAclick(clicktarget){
	// calls newer "trackGAclick function - left in place for legacy function calls"
	trackGAclick(clicktarget);
}
//clear the email reg box on focus
function clearEmailInput(thisInput,inputText) {
	if(thisInput.value == inputText){
		thisInput.value = '';
	}
}

//generic function that returns URL string values by name
function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
// cookie functions - added 2-10-15 BW
/*\
 |*|  A complete cookies reader/writer framework with full unicode support.
 |*|
 |*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
 |*|
 |*|  This framework is released under the GNU Public License, version 3 or later.
 |*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
 |*|
 |*|  Syntax:
 |*|
 |*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
 |*|  * docCookies.getItem(name)
 |*|  * docCookies.removeItem(name[, path], domain)
 |*|  * docCookies.hasItem(name)
 |*|  * docCookies.keys()
 |*|
 \*/
var docCookies = {
	getItem: function (sKey) {
		if (!sKey) { return null; }
		return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	},
	setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
		if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
		var sExpires = "";
		if (vEnd) {
			switch (vEnd.constructor) {
				case Number:
					sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
					break;
				case String:
					sExpires = "; expires=" + vEnd;
					break;
				case Date:
					sExpires = "; expires=" + vEnd.toUTCString();
					break;
			}
		}
		document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
		return true;
	},
	removeItem: function (sKey, sPath, sDomain) {
		if (!this.hasItem(sKey)) { return false; }
		document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
		return true;
	},
	hasItem: function (sKey) {
		if (!sKey) { return false; }
		return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	},
	keys: function () {
		var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
		for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
		return aKeys;
	}
};
// new navigation highlighting - put in place 7-1-2014 BW
function syncNav(){
	try{
		// set up an array to hold exceptions to the breadcrumb = left nav rule (format: [Current Breadcrumb Text,Text to substitute for comparison])
		var aryNavEx = [
			['Made in USA Door Hardware','Made in USA'],
			['Made in USA Window Hardware','Made in USA'],
			['Made in USA Cabinet Hardware','Made in USA'],
			['Made in USA Lighting & Electrical','Made in USA'],
			['Made in USA House Hardware','Made in USA'],
			['Decorative Knobs','Decorative'],
			['Decorative Pulls','Decorative'],
			['Lever Handle Conversion Door Sets','Conversion/Tubular'],
			['Glass & Crystal Door Knob Sets','Conversion/Tubular'],
			['Decorative Brass Knob Conversion Door Sets','Conversion/Tubular'],
			['Plain Brass Knob Conversion Door Sets','Conversion/Tubular'],
			['Porcelain Knob Conversion Door Sets','Conversion/Tubular'],
			['Decorative Back Plate Conversion Door Sets','Conversion/Tubular'],
			['Rosette Conversion Door Sets','Conversion/Tubular'],
			['Standard Back Plate Conversion Door Sets','Conversion/Tubular'],
			['Glass & Crystal Mortise Door Sets','Mortise'],
			['Long Plate Mortise Lock Sets','Mortise'],
			['Rosette Mortise Lock Door Sets','Mortise'],
			['Mortise Entry Door Sets','Entry'],
			['Glass & Crystal Knob Entry Sets ','Entry'],
			['Standard Butt Door Hinges','Butt'],
			['Decorative Butt Door Hinges','Butt'],
			['2.5"x2.5" Butt Door Hinges','Butt'],
			['3" x 3" Butt Door Hinges','Butt'],
			['3.5" x 3.5" Butt Door Hinges','Butt'],
			['4" x 4" Butt Door Hinges','Butt'],
			['4.5" x 4.5" Butt Door Hinges','Butt'],
			['5" x 5" Butt Door Hinges','Butt'],
			['6" x 6" Butt Door Hinges','Butt'],
			['Decorative Knobs','Decorative'],
			['Decorative Pulls','Decorative'],
			['Classic Brass Knobs','Classic Brass'],
			['Classic Brass Pulls','Classic Brass'],
			['Rustic Knobs','Rustic'],
			['Rustic Pulls','Rustic'],
			['Glass & Crystal Knobs','Glass'],
			['Glass & Crystal Pulls','Glass'],
			['Lead Free Crystal Knobs & Pulls','Glass'],
			['Genuine Lead Crystal Knobs & Pulls','Glass'],
			['Pressed Glass Knobs & Pulls','Glass'],
			['Colored Glass','Glass'],
			['Wood Knobs','Wood'],
			['Wood Pulls','Wood'],
			['Colonial Style Chandeliers','Chandeliers'],
			['Classical Style Chandeliers','Chandeliers'],
			['Victorian Style Chandeliers','Chandeliers'],
			['Arts & Crafts Style Chandeliers','Chandeliers'],
			['Romantic Style Chandeliers','Chandeliers'],
			['Art Deco Style Chandeliers','Chandeliers'],
			['Mid-Century Style Chandeliers','Chandeliers'],
			['Colonial Style Bath Lighting','Bath'],
			['Classical Style Bath Lighting','Bath'],
			['Victorian Style Bath Lighting','Bath'],
			['Arts & Crafts Style Bath Lighting','Bath'],
			['Romantic Style Bath Lighting','Bath'],
			['Art Deco Style Bath Lighting','Bath'],
			['Mid-Century Style Bath Lighting','Bath'],
			['Colonial Style Pendants','Pendants'],
			['Classical Style Pendants','Pendants'],
			['Victorian Style Pendants','Pendants'],
			['Arts & Crafts Style Pendants','Pendants'],
			['Romantic Style Pendants','Pendants'],
			['Art Deco Style Pendants','Pendants'],
			['Mid-Century Style Pendants','Pendants'],
			['Colonial Style Ceiling Lights','Flush & Semi-Flush'],
			['Classical Style Ceiling Lights','Flush & Semi-Flush'],
			['Victorian Style Ceiling Lights','Flush & Semi-Flush'],
			['Arts & Crafts Style Ceiling Lights','Flush & Semi-Flush'],
			['Romantic Style Ceiling Lights','Flush & Semi-Flush'],
			['Art Deco Style Ceiling Lights','Flush & Semi-Flush'],
			['Mid-Century Style Ceiling Lights','Flush & Semi-Flush'],
			['Colonial Style Wall Sconce Lights','Sconces'],
			['Classical Style Wall Sconce Lights','Sconces'],
			['Victorian Style Wall Sconce Lights','Sconces'],
			['Arts & Crafts Style Wall Sconce Lights','Sconces'],
			['Romantic Style Wall Sconce Lights','Sconces'],
			['Art Deco Style Wall Sconce Lights','Sconces'],
			['Mid-Century Style Wall Sconce Lights','Sconces'],
			['Colonial Style Table & Floor Lamps','Table & Floor Lamps'],
			['Classical Style Table & Floor Lamps','Table & Floor Lamps'],
			['Victorian Style Table & Floor Lamps','Table & Floor Lamps'],
			['Arts & Crafts Style Table & Floor Lamps','Table & Floor Lamps'],
			['Romantic Style Table & Floor Lamps','Table & Floor Lamps'],
			['Art Deco Style Table & Floor Lamps','Table & Floor Lamps'],
			['Mid-Century Style Table & Floor Lamps','Table & Floor Lamps'],
			['Colonial Style Kitchen Lighting','Kitchen'],
			['Classical Style Kitchen Lighting','Kitchen'],
			['Victorian Style Kitchen Lighting','Kitchen'],
			['Arts & Crafts Style Kitchen Lighting','Kitchen'],
			['Romantic Style Kitchen Lighting','Kitchen'],
			['Art Deco Style Kitchen Lighting','Kitchen'],
			['Mid-Century Style Kitchen Lighting','Kitchen'],
			['Colonial Style Outdoor Lights','Outdoor'],
			['Classical Style Outdoor Lights','Outdoor'],
			['Victorian Style Outdoor Lights','Outdoor'],
			['Arts & Crafts Style Outdoor Lights','Outdoor'],
			['Romantic Style Outdoor Lights','Outdoor'],
			['Art Deco Style Outdoor Lights','Outdoor'],
			['Mid-Century Style Outdoor Lights','Outdoor'],
			['Colonial Style Entry Lights','Outdoor'],
			['Classical Style Entry Lights','Outdoor'],
			['Victorian Style Entry Lights','Outdoor'],
			['Arts & Crafts Style Entry Lights','Outdoor'],
			['Romantic Style Entry Lights','Outdoor'],
			['Art Deco Style Entry Lights','Outdoor'],
			['Mid-Century Style Entry Lights','Outdoor'],
			['Traditional Ceiling Fans','Ceiling Fans'],
			['Modern Ceiling Fans','Ceiling Fans'],
			['Outdoor Ceiling Fans','Ceiling Fans'],
			['Flush Mount Ceiling Fans','Ceiling Fans'],
			['Rod Hung Ceiling Fans','Ceiling Fans'],
			['Chandelier Ceiling Fans','Ceiling Fans'],
			['Single Post Bail Pulls','Bail Pulls'],
			['2" Center to Center Bail Pulls','Bail Pulls'],
			['2 1/2" Center to Center Bail Pulls','Bail Pulls'],
			['3" Center to Center Bail Pulls','Bail Pulls'],
			['3 1/2" Center to Center Bail Pulls','Bail Pulls'],
			['3 3/4" to 4 1/2" Center to Center Bail Pulls','Bail Pulls'],
			['1/2" Diameter Shutter Hinge Parts','Hinge Parts'],
			['3/8" Diameter Shutter Hinge Parts','Hinge Parts'],
			['Porcelain Conversion Door Sets','Porcelain Hardware & Lighting'],
			['Porcelain Knob Mortise Door Sets','Porcelain Hardware & Lighting'],
			['Porcelain Knob Entry Door Sets','Porcelain Hardware & Lighting'],
			['Porcelain Knob Rim Lock Sets','Porcelain Hardware & Lighting'],
			['Porcelain Replacement Door Knobs','Porcelain Hardware & Lighting'],
			['Porcelain Cabinet & Furniture Knobs','Porcelain Hardware & Lighting'],
			['Porcelain Latches, Casters & Hooks','Porcelain Hardware & Lighting'],
			['Porcelain Lighting','Porcelain Hardware & Lighting'],
			['Porcelain Switch Plates & Dimmers','Porcelain Hardware & Lighting'],
			['Porcelain Knob Rim Locks','Rim Locks'],
			['Brass Knob Rim Lock Sets','Rim Locks'],
			['Brass Rim Locks','Rim Locks'],
			['Replacement Rim Locks','Rim Locks'],
			['Cast Iron Rim Locks','Rim Locks'],
			['Holiday Inspiration - Colonial Lights','Holiday Inspiration'],
			['Holiday Inspiration - Welcome Key','Holiday Inspiration'],
			['Holiday Inspiration - Key Ornaments','Holiday Inspiration'],
			['Holiday Inspiration - Wreath','Holiday Inspiration'],
			['Holiday Inspiration - Knobs','Holiday Inspiration'],
			['Holiday Gift Guide - Classic','Holiday Gift Guide'],
			['Holiday Gift Guide - Eclectic','Holiday Gift Guide'],
			['Holiday Gift Guide - Rugged','Holiday Gift Guide'],
			['Holiday Gift Guide - Decadent','Holiday Gift Guide'],
			['Holiday Gift Guide - Glamorous','Holiday Gift Guide'],
			['Holiday Gift Guide - Minimalist','Holiday Gift Guide'],
			['Stained Glass Lamps','Stained Glass Lighting'],
			['Stained Glass Chandeliers & Pendants','Stained Glass Lighting'],
			['Glass & Crystal Door Knobs','Door Knobs'],
			['Porcelain Door Knobs','Door Knobs'],
			['Decorative Metal Door Knobs','Door Knobs'],
			['Plain Metal Door Knobs','Door Knobs'],
			['Conversion Entry Door Sets','Entry'],
			['Mortise Entry Door Sets','Entry'],
			['Glass & Crystal Knob Entry Sets','Entry'],
			['Outdoor Lighting Highlights','March Lighting Promotion'],
			['Chandelier Highlights','March Lighting Promotion'],
			['Sconce Highlights','March Lighting Promotion'],
			['Flush Mount Highlights','March Lighting Promotion'],
			['Table & Floor Lamp Highlights','March Lighting Promotion'],
			['Pendant Highlights','March Lighting Promotion'],
			['Kitchen Lighting Highlights','March Lighting Promotion'],
			['Bath Highlights','March Lighting Promotion'],
            ['Electric Door Bell Buttons','Doorbells & Knockers'],
            ['Hand-Turn Doorbells','Doorbells & Knockers'],
            ['Reproduction Door Knockers','Doorbells & Knockers']
		];
		// wow, it seems IE8 doesn't support string trimming (!?) - so we have to actually prototype it first.
		if(typeof String.prototype.trim !== 'function') {
			String.prototype.trim = function() {
				return this.replace(/^\s+|\s+$/g, ''); 
			}
		}
		// check to see if there's an addition crumb to manually add (applies to information items only) and add it to the crumbs if so
		if(typeof addCrumb != "undefined" && ac == 0){
			jQuery("#hiddenCrumbs").append(addCrumb);
			ac++;
		}		
		var aryBcrumbs = jQuery("#hiddenCrumbs a");
		var thisItem;
		var thisParent = jQuery("#mainMenu li > a");
		var thisNavItem;
		// if the last entry in the breadcrumbs is not a link, create a pseudo-link and add it to the array (for category & listing pages)
		var aryBcrumbString = jQuery("#hiddenCrumbs").text().split(">");
		// if the crumb trail is a custom "faux" version, read it instead
		if(jQuery("#fauxcrumbtrail").length > 0){
			aryBcrumbString = jQuery("#fauxcrumbtrail").text().split(">");
		}
		aryBcrumbString.pop();
		if(aryBcrumbString.length > aryBcrumbs.length){
			thisBcrumbText = aryBcrumbString[aryBcrumbString.length - 1].trim();
			thisBcrumbLink = document.location.href;
			var newLink = jQuery("<a>",{href:thisBcrumbLink,text:thisBcrumbText});
			aryBcrumbs.push(newLink);
			console.log("aryBcrumbs new length: " + aryBcrumbs.length);
		}
		// loop through the breadcrumbs
		for(i=0;i<aryBcrumbs.length;i++){
			// get the element in left nav that corresponds with this element of the breadcrumbs
			thisItem = aryBcrumbs[i];
			thisText = jQuery(thisItem).text();
			// check to see if the current breadcrumb is in our NavEx array and substitute the text if so
			for(j=0;j<aryNavEx.length;j++){
				if (aryNavEx[j][0] == thisText){
					thisText = aryNavEx[j][1];
					break;
				}
			}
			thisNavItem = jQuery(thisParent).filter(function() { return jQuery.text([this]) === thisText; });
			thisParent = jQuery(thisNavItem).parentsUntil("ul").find("a");
			thisChildUL = jQuery(thisNavItem).parentsUntil("ul").find("ul").first();
			console.log(jQuery(thisChildUL).attr("id"));
			if(thisNavItem.length > 0) {
				// open the sub-nav menu for this item
				jQuery(thisChildUL).css("display","block");
				// add a class to the parent LI to show it as open
				if(jQuery(thisNavItem).css("background-image") != "none") {
					jQuery(thisNavItem).addClass("openItem");
				}
				// if this is the last item in the breadcrumbs, highlight it
				if(i == aryBcrumbs.length - 1){
					jQuery(thisNavItem).addClass("activeNavItem");
				}			
			}
		}
		// workaround for highlighting on Restoration and Shop by Type pages, which exist outside the NS structure
		if(document.location.href.indexOf("renovators-hardware.html") != -1){
			jQuery("#reproMenuID_a").addClass("activeNavItem");
		}
		if(document.location.href.indexOf("restorers-hardware.html") != -1){
			jQuery("#sbt").addClass("openItem");
			jQuery("#sbt").addClass("activeNavItem");
		}		
		sn++;		
	}
	catch(e){
		if(typeof console != "undefined") { console.log("syncNav error: " + e) };
	}
}
//trigger the email registration pop-up under certain conditions
function emailRegAlert(){
    // enable the fancybox pop up for the newsletterReg iframe
    try{
        jQuery("#newsletterReg").fancybox({
            'autoSize'		: false,
            'width'			: 600,
            'height'		: 333,
            'padding'		: 0,
            'autoScale'		: false,
            'transitionIn'	: 'none',
            'transitionOut'	: 'none',
            'type'			: 'iframe',
            'scrolling'		: 'no'
        });
        // if cookies can be read and the newsletter box hasn't popped up in this session, pop it
        if(Modernizr.cookies){
            var regpops = docCookies.getItem('regpcount');
            var totalpops = docCookies.getItem('emailpopups');
            // if totalpops is undefined, attempt to set it to zero
            if(totalpops == null){
                totalpops = 0;
                //write a domain cookie to do the master tracking across sessions
                docCookies.setItem('emailpopups',totalpops,Infinity,'/');
                totalpops = docCookies.getItem('emailpopups');
            }
            // if regpops is undefined, attempt to set it to 0
            if(regpops == null){
                regpops = 0;
                docCookies.setItem('regpcount',regpops);
                regpops = docCookies.getItem('regpcount');
            }
            // disallow pop-ups once the registration page has been loaded
            if(document.location.href.indexOf('email-sign-up') != -1){
                totalpops = 4;
                docCookies.setItem('emailpopups',totalpops,Infinity,'/');
            }
            // if the registration pop-up hasn't fired yet this session, trigger it (but only for the base hoah domain - not for the cart)
            totalpops = docCookies.getItem("emailpopups");
            if(totalpops < 4){
                if ((regpops == 1) && document.location.protocol != 'https:'){
                    jQuery("#newsletterReg").click();
                    regpops++
                    docCookies.setItem('regpcount',regpops,'/');
                    totalpops++
                    docCookies.setItem('emailpopups',totalpops,Infinity,'/');
                }
                else {
                    regpops ++;
                    docCookies.setItem('regpcount',regpops);
                }
            }
        }
    }
    catch(e){
        if(typeof console != 'undefined'){
            console.log(e);
        }
    }
}
// BAYNOTE FUNCTIONS - rolled into functions.js 7/1/2014 BW
var BaynoteJSVersion="$Revision: 1.25 $";var BN_READY_SIGNAL="ReadySignal";if(typeof(baynote_globals)=="undefined")var baynote_globals=new Object();baynote_globals.waitForReady=false;function BNLog(){this.timeBase=new Date().getTime();this.lines=new Array();this.lastLine="";this.repCount=0;}
BNLog.prototype.log=function(str){if(str==this.lastLine){++this.repCount;return;}
if(this.repCount>0){this.lines.push("___ ABOVE REPEATED "+this.repCount+" TIME"+((this.repCount>1)?"S":""));}
this.lastLine=str;this.repCount=0;var elapsed=new Date().getTime()-this.timeBase
this.lines.push(elapsed+": "+str);}
BNLog.prototype.toString=function(){if(this.repCount>0){this.lines.push("___ ABOVE REPEATED "+this.repCount+" TIME"
+((this.repCount>1)?"S":""));this.lastLine="";this.repCount=0;}
return this.lines.join("\n");}
if(typeof(bnLog)=="undefined"){var bnLog=new BNLog();}
function BNCriticalSectionQueue(){this.waitList=new Object();this.lastId=0;}
BNCriticalSectionQueue.prototype.issueId=function(){return++this.lastId;}
BNCriticalSectionQueue.prototype.enqueue=function(id,item){this.waitList[id]=item;}
BNCriticalSectionQueue.prototype.getWaiter=function(id){return(id==null)?null:this.waitList[id];}
BNCriticalSectionQueue.prototype.firstWaiter=function(){return this.getWaiter(this.nextWaiterKeyAfter(null));}
BNCriticalSectionQueue.prototype.nextWaiterAfter=function(id){return this.getWaiter(this.nextWaiterKeyAfter(id));}
BNCriticalSectionQueue.prototype.nextWaiterKeyAfter=function(id){for(var currKey in this.waitList){if(typeof(this.waitList[currKey])!="object")continue;if(id==null)return currKey;if(id==currKey)id=null;}
return null;}
BNCriticalSectionQueue.prototype.nextPredecessor=function(target,start){for(var currWaiter=start;currWaiter!=null;currWaiter=this.nextWaiterAfter(currWaiter.id)){if(currWaiter.enter||(currWaiter.number!=0&&(currWaiter.number<target.number||(currWaiter.number==target.number&&currWaiter.id<target.id)))){return currWaiter;}}
return null;}
function BNCriticalSection(csQueue){this.csQueue=csQueue;this.debug=1;}
BNCriticalSection.prototype.enter=function(enterFunc){this.enterFunc=enterFunc;this.id=this.csQueue.issueId();this.csQueue.enqueue(this.id,this);this.enter=true;this.number=(new Date()).getTime();this.enter=false;this.attempt(this.csQueue.firstWaiter());}
BNCriticalSection.prototype.leave=function(){if(this.debug)bnLog.log("LEAVE "+this.id);this.number=0;}
BNCriticalSection.prototype.attempt=function(start){var nextReady=this.csQueue.nextPredecessor(this,start);if(nextReady!=null){if(this.debug)bnLog.log("WAIT "+this.id);var me=this;return setTimeout(function(){me.attempt(nextReady);},50);}
if(this.debug)bnLog.log("ENTER "+this.id);this.enterFunc();}
function BNResourceManager(){this.csQueue=new BNCriticalSectionQueue();this.critSec=null;this.debug=1;this.resources=new Object();this.waiting=new Object();}
BNResourceManager.prototype.getResource=function(rId){return this.resources[rId];}
BNResourceManager.prototype.loadResource=function(rId,rAddress,rType){if(typeof(this.resources[rId])!="undefined")return;this.resources[rId]=null;var critSec=new BNCriticalSection(this.csQueue);critSec.enter(function(){bnResourceManager.inject(rId,rAddress,rType,critSec);});}
BNResourceManager.prototype.inject=function(rId,rAddress,rType,critSec){this.critSec=critSec;if(this.debug)bnLog.log("INJECT "+this.critSec.id+" ("+rId+")");if(!rType||rType=="script"){var scriptTag1=document.createElement("script");scriptTag1.language="javascript";scriptTag1.src=rAddress;var head=document.getElementsByTagName("head");head[0].appendChild(scriptTag1);}
else if(rType=="img"){var img=document.createElement("IMG");var handler=function(){bnResourceManager.registerAndAddResource(rId,img);};if(img.addEventListener)img.addEventListener("load",handler,false);else if(img.attachEvent)img.attachEvent("onload",handler);else img["onload"]=handler;img.src=rAddress;}
else alert("Unexpected resource type to loadResource: "+rType);}
BNResourceManager.prototype.waitForResource=function(rId,callbackCode,rAddress,rType){with(this){if(getResource(rId)){this.runCallback(callbackCode);}
else{if(typeof(waiting[rId])=="undefined")waiting[rId]=new Array();var waitingList=waiting[rId];waitingList[waitingList.length]=callbackCode;if(rAddress)this.loadResource(rId,rAddress,rType);}}}
BNResourceManager.prototype.wakeUpWaiting=function(rId){with(this){var waitingList=waiting[rId];if(!waitingList)return;for(var i=0;i<waitingList.length;i++){if(waitingList[i]){var codeToEval=waitingList[i];waitingList[i]=null;if(this.debug&&codeToEval)bnLog.log("CALLBACK "+rId+": "+codeToEval);this.runCallback(codeToEval);}}}}
BNResourceManager.prototype.registerAndAddResource=function(rId,resource){if(this.debug)bnLog.log("REGISTER "+(this.critSec?this.critSec.id:"")+" ("+rId+")");this.resources[rId]=resource;this.wakeUpWaiting(rId);this.critSec.leave();setTimeout("bnResourceManager.wakeUpWaiting('"+rId+"')",5000);}
BNResourceManager.prototype.registerResource=function(rId){this.registerAndAddResource(rId,true);}
BNResourceManager.prototype.runCallback=function(callback){if(typeof(callback)=="string")eval(callback);else if(typeof(callback)=="function")callback();else alert("Invalid callback, type="+typeof(callback));}
if(typeof(bnResourceManager)=="undefined"){var bnResourceManager=new BNResourceManager();}
function BNSystem(){this.testServer=null;}
BNSystem.prototype.getCookieValue=function(cookieName,cookieSubDomain){if(!cookieSubDomain)cookieSubDomain=baynote_globals.cookieSubDomain;if(cookieSubDomain)cookieName+=("-"+cookieSubDomain);var sRE="(?:; )?"+cookieName+"=([^;]*);?";var oRE=new RegExp(sRE);if(oRE.test(document.cookie)){return decodeURIComponent(RegExp["$1"]);}else{return null;}}
BNSystem.prototype.setCookie=function(cookieName,cookieValue,cookiePath,cookieExpires,cookieDomain,cookieSubDomain){cookieValue=encodeURIComponent(cookieValue);if(cookieExpires=="NEVER"){var nowDate=new Date();nowDate.setFullYear(nowDate.getFullYear()+500);cookieExpires=nowDate.toGMTString();}
else if(cookieExpires=="SESSION")cookieExpires="";if(cookiePath!="")cookiePath=";Path="+cookiePath;if(cookieExpires!="")cookieExpires=";expires="+cookieExpires;if(!cookieDomain)cookieDomain=(baynote_globals.cookieDomain)?baynote_globals.cookieDomain:"";if(cookieDomain!="")cookieDomain=";domain="+cookieDomain;if(!cookieSubDomain)cookieSubDomain=baynote_globals.cookieSubDomain;if(cookieSubDomain)cookieName+=("-"+cookieSubDomain);var cookieStr=cookieName+"="+cookieValue+cookieExpires+cookiePath+cookieDomain;if(cookieStr.length>4096)return false;document.cookie=cookieStr;return true;}
BNSystem.prototype.removeCookie=function(cookieName,cookieDomain){this.setCookie(cookieName,"","/","Mon, 1 Jan 1990 00:00:00",cookieDomain);}
BNSystem.prototype.getURLParam=function(name,url){if(!url)var url=window.location.href;var regex=new RegExp("[\\?&]"+name+"=([^&#]*)");var match=regex.exec(url);if(!match)return null;else return match[1];}
BNSystem.prototype.getTestServer=function(){if(this.testServer!=null)return this.testServer;var testServer=this.getURLParam("bn_test");if(testServer)this.setCookie("bn_test",testServer,"/","SESSION");else if(testServer=="")this.removeCookie("bn_test");else{testServer=this.getCookieValue("bn_test");if(!testServer)testServer="";}
this.testServer=testServer;return testServer;}
if(typeof(bnSystem)=="undefined"){var bnSystem=new BNSystem();}
if(typeof(BNTag)=="undefined"){function BNTag(previousTag){if(previousTag){this.id=previousTag.id+1;this.server=previousTag.server;this.customerId=previousTag.customerId;this.code=previousTag.code;}
else this.id=0;this.attrs=new Object();this.docAttrs=new Object();this.css=new Object();}}
BNTag.prototype.getCommonResourceId=function(){return"Common";}
BNTag.prototype.getCommonResourceAddress=function(tag){return(this.server+"/baynote/tags2/common.js");}
BNTag.prototype.getFailsafeResourceId=function(){return"Failsafe";}
BNTag.prototype.getFailsafeResourceAddress=function(){var v=BaynoteJSVersion.split(" ")[1];var u=bnSystem.getCookieValue("bn_u");return(this.server+"/baynote/customerstatus2?customerId="+this.customerId+"&code="+this.code+"&x="+this.id+(new Date().getTime())+"&v="+v+"&u="+u);}
BNTag.prototype.show=function(parentElemId){if(this.id==0)document.write("<span id='bn_placeholder_global'></span>");this.placeHolderId="bn_placeholder"+this.id;var placeHolderType;if(this.placeHolderElement)placeHolderType=this.placeHolderElement;else placeHolderType=this.popup?"span":"div";if(parentElemId){var placeHolder=document.createElement(placeHolderType);placeHolder.id=this.placeholderId;document.getElementById(parentElemId).appendChild(placeHolder);}
else document.write("<"+placeHolderType+" id='"+this.placeHolderId+"'></"+placeHolderType+">");window["bn_tags"][this.id]=this;var testServer=bnSystem.getTestServer();if(testServer){var reValidTestServer=new RegExp("^https?://[^/]*\.baynote\.(com|net)(:\d+)?(/.*)?");if(reValidTestServer.test(testServer))this.server=testServer;else alert("Ignoring invalid test server \""+testServer+"\"");}
this.showWhenReady(this);baynote_tag=new BNTag(this);}
BNTag.prototype.showWhenReady=function(tag){if(baynote_globals.waitForReady&&!bnResourceManager.getResource(BN_READY_SIGNAL)){bnResourceManager.waitForResource(BN_READY_SIGNAL,function(){tag.showWhenReady(tag);});return;}
var failsafeId=this.getFailsafeResourceId();if(!bnResourceManager.getResource(failsafeId)){bnResourceManager.waitForResource(failsafeId,function(){tag.showWhenReady(tag);},this.getFailsafeResourceAddress(),"img");return;}
var commonId=this.getCommonResourceId();if(!bnResourceManager.getResource(commonId)){bnResourceManager.waitForResource(commonId,function(){tag.showWhenReady(tag);},this.getCommonResourceAddress(),"script");return;}
bnTagManager.show(tag.id);}
BNTag.prototype.noshow=function(){window["bn_tags"][this.id]=this;baynote_tag=new BNTag(this);}
BNTag.prototype.getParam=function(name,defaultValue){var value=this[name];if(typeof(value)=="undefined"||value==null)return defaultValue;else return value;}
if(typeof(baynote_tag)=="undefined"){window["bn_tags"]=new Array();var baynote_tag=new BNTag(null);}
function bnReadySignal(){bnResourceManager.registerResource(BN_READY_SIGNAL);}
function bnCall(resName,methodName,methodArg){var resource=bnResourceManager.getResource(resName);if(!resource){bnResourceManager.waitForResource(resName,function(){bnCall(resName,methodName,methodArg);});return;}
if(typeof(resource)!="object"){return;}
var method=resource[methodName];if(typeof(method)!="function"){return;}
method.call(resource,methodArg);}
// begin baynote-guide.js 
/*
 * Baynote Recommendations for houseofantiquehardware.com
 * Last updated: Dec 8, 2008
 */
function bn_isNotEmpty(name) {
	return (name != null) && (name != "");
}
function bn_getUrlParam(name) {
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS,"i");
	var tmpURL = window.location.href;
	var results = regex.exec(tmpURL);
	if(results == null)
		return "";
	else
		return unescape(results[1]);
}
function bn_getPageUrl() {
	var pageUrl = baynote_tag.url; 
	if ((typeof(pageUrl) == "undefined") || (pageUrl == null) || (pageUrl == ""))
	  pageUrl = window.location.href;
	return pageUrl;
}
function bn_getSearchTerm() {
  var searchTerm = bn_getUrlParam("search");  
  return unescape(searchTerm);
}
function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	//strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}
function baynote_waitForGuide(bn_wait_count) {
    var bn_results = getElementsByClassName(document, "a", "bn_g_result_link");
    if(bn_isNotEmpty(bn_results)){
         
         for(var j=0; j <bn_results.length; j++){
        	 var str = bn_results[j].firstChild.nodeValue;
        	 if(str.length > 30){
        		 var spaceIndex =str.indexOf(" ", 25);
        		 if(spaceIndex > -1){
        			 str=str.substring(0, spaceIndex) + "...";
        		 }else if(str.indexOf(" ", 20) > -1){
        			 spaceIndex=str.indexOf(" ", 20);
        			 str=str.substring(0, spaceIndex) + "...";
        		 }
        	 }
        	 bn_results[j].firstChild.nodeValue = str;
         }
	}
    else if(bn_wait_count < 10){
          bn_wait_count++;
          setTimeout("baynote_waitForGuide("+bn_wait_count+")", 200);
     }
}
function baynote_showGuide(guideType, listSize) {
	bn_customerId = "hoah"; /* 1. set customer id */
	bn_code = "www"; /* 2. set customer code */
	var bn_locHref = window.location.href;
	if (bn_locHref.indexOf("https://") == 0) {
		baynote_tag.server = "https://" + bn_customerId + "-" + bn_code + ".baynote.net";
	} else {
		baynote_tag.server = "http://" + bn_customerId + "-" + bn_code + ".baynote.net";
	}
	baynote_tag.customerId="hoah";
	baynote_tag.code="www";
	baynote_tag.type="guide";				
	baynote_tag.guide= guideType;
	if(bn_isNotEmpty(listSize)){
		baynote_tag.listSize=listSize;
	}else{
		baynote_tag.listSize=6;
	}
	
	var query = bn_getSearchTerm();
	baynote_tag.query=query;
	baynote_tag.show();
	bnResourceManager.waitForResource("GLResults0", "baynote_waitForGuide(1)");
}
function trackBN () { // set GA variable
	if (typeof BNPageType != 'undefined' && BNPageType == "tier") {
		_gaq.push(['_setCustomVar',5,'Product Finding Method','BaynoteTierPages',1]);	
	}
	else if (typeof BNPageType != 'undefined' && BNPageType == "SiteSearch" ) {
		_gaq.push(['_setCustomVar',5,'Product Finding Method','BaynoteSiteSearch',1]);
	}
	else {
		_gaq.push(['_setCustomVar',5,'Product Finding Method','Baynote',1]);	
	}
	return true;
}
// END BAYNOTE FUNCTIONS
// SOCIAL MEDIA SHARING FUNCTIONS
function fbs_click() {
	u=location.href;
	t= document.title.replace(/ /g,"+");
	window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');
	trackGAclick("facebook share")
	return false;
}
var pn_image = encodeURIComponent('http://img.houseofantiquehardware.com/HOAH_logo_social.gif');
// facebook share function
// twitter share function
function tw_click() {
	u=location.href;
	window.open('http://twitter.com/home/?status='+encodeURIComponent(u),'sharer','toolbar=0,status=0,width=626,height=436');
	trackGAclick("twitter share");
	return false;
}
// pinterest pin function
function pn_click() {
	u=location.href;
	t= document.title.replace(/ /g,"+");
	m= pn_image;
	window.open('http://pinterest.com/pin/create/button/?url='+encodeURIComponent(u)+'&media='+m,'sharer','toolbar=0,status=0,width=626,height=436');
	trackGAclick("pinterest share")
	return false;
}
// email share function
function em_click() {
		trackGAclick("email share")
	return false;
}
(function() {
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
});
function printPage(){
		trackGAclick("page printed");
		print();
}	
function getUserInfo(){
	jQuery.get('/site/includes/get_user_info2.html', function( data ) {
		var $data = jQuery(data)
		var cart_contents = $data.filter( "#cart_contents" ).html();
		var user_info = $data.filter( "#user_info2" ).html();

		jQuery( "#cart_contents" ).html( cart_contents );
		jQuery( "#user_info2" ).html( user_info );
	});
	gui++;
}
// custom tracking code - adapted from example code by hackingUI - for doing GA tracking on tagged link clicks automatically (added 3/10/15 BW)
// this is designed to send click events to both Google Analytics and MixPanel, should we ever decide to use it.
hackingUi = {};
hackingUi.Analytics = {
    trackEvent: function(category, action, label) {
        var eventObject = {
                'eventCategory': category,
                'eventAction': action
            },
            mixpanelName = category;

        if (label) {
            eventObject.eventLabel = label;
            mixpanelName = mixpanelName + ': ' + label;
        }
        if (window.ga) {
            ga('send', 'event', eventObject);
        }
        if (window._gaq) {
            _gaq.push(['_trackEvent', eventObject.eventCategory, 'click', eventObject.eventLabel ]);
        }
        if (window.mixpanel) {
            mixpanel.track(mixpanelName);
        }
    },
    bindToAllClicks: function() {
        var _this = this;
        jQuery('body').on('click', '[data-analytics-category]', function() {
            var category = jQuery(this).data('analyticsCategory'),
                label = jQuery(this).data('analyticsLabel');
            _this.trackEvent(category, 'click', label);
        });
    },

    init: function() {
        this.bindToAllClicks();
    }
};
//Monitor the Add to Cart button and call the trackGAclick function when clicked
jQuery(document).ready(function() {
    // init the hackingUI event tracker
    hackingUi.Analytics.init();
    // synchronize the left nav with the breadcrumbs
    syncNav();
   	// call various functions that used to have their own document.ready triggers
    if(typeof productParser === 'function' && pp === 0){
	productParser();
	}
	if(typeof showTabs === 'function' && st === 0){
		showTabs();
	}
	if(typeof showTradePrice === 'function' && stp === 0){
		showTradePrice();
	}
	if(typeof visitorGeolocation === 'function' && typeof callback === 'function'){
		visitorGeolocation.checkcookie(callback);
	}	
	/* Disable caching for Ajax calls - 11/7/13 JB */
	jQuery.ajaxSetup ({
	    // Disable caching of AJAX responses
	    cache: false
	});
    // copy the hidden breadcrumb contents to the visible crumb div
    jQuery("#crumbtrail").html(jQuery("#hiddenCrumbs").html());
	// trigger the email registration pop-up if certain conditions are met
	emailRegAlert();
	// trigger the add-to-cart GA event when thisItemID isn't defined
	if(typeof thisItemID != 'undefined'){
		jQuery('#btnAddToCart').click(function() {
			_gaq.push(['_trackEvent', "add-to-cart", thisItemID, visitorCustomVarSlot5 ]);
		});
	}
	//remove the tier page baynote for mobile users to open up more horizontal screen space
	if((/iPhone|iPod|iPad|Android|BlackBerry|IEMobile/).test(navigator.userAgent)){
		jQuery('#recommendedProductsMBVTier').css('display','none');
	}
	// if the item has an inline video, display its controls
    if(jQuery("#testVidInner").length > 0 && Modernizr.video){
        jQuery("#inlineVid").css("display","inline");
    }
    jQuery('.vidcontainer, #inlineVid').click(function(){
    	if (typeof document.getElementById("testVidInner").loop == 'boolean') { // loop supported
		  document.getElementById("testVidInner").loop = true;
		} 
		else { // loop property not supported
		  document.getElementById("testVidInner").addEventListener('ended', function () {
		    this.currentTime = 0;
		    this.play();
		  }, false);
		}
		if(jQuery('.vidcontainer').hasClass('iv_playing')){
			document.getElementById('testVidInner').pause();
			jQuery('.vidcontainer').removeClass('iv_playing');
			jQuery('.vidcontainer').addClass('iv_paused');
			jQuery('.vidcontainer').css('display','none');
			jQuery('#zoom').css('visibility','visible');
			jQuery('#lgView').css('visibility','visible');
		} else {
			jQuery('#testVidInner').css('visibility','visible'); // should use addClass for speed, but didn't work
			document.getElementById('testVidInner').play(); // for play() must use regular js not jQuery
	    	actionName = "Inline video played: " + jQuery("h1.h1ItemDetail").text();
	    	trackGAclick(actionName);    		
			jQuery('.vidcontainer').removeClass('iv_paused');
			jQuery('.vidcontainer').addClass('iv_playing');
			jQuery('.vidcontainer').css('height','486px');
			jQuery('.vidcontainer').css('background-color','#fff');
			jQuery('.vidcontainer').css('display','block');
			jQuery('#zoom').css('visibility','hidden');
			jQuery('#lgView').css('visibility','hidden');
		};
	});
	// if this is a light bulb detail page, switch off the "pictured in" text box
	if(jQuery("#hiddenCrumbs").text().indexOf("Vintage Light Bulbs") != -1){
		jQuery("#caption-box").css("display","none");
	}
	//determine whether the user is logged in or out depending on their customer ID
	//toggleLoginOut(cID);
	// track clicks on the email subscription header form
	jQuery("#emailsubgo").click(function() {
		trackGAclick('HP Sign Up Link Box');
	});
	jQuery("#hp_bliss").click(function() {
		trackGAclick('HP Pure Bliss Feature');
	});
	// track clicks on the email subscription home page banner
	jQuery("#emailsubbanner").click(function() {
		trackGAclick('HP Sign Up Link Envelope Banner');
	});
	// track clicks on the left nav blog link
	jQuery("#blog").click(function() {
		trackGAclick('Blog Link - Left Nav');
	});
	// track clicks on the home page house hardware banner
    jQuery("#homepagehousebanner").click(function(){
        trackGAclick('House Hardware Homepage Banner');
    });
    // track clicks on the home page crystal feature banner
	jQuery("#hp_crystal").click(function(){
        trackGAclick('Crystal Homepage Banner');
        window.location.href="/crystal-hardware-lighting";
    });
	// track clicks on the home page free shipping banner
    jQuery("#shippingbanner").click(function(){
        trackGAclick('Homepage Free Shipping Banner');
    });
	// track clicks on the home page custom work banner
    jQuery("#hpCustomWork").click(function(){
        trackGAclick('Homepage Custom Work Link');
    });    
	// track clicks on the footer Exclusive Offers sign-up form
    jQuery("#exoffoot").click(function(){
        trackGAclick('Footer Exclusive Offers Signup Form');
    }); 
    // track clicks on the footer social media icons
    jQuery("#footerGplus").click(function(){
        trackGAclick('Footer Google Plus Icon Click');
    });    
   	jQuery("#footerFacebook").click(function(){
        trackGAclick('Footer Facebook Icon Click');
    });    
   	jQuery("#footerTwitter").click(function(){
        trackGAclick('Footer Twitter Icon click');
   	});
   	jQuery("#footerPinterest").click(function(){
        trackGAclick('Footer Pinterest Icon click');
   	});   
   	jQuery("#footerContact").click(function(){
        trackGAclick('Footer Contact Icon click');
    });   
    jQuery("#hp_vid_blank").click(function(){
    	trackGAclick('Homepage Video Feature Blank Area Click');
    });
    jQuery("#hp_vid_1").click(function(){
    	trackGAclick('Homepage Video Feature Video 1 Click');
    });
    jQuery("#hp_vid_2").click(function(){
    	trackGAclick('Homepage Video Feature Video 2 Click');
    }); 
    jQuery("#hp_sg").click(function(){
    	trackGAclick('Homepage Stained Glass Feature Click');
    }); 
    jQuery("#hp_on").click(function(){
    	trackGAclick('Homepage Old-New Feature');
    }); 
    jQuery("#scFlash").click(function(){
    	trackGAclick('Special Collections PHC Flash Click');
    }); 
    jQuery("#sc_abh").click(function(){
    	trackGAclick('Special Collections ABH Button Click');
    }); 
    jQuery("#sc_abhtxt").click(function(){
    	trackGAclick('Special Collections ABH Button Click');
    }); 
    jQuery("#sc_usa").click(function(){
    	trackGAclick('Special Collections Made in USA Button Click');
    }); 
    jQuery("#sc_usatxt").click(function(){
    	trackGAclick('Special Collections Made in USA Button Click');
    }); 
    jQuery("#sc_ah").click(function(){
    	trackGAclick('Special Collections Antique Hardare Button Click');
    }); 
    jQuery("#sc_ahtxt").click(function(){
    	trackGAclick('Special Collections Antique Hardare Button Click');
    });
    jQuery("#sc_cr").click(function(){
    	trackGAclick('Special Collections Crystal Hardware Button Click');
    }); 
    jQuery("#sc_crtxt").click(function(){
    	trackGAclick('Special Collections Crystal Hardware Button Click');
    });
    jQuery("#scStainedGlass").click(function(){
    	trackGAclick('Special Collections Stained Glass Feature Click');
    }); 
    jQuery("#scCharlestown").click(function(){
    	trackGAclick('Special Collections Charlestown Feature Click');
    }); 
    jQuery("#scNatural").click(function(){
    	trackGAclick('Special Collections Natural Inspiration Feature Click');
    });     
	// enable the fancybox pop-up for email sharing
	if(typeof fancybox != 'undefined'){
		jQuery("#share_email").fancybox({
			'autoSize'		: false,
			'width'			: 600,
			'height'		: 571,
			'padding'		: 0,
			'autoScale'		: false,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none',
			'type'			: 'iframe',
			'scrolling'		: 'no'
		});	
	}
	/*	Populate Cart Contents & Populate User Info Links (My Account, [Login/Register | Sign Out]) 
		Rewritten 12/13 to not cause as many page hits.
	*/
	if(gui === 0){
		getUserInfo();
	}
	/* Set Nextopia Cookie to block unwanted visitors to search.houseofantiquehardware.com */
	try{
		docCookies.setItem('nxtsearch','true','/','.houseofantiquehardware.com');
	}
	catch(e){
		if(typeof console != 'undefined'){ console.log(e) };
	}

	// check the search field before submitting to make sure it's not empty - alert if it is
	var searchErrorText = "Enter a search term";
	jQuery("#searchportlettag").submit(function(e){
		var thisSearchText = jQuery("#searchInput").val();
		if(thisSearchText == '' || thisSearchText == searchErrorText){
			jQuery("#searchInput").addClass("searchError");
			jQuery("#searchInput").val(searchErrorText);
			e.preventDefault();
			return false;			
		}
	});
	jQuery("#searchInput").focus(function(){
		console.log("search Input Text: " + jQuery("#searchInput").val());
		if(jQuery("#searchInput").val() == searchErrorText) {
			jQuery("#searchInput").removeClass("searchError");
			jQuery("#searchInput").val("");
		}
	});
	// enable the fancybox pop-up for email sharing
	jQuery("#share_email").fancybox({
		'autoSize'		: true,
		'width'		: 660,
		'height'		: 700,
		'autoScale'	: false,
		'transitionIn'	: 'none',
		'transitionOut'	: 'none',
		'type'		: 'iframe',
		'scrolling'		: 'no'
	});
	// global var for pinterest image
});
// make this script compatible with other frameworks
jQuery.noConflict();
