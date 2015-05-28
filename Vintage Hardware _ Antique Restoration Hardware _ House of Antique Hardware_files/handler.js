
function BNGuideLiteHandler(){this.myType="guide";this.myTag=null;this.guide=null;this.socialGuide=null;this.socialShow=false;this.socialLoggedIn=false;this.networkInfo=null;}
bnConstants.GUIDE_RESULTS_RESOURCE_PREFIX="GLResults";bnConstants.GUIDE_SOCIAL_SHOW_LOGIN="showLogin";bnConstants.GUIDE_SOCIAL_HIDE_LOGIN="hideLogin";bnConstants.GUIDE_SOCIAL_SHOW_GUIDE="showGuide";BNGuideLiteHandler.prototype.gotoPage=function(tagId,guideRank,gotoURL){with(this){if(typeof(bnTrailMgr)!="undefined"&&bnTrailMgr){var guideType=bnTagManager.getTag(tagId).guide;bnTrailMgr.guideResultClick(guideType,guideRank,gotoURL);}
if(gotoURL)
{if(bnIsIE)window.event.returnValue=false;window.location.href=gotoURL;}}}
BNGuideLiteHandler.prototype.getResultsHandlerAddress=function(guideTag){var resultsFormat=guideTag.getParam("format",bnPolicy.get(this.myType,"fmt"));if(!resultsFormat){if(guideTag.guide.indexOf("Term")>0)resultsFormat="results-terms";else resultsFormat="results";};var srcPreamble=guideTag.server+"/baynote/tags2/"+this.myType+"/"+resultsFormat+"/"+guideTag.customerId+"-"+guideTag.code;var guideScriptSrc="";guideScriptSrc+=srcPreamble;guideScriptSrc+="?userId="+bnUser.getUserId(guideTag);guideScriptSrc+="&customerId="+guideTag.customerId;guideScriptSrc+="&code="+guideTag.code;if(guideTag.key)guideScriptSrc+="&key="+guideTag.key;guideScriptSrc+="&id="+guideTag.id;var guide=guideTag.guide;if(typeof(guide)=="undefined"||guide==null)guide="AdGuide";if(this.socialShow&&this.socialGuide)guide=this.socialGuide;guideScriptSrc+="&guide="+encodeURIComponent(guide);if(guideTag.listSize)guideScriptSrc+="&resultsPerPage="+guideTag.listSize;if(guideTag.startingDocNum)guideScriptSrc+="&startingDocNum="+guideTag.startingDocNum;var query=bnPageInfo.getBNParams()["bn_q"];if(!query)query=guideTag.query;if(!query){guideTag.referrer=bnPageInfo.getReferrerURL();guideTag.refername=bnPageInfo.getReferrerSource();}
if(query){guideScriptSrc+="&query="+encodeURIComponent(query);guideTag.query=query;}
var referrer=guideTag.referrer;if(referrer){guideScriptSrc+="&referrer="+encodeURIComponent(referrer);}
guideTag.isFallback=false;var fallback=guideTag.fallback;if(fallback){guideScriptSrc+="&referrerName="+bnPageInfo.getReferrerSource();guideScriptSrc+="&fallback="+encodeURIComponent(fallback);}
var pageURL=guideTag.getParam("url",bnPageInfo.getURL());var listUrls=guideTag.getParam("listUrls",null);if(listUrls&&listUrls.length>0){for(var ixUrl=0;ixUrl<listUrls.length;ixUrl++)
guideScriptSrc+="&url="+encodeURIComponent(listUrls[ixUrl]);}
else if(bnTrail&&bnPolicy.get("trail","ok")){guideScriptSrc+="&url="+encodeURIComponent(pageURL);var listUrls=bnTrail.getUrls(bnPolicy.get("trail","tl"));if(listUrls.length>0){for(ixTrail=listUrls.length-1;ixTrail>=0;ixTrail--){var trailUrl=listUrls[ixTrail];if(trailUrl==pageURL)continue;guideScriptSrc+="&url="+encodeURIComponent(trailUrl);}}}
else{pageURL=bnCommon.addURLMetaKeys(pageURL,guideTag.metaKeys);guideScriptSrc+="&url="+encodeURIComponent(pageURL);}
guideScriptSrc+="&appendParams="+encodeURIComponent(guideTag.getParam("appendParams",""));guideScriptSrc+="&rankParam="+encodeURIComponent(guideTag.getParam("rankParam",""));if(guideTag.urlFilter)guideScriptSrc+="&urlFilter="+encodeURIComponent(guideTag.urlFilter);if(guideTag.attrFilter)guideScriptSrc+="&attrFilter="+encodeURIComponent(guideTag.attrFilter);if(guideTag.ctxAttrList)guideScriptSrc+="&ctxAttrList="+encodeURIComponent(guideTag.ctxAttrList);if(guideTag.attrSort)guideScriptSrc+="&attrSort="+encodeURIComponent(guideTag.attrSort);if(guideTag.sortSize)guideScriptSrc+="&sortSize="+guideTag.sortSize;if(guideTag.days)guideScriptSrc+="&days="+guideTag.days;if(guideTag.oe)guideScriptSrc+="&oe="+guideTag.oe;if(bnCommon.hasAnyProperty(guideTag.attrs))
{guideScriptSrc+="&contextAttrs="+bnCommon.objectToJSON(guideTag.attrs);}
var cond=bnPolicy.get("inf","cd");if(cond)guideScriptSrc+="&condition="+encodeURIComponent(cond);if(this.socialGuide){guideScriptSrc+="&social=";if(this.socialShow){if(this.socialLoggedIn)guideScriptSrc+=bnConstants.GUIDE_SOCIAL_SHOW_GUIDE;else guideScriptSrc+=bnConstants.GUIDE_SOCIAL_SHOW_LOGIN;}
else{guideScriptSrc+=bnConstants.GUIDE_SOCIAL_HIDE_LOGIN;}}
if(this.socialShow){if(this.networkInfo){networkInfo=this.networkInfo;if(networkInfo.groupIds&&!networkInfo.groupIds.isEmpty()){var param="&groupIds=";var limit=bnConstants.MAX_URL_LENGTH-guideScriptSrc.length-param.length-4;if(limit<0)limit=0;var value=networkInfo.groupIds.toString(limit);if(value&&value!=""){guideScriptSrc+=param;guideScriptSrc+=value;}}
if(networkInfo.friendIds&&!networkInfo.friendIds.isEmpty()){var param="&friendIds=";var limit=bnConstants.MAX_URL_LENGTH-guideScriptSrc.length-param.length-4;if(limit<0)limit=0;var value=networkInfo.friendIds.toString(limit);if(value&&value!=""){guideScriptSrc+=param;guideScriptSrc+=value;}}}}
guideScriptSrc+="&v=1";return guideScriptSrc;}
BNGuideLiteHandler.prototype.show=function(guideTag){this.myTag=guideTag;this.guide=this.myTag.guide;this.socialGuide=this.myTag.socialGuide;this.id=guideTag.id;this.resultResourceId=bnConstants.GUIDE_RESULTS_RESOURCE_PREFIX+guideTag.id;if(typeof(guideTag.socialShow)!="undefined"){this.socialShow=guideTag.socialShow;}
listTags=bnTagManager.getTags(bnConstants.SOCIAL_TAG);if(listTags.length>0)
{guide=this;bnResourceManager.waitForResource(bnConstants.SOCIAL_RESOURCE_ID,function(){guide.showComplete();});return;}
this.showComplete();}
BNGuideLiteHandler.prototype.showComplete=function(){if(typeof(bnSocial)!="undefined"&&bnSocial){if(bnSocial.isLoggedIn("facebook")){this.socialLoggedIn=true;}}
this.loadResults();bnResourceManager.registerAndAddResource(this.myType+this.myTag.id,this);}
BNGuideLiteHandler.prototype.loadResults=function(){var thatId=this.id;var resultsAreInProxyFn=function(){bnGuideLiteHandler.resultsAreIn(bnTagManager.getTag(thatId));};bnResourceManager.waitForResource(this.resultResourceId,resultsAreInProxyFn,this.getResultsHandlerAddress(this.myTag));}
BNGuideLiteHandler.prototype.injectWelcomeText=function(guideTag){var welcome;var welcomeElem=document.getElementById("bn_guidewelcome"+guideTag.id);if(!welcomeElem)return;if(welcomeElem.innerHTML)return;if(guideTag.isFallback)welcome=guideTag.fallbackWelcome;else welcome=guideTag.welcome;if(welcome&&welcome.indexOf("BN_QUERY")!=-1){if(guideTag.query)welcome=welcome.replace("BN_QUERY",guideTag.query);else welcome=guideTag.fallbackWelcome;}
if(welcome){welcomeElem.innerHTML=welcome;}}
BNGuideLiteHandler.prototype.resultsAreIn=function(guideTag){if(guideTag.results){var ph=document.getElementById(guideTag.placeHolderId);if(typeof(bnPolicy.showTag)=='function'){if(!bnPolicy.showTag(guideTag))ph.style.display="none";}
if(guideTag.css){for(className in guideTag.css){if(typeof(guideTag.css[className])=='function')continue;guideTag.results=guideTag.results.replace("class='"+className+"'","class='"+className+"' style='"+guideTag.css[className]+"'");}}
ph.innerHTML=guideTag.results;this.injectWelcomeText(guideTag);var listStyleUpdate=ph.getElementsByTagName("style");this.updateHead("style",listStyleUpdate);}
else if(guideTag.results==""){guideTag.injectNoload("no results");}
else{guideTag.injectNoload("error occurred");}}
BNGuideLiteHandler.prototype.updateHead=function(tagName,listElemUpdate){var listFinalUpdate=new Array();var mapElemUpdate=new Object();var idPrefix=this.myType+this.id+"-"+tagName+"-";var autoElemNum=0;for(var i=0;i<listElemUpdate.length;i++){var elemUpdate=listElemUpdate.item(i);var idBase=null;if((typeof(elemUpdate.id)=="string")&&(elemUpdate.id))idBase=elemUpdate.id;else{idBase="auto"+autoElemNum;autoElemNum++;}
var idUpdate=idPrefix+idBase;elemUpdate.parentNode.removeChild(elemUpdate);elemUpdate.id=idUpdate;mapElemUpdate[idUpdate]=elemUpdate;}
var elemHead=document.getElementsByTagName("head")[0];var listElemOld=elemHead.getElementsByTagName(tagName);for(var i=0;i<listElemOld.length;i++){var elemOld=listElemOld.item(i);if(typeof(elemOld.id)!="string"||!elemOld.id)continue;var idElem=elemOld.id;if(idElem.indexOf(idPrefix)!=0)continue;var elemUpdate=mapElemUpdate[idElem];if(elemUpdate){elemHead.replaceChild(elemUpdate,elemOld);mapElemUpdate[idElem]=null;delete(mapElemUpdate[idElem]);listFinalUpdate.push(elemUpdate);}
else elemHead.removeChild(elemOld);}
for(var idStyle in mapElemUpdate){if(!bnCommon.containsKey(mapElemUpdate,idStyle))continue;var elemUpdate=mapElemUpdate[idStyle];elemHead.appendChild(elemUpdate);listFinalUpdate.push(elemUpdate);}
return listFinalUpdate;}
BNGuideLiteHandler.prototype.evalGlobal=function(strScript){}
BNGuideLiteHandler.prototype.sessionReady=function(networkInfo){this.socialLoggedIn=true;this.networkInfo=networkInfo;}
BNGuideLiteHandler.prototype.networkLogin=function(networkInfo){this.socialLoggedIn=true;this.networkInfo=networkInfo;if(this.socialShow)this.reloadGuide();}
BNGuideLiteHandler.prototype.networkLogout=function(networkInfo){this.socialLoggedIn=false;this.networkInfo=networkInfo;if(this.socialShow)this.reloadGuide();}
BNGuideLiteHandler.prototype.loadGeneralGuide=function(){this.socialShow=false;this.reloadGuide();}
BNGuideLiteHandler.prototype.loadSocialGuide=function(args){this.socialShow=true;if(!this.socialLoggedIn&&args.cbNotLoggedIn){args.cbNotLoggedIn();return;}
this.reloadGuide();}
BNGuideLiteHandler.prototype.reloadGuide=function(){bnResourceManager.removeResource(this.resultResourceId);this.loadResults();}
BNGuideLiteHandler.prototype.setSocialShow=function(show){this.socialShow=show;}
var bnGuideLiteHandler=new BNGuideLiteHandler();bnTagManager.registerTagHandler(bnGuideLiteHandler.myType,bnGuideLiteHandler);