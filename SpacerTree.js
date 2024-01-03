/**
 * author Derek James Smith
 */

class SpacerTree {
    constructor(outer_wrapper, umbrella_tree) {
        this.SPACER = umbrella_tree;
        // function declarations
        this.AutoInitialize = this.AutoInitialize;
        this.ClickSpan = this.ClickSpan;
        this.ClickTreeText = this.ClickTreeText;
        this.CloseTree = this.CloseTree;
        this.DivHasContentTag = this.DivHasContentTag;
        this.DivHasKeeperNonTextTag = this.DivHasKeeperNonTextTag;
        this.DivHasSelfIndentingTag = this.DivHasSelfIndentingTag;
        this.DoNotWrapOuterElement = this.DoNotWrapOuterElement;
        this.Edit = this.Edit;
        this.EditTreeText = this.EditTreeText;
        this.findPos = this.findPos;
        this.findPos2 = this.findPos2;
        this.GetFile = this.GetFile;
        this.GetHtml = this.GetHtmlParagraphs;
        this.GetHtmlLines = this.GetHtmlLines;
        this.GetHtmlParagraphs = this.GetHtmlParagraphs;
        this.GetLettering = this.GetLettering;
        this.GetList = this.GetList;
        this.GetOuterElement = this.SpacerGetOuterElement;
        this.GetScrollForSearch = this.SpacerGetScrollForSearch;
        this.GetSkipMessage = this.SpacerGetSkipMessage;
        this.GetTextForPrint = this.GetTextForPrint;
        this.GetView = this.GetView;
        this.HighlightSpan = this.HighlightSpan;
        this.HtmlBody = this.HtmlBody;
        this.HtmlLineBreaks = this.HtmlLineBreaks;
        this.InitReplaceResults = this.InitReplaceResults;
        this.InsertClickTreeText = this.SpacerInsertClickTreeText;
        this.InsertEditTreeText = this.InsertEditTreeText;
        this.IsRemovableFormatTag = this.IsRemovableFormatTag;
        this.LoadFromToolbar = this.LoadFromToolbar;
        this.LoadFromTextarea = this.LoadFromTextarea;
        this.LoadFromTextarea2 = this.LoadFromTextarea2;
        this.MouseDownSpan = this.MouseDownSpan;
        this.MouseUpSpan = this.MouseUpSpan;
        this.PrintFile = this.PrintFile;
        this.PrintHtml = this.PrintHtml;
        this.PrintHtmlLines = this.PrintHtmlLines;
        this.PrintList = this.PrintList;
        this.PrintText = this.PrintText;
        this.ProcessTree = this.ProcessTree;
        this.Query = this.Query;
        this.RefreshGUI = this.RefreshGUI;
        // this.RemoveEmptyEndTags = this.SPACER.RemoveEmptyEndTags;
        this.RemoveHtmlComments = this.RemoveHtmlComments;
        // this.RemoveTableWrappers = this.SPACER.RemoveTableWrappers;
        this.Replay = this.Replay;
        this.ResetReplace = this.ResetReplace;
        this.ResetToolbarSelect = this.ResetToolbarSelect;
        this.RestoreView = this.RestoreView;
        this.ScrollToSpan = this.ScrollToSpan;
        this.SetClosedIcon = this.SetClosedIcon;
        this.SetEmptyIcon = this.SetEmptyIcon;
        this.SetOpenIcon = this.SetOpenIcon;
        this.SetTreeHeight = this.SetTreeHeight;
        this.SetToolbar = this.SetToolbar;
        this.SetType = this.SetType;
        this.SetTypeConditionally = this.SetTypeConditionally;
        this.SubmitEdit = this.SubmitEdit;
        this.TagRequiresLineBreak = this.TagRequiresLineBreak;
        this.TreeFromString = this.TreeFromString;
        this.UnhighlightSpan = this.UnhighlightSpan;
        this.UpdateContent = this.UpdateContent;
        this.UpdateHtmlContent = this.UpdateHtmlContent;
        // properties
        // repeats with Spacer properties not allowed
        this.ACCORDION = -1;
        this.ALERTS = new Array();
        this.AUTO_ADJUST = false;
        this.AUTO_TRIM = false;
        this.CLICK_X = 0;
        this.CLICK_Y = 0;
        this.CLOSED_ICON = "<span class='closed'>&rArr;</span>";
        this.CONTENT = "";
        this.CURRENT_SEARCH_INDEX = -1;
        this.CURRENT_REPLACE_INDEX = -1;
        this.ELEMENT_INNER_WRAPPER = this.SPACER.DEFAULT_INNER_WRAPPER;
        if (arguments.length >= 1) {
            this.ELEMENT_INNER_WRAPPER = outer_wrapper + "_inner";
        }
        this.ELEMENT_INNER_WRAPPER_STYLE = "list-style-type:none;display:block;padding-left:0px;margin-top:0px;border:1px solid gray;width:100%;overflow:scroll;-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;";//webkit-touch-callout disables default browser blue drag highlighting
        this.ELEMENT_INNER_WRAPPER_HEIGHT = "500px";
        this.ELEMENT_OUTER_WRAPPER = this.SPACER.DEFAULT_OUTER_WRAPPER;
        if (arguments.length >= 1) {
            this.ELEMENT_OUTER_WRAPPER = outer_wrapper;
        }
        this.ELEMENT_OUTER_WRAPPER_STYLE = "";
        this.EMPTY_ICON = "<span class='empty'>&EmptySmallSquare;</span>";
        this.HAS_ERRORS = false;
        this.HIGHLIGHT_BACKGROUND_COLOR = this.SPACER.DEFAULT_HIGHLIGHT_BACKGROUND_COLOR;
        this.HIGHLIGHT_TEXT_COLOR = this.SPACER.DEFAULT_HIGHLIGHT_TEXT_COLOR;
        this.INDENTATION = 5;
        this.LETTERING = "";
        this.LEVELS = new Array();
        this.MOUSE_DOWN_SPAN;
        this.MOUSE_DRAG_SPANS = new Array();
        this.MOUSE_UP_SPAN;
        this.NAME = this.ELEMENT_OUTER_WRAPPER;
        this.NODES = new Array();
        this.OPEN_ICON = "<span class='open'>&dArr;</span>";
        this.PLAIN_TEXT = false; // deprecated 7.9.7
        this.PRESERVE_WHITE_SPACE = false;
        this.REDO;
        this.REFRESH_GUI = true;
        this.ROOT_NODE = "";
        this.REPLACE = "";
        this.REPLACE_WITH = "";
        this.REPLACE_RESULTS = new Array();
        this.REPLACE_RESULT_MESSAGE = false;
        this.SEARCH_RESULTS = new Array();
        this.SEARCH_RESULT_MESSAGE = false;
        this.SELECTED_SPAN = null;
        this.SETTABLE_PROPS = ["ACCORDION", "CLOSED_ICON", "EMPTY_ICON", "HIGHLIGHT_BACKGROUND_COLOR", "HIGHLIGHT_TEXT_COLOR", "INDENTATION", "LETTERING", "OPEN_ICON", "TITLE", "TOOLBAR_TOOLS", "TYPE"];
        this.TITLE = "TREE";
        this.TOOLBAR = "";
        this.TOOLBAR_NAME = this.SPACER.DEFAULT_TOOLBAR_NAME;
        if (arguments.length >= 1) {
            this.TOOLBAR_NAME = outer_wrapper + "_toolbar";
        }
        this.TOOLBAR_LOWER_BOUND_NAME = this.TOOLBAR_NAME + "_lower_bound";
        this.TOOLBAR_REPLACE_NAME = this.TOOLBAR_NAME + "_replace";
        this.TOOLBAR_REPLACE_WITH_NAME = this.TOOLBAR_NAME + "_replace_with";
        this.TOOLBAR_SEARCHBOX_NAME = this.TOOLBAR_NAME + "_searchbox";
        this.TOOLBAR_SELECT_NAME = this.TOOLBAR_NAME + "_select";
        this.TOOLBAR_STATUS_NAME = this.TOOLBAR_NAME + "_status";
        this.TOOLBAR_UPPER_BOUND_NAME = this.TOOLBAR_NAME + "_upper_bound";
        this.TOOLBAR_QUERYWINDOW_NAME = this.TOOLBAR_NAME + "_querywindow";
        this.TOOLBAR_TOOLS = this.SPACER.DEFAULT_TOOLBAR_TOOLS;
        this.TYPE = "text"; // relates to 7.9.4
        if (document.getElementById(this.ELEMENT_OUTER_WRAPPER) && document.getElementById(this.ELEMENT_OUTER_WRAPPER).getAttribute('type')) {
            this.TYPE = document.getElementById(this.ELEMENT_OUTER_WRAPPER).getAttribute('type');
            if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() != "text" && this.TYPE != "" && (this.TYPE.toLowerCase() == "html" || this.TYPE.toLowerCase() == "tree")) {
                //this.PLAIN_TEXT = false; // 7.9.4
            }
        }
        this.UNDERLINE_ICONS = false;
        this.UNDO;
        this.VIEW = "";
        this.WITH = false;
        // add to umbrella tree
        this.SpacerView = new SpacerView(this);
        this.SPACER.TREES.push(this);
    }

    /**
     * --------------------------------------------------
     * INITIALIZE
     * --------------------------------------------------
     */

    AutoInitialize(TEXT){
        // get attributes from html tree container tag, if any
        var elmnt = document.getElementById(this.ELEMENT_OUTER_WRAPPER);
        if (elmnt.getAttribute('root')){
            // text of tree root
            this.TITLE = elmnt.getAttribute('root');
        }
        if (elmnt.getAttribute('lettering') != null && elmnt.getAttribute('lettering') != "undefined"){
            // font
            this.LETTERING = elmnt.getAttribute('lettering');
        }
        if (elmnt.getAttribute('accordion') != null && elmnt.getAttribute('accordion') != "undefined" && parseInt(elmnt.getAttribute('accordion')) >= 0){
            // reduce all indentation to specified numeric value
            this.ACCORDION = parseInt(elmnt.getAttribute('accordion'));
        }
        if (elmnt.getAttribute('open')){
            // open icon
            this.SetOpenIcon(elmnt.getAttribute('open'));
        }
        if (elmnt.getAttribute('closed')){
            // close icon
            this.SetClosedIcon(elmnt.getAttribute('closed'));
        }
        if (elmnt.getAttribute('leaf')){
            // empty icon
            this.SetEmptyIcon(elmnt.getAttribute('leaf'));
        } else if (elmnt.getAttribute('empty')){
            this.SetEmptyIcon(elmnt.getAttribute('empty'));
        }
        if (elmnt.getAttribute('treeheight')){
            // example: 500px
            var treeheight = elmnt.getAttribute('treeheight');
            try{
                this.SetTreeHeight(treeheight);
            } catch (exc) {}
        }
        var TOOLBAR = "";
        if (elmnt.getAttribute('toolbar')){
            var tools = elmnt.getAttribute('toolbar');
            this.SetToolbar(tools);
        }
        // input type text or html
        var TYPE = "TEXT";
        if (elmnt.getAttribute("type")){
            switch(elmnt.getAttribute("type")){
                case "html":
                    TYPE = "HTML";
                    break;
                case "text":
                    TYPE = "TEXT";
                    break;
                default:
                    break;
            }
        }
        var querystring = "CREATE FROM " + TYPE + " " + TEXT;
        this.Query(querystring);
    }

    TreeFromString(content, title, mode){
        if (arguments.length < 2){
            title = 'TREE';
        } else if (arguments.length < 3){
            mode = "html";
        }
        var EMPTY_FILE;
        if (content == ""){
            EMPTY_FILE = true;
        } else {
            EMPTY_FILE = false;
        }
        var lines = new Array();
        var chars;
        switch(mode){
            case "html":
                if (content.indexOf("\t") >= 0){
                    content = content.split("\t").join(this.SPACER.TAB);
                }
                lines = this.GetHtmlLines(content, lines);
                for (var count = 0; count < lines.length; ++count){
                    lines[count] = lines[count].replace("<br/>", "").replace("<br>", "");
                }
                break;
            case "text":
                if (content.indexOf("\t") >= 0){
                    content = content.split("\t").join(this.SPACER.TAB);
                }
                if (content.indexOf("\r\n") >= 0){
                    lines = content.split("\r\n");
                } else if (content.indexOf("\n") >= 0){
                    lines = content.split("\n");
                } else {
                    lines.push(content);
                }
                if (this.SPACER.StringTrim(lines[0]) == "" && lines.length > 1){//7.9.8 allows newline
                    lines.splice(0, 1);
                }
                if (this.SPACER.StringTrim(lines[0]).indexOf("<!--") == 0 && this.SPACER.StringTrim(lines[lines.length - 1]).indexOf("-->") == this.SPACER.StringTrim(lines[lines.length-1]).length - "-->".length){//7.9.8
                    lines[0] = lines[0].replace("<!--","");//7.9.8
                    if (this.SPACER.StringTrim(lines[0]) == ""){
                        lines.splice(0, 1);
                    }
                    lines[lines.length - 1] = lines[lines.length - 1].replace("-->","");
                    if (this.SPACER.StringTrim(lines[lines.length - 1]) == ""){
                        lines.splice(lines.length - 1, 1);
                    }
                }
                break;
            default:
                if (this.SPACER.REPRESS_ALERTS == false) { alert("error in tree from string"); }
                break;
        }
        var Rawlines = new Array();
        var Masterlist = new Array();
        var Trimmedlines = new Array();
        var Keys = new Array();
        Rawlines.length = 0;
        Masterlist.length = 0;
        Trimmedlines.length = 0;
        Keys.length = 0;
        this.NODES.length = 0;
        for (var count = 0; count < lines.length; ++count){
            if (this.SPACER.StringTrim(lines[count]) != ""){
                Rawlines.push(lines[count]);
            }
        }
        if (Rawlines.length < 1) {
            EMPTY_FILE = true;
        }
        var empty_test = "";
        for (var count = 0; count < Rawlines.length; ++count){
            empty_test += this.SPACER.StringTrim(Rawlines[count]);
        }
        if (empty_test == ""){
            EMPTY_FILE = true;
        }
        chars = new Array();
        for (var count = 0; count < Rawlines.length; ++count){
            var s = Rawlines[count];
            chars.length = 0;
            for (var count2 = 0; count2 < s.length; ++count2){
                chars.push(s[count2]);
            }
            var stringbuilder = "";
            if (chars.length == 0) {
                continue;
            }
            if (this.SPACER.StringTrim(s) == ""){
                continue;
            }
            if (mode == "text"){
                s = s.split("<").join("&lt;").split(">").join("&gt;");
            }
            Masterlist.push(s);
            Trimmedlines.push(this.SPACER.LeftStringTrim(s));
            var key = "";
            var txtstrt = parseInt(s.length) - parseInt(this.SPACER.LeftStringTrim(s).length);
            for (var count2 = 0; count2 < txtstrt; ++count2){
                key += " ";
            }
            Keys.push(key);
        }
        if (EMPTY_FILE == true){
        }
        this.NODES = new Array();
        for (var count = 0; count < Masterlist.length; ++count){
            var m = Masterlist[count];
            if (this.SPACER.StringTrim(m) != ""){
                var node = new SpacerBranch(m, this, this.SPACER);
                this.NODES.push(node);
            }
        }
        this.LEVELS.length = 0;
        var TEMPTREE = new SpacerBranch(title, this, this.SPACER);
        this.ProcessTree(-1, 0, this.NODES, TEMPTREE, Keys, Trimmedlines, EMPTY_FILE);
        this.InsertClickTreeText();
        this.InsertEditTreeText();
        return TEMPTREE;
    }

    GetHtmlLines(content, lines){
        lines.length = 0;
        content = this.HtmlBody(content);
        content = this.RemoveHtmlComments(content);
        lines = this.HtmlLineBreaks(content);
        lines = this.SPACER.RemoveTableWrappers(lines);
        for (var count = 0; count < lines.length; ++count){ // strip leading p or div tags, save blanks in front
            var result = lines[count];
            // check for blanks before first tag
            var startingblanks = "";
            var startingtext = "";
            if (result.substring(0, result.indexOf("<")).length > 0){ // has blanks or letters/numbers before first tag
                if (this.SPACER.StringTrim(result.substring(0, result.indexOf("<"))) == ""){ // just blanks
                    for (var blanks = 0; blanks < result.indexOf("<"); ++blanks){
                        startingblanks += " ";
                    }
                } else { // letters/numbers and possibly blanks
                    startingtext = this.SPACER.StringTrim(result.substring(0, result.indexOf("<")));
                    var numblanks = result.substring(0, result.indexOf("<")).length - this.SPACER.StringTrim(result.substring(0, result.indexOf("<"))).length;
                    for (var blanks = 0; blanks < numblanks; ++blanks){
                        startingblanks += " ";
                    }
                }
            }
            // remove starting <p> or <div> or <h1> etc...
            var trimmed;
            var tagless;
            var trimmed_and_tagless;
            if (this.IsRemovableFormatTag(this.GetOuterElement(result))){
                var end_of_first_tag = result.indexOf(">") + 1;
                var start_of_last_tag = result.lastIndexOf("<");
                if (start_of_last_tag > end_of_first_tag){
                    result = startingblanks + startingtext + result.substring(end_of_first_tag, start_of_last_tag);
                }
                // look for indentation...still might have tag in front
                trimmed = this.SPACER.StringTrim(result); // doesnt remove nested blanks, but does remove trailing end blanks
                tagless = this.SPACER.StripTagsPHPJS(this.SPACER.RemoveTables(result)); // *** not trimmed *** what if line is just a tag, like an image
                trimmed_and_tagless = this.SPACER.StringTrim(tagless); // should be left string trim, might leave nothing
            } else if (this.GetOuterElement(result).toLowerCase() == "table"){
                trimmed = this.SPACER.StringTrim(result);
                tagless = trimmed;
                trimmed_and_tagless = tagless;
            } else {
            }
            var firstcharacter = result.charAt(0);
            var div = document.createElement('div');
            div.innerHTML = lines[count];
            if (trimmed_and_tagless == ""){ // line has just a tag, like img, or just blanks, like <font>   <img/></font>, don't add starting blanks again
                var numblanks = this.SPACER.StripTags(this.SPACER.RightStringTrim(result),true).length;
                var blanks = "";
                for (var counter = 0; counter < numblanks - 1; ++counter){
                    blanks += " ";
                }
                if (numblanks < 1 && this.DivHasKeeperNonTextTag(div) == false){ // empty line, like <p><font>   </font></p>
                    result = "";
                } else if (numblanks > 0 && this.DivHasKeeperNonTextTag(div) == true){
                    result = blanks + result.replace(blanks, "");
                }
            } else if (firstcharacter.match(/\S/) && tagless != trimmed_and_tagless && this.DivHasContentTag(div) == false){ // has indentation after tag, must move blanks before tag for tree **** don't add starting blanks again ****
                try{
                    var firstchar = trimmed_and_tagless.charAt(0);
                    var numblanks = tagless.indexOf(firstchar);
                    var blanks = "";
                    for (var counter = 0; counter < numblanks; ++counter){
                        blanks += " ";
                    }
                    if (this.DivHasSelfIndentingTag(div) == true){
                        result = blanks + lines[count].replace(blanks, "").split('&amp;nbsp;').join(' ').split('&nbsp;').join(' ');
                    } else {
                        result = blanks + result.replace(blanks, "").split('&amp;nbsp;').join(' ').split('&nbsp;').join(' ');
                    }
                } catch(exc){ }
            } else if (this.DivHasSelfIndentingTag(div) == true){
                result = lines[count];
            }
            if (result.indexOf('<li>') >= 0){
                result = result.replace("<li>", "");
                result = result.replace("</li>", "");
            }
            lines[count] = result;
        }
        return lines;
    }

    ProcessTree(thisindex, nextindex, nodelist, TEMPTREE, Keys, Trimmedlines, EMPTY_FILE) {
        if (EMPTY_FILE) {
            return;
        }
        for (var start = thisindex; start < nodelist.length; ++start){
            var thisindex = start;
            var nextindex = start + 1;
            if (Keys.length == nextindex) {
                return;
            }
            ++this.SPACER.COUNTER;
            if (thisindex == -1) { // root node
                TEMPTREE.AddBranch(nodelist[0]);
                this.LEVELS.push(nodelist[0].GetLevel());
            } else if (Keys[nextindex].length == Keys[thisindex].length) { // next line is sibling
                var _parent = nodelist[thisindex].PARENT_NODE;
                _parent.AddBranch(nodelist[nextindex]);
                this.LEVELS.splice(thisindex, 0, nodelist[thisindex].GetLevel()); // or nextindex?
            } else if (Keys[nextindex].length < Keys[thisindex].length) { // next line more shallow, must check for adjustment
                var _parent = null;
                for (var index = thisindex; index >= 0; --index){
                    if (Keys[nextindex].length == Keys[index].length){
                        _parent = nodelist[index].PARENT_NODE;
                        break;
                    } else if (Keys[index].length < Keys[nextindex].length){
                        break;
                    }
                }
                if (_parent != null){
                    _parent.AddBranch(nodelist[nextindex]);
                    this.LEVELS.splice(thisindex, 0, nodelist[thisindex].GetLevel()); // or nextindex?
                } else {
                    var upper_right = null;
                    var upper_left = null;
                    var acceptor = null;
                    for (var count = nextindex - 1; count >= 0; --count){ // traverse backwards from bad node
                        if (nodelist[count].INDENTATION > nodelist[nextindex].INDENTATION){
                            if (upper_right == null){
                                upper_right = nodelist[count];
                            } else if (upper_left == null){
                                if (Math.abs(nodelist[nextindex].INDENTATION - nodelist[count].INDENTATION) < Math.abs(nodelist[nextindex].INDENTATION - upper_right.INDENTATION)){
                                    upper_right = nodelist[count];
                                }
                            } else if (nodelist.indexOf(upper_left) < count){
                                if (Math.abs(nodelist[nextindex].INDENTATION - nodelist[count].INDENTATION) < Math.abs(nodelist[nextindex].INDENTATION - upper_right.INDENTATION)){
                                    upper_right = nodelist[count];
                                }
                            }
                        } else if (nodelist[count].INDENTATION < nodelist[nextindex].INDENTATION && upper_left == null){
                            upper_left = nodelist[count];
                        }
                    }
                    if (upper_right == null && upper_left == null){
                        if (this.SPACER.REPRESS_ALERTS == false) { alert("error in process tree"); }
                    } else if (upper_right == null){
                        acceptor = upper_left;
                    } else if (upper_left == null){
                        acceptor = upper_right;
                    }
                    if (acceptor == null){
                        var difference_to_right = Math.abs(upper_right.INDENTATION - nodelist[nextindex].INDENTATION);
                        var difference_to_left = Math.abs(nodelist[nextindex].INDENTATION - upper_left.INDENTATION);
                        if (difference_to_right < difference_to_left || difference_to_right == difference_to_left){
                            acceptor = upper_right;
                        } else if (difference_to_left < difference_to_right){
                            acceptor = upper_left;
                        }
                    } else {
                    }
                    var key = "";
                    for (var count = 0; count < acceptor.INDENTATION; ++count){
                        key += " ";
                    }
                    Keys[nextindex] = key;
                    nodelist[nextindex].INDENTATION = acceptor.INDENTATION;
                    acceptor.PARENT_NODE.InsertBranch(nodelist[nextindex], acceptor.GetIndex() + 1);
                    var adjustment_alert = "An indentation adjustment was made at line: " + (nextindex + 1);
                    this.ALERTS.push(adjustment_alert);
                    this.HAS_ERRORS = true;
                }
            } else if (Keys[nextindex].length > Keys[thisindex].length) { // next line is child
                nodelist[thisindex].AddBranch(nodelist[nextindex]);
                this.LEVELS.splice(thisindex, 0, nodelist[thisindex].GetLevel()); // or nextindex?
            }
        }
    }

    SpacerInsertClickTreeText(){
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("id", "tree_script");
        var clicktreeText = document.createTextNode(this.ClickTreeText());
        script.appendChild(clicktreeText);
        document.head.appendChild(script);
    }

    ClickTreeText(){
        if (document.getElementById("tree_script")){
            document.head.removeChild(document.getElementById("tree_script"));
        }
        var _OPEN_ = this.OPEN_ICON;
        var ENCODE_OPEN = _OPEN_.split("\"").join("\'").split("\\").join("/");
        _OPEN_ = ENCODE_OPEN;
        var _CLOSED_ = this.CLOSED_ICON;
        var ENCODE_CLOSED = _CLOSED_.split("\"").join("\'").split("\\").join("/");
        _CLOSED_ = ENCODE_CLOSED;
        var _EMPTY_ = this.EMPTY_ICON;
        var clicktree = "function spacer_clicktree(evt){if (!evt){evt = window.event;}var source = evt.target? evt.target : evt.srcElement;if (source.nodeName.toLowerCase() == 'img' && source.className=='closed'){source = source.parentNode;source.innerHTML = \"" + _OPEN_ + "\";} else if (source.nodeName.toLowerCase() == 'img' && source.className=='open'){source = source.parentNode;source.innerHTML = \"" + _CLOSED_ + "\";} else if (source.nodeName.toLowerCase() == 'span' && source.className == 'closed'){source = source.parentNode;source.innerHTML = \"" + _OPEN_ + "\";} else if (source.nodeName.toLowerCase() == 'span' && source.className == 'open'){source = source.parentNode;source.innerHTML = \"" + _CLOSED_ + "\";}if (source.firstChild.nodeName.toLowerCase() == 'img' && source.firstChild.className != 'empty'){chldrn = source.parentNode.getElementsByTagName('ul')[0];if (chldrn.style.display == 'block'){chldrn.style.display = 'none';} else {chldrn.style.display = 'block';}} else if (source.firstChild.nodeName.toLowerCase() == 'span' && source.firstChild.className != 'empty'){chldrn = source.parentNode.getElementsByTagName('ul')[0];if (chldrn.style.display == 'block'){chldrn.style.display = 'none';} else {chldrn.style.display = 'block';}}}";
        return clicktree;
    }

    EditTreeText(){
        if (document.getElementById("edit_tree_script")){
            document.head.removeChild(document.getElementById("edit_tree_script"));
        }
        var submitfromtoolbar = "function spacer_submit_from_toolbar(e){ evt = e || window.event; if (!evt){ evt = window.event; } evt.preventDefault? evt.preventDefault() : evt.returnValue = false; var source = evt.target? evt.target : evt.srcElement; var html = document.getElementById('spacer_editor').value; var mode = document.getElementById('spacer_editbox_button').innerHTML; SPACER.TREE.SubmitEdit(html,mode,SPACER.TREE.SELECTED_SPAN);   }";
        return submitfromtoolbar;
    }

    InsertEditTreeText(){
        if (document.getElementById("edit_tree_script")){
            document.head.removeChild(document.getElementById("edit_tree_script"));
        }
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("id", "edit_tree_script");
        var edittreeText = document.createTextNode(this.EditTreeText());
        script.appendChild(edittreeText);
        document.head.appendChild(script);
    }

    SetToolbar(toolbar_tools){
        toolbar_tools = toolbar_tools.toLowerCase();
        this.TOOLBAR_TOOLS = toolbar_tools;
        var TOOLBAR = "";
        // this = this;
        var trimmed = this.SPACER.StringTrim(toolbar_tools);
        if (trimmed.toUpperCase() == 'WRAP'){
            this.SPACER.TOOLBAR_STYLE = this.SPACER.TOOLBAR_WRAP_STYLE;
            toolbar_tools = this.SPACER.DEFAULT_TOOLBAR_TOOLS;
        } else if (trimmed.toUpperCase() == 'NOWRAP'){
            this.SPACER.TOOLBAR_STYLE = this.SPACER.TOOLBAR_NOWRAP_STYLE;
            toolbar_tools = this.SPACER.DEFAULT_TOOLBAR_TOOLS;
        } else if (trimmed.toUpperCase() == 'DEFAULT'){
            toolbar_tools = this.SPACER.DEFAULT_TOOLBAR_TOOLS;
        }
        if (arguments.length > 0 && trimmed != "" && trimmed != null && trimmed != "undefined"){
            TOOLBAR = "<div align='" + this.SPACER.TOOLBAR_ALIGN + "' id='" + this.TOOLBAR_NAME + "' onmouseover='return SPACER.SetTreeFromName(\"" + this.NAME + "\");' oncontextmenu='return SPACER.RightClick();' style='" + this.SPACER.TOOLBAR_STYLE + "' >";
            var tools = toolbar_tools.split(',');
            tools.push('status');
            for (var count = 0; count < tools.length; ++count){
                var tool = this.SPACER.StringTrim(tools[count]);
                var separator = this.SPACER.TOOLBAR_SEPARATOR;
                switch(tool){
                    case "expand":
                        TOOLBAR += "<button onclick='return SPACER.Expand(event);'>EXPAND</button>";
                        TOOLBAR += separator;
                        break;
                    case "collapse":
                        TOOLBAR += "<button onclick='return SPACER.Collapse(event);'>COLLAPSE</button>";
                        TOOLBAR += separator;
                        break;
                    case "replace":
                        TOOLBAR += "<span style='white-space:nowrap;'><input type='text' size='3' title='search for' id='" + this.TOOLBAR_REPLACE_NAME + "' onkeydown='return SPACER.PreventDefault(event);' onmouseover='return SPACER.AllowBackspace();' onmouseout='return SPACER.DisallowBackspace();' /><input type='text' size='3' title='replace with' id='" + this.TOOLBAR_REPLACE_WITH_NAME + "' onkeydown='return SPACER.PreventDefault(event);' onmouseover='return SPACER.AllowBackspace();' onmouseout='return SPACER.DisallowBackspace();' /><button title='press first to search, then press to replace' onclick='return SPACER.Replace(event);'>REPLACE</button><button onclick='return SPACER.Skip(event);'>SKIP</button></span>";
                        TOOLBAR += separator;
                        break;
                    case "search":
                        TOOLBAR += "<span style='white-space:nowrap;'><input type='text' id='" + this.TOOLBAR_SEARCHBOX_NAME + "' onkeydown='return SPACER.PreventDefault(event);' onmouseover='return SPACER.AllowBackspace();' onmouseout='return SPACER.DisallowBackspace();' /><button onclick='return SPACER.Search(event);'>SEARCH</button></span>";
                        TOOLBAR += separator;
                        break;
                    case "search_horizontal":
                        TOOLBAR += "<span style='white-space:nowrap;'><input type='text' id='" + this.TOOLBAR_SEARCHBOX_NAME + "' onkeydown='return SPACER.PreventDefault(event);' onmouseover='return SPACER.AllowBackspace();' onmouseout='return SPACER.DisallowBackspace();' /><button onclick='return SPACER.Search(event);'>SEARCH</button><input type='checkbox' id='spacer_case'>case&nbsp;</input><input type='checkbox' id='spacer_exact'>exact&nbsp;</input></span>";
                        TOOLBAR += separator;
                        break;
                    case "search_vertical":
                        TOOLBAR += "<span style='white-space:nowrap;'><table style='display:inline;'><tr><td><input type='text' id='" + this.TOOLBAR_SEARCHBOX_NAME + "' onkeydown='return SPACER.PreventDefault(event);' onmouseover='return SPACER.AllowBackspace();' onmouseout='return SPACER.DisallowBackspace();' /></td><td><button onclick='return SPACER.Search(event);'>SEARCH</button></td></tr><tr><td><input type='checkbox' id='spacer_case'>case</input></td><td><input type='checkbox' id='spacer_exact'>exact</input></td></tr></table></span>";
                        TOOLBAR += separator;
                        break;
                    case "next":
                        TOOLBAR += "<button onclick='return SPACER.Next(event);'>NEXT</button>";
                        TOOLBAR += separator;
                        break;
                    case "previous":
                        TOOLBAR += "<button onclick='return SPACER.Previous(event);'>PREVIOUS</button>";
                        TOOLBAR += separator;
                        break;
                    case "alphabetize":
                    case "sort":
                        TOOLBAR += "<span style='white-space:nowrap;'><label>from</label><input type='text' size='2' id='" + this.TOOLBAR_LOWER_BOUND_NAME + "' onkeydown='return SPACER.PreventDefault(event);' onmouseover='return SPACER.AllowBackspace();' onmouseout='return SPACER.DisallowBackspace();' /><label>to</label><input type='text' size='2' id='" + this.TOOLBAR_UPPER_BOUND_NAME + "' onkeydown='return SPACER.PreventDefault(event);' onmouseover='return SPACER.AllowBackspace();' onmouseout='return SPACER.DisallowBackspace();' /><button onclick='return SPACER.Alphabetize(event);'>ALPHABETIZE</button></span>";
                        TOOLBAR += separator;
                        break;
                    case "input":
                    case "query":
                        TOOLBAR += "<span style='white-space:nowrap;'><textarea rows='" + this.SPACER.QUERYWINDOW_ROWS + "' cols='" + this.SPACER.QUERYWINDOW_COLS + "' type='text' id='" + this.TOOLBAR_QUERYWINDOW_NAME + "' onkeydown='return SPACER.PreventDefault(event);' onmouseover='return SPACER.AllowBackspace();' onmouseout='return SPACER.DisallowBackspace();'></textarea><button title='Spacer input commands' onclick='return SPACER.Query(event);' oncontextmenu='return SPACER.QueryDocumentation();'>INPUT</button></span>";
                        TOOLBAR += separator;
                        break;
                    case "number":
                    case "numbers":
                        TOOLBAR += "<button onclick='return SPACER.Number(event);'>NUMBER</button>";
                        TOOLBAR += separator;
                        break;
                    case "reset":
                    case "clear":
                        TOOLBAR += "<button onclick='return SPACER.Reset(event);'>RESET</button>";
                        TOOLBAR += separator;
                        break;
                    case "save":
                    case "savemin":
                    case "save_min":
                        TOOLBAR += "<button onclick='return SPACER.Save(event);'>SAVE</button>";
                        TOOLBAR += separator;
                        break;
                    case "load":
                        TOOLBAR += "<button onclick='return SPACER.LoadFromToolbar(event);'>LOAD</button>";
                        TOOLBAR += separator;
                        break;
                    case "text":
                        TOOLBAR += "<button onclick='return SPACER.PrintText(event);' title='copy and paste to save your text changes'>TEXT</button>";
                        TOOLBAR += separator;
                        break;
                    case "html":
                        TOOLBAR += "<button onclick='return SPACER.PrintHtml(event);' title='copy and paste to save your text changes'>HTML</button>";
                        TOOLBAR += separator;
                        break;
                    case "edit":
                        TOOLBAR += "<select id='" + this.TOOLBAR_SELECT_NAME + "' onchange='return SPACER.ToolbarSelect();'><option selected='selected'>EDIT</option><option value='overwrite'>overwrite</option><option value='child'>child</option><option value='sibling'>sibling</option><option value='up'>move up</option><option value='down'>move down</option><option value='selection right'>selection right</option><option value='section right'>section right</option><option value='left'>move left</option><option value='copy selected'>copy selected</option><option value='copy w/children'>copy w/children</option><option value='cut'>cut</option><option value='paste'>paste</option><option value='remove'>remove</option><option value='undo'>undo</option><option value='redo'>redo</option></select>";
                        TOOLBAR += separator;
                        break;
                    case "status":
                        TOOLBAR += "<span id='" + this.TOOLBAR_STATUS_NAME + "' title='' style='display:none;background-color:white;color:red;font-size:x-large;font-weight:bold;padding:7px;'>!</span>";
                    default:
                        break;
                }
            }
            TOOLBAR += "</div>";
            this.TOOLBAR = TOOLBAR;
        }
    }

    SetOpenIcon(open){
        var div = document.createElement('div');
        div.innerHTML = open;
        var tag = div.firstChild;
        if (tag){
            if (tag.nodeName == "#text"){
                open = "<span>" + open + "</span>";
            }
        } else {
            open = "<span>" + open + "</span>";
        }
        div.innerHTML = open;
        open = div.firstChild;
        open.className = "open";
        this.OPEN_ICON = div.innerHTML.split("\\\"").join("~~~").split("\"").join("'").split("~~~").join("\\\"");
    }

    SetClosedIcon(closed){
        var div = document.createElement('div');
        div.innerHTML = closed;
        var tag = div.firstChild;
        if (tag){
            if (tag.nodeName == "#text"){
                closed = "<span>" + closed + "</span>";
            }
        } else {
            closed = "<span>" + closed + "</span>";
        }
        div.innerHTML = closed;
        closed = div.firstChild;
        closed.className = "closed";
        this.CLOSED_ICON = div.innerHTML.split("\\\"").join("~~~").split("\"").join("'").split("~~~").join("\\\"");
    }

    SetEmptyIcon(empty){
        var div = document.createElement('div');
        div.innerHTML = empty;
        var tag = div.firstChild;
        if (tag){
            if (tag.nodeName == "#text"){
                empty = "<span>" + empty + "</span>";
            }
        } else {
            empty = "<span>" + empty + "</span>";
        }
        div.innerHTML = empty;
        empty = div.firstChild;
        empty.className = "empty";
        this.EMPTY_ICON = div.innerHTML.split("\\\"").join("~~~").split("\"").join("'").split("~~~").join("\\\"");
    }

    SetTreeHeight(treeheight){
        if (typeof treeheight == "number"){
        } else if (typeof treeheight == "string"){
            treeheight = treeheight.split(';').join('').split('px').join('');
            treeheight = parseInt(treeheight);
            if (treeheight <= 0){
                treeheight = 500;
            }
        } else {
            return;
        }
        this.ELEMENT_INNER_WRAPPER_HEIGHT = "" + treeheight + "px";
        if (document.getElementById(this.ELEMENT_INNER_WRAPPER)){
            document.getElementById(this.ELEMENT_INNER_WRAPPER).style.height = this.ELEMENT_INNER_WRAPPER_HEIGHT;
        }
    }

    Replay(returnvalue){
        // handles errors in create query
        if (this.ALERTS.length < 2 && (arguments.length < 1 || returnvalue == false)){
            for (var count = 0; count < this.ALERTS.length; ++count){
                alert(this.ALERTS[count]);
            }
        } else {
            var alerts = "";
            for (var count = 0; count < this.ALERTS.length; ++count){
                alerts += this.ALERTS[count] + "\n";
            }
            if (arguments.length < 1 || returnvalue == false){
                this.SPACER.ShowPopupBox(alerts, 30000, (window.screen.width/3), (window.screen.height/3));
            } else if (returnvalue == true){
                return alerts;
            }
        }
    }

    RefreshGUI(){
        // set inner html of html tree element to view string
        if (this && document.getElementById(this.ELEMENT_OUTER_WRAPPER)){
            if (this.VIEW == "undefined" || this.VIEW == null){
                this.VIEW = this.GetView();
            }
            document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.VIEW;
            this.VIEW = "";
        } else if (document.getElementById(this.SPACER.DEFAULT_OUTER_WRAPPER)){
            document.getElementById(this.SPACER.DEFAULT_OUTER_WRAPPER).innerHTML = this.VIEW;
            this.VIEW = "";
        }
    }

    RestoreView(){
        // set inner html of html tree element to view string
        document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.VIEW;
        this.VIEW = "";
    }

    GetView(click){
        // build view string from present state of the html by traversing from root node
        if (this.ROOT_NODE != null && this.ROOT_NODE != "undefined" && this.ROOT_NODE != ""){
            if (arguments.length == 0 || click == true){
                try{
                    this.CloseTree();
                    this.ROOT_NODE.Click();
                } catch (exc) {  }
            }
            var ul = "<ul onmouseover='return SPACER.SetTreeFromName(\"" + this.NAME + "\");' oncontextmenu='return SPACER.RightClick();' id='" + this.ELEMENT_INNER_WRAPPER + "' style='" + this.ELEMENT_INNER_WRAPPER_STYLE + this.GetLettering() + "height:" + this.ELEMENT_INNER_WRAPPER_HEIGHT + "'>";
            var _ul = "</ul>";
            return this.TOOLBAR + ul + this.ROOT_NODE.Iterate(false) + _ul;
        } else {
            return "";
        }
    }

    /**
     * -----------------------------------------------------------------------
     * QUERIES (create tree, toolbar functions, and other utilities)
     * -----------------------------------------------------------------------
     */

    Query(query_string){
        // this = this;
        this.SPACER.SetInitiator(this);//7.9.8
        var RESULT = '';
        if (this.SPACER.INSERT == true && this.SPACER.StringTrim(query_string.toUpperCase()) != "UNINSERT"){
            this.SubmitEdit(query_string,"sibling",this.SELECTED_SPAN);
            var spanindex = 0;
            var spans = this.ViewRoot().getElementsByClassName('spacer_content');
            for (var count = 0; count < spans.length; ++count){
                if (spans[count] == this.SELECTED_SPAN){
                    spanindex = count;
                    break;
                }
            }
            var span = spans[spanindex+1];
            this.ScrollToSpan(span);
            this.HighlightSpan(span);
            this.SELECTED_SPAN = span;
            document.getElementById(this.TOOLBAR_QUERYWINDOW_NAME).value = '';
            return RESULT;
        }
        var strings = query_string.split(" ");
        for (var count = 0; count < strings.length; ++count){
            if (this.SPACER.StringTrim(strings[count]) == ""){
                strings.splice(count, 1);
                count -= 1;
            }
        }
        var first = "";
        var second = "";
        var third = "";
        var fourth = "";
        var fifth = "";
        var sixth = "";
        if (strings.length > 0){
            first = this.SPACER.StringTrim(strings[0]);
        }
        if (strings.length > 1){
            second = this.SPACER.StringTrim(strings[1]);
        }
        if (strings.length > 2){
            third = this.SPACER.StringTrim(strings[2]);
        }
        if (strings.length > 3){
            fourth = this.SPACER.StringTrim(strings[3]);
        }
        if (strings.length > 4){
            fifth = this.SPACER.StringTrim(strings[4]);
        }
        if (strings.length > 5){
            sixth = this.SPACER.StringTrim(strings[5]);
        }
        switch(first.toUpperCase()){
            case "CREATE":
                this.HAS_ERRORS = false;
                this.ALERTS.length = 0;
                this.SELECTED_SPAN = null;//7.8.7
                if (strings.length < 3 || this.SPACER.StringTrim(strings[1].toUpperCase()) != "FROM" || (this.SPACER.StringTrim(strings[2].toUpperCase()) != "HTML" && this.SPACER.StringTrim(strings[2].toUpperCase()) != "TEXT" && this.SPACER.StringTrim(strings[2].toUpperCase()) != "TREE")){
                    if (this.SPACER.REPRESS_ALERTS == false) { alert("syntax error"); }
                } else {
                    this.AUTO_ADJUST = true;
                    this.AUTO_TRIM = true;
                    if (this == "undefined" || this == null){
                        console.log("error - tree is undefined");
                        // this = this;
                    }
                    var type = this.SPACER.StringTrim(strings[2].toUpperCase());
                    switch(type){
                        case "HTML":
                            if (this.SPACER.PLEASE_WAIT == true && this.SPACER.WAIT_IS_OPEN != true){
                                var wait = this.SPACER.Wait();
                                // var that = this;
                                setTimeout(function(){
                                    //that.PLAIN_TEXT = false;//7.9.7
                                    //that.SetTypeConditionally(type); // 7.9.4
                                    var content = this.SPACER.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("CREATE FROM HTML") + "CREATE FROM HTML".length));
                                    if (content == ''){
                                        return;
                                    } else {
                                        this.CONTENT = content;
                                    }
                                    this.ROOT_NODE = this.TreeFromString(this.CONTENT, this.TITLE, "html");
                                    this.VIEW = this.GetView();
                                    if (this.REFRESH_GUI == true){
                                        this.RefreshGUI();
                                    }
                                    RESULT = this;
                                    this.SPACER.CloseWaitBox(wait);
                                    if (this.HAS_ERRORS == true && document.getElementById(this.TOOLBAR_STATUS_NAME) != null && document.getElementById(this.TOOLBAR_STATUS_NAME) != 'undefined'){ document.getElementById(this.TOOLBAR_STATUS_NAME).style.display='inline';document.getElementById(this.TOOLBAR_STATUS_NAME).title=this.Replay(true); }
                                    if (this.HAS_ERRORS == true && this.SPACER.REPRESS_ALERTS == false){ this.Query("REPLAY"); }
                                }.bind(this), 1);
                            } else {
                                //this.PLAIN_TEXT = false;//7.9.7
                                //this.SetTypeConditionally(type); // 7.9.4
                                var content = this.SPACER.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("CREATE FROM HTML") + "CREATE FROM HTML".length));
                                if (content == ''){
                                    return;
                                } else {
                                    this.CONTENT = content;
                                }
                                this.ROOT_NODE = this.TreeFromString(this.CONTENT, this.TITLE, "html");
                                this.VIEW = this.GetView();
                                if (this.REFRESH_GUI == true){
                                    this.RefreshGUI();
                                }
                                RESULT = this;
                                if (this.HAS_ERRORS == true && document.getElementById(this.TOOLBAR_STATUS_NAME) != null && document.getElementById(this.TOOLBAR_STATUS_NAME) != 'undefined'){ document.getElementById(this.TOOLBAR_STATUS_NAME).style.display='inline';document.getElementById(this.TOOLBAR_STATUS_NAME).title=this.Replay(true); }
                                if (this.HAS_ERRORS == true && this.SPACER.REPRESS_ALERTS == false){ this.Query("REPLAY"); }
                            }
                            break;
                        case "TEXT":
                            if (this.SPACER.PLEASE_WAIT == true && this.SPACER.WAIT_IS_OPEN != true){
                                var wait = this.SPACER.Wait();
                                // var that = this;
                                setTimeout(function(){
                                    //that.PLAIN_TEXT = true;//7.9.7
                                    //that.SetTypeConditionally(type); // 7.9.4
                                    var content = this.SPACER.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("CREATE FROM TEXT") + "CREATE FROM TEXT".length));
                                    if (content == ''){
                                        return;
                                    } else {
                                        this.CONTENT = content;
                                    }
                                    this.ROOT_NODE = this.TreeFromString(this.CONTENT, this.TITLE, "text");
                                    this.VIEW = this.GetView();
                                    if (this.REFRESH_GUI == true){
                                        this.RefreshGUI();
                                    }
                                    RESULT = this;
                                    this.SPACER.CloseWaitBox(wait);
                                    if (this.HAS_ERRORS == true && document.getElementById(this.TOOLBAR_STATUS_NAME) != null && document.getElementById(this.TOOLBAR_STATUS_NAME) != 'undefined'){ document.getElementById(this.TOOLBAR_STATUS_NAME).style.display='inline';document.getElementById(this.TOOLBAR_STATUS_NAME).title=this.Replay(true); }
                                    if (this.HAS_ERRORS == true && this.SPACER.REPRESS_ALERTS == false){ this.Query("REPLAY"); }
                                }.bind(this), 1);
                            } else {
                                //this.PLAIN_TEXT = true;//7.9.7
                                //this.SetTypeConditionally(type); // 7.9.4
                                var content = this.SPACER.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("CREATE FROM TEXT") + "CREATE FROM TEXT".length));
                                if (content == ''){
                                    return;
                                } else {
                                    this.CONTENT = content;
                                }
                                this.ROOT_NODE = this.TreeFromString(this.CONTENT, this.TITLE, "text");
                                this.VIEW = this.GetView();
                                if (this.REFRESH_GUI == true){
                                    this.RefreshGUI();
                                }
                                RESULT = this;
                                if (this.HAS_ERRORS == true && document.getElementById(this.TOOLBAR_STATUS_NAME) != null && document.getElementById(this.TOOLBAR_STATUS_NAME) != 'undefined'){ document.getElementById(this.TOOLBAR_STATUS_NAME).style.display='inline';document.getElementById(this.TOOLBAR_STATUS_NAME).title=this.Replay(true); }
                                if (this.HAS_ERRORS == true && this.SPACER.REPRESS_ALERTS == false){ this.Query("REPLAY"); }
                            }
                            break;
                        default:
                            if (this.SPACER.REPRESS_ALERTS == false) { alert("syntax error"); }
                            break;
                    }
                }
                break;
            case "INSERT":
                this.SPACER.INSERT = true;
                break;
            case "UNINSERT":
                this.SPACER.INSERT = false;
                break;
            case "SELECT":
                try{//do not erase...checks parseInt
                    var what = this.SPACER.StringTrim(query_string.substring("SELECT".length)).toLowerCase();
                    var check = second.toUpperCase();
                    if (check != "LINE" && check != "LINES" && check != "UP" && check != "DOWN"){//allow leave out 'LINE' or 'LINES'
                        third = second;
                        fourth = "";
                        fifth = "";
                        if (third.indexOf("-") >= 0){
                            second = "LINES";
                        } else {
                            second = "LINE";
                        }
                    }
                    var spans = this.ViewRoot().getElementsByClassName('spacer_content');
                    if (second != "" && third != "" && this.SPACER.StringTrim(second.toUpperCase()) == "LINE"){
                        var index = parseInt(this.SPACER.StringTrim(third));// - 1;
                        if (index > 0 && index < spans.length){
                            if (this.SELECTED_SPAN){
                                this.UnhighlightSpan(this.SELECTED_SPAN);
                            }
                            if (this.MOUSE_DRAG_SPANS){
                                for (var count = 0; count < this.MOUSE_DRAG_SPANS.length; ++count){
                                    this.UnhighlightSpan(this.MOUSE_DRAG_SPANS[count]);
                                }
                            }
                            var span = spans[index];
                            this.ViewOpenToSpan(span);
                            this.ScrollToSpan(span);
                            this.HighlightSpan(span);
                            this.SELECTED_SPAN = span;
                        }
                    } else if (second != "" && third != "" && this.SPACER.StringTrim(second.toUpperCase()) == "LINES" && (third.indexOf("-") >= 0 || (fourth != "" && fifth != "" && fourth.toUpperCase() == "TO"))){
                        if (fourth != "" && fifth != "" && fourth.toUpperCase() == "TO"){
                            third = parseInt(third) + "-" + parseInt(fifth);
                        }
                        var indices = third.split("-");
                        var index1 = parseInt(indices[0]);
                        var index2 = parseInt(indices[1]);
                        if (index1 > 0 && index2 > 0 && index2 > index1 && index1 < spans.length && index2 < spans.length){
                            var down = spans[index1];
                            var up = spans[index2];
                            this.MouseDownSpan(null,down);
                            this.MouseUpSpan(null,up);
                            this.ViewOpenToSpan(down);
                            this.ScrollToSpan(down);
                        }
                    } else if (second.toUpperCase() == "DOWN"){
                        var index = 0;
                        for (var count = 0; count < spans.length; ++count){
                            if (spans[count] == this.SELECTED_SPAN){
                                index = count;
                                break;
                            }
                        }
                        if (index+1 < spans.length){
                            this.UnhighlightSpan(this.SELECTED_SPAN);
                            var span = spans[index+1];
                            this.ViewOpenToSpan(span);
                            this.ScrollToSpan(span);
                            this.HighlightSpan(span);
                            this.SELECTED_SPAN = span;
                        }
                    } else if (second.toUpperCase() == "UP"){
                        var index = 0;
                        for (var count = 0; count < spans.length; ++count){
                            if (spans[count] == this.SELECTED_SPAN){
                                index = count;
                                break;
                            }
                        }
                        if (index-1 > 0){
                            this.UnhighlightSpan(this.SELECTED_SPAN);
                            var span = spans[index-1];
                            this.ViewOpenToSpan(span);
                            this.ScrollToSpan(span);
                            this.HighlightSpan(span);
                            this.SELECTED_SPAN = span;
                        }
                    }
                }catch(exc){if(this.SPACER.REPRESS_ALERTS==false){alert(exc);}}
                break;
            case "OVERWRITE":
                var what = this.SPACER.StringTrim(query_string.substring("OVERWRITE".length));
                if (what == ""){
                    this.SPACER.ToolbarSelect("overwrite");
                } else if (this.SELECTED_SPAN){
                    this.SubmitEdit(what,"overwrite",this.SELECTED_SPAN);
                }
                break;
            case "CHI":
            case "CHILD":
                if (first.toUpperCase() == "CHI"){
                    query_string = query_string.replace("CHI","CHILD");
                }
                var what = this.SPACER.StringTrim(query_string.substring("CHILD".length));
                document.getElementById(this.TOOLBAR_QUERYWINDOW_NAME).value = '';
                if (what == ""){
                    this.SPACER.ToolbarSelect("child");
                } else if (this.SELECTED_SPAN){
                    this.SubmitEdit(what,"child",this.SELECTED_SPAN);
                }
                break;
            case "SIB":
            case "SIBLING":
                if (first.toUpperCase() == "SIB"){
                    query_string = query_string.replace("SIB","SIBLING");
                }
                var what = this.SPACER.StringTrim(query_string.substring("SIBLING".length));
                document.getElementById(this.TOOLBAR_QUERYWINDOW_NAME).value = '';
                if (what == ""){
                    this.SPACER.ToolbarSelect("sibling");
                } else if (this.SELECTED_SPAN){
                    this.SubmitEdit(what,"sibling",this.SELECTED_SPAN);
                }
                break;
            case "MOVE":
                var what = this.SPACER.StringTrim(query_string.substring("RIGHT".length)).toLowerCase();
                what = what.toLowerCase();
                if (what == "selection right"){
                    this.SPACER.ToolbarSelect("selection right");
                } else if (what == "right" || what == "section right"){
                    this.SPACER.ToolbarSelect("section right");
                } else if (what == "left" || what == "section left" || what == "selection left"){
                    this.SPACER.ToolbarSelect("left");
                } else if (what == "up" || what == "section up" || what == "selection up"){
                    this.SPACER.ToolbarSelect("up");
                } else if (what == "down" || what == "section down" || what == "selection down"){
                    this.SPACER.ToolbarSelect("down");
                }
                break;
            case "SELECTION":
                var what = this.SPACER.StringTrim(query_string.substring("RIGHT".length)).toLowerCase();
                what = what.toLowerCase();
                if (what == "right"){
                    this.SPACER.ToolbarSelect("selection right");
                } else if (what == "left"){
                    this.SPACER.ToolbarSelect("left");
                } else if (what == "up"){
                    this.SPACER.ToolbarSelect("up");
                } else if (what == "down"){
                    this.SPACER.ToolbarSelect("down");
                }
                break;
            case "SECTION":
                var what = this.SPACER.StringTrim(query_string.substring("RIGHT".length)).toLowerCase();
                what = what.toLowerCase();
                if (what == "right"){
                    this.SPACER.ToolbarSelect("section right");
                } else if (what == "left"){
                    this.SPACER.ToolbarSelect("left");
                } else if (what == "up"){
                    this.SPACER.ToolbarSelect("up");
                } else if (what == "down"){
                    this.SPACER.ToolbarSelect("down");
                }
                break;
            case "RIGHT":
                var what = this.SPACER.StringTrim(query_string.substring("RIGHT".length)).toLowerCase();
                what = what.toLowerCase();
                if (what == "selection" || what == "selected" || what == "line" || what == "lines" || what == "outer" || what == "shallow"){
                    this.SPACER.ToolbarSelect("selection right");
                } else if (what == "" || what == "section" || what == "with children" || what == "w/children" || what == "w/chldrn" || what == "all" || what == "inner" || what == "deep"){
                    this.SPACER.ToolbarSelect("section right");
                }
                break;
            case "LEFT":
                this.SPACER.ToolbarSelect("left");
                break;
            case "UP":
                this.SPACER.ToolbarSelect("up");
                break;
            case "DOWN":
                this.SPACER.ToolbarSelect("down");
                break;
            case "CUT":
                this.SPACER.ToolbarSelect("cut");
                break;
            case "COPY":
                var what = this.SPACER.StringTrim(query_string.substring("COPY".length)).toLowerCase();
                what = what.toLowerCase();
                if (what == "" || what == "selection" || what == "selected" || what == "line" || what == "lines" || what == "outer" || what == "shallow"){
                    this.SPACER.ToolbarSelect("copy selected");
                } else if (what == "section" || what == "with children" || what == "w/children" || what == "w/chldrn" || what == "all" || what == "inner" || what == "deep"){
                    this.SPACER.ToolbarSelect("copy w/children");
                }
                break;
            case "PASTE":
                this.SPACER.ToolbarSelect("paste");
                break;
            case "DELETE":
            case "REMOVE":
                this.SPACER.ToolbarSelect("remove");
                break;
            case "UNDO":
                this.SPACER.ToolbarSelect("undo");
                break;
            case "REDO":
                this.SPACER.ToolbarSelect("redo");
                break;
            case "COUNT":
                var what = this.SPACER.StringTrim(query_string.substring("COUNT".length)).toLowerCase();
                var root = this.SpacerView.ViewRoot();
                var lines = root.getElementsByClassName('spacer_content');
                if (what == "lines"){
                    var result = lines.length-1;
                    if (this.SPACER.REPRESS_ALERTS == false){
                        alert("lines: " + result);
                    }
                    RESULT = result;
                } else if (what == "words"){
                    var result = 0;
                    for (var count = 1; count < lines.length; ++count){
                        var line = lines[count];
                        var text = this.SPACER.StripTags(line.innerHTML);
                        result += text.split(" ").length;
                    }
                    if (this.SPACER.REPRESS_ALERTS == false){
                        alert("words: " + result);
                    }
                    RESULT = result;
                }
                break;
            case "CHANGE": // 7.9.4
                if (second.toUpperCase() == "TYPE"){
                    var query = query_string;
                    if (third.toUpperCase() == "TO" || third == "="){
                        query = query.replace(" TO "," ").replace(" = "," ");
                    }
                    var type = this.SPACER.StringTrim(query.substring("CHANGE TYPE".length)).toLowerCase();
                    if (type == "text" || type == "html"){
                        this.SetType(type);
                        if (this.SPACER.REPRESS_ALERTS == false){
                            alert("TYPE has been set to " + type);
                        }
                    }
                }
                break;
            case "TOOLBAR":
                var tools = this.SPACER.StringTrim(query_string.substring("TOOLBAR".length));
                if (tools != ""){
                    tools = tools.toLowerCase();
                    this.TOOLBAR_TOOLS = tools;
                    this.SetToolbar(tools);
                }
                break;
            case "HEAD":
                var head = this.SPACER.StringTrim(query_string.substring("HEAD".length));
                if (head != ""){
                    if (window.confirm("Set head to " + head + "?")){
                        document.head.innerHTML = head;
                    }
                }
                break;
            case "SET":
                if (strings.length >= 2){ // allows setting to nothing
                    var key = second;
                    var value = this.SPACER.StringTrim(query_string.substring(query_string.indexOf(second) + second.length));
                    if (third == "EQUAL" || third == "EQUALS" || third == "=" || third == "equals" || third == "Equals" || third == "equal" || third == "Equal"){
                        var equals = this.SPACER.StringTrim(third);
                        value = this.SPACER.StringTrim(query_string.substring(query_string.indexOf(equals) + equals.length));
                    } else if (third == "VAR" || third == "VARIABLE" || third == "VAL" || third == "VALUE" || third == "VALUEOF" || third == "VALUE_OF"){
                        var val = this.SPACER.StringTrim(third);
                        value = this.SPACER.StringTrim(query_string.substring(query_string.indexOf(val) + val.length));
                        value = "" + eval(value) + "";
                    }
                    var found = false;
                    var error = false;
                    var error_message = "";
                    for (var k in this.SPACER){
                        if (key == k.toString()){
                            if (this.SPACER.SETTABLE_PROPERTIES.indexOf(k.toString()) >= 0){} else {
                                error = true;
                                error_message = "not allowed to set that property";
                                break;
                            }
                            switch(typeof(this.SPACER[k])){
                                case "string":
                                    if (value == 'default' || value == 'DEFAULT'){
                                        var def = 'DEFAULT_' + key;
                                        for (var j in this.SPACER){
                                            if (def == j.toString()){
                                                this.SPACER[k] = this.SPACER[j];
                                                found = true;
                                            }
                                        }
                                    } else {
                                        this.SPACER[k] = value;
                                        found = true;
                                    }
                                    break;
                                case "number":
                                    if (parseInt(this.SPACER[k]) === this.SPACER[k]){
                                        this.SPACER[k] = parseInt(value);
                                    } else {
                                        this.SPACER[k] = parseFloat(value);
                                    }
                                    found = true;
                                    break;
                                case "boolean":
                                    if (value == 'true'){
                                        this.SPACER[k] = true;
                                    } else if (value == 'false'){
                                        this.SPACER[k] = false;
                                    } else {
                                        error = true;
                                    }
                                    found = true;
                                    break;
                                default:
                                    error = true;
                                    error_message = "cannot set variables of that type";
                                    break;
                            }
                            break;
                        }
                    }
                    if (found == false){
                        for (var k in this){
                            if (key == k.toString()){
                                if (this.SETTABLE_PROPS.indexOf(k.toString()) >= 0){} else {
                                    error = true;
                                    error_message = "not allowed to set that property";
                                    break;
                                }
                                switch(typeof(this[k])){
                                    case "string":
                                        if (value == 'default' || value == 'DEFAULT'){
                                            var def = 'DEFAULT_' + key;
                                            for (var j in this.SPACER){
                                                if (def == j.toString()){
                                                    this[k] = this.SPACER[j];
                                                    found = true;
                                                }
                                            }
                                        } else {
                                            this[k] = value;
                                            found = true;
                                        }
                                        break;
                                    case "number":
                                        if (parseInt(this[k]) === this[k]){
                                            this[k] = parseInt(value);
                                        } else {
                                            this[k] = parseFloat(value);
                                        }
                                        found = true;
                                        break;
                                    case "boolean":
                                        if (value == 'true'){
                                            this[k] = true;
                                        } else if (value == 'false'){
                                            this[k] = false;
                                        } else {
                                            error = true;
                                        }
                                        found = true;
                                        break;
                                    default:
                                        error = true;
                                        error_message = "cannot set variables of that type";
                                        break;
                                }
                                break;
                            }
                        }
                    }
                    if (this.SPACER.REPRESS_ALERTS == false){
                        if (error == true){
                            alert("syntax error" + (error_message == ""? "" : ": " + error_message));
                        } else if (found == true){
                            alert(key + " has been set to " + value);
                        } else if (found == false){
                            alert("variable not found");
                        }
                    }
                }
                break;
            case "GET":
                if (strings.length >= 2){
                    var key = this.SPACER.StringTrim(second.toUpperCase());
                    var value = "?";
                    var found = false;
                    var type = "?";
                    var index = 0;
                    var index2 = 0;
                    for (var k in this.SPACER){
                        if (key == k.toString()){
                            value = this.SPACER[k];
                            type = typeof(this.SPACER[k]);
                            found = true;
                            index = this.SPACER.SETTABLE_PROPERTIES.indexOf(k);
                            index2 = this.SPACER.SETTABLE_PROPERTIES.indexOf(this.SPACER[k]);
                            break;
                        }
                    }
                    if (found == false){
                        for (var k in this){
                            if (key == k.toString()){
                                value = this[k];
                                type = typeof(this[k]);
                                found = true;
                                index = this.SETTABLE_PROPS.indexOf(k);
                                index2 = this.SETTABLE_PROPS.indexOf(this[k]);
                                break;
                            }
                        }
                    }
                    if (this.SPACER.REPRESS_ALERTS == false){
                        if (found){
                            alert(key + " = " + value + " and has type " + type);
                        } else {
                            alert("could not find that variable");
                        }
                    }
                }
                break;
            case "EDIT":
                var extra = this.SPACER.StringTrim(query_string.substring("EDIT".length));
                if (this.TYPE == null || this.TYPE == "undefined" || this.TYPE.toLowerCase() == "text"){
                    this.Edit("html", this.GetList());
                } else if (this.TYPE != null && this.TYPE != "undefined" && (this.TYPE.toLowerCase() == "html" || this.TYPE.toLowerCase() == "tree")){
                    if (extra != null && extra != "undefined" && extra.toUpperCase() == "LIST"){//7.9.8
                        this.Edit("html", this.GetList());
                    } else {
                        this.Edit("html", this.GetList());
                    }
                } else {
                    if (this.SPACER.REPRESS_ALERTS == false){
                        alert("problem determining text or html type");
                    }
                }
                break;
            case "LOAD":
                try{
                    var filename = this.SPACER.StringTrim(query_string.substring("LOAD".length));
                    if (this.SPACER.StringTrim(filename) == ""){
                        this.LoadFromToolbar();
                    } else if (this.SPACER.StringTrim(filename).toUpperCase() == "TEXT"){
                        this.LoadFromTextarea('text');
                    } else if (this.SPACER.StringTrim(filename).toUpperCase() == "HTML" || this.SPACER.StringTrim(filename).toUpperCase() == "LIST"){
                        this.LoadFromTextarea('html');
                    } else if (this.SPACER.StringTrim(filename).toUpperCase() == "TREE" || this.SPACER.StringTrim(filename).toUpperCase() == "FILE") {
                        this.LoadFromTextarea('tree');
                    } else if (filename.substring(filename.length - ".html".length) == ".html" || filename.substring(filename.length - ".txt".length) == ".txt" || filename.substring(filename.length - ".htm".length) == ".htm"){
                        this.SPACER.TEMP = "";
                        this.SPACER.Load(filename);
                        var tree = this.SPACER.TEMP;
                        if (this.SPACER.TEMP == "" || this.SPACER.TEMP == null || this.SPACER.TEMP == "undefined"){
                            if (this.SPACER.REPRESS_ALERTS == false){
                                alert("could not find the file: " + filename);
                            } else {
                                this.ALERTS.push("could not find the file: " + filename);
                                this.HAS_ERRORS = true;
                            }
                            return;
                        }
                        this.SPACER.PLEASE_WAIT = true;
                        if (filename.substring(filename.length - ".tree.html".length) == ".tree.html"){
                            this.Query("CREATE FROM TREE " + tree);
                        } else if (filename.substring(filename.length - ".html".length) == ".html" || filename.substring(filename.length - ".htm".length) == ".htm"){
                            this.Query("CREATE FROM HTML " + tree);
                        } else if (filename.substring(filename.length - ".txt".length) == ".txt"){
                            this.Query("CREATE FROM TEXT " + tree);
                        }
                    } else {
                        alert("Only .html or .txt files accepted.");
                    }
                } catch (exc) {  }
                break;
            case "ALPHABETIZE":
            case "SORT":
                this.SpacerView.ViewReset();
                var newTree = null;
                if (query_string.indexOf("LINE") >= 0 || query_string.indexOf("line") >= 0){
                    if (strings.length >= 5 && this.SPACER.StringTrim(second.toUpperCase()) == "FROM" && this.SPACER.StringTrim(third.toUpperCase()) == "LINE" && this.SPACER.StringTrim(fifth.toUpperCase()) == "TO" && this.SPACER.StringTrim(sixth.toUpperCase()) == "LINE"){
                        strings[2] = "LINE";
                        strings[5] = "LINE";
                        strings[1] = "FROM";
                        strings[4] = "TO";
                        query_string = strings.join(" ");
                        var start = -1;
                        var finish = -1;
                        try {
                            var exc = "";
                            start = parseInt(strings[3]);
                            finish = parseInt(strings[6]);
                        } catch (exc) {
                            if (this.SPACER.REPRESS_ALERTS == false) { alert(exc); }
                            return;
                        }
                        this.SpacerView.ViewAlphabetize("numbers",start,finish);
                    } else {
                        if (this.SPACER.REPRESS_ALERTS == false) { alert("syntax error"); }
                    }
                } else if (strings.length >= 4 && strings[1].toUpperCase() == "FROM" && query_string.indexOf("TO")){
                    strings[1] = "FROM";
                    query_string = strings.join(" ");
                    query_string = query_string.split(" to ").join(" TO ").split(" To ").join(" TO ");
                    var startstring = "";
                    var finishstring = "";
                    startstring = this.SPACER.StringTrim(query_string.split(" FROM ")[1].split(" TO ")[0]);
                    finishstring = this.SPACER.StringTrim(query_string.split(" TO ")[1]);
                    if (startstring == "" || finishstring == ""){
                        if (POSTERTRO.REPRESS_ALERTS == false) { alert("error in alphabetize"); }
                    } else {
                        this.SpacerView.ViewAlphabetize("strings",startstring,finishstring);
                    }
                }
                break;
            case "CLEAR":
            case "RESET":
                var what = "";
                if (strings.length > 1){
                    switch(this.SPACER.StringTrim(strings[1].toUpperCase())){
                        case "ALL":
                        case "*":
                            what = "*";
                            break;
                        case "NUMBERS":
                        case "LINENUMBERS":
                        case "LINE_NUMBERS":
                            what = "linenumbers";
                            break;
                        case "HIGHLIGHTS":
                        case "SEARCH_RESULTS":
                            what = "search_results";
                            break;
                        case "TITLE":
                            what = "title";
                            break;
                        case "REPLACE_RESULTS":
                            what = "replace_results";
                            break;
                        default:
                            break;
                    }
                }
                if (what != ""){
                    this.SpacerView.ViewReset(what);
                } else {
                    this.SpacerView.ViewReset();
                }
                this.SELECTED_SPAN = null;//7.8.6
                break;
            case "CLOSE":
            case "COLLAPSE":
                this.SpacerView.ViewCollapse(this.SELECTED_SPAN);
                break;
            case "OPEN":
            case "EXPAND":
                this.SpacerView.ViewExpand(this.SELECTED_SPAN);
                break;
            case "NEW":
                if (window.confirm("Erase current document and start over?")){
                    if (this.TYPE == null || this.TYPE == "undefined" || this.TYPE.toLowerCase() == "text"){
                        this.Query("CREATE FROM TEXT click here to start");
                    } else if (this.TYPE != null && this.TYPE != "undefined" && (this.TYPE.toLowerCase() == "html" || this.TYPE.toLowerCase() == "tree")){
                        this.Query("CREATE FROM HTML <p>click here to start</p>");
                    } else {
                        if (this.SPACER.REPRESS_ALERTS == false){
                            alert("problem determining text or html type");
                        }
                    }
                }
                break;
            case "NUMBER":
                if (strings.length >= 6 && strings[1].toUpperCase() == "NESTED" && strings[2].toUpperCase() == "FROM" && strings[4].toUpperCase() == "TO"){
                    this.SpacerView.ViewIndex(strings[3],strings[5]);
                } else {
                    this.SpacerView.ViewNumber(this);
                }
                break;
            case "INDEX":
                if (strings.length >= 5 && strings[1].toUpperCase() == "FROM" && strings[3].toUpperCase() == "TO"){
                    this.SpacerView.ViewIndex(strings[2],strings[4]);
                }
                break;
            case "SAVE":
            case "PRINT":
                var what = "";
                if (strings.length > 1){
                    switch(this.SPACER.StringTrim(strings[1].toUpperCase())){
                        case "TEXT":
                            what = "text";
                            break;
                        case "HTML":
                            what = "html";
                            break;
                        case "LIST":
                            what = "list";
                            break;
                        case "LINES":
                            what = "lines";
                            break;
                        case "FILE":
                            what = "file";
                            break;
                        default:
                            break;
                    }
                }
                this.Query("RESET");
                if (what == "text"){
                    this.PrintText();
                } else if (what == "html"){
                    this.PrintHtml();
                } else if (what == "list"){
                    this.PrintList();
                } else if (what == "lines"){
                    this.PrintHtmlLines();
                } else if (what == "file"){
                    this.PrintFile();
                } else {
                    this.PrintList();
                }
                break;
            case "REPLAY":
                this.Replay();
                break;
            case "SKIP":
                this.SPACER.SKIPPED = true;
                if (this.REPLACE_RESULTS.length > 0 && this.CURRENT_REPLACE_INDEX >= 0 && this.REPLACE != "" && this.REPLACE_WITH != ""){
                    var msg = this.GetSkipMessage();
                    if (msg == ""){
                        return;
                    }
                    var search_result = this.REPLACE_RESULTS[this.CURRENT_REPLACE_INDEX];
                    var outerspan = search_result;//7.9.8
                    while (outerspan.className != "spacer_content"){
                        outerspan = outerspan.parentNode;
                    }
                    var txt = search_result.innerHTML;
                    if (txt.indexOf(this.REPLACE) >= 0){
                        var txtnode = document.createTextNode(this.SPACER.SKIP_MESSAGE);//7.9.8
                        var pN = search_result.parentNode;
                        pN.replaceChild(txtnode,search_result);
                        if (this.CURRENT_REPLACE_INDEX + 1 < this.REPLACE_RESULTS.length){
                            this.Query('WITH ' + this.REPLACE_WITH);
                            this.Query('REPLACE ' + this.REPLACE);
                            if (this.SPACER.GetBrowser() == "IE" && this.CURRENT_REPLACE_INDEX + 1 == this.REPLACE_RESULTS.length){
                                this.Query('RESET *');
                                this.ResetReplace();
                            }
                        } else {
                            this.Query('RESET *');
                            this.ResetReplace();
                        }
                    }
                }
                break;
            case "WITH":
                this.REPLACE_RESULTS.length = 0;
                this.CURRENT_REPLACE_INDEX = -1;
                var replace_with = this.SPACER.StringTrim(query_string.substring(query_string.toUpperCase().indexOf('WITH') + 'WITH'.length));
                this.REPLACE_WITH = replace_with;
                this.WITH = true;
                break;
            case "REPLACE":
                this.SPACER.SKIPPED = false;
                if (strings.length > 1 && this.WITH == true){
                    this.WITH = false;
                    var searchterm = this.SPACER.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("REPLACE") + "REPLACE".length));
                    if (searchterm == ''){
                        return;
                    }
                    this.REPLACE = searchterm;
                    if (this.REPLACE_WITH.indexOf(this.REPLACE) >= 0){
                        var msg = this.GetSkipMessage();
                        if (msg != ""){
                            this.REPLACE_WITH = this.REPLACE_WITH.split(this.REPLACE).join(msg);
                            this.SKIPPED = true;
                        }
                    }
                    this.SpacerView.ViewReplace(searchterm,this.REPLACE_WITH,true,true);
                    this.SpacerView.ViewInitReplaceResults();
                } else if (strings.length >= 4 && query_string.toUpperCase().indexOf("WITH") >= 0){
                    var searchterm = this.SPACER.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("REPLACE") + "REPLACE".length));
                    var replace_with = this.SPACER.StringTrim(searchterm.substring(searchterm.toUpperCase().indexOf("WITH") + "WITH".length));
                    this.REPLACE_WITH = replace_with;
                    searchterm = this.SPACER.StringTrim(searchterm.substring(0, searchterm.toUpperCase().indexOf("WITH")));
                    if (searchterm == ''){
                        return;
                    }
                    this.REPLACE = searchterm;
                    if (this.REPLACE_WITH.indexOf(this.REPLACE) >= 0){
                        var msg = this.GetSkipMessage();
                        if (msg != ""){
                            this.REPLACE_WITH = this.REPLACE_WITH.split(this.REPLACE).join(msg);
                            this.SKIPPED = true;
                        }
                    }
                    this.SpacerView.ViewReplace(searchterm,replace_with,true,true);
                    this.SpacerView.ViewInitReplaceResults();
                } else if (strings.length >= 2){
                    //
                } else if (strings.length == 1){
                    if (this.REPLACE_RESULTS.length > 0 && this.CURRENT_REPLACE_INDEX >= 0 && this.REPLACE != "" && this.REPLACE_WITH != ""){
                        var search_result = this.REPLACE_RESULTS[this.CURRENT_REPLACE_INDEX];//span containing search term
                        var outerspan = search_result;//7.9.8
                        while (outerspan.className != "spacer_content"){
                            outerspan = outerspan.parentNode;
                        }
                        var txt = search_result.innerHTML;
                        if (txt.indexOf(this.REPLACE) >= 0){
                            var txtnode = document.createTextNode(this.REPLACE_WITH);//7.9.8
                            var pN = search_result.parentNode;
                            pN.replaceChild(txtnode,search_result);
                            if (this.CURRENT_REPLACE_INDEX + 1 < this.REPLACE_RESULTS.length){
                                this.Query('WITH ' + this.REPLACE_WITH);
                                this.Query('REPLACE ' + this.REPLACE);
                                if (this.SPACER.GetBrowser() == "IE" && this.CURRENT_REPLACE_INDEX + 1 == this.REPLACE_RESULTS.length){
                                    this.Query('RESET *');
                                    this.ResetReplace();
                                }
                            } else {
                                this.Query('RESET *');
                                this.ResetReplace();
                            }
                        }
                    }
                }
                break;
            case "SEARCH":
                this.SpacerView.ViewReset();
                if (strings.length >= 3 && second.toUpperCase() == "FOR" && third.toUpperCase() == "PATTERN"){
                    var searchterm = this.SPACER.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("PATTERN") + "PATTERN".length));
                    if (searchterm == ''){
                        return;
                    }
                    this.SpacerView.ViewSearch(searchterm,false,false,true);
                } else if (strings.length >= 2 && second.toUpperCase() == "FOR"){
                    var searchterm = this.SPACER.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                    if (searchterm == ''){
                        return;
                    }
                    this.SpacerView.ViewSearch(searchterm);
                } else if (strings.length >= 3 && second.toUpperCase() == "CASE_SENSITIVE" && third.toUpperCase() == "FOR"){
                    var searchterm = this.SPACER.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                    if (searchterm == ''){
                        return;
                    }
                    this.SpacerView.ViewSearch(searchterm,true);
                } else if (strings.length >= 3 && second.toUpperCase() == "EXACT_MATCHES" && third.toUpperCase() == "FOR"){
                    var searchterm = this.SPACER.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                    if (searchterm == ''){
                        return;
                    }
                    this.SpacerView.ViewSearch(searchterm,false,true);
                } else if (strings.length >= 4 && (second.toUpperCase() == "EXACT_MATCHES" || third.toUpperCase() == "EXACT_MATCHES")
                    && (second.toUpperCase() == "CASE_SENSITIVE" || third.toUpperCase() == "CASE_SENSITIVE")
                    && fourth.toUpperCase() == "FOR"){
                    var searchterm = this.SPACER.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                    if (searchterm == ''){
                        return;
                    }
                    this.SpacerView.ViewSearch(searchterm,true,true);
                } else {
                    if (this.SPACER.REPRESS_ALERTS == false) {  }
                }
                break;
            case "NEXT":
                this.SpacerView.ViewNext();
                break;
            case "PREVIOUS":
                this.SpacerView.ViewPrevious();
                break;
            default:
                if (this.SPACER.REPRESS_ALERTS == false) { alert("syntax error"); }
                break;
        }
        return RESULT;
    } // query

    /**
     * ----------------------------------------------------------------
     * TOOLBAR FUNCTIONS
     * ----------------------------------------------------------------
     */

    Edit(type, text){
        this.LoadFromTextarea(type, text);
    }

    SubmitEdit(html, mode, selectedspan){
        try{

            var TOOLBARTREE = this.SPACER.GetInitiator(); //SPACER.TREE; // .TREE var had problem with popups when multiple trees...couldn't mouse over other tree

            var span = null;
            if (arguments.length == 3){
                span = selectedspan;
                TOOLBARTREE.ResetToolbarSelect();
            } else if (document.getElementById('spacer_editbox')){
                span = document.getElementById('spacer_editbox').span;//source event passed to ShowEditBox
            }
            if (this.SPACER.StringTrim(html) == ""){
                return;
            }

            if (html.indexOf('<table') >= 0){
                html = html.split("<strong>").join("<b>").split("</strong>").join("</b>").split("<em>").join("<i>").split("</em>").join("</i>");
            }
            var PLAINTEXT = false;
            if (document.getElementsByName('spacer_text_or_html')){//if edited with popup, check if pressed text button
                var radios = document.getElementsByName('spacer_text_or_html');
                for (var count = 0; count < radios.length; ++count){
                    var r = radios[count];
                    if (r.checked){
                        if (r.value == 'text'){
                            PLAINTEXT = true;
                        }
                        break;
                    }
                }
            }

            this.SPACER.CloseEditBox();

            if (this.SPACER.GetBrowser() == "IE"){
                if (document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME)){
                    document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME).select();
                }
            }
            if (TOOLBARTREE.TYPE != "text"){
                if (html.indexOf("<p")==0 && html.indexOf("</p>")>=0){
                    var div = document.createElement("div");
                    div.innerHTML = html;
                    html = div.getElementsByTagName("p")[0].innerHTML;
                }//****************************************************
                if (PLAINTEXT == true && (this.REPLACE == null || this.REPLACE == "undefined" || this.REPLACE == "")){
                    html = html.split("&").join("<span class='specialchar'>&</span>").split("<").join("<span class='specialchar'><</span>");
                }
                if (TOOLBARTREE.DoNotWrapOuterElement(html) == false){
                    html = "<p>" + html + "</p>";
                }
                var lines = new Array();
                lines = TOOLBARTREE.GetHtmlLines(html, lines);
                var test = "";
                for (var count = 0; count < lines.length; ++count){
                    lines[count] = lines[count].replace("<br/>", "").replace("<br>", ""); // ???????? deprecated
                }
                html = lines[0];
                if (this.SPACER.StringTrim(html) == ""){
                    return;
                }
            } else if (this.REPLACE == null || this.REPLACE == "undefined" || this.REPLACE == ""){
                html = html.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
            }

            var index = -1;
            var prev = span.previousSibling? span.previousSibling : span.parentNode;
            var parentli = null;
            while (prev != "undefined" && prev != null && prev.id != TOOLBARTREE.ELEMENT_OUTER_WRAPPER){
                if (prev.nodeName.toLowerCase() == "li"){
                    if (parentli == null){
                        parentli = prev;
                    }
                    ++index;
                }
                prev = prev.previousSibling? prev.previousSibling : prev.parentNode;
            }
            var root = prev;
            var lis = root.getElementsByTagName("li");
            for (var count = 0; count < lis.length; ++count){
                var li = lis[count];
                if (li == parentli){
                    index = count;
                    break;
                }
            }

            var newnode = new SpacerBranch(html, TOOLBARTREE, TOOLBARTREE.SPACER);
            var macro_index = index - 1;
            var micro_index = 0;

            if (arguments.length < 2 || mode == "overwrite"){

                TOOLBARTREE.SpacerView.View("overwrite",newnode.TEXT);
            } else if (mode == "sibling") {

                TOOLBARTREE.SpacerView.View("sibling",newnode);
                TOOLBARTREE.UnhighlightSpan(span);
            } else if (mode == "child") {

                TOOLBARTREE.SpacerView.View("child",newnode);
                TOOLBARTREE.UnhighlightSpan(span);
            }
        } catch (exc) {
            if (this.SPACER.REPRESS_ALERTS == false){
                alert(exc);
            }
        }
    }

    ResetToolbarSelect(){
        var datatree = this? this : this.SPACER.TREE;
        if (document.getElementById(datatree.TOOLBAR_SELECT_NAME))
        {
            document.getElementById(datatree.TOOLBAR_SELECT_NAME).selectedIndex = 0;
        }
    }

    InitReplaceResults(){
        this.REPLACE_RESULTS.length = 0;
        this.CURRENT_REPLACE_INDEX = -1;
        var spans = document.getElementById(this.ELEMENT_OUTER_WRAPPER).getElementsByTagName("span");
        for (var count = 0; count < spans.length; ++count){
            var span = spans[count];
            if (span.className && span.className == "replace_result"){
                this.REPLACE_RESULTS.push(span);
            }
        }
        if (this.REPLACE_RESULTS.length > 0){
            document.getElementById(this.ELEMENT_INNER_WRAPPER).scrollTop = 0;
            this.CURRENT_REPLACE_INDEX = 0;
            var span = this.REPLACE_RESULTS[0];
            var y = this.GetScrollForSearch(span);
            document.getElementById(this.ELEMENT_INNER_WRAPPER).scrollTop = y;
        }
    }

    SpacerGetSkipMessage(){
        var result = this.SPACER.SKIP_MESSAGE;
        if (this.SPACER.SKIP_MESSAGE.indexOf(this.REPLACE) >= 0){
            this.SPACER.SKIP_MESSAGE = this.SPACER.ALT_SKIP_MESSAGE;
            result = this.SPACER.SKIP_MESSAGE;
        }
        if (this.SPACER.SKIP_MESSAGE.indexOf(this.REPLACE) >= 0){
            this.SPACER.SKIP_MESSAGE = this.SPACER.SKIP_MESSAGE.split(this.REPLACE).join("");
            result = this.SPACER.SKIP_MESSAGE;
        }
        if (this.SPACER.SKIP_MESSAGE.length < 5){
            if (this.SPACER.REPRESS_ALERTS == false){
                //alert("problem with skipping");
            }
            result = "";
        }
        return result;
    }

    ResetReplace(){
        this.REPLACE_RESULTS.length = 0;
        this.CURRENT_REPLACE_INDEX = -1;
        this.REPLACE = "";
        this.REPLACE_WITH = "";
        this.SPACER.SKIP_MESSAGE = this.SPACER.DEFAULT_SKIP_MESSAGE;
    }

    SpacerGetScrollForSearch(span){
        var y = span.offsetTop;
        var x = span.offsetLeft;
        var _parent = span.offsetParent;
        while (_parent != document.body){
            y += _parent.offsetTop;
            x += _parent.offsetLeft;
            _parent = _parent.offsetParent;
        }
        var y = this.findPos2(span,x,y)[1];
        var root = document.getElementById(this.ELEMENT_INNER_WRAPPER).getElementsByTagName('span')[0];
        var top = this.findPos(root)[1];
        var scroll = y - top;
        return scroll;
    }

    findPos(obj) {
        var curleft = 0;
        var curtop = 0;
        if(obj.offsetLeft) curleft += parseInt(obj.offsetLeft);
        if(obj.offsetTop) curtop += parseInt(obj.offsetTop);
        if(obj.scrollTop && obj.scrollTop > 0) curtop -= parseInt(obj.scrollTop);
        if(obj.offsetParent) {
            var pos = this.findPos(obj.offsetParent);
            curleft += pos[0];
            curtop += pos[1];
        } else if(obj.ownerDocument) {
            var thewindow = obj.ownerDocument.defaultView;
            if(!thewindow && obj.ownerDocument.parentWindow) thewindow = obj.ownerDocument.parentWindow;
            if(thewindow) {
                if(thewindow.frameElement) {
                    var pos = this.findPos(thewindow.frameElement);
                    curleft += pos[0]; curtop += pos[1];
                }
            }
        }
        return [curleft,curtop];
    }

    findPos2(obj, foundScrollLeft, foundScrollTop) {
        var curleft = 0;
        var curtop = 0;
        if(obj.offsetLeft) curleft += parseInt(obj.offsetLeft);
        if(obj.offsetTop) curtop += parseInt(obj.offsetTop);
        if(obj.scrollTop && obj.scrollTop > 0) {
            curtop -= parseInt(obj.scrollTop);
            foundScrollTop = true;
        }
        if(obj.scrollLeft && obj.scrollLeft > 0) {
            curleft -= parseInt(obj.scrollLeft);
            foundScrollLeft = true;
        }
        if(obj.offsetParent) {
            var pos = this.findPos(obj.offsetParent, foundScrollLeft, foundScrollTop);
            curleft += pos[0]; curtop += pos[1];
        } else if(obj.ownerDocument) {
            var thewindow = obj.ownerDocument.defaultView;
            if(!thewindow && obj.ownerDocument.parentWindow) thewindow = obj.ownerDocument.parentWindow;
            if(thewindow) {
                if (!foundScrollTop && thewindow.scrollY && thewindow.scrollY > 0) curtop -= parseInt(thewindow.scrollY);
                if (!foundScrollLeft && thewindow.scrollX && thewindow.scrollX > 0) curleft -= parseInt(thewindow.scrollX);
                if(thewindow.frameElement) {
                    var pos = this.findPos(thewindow.frameElement);
                    curleft += pos[0]; curtop += pos[1];
                }
            }
        }
        return [curleft,curtop];
    }

    /**
     * -----------------------------------------------------------------
     * PRESENTATION
     * -----------------------------------------------------------------
     */

    MouseDownSpan(evt,span){
        if (!evt){
            evt = window.event;
        }
        this.SPACER.MOUSE_DOWN_X = evt.clientX;
        this.SPACER.MOUSE_DOWN_Y = evt.clientY;
        var source;
        if (arguments.length > 1 && span != null && span != "undefined"){
            source = span;
        } else {
            source = evt.target? evt.target : evt.srcElement;
            while (source.nodeName.toLowerCase() != "span" || source.className != "spacer_content"){
                source = source.parentNode;
            }
        }
        if (source.nodeName.toLowerCase() == "span"){
            if (source.parentNode.nodeName.toLowerCase() == "li" && source.parentNode.parentNode.nodeName.toLowerCase() == "ul" && source.parentNode.parentNode.id == this.ELEMENT_INNER_WRAPPER && source.parentNode.parentNode.parentNode.nodeName.toLowerCase() == "div" && source.parentNode.parentNode.parentNode.id == this.ELEMENT_OUTER_WRAPPER){
                return;
            } else {
                var tree = this;
                if (tree){
                    tree.MOUSE_DOWN_SPAN = source;
                }
            }
        }
    }

    MouseUpSpan(evt,span){
        if (!evt){
            evt = window.event;
        }
        evt.stopPropagation();//*****************************************************************************************************10.0
        this.SPACER.MOUSE_UP_X = evt.clientX;
        this.SPACER.MOUSE_UP_Y = evt.clientY;
        var source;
        if (arguments.length > 1 && span != null && span != "undefined"){
            source = span;
        } else {
            source = evt.target? evt.target : evt.srcElement;
            while (source.nodeName.toLowerCase() != "span" || source.className != "spacer_content"){
                source = source.parentNode;
            }
        }
        //unhighlight
        if (this.SELECTED_SPAN){
            this.UnhighlightSpan(this.SELECTED_SPAN);
        }
        if (this.MOUSE_DRAG_SPANS){
            for (var s in this.MOUSE_DRAG_SPANS){
                this.UnhighlightSpan(this.MOUSE_DRAG_SPANS[s]);
            }
        }
        this.MOUSE_DRAG_SPANS.length = 0;
        if (source.nodeName.toLowerCase() == "span"){
            if (source.parentNode.nodeName.toLowerCase() == "li" && source.parentNode.parentNode.nodeName.toLowerCase() == "ul" && source.parentNode.parentNode.id == this.ELEMENT_INNER_WRAPPER && source.parentNode.parentNode.parentNode.nodeName.toLowerCase() == "div" && source.parentNode.parentNode.parentNode.id == this.ELEMENT_OUTER_WRAPPER){
                return;
            } else {
                var tree = this;
                if (tree){
                    tree.MOUSE_UP_SPAN = source;
                    if (tree.MOUSE_DOWN_SPAN && tree.MOUSE_UP_SPAN){
                        if (tree.MOUSE_DOWN_SPAN != tree.MOUSE_UP_SPAN){
                            var span1 = tree.MOUSE_DOWN_SPAN;
                            var span2 = tree.MOUSE_UP_SPAN;
                            var start = span1;
                            var stop = span2;
                            if (tree.MOUSE_UP_Y < tree.MOUSE_DOWN_Y){
                                start = span2;
                                stop = span1;
                            }
                            //unhighlight previously here
                            var highlightspan;
                            var parent = start.parentNode;
                            while (parent.nodeName.toLowerCase() != "ul"){
                                parent = parent.parentNode;
                            }
                            var stop_parent = stop.parentNode;
                            while (stop_parent.nodeName.toLowerCase() != "ul"){
                                stop_parent = stop_parent.parentNode;
                            }
                            if (parent != stop_parent){
                                return;
                            }
                            var startindex = 0;
                            var stopindex = 0;
                            for (var count = 0; count < parent.childNodes.length; ++count){
                                var li = parent.childNodes[count];
                                var content = li.getElementsByClassName('spacer_content')[0];
                                if (content == start){
                                    startindex = count;
                                } else if (content == stop){
                                    stopindex = count;
                                    break;
                                }
                            }
                            for (var count = startindex; count <= stopindex; ++count){
                                var highlightspan = parent.childNodes[count].getElementsByClassName('spacer_content')[0];
                                this.HighlightSpan(highlightspan);
                                tree.MOUSE_DRAG_SPANS.push(highlightspan);
                            }
                        } else {
                            //unhighlight...already done
                        }
                    }}}}}

    ClickSpan(evt,span){
        if (this.SELECTED_SPAN){
            this.UnhighlightSpan(this.SELECTED_SPAN);
        }
        for (var count = 0; count < this.MOUSE_DRAG_SPANS.length; ++count){
            this.UnhighlightSpan(this.MOUSE_DRAG_SPANS[count]);
        }
        if (!evt){
            evt = window.event;
        }
        this.SPACER.MOUSE_DOWN_X = evt.clientX;
        this.SPACER.MOUSE_DOWN_Y = evt.clientY;
        var source;
        if (arguments.length > 1 && span != null && span != "undefined"){
            source = span;
        } else {
            source = evt.target? evt.target : evt.srcElement;
            while (source.nodeName.toLowerCase() != "span" || source.className != "spacer_content"){
                source = source.parentNode;
            }
        }
        if (source.nodeName.toLowerCase() == "span"){
            if (source.parentNode.nodeName.toLowerCase() == "li" && source.parentNode.parentNode.nodeName.toLowerCase() == "ul" && source.parentNode.parentNode.id == this.ELEMENT_INNER_WRAPPER && source.parentNode.parentNode.parentNode.nodeName.toLowerCase() == "div" && source.parentNode.parentNode.parentNode.id == this.ELEMENT_OUTER_WRAPPER){
                this.SELECTED_SPAN = null; // ***
                return;
            } else {
                this.SELECTED_SPAN = source;
                this.CLICK_X = evt.clientX;
                this.CLICK_Y = evt.clientY;
                if (source.innerHTML.indexOf('search_result') >= 0){
                    var search_result = source.getElementsByTagName('span')[0];
                    if (search_result.className && search_result.className == 'search_result'){
                        source.innerHTML = search_result.innerHTML;
                    }
                }
                this.HighlightSpan(source);
                this.MOUSE_DRAG_SPANS.length = 0;
                this.MOUSE_DRAG_SPANS.push(source);
                this.SPACER.GoToFile(source);
            }
        }
    }

    HighlightSpan(span){
        if (!span.className || span.className != "spacer_content"){
            var prnt = span.parentNode;
            if (prnt.nodeName.toLowerCase() == "a"){
                prnt = prnt.parentNode;
            }
            var contents = prnt.getElementsByTagName('span');
            for (var count2 = 0; count2 < contents.length; ++count2){
                var content = contents[count2];
                if (content.className && content.className == "spacer_content"){
                    span = content;
                    break;
                }
            }
        }
        span.style.backgroundColor = this.HIGHLIGHT_BACKGROUND_COLOR;
        span.style.color = this.HIGHLIGHT_TEXT_COLOR;
    }

    UnhighlightSpan(span){
        if (!span.className || span.className != "spacer_content"){
            var prnt = span.parentNode;
            if (prnt.nodeName.toLowerCase() == "a"){
                prnt = prnt.parentNode;
            }
            var contents = prnt.getElementsByTagName('span');
            for (var count2 = 0; count2 < contents.length; ++count2){
                var content = contents[count2];
                if (content.className && content.className == "spacer_content"){
                    span = content;
                    break;
                }
            }
        }
        span.style.backgroundColor = "";
        span.style.color = "";
    }

    ScrollToSpan(span){
        document.getElementById(this.ELEMENT_INNER_WRAPPER).scrollTop = 0;
        var y = span.offsetTop - document.getElementById(this.ELEMENT_OUTER_WRAPPER).offsetTop;
        if (this.TOOLBAR != ""){
            y -= document.getElementById(this.TOOLBAR_NAME).offsetHeight;
        }
        var _parent = span.offsetParent;
        if (_parent){
            while (_parent != document.body){
                y += _parent.offsetTop;
                _parent = _parent.offsetParent;
                if (!_parent){ return; }
            }
            y = y >= 0? y : 0;
            document.getElementById(this.ELEMENT_INNER_WRAPPER).scrollTop = y;
        } else {
            y = y >= 0? y : 0;
            document.getElementById(this.ELEMENT_INNER_WRAPPER).scrollTop = y;
        }
    }

    DoNotWrapOuterElement(line){
        var returnvalue = false;
        var break_starts = ["<p>", "<h1>", "<h2>", "<h3>", "<h4>", "<h5>", "<h6>", "<div>", "<table>", "<form>", "<ul>", "<ol>", "<li>", "<blockquote>"];
        var break_half_starts = ["<p ", "<h1 ", "<h2 ", "<h3 ", "<h4 ", "<h5 ", "<h6 ", "<div ", "<table ", "<form ", "<ul ", "<ol ", "<li ", "<blockquote "];
        var break_ends = ["</p>", "</h1>", "</h2>", "</h3>", "</h4>", "</h5>", "</h6>", "</div>", "</table>", "</form>", "</ul>", "</ol>", "</li>", "</blockquote>", "<br/>", "<br>", "<hr/>", "<hr>"];
        if (line.indexOf("<") >= 0 && line.indexOf(">") >= 0){
            line = line.split("&nbsp;").join(" ");
            line = line.split("\r").join("");
            line = line.split("\n").join("");
            var result = line;
            // check for blanks before first tag
            var startingblanks = "";
            if (result.substring(0, result.indexOf("<")).length > 0 && this.SPACER.StringTrim(result.substring(0, result.indexOf("<"))) == ""){
                for (var blanks = 0; blanks < result.indexOf("<"); ++blanks){
                    startingblanks += " ";
                }
            }
            if (startingblanks == ""){
                // find starting <p> or <div> or <h1> etc...
                var start_of_first_tag = result.indexOf("<");
                var end_of_first_tag = result.indexOf(">");
                var start_of_last_tag = result.lastIndexOf("<");
                var end_of_last_tag = result.lastIndexOf(">");
                var starting_tag = result.substring(start_of_first_tag, end_of_first_tag + 1);
                var ending_tag = result.substring(start_of_last_tag, end_of_last_tag + 1);
                starting_tag = this.SPACER.StringTrim(starting_tag);
                ending_tag = this.SPACER.RightStringTrim(ending_tag);
                if (starting_tag.indexOf(" ") >= 0){
                    starting_tag = starting_tag.split(" ")[0] + " ";
                }
                if (break_starts.indexOf(starting_tag) >= 0 && break_ends.indexOf(ending_tag) >= 0 && break_starts.indexOf(starting_tag) == break_ends.indexOf(ending_tag)){
                    returnvalue = true;
                } else
                if (break_half_starts.indexOf(starting_tag) >= 0 && break_ends.indexOf(ending_tag) >= 0 && break_half_starts.indexOf(starting_tag) == break_ends.indexOf(ending_tag)){
                    returnvalue = true;
                }
            }
        }
        return returnvalue;
    }

    IsRemovableFormatTag(tag){
        var break_starts = ["<p>", "<h1>", "<h2>", "<h3>", "<h4>", "<h5>", "<h6>", "<div>", "<form>", "<li>"];
        var result = false;
        tag = tag.toLowerCase();
        if (tag[0] != "<"){
            tag = "<" + tag + ">";
        }
        if (break_starts.indexOf(tag) >= 0){
            result = true;
        }
        return result;
    }

    DivHasKeeperNonTextTag(div){ // components not allowed unless they are listed here (and maybe also DivHasContentTag)
        var result = false;
        if (div.getElementsByTagName('math') > 0 || div.getElementsByTagName('audio').length > 0 || div.getElementsByTagName('video').length > 0 || div.getElementsByTagName('embed').length > 0 || div.getElementsByTagName('object').length > 0 || div.getElementsByTagName('iframe').length > 0 || div.getElementsByTagName('img').length > 0 || div.getElementsByTagName('table').length > 0 || div.getElementsByTagName('ul').length > 0 || div.getElementsByTagName('ol').length > 0 || div.getElementsByTagName('blockquote').length > 0 || div.getElementsByTagName('hr').length > 0){
            result = true;
        }
        return result;
    }

    DivHasContentTag(div){ // don't count blanks found inside content tag or after it
        var result = false;
        if (div.getElementsByTagName('audio').length > 0 || div.getElementsByTagName('video').length > 0 || div.getElementsByTagName('embed').length > 0 || div.getElementsByTagName('object').length > 0 || div.getElementsByTagName('iframe').length > 0 || div.getElementsByTagName('img').length > 0){
            result = true;
        } else if (div.getElementsByTagName('table').length > 0 || div.getElementsByTagName('math').length > 0){
            result = true; // maybe better to allow blanks in these
        }
        return result;
    }

    DivHasSelfIndentingTag(div){
        var result = false;
        if (div.getElementsByTagName('ul').length > 0 || div.getElementsByTagName('ol').length > 0 || div.getElementsByTagName('blockquote').length > 0 || div.getElementsByTagName('hr').length > 0){ // || div.getElementsByTagName('table').length > 0
            result = true;
        }
        return result;
    }

    TagRequiresLineBreak(div){ // if don't wrap tables with <p> then require <br> or else two consecutive lines with tables would merge into same line
        var result = false;
        if (div.getElementsByTagName('table').length > 0){
            result = true;
        }
        return result;
    }

    HtmlLineBreaks(HTML, nbsp){
        try{
            var html = HTML;
            var result = new Array();
            var break_starts = ["<p>", "<h1>", "<h2>", "<h3>", "<h4>", "<h5>", "<h6>", "<div>", "<ul>", "<ol>", "<li>", "<blockquote>"];
            var break_half_starts = ["<p ", "<h1 ", "<h2 ", "<h3 ", "<h4 ", "<h5 ", "<h6 ", "<div ", "<ul ", "<ol ", "<li ", "<blockquote "];
            var break_ends = ["</p>", "</h1>", "</h2>", "</h3>", "</h4>", "</h5>", "</h6>", "</div>", "</ul>", "</ol>", "</li>", "</blockquote>", "<br/>", "<br>", "<hr/>", "<hr>"];
            var SKIPPED_LINES = 0;
            if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0){
                html = html.split("&nbsp;").join(" ");
                html = html.split("\r").join("");
                html = html.split("\n").join("");
                var c = '';
                var line = "";
                var tag = "";
                var lead_breaking_tag = "";
                var CURRENTBLOCKQUOTEMARGIN = "";
                var BLOCKQUOTEMARGIN = "         ";
                var CURRENTLISTMARGIN = "";
                var LISTMARGIN = "     ";
                var PADLEFTMARGIN = "";
                for (var count = 0; count < html.length; ++count){
                    c = html[count];
                    if (c.charCodeAt(0) == 160){
                        c = ' ';
                    }
                    if (tag == "" && c == ' ' && arguments.length == 2 && nbsp == true){
                        c = "&nbsp;";
                    }
                    line += c;
                    if (count + 1 == html.length){
                        if (this.SPACER.StringTrim(line) == ""){
                            ++SKIPPED_LINES;
                        } else if (break_ends.indexOf(this.SPACER.StringTrim(line)) >= 0){ // line is just an end tag
                            ++SKIPPED_LINES;
                        } else {
                            result.push(line);
                        }
                    } else if (c == '<' && tag == ""){
                        tag += c;
                    } else if (c == '<' && tag != ""){ // 8.1
                        tag = "" + c; // tag contains two <, previous tag must not have been a tag, start at new tag
                    } else if (c == '>' && tag != ""){
                        tag += c;
                        if (break_ends.indexOf(tag) >= 0){
                            var clear = false;
                            if (tag == this.SPACER.StringTrim(line) || this.SPACER.StringTrim(this.SPACER.RemoveEmptyEndTags(line)) == ""){ // line is just an end tag
                                if (tag == "</ul>" || tag == "</ol>"){
                                    if (CURRENTLISTMARGIN.length > 0){
                                        CURRENTLISTMARGIN = CURRENTLISTMARGIN.substring(LISTMARGIN.length);
                                    }
                                } else if (tag == "</blockquote>"){
                                    if (CURRENTBLOCKQUOTEMARGIN.length > 0){
                                        CURRENTBLOCKQUOTEMARGIN = CURRENTBLOCKQUOTEMARGIN.substring(BLOCKQUOTEMARGIN.length);
                                    }
                                }
                                tag = "";
                                line = "";
                                lead_breaking_tag = "";
                            } else if (lead_breaking_tag == ""){
                                clear = true;
                                if (CURRENTBLOCKQUOTEMARGIN.length > 0){
                                    CURRENTBLOCKQUOTEMARGIN = CURRENTBLOCKQUOTEMARGIN.substring(BLOCKQUOTEMARGIN.length);
                                }
                                if (CURRENTLISTMARGIN.length > 0){
                                    CURRENTLISTMARGIN = CURRENTLISTMARGIN.substring(LISTMARGIN.length);
                                }
                            } else if (break_starts.indexOf(lead_breaking_tag) == break_ends.indexOf(tag) || break_half_starts.indexOf(lead_breaking_tag) == break_ends.indexOf(tag)){
                                clear = true;
                                if (tag == "</blockquote>"){
                                    CURRENTBLOCKQUOTEMARGIN = CURRENTBLOCKQUOTEMARGIN.substring(BLOCKQUOTEMARGIN.length);
                                } else if (tag == "</ul>" || tag == "</ol>"){
                                    if (CURRENTLISTMARGIN.length > 0){ // new
                                        CURRENTLISTMARGIN = CURRENTLISTMARGIN.substring(CURRENTLISTMARGIN.length);
                                    }
                                }
                            }
                            if (clear == true){ // didn't skip line
                                //var currentresult = PADLEFTMARGIN + CURRENTBLOCKQUOTEMARGIN + CURRENTLISTMARGIN + line.split("</blockquote>").join("");
                                var currentresult = PADLEFTMARGIN + CURRENTBLOCKQUOTEMARGIN + CURRENTLISTMARGIN + line.split("</blockquote>").join("").split("</ul>").join("").split("</ol>").join(""); // **********
                                result.push(currentresult);
                                line = "";
                                tag = "";
                                lead_breaking_tag = "";
                                PADLEFTMARGIN = "";
                            } else {
                                tag = "";
                            }
                        } else if (break_starts.indexOf(tag) >= 0){
                            if (lead_breaking_tag == ""){
                                lead_breaking_tag = tag;
                                if (this.SPACER.StringTrim(line) != tag){
                                    line = line.substring(0, line.length - tag.length);
                                    var currentresult = PADLEFTMARGIN + CURRENTBLOCKQUOTEMARGIN + CURRENTLISTMARGIN + line.split("</blockquote>").join("");
                                    result.push(currentresult);
                                    line = tag;
                                }
                            } else if (lead_breaking_tag != "" && (tag == "<ol>" || tag == "<ul>")){
                                line = line.substring(0, line.length - tag.length);
                                line += break_ends[break_starts.indexOf(lead_breaking_tag)];
                                var currentresult = PADLEFTMARGIN + CURRENTBLOCKQUOTEMARGIN + CURRENTLISTMARGIN + line.split("</blockquote>").join("");
                                result.push(currentresult);
                                line = tag;
                                lead_breaking_tag = tag;
                            }
                            if (tag == "<ol>" || tag == "<ul>"){
                                line = "";
                                lead_breaking_tag = "";
                                if (result.length > 0){ // if file is all lists, first line would indent
                                    CURRENTLISTMARGIN += LISTMARGIN;
                                }
                                ++SKIPPED_LINES;
                            } else if (tag == "<blockquote>"){
                                line = "";
                                lead_breaking_tag = "";
                                CURRENTBLOCKQUOTEMARGIN += BLOCKQUOTEMARGIN;
                                ++SKIPPED_LINES;
                            }
                            tag = "";
                        } else if (tag.indexOf("<blockquote ") >= 0 && lead_breaking_tag == "<blockquote ") {
                            tag = "";
                            line = "";
                            lead_breaking_tag = "";
                        } else if (tag.indexOf("<ol ") >= 0 && lead_breaking_tag == "<ol "){
                            tag = "";
                            line = "";
                            lead_breaking_tag = "";
                        } else if (tag.indexOf("<ul ") >= 0 && lead_breaking_tag == "<ul "){
                            tag = "";
                            line = "";
                            lead_breaking_tag = "";
                        } else {
                            if (tag.indexOf("style") >= 0){
                                var temp = document.createElement('div');
                                temp.innerHTML = tag + break_ends[break_half_starts.indexOf(tag.split(" ")[0])];
                                var tg = temp.firstChild;
                                var pl = null;
                                if (tg && tg.style){
                                    if (tg.style.padding || tg.style.paddingTop || tg.style.paddingBottom || tg.style.paddingRight){}
                                    else if (tg.style.paddingLeft && this.SPACER.StringTrim(line.replace(tag, "")) == ""){
                                        pl = tg.style.paddingLeft;
                                        pl = pl.replace("px", "");
                                        pl = parseInt(pl);
                                        for (var p = 0; p < pl; ++p){
                                            PADLEFTMARGIN += " ";
                                        }
                                    }
                                }
                            }
                            tag = "";
                        }
                    } else if (c == ' ' && tag == '<'){ // 8.1
                        tag = "";
                    } else if (c == ' ' && tag == '<='){ // 8.1
                        tag = "";
                    } else if (tag != ""){
                        tag += c;
                        if (break_half_starts.indexOf(tag) >= 0 && lead_breaking_tag == ""){
                            lead_breaking_tag = tag;
                            if (tag == "<blockquote "){
                                CURRENTBLOCKQUOTEMARGIN += BLOCKQUOTEMARGIN;
                            } else if (tag == "<ul " || tag == "<ol "){
                                if (result.length > 0){ // if file is all lists, first line would indent
                                    CURRENTLISTMARGIN += LISTMARGIN;
                                }
                            }
                        }
                    }
                }
            } else {
                result.push(html);
            }
            /** flaw...lines with just <ul> or </ul> are removed...then doublechecklength > resultlength...fixed with SKIPPED_LINES
             remaining flaw...GetHtmlLines doesn't skip lines that are just <ul> or </ul>...it should...then, could change last line below to >=
             test...outline with just <ul> (on its own line), <li>, and </ul> (on its own line), with first <ul> not indented, all <li> indented, and last </ul> also indented **/
            /**
             if (HTML.indexOf("\n") >= 0){ // 8.1
       HTML = HTML.split("\r").join("").split("&nbsp;").join(" ");
       var doublecheck = HTML.split("\n");
       var doublechecklength = doublecheck.length;
       var resultlength = result.length;
       if (doublechecklength > resultlength + SKIPPED_LINES){ // should change to >=...checks for lines that got squished together due to < and > confusions...have to update HtmlLineBreaks before changing to >=
          result = doublecheck;
       }
    }**/
            return result;
        } catch(exc) {
            return null;
        }
    }

    RemoveHtmlComments(html){
        var c = '';
        var text = "";
        var tag = "";
        var comment = "";
        for (var count = 0; count < html.length; ++count){
            c = html[count];
            if (c == '<' && tag == ""){
                tag += c;
            } else if (c == '!' && tag == "<"){
                tag += c;
            } else if (c == '-' && tag == "<!"){
                tag += c;
            } else if (c == '-' && tag == "<!-"){
                comment = "<!--";
                tag = "";
            } else if (c == '-' && tag == "" && comment == "<!--"){
                tag += c;
            } else if (c == '-' && tag == '-' && comment == "<!--"){
                tag += c;
            } else if (c == '>' && tag == '--' && comment == "<!--"){
                comment = "-->";
                tag = "";
            } else if (comment == "<!--"){
                tag = "";
            } else if (tag != ""){
                text += tag;
                tag = "";
                text += c;
            } else {
                text += c;
            }
        }
        return text;
    }


    /**
     * ---------------------------------------------------------------
     * NODES
     * ---------------------------------------------------------------
     */

    SpacerGetOuterElement(line){
        var result = "";
        var break_starts = ["<p>", "<h1>", "<h2>", "<h3>", "<h4>", "<h5>", "<h6>", "<div>", "<table>", "<form>", "<ul>", "<ol>", "<li>", "<blockquote>"];
        var break_half_starts = ["<p ", "<h1 ", "<h2 ", "<h3 ", "<h4 ", "<h5 ", "<h6 ", "<div ", "<table ", "<form ", "<ul ", "<ol ", "<li ", "<blockquote "];
        var break_ends = ["</p>", "</h1>", "</h2>", "</h3>", "</h4>", "</h5>", "</h6>", "</div>", "</table>", "</form>", "</ul>", "</ol>", "</li>", "</blockquote>", "<br/>", "<br>", "<hr/>", "<hr>"];
        if (line.indexOf("<") >= 0 && line.indexOf(">") >= 0){
            line = line.split("&nbsp;").join(" ");
            line = line.split("\r").join("");
            line = line.split("\n").join("");
            var result = line;
            // check for blanks before first tag
            var startingblanks = "";
            if (result.substring(0, result.indexOf("<")).length > 0 && this.SPACER.StringTrim(result.substring(0, result.indexOf("<"))) == ""){
                for (var blanks = 0; blanks < result.indexOf("<"); ++blanks){
                    startingblanks += " ";
                }
            }
            // find starting <p> or <div> or <h1> etc...
            var start_of_first_tag = result.indexOf("<");
            var end_of_first_tag = result.indexOf(">");
            var start_of_last_tag = result.lastIndexOf("<");
            var end_of_last_tag = result.lastIndexOf(">");
            var starting_tag = result.substring(start_of_first_tag, end_of_first_tag + 1);
            var ending_tag = result.substring(start_of_last_tag, end_of_last_tag + 1);
            starting_tag = starting_tag.split(" ")[0] + " ";
            if (break_half_starts.indexOf(starting_tag) >= 0 && break_ends.indexOf(ending_tag) >= 0 && break_half_starts.indexOf(starting_tag) == break_ends.indexOf(ending_tag)){
                result = break_starts[break_half_starts.indexOf(starting_tag)];
            } else {
                var div = document.createElement("div");
                var trimmed = line.split("&nbsp;").join(" ");
                trimmed = this.SPACER.StringTrim(line);
                if (trimmed == "" || trimmed == null || trimmed == "undefined"){
                    result = null;
                } else {
                    div.innerHTML = trimmed;
                    if (div.children[0]){
                        starting_tag = div.children[0].nodeName;
                        result = starting_tag;
                    }
                }
            }
        }
        return result.replace("<","").replace(">","");
    }

    HtmlBody(html){
        var result = html;
        if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0){
            if (html.indexOf('<body>') >= 0){
                var bod = '<body>';
                html = html.substring(html.indexOf('<body>') + bod.length);
                html = html.split('</body>').join('');
                html = html.split('</html>').join('');
                result = html;
            } else if (html.indexOf('<body') >= 0){
                var bod = '<body';
                html = html.substring(html.indexOf('<body') + bod.length);
                html = html.substring(html.indexOf('>') + 1);
                html = html.split('</body>').join('');
                html = html.split('</html>').join('');
                result = html;
            }
            result = result.split("&nbsp;").join(" ");
        }
        return result;
    }

    CloseTree(){
        this.ROOT_NODE.Click();
        this.ROOT_NODE.Close();
        this.SELECTED_SPAN = null;
        var ul = "<ul onmouseover='return SPACER.SetTreeFromName(\"" + this.NAME + "\");' oncontextmenu='return SPACER.RightClick();' id='" + this.ELEMENT_INNER_WRAPPER + "' style='" + this.ELEMENT_INNER_WRAPPER_STYLE + this.GetLettering() + "height:" + this.ELEMENT_INNER_WRAPPER_HEIGHT + "'>";
        var _ul = "</ul>";
        return this.TOOLBAR + ul + this.ROOT_NODE.Iterate(false) + _ul;
    }

    /**
     * ---------------------------------------------------------------
     * SAVE, LOAD
     * ---------------------------------------------------------------
     */

    LoadFromToolbar(){
        var text = "";
        this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML;
        document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return SPACER.TREE.RestoreView();'>CANCEL</button>" + "<button type='button' onclick='return SPACER.TREE.LoadFromTextarea2(\"text\");'>TEXT FILE</button><button type='button' onclick='return SPACER.TREE.LoadFromTextarea2(\"html\");'>HTML FILE</button><!--<button type='button' onclick='return LoadFromTextarea2(\"tree\");'>.tree.html FILE</button>--><br/><textarea id='spacer_load_area' style='white-space:pre;min-width:500px;min-height:500px;width:100%;' ></textarea>";
    }

    LoadFromTextarea(type, preload){
        var text = "";
        if (arguments.length == 2 && preload != null && preload != "undefined" && preload != ""){
            text = preload;
        }
        this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML;
        document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return SPACER.TREE.RestoreView();'>CANCEL</button><button type='button' onclick='return SPACER.TREE.LoadFromTextarea2();'>SUBMIT >>></button><br/><textarea id='spacer_load_area' style='white-space:pre;min-width:500px;min-height:500px;width:100%;' class='" + type + "'>" + text + "</textarea>";
    }

    LoadFromTextarea2(type){
        var c;
        if (arguments.length > 0 && type != null && type != "undefined" && type != ""){
            c = type;
        } else {
            c = document.getElementById('spacer_load_area').className;
        }
        var txt = "";

        txt = document.getElementById('spacer_load_area').value;
        txt = this.SPACER.EncodeArrows(txt,true);//8.0

        this.SPACER.FULL_SCREEN_MODE = false;
        if (this){
            this.SELECTED_SPAN = null;//7.8.7
            this.SPACER.PLEASE_WAIT = true;
            if (c == 'text' || c == '' || c == 'undefined' || c == null){
                this.Query("CREATE FROM TEXT " + txt);
            } else if (c == 'tree' || c == 'file') {
                this.Query("CREATE FROM TREE " + txt);
            } else if (c == 'html' || c == 'list') {
                this.Query("CREATE FROM HTML " + txt); // ************************* indents unindented tables
            } else {}
        } else {
            this.SELECTED_SPAN = null;//7.8.7
            this.SPACER.PLEASE_WAIT = true;
            if (c == 'text' || c == '' || c == 'undefined' || c == null){
                this.Query("CREATE FROM TEXT " + txt);
            } else {
                this.Query("CREATE FROM HTML " + txt);
            }
        }
    }

    GetList(){
        return this.SpacerView.ViewGetList();
    }

    UpdateContent(){
        this.Query("CREATE FROM HTML " + this.GetList());
    }

    PrintFile(justreturnval){
        try{
            var result = this.GetFile();
            if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text"){
                //alert("WARNING: If your document contains computer code, especially html code or javascript, you should use PRINT TEXT and save it as a text file. It is often not possible to write about code from within code, especially with html. Always write about computer code from a text file.");
            }
            if (arguments.length < 1 || justreturnval != true){
                //result = result.split("&nbsp;").join("&amp;nbsp;");
                result = result.split("<").join("&lt;");
                result = result.split(">").join("&gt;");
                this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML;
                document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return SPACER.TREE.RestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
                return null;
            } else if (justreturnval == true){
                return result;
            }
        } catch(exc) {

        }
    }

    GetFile(){
        this.UpdateContent();
        var datatree = this.SPACER.TREE? this.SPACER.TREE : this;
        var result = "<!doctype html><html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>";
        result += "<" + "script type='text/javascript' src='" + this.SPACER.ADDRESS + "'><" + "/script>";
        result += "<" + "script type='text/javascript'>";
        result += this.SPACER.GetOnload(datatree);
        result += "<" + "/script>";
        result += "<" + "/head><" + "body>";
        result += "<div id='" + datatree.ELEMENT_OUTER_WRAPPER + "' type='html' toolbar='" + datatree.TOOLBAR_TOOLS + "' root=\"" + datatree.TITLE + "\" open=\"" + datatree.OPEN_ICON.split("'").join("&apos;").split("\"").join("&quot;") + "\" closed=\"" + datatree.CLOSED_ICON.split("'").join("&apos;").split("\"").join("&quot;") + "\" empty=\"" + datatree.EMPTY_ICON.split("'").join("&apos;").split("\"").join("&quot;") + " >";
        if (this.CONTENT.indexOf('<table') >= 0){
            result += this.CONTENT; // slower, but GetList indents unindented tables
        } else {
            result += this.GetList(); // faster
        }
        result += "</div>";
        result += "</body></html>";
        return result;
    }

    PrintList(justreturnval){
        try{
            var result;
            result = this.GetList();
            if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text"){
                //alert("WARNING: If your document contains computer code, especially html code or javascript, you should leave it as a text file. It is not possible to write about html from within html. Always write about computer code from a text file.");
            }
            if (arguments.length < 1 || justreturnval != true){
                result = result.split("&nbsp;").join("&amp;nbsp;");
                result = this.SPACER.EncodeArrows(result,true);//8.0
                this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML;
                document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return SPACER.TREE.RestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
                return null;
            } else if (justreturnval == true){
                return result;
            }
        } catch(exc) {
            console.log("exception " + exc);
        }
    }

    PrintHtml(justreturnval){
        this.PrintList(justreturnval);
    }

    PrintHtmlLines(justreturnval){
        try{
            var result;
            result = this.GetHtml();
            if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text"){
                //alert("WARNING: If your document contains computer code, especially html code or javascript, you should leave it as a text file. It is not possible to write about html from within html. Always write about computer code from a text file.");
            }
            if (arguments.length < 1 || justreturnval != true){
                result = result.split("&nbsp;").join("&amp;nbsp;");
                result = this.SPACER.EncodeArrows(result,true);//8.0
                this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML;
                document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return SPACER.TREE.RestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
                return null;
            } else if (justreturnval == true){
                return result;
            }
        } catch(exc) {
            alert(exc);
        }
    }

    UpdateHtmlContent(node){
        if (arguments.length <= 0){
            node = this.ROOT_NODE;
            this.CONTENT = "";
        } else if (node == this.ROOT_NODE){
            this.CONTENT = "";
        }
        if (node.GetLevel() >= 0){
            var indentation = '';
            var level = node.GetLevel();
            var blanks = parseInt(level) * node.TREE.INDENTATION;// 7.9.6
            //var blanks = parseInt(level * 10);
            for (var count = 0; count < blanks; ++count){ // v6.4 bug fixed: for (var count = 0; count < node.INDENTATION; ++count){
                indentation += "&nbsp;";//' ';
            }
            var div = document.createElement('div');
            div.innerHTML = node.TEXT;
            if (this.DivHasSelfIndentingTag(div) == true || this.DoNotWrapOuterElement(node.TEXT) == true){ // || this.DivHasKeeperNonTextTag(div) == true){ // create query with content problem &nbsp;<img...><p>...</p>
                this.CONTENT += indentation + node.TEXT;
                if (this.TagRequiresLineBreak(div)){
                    this.CONTENT += '<br/>'; // v6.4...requires <br> for two tables on two consecutive lines...otherwise UpdateContent thinks they are on same line
                }
            } else {
                this.CONTENT += '<p>' + indentation + node.TEXT + '</p>';
            }
        }
        if (node.GetChildCount() > 0){
            for (var count = 0; count < node.GetChildCount(); ++count){
                this.UpdateHtmlContent(node.CHILDREN[count]);
            }
        }
    }

    PrintText(){
        var result = this.GetTextForPrint();
        this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML;
        document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return SPACER.TREE.RestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
    }

    GetTextForPrint(){
        this.UpdateContent();
        var content = this.CONTENT;
        var chars;
        var lines = new Array();
        content = this.HtmlBody(content);
        lines = this.HtmlLineBreaks(content);
        for (var count = 0; count < lines.length; ++count){
            lines[count] = this.SPACER.StripTagsPHPJS(lines[count]);
        }
        var result = "";
        for (var count = 0; count < lines.length; ++count){
            result += lines[count] + "\n";
        }
        return result;
    }

    GetHtmlParagraphs(){
        this.UpdateHtmlContent();
        return this.CONTENT;
    }

    /**
     * -----------------------------------------------------------------------------
     * GETTERS, SETTERS
     * -----------------------------------------------------------------------------
     */

    SetType(type, alt_editor_or_not){ // 7.9.4 used by change, (new, and edit) functions...( ) = commented out
        // problem: alt_editor is property of tree manager rather than tree
        // rule: if explicitly change type with change query, or a new or edit query with an explicit type parameter, also might change other trees on webpage
        // update: don't change alt editor property...instead, have ShowAltEditor check whether tree has changed to plain text and type text...if so, outsource to plain text editor function
        var current_type = this.TYPE;
        type = type.toLowerCase();
        if (current_type == type){
            return;
        }
        switch(type){
            case "text": // switch from html to plain text
                this.TYPE = "text";
                break;
            case "html": // switch from plain text to html
            case "tree": // mostly same as html
                if (current_type != "text"){
                    return;
                }
                this.TYPE = type;
                break;
            default:
                break;
        }
    }

    SetTypeConditionally(type, alt_editor_or_not){ // 7.9.4 used by (load and create) functions..( ) = commented out
        // rule: if load text file into html editor, leave as html, don't change other trees on webpage to text
        // just describes rule and contrasts from SetType function
        var current_type = this.TYPE;
        if (current_type == null || current_type == "undefined"){
            current_type = "text"; // default when attribute not set
        }
        current_type = current_type.toLowerCase();
        switch(current_type){ // ignore create or load type, favor preset type (from html or javscript code)
            case "text":
                //this.PLAIN_TEXT = true;
                break;
            case "html":
            case "tree":
                //this.PLAIN_TEXT = false;
                break;
            default:
                break;
        }
    }

    GetLettering(){
        return "font-family:" + this.LETTERING + ";";
    }

} // spacer tree

