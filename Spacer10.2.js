/**
 * author Derek James Smith
 */

/**
 * example scripts
 * <script type="text/javascript" src="Spacer.js"></script>
 * <script type='text/javascript' src='SpacerTree.js'></script>
 * <script type='text/javascript' src='SpacerView.js'></script>
 * <script type='text/javascript' src='SpacerBranch.js'></script>
 * <script type='text/javascript'>
 * let SPACER = new Spacer();
 * onload = () => { SPACER.AutoInit("DATATREE"); }
 * </script>
 * example html
 * <div id="DATATREE" src="input.txt" type="text" toolbar="collapse,expand,search_horizontal,reset" treeheight="500px"/>
 * example input.txt
 * one
 *    two
 *    three
 *    four
 * five
 ` */

/** starts with data model to build first view, returns tree object **/
/** data models: tree, linear nodes array, content outline **/
/** after initialization, View-Controller model only **/
/** list model: ul:li:(a:span:ul) WARNING:"a" could have span and nested ul **/

class Spacer {
    constructor() {
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
        this.ResizeEditBox = this.ResizeEditBox;
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
        this.ADDRESS = "https://hihohub.github.io/spacer/versions/Spacer10.2.js";
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
        this.DEFAULT_EMPTY_ICON = "<span class='empty'>&EmptySmallSquar</span>";
        this.DEFAULT_GO_TO_FILE = "if(this.TEMP.toLowerCase().indexOf('.txt')>=0 || this.TEMP.toLowerCase().indexOf('.html')>=0 || this.TEMP.toLowerCase().indexOf('.htm')>=0){this.TREE.Query('LOAD ' + this.TEMP);this.GO_TO_FILE = '';this.WENT_TO_FILE = true;this.TREE.Query('collapse');};";
        this.DEFAULT_HIGHLIGHT_BACKGROUND_COLOR = "hsl(0,0%,60%)";
        this.DEFAULT_HIGHLIGHT_TEXT_COLOR = "white";
        this.DEFAULT_OPEN_ICON = "<span class='open'>&dArr;</span>";
        this.DEFAULT_SKIP_MESSAGE = "***** PLEASE WAIT *****";
        this.DEFAULT_TOOLBAR_ALIGN = "left";
        this.DEFAULT_TOOLBAR_TOOLS = "collapse,expand,search_horizontal,next,previous,resets,edit,replace,alphabetize,query,number";
        this.DOCUMENTATION_ADDRESS = "https://hihohub.github.io/spacer/index.html";
        this.EDITBOX_HEIGHT = 100;
        this.EDITBOX_WIDTH = 400;
        this.EDITBOX_HEIGHT_ADJUSTMENT = 70;
        this.EDITBOX_WIDTH_ADJUSTMENT = 50;
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
        this.RESIZE_EDITBOX_OBSERVER;
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
        this.TREES = new Array(); // umbrella tree, stores data tree components, not files
        this.WAIT_IS_OPEN = false;
        this.WENT_TO_FILE = false;
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
        if (document.getElementById(this.TREE.ELEMENT_OUTER_WRAPPER).getAttribute('src')){
            let tree = this.TREE;
            let src = function(){return document.getElementById(tree.ELEMENT_OUTER_WRAPPER).getAttribute('src');}.bind(tree);
            let ai = function(text){tree.AutoInitialize(text);}.bind(tree);
            await fetch(
                src()
            ).then(
                response => response.text()
            ).then(
                text => ai(text)
            ).catch(
                exc => console.log("error fetching file " + exc)
            )
        } else {
            var TEXT;
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
        var result = "let SPACER = new Spacer();";
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
     * UMBRELLA TREE MANAGER
     * ------------------------------------------------------
     */

    SpacerGetTreeFromName(name){
        // get named tree from umbrella tree list
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

    SpacerSetTreeFromName(name){
        // set umbrella tree to tree that mouse is hovering over
        if (name != this.TREE.NAME){
            var tree = this.GetTreeFromName(name);
            if (tree != null){
                this.TREE = tree;
                if (this.TREES.length > 1){
                    this.HighlightTree(name);
                }
            }
        }
    }

    SpacerHighlightTree(name){
        // highlight tree that mouse is hovering over
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
    ResizeEditBox(){
        if(!document.getElementById("spacer_editor")){
            return;
        }
        var textarea_height = document.getElementById("spacer_editor").style.height;
        var textarea_width = document.getElementById("spacer_editor").style.width;
        textarea_height = textarea_height.replace("px","");
        textarea_width = textarea_width.replace("px","");
        textarea_height = Number(textarea_height);
        textarea_width = Number(textarea_width);
        const min_resize_width = 350;
        var editbox_height = document.getElementById("spacer_editbox").style.height;
        var editbox_width = document.getElementById("spacer_editbox").style.width;
        editbox_height = editbox_height.replace("px", "");
        editbox_width = editbox_width.replace("px", "");
        editbox_height = Number(editbox_height);
        editbox_width = Number(editbox_width);
        var spacer_editor_table = document.getElementById("spacer_editor_table");
        if(textarea_height * textarea_width * editbox_height * editbox_width == 0){
            return;
        }
        // cannot read "this" variable from resize observer
        var editbox_height_adjustment = eval("SPACER.EDITBOX_HEIGHT_ADJUSTMENT");
        var editbox_width_adjustment = eval("SPACER.EDITBOX_WIDTH_ADJUSTMENT");
        if((editbox_height - editbox_height_adjustment < textarea_height) || (editbox_height > textarea_height * 1.2)){
            var height = "" + (textarea_height + editbox_height_adjustment) + "px";
            document.getElementById("spacer_editbox").style.height = height;
        }
        if((editbox_width - editbox_width_adjustment < textarea_width) || (editbox_width > textarea_width * 1.1 && textarea_width > min_resize_width)){
            var width = "" + (textarea_width + editbox_width_adjustment) + "px";
            document.getElementById("spacer_editbox").style.width = width;
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
            box.style.border = this.POPUP_BORDER;
            box.style.overflow = "visible";
            box.style.borderRadius = "20px";
            let padding = 10;
            box.style.padding = `${padding}px ${padding}px 0px ${padding}px`;
            let margin = 10;
            box.style.margin = `${margin}px`;
            box.style.height = this.EDITBOX_HEIGHT + padding + margin + "px";
            box.style.width = this.EDITBOX_WIDTH + "px";
            box.style.background = this.POPUP_BACKGROUND;
            var datatree;
            var radio = "";
            var info = "";
            var reset = "<button type='button' onclick='return SPACER.ResetEditBox();'>reset</button>";
            var equation = "";
            var delimiter = "&nbsp;&nbsp;&nbsp;";
            if (datatree){
                // if (datatree.TYPE != "text"){ // 7.9.4
                radio = "<input type='radio' name='spacer_text_or_html' value='text'>text</input><input type='radio' name='spacer_text_or_html' value='html' checked='checked'>html</input>";
                equation = "<a href='https://codecogs.com/latex/eqneditor.php' target='_blank'>equation</a>";
                // }
            }
            if (arguments.length == 4){
                var displaytext = this.StringTrim(source.innerHTML);
                if (toolbar == "insert"){
                    displaytext = "";
                }
                box.innerHTML = "<table id='spacer_editor_table' style='margin-bottom:10px;'><tr><td><span onclick='return SPACER.CloseEditBox();' class='spacer_close_editorbutton' style='position:relative;color:red;font-size:1em;border:1px dotted red;padding:3px;'>X</span><label>&nbsp;&nbsp;&nbsp;</label>" + delimiter + reset + delimiter + radio + info + delimiter + equation + delimiter + "<button type='button' id='spacer_editbox_button' onclick='return spacer_submit_from_toolbar(event);'>" + toolbar + "</button><span onclick='return SPACER.CloseEditBox();' class='spacer_close_editorbutton' style='position:relative;float:right;color:red;font-size:1em;border:1px dotted red;padding:3px;margin-left:3px;'>X</span></td></tr><tr><td><textarea id='spacer_editor' rows='3' cols='40' >" + displaytext + "</textarea></td></tr></table>";
            } else {
                return;
            }
            document.body.appendChild(box);
            if(box && typeof ResizeObserver === "function"){
                this.ResizeEditBox();
                this.RESIZE_EDITBOX_OBSERVER = new ResizeObserver(this.ResizeEditBox).observe(document.getElementById("spacer_editor"));
            } else {
                console.log("resize observer undefined")
            }
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
        if(this.RESIZE_EDITBOX_OBSERVER && typeof ResizeObserver === "function") {
            this.RESIZE_EDITBOX_OBSERVER.disconnect();
        }
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
        if(this.RESIZE_EDITBOX_OBSERVER && typeof ResizeObserver === "function") {
            this.RESIZE_EDITBOX_OBSERVER.disconnect();
        }
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
                        TOOLBAR += "<button onclick='return SPACER.PrintText(event);' title='copy paste to save your text changes'>TEXT</button>";
                        TOOLBAR += separator;
                        break;
                    case "html":
                        TOOLBAR += "<button onclick='return SPACER.PrintHtml(event);' title='copy paste to save your text changes'>HTML</button>";
                        TOOLBAR += separator;
                        break;
                    case "edit":
                        TOOLBAR += "<select id='" + this.TOOLBAR_SELECT_NAME + "' onchange='return SPACER.ToolbarSelect();'><option selected='selected'>EDIT</option><option value='overwrite'>overwrite</option><option value='child'>child</option><option value='sibling'>sibling</option><option value='up'>move up</option><option value='down'>move down</option><option value='selection right'>selection right</option><option value='section right'>section right</option><option value='left'>move left</option><option value='copy selected'>copy selected</option><option value='copy w/children'>copy w/children</option><option value='cut'>cut</option><option value='paste'>paste</option><option value='remove'>remove</option><option value='undo'>undo</option><option value='redo'>redo</option></select>";
                        TOOLBAR += separator;
                        break;
                    case "publish":
                        TOOLBAR += "<button onclick='return SPACER.PrintFile(event);' title='copy paste into an html file to publish your tree'>PUBLISH</button>";
                        TOOLBAR += separator;
                        break;
                    case "status":
                        TOOLBAR += "<span id='" + this.TOOLBAR_STATUS_NAME + "' title='' style='display:none;background-color:white;color:red;font-size:x-large;font-weight:bold;padding:7px;'>!</span>";
                        break;
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
                if (strings.length < 3 || this.SPACER.StringTrim(strings[1].toUpperCase()) != "FROM" || (this.SPACER.StringTrim(strings[2].toUpperCase()) != "HTML" && this.SPACER.StringTrim(strings[2].toUpperCase()) != "TEXT")){
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
                // result = result.split("<").join("&lt;");
                // result = result.split(">").join("&gt;");
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
        result += "<div id='"
            + datatree.ELEMENT_OUTER_WRAPPER
            + "' type='html' toolbar='"
            + datatree.TOOLBAR_TOOLS
            + "' root=\"" + datatree.TITLE
            + "\" open=\""
            + datatree.OPEN_ICON.split("'").join("&apos;").split("\"").join("&quot;")
            + "\" closed=\""
            + datatree.CLOSED_ICON.split("'").join("&apos;").split("\"").join("&quot;")
            + "\" empty=\""
            + datatree.EMPTY_ICON.split("'").join("&apos;").split("\"").join("&quot;")
            + "\" >";
        if (this.CONTENT.indexOf('<table') >= 0){
            result += this.CONTENT; // slower, but GetList indents unindented tables
        } else {
            result += this.GetList(); // faster
        }
        // result = this.SPACER.EncodeArrows(result,true);
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
        this.SPACER.PLEASE_WAIT = false;
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

/**
 * author Derek James Smith
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
        return document.getElementById(this.SpacerTree.ELEMENT_INNER_WRAPPER).getElementsByTagName('li')[0];
    }

    SpacerViewClick(li){
        if (li){
            var arrow = li.getElementsByTagName('a')[0];
            var ul = li.getElementsByTagName('ul')[0];
            if (ul.style.display == "block"){
                ul.style.display = "none";
                arrow.innerHTML = this.SpacerTree.CLOSED_ICON;
            } else if (ul.style.display == "none"){
                ul.style.display = "block";
                arrow.innerHTML = this.SpacerTree.OPEN_ICON;
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
        if (ul.id == this.SpacerTree.ELEMENT_INNER_WRAPPER){
            ROOT = true;
        }
        return ROOT;
    }

    SpacerViewClose(){
        this.SpacerTree.SELECTED_SPAN = null;
        this.ViewCollapse();
    }

    SpacerViewCancelFullScreenEdit(){
        document.getElementById(this.SpacerTree.ELEMENT_OUTER_WRAPPER).innerHTML = this.SpacerTree.VIEW;
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
        this.ViewGetList2(ul);
        var result = this.SPACER.TEMP.innerHTML;
        return result;
    }

    SpacerViewGetList2(parent_ul){
        var children = parent_ul.childNodes;
        for (let c in children){
            var child = children[c];
            if (child && child.nodeName && child.nodeName.toLowerCase() == "li"){
                child.className = '';
                child.removeAttribute('class');
                if(child.getAttribute('style')) {
                    child.removeAttribute('style');
                }
                var arrow = child.getElementsByTagName("a")[0];
                if (arrow && arrow.className && arrow.className == "spacer_arrow"){
                    child.removeChild(arrow);
                }
                var span = child.getElementsByTagName("span")[0];
                var text = "";
                if(span) {
                    text = span.innerHTML;
                }
                if (span && span.className && span.className == "spacer_content"){
                    child.removeChild(span);
                }
                var ul = child.getElementsByTagName("ul")[0];
                ul.className = '';
                ul.removeAttribute('class');
                if(ul.getAttribute('style')) {
                    ul.removeAttribute('style');
                }
                child.removeChild(ul);
                child.innerHTML = text;
                child.appendChild(ul);
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
        return "<a class='spacer_arrow' style='text-decoration:none;' onclick='return spacer_clicktree(event);' href='javascript:void(0);'>" + link + "</a>";
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
            ul = document.getElementById(this.SpacerTree.ELEMENT_INNER_WRAPPER);
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
                        arrow.innerHTML = this.SpacerTree.OPEN_ICON;
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
                    arrow.innerHTML = this.SpacerTree.OPEN_ICON;
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
            ul = document.getElementById(this.SpacerTree.ELEMENT_INNER_WRAPPER);
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
                        arrow.innerHTML = this.SpacerTree.CLOSED_ICON;
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
                    arrow.innerHTML = this.SpacerTree.CLOSED_ICON;
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
            searchterm = document.getElementById(this.SpacerTree.TOOLBAR_SEARCHBOX_NAME).value;
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
        var tree = document.getElementById(this.SpacerTree.ELEMENT_INNER_WRAPPER);
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
            this.SpacerTree.CURRENT_SEARCH_INDEX = -1;
            this.SpacerTree.SEARCH_RESULTS.length = 0;
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
                        var TEXT = "<span class='search_result' style='background-color:" + this.SpacerTree.HIGHLIGHT_BACKGROUND_COLOR + ";color:" + this.SpacerTree.HIGHLIGHT_TEXT_COLOR + ";border:1px solid " + this.SpacerTree.HIGHLIGHT_BACKGROUND_COLOR + ";'>" + txt + "</span>";
                        span.innerHTML = TEXT;
                    }
                    this.SpacerTree.SEARCH_RESULTS.push(span);
                    if (dont_change_view == false){
                        var node = span.parentNode;
                        while (node.nodeName.toLowerCase() != 'div'){
                            if (node.nodeName.toLowerCase() == 'ul'){
                                node.style.display = 'block';
                            } else if (node.nodeName.toLowerCase() == 'li' && node != span.parentNode && node.getElementsByTagName('ul').length > 0 && node.getElementsByTagName('ul')[0].getElementsByTagName('li').length > 0){
                                node.getElementsByTagName('a')[0].innerHTML = this.SpacerTree.OPEN_ICON;
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
        if (this.SpacerTree.CURRENT_SEARCH_INDEX < this.SpacerTree.SEARCH_RESULTS.length - 1){
            ++this.SpacerTree.CURRENT_SEARCH_INDEX;
        }
        if (this.SpacerTree.CURRENT_SEARCH_INDEX < this.SpacerTree.SEARCH_RESULTS.length){
            var span = this.SpacerTree.SEARCH_RESULTS[this.SpacerTree.CURRENT_SEARCH_INDEX];
            if (span){
                this.ViewOpenToSpan(span);
                this.SpacerTree.ScrollToSpan(span);
            }
        }
    }

    SpacerViewPrevious(){
        if (this.SpacerTree.CURRENT_SEARCH_INDEX > 0){
            --this.SpacerTree.CURRENT_SEARCH_INDEX;
        }
        if (this.SpacerTree.CURRENT_SEARCH_INDEX >= 0){
            var span = this.SpacerTree.SEARCH_RESULTS[this.SpacerTree.CURRENT_SEARCH_INDEX];
            this.ViewOpenToSpan(span);
            this.SpacerTree.ScrollToSpan(span);
        }
    }

    SpacerViewReplace(searchterm,replace_with,case_sensitive,exact_matches){
        document.getElementById(this.SpacerTree.TOOLBAR_REPLACE_NAME).value = "";
        document.getElementById(this.SpacerTree.TOOLBAR_REPLACE_WITH_NAME).value = "";
        this.ViewSearch(searchterm,case_sensitive,exact_matches,false,true);
        if (this.SpacerTree.REPLACE_RESULT_MESSAGE == true){
            if (this.SpacerTree.SEARCH_RESULTS.length > 0){
                if (this.SPACER.REPRESS_ALERTS == false) { alert('Your search returned: ' + this.SpacerTree.SEARCH_RESULTS.length + ' results. You might have to scroll to view them.'); }
            } else {
                if (this.SPACER.REPRESS_ALERTS == false) { alert('No results.'); }
            }
        }
        var amount = this.SpacerTree.SEARCH_RESULTS.length;
        if (this.SpacerTree.SEARCH_RESULTS != null && this.SpacerTree.SEARCH_RESULTS.length > 0){
            this.ViewClose();
            for (var count = 0; count < this.SpacerTree.SEARCH_RESULTS.length; ++count){
                var locate = this.SpacerTree.SEARCH_RESULTS[count]; // span
                if (locate != null){
                    var replace_result = "<span class=\"replace_result\" style=\"background-color:" + this.SpacerTree.HIGHLIGHT_BACKGROUND_COLOR + ";color:" + this.SpacerTree.HIGHLIGHT_TEXT_COLOR + ";\">" + searchterm + "</span>";
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
                            node.getElementsByTagName('a')[0].innerHTML = this.SpacerTree.OPEN_ICON;
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
        this.SpacerTree.REPLACE_RESULTS.length = 0;
        this.SpacerTree.CURRENT_REPLACE_INDEX = -1;
        var spans = document.getElementById(this.SpacerTree.ELEMENT_OUTER_WRAPPER).getElementsByClassName("replace_result");
        for (var count = 0; count < spans.length; ++count){
            var span = spans[count];
            //if (span.className && span.className == "replace_result"){
            this.SpacerTree.REPLACE_RESULTS.push(span);
            //}
        }
        if (this.SpacerTree.REPLACE_RESULTS.length > 0){
            document.getElementById(this.SpacerTree.ELEMENT_INNER_WRAPPER).scrollTop = 0;
            this.SpacerTree.CURRENT_REPLACE_INDEX = 0;
            var span = this.SpacerTree.REPLACE_RESULTS[0];
            var y = this.SpacerTree.GetScrollForSearch(span);
            document.getElementById(this.SpacerTree.ELEMENT_INNER_WRAPPER).scrollTop = y;
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
            this.SpacerTree.Query('CREATE FROM HTML ' + this.SpacerTree.PrintHtml(true));
            return;
        }
        var ul = document.getElementById(this.SpacerTree.ELEMENT_INNER_WRAPPER);
        if (ul){
            this.ViewReset2(ul,what);
        } else {//?
            //document.getElementById(SPACER.TREE.ELEMENT_OUTER_WRAPPER).innerHTML = SPACER.TREE.VIEW;
        }
        if (what == "*"){
            this.SpacerTree.SELECTED_SPAN = null;
            this.ViewCollapse();
        }
    }

    SpacerViewReset2(ul,what){
        if (what == "*"){
            for (let s in this.SpacerTree.MOUSE_DRAG_SPANS){
                var span = this.SpacerTree.MOUSE_DRAG_SPANS[s];
                this.SpacerTree.UnhighlightSpan(span);
            }
            if (this.SpacerTree.SELECTED_SPAN){
                this.SpacerTree.UnhighlightSpan(this.SpacerTree.SELECTED_SPAN);
            }
            this.SpacerTree.SELECTED_SPAN = null;
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
            ul.innerHTML = ul.innerHTML.split(this.SPACER.SKIP_MESSAGE).join(this.SpacerTree.REPLACE);
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
        this.SpacerTree.ResetReplace();
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
/**
 * author Derek James Smith
 */

class SpacerBranch {
    constructor(txt, tree, SPACER) {
        // umbrella tree
        this.SPACER = SPACER;
        // tree, branch, and children
        this.TREE = tree;
        this.CHILDREN = new Array();
        this.PARENT_NODE = "";
        // text, indentation, icon
        this.TEXT = this.TREE.AUTO_TRIM == true ? this.SPACER.StringTrim(txt) : txt;
        this.INDENTATION = txt.indexOf(this.TEXT.charAt(0));
        this.DISPLAY = "block";
        this.LINK = this.TREE.EMPTY_ICON;
        // function declarations
        this.AddBranch = this.SpacerAddBranch;
        this.CleanHTML = this.SpacerCleanHTML;
        this.Click = this.SpacerClick;
        this.Close = this.SpacerClose;
        this.GetChildCount = this.SpacerGetChildCount;
        this.GetIndex = this.SpacerGetIndex;
        this.GetLevel = this.SpacerGetLevel;
        this.InsertBranch = this.SpacerInsertBranch;
        this.Iterate = this.SpacerListIterate;
        this.IsOuterBranch = this.SpacerIsOuterBranch;
    }

    SpacerAddBranch(node){
        node.TEXT = this.CleanHTML(node.TEXT);
        this.CHILDREN.push(node);
        node.PARENT_NODE = this;
        this.LINK = this.TREE.OPEN_ICON;
    }

    SpacerCleanHTML(txt){
        if (txt.indexOf("<table") >= 0){
            if (txt.indexOf("</table><p>") >= 0){
                txt = txt.substring(0, txt.indexOf("</table>") + "</table>".length);
                //txt = txt.split("</table><p>&nbsp;</p>").join("</table>");
                //txt = txt.split("</table><p><ul style=\"display: none; list-style-type: none;\"></ul>");
            }
            // new
            txt = txt.split("<strong>").join("<b>").split("</strong>").join("</b>").split("<em>").join("<i>").split("</em>").join("</i>");
        }
        return txt;
    }

    SpacerClick(){
        if (this.LINK == this.TREE.OPEN_ICON){
            this.LINK = this.TREE.CLOSED_ICON;
        } else if (this.LINK == this.TREE.CLOSED_ICON){
            this.LINK = this.TREE.OPEN_ICON;
        }
        if (this.DISPLAY == "block"){
            this.DISPLAY = "none";
        } else if (this.DISPLAY == "none"){
            this.DISPLAY = "block";
        }
    }

    SpacerClose(){
        this.LINK = this.TREE.CLOSED_ICON;
        if (this.CHILDREN.length < 1){
            this.LINK = this.TREE.EMPTY_ICON;
        }
        this.DISPLAY = "none";
        for (let count = 0; count < this.CHILDREN.length; ++count){
            this.CHILDREN[count].Close();
        }
    }

    SpacerGetChildCount(){
        return this.CHILDREN.length;
    }

    SpacerGetIndex(test){
        // vertical index in children list of parent node
        var index = -1;
        if (this.PARENT_NODE.TEXT != "undefined" && this.PARENT_NODE.TEXT != null){
            index = this.PARENT_NODE.CHILDREN.indexOf(this);
        }
        return index;
    }

    SpacerGetLevel(){
        // horizontal depth of this branch
        // traverse parent nodes to root node
        var node = this;
        var level_count = -1;
        var next_parent;
        if (node.PARENT_NODE.TEXT != "undefined" && node.PARENT_NODE.TEXT != null){
            next_parent = node.PARENT_NODE;
            ++level_count;
            var keepgoing = true;
            while (keepgoing){
                if (next_parent.PARENT_NODE.TEXT != "undefined" && next_parent.PARENT_NODE.TEXT != null){
                    next_parent = next_parent.PARENT_NODE;
                    ++level_count;
                } else {
                    keepgoing = false;
                }
            }
        } else {
            // root node...returns -1
        }
        return level_count;
    }

    SpacerInsertBranch(node, index){
        try{
            this.CHILDREN.splice(index, 0, node);
            node.PARENT_NODE = this;
            this.LINK = this.TREE.OPEN_ICON;
        } catch (exc) {
            if (SPACER.REPRESS_ALERTS == false) { alert(exc); }
        }
    }

    SpacerIsOuterBranch(){
        if(!this.PARENT_NODE || !this.PARENT_NODE.PARENT_NODE){
            return true;
        }
        return false;
    }

    SpacerListIterate(_click){
        var click = true;
        if (arguments.length > 0 && _click == false){
            click = false;
        } else {
            this.Click();
        }
        var li = "<li class='spacer_li' style='white-space:nowrap;'>";
        var a = "<a class='spacer_arrow' href='javascript:void(0)' onclick='return spacer_clicktree(event);' style='text-decoration:none;' >" + this.LINK + "</a>";
        var datatree = this.SPACER.TREE? this.SPACER.TREE : this;
        if (datatree.UNDERLINE_ICONS == true){
            a = "<a class='spacer_arrow' href='javascript:void(0)' onclick='return spacer_clicktree(event);' >" + this.LINK + "</a>";
        }
        var span = "<span class='spacer_content' style='white-space:pre-wrap;padding-left:10px;' onclick='return SPACER.TREE.ClickSpan(event);' onmousedown='return SPACER.TREE.MouseDownSpan(event);' onmouseup='return SPACER.TREE.MouseUpSpan(event);'>";
        var text = this.SPACER.StringTrim(this.TEXT);
        text = text.split("\n").join("");
        var _span = "</span>";
        var accordion = datatree.ACCORDION >= 0? "padding-left:" + datatree.ACCORDION + "pt;": "";
        var ul = "<ul class='spacer_ul' style='list-style-type:none;display:" + this.DISPLAY + ";" + accordion + "' >";
        for (var count = 0; count < this.CHILDREN.length; ++count){
            var c = this.CHILDREN[count];
            ul += c.Iterate(click);
        }
        var _ul = "</ul>";
        var _li = "</li>";
        var result = li + a + span + text + _span + ul + _ul + _li;
        if(text.search("spacer_content") >= 0){//*****************************************************************10.0
            result = li + a + text + ul + _ul + _li;
        }
        return result;
    }

} // spacer branch
