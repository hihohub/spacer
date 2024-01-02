/**
 * example script
 * let SPACER = new Spacer();
 * onload = () => { SPACER.AutoInit("DATATREE"); }
 */

/**
 * To install a datatree on your web page, simply include a container element with the id DATATREE and an indented outline between the tags.
 * Or, import the indented text file with the attribute src='filename'.
 * Spacer also accepts an HTML list, but you will have to add the attribute type='html'.
 * The 'root' attribute designates the text for the root node, here 'Example'.
 * The 'toolbar' attribute adds buttons, here 'collapse,expand,search,reset'.
 * The 'treeheight' attribute restricts the height. We have also added a style attribute of width:50%;margin-left:25%.
 * Finally, import Spacer10.1.js and add another script with one line in the onload handler, SPACER.AutoInit();
 */

/** starts with data model to build first view, returns tree object **/
/** data models: tree, linear nodes array, content outline **/
/** after initialization, View-Controller model only **/
/** list model: ul:li:(a:span:ul) WARNING:"a" could have span**/

/**
 * TASKS
 * search SPACER, remove from strings
 * strict mode (for (let x =), for (s in), let x =)
 * add return values?
 */

class Spacer {
    constructor() {
        // subclasses
        // this.Tree;
        // function declarations
        this.Alphabetize = this.SpacerAutoAlphabetize;
        this.AllowBackspace = this.SpacerAllowBackspace;
        this.AutoInit = this.SpacerAutoInit;
        this.CloseContextMenu = this.CloseContextMenu;
        this.CloseEditBox = this.CloseEditBox;
        this.CloseMenu = this.CloseMenu;
        this.ClosePopupBox = this.ClosePopupBox;
        this.CloseWaitBox = this.CloseWaitBox;
        this.Collapse = this.Collapse;
        this.ContextMenu = this.ContextMenu;
        this.DisallowBackspace = this.SpacerDisallowBackspace;
        this.EncodeArrows = this.EncodeArrows;
        this.Expand = this.Expand;
        this.FocusContextMenu = this.FocusContextMenu;
        this.GetBrowser = this.GetBrowser;
        this.GetInitiator = this.SpacerGetPopupEditInitiator;
        this.GetOnload = this.SpacerGetOnload;
        this.GetTreeFromName = this.SpacerGetTreeFromName;
        this.GoToFile = this.SpacerGoToFile;
        this.HighlightTree = this.SpacerHighlightTree;
        this.LeftStringTrim = this.SpacerLeftStringTrim;
        this.Load = this.SpacerAutoLoad;
        this.LoadFromToolbar = this.SpacerAutoLoadFromToolbar;
        this.MenuMouseClick = this.SpacerMenuMouseClick;
        this.MenuMouseOver = this.SpacerMenuMouseOver;
        this.MenuMouseOut = this.SpacerMenuMouseOut;
        this.Next = this.SpacerAutoNext;
        this.Number = this.SpacerAutoNumber;
        this.OpenMenu = this.SpacerOpenMenu;
        this.PreventDefault = this.SpacerPreventDefault;
        this.Previous = this.SpacerAutoPrevious;
        this.PrintFile = this.SpacerAutoPrintFile;
        this.PrintHtml = this.SpacerAutoPrintHtml;
        this.PrintList = this.SpacerAutoPrintList;
        this.PrintText = this.SpacerAutoPrintText;
        this.Query = this.SpacerAutoQuery;
        this.QueryDocumentation = this.SpacerQueryDocumentation;
        this.RemoveEmptyEndTags = this.SpacerRemoveEmptyEndTags;
        this.RemoveTables = this.SpacerRemoveTables;
        this.RemoveTableWrappers = this.SpacerRemoveTableWrappers;
        this.Replace = this.SpacerAutoReplace;
        this.Reset = this.SpacerAutoReset;
        this.ResetEditBox = this.ResetEditBox;
        this.RightClick = this.SpacerRightClick;
        this.RightStringTrim = this.SpacerRightStringTrim;
        this.Save = this.SpacerAutoSave;
        this.Search = this.SpacerAutoSearch;
        this.SetInitiator = this.SpacerSetPopupEditInitiator;
        this.SetTreeFromName = this.SpacerSetTreeFromName;
        this.ShowEditBox = this.ShowEditBox;
        this.ShowPopupBox = this.SpacerShowPopupBox;
        this.Skip = this.SpacerAutoSkip;
        this.StringTrim = this.SpacerStringTrim;
        this.StripTags = this.SpacerStripTags;
        this.StripTagsPHPJS = this.SpacerStripTagsPHPJS;
        this.StripTagLeaveInner = this.SpacerStripTagLeaveInner;
        this.StripTagWithClassNameLeaveInner = this.SpacerStripTagWithClassNameLeaveInner;
        this.ToolbarSelect = this.SpacerAutoToolbarSelect;
        this.Wait = this.SpacerWait;
        // properties
        // repeats with datatree properties not allowed
        this.ADDRESS = "http://3.144.127.167/welcome/scripts/Spacer10.2.js";
        this.ALT_SKIP_MESSAGE = "%%%%% SKIPPED %%%%%";
        this.BACKSPACE_ALLOWED = false;
        this.CLIPBOARD = new Array();
        this.COUNTER = 0;
        this.DEFAULT_ACCORDION = -1;
        this.DEFAULT_INNER_WRAPPER = "DATALIST";
        this.DEFAULT_OUTER_WRAPPER = "DATATREE";
        this.DEFAULT_TOOLBAR_NAME = "spacer_toolbar";
        this.DEFAULT_EDITBOX_NAME = "spacer_editbox";
        this.DEFAULT_CLOSED_ICON = "<span class='closed'>&rArr;</span>";
        this.DEFAULT_EMPTY_ICON = "<span class='empty'>&EmptySmallSquare;</span>";
        this.DEFAULT_GO_TO_FILE = "if(this.TEMP.toLowerCase().indexOf('.txt')>=0 || this.TEMP.toLowerCase().indexOf('.html')>=0 || this.TEMP.toLowerCase().indexOf('.htm')>=0){this.TREE.Query('LOAD ' + this.TEMP);this.GO_TO_FILE = '';this.WENT_TO_FILE = true;this.TREE.Query('collapse');};";
        this.DEFAULT_HIGHLIGHT_BACKGROUND_COLOR = "hsl(0,0%,60%)";
        this.DEFAULT_HIGHLIGHT_TEXT_COLOR = "white";
        this.DEFAULT_OPEN_ICON = "<span class='open'>&dArr;</span>";
        this.DEFAULT_SKIP_MESSAGE = "***** PLEASE WAIT *****";
        this.DEFAULT_TOOLBAR_ALIGN = "left";
        this.DEFAULT_TOOLBAR_TOOLS = "collapse,expand,search_horizontal,next,previous,resets,edit,replace,alphabetize,query,number";
        this.DOCUMENTATION_ADDRESS = "http://www.spacer.com/proxy/documentation.tree.html";
        this.INSERT = false;
        this.FULL_SCREEN_MODE = false;
        this.GO_TO_FILE = ""; // go to file when click on line...insert function behavior here...does not require 'function(){...}'...text of line clicked stored in SPACER.TEMP variable
        this.MOUSE_DOWN_X = -1;
        this.MOUSE_DOWN_Y = -1;
        this.MOUSE_UP_X = -1;
        this.MOUSE_UP_Y = -1;
        this.NAME_OF_SEARCH_RESULT = 'search_result';
        this.NAME_OF_LINENUMBER = 'linenumber';
        this.NAME_OF_ARROW = 'spacer_arrow';
        this.NAME_OF_CONTENT = 'spacer_content';
        this.NAME_OF_UL = 'spacer_ul';
        this.NAME_OF_LI = 'spacer_li';
        this.PLEASE_WAIT = false;
        this.POPUP_BACKGROUND = "#f5f2eb";
        this.POPUP_BORDER = "1px solid black";//3px dotted #cc00cc
        this.POPUP_EDIT_INITIATOR = null;
        this.PRINT_EXTRA_SCRIPT_BEFORE = "";
        this.PRINT_EXTRA_SCRIPT_AFTER = "";
        this.QUERYWINDOW_ROWS = "";
        this.QUERYWINDOW_COLS = "";
        this.REPRESS_ALERTS = true;
        this.REPRESS_EDITS = false;
        this.REQUEST;
        this.SETTABLE_PROPERTIES = ["DEFAULT_CLOSED_ICON", "DEFAULT_EMPTY_ICON", "DEFAULT_OPEN_ICON", "POPUP_BACKGROUND", "PRINT_EXTRA_SCRIPT_BEFORE", "PRINT_EXTRA_SCRIPT_AFTER", "REPRESS_ALERTS", "REPRESS_EDITS", "TAB", "TOOLBAR_ALIGN", "TOOLBAR_STYLE"];
        this.SKIP_MESSAGE = "***** PLEASE WAIT *****";
        this.SKIPPED = false;
        this.TAB = "     ";
        this.TEMP;
        this.TIMER;
        this.TOOLBAR_ALIGN = this.DEFAULT_TOOLBAR_ALIGN;
        this.TOOLBAR_NOWRAP_STYLE = "background-color:#cccccc;white-space:nowrap;overflow:auto;clear:both;";
        this.TOOLBAR_WRAP_STYLE = "background-color:#cccccc;white-space:wrap;overflow:auto;clear:both;";
        this.TOOLBAR_SEPARATOR = "<span>|</span>";
        this.TOOLBAR_STYLE = "background-color:#cccccc;white-space:wrap;overflow:hidden;clear:both;";
        this.TREE;
        this.TREES = new Array(); // stores data tree components, not files
        this.WAIT_IS_OPEN = false;
        this.WENT_TO_FILE = false;
    }

    // was removed
    SpacerAutoAlphabetize(){
        if (window.event){
            window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
        }
        var datatree = this.TREE? this.TREE : this;
        var lower_bound = document.getElementById(datatree.TOOLBAR_LOWER_BOUND_NAME).value;
        var upper_bound = document.getElementById(datatree.TOOLBAR_UPPER_BOUND_NAME).value;
        lower_bound = parseInt(this.StringTrim(lower_bound));
        upper_bound = parseInt(this.StringTrim(upper_bound));
        if (typeof lower_bound == "number" && typeof upper_bound == "number" && !isNaN(lower_bound) && !isNaN(upper_bound)){
            var input = "ALPHABETIZE FROM LINE " + lower_bound + " TO LINE " + upper_bound;
            datatree.Query(input);
        } else {
            alert("Line numbers only. Please press/query number, find the appropriate lines, then press/query reset.");
        }
    }

    /**
     * -------------------------------------------------------------------
     * LOAD
     * -------------------------------------------------------------------
     */

    async SpacerAutoInit(outer_wrapper){
        if (arguments.length >= 1){
            this.TREE = new SpacerTree(outer_wrapper, this);
        } else {
            console.log("error - no outer wrapper");
            return;
        }
        var TEXT;
        // let that = this;
        if (document.getElementById(this.TREE.ELEMENT_OUTER_WRAPPER).getAttribute('src')){
            await fetch(
                document.getElementById(this.TREE.ELEMENT_OUTER_WRAPPER).getAttribute('src')
            ).then(
                response => response.text()
            ).then(
                text => this.TREE.AutoInitialize(text)
            ).catch(
                exc => console.log("error fetching file " + exc)
            );
        } else {
            if (document.getElementById(this.TREE.ELEMENT_OUTER_WRAPPER)){
                var TEXT = document.getElementById(this.TREE.ELEMENT_OUTER_WRAPPER).innerHTML;
            }
            this.TREE.AutoInitialize(TEXT);
        }
    }
    async SpacerAutoLoad(src){
        // load from file
        console.log(`fetching ${src}`);
        src = escape(src);
        let that = this;
        fetch(src).then(
            response => response.text()
        ).then(
            text => {
                that.TEMP = text;
                console.log("set temp");
            }
        ).catch(
            exc => console.log("error in auto load " + exc)
        );
    }
    SpacerAutoLoadFromToolbar(){
        // load from copy/paste
        var datatree = this.TREE? this.TREE : this;
        if (datatree){
            datatree.LoadFromToolbar();
        }
    }
    SpacerGetOnload(datatree){
        // print tree file
        var result = "";
        result += "onload = function(){ ";
        result += "SPACER.REPRESS_ALERTS = " + !!this.REPRESS_ALERTS + "; ";
        result += "SPACER.TAB = \"" + this.TAB + "\"; ";
        result += "SPACER.TOOLBAR_ALIGN = \"" + datatree.TOOLBAR_ALIGN + "\"; ";
        result += "SPACER.TOOLBAR_STYLE = \"" + this.TOOLBAR_STYLE + "\"; ";
        result += "SPACER.GO_TO_FILE = \"" + this.GO_TO_FILE + "\"; ";
        result += this.PRINT_EXTRA_SCRIPT_BEFORE;
        result += "SPACER.PLEASE_WAIT = true;SPACER.AutoInit('" + datatree.NAME + "');";
        result += this.PRINT_EXTRA_SCRIPT_AFTER;
        result += "SPACER.TREE.ACCORDION = " + parseInt(datatree.ACCORDION) + "; ";
        result += "SPACER.TREE.LETTERING = \"" + datatree.LETTERING + "\"; ";
        result += "SPACER.TREE.HIGHLIGHT_BACKGROUND_COLOR = \"" + datatree.HIGHLIGHT_BACKGROUND_COLOR + "\"; ";
        result += "SPACER.TREE.HIGHLIGHT_TEXT_COLOR = \"" + datatree.HIGHLIGHT_TEXT_COLOR + "\"; ";
        result += "SPACER.PRINT_EXTRA_SCRIPT_BEFORE = \"" + this.PRINT_EXTRA_SCRIPT_BEFORE.split("\"").join("\\\"") + "\"; ";
        result += "SPACER.PRINT_EXTRA_SCRIPT_AFTER = \"" + this.PRINT_EXTRA_SCRIPT_AFTER.split("\"").join("\\\"") + "\"; ";
        result += "}";
        return result;
    }

    /**
     * ------------------------------------------------------
     * HYPERTREE MANAGER
     * ------------------------------------------------------
     */

    SpacerGetTreeFromName(name){
        var tree = null;
        if (document.getElementById(name)){
            for (var count = 0; count < this.TREES.length; ++count){
                var t = this.TREES[count];
                if (t.NAME == name){
                    tree = t;
                    break;
                }
            }
        }
        return tree;
    }
    SpacerSetTreeFromName(name){ // 9.6
        if (name != this.TREE.NAME){
            var tree = this.GetTreeFromName(name);
            if (tree != null){
                this.TREE = tree;
                if (this.TREES.length > 1){
                    SpacerHighlightTree(name);
                }
            }
        }
    }
    SpacerHighlightTree(name){ // 9.6
        try{
            for (let t in this.TREES){
                document.getElementById(this.TREES[t].NAME).style.border = "1px solid white";
            }
            var tree = document.getElementById(name);
            tree.style.border = "1px solid green";
        }catch(exc){
        }
    }



    /**
     * ---------------------------------------------------------
     * MENU
     * ---------------------------------------------------------
     */

    SpacerAutoToolbarSelect(choice){
        var TOOLBARTREE = this.TREE;
        if (TOOLBARTREE == null || TOOLBARTREE == "undefined"){
            TOOLBARTREE = this.TREES[0];
            if (TOOLBARTREE == null || TOOLBARTREE == "undefined"){
                return;
            }
        }
        var combobox;
        var selection;
        if (arguments.length > 0 && choice != ""&& choice != null && choice != "undefined"){
            selection = choice;
        } else {
            combobox = document.getElementById(TOOLBARTREE.TOOLBAR_SELECT_NAME);
            selection = combobox.options[combobox.selectedIndex].value;
        }
        if (selection == 'EDIT'){ return; }
        if (selection != 'undo' && selection != 'redo' && selection != 'close'){
            TOOLBARTREE.UNDO = document.getElementById(TOOLBARTREE.ELEMENT_INNER_WRAPPER).innerHTML;//TOOLBARTREE.ViewGetList();
            var span = TOOLBARTREE.MOUSE_DRAG_SPANS.length > 0? TOOLBARTREE.MOUSE_DRAG_SPANS[0] : TOOLBARTREE.SELECTED_SPAN;
            if (!span){ return; }
        }
        switch (selection){
            case "close":
                this.CloseMenu();
                return;
                break;
            case "overwrite":
                if (TOOLBARTREE.MOUSE_DRAG_SPANS.length > 1){
                    combobox.selectedIndex = 0;
                    return;
                }
                this.SetInitiator(TOOLBARTREE);
                this.ShowEditBox(TOOLBARTREE.CLICK_X, TOOLBARTREE.CLICK_Y, TOOLBARTREE.SELECTED_SPAN,'overwrite');
                break;
            case "child":
                if (TOOLBARTREE.MOUSE_DRAG_SPANS.length > 1){
                    combobox.selectedIndex = 0;
                    return;
                }
                this.SetInitiator(TOOLBARTREE);
                this.ShowEditBox(TOOLBARTREE.CLICK_X, TOOLBARTREE.CLICK_Y, TOOLBARTREE.SELECTED_SPAN,'child');
                break;
            case "sibling":
                if (TOOLBARTREE.MOUSE_DRAG_SPANS.length > 1){
                    combobox.selectedIndex = 0;
                    return;
                }
                this.SetInitiator(TOOLBARTREE);
                this.ShowEditBox(TOOLBARTREE.CLICK_X, TOOLBARTREE.CLICK_Y, TOOLBARTREE.SELECTED_SPAN,'sibling');
                break;
            case "up":
                if (TOOLBARTREE.MOUSE_DRAG_SPANS.length > 1){
                    combobox.selectedIndex = 0;
                    return;
                }
                TOOLBARTREE.SpacerView.View("up");
                break;
            case "down":
                if (TOOLBARTREE.MOUSE_DRAG_SPANS.length > 1){
                    combobox.selectedIndex = 0;
                    return;
                }
                TOOLBARTREE.SpacerView.View("down");
                break;
            case "section right":
                if (TOOLBARTREE.MOUSE_DRAG_SPANS.length == 0){
                    if (TOOLBARTREE.SELECTED_SPAN == null || TOOLBARTREE.SELECTED_SPAN == "undefined" || TOOLBARTREE.SELECTED_SPAN.innerHTML == ""){
                        combobox.selectedIndex = 0;
                        return;
                    } else {
                        TOOLBARTREE.MOUSE_DRAG_SPANS.push(TOOLBARTREE.SELECTED_SPAN);
                    }
                }
                TOOLBARTREE.SpacerView.View("secright");
                break;
            case "selection right":
                if (TOOLBARTREE.MOUSE_DRAG_SPANS.length == 0){
                    if (TOOLBARTREE.SELECTED_SPAN == null || TOOLBARTREE.SELECTED_SPAN == "undefined" || TOOLBARTREE.SELECTED_SPAN.innerHTML == ""){
                        combobox.selectedIndex = 0;
                        return;
                    } else {
                        TOOLBARTREE.MOUSE_DRAG_SPANS.push(TOOLBARTREE.SELECTED_SPAN);
                    }
                }
                TOOLBARTREE.SpacerView.View("selright");
                break;
            case "left":
                if (TOOLBARTREE.MOUSE_DRAG_SPANS.length == 0){
                    if (TOOLBARTREE.SELECTED_SPAN == null || TOOLBARTREE.SELECTED_SPAN == "undefined" || TOOLBARTREE.SELECTED_SPAN.innerHTML == ""){
                        combobox.selectedIndex = 0;
                        return;
                    } else {
                        TOOLBARTREE.MOUSE_DRAG_SPANS.push(TOOLBARTREE.SELECTED_SPAN);
                    }
                }
                TOOLBARTREE.SpacerView.View("left");
                break;
            case "copy selected":
                if (TOOLBARTREE.MOUSE_DRAG_SPANS.length == 0){
                    if (TOOLBARTREE.SELECTED_SPAN == null || TOOLBARTREE.SELECTED_SPAN == "undefined" || TOOLBARTREE.SELECTED_SPAN.innerHTML == ""){
                        combobox.selectedIndex = 0;
                        return;
                    } else {
                        TOOLBARTREE.MOUSE_DRAG_SPANS.push(TOOLBARTREE.SELECTED_SPAN);
                    }
                }
                if (this.WAIT_IS_OPEN != true){
                    var wait = this.Wait();
                    setTimeout(function(){
                        var tree = TOOLBARTREE;
                        if (tree.MOUSE_DRAG_SPANS.length > 0){
                            this.CLIPBOARD.length = 0;
                            TOOLBARTREE.SpacerView.View("copysel");
                        }
                        if (this.GetBrowser() == "IE"){
                            if (document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME)){
                                document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME).select();
                            }
                        }
                        this.CloseWaitBox(wait);
                    }.bind(this), 1);
                }
                break;
            case "copy w/children":
            case "copy with children":
            case "cut":
                if (TOOLBARTREE.MOUSE_DRAG_SPANS.length == 0){
                    if (TOOLBARTREE.SELECTED_SPAN == null || TOOLBARTREE.SELECTED_SPAN == "undefined" || TOOLBARTREE.SELECTED_SPAN.innerHTML == ""){
                        combobox.selectedIndex = 0;
                        return;
                    } else {
                        TOOLBARTREE.MOUSE_DRAG_SPANS.push(TOOLBARTREE.SELECTED_SPAN);
                    }
                }
                if (this.WAIT_IS_OPEN != true){
                    var wait = this.Wait();
                    setTimeout(function(){
                        var tree = TOOLBARTREE;
                        var index = 0;
                        var index_above;
                        if (tree.MOUSE_DRAG_SPANS.length > 0){
                            if (selection == "cut"){
                                TOOLBARTREE.SpacerView.View("cut");
                            } else {
                                TOOLBARTREE.SpacerView.View("copysec");
                            }
                        }
                        if (this.GetBrowser() == "IE"){
                            if (document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME)){
                                document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME).select();
                            }
                        }
                        this.CloseWaitBox(wait);
                    }.bind(this), 1);
                }
                break;
            case "paste":
                if (TOOLBARTREE.MOUSE_DRAG_SPANS.length == 0){
                    if (TOOLBARTREE.SELECTED_SPAN == null || TOOLBARTREE.SELECTED_SPAN == "undefined" || TOOLBARTREE.SELECTED_SPAN.innerHTML == ""){
                        combobox.selectedIndex = 0;
                        return;
                    } else {
                        TOOLBARTREE.MOUSE_DRAG_SPANS.push(TOOLBARTREE.SELECTED_SPAN);
                    }
                }
                if (this.CLIPBOARD.length == 0 || !TOOLBARTREE.SELECTED_SPAN){
                    combobox.selectedIndex = 0;
                    return;
                }
                if (this.WAIT_IS_OPEN != true){
                    var wait = this.Wait();
                    setTimeout(function(){
                        var tree = TOOLBARTREE;
                        var index = 0;
                        var index_above = 0;
                        if (tree && tree.SELECTED_SPAN && this.CLIPBOARD.length > 0){
                            TOOLBARTREE.SpacerView.View("paste");
                            this.CLIPBOARD.length = 0;
                        }
                        if (this.GetBrowser() == "IE"){
                            if (document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME)){
                                document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME).select();
                            }
                        }
                        this.CloseWaitBox(wait);
                    }.bind(this), 1);
                }
                break;
            case "remove":
                if (TOOLBARTREE.MOUSE_DRAG_SPANS.length > 1){
                    combobox.selectedIndex = 0;
                    return;
                }
                TOOLBARTREE.SpacerView.View("remove");
                break;
            case "undo":
                if (TOOLBARTREE.UNDO == null || TOOLBARTREE.UNDO == "undefined"){ TOOLBARTREE.ResetToolbarSelect();return; }
                TOOLBARTREE.REDO = document.getElementById(TOOLBARTREE.ELEMENT_INNER_WRAPPER).innerHTML;//TOOLBARTREE.ViewGetList();
                document.getElementById(TOOLBARTREE.ELEMENT_INNER_WRAPPER).innerHTML = TOOLBARTREE.UNDO;
                TOOLBARTREE.SELECTED_SPAN = null;
                combobox.selectedIndex = 0;
                break;
            case "redo":
                if (TOOLBARTREE.REDO == null || TOOLBARTREE.REDO == "undefined"){ TOOLBARTREE.ResetToolbarSelect();return; }
                document.getElementById(TOOLBARTREE.ELEMENT_INNER_WRAPPER).innerHTML = TOOLBARTREE.REDO;
                TOOLBARTREE.SELECTED_SPAN = null;
                combobox.selectedIndex = 0;
                break;
            default:
                break;
        }
    }
    CloseMenu(){
        document.body.removeChild(document.getElementById('spacer_menu'));
    }
    SpacerMenuMouseClick(evt,index){
        if (!evt){
            evt = window.event;
        }
        var targ = evt.target? evt.target : evt.srcElement;
        if (targ){
            document.getElementById(this.TREE.TOOLBAR_SELECT_NAME).setAttribute('selectedIndex',index);
            this.ToolbarSelect(targ.className);
        }
    }
    SpacerMenuMouseOver(evt){
        if (!evt){
            evt = window.event;
        }
        var targ = evt.target? evt.target : evt.srcElement;
        if (targ){
            targ.style.backgroundColor = 'gray';
        }
    }
    SpacerMenuMouseOut(evt){
        if (!evt){
            evt = window.event;
        }
        var targ = evt.target? evt.target : evt.srcElement;
        if (targ){
            targ.style.backgroundColor = '';
        }
        var clientX = evt.clientX;
        var clientY = evt.clientY;
        var menu = document.getElementById(this.TREE.TOOLBAR_SELECT_NAME);
        var x = menu.offsetLeft;
        var y = menu.offsetTop;
        var p = menu.offsetParent;
        while (p != document.body){
            x += p.offsetLeft;
            y += p.offsetTop;
            p = p.offsetParent;
        }
        if (document.documentElement.scrollLeft){
            x -= document.documentElement.scrollLeft;
            y += document.documentElement.scrollTop;
        } else if (document.body.scrollLeft){
            x -= document.body.scrollLeft;
            y += document.body.scrollTop;
        }
        if (clientX < x || clientX > x + menu.offsetWidth){
            if (clientY < y || clientY > y + menu.offsetHeight){
                this.CloseMenu();
            }
        }
    }

    /**
     * ------------------------------------------------------------
     * POPUP BOX
     * ------------------------------------------------------------
     */

    SpacerShowPopupBox(popup_text, timing, x, y) {
        try{
            let adjust = false;
            if (arguments.length < 2){
                timing = 100000;
                x = window.innerWidth/2;
                y = window.innerHeight/2;
                adjust = true;
            } else if (arguments.length < 4){
                x = window.innerWidth/2;
                y = window.innerHeight/2;
                adjust = true;
            }
            if (adjust == true){
                if (document.documentElement.scrollTop){
                    y += document.documentElement.scrollTop;
                    x += document.documentElement.scrollLeft;
                } else if (document.body.scrollTop){
                    y += document.body.scrollTop;
                    x += document.body.scrollLeft;
                }
            }
            var datatree = this.TREE? this.TREE : this;
            this.ClosePopupBox();
            if (this.REPRESS_ALERTS == true) { return; }
            if (document.getElementById) {
                if (document.getElementById('spacer_popupbox')){
                    document.getElementById('spacer_popupbox').parentNode.removeChild(document.getElementById('spacer_popupbox'));
                }
                var box = document.createElement('div');
                box.id = 'spacer_popupbox';
                box.style.position = "absolute";
                box.style.zIndex = "100";
                box.style.display = "none";
                box.style.border = this.POPUP_BORDER;
                box.style.overflow = "auto";
                box.style.borderRadius = "20px";
                box.style.padding = "15px";
                box.style.background = "#f5f2eb";
                box.style.maxWidth = "200px";
                box.innerHTML = "<div onclick='return SPACER.ClosePopupBox();' id='spacer_closebutton' style='position:relative;color:red;font-size:1em;top:0px;right:0px;float:right;margin:3px;border:1px dotted red;padding:3px;'>X</div><p id='spacer_popup_message'></p>";
                document.body.appendChild(box);
                if (box) {
                    let message_text = document.getElementById("spacer_popup_message");
                    if (message_text) {
                        var txts = popup_text.split("\n");
                        message_text.innerHTML = "";
                        for (let txt in txts) {
                            var s = document.createTextNode(txts[txt]);
                            message_text.appendChild(s);
                            var br = document.createElement("br");
                            message_text.appendChild(br);
                        }
                    }
                    box.style.display = "block";
                    var boxwidth = box.offsetWidth;
                    var boxheight = box.offsetHeight;
                    if (x - (boxwidth/2) >= 0){
                        x -= (boxwidth/2);
                    }
                    if (y - (boxheight/2) >= 0){
                        y -= (boxheight/2);
                    }
                    box.style.left = x + "px";
                    box.style.top = y + "px";
                    window.clearTimeout(this.TIMER);
                    this.TIMER = setTimeout(this.ClosePopupBox, timing).bind(this);
                }
            }
        } catch (exc) {  }
    }
    ClosePopupBox() {
        if (document.getElementById) {
            let box = document.getElementById("spacer_popupbox");
            if (box) {
                box.style.display = "none";
                if (this.TIMER) {
                    window.clearTimeout(this.TIMER);
                }
            }
        }
    }
    ShowEditBox(x, y, source, toolbar) {
        try{
            var datatree;
            if (this.TREE){
                datatree = this.TREE;
            } else if (this){
                datatree = this;
            }
            if (document.documentElement.scrollTop){
                y += document.documentElement.scrollTop;
                x += document.documentElement.scrollLeft;
            } else if (document.body.scrollTop){
                y += document.body.scrollTop;
                x += document.body.scrollLeft;
            }
            if (this.REPRESS_EDITS == true) { return; }
            while (source.nodeName.toLowerCase() != "span" || source.className != "spacer_content"){
                source = source.parentNode;
            }
            if (document.getElementById('spacer_editbox')){
                document.getElementById('spacer_editbox').parentNode.removeChild(document.getElementById('spacer_editbox'));
            }
            var box = document.createElement('div');
            box.id = 'spacer_editbox';
            box.span = source;
            box.style.position = "absolute";
            box.style.zIndex = "100";
            box.style.display = "none";
            box.style.height = "100px";
            box.style.width = "400px";
            box.style.border = this.POPUP_BORDER;
            box.style.overflow = "auto";
            box.style.borderRadius = "20px";
            box.style.padding = "10px 10px 0px 10px";
            box.style.background = this.POPUP_BACKGROUND;
            var datatree;
            var radio = "";
            var info = "";
            var reset = "<button type='button' onclick='return SPACER.ResetEditBox();'>reset</button>";
            var equation = "";
            var delimiter = "&nbsp;&nbsp;&nbsp;";
            if (datatree){
                if (datatree.TYPE != "text"){ // 7.9.4
                    radio = "<input type='radio' name='spacer_text_or_html' value='text'>text</input><input type='radio' name='spacer_text_or_html' value='html' checked='checked'>html</input>";
                    equation = "<a href='https://codecogs.com/latex/eqneditor.php' target='_blank'>equation</a>";
                }
            }
            if (arguments.length == 4){
                var displaytext = this.StringTrim(source.innerHTML);
                if (toolbar == "insert"){
                    displaytext = "";
                }
                box.innerHTML = "<table><tr><td><span onclick='return SPACER.CloseEditBox();' class='spacer_close_editorbutton' style='position:relative;color:red;font-size:1em;border:1px dotted red;padding:3px;'>X</span><label>&nbsp;&nbsp;&nbsp;</label>" + delimiter + reset + delimiter + radio + info + delimiter + equation + delimiter + "<button type='button' id='spacer_editbox_button' onclick='return spacer_submit_from_toolbar(event);'>" + toolbar + "</button><span onclick='return SPACER.CloseEditBox();' class='spacer_close_editorbutton' style='position:relative;float:right;color:red;font-size:1em;border:1px dotted red;padding:3px;'>X</span></td></tr><tr><td><textarea id='spacer_editor' rows='3' cols='40'>" + displaytext + "</textarea></td></tr></table>";
            } else {
                return;
            }
            document.body.appendChild(box);
            if (box) {
                box.style.display = "block";
                let boxwidth = box.offsetWidth;
                let boxheight = box.offsetHeight;
                let screenwidth = window.innerWidth;
                let screenheight = window.innerHeight;
                if (x < 0){
                    x = x + boxwidth;
                } else if (x + boxwidth > screenwidth){
                    x = x - boxwidth;
                } else if (y < 0){
                    y = y + boxheight;
                } else if (y + boxheight > screenheight){
                    y = y - boxheight;
                }
                box.style.left = x + "px";
                box.style.top = y + "px";
            } else {  }
        } catch (exc) {
            console.log("exception " + exc);
        }
    }
    CloseEditBox() {
        var box = document.getElementById("spacer_editbox");
        if (box) {
            box.style.display = "none";
            box.parentNode.removeChild(box);
        }
        if (document.getElementById(this.TREE.TOOLBAR_SELECT_NAME)){
            document.getElementById(this.TREE.TOOLBAR_SELECT_NAME).selectedIndex = 0;
        }
    }
    ResetEditBox(){
        document.getElementById('spacer_editor').innerHTML = "";
    }
    SpacerGetPopupEditInitiator(){
        return this.POPUP_EDIT_INITIATOR;
    }
    SpacerSetPopupEditInitiator(initiator){
        this.POPUP_EDIT_INITIATOR = initiator;
    }

    /**
     * ------------------------------------------------------------------------
     * OTHER TOOLBAR OPTIONS
     * ------------------------------------------------------------------------
     */

    Collapse(evt){
        if (!evt){ evt = window.event; }
        if (evt){
            evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
        }
        if (this.TREE){
            this.TREE.Query("COLLAPSE");
        }
    }
    Expand(evt){
        if (!evt){ evt = window.event; }
        if (evt){
            evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
        }
        if (this.TREE){
            this.TREE.Query("EXPAND");
        }
    }
    SpacerAutoReplace(){
        if (window.event){
            window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
        }
        if (this.TREE){
            var replace = document.getElementById(this.TREE.TOOLBAR_REPLACE_NAME).value;
            var replace_with = document.getElementById(this.TREE.TOOLBAR_REPLACE_WITH_NAME).value;
            if (this.StringTrim(replace) != "" && this.StringTrim(replace_with) != ""){
                this.TREE.Query("WITH " + replace_with);
                this.TREE.Query("REPLACE " + replace);
            } else if (this.StringTrim(replace) == "" && this.StringTrim(replace_with) == ""){
                this.TREE.Query("REPLACE");
            }
        }
    }
    SpacerAutoSkip(){
        if (window.event){
            window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
        }
        if (this.TREE){
            this.TREE.Query('SKIP');
        }
    }
    SpacerAutoSearch(evt){
        if (!evt){ evt = window.event; }
        if (evt){
            evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
        }
        if (this.TREE){
            var searchterm = document.getElementById(this.TREE.TOOLBAR_SEARCHBOX_NAME).value;
            if (this.StringTrim(searchterm) != ""){
                var options = "";
                var cas = document.getElementById('spacer_case');
                var exact = document.getElementById('spacer_exact');
                if (cas && cas.checked == true){
                    options += "CASE_SENSITIVE ";
                }
                if (exact && exact.checked == true){
                    options += "EXACT_MATCHES ";
                }
                this.TREE.Query("SEARCH " + options + "FOR " + searchterm);
            }
        }
    }
    SpacerAutoNext(evt){
        if (!evt){ evt = window.event; }
        if (evt){
            evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
        }
        if (this.TREE){
            this.TREE.Query("NEXT");
        }
    }
    SpacerAutoPrevious(evt){
        if (!evt){ evt = window.event; }
        if (evt){
            evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
        }
        if (this.TREE){
            this.TREE.Query("PREVIOUS");
        }
    }
    SpacerAutoQuery(evt){
        if (window.event){
            window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
        } else if (evt){
            evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
        }
        if (this.TREE){
            var query = document.getElementById(this.TREE.TOOLBAR_QUERYWINDOW_NAME).value;
            if (this.StringTrim(query) != ""){
                this.TREE.Query(query);
            }
        }
    }
    SpacerAutoNumber(){
        if (window.event){
            window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
        }
        if (this.TREE){
            this.TREE.Query("NUMBER");
        }
    }
    SpacerAutoReset(evt){
        if (!evt){ evt = window.event; }
        if (evt){
            evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
        }
        if (this.TREE){
            if (document.getElementById(this.TREE.TOOLBAR_QUERYWINDOW_NAME)){
                document.getElementById(this.TREE.TOOLBAR_QUERYWINDOW_NAME).value = "";
            }
            this.TREE.Query("CLEAR ALL");
        }
    }
    SpacerAutoPrintHtml(){
        if (window.event){
            window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
        }
        if (this.TREE){
            this.TREE.Query("PRINT HTML");
        }
    }
    SpacerAutoSave(){
        if (window.event){
            window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
        }
        if (this.TREE){
            this.TREE.Query("PRINT HTML");
        }
    }
    SpacerAutoPrintText(){
        if (window.event){
            window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
        }
        if (this.TREE){
            this.TREE.Query("PRINT TEXT");
        }
    }
    SpacerAutoPrintList(){
        if (window.event){
            window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
        }
        if (this.TREE){
            this.TREE.Query("PRINT LIST");
        }
    }
    SpacerAutoPrintFile(){
        if (window.event){
            window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
        }
        if (this.TREE){
            this.TREE.Query("PRINT FILE");
        }
    }

    /**
     * --------------------------------------------------------
     * WAIT BOX
     * --------------------------------------------------------
     */

    SpacerWait(){
        var tree = this.TREE;
        var name = this.TREE.NAME;
        var x = document.getElementById(name).offsetLeft;
        var y = document.getElementById(name).offsetTop;
        var _parent = document.getElementById(name).offsetParent;
        if (_parent){
            while (_parent != document.body){
                x += _parent.offsetLeft;
                y += _parent.offsetTop;
                _parent = _parent.offsetParent;
            }
        }
        var xcenter = document.getElementById(name).offsetWidth/3;
        var ycenter = document.getElementById(name).offsetHeight/3;
        var scrollL = 0;
        var scrollT = 0;
        if (document.documentElement.scrollTop){
            scrollT = document.documentElement.scrollTop;
            scrollL = document.documentElement.scrollLeft;
        } else if (document.body.scrollTop){
            scrollT = document.body.scrollTop;
            scrollL = document.body.scrollLeft;
        }
        if (x + document.getElementById(name).offsetWidth <= window.innerWidth + scrollL){
            x += xcenter;
        }
        if (y + document.getElementById(name).offsetHeight <= window.innerHeight + scrollT){
            y += ycenter;
        }
        var browser = this.GetBrowser();
        if (browser == "Firefox"){
            this.WAIT_IS_OPEN = true;
            this.ShowPopupBox("PLEASE WAIT...", 100000, x, y);
            return "popup";
        } else if (browser == "Chrome"){
            this.WAIT_IS_OPEN = true;
            this.ShowPopupBox("PLEASE WAIT...", 100000, x, y);
            return "popup";
        } else if (browser == "Safari"){
            this.WAIT_IS_OPEN = true;
            this.ShowPopupBox("PLEASE WAIT...", 100000, x, y);
            return "popup";
        } else if (browser == "Edge" || browser == "IE"){
            this.WAIT_IS_OPEN = true;
            this.ShowPopupBox("PLEASE WAIT...", 100000, x, y);
            return "popup";
        }
    }
    CloseWaitBox(wait){
        this.WAIT_IS_OPEN = false;
        if (wait != null) {
            if (wait == "popup"){
                this.ClosePopupBox();
            } else {
                wait.close();
            }
        }
    }

    /**
     * -----------------------------------------------------------------
     * CONTEXT MENU
     * -----------------------------------------------------------------
     */

    SpacerRightClick(){
        if (this.BACKSPACE_ALLOWED == true){
            return;
        }
        var message = "SPACER v10.2\nCopyright &copy; 2015 Derek James Smith";
        var evt = window.event;
        var popupx = evt.clientX;
        var popupy = evt.clientY;
        var popup_wait = 10000;
        this.ContextMenu(message, popup_wait, popupx, popupy);
        return false;
    }
    ContextMenu(popup_text, timing, x, y) {
        try{
            if (document.documentElement.scrollTop){
                y += document.documentElement.scrollTop;
                x += document.documentElement.scrollLeft;
            } else if (document.body.scrollTop){
                y += document.body.scrollTop;
                x += document.body.scrollLeft;
            }
            var datatree = this.TREE? this.TREE : this;
            this.CloseContextMenu();
            if (document.getElementById) {
                if (document.getElementById('spacer_contextmenu')){
                    document.getElementById('spacer_contextmenu').parentNode.removeChild(document.getElementById('spacer_contextmenu'));
                }
                var box = document.createElement('div');
                box.id = 'spacer_contextmenu';
                box.style.position = "absolute";
                box.style.zIndex = "100";
                box.style.display = "none";
                box.style.border = "1px solid gray";
                box.innerHTML = "<select style='background-color:#f5f2eb;overflow:visible;' id='spacer_context_message' onmouseover='return SPACER.FocusContextMenu();' onblur='return SPACER.CloseContextMenu();' multiple='multiple'></select>";
                document.body.appendChild(box);
                if (box) {
                    box.style.display = "block";
                    if (true){
                        box.style.left = (x - 10) + "px";
                        box.style.top = (y - 10) + "px";
                    } else if (false)
                    {
                        let boxwidth = box.offsetWidth;
                        let boxheight = box.offsetHeight;
                        box.style.left = (x - (boxwidth/2)) + "px";
                        box.style.top = (y - boxheight) + "px";
                    }
                    let message_text = document.getElementById("spacer_context_message");
                    if (message_text) {
                        var txts = popup_text.split("\n");
                        message_text.innerHTML = "";
                        var message = "";
                        for (let txt in txts) {
                            message += "<option value=''>";
                            message += txts[txt];
                            message += "</option>";
                        }
                        message_text.innerHTML = message;
                    }
                    window.clearTimeout(this.TIMER);
                    this.TIMER = setTimeout(this.ClosePopupBox, timing).bind(this);
                }
            }
        } catch (exc) {  }
    }
    FocusContextMenu(){
        if (document.getElementById('spacer_context_message')){
            document.getElementById('spacer_context_message').focus();
        }
    }
    CloseContextMenu() {
        if (document.getElementById('spacer_contextmenu')) {
            let box = document.getElementById("spacer_contextmenu");
            if (box) {
                box.style.display = "none";
                if (this.TIMER) {
                    window.clearTimeout(this.TIMER);
                }
            }
        }
    }


    /**
     * --------------------------------------------------------------------
     * FILES AND REQUESTS
     * --------------------------------------------------------------------
     */

    SpacerGoToFile(line){
        if (this.GO_TO_FILE != null && this.GO_TO_FILE != "undefined" && this.GO_TO_FILE != ""){
            this.TEMP = line.innerHTML;
            eval(this.GO_TO_FILE);
        }
    }

    /**
     * -------------------------------------------------------------------
     * PRESENTATION
     * -------------------------------------------------------------------
     */

    EncodeArrows(txt,spans){//8.0
        var result = txt;
        if (this.TREE != null && this.TREE != "undefined" && this.TREE.TYPE.toLowerCase() != "text"){
            if (arguments.length == 0 || spans == true){
                result = txt.split("&amp;nbsp;").join(" ").split("&nbsp;").join(" ").split(" &lt; ").join(" < ").split(" &gt; ").join(" > ").split(" &lt;= ").join(" <= ").split(" &gt;= ").join(" >= ").split(" < ").join(" <span><</span> ").split(" <= ").join(" <span><</span>= ").split(" > ").join(" <span>></span> ").split(" >= ").join(" <span>></span>= ");
                // do not remove blanks from around the arrows, or add blanks inside the spans, or else a second encoding would put double-spans around the first spans
            } else {
                result = txt.split("&amp;nbsp;").join(" ").split("&nbsp;").join(" ").split(" &lt; ").join(" < ").split(" &gt; ").join(" > ").split(" &lt;= ").join(" <= ").split(" &gt;= ").join(" >= ").split(" < ").join(" &lt; ").split(" <= ").join(" &lt;= ").split(" > ").join(" &gt; ").split(" >= ").join(" &gt;= ");
            }
        }
        return result;
    }

    /**
     * ------------------------------------------------------------
     * UTILITIES
     * ------------------------------------------------------------
     */

    SpacerAllowBackspace(){
        this.BACKSPACE_ALLOWED = true;
    }
    SpacerDisallowBackspace(){
        this.BACKSPACE_ALLOWED = false;
    }
    SpacerStripTagsPHPJS(input, allowed) { // phpjs.org/functions/strip_tags/
        allowed = (((allowed || '') + '')
            .toLowerCase()
            .match(/<[a-z][a-z0-9]*>/g) || [])
            .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
            commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        return input.replace(commentsAndPhpTags, '')
            .replace(tags, function ($0, $1) {
                return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
            });
    }
    GetBrowser(){
        var result = "unknown";
        if (navigator.appName == 'Microsoft Internet Explorer' || navigator.userAgent.indexOf("IE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0){
            result = "IE";
        } else if (navigator.userAgent.indexOf("Edge") >= 0){
            result = "Edge";
        } else if (navigator.userAgent.indexOf("Chrome") >= 0){
            result = "Chrome";
        } else if (navigator.userAgent.indexOf("Firefox") >= 0){
            result = "Firefox";
        } else if (navigator.appName == "Netscape" || navigator.userAgent.indexOf("Safari") >= 0){
            result = "Safari";
        }
        return result;
    }
    SpacerRemoveTables(html){
        try{
            var div = document.createElement('div');
            div.innerHTML = html;
            while (div.getElementsByTagName('table').length > 0){
                var tbl = div.getElementsByTagName('table')[0];
                if (tbl){
                    div.removeChild(tbl);
                } else {
                }
            }
            /**
             var tables = div.getElementsByTagName('table');
             for (var count = 0; count < tables.length; ++count){
        var t = tables[count];
        div.removeChild(t);
        --count;
    }
             **/
            html = div.innerHTML;
        } catch (exc) { }
        return html;
    }
    SpacerRemoveTableWrappers(lines){
        var newlines = new Array();
        for (var count = 0; count < lines.length; ++count){
            var l = lines[count];
            var outer = this.TREE.GetOuterElement(l);
            if (l.indexOf("<table ") >= 0 && outer.toUpperCase() != "TABLE"){
                if (outer.toUpperCase() == "P"){
                    l = l.substring(l.indexOf(">") + 1, l.lastIndexOf("<"));
                }
            }
            newlines.push(l);
        }
        return newlines;
    }
    SpacerStripTagWithClassNameLeaveInner(text, tag, name){
        var result = text;
        var div = document.createElement("div");
        div.innerHTML = text;
        var tags = div.getElementsByTagName(tag);
        if (tags.length > 0){
            var tag = null;
            for (var count = 0; count < tags.length; ++count){
                if (tags[count].className == name){
                    tag = tags[count];
                    break;
                }
            }
            if (tag != null){
                var save = div.innerHTML;
                div.innerHTML = "";
                div.appendChild(tag);
                var tag_inner = tag.innerHTML;
                save = save.split(div.innerHTML).join(tag_inner);
                result = save;
            }
        }
        return result;
    }
    SpacerStripTagLeaveInner(text, tag){
        var result = text;
        var div = document.createElement("div");
        div.innerHTML = text;
        var tags = div.getElementsByTagName(tag);
        if (tags.length > 0){
            var tag = tags[0];
            var save = div.innerHTML;
            div.innerHTML = "";
            div.appendChild(tag);
            var tag_inner = tag.innerHTML;
            save = save.split(div.innerHTML).join(tag_inner);
            result = save;
        }
        return result;
    }
    SpacerStripTags(line,remove_tables){ // remove tables when loading, don't when searching
        if (line.indexOf('table') >= 0){
            var div = document.createElement('div');
            div.innerHTML = line;
            var tables = div.getElementsByTagName('table');
            for (var count = 0; count < tables.length; ++count){
                var t = tables[count];
                if (arguments.length > 0 && remove_tables == true){
                    t.parentNode.removeChild(t);
                } else {
                    var span = document.createElement('span');
                    var tds = t.getElementsByTagName('td');
                    for (var count2 = 0; count2 < tds.length; ++count2){
                        var td = tds[count2];
                        var txt = td.innerHTML;
                        span.innerHTML = span.innerHTML + "&nbsp;" + txt;
                    }
                    span.innerHTML = span.innerHTML + "&nbsp;";
                    t.parentNode.replaceChild(span, t);
                }
            }
            line = div.innerHTML;
        }
        var result = "";
        var pause = false;
        /**
         for (var count = 0; count < line.length; ++count){
       var c = line.charAt(count);
       if (pause == false && c != '<' && c != '>'){
          result += c;
       } else if (c == '<' && ch+1 < line.length && line.charAt(ch+1).match(/[a-zA-Z!]/)){
          pause = true;
       } else if (c == '>'){
          pause = false; }
    }
         **/
        for (var count = 0; count < line.length; ++count){
            var c = line.charAt(count);
            if (pause == false && c != '<' && c != '>'){
                result += c;
            } else if (c == '<'){ // && count - 1 >= 0 && count + 1 < line.length && !(line.charAt(count - 1) == ' ' && line.charAt(count + 1) == ' ')){
                pause = true;
            } else if (c == '>'){ // && count - 1 >= 0 && count + 1 < line.length && !(line.charAt(count - 1) == ' ' && line.charAt(count + 1) == ' ')){
                pause = false;
            }
        }
        return result;
    }
    SpacerStringTrim(strng){
        if (strng == null || strng == "undefined"){
            if (this.REPRESS_ALERTS == false){ alert("error in string trim"); }
            return "";
        }
        var result = strng;
        var index = 0;
        for (var count = 0; count < result.length; ++count){
            var chr = result.charAt(count);
            if (!chr.match(/\S/)){
                ++index;
                continue;
            } else {
                break;
            }
        }
        if (index < result.length){
            result = result.substring(index, result.length);
        } else {
            result = ""; // if original string just one or more blanks
        }
        for (var count = result.length; count >= 0; --count){
            var chr = result.charAt(count);
            if (!chr.match(/\S/)){
                continue;
            } else {
                if (count < result.length){
                    result = result.substring(0, count + 1);
                }
                break;
            }
        }
        return result;
    }
    SpacerLeftStringTrim(strng){
        var result = "";
        var position = "left";
        for (var count = 0; count < strng.length; ++count){
            var chr = strng.charAt(count);
            if (chr.match(/\S/)){
                result += chr;
                position = "middle";
            } else if (position == "middle"){
                result += chr;
            }
        }
        return result;
    }
    SpacerRightStringTrim(strng){
        var result = "";
        var position = "left";
        for (var count = 0; count < strng.length; ++count){
            var chr = strng.charAt(count);
            if (chr.match(/\S/)){
                result += chr;
                position = "middle";
            } else if (strng.substring(count).split(" ").join("").split("\t").join("").split("\r").join("").split("\n").join("") == ""){ /** flaw - charcode 160 **/
            position = "right";
            } else if (position == "middle"){
                result += chr;
            } else {
                result += chr;
            }
        }
        return result;
    }
    SpacerRemoveEmptyEndTags(line){
        var break_starts = ["<p>", "<h1>", "<h2>", "<h3>", "<h4>", "<h5>", "<h6>", "<div>", "<table>", "<form>", "<ul>", "<ol>", "<li>", "<blockquote>"];
        var break_half_starts = ["<p ", "<h1 ", "<h2 ", "<h3 ", "<h4 ", "<h5 ", "<h6 ", "<div ", "<table ", "<form ", "<ul ", "<ol ", "<li ", "<blockquote "];
        var break_ends = ["</p>", "</h1>", "</h2>", "</h3>", "</h4>", "</h5>", "</h6>", "</div>", "</table>", "</form>", "</ul>", "</ol>", "</li>", "</blockquote>", "<br/>", "<br>", "<hr/>", "<hr>"];
        var result = "";
        var splits = line.split("<");
        for (var count = 0; count < splits.length; ++count){
            var s = "<" + splits[count];
            var ss = this.StringTrim(s);
            if (break_ends.indexOf(ss) >= 0 && !line.indexOf(break_starts[break_ends.indexOf(ss)]) >= 0){
                //
            } else {
                result += s;
            }
        }
        return result;
    }

    SpacerPreventDefault(evt){
        if (!evt){
            evt = window.event;
        }
        var keycode = evt.which || evt.keyCode || evt.charCode;
        var keypressed = String.fromCharCode(keycode);
        if (keycode == 13){
            if (this.GetBrowser().toLowerCase() != "edge"){
                window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
                var targ = evt.target? evt.target : evt.srcElement;
                var txt = targ.value;
                txt += "\n";
                targ.value = txt;
            }
        } else if (keycode == 8){
            //
        }
    }

    SpacerQueryDocumentation(){
        window.open(this.DOCUMENTATION_ADDRESS,"other");
    }

} // spacer
