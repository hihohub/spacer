/**
 * TASKS
 * search this.SPACER.TREE and replace with this.SpacerTree
 */

class SpacerView {
    constructor(spacertree) {
        // parent tree
        this.SpacerTree = spacertree;
        this.SPACER = spacertree.SPACER;
        // WYSIWYG view functions
        this.View = this.SpacerView;
        this.ViewA = this.SpacerViewA;
        this.ViewAlphabetize = this.SpacerViewAlphabetize; // was commented out
        this.ViewCancelFullScreenEdit = this.SpacerViewCancelFullScreenEdit;
        this.ViewChild = this.SpacerViewChild;
        this.ViewClick = this.SpacerViewClick;
        this.ViewClose = this.SpacerViewClose;
        this.ViewCollapse = this.SpacerViewCollapse;
        this.ViewCut = this.SpacerViewCut;
        this.View_Cut = this.SpacerView_Cut;
        this.ViewCopy = this.SpacerViewCopy;
        this.ViewCopysel = this.SpacerViewCopysel;
        this.ViewCopysec = this.SpacerViewCopysec;
        this.ViewDown = this.SpacerViewDown;
        this.ViewExpand = this.SpacerViewExpand;
        this.ViewFindSpanFromLi = this.SpacerViewFindSpanFromLi;
        this.ViewFindLiFromSpan = this.SpacerViewFindLiFromSpan;
        this.ViewFindUlFromSpan = this.SpacerViewFindUlFromSpan;
        this.ViewGetList = this.SpacerViewGetList;
        this.ViewGetList2 = this.SpacerViewGetList2;
        this.ViewInitReplaceResults = this.SpacerViewInitReplaceResults;
        this.ViewIndex = this.SpacerViewIndex;
        this.ViewIndexOfSpan = this.SpacerViewIndexOfSpan;
        this.ViewLeft = this.SpacerViewLeft;
        this.View_Left = this.SpacerView_Left;
        this.ViewLi = this.SpacerViewLi;
        this.ViewListElement = this.SpacerViewListElement;
        this.ViewNext = this.SpacerViewNext;
        this.ViewNumber = this.SpacerViewNumber;
        this.ViewOpenToSpan = this.SpacerViewOpenToSpan;
        this.ViewOverwrite = this.SpacerViewOverwrite;
        this.ViewPaste = this.SpacerViewPaste;
        this.View_Paste = this.SpacerView_Paste;
        this.ViewPrevious = this.SpacerViewPrevious;
        this.ViewRemove = this.SpacerViewRemove;
        this.ViewReplace = this.SpacerViewReplace;
        this.ViewReset = this.SpacerViewReset;
        this.ViewReset2 = this.SpacerViewReset2;
        this.ViewRight = this.SpacerViewRight;
        this.ViewRoot = this.SpacerViewRoot;
        this.ViewSearch = this.SpacerViewSearch;
        this.ViewSearch2 = this.SpacerViewSearch2;
        this.ViewSecright = this.SpacerViewSecright;
        this.ViewSelright = this.SpacerViewSelright;
        this.ViewSibling = this.SpacerViewSibling;
        this.ViewSpan = this.SpacerViewSpan;
        this.ViewSpandex = this.SpacerViewSpandex;
        this.ViewSpanIsRoot = this.SpacerViewSpanIsRoot;
        this.ViewSwap = this.SpacerViewSwap;
        this.ViewTrim = this.SpacerViewTrim;
        this.ViewUl = this.SpacerViewUl;
        this.ViewUp = this.SpacerViewUp;
    }

    /**
     * -----------------------------------------------------------
     * UTILITIES
     * -----------------------------------------------------------
     */

    SpacerViewRoot(){
        return document.getElementById(this.SPACER.TREE.ELEMENT_INNER_WRAPPER).getElementsByTagName('li')[0];
    }

    SpacerViewClick(li){
        if (li){
            var arrow = li.getElementsByTagName('a')[0];
            var ul = li.getElementsByTagName('ul')[0];
            if (ul.style.display == "block"){
                ul.style.display = "none";
                arrow.innerHTML = this.SPACER.TREE.CLOSED_ICON;
            } else if (ul.style.display == "none"){
                ul.style.display = "block";
                arrow.innerHTML = this.SPACER.TREE.OPEN_ICON;
            }
        }
    }

    SpacerViewSpanIsRoot(span){
        var ROOT = false;
        var li = span.parentNode;
        while (li.nodeName.toLowerCase() != "li"){
            li = li.parentNode;
        }
        var ul = li.parentNode;
        while (ul.nodeName.toLowerCase() != "ul"){
            ul = ul.parentNode;
        }
        if (ul.id == this.SPACER.TREE.ELEMENT_INNER_WRAPPER){
            ROOT = true;
        }
        return ROOT;
    }

    SpacerViewClose(){
        this.SPACER.TREE.SELECTED_SPAN = null;
        this.ViewCollapse();
    }

    SpacerViewCancelFullScreenEdit(){
        document.getElementById(this.SPACER.TREE.ELEMENT_OUTER_WRAPPER).innerHTML = this.SPACER.TREE.VIEW;
    }

    SpacerViewTrim(strng){
        var result = strng;var index = 0;for (var count = 0; count < result.length; ++count){var chr = result.charAt(count);if (!chr.match(/\\S/)){++index;continue;} else {break;}}if (index < result.length){result = result.substring(index, result.length);} else {result = '';}for (var count = result.length; count >= 0; --count){var chr = result.charAt(count);if (!chr.match(/\\S/)){continue;} else {if (count < result.length){result = result.substring(0, count + 1);}break;}}return result;
    }

    SpacerViewGetList(){
        var UL = document.getElementById(this.SpacerTree.ELEMENT_INNER_WRAPPER);
        var LI = UL.getElementsByTagName("li")[0];
        var list = LI.getElementsByTagName("ul")[0];
        this.SPACER.TEMP = document.createElement("div");
        this.SPACER.TEMP.innerHTML = "<ul>" + list.innerHTML + "</ul>";
        var ul = this.SPACER.TEMP.getElementsByTagName("ul")[0];
        this.ViewGetList2(ul);//***********************************************************************************
        var result = this.SPACER.TEMP.innerHTML;
        return result;
    }

    SpacerViewGetList2(ul){
        var children = ul.childNodes;
        for (let c in children){
            var child = children[c];
            if (child && child.nodeName && child.nodeName.toLowerCase() == "li"){
                child.className = '';
                child.setAttribute('class','');
                child.removeAttribute('class');
                child.setAttribute('style','');
                child.removeAttribute('style');
                //child.style = ""; // 9.7
                var arrow = child.getElementsByTagName("a")[0];
                var span = child.getElementsByTagName("span")[0];
                ul = child.getElementsByTagName("ul")[0];
                ul.className = '';
                ul.setAttribute('class','');
                ul.removeAttribute('class');
                ul.setAttribute('style','');
                ul.removeAttribute('style');
                //ul.style = ""; // 9.7
                if (arrow && arrow.className && arrow.className == "spacer_arrow"){
                    child.removeChild(arrow);
                }
                if (span && span.className && span.className == "spacer_content"){
                    var txt = span.innerHTML;
                    child.removeChild(span);
                    child.removeChild(ul);
                    child.innerHTML = txt;
                    child.appendChild(ul);
                }
                this.ViewGetList2(ul);
            }
        }
    }

    SpacerViewIndexOfSpan(searchforspan){
        var root = document.getElementById(this.SpacerTree.ELEMENT_INNER_WRAPPER);
        var li = root.getElementsByTagName("li")[0];
        this.SPACER.TEMP = new Array();
        this.ViewSpandex(li,searchforspan,false);
        var result = -1;
        for (var count = 0; count < this.SPACER.TEMP.length; ++count){
            var s = this.SPACER.TEMP[count];
            if (s === searchforspan){
                result = count-1;
                break;
            }
        }
        this.SPACER.TEMP.length = 0;
        this.SPACER.TEMP = null;
        return result;
    }

    SpacerViewSpandex(li,searchforspan,found){
        var span = this.ViewFindSpanFromLi(li);
        var ul = li.getElementsByTagName("ul")[0];
        this.SPACER.TEMP.push(span);
        if (span == searchforspan){
            //found = true;
            //return;
        }
        if (found == false && ul.hasChildNodes()){
            for (let n in ul.childNodes){
                var node = ul.childNodes[n];
                if (node.nodeName && node.nodeName.toLowerCase() == "li"){
                    this.ViewSpandex(node,searchforspan,found);
                }
            }
        }
    }

    SpacerViewOpenToSpan(span){
        var li = span.parentNode;
        var ul = li;
        while(li && ul && ul.id != this.SpacerTree.ELEMENT_INNER_WRAPPER){
            while (li.nodeName.toLowerCase() != "li"){
                li = li.parentNode;//li containing span
            }
            var ul = li.parentNode;
            while (ul.nodeName.toLowerCase() != "ul"){
                ul = ul.parentNode;//ul containing li
            }
            ul.style.display = "block";
            if (ul.id != this.SpacerTree.ELEMENT_INNER_WRAPPER){
                li = ul.parentNode;
                li.getElementsByTagName("a")[0].innerHTML = this.SpacerTree.OPEN_ICON;
            }
        }
    }

    SpacerViewFindSpanFromLi(li){
        var spans = li.getElementsByTagName("span");
        var span;
        for (let s in spans){
            if (spans[s].className == "spacer_content"){
                span = spans[s];
                break;
            }
        }
        return span;
    }

    SpacerViewFindLiFromSpan(span){
        var result = null;
        if (span){
            result = span.parentNode;
            while (result.nodeName.toLowerCase() != "li" && result.className != "spacer_li"){
                result = result.parentNode;
            }
        }
        return result;
    }

    SpacerViewFindUlFromSpan(span){
        var result = null;
        if (span){
            var parent = this.ViewFindLiFromSpan(span);
            if (parent){
                result = parent.getElementsByClassName("spacer_ul")[0];
            }
        }
        return result;
    }

    SpacerViewA(link){
        return "<a class='spacer_arrow' style='text-decoration:none;' onclick='return clicktree(event);' href='javascript:void(0);'>" + link + "</a>";
    }

    SpacerViewSpan(text){
        if(text.search("spacer_content") >= 0){//********************************************************10.0
            return text;
        }
        return "<span class='spacer_content' style='white-space:pre-wrap;padding-left:10px;' onmousedown='return SPACER.TREE.MouseDownSpan(event);' onmouseup = 'return SPACER.TREE.MouseUpSpan(event);' onclick = 'return SPACER.TREE.ClickSpan(event);'>" + text + "</span>";

    }

    SpacerViewUl(display){
        return "<ul class='spacer_ul' style='list-style-type:none;display:" + display + ";'></ul>";
    }

    SpacerViewLi(){
        var li = document.createElement("li");
        li.style.whiteSpace = "nowrap";
        li.className = "spacer_li";
        return li;
    }

    SpacerViewListElement(newnode){
        var li = this.ViewLi();
        var a = this.ViewA(newnode.LINK);
        var span = this.ViewSpan(newnode.TEXT);
        var ul = this.ViewUl(newnode.DISPLAY);
        li.innerHTML = a + span + ul;
        return li;
    }

    SpacerViewOverwrite(newval){
        this.SpacerTree.SELECTED_SPAN.innerHTML = newval;
    }

    SpacerViewSwap(node1,node2,parent){
        var temp1 = document.createElement("li");
        var temp2 = document.createElement("li");
        parent.replaceChild(temp1,node1);
        parent.replaceChild(temp2,node2);
        parent.replaceChild(node2,temp1);
        parent.replaceChild(node1,temp2);
    }

    /**
     * -------------------------------------------------------------------------------------
     * TOOLBAR FUNCTIONS
     * -------------------------------------------------------------------------------------
     */

    SpacerView(action,newval){
        // add child or sibling, or execute command, e.g. 'overwite' 'new val'
        if (arguments.length < 2){
            newval = "";
        }
        var command;
        var type = "" + typeof newval;
        type = type.toLowerCase();
        if (type == "string" || type == "boolean" || type == "number"){
            if (type == "string"){
                newval = newval.split("\\").join("\\\\");
                newval = newval.split("\"").join("\\\"");
            }
            command = "this.View" + action.charAt(0).toUpperCase() + action.substring(1).toLowerCase() + "(\"" + newval + "\");";
            eval(command);
        } else if (type == "object" || type == "spacerbranch"){
            switch(action){
                case "sibling":
                    this.ViewSibling(newval);
                    break;
                case "child":
                    this.ViewChild(newval);
                    break;
                default:
                    break;
            }
        }
        this.SpacerTree.ResetToolbarSelect();
    }

    SpacerViewChild(newnode){
        // add child
        try {
            var source = this.SpacerTree.SELECTED_SPAN;
            var parent = source.parentNode;
            while (parent.nodeName.toLowerCase() != "li") {
                parent = parent.parentNode;
            }
            var grandparent = parent;
            if (parent.getElementsByTagName("ul")) {
                parent = parent.getElementsByTagName("ul")[0];
            } else {
                var temp = document.createElement("ul");
                parent.appendChild(temp);
                parent = temp;
            }
            var li = this.ViewListElement(newnode);
            parent.appendChild(li);
            grandparent.getElementsByTagName("a")[0].innerHTML = this.SpacerTree.OPEN_ICON;
            grandparent.getElementsByTagName("ul")[0].style.display = "block";
        } catch(exc){
            console.log("excpetion " + exc);
        }
    }

    SpacerViewSibling(newnode){
        // add sibling
        try {
            var source = this.SpacerTree.SELECTED_SPAN;
            var parent = source.parentNode;
            while (parent.nodeName.toLowerCase() != "li") {
                parent = parent.parentNode;
            }
            var child = parent;
            while (parent.nodeName.toLowerCase() != "ul") {
                parent = parent.parentNode;
            }
            var li = this.ViewListElement(newnode);
            var children = parent.childNodes.length;
            var index = 0;
            var temp = parent.firstChild;
            while (temp != child) {
                ++index;
                temp = temp.nextSibling;
            }
            if (index == children) {
                parent.appendChild(li);
            } else if (index + 1 <= children) {
                parent.insertBefore(li, child.nextSibling);
            }
        } catch(exc){
            console.log("exception " + exc);
        }
    }

    SpacerViewExpand(span){
        var ul;
        var root = false;
        if (arguments.length < 1 || span == null || span == "undefined"){
            ul = document.getElementById(this.SPACER.TREE.ELEMENT_INNER_WRAPPER);
            root = true;
        } else {
            ul = this.ViewFindUlFromSpan(span);
        }
        if (ul){
            if (root == false){
                ul.style.display = "block";
                var li = this.ViewFindLiFromSpan(span);
                if (li){
                    var arrow = li.getElementsByClassName('spacer_arrow')[0];
                    if (arrow && arrow.firstChild.className != "empty"){
                        arrow.innerHTML = this.SPACER.TREE.OPEN_ICON;
                    }
                }
            }
            var uls = ul.getElementsByClassName('spacer_ul');
            for (var count = 0; count < uls.length; ++count){
                uls[count].style.display = 'block';
            }
            var arrows = ul.getElementsByClassName('spacer_arrow');
            for (var count = 0; count < arrows.length; ++count){
                var arrow = arrows[count];
                if (arrow.firstChild.className != "empty"){
                    arrow.innerHTML = this.SPACER.TREE.OPEN_ICON;
                }
            }
            if (root){
                //SpacerViewClick(SpacerViewRoot());
            }
        }
    }
    SpacerViewCollapse(span){
        var ul;
        var root = false;
        if (arguments.length < 1 || span == null || span == "undefined"){
            ul = document.getElementById(this.SPACER.TREE.ELEMENT_INNER_WRAPPER);
            root = true;
        } else {
            ul = this.ViewFindUlFromSpan(span);
        }
        if (ul){
            if (root == false){
                ul.style.display = "none";
                var li = this.ViewFindLiFromSpan(span);
                if (li){
                    var arrow = li.getElementsByClassName('spacer_arrow')[0];
                    if (arrow && arrow.firstChild.className != "empty"){
                        arrow.innerHTML = this.SPACER.TREE.CLOSED_ICON;
                    }
                }
            }
            var uls = ul.getElementsByClassName('spacer_ul');
            for (var count = 0; count < uls.length; ++count){
                uls[count].style.display = 'none';
            }
            var arrows = ul.getElementsByClassName('spacer_arrow');
            for (var count = 0; count < arrows.length; ++count){
                var arrow = arrows[count];
                if (arrow.firstChild.className != "empty"){
                    arrow.innerHTML = this.SPACER.TREE.CLOSED_ICON;
                }
            }
            if (root){
                this.ViewClick(this.ViewRoot());
            }
        }
    }

    SpacerViewAlphabetize(mode,start,finish){
        if (mode == "numbers"){
            if (typeof(start) != "number" || typeof(finish) != "number"){
                if (this.SPACER.REPRESS_ALERTS == false) { alert("invalid numbers"); }
                return null;
            }
            if (start >= finish){
                if (this.SPACER.REPRESS_ALERTS == false){ alert("start not less than finish"); }
                return null;
            }
            if (start < 0 || finish < 0){
                if (this.SPACER.REPRESS_ALERTS == false){ alert("out of range error");  }
                return null;
            }
            var root = this.ViewRoot();
            var spans = root.getElementsByClassName("spacer_content");
            if (start > spans.length || finish > spans.length){
                if (this.SPACER.REPRESS_ALERTS == false){ alert("out of range error");  }
                return null;
            }
            var startnode = spans[start];
            var finishnode = spans[finish];
            var ul1 = startnode.parentNode;
            while (ul1.nodeName.toLowerCase() != "ul"){
                ul1 = ul1.parentNode;
            }
            var ul2 = finishnode.parentNode;
            while (ul2.nodeName.toLowerCase() != "ul"){
                ul2 = ul2.parentNode;
            }
            if (ul1 != ul2){
                if (this.SPACER.REPRESS_ALERTS == false){ alert("start and finish do not have the same parent"); }
                return null;
            }
            var ul = ul1;
            if (ul.nodeName.toLowerCase() == "ul"){
                for (var interval = start+1; interval <= finish; ++interval){
                    var later = spans[interval];
                    var laterparent = later.parentNode;
                    while (laterparent.nodeName.toLowerCase() != "li"){
                        laterparent = laterparent.parentNode;
                    }
                    var laterparent1 = laterparent;
                    while (laterparent.nodeName.toLowerCase() != "ul"){
                        laterparent = laterparent.parentNode;
                    }
                    var laterparent2 = laterparent;
                    for (var count = start; count <= interval; ++count){
                        var earlier = spans[count];
                        var earlierparent = earlier.parentNode;
                        while (earlierparent.nodeName.toLowerCase() != "li"){
                            earlierparent = earlierparent.parentNode;
                        }
                        var earlierparent1 = earlierparent;
                        while (earlierparent.nodeName.toLowerCase() != "ul"){
                            earlierparent = earlierparent.parentNode;
                        }
                        var earlierparent2 = earlierparent;
                        if (earlierparent2 == ul && laterparent2 == ul){
                            if (this.SPACER.StripTags(later.innerHTML).toLowerCase() < this.SPACER.StripTags(earlier.innerHTML).toLowerCase()){
                                var temp = earlierparent1.innerHTML;
                                earlierparent1.innerHTML = laterparent1.innerHTML;
                                laterparent1.innerHTML = temp;
                            }
                        }
                    }
                }
            }
        } else if (mode == "strings"){
            var root = this.ViewRoot();
            var spans = root.getElementsByClassName("spacer_content");
            var startline = -1;
            var finishline = -1;
            for (var count = 0; count < spans.length; ++count){
                var span = spans[count];
                var text = this.SPACER.StripTags(span.innerHTML);
                if (text == start){
                    startline = count;
                } else if (text == finish){
                    finishline = count;
                }
                if (startline >= 0 && finishline >= 0){
                    break;
                }
            }
            this.ViewAlphabetize("numbers",startline,finishline);
        }
    }

    SpacerViewSearch(searchterm,case_sensitive,exact_matches,regular_expression,dont_change_view){
        if (arguments.length < 1 || searchterm == null || searchterm == "undefined" || searchterm == ""){
            searchterm = document.getElementById(this.SPACER.TREE.TOOLBAR_SEARCHBOX_NAME).value;
        }
        if (arguments.length < 2 || case_sensitive != true){
            case_sensitive = false;
        }
        if (arguments.length < 3 || exact_matches != true){
            exact_matches = false;
        }
        if (arguments.length < 4 || regular_expression != true){
            regular_expression = false;
        }
        if (arguments.length < 5 || dont_change_view != true){
            dont_change_view = false;
        }
        if (searchterm == ''){return;}
        var tree = document.getElementById(this.SPACER.TREE.ELEMENT_INNER_WRAPPER);
        if (dont_change_view == false){
            this.ViewCollapse();
            this.ViewReset2(tree);
        }
        this.SPACER.TEMP = 0;
        this.ViewSearch2(searchterm, tree, case_sensitive, exact_matches, regular_expression, dont_change_view);
        if (this.SPACER.REPRESS_ALERTS==false && dont_change_view == false){
            if (this.SPACER.TEMP == 0){
                alert('No results.');
            } else {
                alert('Found ' + this.SPACER.TEMP + ' occurrences.');
            }
        }
    }

    SpacerViewSearch2(searchterm, ul, case_sensitive, exact_matches, regular_expression, dont_change_view){
        try{
            this.SPACER.TREE.CURRENT_SEARCH_INDEX = -1;
            this.SPACER.TREE.SEARCH_RESULTS.length = 0;
            var chldrn = ul.getElementsByClassName('spacer_content');
            for (var count = 0; count < chldrn.length; ++count){
                var span = chldrn[count];
                var ROOT = false;
                if (this.ViewSpanIsRoot(span)){
                    ROOT = true;
                }
                var txt = span.innerHTML;
                var MATCHES = false;
                if (ROOT == false){
                    var puretext = this.SPACER.StripTags(txt);
                    if (case_sensitive == false && regular_expression == false){
                        puretext = puretext.toLowerCase();
                        searchterm = searchterm.toLowerCase();
                    }
                    if (regular_expression == true){
                        try{
                            var pattern = searchterm;
                            if (eval("puretext.match(" + pattern + ")")){
                                MATCHES = true;
                            }
                        }catch(exc){}
                    } else if (exact_matches == true){
                        try{
                            if(eval("puretext.match(/\\b" + searchterm + "\\b/)")){
                                MATCHES = true;
                            }
                        }catch(exc){}
                    } else if (puretext.indexOf(searchterm) >= 0){
                        MATCHES = true;
                    }
                }
                var div = document.createElement('div');
                div.innerHTML = txt;
                if (ROOT == false && MATCHES){
                    ++this.SPACER.TEMP;
                    if (dont_change_view == false){
                        var TEXT = "<span class='search_result' style='background-color:" + this.SPACER.TREE.HIGHLIGHT_BACKGROUND_COLOR + ";color:" + this.SPACER.TREE.HIGHLIGHT_TEXT_COLOR + ";border:1px solid " + this.SPACER.TREE.HIGHLIGHT_BACKGROUND_COLOR + ";'>" + txt + "</span>";
                        span.innerHTML = TEXT;
                    }
                    this.SPACER.TREE.SEARCH_RESULTS.push(span);
                    if (dont_change_view == false){
                        var node = span.parentNode;
                        while (node.nodeName.toLowerCase() != 'div'){
                            if (node.nodeName.toLowerCase() == 'ul'){
                                node.style.display = 'block';
                            } else if (node.nodeName.toLowerCase() == 'li' && node != span.parentNode && node.getElementsByTagName('ul').length > 0 && node.getElementsByTagName('ul')[0].getElementsByTagName('li').length > 0){
                                node.getElementsByTagName('a')[0].innerHTML = this.SPACER.TREE.OPEN_ICON;
                            }
                            if (node.parentNode){
                                node = node.parentNode;
                            }else{
                                break;
                            }
                        }
                    }
                }
            }
            if (dont_change_view == false){
                this.ViewNext();
            }
        }catch(exc){
            if(this.SPACER.REPRESS_ALERTS==false){
                alert(exc);
            }
        }
    }

    SpacerViewNext(){
        if (this.SPACER.TREE.CURRENT_SEARCH_INDEX < this.SPACER.TREE.SEARCH_RESULTS.length - 1){
            ++this.SPACER.TREE.CURRENT_SEARCH_INDEX;
        }
        if (this.SPACER.TREE.CURRENT_SEARCH_INDEX < this.SPACER.TREE.SEARCH_RESULTS.length){
            var span = this.SPACER.TREE.SEARCH_RESULTS[this.SPACER.TREE.CURRENT_SEARCH_INDEX];
            if (span){
                this.SPACER.TREE.ViewOpenToSpan(span);
                this.SPACER.TREE.ScrollToSpan(span);
            }
        }
    }

    SpacerViewPrevious(){
        if (this.SPACER.TREE.CURRENT_SEARCH_INDEX > 0){
            --this.SPACER.TREE.CURRENT_SEARCH_INDEX;
        }
        if (this.SPACER.TREE.CURRENT_SEARCH_INDEX >= 0){
            var span = this.SPACER.TREE.SEARCH_RESULTS[this.SPACER.TREE.CURRENT_SEARCH_INDEX];
            this.SPACER.TREE.ViewOpenToSpan(span);
            this.SPACER.TREE.ScrollToSpan(span);
        }
    }

    SpacerViewReplace(searchterm,replace_with,case_sensitive,exact_matches){
        document.getElementById(this.SPACER.TREE.TOOLBAR_REPLACE_NAME).value = "";
        document.getElementById(this.SPACER.TREE.TOOLBAR_REPLACE_WITH_NAME).value = "";
        this.ViewSearch(searchterm,case_sensitive,exact_matches,false,true);
        if (this.SPACER.TREE.REPLACE_RESULT_MESSAGE == true){
            if (this.SPACER.TREE.SEARCH_RESULTS.length > 0){
                if (this.SPACER.REPRESS_ALERTS == false) { alert('Your search returned: ' + this.SPACER.TREE.SEARCH_RESULTS.length + ' results. You might have to scroll to view them.'); }
            } else {
                if (this.SPACER.REPRESS_ALERTS == false) { alert('No results.'); }
            }
        }
        var amount = this.SPACER.TREE.SEARCH_RESULTS.length;
        if (this.SPACER.TREE.SEARCH_RESULTS != null && this.SPACER.TREE.SEARCH_RESULTS.length > 0){
            this.ViewClose();
            for (var count = 0; count < this.SPACER.TREE.SEARCH_RESULTS.length; ++count){
                var locate = this.SPACER.TREE.SEARCH_RESULTS[count]; // span
                if (locate != null){
                    var replace_result = "<span class=\"replace_result\" style=\"background-color:" + this.SPACER.TREE.HIGHLIGHT_BACKGROUND_COLOR + ";color:" + this.SPACER.TREE.HIGHLIGHT_TEXT_COLOR + ";\">" + searchterm + "</span>";
                    // apparently, the string could already have the replace result in it, if it was a line with multiple search results
                    var temp = "*****temp*****";
                    if (temp.indexOf(searchterm) >= 0){
                        var reverse_search_term = searchterm.split("").reverse().join("");
                        if (searchterm != reverse_search_term){
                            temp = temp.split(searchterm).join(reverse_search_term);
                        } else {
                            var reverse_temp = temp.split("").reverse().join("");
                            if (reverse_temp.indexOf(searchterm) < 0){
                                temp = reverse_temp;
                            } else {
                                var alphanumeric = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                                var morph = "";
                                for (var ch = 0; ch < searchterm.length; ++ch){
                                    var char = searchterm.charAt(ch);
                                    var index = alphanumeric.indexOf(char);
                                    if (index >= 0){
                                        if (index + 1 < alphanumeric.length){
                                            ++index;
                                        } else {
                                            --index;
                                        }
                                        morph = morph + alphanumeric.charAt(index);
                                    } else {
                                        morph += Math.floor(Math.random() * 10);
                                    }
                                }
                                temp = temp.split(searchterm).join(morph);
                            }
                        }
                    }
                    var goodindices = new Array();
                    var badindices = new Array();
                    var unstripped = "";
                    unstripped = locate.innerHTML.split(replace_result).join(temp);
                    var stripped = this.SPACER.StripTags(unstripped);
                    var nextindex = unstripped.indexOf(searchterm, 0);//does not check exact matches
                    while (nextindex >= 0){
                        var indexfound = nextindex;
                        badindices.push(indexfound);
                        if (indexfound + 1 < unstripped.length){
                            nextindex = unstripped.indexOf(searchterm, indexfound + 1);
                        } else {
                            break;
                        }
                    }
                    var result = "";
                    var pause = false;
                    var line = unstripped;
                    for (var ch = 0; ch < line.length; ++ch){
                        var c = line.charAt(ch);
                        if (pause == false && c != '<' && c != '>'){ // not within tag
                            if (badindices.indexOf(ch) >= 0){
                                if (exact_matches){
                                    if (ch==0 || ch>0 && line.charAt(ch-1).match(/[^a-zA-Z0-9]/)){
                                        if (ch+searchterm.length<line.length && line.charAt(ch+searchterm.length).match(/[^a-zA-Z0-9]/)){
                                            goodindices.push(ch);
                                        } else if (ch+searchterm.length==line.length){
                                            goodindices.push(ch);
                                        }
                                    }
                                } else {
                                    goodindices.push(ch);
                                }
                            }
                        } else if (c == '<'){ // tag start
                            pause = true;
                        } else if (c == '>'){ // tag stop
                            pause = false;
                        }
                    }
                    var difference = 0;
                    for (let g in goodindices){
                        var index = goodindices[g] + difference;
                        var firsthalf = line.substring(0, index);
                        var secondhalf = line.substring(index);
                        secondhalf = secondhalf.replace(searchterm, temp); // changes line, adding temp or replace_result
                        var newline = firsthalf + secondhalf; // changes indices...also, replace_result or temp might contain searchterm (if so, temp was already changed after declaration)
                        difference += newline.length - line.length; // cumulative
                        line = newline;
                    }
                    locate.innerHTML = line.split(temp).join(replace_result);
                    var node = locate.parentNode;
                    while (node.nodeName.toLowerCase() != 'div'){
                        if (node.nodeName.toLowerCase() == 'ul'){
                            node.style.display = 'block';
                        } else if (node.nodeName.toLowerCase() == 'li' && node != locate.parentNode && node.getElementsByTagName('ul').length > 0 && node.getElementsByTagName('ul')[0].getElementsByTagName('li').length > 0){
                            node.getElementsByTagName('a')[0].innerHTML = this.SPACER.TREE.OPEN_ICON;
                        }
                        if (node.parentNode){
                            node = node.parentNode;
                        }else{
                            break;
                        }
                    }
                }
            }
        }
    }

    SpacerViewInitReplaceResults(){
        this.SPACER.TREE.REPLACE_RESULTS.length = 0;
        this.SPACER.TREE.CURRENT_REPLACE_INDEX = -1;
        var spans = document.getElementById(this.SPACER.TREE.ELEMENT_OUTER_WRAPPER).getElementsByClassName("replace_result");
        for (var count = 0; count < spans.length; ++count){
            var span = spans[count];
            //if (span.className && span.className == "replace_result"){
            this.SPACER.TREE.REPLACE_RESULTS.push(span);
            //}
        }
        if (this.SPACER.TREE.REPLACE_RESULTS.length > 0){
            document.getElementById(this.SPACER.TREE.ELEMENT_INNER_WRAPPER).scrollTop = 0;
            this.SPACER.TREE.CURRENT_REPLACE_INDEX = 0;
            var span = this.SPACER.TREE.REPLACE_RESULTS[0];
            var y = this.SPACER.TREE.GetScrollForSearch(span);
            document.getElementById(this.SPACER.TREE.ELEMENT_INNER_WRAPPER).scrollTop = y;
        }
    }

    SpacerViewNumber(tree){
        //if (SpacerViewNumber.arguments.length < 1 || tree == null || tree == "undefined"){
        //tree = SPACER.TREE;
        //}
        var root = this.ViewRoot();
        var spans = root.getElementsByClassName('spacer_content');
        for (var count = 0; count < spans.length; ++count){
            if (count == 0){
                continue;
            }
            var span = spans[count];
            var txt = span.innerHTML;
            var number = "<span class='linenumber'>" + count + ".&nbsp;</span>";
            spans[count].innerHTML = number + txt;
        }
    }

    SpacerViewIndex(start,stop){
        if (arguments.length != 2)
            return;
        try{
            start = parseInt(start);
            stop = parseInt(stop);
        } catch(exc){
            return;
        }
        if (start >= stop)
            return;
        var root = this.ViewRoot();
        var spans = root.getElementsByClassName('spacer_content');
        var parent;
        var index = 1;
        var exit = false;
        for (var count = 0; count < spans.length; ++count){
            if (count == 0){
                continue;
            } else if (count == start){
                parent = spans[count].parentNode;
                while (parent.nodeName.toLowerCase() != "ul"){
                    parent = parent.parentNode;
                }
            } else if (count == stop){
                exit = true;
            }
            var span = spans[count];
            var p = span.parentNode;
            while (p.nodeName.toLowerCase() != "ul"){
                p = p.parentNode;
            }
            if (p == parent){
                var txt = span.innerHTML;
                var number = "<span class='linenumber'>" + index + ".&nbsp;</span>";
                spans[count].innerHTML = number + txt;
                ++index;
            }
            if (exit)
                break;
        }
    }

    SpacerViewReset(what){
        if (arguments.length < 1){
            what = "*";
        }
        this.SPACER.CloseEditBox();
        if (what == "title"){
            this.SPACER.TREE.Query('CREATE FROM HTML ' + this.SPACER.TREE.PrintHtml(true));
            return;
        }
        var ul = document.getElementById(this.SPACER.TREE.ELEMENT_INNER_WRAPPER);
        if (ul){
            this.ViewReset2(ul,what);
        } else {//?
            //document.getElementById(SPACER.TREE.ELEMENT_OUTER_WRAPPER).innerHTML = SPACER.TREE.VIEW;
        }
        if (what == "*"){
            this.SPACER.TREE.SELECTED_SPAN = null;
            this.ViewCollapse();
        }
    }

    SpacerViewReset2(ul,what){
        if (what == "*"){
            for (let s in this.SPACER.TREE.MOUSE_DRAG_SPANS){
                var span = this.SPACER.TREE.MOUSE_DRAG_SPANS[s];
                this.SpacerTree.UnhighlightSpan(span);
            }
            if (this.SPACER.TREE.SELECTED_SPAN){
                this.SpacerTree.UnhighlightSpan(this.SPACER.TREE.SELECTED_SPAN);
            }
            this.SPACER.TREE.SELECTED_SPAN = null;
        }
        if (what == "*" || what == "linenumbers"){
            while (ul.getElementsByClassName('linenumber').length > 0){
                var linenumbers = ul.getElementsByClassName('linenumber');
                for (var count = 0; count < linenumbers.length; ++count){
                    var linenumber = linenumbers[count];
                    linenumber.parentNode.removeChild(linenumber);
                }
            }
        }
        if (what == "*" || what == "search_results"){
            while (ul.getElementsByClassName('search_result').length > 0){
                var spans = ul.getElementsByClassName('search_result');
                //var spans = ul.getElementsByTagName('span');
                for (var count = 0; count < spans.length; ++count){
                    var span = spans[count];
                    //if (span.className.indexOf('search_result') >= 0){
                    span.parentNode.innerHTML = span.innerHTML;
                    //}
                }
            }
        }
        if (what == "*" || what == "replace_results"){
            ul.innerHTML = ul.innerHTML.split(this.SPACER.SKIP_MESSAGE).join(this.SPACER.TREE.REPLACE);
            while (ul.getElementsByClassName('replace_result').length > 0){
                var spans = ul.getElementsByClassName('replace_result');
                for (var count = 0; count < spans.length; ++count){
                    var span = spans[count];
                    var parent = span.parentNode;
                    while (parent.nodeName.toLowerCase() != 'span' && parent.className != 'spacer_content'){
                        parent = parent.parentNode;
                    }
                    var html = parent.innerHTML;
                    var txt = span.innerHTML;
                    var div = document.createElement('div');
                    div.appendChild(span);
                    var replace_result = div.innerHTML.toString();
                    html = html.replace(replace_result,txt);
                    parent.innerHTML = html;
                }
            }
        }
        this.SPACER.TREE.ResetReplace();
    }

    SpacerViewSelright(){
        this.ViewSecright(false);
    }

    SpacerViewSecright(with_children){
        if (arguments.length < 1 || with_children === ""){
            with_children = true;
        }
        if (this.SpacerTree.MOUSE_DRAG_SPANS.length > 1){
            for (var count = 0; count < this.SpacerTree.MOUSE_DRAG_SPANS.length; ++count){
                var result = this.ViewRight(with_children,this.SpacerTree.MOUSE_DRAG_SPANS[count]);
                if (result == false){
                    break;
                }
            }
        } else if (this.SpacerTree.SELECTED_SPAN){
            this.ViewRight(with_children,this.SpacerTree.SELECTED_SPAN);
        } else if (this.SpacerTree.MOUSE_DRAG_SPANS.length > 0){
            this.ViewRight(with_children,this.SpacerTree.MOUSE_DRAG_SPANS[0]);
        } else {
            alert("error in secright");
        }
    }

    SpacerViewRight(with_children,source){
        var parent = source.parentNode;
        while (parent.nodeName.toLowerCase() != "li"){
            parent = parent.parentNode;
        }
        var child = parent;//outer li of span
        while (parent.nodeName.toLowerCase() != "ul"){
            parent = parent.parentNode;//ul containing li
        }
        if (parent.firstChild == child){
            return false;
        }
        if (with_children == false){
            child.getElementsByTagName("a")[0].innerHTML = this.SpacerTree.EMPTY_ICON;//make children siblings
        }
        var outerarrow = parent;
        for (var count = 0; count < outerarrow.childNodes.length; ++count){//find previous sibling and change its icon to an arrow
            if (count+1 < outerarrow.childNodes.length && outerarrow.childNodes[count+1] == child){
                outerarrow = outerarrow.childNodes[count];
                outerarrow.getElementsByTagName("a")[0].innerHTML = this.SpacerTree.OPEN_ICON;
                outerarrow.getElementsByTagName("ul")[0].style.display = "block";
                break;
            }
        }
        var children = new Array();
        var index = -1;
        var found = false;
        for (let n in parent.childNodes){
            if (parent.childNodes[n].nodeName && parent.childNodes[n].nodeName.toLowerCase() == "li"){
                children.push(parent.childNodes[n]);
                if (found == false){
                    ++index;
                }
                if (parent.childNodes[n] == child){
                    found = true;
                }
            }
            var temp = parent.childNodes[n];
        }
        var numchildren = children.length;
        if (index == 0){
            return;
        } else {
            parent.removeChild(child);
            children[index-1].getElementsByTagName("ul")[0].appendChild(child);
            if (arguments.length > 0 && with_children == false && child.getElementsByTagName("ul")[0].hasChildNodes()){
                var grandchildren = new Array();
                var grandparent = child.getElementsByTagName("ul")[0];
                for (var count = 0; count < grandparent.childNodes.length; ++count){
                    var grandchild = grandparent.childNodes[count];
                    if (grandchild.nodeName && grandchild.nodeName.toLowerCase() == "li"){
                        grandparent.removeChild(grandchild);
                        grandchildren.push(grandchild);
                        --count;
                    }
                }
                for (let n in grandchildren){
                    children[index-1].getElementsByTagName("ul")[0].appendChild(grandchildren[n]);
                }
            }
        }
    }

    SpacerViewLeft(){
        if (this.SpacerTree.MOUSE_DRAG_SPANS.length > 1){
            for (var count = 0; count < this.SpacerTree.MOUSE_DRAG_SPANS.length; ++count){
                this.View_Left(this.SpacerTree.MOUSE_DRAG_SPANS[count]);
            }
        } else if (this.SpacerTree.SELECTED_SPAN){
            this.View_Left(this.SpacerTree.SELECTED_SPAN);
        } else if (this.SpacerTree.MOUSE_DRAG_SPANS.length > 0){
            this.View_Left(this.SpacerTree.MOUSE_DRAG_SPANS[0]);
        }
    }

    SpacerView_Left(source){
        var parent = source.parentNode;
        while (parent.nodeName.toLowerCase() != "li"){
            parent = parent.parentNode;
        }
        var child = parent;//outer li of span
        while (parent.nodeName.toLowerCase() != "ul"){
            parent = parent.parentNode;//outer ul of outer li of span
        }
        var children = new Array();
        var index = -1;
        var found = false;
        for (let n in parent.childNodes){//count parents children and find index of span
            if (parent.childNodes[n].nodeName && parent.childNodes[n].nodeName.toLowerCase() == "li"){
                children.push(parent.childNodes[n]);
                if (found == false){
                    ++index;
                }
                if (parent.childNodes[n] == child){
                    found = true;
                }
            }
        }
        var numchildren = children.length;
        if (parent.id == this.SpacerTree.ELEMENT_INNER_WRAPPER){//can't go left
            return;
        } else {
            if (index < numchildren){//if span has siblings
                for (var count = index+1; count < numchildren; ++count){
                    var c = children[count];
                    parent.removeChild(c);//remove spans lower siblings, make them spans children
                    //--numchildren;
                    child.getElementsByTagName("ul")[0].appendChild(c);
                }
            }
            parent.removeChild(child);//make sibling of parent, not child of parent
            var grandparent = parent.parentNode;//to make sibling of parent, must make child of grandparent
            while (grandparent.nodeName.toLowerCase() != "ul"){
                grandparent = grandparent.parentNode;//ul outside of parent ul
            }
            var grandchild = parent;
            while (grandchild.nodeName.toLowerCase() != "li"){
                grandchild = grandchild.parentNode;//li containing parent ul
            }
            children.length = 0;
            index = -1;
            found = false;
            for (let n in grandparent.childNodes){//count children of grandparent, and find index of parent in grandparent
                if (grandparent.childNodes[n].nodeName && grandparent.childNodes[n].nodeName.toLowerCase() == "li"){
                    children.push(grandparent.childNodes[n]);
                    if (found == false){
                        ++index;
                    }
                    if (grandparent.childNodes[n] == grandchild){
                        found = true;
                    }
                }
            }
            var numchildren = children.length;
            if (index+1 == numchildren){
                grandparent.appendChild(child);
            } else if (index+1 <= numchildren){
                grandparent.insertBefore(child,children[index+1]);
            }

            if (child.getElementsByTagName("ul")[0].hasChildNodes()){
                child.getElementsByTagName("a")[0].innerHTML = this.SpacerTree.OPEN_ICON;
                child.getElementsByTagName("ul")[0].style.display = "block";
            }
            if (parent.hasChildNodes() == false){// || parent.childNodes.length == 1 || parent.firstChild == child){
                var outerarrow = parent.parentNode;
                while (outerarrow.nodeName.toLowerCase() != "li"){
                    outerarrow = outerarrow.parentNode;
                }
                outerarrow = outerarrow.getElementsByTagName("a")[0];
                outerarrow.innerHTML = this.SpacerTree.EMPTY_ICON;
            }

        }
    }

    SpacerViewUp(){
        var source = this.SpacerTree.SELECTED_SPAN;
        var parent = source.parentNode;
        while (parent.nodeName.toLowerCase() != "li"){
            parent = parent.parentNode;
        }
        var child = parent;//outer li of span
        while (parent.nodeName.toLowerCase() != "ul"){
            parent = parent.parentNode;//ul containing li
        }
        var children = new Array();
        var index = -1;
        var found = false;
        for (let n in parent.childNodes){//count parents children and find index of span
            if (parent.childNodes[n].nodeName && parent.childNodes[n].nodeName.toLowerCase() == "li"){
                children.push(parent.childNodes[n]);
                if (found == false){
                    ++index;
                }
                if (parent.childNodes[n] == child){
                    found = true;
                }
            }
        }
        var numchildren = children.length;
        if (index == 0){
            return;
        } else {
            this.ViewSwap(children[index-1],child,parent);
        }
    }

    SpacerViewDown(){
        var source = this.SpacerTree.SELECTED_SPAN;
        var parent = source.parentNode;
        while (parent.nodeName.toLowerCase() != "li"){
            parent = parent.parentNode;
        }
        var child = parent;
        while (parent.nodeName.toLowerCase() != "ul"){
            parent = parent.parentNode;
        }
        var children = new Array();
        var index = -1;
        var found = false;
        for (let n in parent.childNodes){
            if (parent.childNodes[n].nodeName && parent.childNodes[n].nodeName.toLowerCase() == "li"){
                children.push(parent.childNodes[n]);
                if (found == false){
                    ++index;
                }
                if (parent.childNodes[n] == child){
                    found = true;
                }
            }
        }
        var numchildren = children.length;
        if (index+1 == numchildren){
            return;
        } else {
            this.ViewSwap(child,children[index+1],parent);
        }
    }

    SpacerViewCut(){
        this.SPACER.CLIPBOARD.length = 0;
        if (this.SpacerTree.MOUSE_DRAG_SPANS.length > 1){
            for (var count = 0; count < this.SpacerTree.MOUSE_DRAG_SPANS.length; ++count){
                this.View_Cut(this.SpacerTree.MOUSE_DRAG_SPANS[count]);
            }
        } else if (this.SpacerTree.SELECTED_SPAN){
            this.View_Cut(this.SpacerTree.SELECTED_SPAN);
        } else if (this.SpacerTree.MOUSE_DRAG_SPANS.length > 0){
            this.View_Cut(this.SpacerTree.MOUSE_DRAG_SPANS[0]);
        }
    }

    SpacerView_Cut(source){
        var parent = source.parentNode;
        while (parent.nodeName.toLowerCase() != "li"){
            parent = parent.parentNode;
        }
        var child = parent;//li containing span
        while (parent.nodeName.toLowerCase() != "ul"){
            parent = parent.parentNode;//ul containing li
        }
        parent.removeChild(child);
        this.SPACER.CLIPBOARD.push(child);
        if (parent.hasChildNodes() == false){
            var grandparent = parent.parentNode;
            while (grandparent.nodeName.toLowerCase() != "li"){
                grandparent = grandparent.parentNode;
            }
            grandparent.getElementsByTagName("a")[0].innerHTML = this.SpacerTree.EMPTY_ICON;
        }
    }

    SpacerViewCopysec(){
        this.SPACER.CLIPBOARD.length = 0;
        if (this.SpacerTree.MOUSE_DRAG_SPANS.length > 1){
            for (var count = 0; count < this.SpacerTree.MOUSE_DRAG_SPANS.length; ++count){
                this.ViewCopy(this.SpacerTree.MOUSE_DRAG_SPANS[count],true);
            }
        } else if (this.SpacerTree.SELECTED_SPAN){
            this.ViewCopy(this.SpacerTree.SELECTED_SPAN,true);
        } else if (this.SpacerTree.MOUSE_DRAG_SPANS.length > 0){
            this.ViewCopy(this.SpacerTree.MOUSE_DRAG_SPANS[0],true);
        }
    }

    SpacerViewCopysel(){
        this.SPACER.CLIPBOARD.length = 0;
        if (this.SpacerTree.MOUSE_DRAG_SPANS.length > 1){
            for (var count = 0; count < this.SpacerTree.MOUSE_DRAG_SPANS.length; ++count){
                this.ViewCopy(this.SpacerTree.MOUSE_DRAG_SPANS[count],false);
            }
        } else if (this.SpacerTree.SELECTED_SPAN){
            this.ViewCopy(this.SpacerTree.SELECTED_SPAN,false);
        } else if (this.SpacerTree.MOUSE_DRAG_SPANS.length > 0){
            this.ViewCopy(this.SpacerTree.MOUSE_DRAG_SPANS[0],false);
        }
    }

    SpacerViewCopy(source,with_children){
        var parent = source.parentNode;
        while (parent.nodeName.toLowerCase() != "li"){
            parent = parent.parentNode;
        }
        var child = parent;//li containing span
        while (parent.nodeName.toLowerCase() != "ul"){
            parent = parent.parentNode;//ul containing li
        }
        if (arguments.length > 1 && with_children == true){
            var clone = child.cloneNode(true);
            if (with_children == false){
                clone.getElementsByTagName("a")[0].innerHTML = this.SpacerTree.EMPTY_ICON;
            }
            this.SPACER.CLIPBOARD.push(clone);
        } else {
            var clone = child.cloneNode(true);
            if (clone.getElementsByTagName("ul")){
                clone.getElementsByTagName("ul")[0].innerHTML = "";
            }
            if (with_children == false){
                clone.getElementsByTagName("a")[0].innerHTML = this.SpacerTree.EMPTY_ICON;
            }
            this.SPACER.CLIPBOARD.push(clone);
        }
    }

    SpacerViewPaste(){
        if (this.SpacerTree.SELECTED_SPAN && this.SPACER.CLIPBOARD.length > 0){
            var temp = this.SpacerTree.SELECTED_SPAN;
            for (var count = 0; count < this.SPACER.CLIPBOARD.length; ++count){
                this.View_Paste(this.SpacerTree.SELECTED_SPAN,this.SPACER.CLIPBOARD[count]);
                this.SpacerTree.SELECTED_SPAN = this.ViewFindSpanFromLi(this.SPACER.CLIPBOARD[count]);//.getElementsByTagName("span")[0];
            }
            this.SpacerTree.SELECTED_SPAN = temp;
        }
    }

    SpacerView_Paste(source,li){
        var parent = source.parentNode;
        while (parent.nodeName.toLowerCase() != "li"){
            parent = parent.parentNode;
        }
        var child = parent;//li containing selected span
        while (parent.nodeName.toLowerCase() != "ul"){
            parent = parent.parentNode;//ul containing li
        }
        var children = new Array();
        var index = -1;
        var found = false;
        for (let n in parent.childNodes){//count parents children and find index of span
            if (parent.childNodes[n].nodeName && parent.childNodes[n].nodeName.toLowerCase() == "li"){
                children.push(parent.childNodes[n]);
                if (found == false){
                    ++index;
                }
                if (parent.childNodes[n] == child){
                    found = true;
                }
            }
        }
        var numchildren = children.length;
        var spans = li.getElementsByTagName("span");
        var span;
        for (let s in spans){
            if (spans[s].className == "spacer_content"){
                span = spans[s];
                break;
            }
        }
        span.style.backgroundColor = "";
        span.style.color = "";
        if (index+1 == numchildren){
            parent.appendChild(li);
        } else if (index+1 <= numchildren){
            parent.insertBefore(li,children[index+1]);
        }
    }

    SpacerViewRemove(){
        var source = this.SpacerTree.SELECTED_SPAN;
        var parent = source.parentNode;
        while (parent.nodeName.toLowerCase() != "li"){
            parent = parent.parentNode;
        }
        var child = parent;//li containing span
        while (parent.nodeName.toLowerCase() != "ul"){
            parent = parent.parentNode;//ul containing li
        }
        parent.removeChild(child);
        if (parent.hasChildNodes() == false){
            var grandparent = parent.parentNode;
            while (grandparent.nodeName.toLowerCase() != "li"){
                grandparent = grandparent.parentNode;//li containing ul
            }
            grandparent.getElementsByTagName("a")[0].innerHTML = this.SpacerTree.EMPTY_ICON;
        }
    }
} // spacer view
