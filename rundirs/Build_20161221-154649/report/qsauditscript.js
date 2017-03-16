var dom = (document.getElementsByTagName) ? true : false;                 
var ie5 = (document.getElementsByTagName && document.all) ? true : false; 
var arrowUp, arrowDown;                                                   
if (ie5 || dom)                                                           
	initSortTable();                                                   
function initSortTable() {                                                
	arrowUp = document.createElement("SPAN");                        
	var tn = document.createTextNode("5");                           
	arrowUp.appendChild(tn);                                           
	arrowUp.className = "qsaudit_arrow";                                     
	arrowDown = document.createElement("SPAN");                      
	var tn = document.createTextNode("6");                           
	arrowDown.appendChild(tn);                                         
	arrowDown.className = "qsaudit_arrow";                                   
}                                                                         
function sortTable(tableNode, nCol, bDesc) {                              
	var tBody = tableNode.tBodies[0];                                  
	var trs = tBody.childNodes;                                        
	var a = new Array();                                               
	for (var i=0; i<trs.length; i++)                                   
        {                                                                 
		a[i] = trs[i];                                             
	}                                                                  
	a.sort(compareByColumn(nCol,bDesc));                               
	for (var i=0; i<a.length; i++)                                     
        {                                                                 
		tBody.appendChild(a[i]);                                   
	}                                                                  
}                                                                         
function compareByColumn(nCol, bDescending) {                             
	var c = nCol;                                                      
	var d = bDescending;                                               
	function _compare(n1, n2) {                                        
      	    var v;                                                         
      	    var t1 = getInnerText(n1.cells[c]);                            
      	    var t2 = getInnerText(n2.cells[c]);                             
      	    // If the values are numeric, convert them to floats.           
      	    var f1 = parseFloat(t1);                                        
      	    var f2 = parseFloat(t2);                                        
      	    if (!isNaN(f1) && !isNaN(f2)) {                                 
      	        t1 = f1;                                                    
      	        t2 = f2;                                                    
      	    }                                                               
	    if (t1 < t2)                                                    
                v = (d) ? -1 : +1;                                         
            else if (t1 > t2)                                              
		v = (d) ? +1 : -1;                                          
	    else                                                            
		v = 0;                                                      
	    return v;                                                       
	}                                                                   
	return _compare;                                                    
}                                                                          
function sortColumn(e) {                                                   
	var tmp, el, tHeadParent;                                           
	if (ie5)                                                            
		tmp = e.srcElement;                                         
	else if (dom)                                                       
		tmp = e.target;                                             
	tHeadParent = getParent(tmp, "THEAD");                            
	el = getParent(tmp, "TD");                                        
	if (tHeadParent == null)                                            
		return;                                                     
	if (el != null) {                                                   
		var p = el.parentNode;                                      
		var i;                                                      
               if (el._ascending){                                         
                    //reload (reset to unordered)                          
                   document.location.reload();                             
               }         	                                            
               else                                                        
               {                                                           
		    if (el._descending){	                            
			el._ascending = true;                               
                       el._descending = false;                             
		    }                                                       
		    else                                                    
			el._descending = true;                                        
		    if (tHeadParent.qsaudit_arrow != null) {                                  
			if (tHeadParent.qsaudit_arrow.parentNode != el) {                     
				tHeadParent.qsaudit_arrow.parentNode._descending = null;      
			}                                                             
			tHeadParent.qsaudit_arrow.parentNode.removeChild(tHeadParent.qsaudit_arrow);  
		    }                                                                 
		    if (el._descending)                                               
			tHeadParent.qsaudit_arrow = arrowDown.cloneNode(true);                
		    else                                                              
			tHeadParent.qsaudit_arrow = arrowUp.cloneNode(true);                  
		    el.appendChild(tHeadParent.qsaudit_arrow);                                
		    // get the index of the td                                        
		    for (i=0; i<p.childNodes.length; i++) {                           
			if (p.childNodes[i] == el) break;                             
		    }                                                                 
		    var table = getParent(el, "TABLE");                             
		    // can't fail                                                     
		    sortTable(table,i,el._descending);                                
	      }                                                                       
	}                                                                             
}                                                                                    
function getInnerText(el) {                                                          
	if (ie5) return el.innerText;	//Not needed but it is faster                 
	var str = "";                                                               
	for (var i=0; i<el.childNodes.length; i++) {                                  
		switch (el.childNodes.item(i).nodeType) {                             
			case 1: //ELEMENT_NODE                                        
				str += getInnerText(el.childNodes.item(i));           
				break;                                                
			case 3:	//TEXT_NODE                                           
				str += el.childNodes.item(i).nodeValue;               
				break;                                                
		}                                                                     
	}                                                                             
	return str;                                                                   
}                                                                                    
function getParent(el, pTagName) {                                                      
	if (el == null) return null;                                                     
	else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase()) 
		return el;                                                               
	else                                                                             
		return getParent(el.parentNode, pTagName);                               
}
