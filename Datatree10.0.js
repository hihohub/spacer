/**
Datatree version 10.0
licensed with the MIT License (MIT)

Copyright (c) 2015 by Derek James Smith

email: support@infiniteoutline.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
**/

/** starts with data model to build first view, returns tree object **/
/** data models: tree, linear nodes array, content outline **/
/** after initialization, View-Controller model only **/
/** list model: ul:li:(a:span:ul) WARNING:"a" could have span**/
// add return values

var DATATREE = new Datatree();

function Definitions() {
    DATATREE = new Datatree();
    DATATREE.AltQueryDocumentation = DatatreeAltQueryDocumentation;
    DATATREE.Custom = DatatreeCustom;
    DATATREE.Custom2 = DatatreeCustom2;
    DATATREE.AltLoadFromTextarea = DatatreeAltLoadFromTextarea;
    DATATREE.GetAltEditorContent = DatatreeGetAltEditorContent;
    DATATREE.InitializeAltEditor = DatatreeInitializeAltEditor;
    DATATREE.InsertAltEditor = DatatreeInsertAltEditor;
    DATATREE.RemoveAltEditorInstance = DatatreeRemoveAltEditorInstance;
    DATATREE.SetAltEditorContent = DatatreeSetAltEditorContent;
    DATATREE.ShowAltEditBox = DatatreeShowAltEditBox;
}

function DatatreeGetAltEditorContent() {
    
     var PLAINTEXT = false;
     if (document.getElementsByName('datatree_text_or_html')){
     var radios = document.getElementsByName('datatree_text_or_html');
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
     var datatree;
     if (DATATREE.TREE){
     datatree = DATATREE.TREE;
     } else if (this){
     datatree = this;
     } else {
     alert('cannot find datatree');
     return;
     }
     if (PLAINTEXT == false && datatree.PLAIN_TEXT == false){
     var content = tinyMCE.activeEditor.getContent();
     if (DATATREE.FULL_SCREEN_MODE == true){
     content = content.split("span class=\"table\"").join("table").split("span class=\"tbody\"").join("tbody").split("span class=\"tr\"").join("tr").split("span class=\"td\"").join("td").split("%%%%%</span>").join("</tbody>").split("%%%%</span>").join("</td>").split("%%%</span>").join("</tr>").split("%%</span>").join("</table>");
     } else if (content.indexOf("<table") >= 0 && DATATREE.FULL_SCREEN_MODE == false){
     content = content.substring(0, content.indexOf("</table>") + "</table>".length);
     }
     return content;
     } else if (datatree.PLAIN_TEXT == true){
     return tinyMCE.activeEditor.getBody().textContent;
     } else {
     return tinyMCE.activeEditor.getBody().textContent;
     }
     
}
function DatatreeSetAltEditorContent(html) {
    tinyMCE.activeEditor.setContent(DATATREE.StringTrim(html)); // web version
}
function DatatreeRemoveAltEditorInstance() {
    tinymce.remove(); // web version
}
function DatatreeAltLoadFromTextarea(type, preload) { // fullscreen  html editor
        try {
        DATATREE.FULL_SCREEN_MODE = true;
        var html = "";
        if (DatatreeAltLoadFromTextarea.arguments.length == 2 && preload != null && preload != "undefined" && preload != "") {
            html = preload;
        }
        html = html.split("<table").join("<span class=\"table\"").split("</table>").join("%%</span>").split("<tr").join("<span class=\"tr\"").split("</tr>").join("%%%</span>").split("<td").join("<span class=\"td\"").split("</td>").join("%%%%</span>").split("<tbody").join("<span class=\"tbody\"").split("</tbody>").join("%%%%%</span>");
        var txt = "";
        if (html != "") {
            var tag = "";
            for (var count = 0; count < html.length; ++count) {
                var c = html[count];
                switch (c) {
                    case '<':
                        tag = "" + c;
                        txt += c;
                        break;
                    case '>':
                        tag = "";
                        txt += c;
                        break;
                    default:
                        if (tag != "") {
                            txt += c;
                        } else {
                            if (c == ' ' || c == " ") {
                                txt += "&amp;nbsp;";
                            } else {
                                txt += c;
                            }
                        }
                        break;
                }
            }
        }
        var datatree = DATATREE.TREE ? DATATREE.TREE : this;
        datatree.VIEW = datatree.TOOLBAR + "<button style='padding:10px;' type='button' onclick='return DatatreeLoadFromTextarea2();'>SUBMIT >>></button><br/><div id='datatree_load_area' class='" + type + "'>" + DATATREE.InsertAltEditor(txt) + "</div>";
        datatree.RefreshGUI();
        DATATREE.InitializeAltEditor('textarea.tinymce_fullscreen', '100%', 'auto', true);
    } catch (exc) {
    }
}
function DatatreeInsertAltEditor(html) {
    try {
        var alteditor = "<textarea style='white-space:pre;' class='tinymce_fullscreen' id='datatree_fullscreen_editor' rows='20' cols='150'>" + html + "</textarea>";
        return alteditor;
    } catch (exc) {
        alert(exc);
    }
}
function DatatreeInitializeAltEditor(s, w, h, full) {
    if (DatatreeInitializeAltEditor.arguments.length < 2) {
        w = '100%';
        h = 'auto';
        full = false;
    }
    try {
        tinymce.remove();
    } catch (exc) {
    }
    tinymce.init({
        selector: s,
        width: w,
        height: h,
        plugins: 'lists charmap image print preview spellchecker searchreplace textcolor save code link table media',
        content_css: 'tinymce.css',
        table_default_styles: {border: '1px solid black', display: 'inline-table'},
        table_default_attributes: {rules: 'all'},
        toolbar: 'forecolor backcolor | fontselect fontsizeselect | codecogs | bullist numlist outdent indent | media',
        save_enablewhendirty: false,
        setup: function (ed) {
            ed.addMenuItem('codecogs', {
                text: 'equation',
                context: 'other',
                image: false,
                onclick: function () {
                    OpenLatexEditor('codecogs', 'html', '');
                }
            });
        },
        menu: {
            file: {title: 'File', items: 'newdocument print preview'},
            edit: {title: 'Edit', items: 'undo redo | cut copy paste | selectall'},
            format: {title: 'Format', items: 'bold italic underline overline strikethrough superscript subscript'},
            table: {title: 'Table', items: 'inserttable deletetable cell row column'},
            other: {title: 'Other', items: 'link image charmap | code codecogs '},
        },
        //nowrap:'true',
        resize: 'both',
        browser_spellcheck: 'true',
    });
    if (DatatreeInitializeAltEditor.arguments.length > 3 && full == true) {
        tinymce.execCommand('mceAddControl', false, 'datatree_fullscreen_editor');
    }
}
function DatatreeAltQueryDocumentation() {
}
function DatatreeCustom() { // this is a customizable function...replace this code with your own
    try {
        var custombutton = document.getElementById('datatree_custom_button');
        if (custombutton != null && custombutton != 'undefined') {
            DatatreeQueryDocumentation(); // uncomment for desktop application
        }
    } catch (exc) {
        alert(exc);
    }
}
function DatatreeCustom2() { // this is a customizable function...replace this code with your own
    try {
        var custombutton = document.getElementById('datatree_custom2_button');
        if (custombutton != null && custombutton != 'undefined') {
        }
    } catch (exc) {
        alert(exc);
    }
}
function Datatree(){
    this.AltLoadFromTextarea; // ** customizable
    this.CleanHTMLForEditor; // ** customizable
    this.CleanHTMLFromEditor; // ** customizable
    this.GetAltEditorContent; // ** customizable
    this.InitializeAltEditor; // ** customizable
    this.InsertAltEditor; // ** customizable
    this.RemoveAltEditorInstance;// ** customizable
    this.SetAltEditorContent; // ** customizable
    this.ShowAltEditBox; // ** customizable
    this.AllowBackspace = DatatreeAllowBackspace;
    this.Alphabetize = DatatreeAutoAlphabetize;
    this.AltQueryDocumentation; // ** customizable
    this.ArraySwap = DatatreeArraySwap;
    this.AutoInit = DatatreeAutoInit;
    this.Initialize = DatatreeAutoInit;
    this.AutoSearchMacro = DatatreeAutoSearchMacro;
    this.CleanHTML = DatatreeCleanHTML;
    this.CloseContextMenu = DatatreeCloseContextMenu;
    this.CloseEditBox = DatatreeCloseEditBox;
    this.CloseMenu = DatatreeCloseMenu;
    this.ClosePopupBox = DatatreeClosePopupBox;
    this.CloseWaitBox = DatatreeCloseWaitBox;
    this.Collapse = DatatreeAutoCollapse;
    this.ContextMenu = DatatreeContextMenu;
    this.Custom; // ** customizable
    this.Custom2; // ** customizable
    this.DisallowBackspace = DatatreeDisallowBackspace;
    this.EncodeArrows = DatatreeEncodeArrows;
    this.EscapeTags = DatatreeEscapeTags;
    this.EscapeTagsForPrint = DatatreeEscapeTagsForPrint;
    this.Expand = DatatreeAutoExpand;
    this.FocusContextMenu = DatatreeFocusContextMenu;
    this.GetBrowser = DatatreeGetBrowser;
    this.GetFileNameFromPath = DatatreeGetFileNameFromPath;
    this.GetInitiator = DatatreeGetPopupEditInitiator;
    this.GetOnload = DatatreeGetOnload;
    this.GetTreeFromName = DatatreeGetTreeFromName;
    this.GoToFile = DatatreeGoToFile;
	this.HighlightTree = DatatreeHighlightTree;
    this.IsTableTag = DatatreeIsTableTag;
    this.LeftStringTrim = DatatreeLeftStringTrim;
    this.Load = DatatreeAutoLoad;
    this.LoadFromToolbar = DatatreeAutoLoadFromToolbar;
    this.LoadSitemap = DatatreeLoadSitemap;
    this.MenuMouseClick = DatatreeMenuMouseClick;
    this.MenuMouseOver = DatatreeMenuMouseOver;
    this.MenuMouseOut = DatatreeMenuMouseOut;
    this.Next = DatatreeAutoNext;
    this.Number = DatatreeAutoNumber;
    this.OpenMenu = DatatreeOpenMenu;
    this.PreventDefault = DatatreePreventDefault;
    this.Previous = DatatreeAutoPrevious;
    this.PrintCode = DatatreeAutoPrintCode;
    this.PrintHtml = DatatreeAutoPrintHtml;
    this.PrintList = DatatreeAutoPrintList;
    this.PrintText = DatatreeAutoPrintText;
    this.Query = DatatreeAutoQuery;
    this.QueryDocumentation = DatatreeQueryDocumentation;
    this.ReadFile = DatatreeReadFile;
    this.RemoveEmptyEndTags = DatatreeRemoveEmptyEndTags;
    this.RemoveTableWrappers = DatatreeRemoveTableWrappers;
    this.Replace = DatatreeAutoReplace;
    this.Reset = DatatreeAutoReset;
    this.ResetMacro = DatatreeResetMacro;
    this.Response = DatatreeAutoResponse;
    this.RightClick = DatatreeRightClick;
    this.RightStringTrim = DatatreeRightStringTrim;
    this.Save = DatatreeAutoSave;
    this.SaveMax = DatatreeAutoSaveMax;
    this.Search = DatatreeAutoSearch;
    this.SearchMacro = DatatreeSearchMacro;
    this.SetInitiator = DatatreeSetPopupEditInitiator;
    this.SetTreeFromName = DatatreeSetTreeFromName;
    this.ShowPopupBox = DatatreeShowPopupBox;
    this.Skip = DatatreeAutoSkip;
    this.StringTrim = DatatreeStringTrim;
    this.StripTags = DatatreeStripTags;
    this.StripTagsPHPJS = DatatreeStripTagsPHPJS;
    this.StripTagLeaveInner = DatatreeStripTagLeaveInner;
    this.StripTagWithClassNameLeaveInner = DatatreeStripTagWithClassNameLeaveInner;
    this.Tree = DatatreeTree;
    this.ToolbarSelect = DatatreeAutoToolbarSelect;
    this.Wait = DatatreeWait;
    // repeats with datatree properties not allowed
    this.ADDRESS = "http://www.datatree.com/version/latest/Datatree.js";
    this.ALT_EDITOR = false; // relates to 7.9.4
    this.ALT_EDITOR_TARGET_SPAN = null;
    this.ALT_SKIP_MESSAGE = "%%%%% SKIPPED %%%%%";
    this.BACKSPACE_ALLOWED = false;
    this.CLIPBOARD = new Array();
    this.COUNTER = 0;
    this.CUSTOM_VALUE = '';//'?'; // this is a customizable variable for the customizable 'custom' button...insert your own code
    this.CUSTOM_TOOLTIP = '';//'view list of query commands'; // this is a customizable variable for the customizable 'custom' button...insert your own code
    this.CUSTOM2_VALUE = ''; //this is a customizable variable for the customizable 'custom' button...insert your own code
    this.CUSTOM2_TOOLTIP = ''; // this is a customizable variable for the customizable 'custom' button...insert your own code
    this.DEFAULT_ACCORDION = -1;
    this.DEFAULT_INNER_WRAPPER = "DATALIST";
    this.DEFAULT_OUTER_WRAPPER = "DATATREE";
    this.DEFAULT_TOOLBAR_NAME = "datatree_toolbar";
    this.DEFAULT_EDITBOX_NAME = "datatree_editbox";
    this.DEFAULT_CLOSED_ICON = "<span class='closed'>&rArr;</span>";
    this.DEFAULT_EMPTY_ICON = "<span class='empty'>&EmptySmallSquare;</span>";
    this.DEFAULT_GO_TO_FILE = "if(DATATREE.TEMP.toLowerCase().indexOf('.txt')>=0 || DATATREE.TEMP.toLowerCase().indexOf('.html')>=0 || DATATREE.TEMP.toLowerCase().indexOf('.htm')>=0){DATATREE.TREE.Query('LOAD ' + DATATREE.TEMP);DATATREE.GO_TO_FILE = '';DATATREE.WENT_TO_FILE = true;DATATREE.TREE.Query('collapse');};";
    this.DEFAULT_HIGHLIGHT_BACKGROUND_COLOR = "cyan";
    this.DEFAULT_HIGHLIGHT_TEXT_COLOR = "navy";
    this.DEFAULT_OPEN_ICON = "<span class='open'>&dArr;</span>";
    this.DEFAULT_SKIP_MESSAGE = "***** PLEASE WAIT *****";
    this.DEFAULT_TOOLBAR_ALIGN = "left";
    this.DEFAULT_TOOLBAR_TOOLS = "collapse,expand,search_horizontal,next,previous,reset,edit,replace,alphabetize,query,number,freestyle";
    this.DEFAULT_TOOLBAR_FREESTYLE = "";
    this.DOCUMENTATION_ADDRESS = "http://www.datatree.com/proxy/documentation.tree.html";
    this.INSERT = false;
    this.FULL_SCREEN_MODE = false;
    this.GO_TO_FILE = ""; // go to file when click on line...insert function behavior here...does not require 'function(){...}'...text of line clicked stored in DATATREE.TEMP variable
    this.MACRO = new Array(); // stores data tree files, not tree components
    this.MACRO_SEARCH_RESULTS = new Array();
    this.MOUSE_DOWN_X = -1;
    this.MOUSE_DOWN_Y = -1;
    this.MOUSE_UP_X = -1;
    this.MOUSE_UP_Y = -1;
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
    this.SETTABLE_PROPERTIES = ["CUSTOM_VALUE","CUSTOM_TOOLTIP","CUSTOM2_VALUE","CUSTOM2_TOOLTIP","DEFAULT_CLOSED_ICON","DEFAULT_EMPTY_ICON","DEFAULT_OPEN_ICON", "POPUP_BACKGROUND","PRINT_EXTRA_SCRIPT_BEFORE", "PRINT_EXTRA_SCRIPT_AFTER",  "REPRESS_ALERTS","REPRESS_EDITS","SITEMAP","SITEMAP_FILE","TAB","TOOLBAR_ALIGN","TOOLBAR_FREESTYLE","TOOLBAR_FREESTYLE2","TOOLBAR_STYLE"];
    this.SITEMAP;
    this.SITEMAP_FILE;
    this.SKIP_MESSAGE = "***** PLEASE WAIT *****";
    this.SKIPPED = false;
    this.TAB = "     ";
    this.TEMP;
    this.TIMER;
    this.TOOLBAR_ALIGN = this.DEFAULT_TOOLBAR_ALIGN;
    this.TOOLBAR_NOWRAP_STYLE = "background-color:#cccccc;white-space:nowrap;overflow:auto;clear:both;";
    this.TOOLBAR_WRAP_STYLE = "background-color:#cccccc;white-space:wrap;overflow:auto;clear:both;";
    this.TOOLBAR_FREESTYLE = ""; // customizable
    this.TOOLBAR_FREESTYLE2 = ""; // customizable
    this.TOOLBAR_SEPARATOR = "<span>|</span>";
    this.TOOLBAR_STYLE = "background-color:#cccccc;white-space:wrap;overflow:hidden;clear:both;";
    this.TREE;
    this.TREES = new Array(); // stores data tree components, not files
    this.WAIT_IS_OPEN = false;
    this.WENT_TO_FILE = false;
    this.NAME_OF_SEARCH_RESULT = 'search_result';
    this.NAME_OF_LINENUMBER = 'linenumber';
    this.NAME_OF_ARROW = 'datatree_arrow';
    this.NAME_OF_CONTENT = 'datatree_content';
    this.NAME_OF_UL = 'datatree_ul';
    this.NAME_OF_LI = 'datatree_li';
}
function DatatreeTree(outer_wrapper) {
    DATATREE.TREES.push(this);
    this.AutoInitialize = DatatreeAutoInitialize;
    this.Branch = DatatreeBranch;
    this.Clear = DatatreeClear;
    this.ClickTreeText = DatatreeClickTreeText;
    this.CloseTree = DatatreeCloseTree;
    this.DivHasSelfIndentingTag = DatatreeDivHasSelfIndentingTag;
    this.DivHasKeeperNonTextTag = DatatreeDivHasKeeperNonTextTag;
    this.DivHasContentTag = DatatreeDivHasContentTag;
    this.DoNotWrapOuterElement = DatatreeDoNotWrapOuterElement;
    this.Edit = DatatreeEdit;
    this.EditTreeText = DatatreeEditTreeText;
    this.EvenSpacing = DatatreeEvenSpacing;
    this.EvenSpacing2 = DatatreeEvenSpacing2;
    this.GetCode = DatatreeGetCode;
    this.GetFile = DatatreeGetFile;
    this.GetFileMax = DatatreeGetFileMax;
    this.GetHtml = DatatreeGetHtmlParagraphs;
    this.GetHtmlLines = DatatreeGetHtmlLines;
    this.GetLettering = DatatreeGetLettering;
    this.GetList = DatatreeGetList;
    this.GetMacroIndexForNode = DatatreeGetMacroIndexForNode;
    this.GetOuterElement = DatatreeGetOuterElement;
    this.GetScrollForSearch = DatatreeGetScrollForSearch;
    this.GetSkipMessage = DatatreeGetSkipMessage;
    this.GetText = DatatreeGetText;
    this.GetTextForPrint = DatatreeGetTextForPrint;
    this.GetTextTreeFile = DatatreeGetTextTreeFile;
    this.GetType = DatatreeGetType;
    this.GetView = DatatreeGetView;
    this.HighlightSpan = DatatreeHighlightSpan;
    this.HtmlLineBreaks = DatatreeHtmlLineBreaks;
    this.Indent = DatatreeIndent;
    this.Init = DatatreeInit;
    this.InitReplaceResults = DatatreeInitReplaceResults;
    this.InitSearchResults = DatatreeInitSearchResults;
    this.InsertClickTreeText = DatatreeInsertClickTreeText;
    this.InsertEditTreeText = DatatreeInsertEditTreeText;
    this.IsRemovableFormatTag = DatatreeIsRemovableFormatTag;
    this.LoadFromTextarea = DatatreeLoadFromTextarea;
    this.LoadFromTextarea2 = DatatreeLoadFromTextarea2;
    this.LoadFromToolbar = DatatreeLoadFromToolbar;
    this.MouseDownSpan = DatatreeMouseDownSpan;
    this.MouseUpSpan = DatatreeMouseUpSpan;
    this.HtmlBody = DatatreeHtmlBody;
    this.HtmlCode = DatatreeHtmlCode;
    this.HtmlText = DatatreeHtmlText;
    this.PlainText = DatatreePlainText;
    this.Print = DatatreePrint;
    this.PrintCode = DatatreePrintCode;
    this.PrintFile = DatatreePrintFile;
    this.PrintFileMax = DatatreePrintFileMax;
    this.PrintHead = DatatreePrintHead;
    this.PrintHtml = DatatreePrintHtml;
    this.PrintHtmlLines = DatatreePrintHtmlLines;
    this.PrintList = DatatreePrintList;
    this.PrintText = DatatreePrintText;
    this.PrintTextTree = DatatreePrintTextTree;
    this.ProcessTree = DatatreeProcessTree;
    this.Query = DatatreeQuery;
    this.Refresh = DatatreeRefresh;
    this.RefreshGUI = DatatreeRefreshGUI;
    this.RemoveHtmlComments = DatatreeRemoveHtmlComments;
    this.RemoveTables = DatatreeRemoveTables;
    this.ReplaceBranch = DatatreeReplaceBranch;
    this.ResetReplace = DatatreeResetReplace;
    this.Replay = DatatreeReplay;
    this.ResetEditBox = DatatreeResetEditBox;
    this.ResetToolbarSelect = DatatreeResetToolbarSelect;
    this.RestoreView = DatatreeRestoreView;
    this.ScrollToSpan = DatatreeScrollToSpan;
    this.SetClosedIcon = DatatreeSetClosedIcon;
    this.SetEmptyIcon = DatatreeSetEmptyIcon;
    this.SetIcons = DatatreeSetIcons;
    this.SetOpenIcon = DatatreeSetOpenIcon;
    this.SetTableStyle = DatatreeSetTableStyle;
    this.SetToolbar = DatatreeSetToolbar;
    this.SetType = DatatreeSetType;
    this.SetTypeConditionally = DatatreeSetTypeConditionally;
    this.ShowEditBox = DatatreeShowEditBox;
    this.SubmitEdit = DatatreeSubmitEdit;
    this.SetTreeHeight = DatatreeSetTreeHeight;
    this.SwapBranches = DatatreeSwapBranches;
    this.SyncFromRootNode = DatatreeSyncFromRootNode;
    this.SyncFromDataTree = DatatreeSyncFromDataTree;
    this.Synchronize = DatatreeSynchronize;
    this.TagRequiresLineBreak = DatatreeTagRequiresLineBreak;
    this.TreeFromString = DatatreeTreeFromString;
    this.UnhighlightSpan = DatatreeUnhighlightSpan;
    this.UndoPreservedWhiteSpace = DatatreeUndoPreservedWhiteSpace;
    this.UpdateContent = DatatreeUpdateContent;
    this.UpdateHtmlContent = DatatreeUpdateHtmlContent;
    this.View = DatatreeView;
    this.ViewIndex = DatatreeViewIndex;
    this.ViewIndexOfSpan = DatatreeViewIndexOfSpan;
    this.ViewFindSpanFromLi = DatatreeViewFindSpanFromLi;
    this.ViewFindLiFromSpan = DatatreeViewFindLiFromSpan;
    this.ViewFindUlFromSpan = DatatreeViewFindUlFromSpan;
    this.ViewSpandex = DatatreeViewSpandex;
    this.ViewA = DatatreeViewA;
    this.ViewSpan = DatatreeViewSpan;
    this.ViewUl = DatatreeViewUl;
    this.ViewLi = DatatreeViewLi;
    this.ViewListElement = DatatreeViewListElement;
    this.ViewOverwrite = DatatreeViewOverwrite;
    this.ViewSibling = DatatreeViewSibling;
    this.ViewChild = DatatreeViewChild;
    this.ViewSwap = DatatreeViewSwap;
    this.ViewUp = DatatreeViewUp;
    this.ViewDown = DatatreeViewDown;
    this.ViewSelright = DatatreeViewSelright;
    this.ViewSecright = DatatreeViewSecright;
    this.ViewRight = DatatreeViewRight;
    this.ViewLeft = DatatreeViewLeft;
    this.View_Left = DatatreeView_Left;
    this.ViewCut = DatatreeViewCut;
    this.View_Cut = DatatreeView_Cut;
    this.ViewCopysel = DatatreeViewCopysel;
    this.ViewCopysec = DatatreeViewCopysec;
    this.ViewCopy = DatatreeViewCopy;
    this.ViewPaste = DatatreeViewPaste;
    this.View_Paste = DatatreeView_Paste;
    this.ViewRemove = DatatreeViewRemove;
    this.ViewOpenToSpan = DatatreeViewOpenToSpan;
    this.ViewExpand = DatatreeViewExpand;
    this.ViewCollapse = DatatreeViewCollapse;
    this.ViewSearch = DatatreeViewSearch;
    this.ViewSearch2 = DatatreeViewSearch2;
    this.ViewNext = DatatreeViewNext;
    this.ViewPrevious = DatatreeViewPrevious;
    this.ViewReset = DatatreeViewReset;
    this.ViewTrim = DatatreeViewTrim;
    this.ViewRoot = DatatreeViewRoot;
    this.ViewSpanIsRoot = DatatreeViewSpanIsRoot;
    this.ViewClick = DatatreeViewClick;
    this.ViewGetList = DatatreeViewGetList;
    this.ViewGetList2 = DatatreeViewGetList2;
    this.ViewNumber = DatatreeViewNumber;
    this.ViewClose = DatatreeViewClose;
    this.ViewReplace = DatatreeViewReplace;
    this.ViewInitReplaceResults = DatatreeViewInitReplaceResults;
    this.ViewAlphabetize = DatatreeViewAlphabetize;
    // repeats with Datatree properties not allowed
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
    this.ELEMENT_INNER_WRAPPER = DATATREE.DEFAULT_INNER_WRAPPER;
    if (DatatreeTree.arguments.length >= 1){
        this.ELEMENT_INNER_WRAPPER = outer_wrapper + "_inner";
    }
    this.ELEMENT_INNER_WRAPPER_STYLE = "list-style-type:none;display:block;padding-left:0px;margin-top:0px;border:1px solid gray;width:100%;overflow:scroll;-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;";//webkit-touch-callout disables default browser blue drag highlighting
    this.ELEMENT_INNER_WRAPPER_HEIGHT = "500px";
    this.ELEMENT_OUTER_WRAPPER = DATATREE.DEFAULT_OUTER_WRAPPER;
    if (DatatreeTree.arguments.length >= 1){
        this.ELEMENT_OUTER_WRAPPER = outer_wrapper;
    }
    this.ELEMENT_OUTER_WRAPPER_STYLE = "";
    this.EMPTY_ICON = "<span class='empty'>&EmptySmallSquare;</span>";
    this.HAS_ERRORS = false;
    this.HIGHLIGHT_BACKGROUND_COLOR = DATATREE.DEFAULT_HIGHLIGHT_BACKGROUND_COLOR;
    this.HIGHLIGHT_TEXT_COLOR = DATATREE.DEFAULT_HIGHLIGHT_TEXT_COLOR;
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
    this.SETTABLE_PROPS = ["ACCORDION","CLOSED_ICON","EMPTY_ICON","HIGHLIGHT_BACKGROUND_COLOR","HIGHLIGHT_TEXT_COLOR","INDENTATION","LETTERING","OPEN_ICON","TITLE","TOOLBAR_TOOLS","TYPE"];
    this.TITLE = "TREE";
    this.TOOLBAR = "";
    this.TOOLBAR_NAME = DATATREE.DEFAULT_TOOLBAR_NAME;
    if (DatatreeTree.arguments.length >= 1){
        this.TOOLBAR_NAME = outer_wrapper + "_toolbar";
    }
    this.TOOLBAR_LOWER_BOUND_NAME = this.TOOLBAR_NAME + "_lower_bound";
    this.TOOLBAR_MACRO_SEARCHBOX_NAME = this.TOOLBAR_NAME + "_macro_searchbox";
    this.TOOLBAR_REPLACE_NAME = this.TOOLBAR_NAME + "_replace";
    this.TOOLBAR_REPLACE_WITH_NAME = this.TOOLBAR_NAME + "_replace_with";
    this.TOOLBAR_SEARCHBOX_NAME = this.TOOLBAR_NAME + "_searchbox";
    this.TOOLBAR_SELECT_NAME = this.TOOLBAR_NAME + "_select";
    this.TOOLBAR_STATUS_NAME = this.TOOLBAR_NAME + "_status";
    this.TOOLBAR_UPPER_BOUND_NAME = this.TOOLBAR_NAME + "_upper_bound";
    this.TOOLBAR_QUERYWINDOW_NAME = this.TOOLBAR_NAME + "_querywindow";
    this.TOOLBAR_TOOLS = DATATREE.DEFAULT_TOOLBAR_TOOLS;
    this.TYPE = "text"; // relates to 7.9.4
    if (document.getElementById(this.ELEMENT_OUTER_WRAPPER) && document.getElementById(this.ELEMENT_OUTER_WRAPPER).getAttribute('type')){
        this.TYPE = document.getElementById(this.ELEMENT_OUTER_WRAPPER).getAttribute('type');
        if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() != "text" && this.TYPE != "" && (this.TYPE.toLowerCase() == "html" || this.TYPE.toLowerCase() == "tree")){
           //this.PLAIN_TEXT = false; // 7.9.4
        }
    }
    this.UNDERLINE_ICONS = false;
    this.UNDO;
    this.VIEW = "";
    this.WITH = false;
    // if don't uncomment these, have to initialize tree, or else it appears as a list...also, can't make tree node from node unless first Init()
    // if do uncomment these, tree from string function happens twice (inefficient)
    //this.ROOT_NODE = this.TreeFromString(this.CONTENT, this.TITLE, this.TYPE);
    //this.VIEW = this.GetView();
    //this.InsertClickTreeText();
    //this.InsertEditTreeText();
    //this.RefreshGUI();
}
function DatatreeBranch(txt, tree) {
    this.AddBranch = DatatreeAddBranch;
    this.Click = DatatreeClick;
    this.Clone = DatatreeCloneBranch;
    this.Close = DatatreeClose;
    this.CountFromTop = DatatreeCountFromTop; // vertical top down number from root
    this.GetChildCount = DatatreeGetChildCount;
    this.GetIndex = DatatreeGetIndex; // vertical index in children list of parent node
    this.GetLevel = DatatreeGetLevel; // horizontal depth
    this.InsertBranch = DatatreeInsertBranch;
    this.Iterate = DatatreeListIterate;
    this.RemoveAllBranches = DatatreeRemoveAllBranches;
    this.RemoveBranch = DatatreeRemoveBranch;
    this.CHILDREN = new Array();
    this.DISPLAY = "block";
    this.TEXT = tree.AUTO_TRIM == true? DATATREE.StringTrim(txt) : txt;
    this.INDENTATION = txt.indexOf(this.TEXT.charAt(0));
    this.LINK = "";
    this.PARENT_NODE = "";
    this.TREE = tree;
    this.LINK = this.TREE.EMPTY_ICON;
}
function DatatreeViewExpand(span){
   var ul;
   var root = false;
   if (DatatreeViewExpand.arguments.length < 1 || span == null || span == "undefined"){
      ul = document.getElementById(DATATREE.TREE.ELEMENT_INNER_WRAPPER);
      root = true;
   } else {
      ul = this.ViewFindUlFromSpan(span);
   }
   if (ul){
     if (root == false){
        ul.style.display = "block";
        var li = this.ViewFindLiFromSpan(span);
        if (li){
           var arrow = li.getElementsByClassName('datatree_arrow')[0];
           if (arrow && arrow.firstChild.className != "empty"){
              arrow.innerHTML = DATATREE.TREE.OPEN_ICON;
           }
        }
     }
     var uls = ul.getElementsByClassName('datatree_ul');
     for (var count = 0; count < uls.length; ++count){
        uls[count].style.display = 'block';
     }
     var arrows = ul.getElementsByClassName('datatree_arrow');
     for (var count = 0; count < arrows.length; ++count){
        var arrow = arrows[count];
        if (arrow.firstChild.className != "empty"){
           arrow.innerHTML = DATATREE.TREE.OPEN_ICON;
        }
     }
     if (root){
        //DatatreeViewClick(DatatreeViewRoot());
     }
   }
}
function DatatreeViewCollapse(span){
   var ul;
   var root = false;
   if (DatatreeViewCollapse.arguments.length < 1 || span == null || span == "undefined"){
      ul = document.getElementById(DATATREE.TREE.ELEMENT_INNER_WRAPPER);
      root = true;
   } else {
      ul = this.ViewFindUlFromSpan(span);
   }
   if (ul){
     if (root == false){
        ul.style.display = "none";
        var li = this.ViewFindLiFromSpan(span);
        if (li){
           var arrow = li.getElementsByClassName('datatree_arrow')[0];
           if (arrow && arrow.firstChild.className != "empty"){
              arrow.innerHTML = DATATREE.TREE.CLOSED_ICON;
           }
        }
     }
     var uls = ul.getElementsByClassName('datatree_ul');
     for (var count = 0; count < uls.length; ++count){
        uls[count].style.display = 'none';
     }
     var arrows = ul.getElementsByClassName('datatree_arrow');
     for (var count = 0; count < arrows.length; ++count){
        var arrow = arrows[count];
        if (arrow.firstChild.className != "empty"){
           arrow.innerHTML = DATATREE.TREE.CLOSED_ICON;
        }
     }
     if (root){
        DatatreeViewClick(DatatreeViewRoot());
     }
   }
}
function DatatreeViewRoot(){
   return document.getElementById(DATATREE.TREE.ELEMENT_INNER_WRAPPER).getElementsByTagName('li')[0];
}
function DatatreeViewClick(li){
   if (li){
     var arrow = li.getElementsByTagName('a')[0];
     var ul = li.getElementsByTagName('ul')[0];
     if (ul.style.display == "block"){
        ul.style.display = "none";
        arrow.innerHTML = DATATREE.TREE.CLOSED_ICON;
     } else if (ul.style.display == "none"){
        ul.style.display = "block";
        arrow.innerHTML = DATATREE.TREE.OPEN_ICON;
     }
   }
}
function DatatreeViewSearch(searchterm,case_sensitive,exact_matches,regular_expression,dont_change_view){
   if (DatatreeViewSearch.arguments.length < 1 || searchterm == null || searchterm == "undefined" || searchterm == ""){
      searchterm = document.getElementById(DATATREE.TREE.TOOLBAR_SEARCHBOX_NAME).value;
   }
   if (DatatreeViewSearch.arguments.length < 2 || case_sensitive != true){
      case_sensitive = false;
   }
   if (DatatreeViewSearch.arguments.length < 3 || exact_matches != true){
      exact_matches = false;
   }
   if (DatatreeViewSearch.arguments.length < 4 || regular_expression != true){
      regular_expression = false;
   }
   if (DatatreeViewSearch.arguments.length < 5 || dont_change_view != true){
      dont_change_view = false;
   }
   if (searchterm == ''){return;}
   var tree = document.getElementById(DATATREE.TREE.ELEMENT_INNER_WRAPPER);
   if (dont_change_view == false){
     DatatreeViewCollapse();
     DatatreeViewReset2(tree);
   }
   DATATREE.TEMP = 0;
   DatatreeViewSearch2(searchterm, tree, case_sensitive, exact_matches, regular_expression, dont_change_view);
   if (DATATREE.REPRESS_ALERTS==false && dont_change_view == false){
      if (DATATREE.TEMP == 0){
         alert('No results.');
      } else {
         alert('Found ' + DATATREE.TEMP + ' occurrences.');
      }
   }
}
function DatatreeViewSearch2(searchterm, ul, case_sensitive, exact_matches, regular_expression, dont_change_view){
   try{
   DATATREE.TREE.CURRENT_SEARCH_INDEX = -1;
   DATATREE.TREE.SEARCH_RESULTS.length = 0;
   var chldrn = ul.getElementsByClassName('datatree_content');
   for (var count = 0; count < chldrn.length; ++count){
     var span = chldrn[count];
     var ROOT = false;
     if (DatatreeViewSpanIsRoot(span)){
        ROOT = true;
     }
     var txt = span.innerHTML;
     var MATCHES = false;
     if (ROOT == false){
        var puretext = DATATREE.StripTags(txt);
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
       ++DATATREE.TEMP;
       if (dont_change_view == false){
         var TEXT = "<span class='search_result' style='background-color:" + DATATREE.TREE.HIGHLIGHT_BACKGROUND_COLOR + ";color:" + DATATREE.TREE.HIGHLIGHT_TEXT_COLOR + ";border:1px solid " + DATATREE.TREE.HIGHLIGHT_BACKGROUND_COLOR + ";'>" + txt + "</span>";
         span.innerHTML = TEXT;
       }
       DATATREE.TREE.SEARCH_RESULTS.push(span);
       if (dont_change_view == false){
         var node = span.parentNode;
         while (node.nodeName.toLowerCase() != 'div'){
           if (node.nodeName.toLowerCase() == 'ul'){
             node.style.display = 'block';
           } else if (node.nodeName.toLowerCase() == 'li' && node != span.parentNode && node.getElementsByTagName('ul').length > 0 && node.getElementsByTagName('ul')[0].getElementsByTagName('li').length > 0){
             node.getElementsByTagName('a')[0].innerHTML = DATATREE.TREE.OPEN_ICON;
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
      DatatreeViewNext();
   }
   }catch(exc){
      if(DATATREE.REPRESS_ALERTS==false){
         alert(exc);
      }
   } 
}

function DatatreeViewSpanIsRoot(span){
     var ROOT = false;
     var li = span.parentNode;
     while (li.nodeName.toLowerCase() != "li"){
        li = li.parentNode;
     }
     var ul = li.parentNode;
     while (ul.nodeName.toLowerCase() != "ul"){
        ul = ul.parentNode;
     }
     if (ul.id == DATATREE.TREE.ELEMENT_INNER_WRAPPER){
        ROOT = true;
     }
     return ROOT;
}

function DatatreeViewNext(){
   if (DATATREE.TREE.CURRENT_SEARCH_INDEX < DATATREE.TREE.SEARCH_RESULTS.length - 1){
      ++DATATREE.TREE.CURRENT_SEARCH_INDEX;
   }
   if (DATATREE.TREE.CURRENT_SEARCH_INDEX < DATATREE.TREE.SEARCH_RESULTS.length){
      var span = DATATREE.TREE.SEARCH_RESULTS[DATATREE.TREE.CURRENT_SEARCH_INDEX];
      if (span){
        DATATREE.TREE.ViewOpenToSpan(span);
        DATATREE.TREE.ScrollToSpan(span);
      }
   }
}

function DatatreeViewPrevious(){
   if (DATATREE.TREE.CURRENT_SEARCH_INDEX > 0){
      --DATATREE.TREE.CURRENT_SEARCH_INDEX;
   }
   if (DATATREE.TREE.CURRENT_SEARCH_INDEX >= 0){
      var span = DATATREE.TREE.SEARCH_RESULTS[DATATREE.TREE.CURRENT_SEARCH_INDEX];
      DATATREE.TREE.ViewOpenToSpan(span);
      DATATREE.TREE.ScrollToSpan(span);
   }
}

function DatatreeViewClose(){
   DATATREE.TREE.SELECTED_SPAN = null;
   DatatreeViewCollapse();
}
function DatatreeViewReplace(searchterm,replace_with,case_sensitive,exact_matches){
       document.getElementById(DATATREE.TREE.TOOLBAR_REPLACE_NAME).value = "";
       document.getElementById(DATATREE.TREE.TOOLBAR_REPLACE_WITH_NAME).value = "";
       DatatreeViewSearch(searchterm,case_sensitive,exact_matches,false,true);
       if (DATATREE.TREE.REPLACE_RESULT_MESSAGE == true){
           if (DATATREE.TREE.SEARCH_RESULTS.length > 0){
               if (DATATREE.REPRESS_ALERTS == false) { alert('Your search returned: ' + DATATREE.TREE.SEARCH_RESULTS.length + ' results. You might have to scroll to view them.'); }
           } else {
               if (DATATREE.REPRESS_ALERTS == false) { alert('No results.'); }
           }
       }
       var amount = DATATREE.TREE.SEARCH_RESULTS.length;
       if (DATATREE.TREE.SEARCH_RESULTS != null && DATATREE.TREE.SEARCH_RESULTS.length > 0){
          DatatreeViewClose();
          for (var count = 0; count < DATATREE.TREE.SEARCH_RESULTS.length; ++count){
             var locate = DATATREE.TREE.SEARCH_RESULTS[count]; // span
             if (locate != null){
                var replace_result = "<span class=\"replace_result\" style=\"background-color:" + DATATREE.TREE.HIGHLIGHT_BACKGROUND_COLOR + ";color:" + DATATREE.TREE.HIGHLIGHT_TEXT_COLOR + ";\">" + searchterm + "</span>";
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
                var stripped = DATATREE.StripTags(unstripped);
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
                for (g in goodindices){
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
                    node.getElementsByTagName('a')[0].innerHTML = DATATREE.TREE.OPEN_ICON;
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
function DatatreeViewInitReplaceResults(){
    DATATREE.TREE.REPLACE_RESULTS.length = 0;
    DATATREE.TREE.CURRENT_REPLACE_INDEX = -1;
    var spans = document.getElementById(DATATREE.TREE.ELEMENT_OUTER_WRAPPER).getElementsByClassName("replace_result");
    for (var count = 0; count < spans.length; ++count){
         var span = spans[count];
         //if (span.className && span.className == "replace_result"){
            DATATREE.TREE.REPLACE_RESULTS.push(span);
         //}
    }
    if (DATATREE.TREE.REPLACE_RESULTS.length > 0){
       document.getElementById(DATATREE.TREE.ELEMENT_INNER_WRAPPER).scrollTop = 0;
       DATATREE.TREE.CURRENT_REPLACE_INDEX = 0;
       var span = DATATREE.TREE.REPLACE_RESULTS[0];
       var y = DATATREE.TREE.GetScrollForSearch(span);
       document.getElementById(DATATREE.TREE.ELEMENT_INNER_WRAPPER).scrollTop = y;
    }
}
function DatatreeViewCancelFullScreenEdit(){
   document.getElementById(DATATREE.TREE.ELEMENT_OUTER_WRAPPER).innerHTML = DATATREE.TREE.VIEW;
}
function DatatreeViewAlphabetize(mode,start,finish){
   if (mode == "numbers"){
      if (typeof(start) != "number" || typeof(finish) != "number"){
          if (DATATREE.REPRESS_ALERTS == false) { alert("invalid numbers"); }
          return null;
      }
      if (start >= finish){
          if (DATATREE.REPRESS_ALERTS == false){ alert("start not less than finish"); }
          return null;
      }
      if (start < 0 || finish < 0){
          if (DATATREE.REPRESS_ALERTS == false){ alert("out of range error");  }
          return null;
      }
      var root = DatatreeViewRoot();
      var spans = root.getElementsByClassName("datatree_content");
      if (start > spans.length || finish > spans.length){
          if (DATATREE.REPRESS_ALERTS == false){ alert("out of range error");  }
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
         if (DATATREE.REPRESS_ALERTS == false){ alert("start and finish do not have the same parent"); }
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
                if (DATATREE.StripTags(later.innerHTML).toLowerCase() < DATATREE.StripTags(earlier.innerHTML).toLowerCase()){
                   var temp = earlierparent1.innerHTML;
                   earlierparent1.innerHTML = laterparent1.innerHTML;
                   laterparent1.innerHTML = temp;
                }
              }
           }
        }
      }
   } else if (mode == "strings"){
      var root = DatatreeViewRoot();
      var spans = root.getElementsByClassName("datatree_content");
      var startline = -1;
      var finishline = -1;
      for (var count = 0; count < spans.length; ++count){
         var span = spans[count];
         var text = DATATREE.StripTags(span.innerHTML);
         if (text == start){
            startline = count;
         } else if (text == finish){
            finishline = count;
         }
         if (startline >= 0 && finishline >= 0){
            break;
         }
      }
      DatatreeViewAlphabetize("numbers",startline,finishline);
   }
}
function DatatreeViewNumber(tree){
   //if (DatatreeViewNumber.arguments.length < 1 || tree == null || tree == "undefined"){
      //tree = DATATREE.TREE;
   //}
   var root = DatatreeViewRoot();
   var spans = root.getElementsByClassName('datatree_content');
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
function DatatreeViewIndex(start,stop){
   if (DatatreeViewIndex.arguments.length != 2)
      return;
   try{
      start = parseInt(start);
      stop = parseInt(stop);
   } catch(exc){
      return;
   }
   if (start >= stop)
      return;
   var root = DatatreeViewRoot();
   var spans = root.getElementsByClassName('datatree_content');
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
function DatatreeViewReset(what){
   if (DatatreeViewReset.arguments.length < 1){
      what = "*";
   }
   DATATREE.CloseEditBox();
   if (what == "title"){
      DATATREE.TREE.Query('CREATE FROM HTML ' + DATATREE.TREE.PrintHtml(true));
      return;
   }
   var ul = document.getElementById(DATATREE.TREE.ELEMENT_INNER_WRAPPER);
   if (ul){
      DatatreeViewReset2(ul,what);
   } else {//?
      //document.getElementById(DATATREE.TREE.ELEMENT_OUTER_WRAPPER).innerHTML = DATATREE.TREE.VIEW;
   }
   if (what == "*"){
     DATATREE.TREE.SELECTED_SPAN = null;
     DatatreeViewCollapse();
   }
}
function DatatreeViewReset2(ul,what){
   if (what == "*"){
      for (s in DATATREE.TREE.MOUSE_DRAG_SPANS){
         var span = DATATREE.TREE.MOUSE_DRAG_SPANS[s];
         DatatreeUnhighlightSpan(span);
      }
      if (DATATREE.TREE.SELECTED_SPAN){
         DatatreeUnhighlightSpan(DATATREE.TREE.SELECTED_SPAN);
      }
      DATATREE.TREE.SELECTED_SPAN = null;
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
      ul.innerHTML = ul.innerHTML.split(DATATREE.SKIP_MESSAGE).join(DATATREE.TREE.REPLACE);
      while (ul.getElementsByClassName('replace_result').length > 0){
        var spans = ul.getElementsByClassName('replace_result');
        for (var count = 0; count < spans.length; ++count){
          var span = spans[count];
          var parent = span.parentNode;
          while (parent.nodeName.toLowerCase() != 'span' && parent.className != 'datatree_content'){
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
   DATATREE.TREE.ResetReplace();
}
function DatatreeViewReset2_(ul){
   var spans = ul.getElementsByTagName('span');for (var count = 0; count < spans.length; ++count){var span = spans[count];if (span.style.backgroundColor == 'cyan' || span.style.backgroundColor == 'rgb(0, 255, 255)'){if (span.className.indexOf('searchresult') >= 0){span.style.backgroundColor = '';span.style.color = '';span.className = span.className.split('searchresult').join('');if (DatatreeViewTrim(span.className) == ''){span.className = '';
}}}}}

function DatatreeViewTrim(strng){
   var result = strng;var index = 0;for (var count = 0; count < result.length; ++count){var chr = result.charAt(count);if (!chr.match(/\\S/)){++index;continue;} else {break;}}if (index < result.length){result = result.substring(index, result.length);} else {result = '';}for (var count = result.length; count >= 0; --count){var chr = result.charAt(count);if (!chr.match(/\\S/)){continue;} else {if (count < result.length){result = result.substring(0, count + 1);}break;}}return result;
}
function DatatreeViewGetList(){
   var UL = document.getElementById(this.ELEMENT_INNER_WRAPPER);
   var LI = UL.getElementsByTagName("li")[0];
   var list = LI.getElementsByTagName("ul")[0];
   DATATREE.TEMP = document.createElement("div");
   DATATREE.TEMP.innerHTML = "<ul>" + list.innerHTML + "</ul>";
   var ul = DATATREE.TEMP.getElementsByTagName("ul")[0];
   this.ViewGetList2(ul);//***********************************************************************************
   var result = DATATREE.TEMP.innerHTML;
   return result;
}
function DatatreeViewGetList2(ul){
   var children = ul.childNodes;
   for (c in children){
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
         if (arrow && arrow.className && arrow.className == "datatree_arrow"){
            child.removeChild(arrow);
         }
         if (span && span.className && span.className == "datatree_content"){
            var txt = span.innerHTML;
            child.removeChild(span);
            child.removeChild(ul);
            child.innerHTML = txt;
            child.appendChild(ul);
         }
         DatatreeViewGetList2(ul);
      }
   }
}

function DatatreeView(action,newval){
      if (DatatreeView.arguments.length < 2){
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
      } else if (type == "object" || type == "datatreebranch"){
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
      this.ResetToolbarSelect();
}
function DatatreeViewIndexOfSpan(searchforspan){
   var root = document.getElementById(this.ELEMENT_INNER_WRAPPER);
   var li = root.getElementsByTagName("li")[0];
   DATATREE.TEMP = new Array();
   this.ViewSpandex(li,searchforspan,false);
   var result = -1;
   for (var count = 0; count < DATATREE.TEMP.length; ++count){
      var s = DATATREE.TEMP[count];
      if (s === searchforspan){
         result = count-1;
         break;
      }
   }
   DATATREE.TEMP.length = 0;
   DATATREE.TEMP = null;
   return result;
}
function DatatreeViewSpandex(li,searchforspan,found){
   var span = this.ViewFindSpanFromLi(li);
   var ul = li.getElementsByTagName("ul")[0];
   DATATREE.TEMP.push(span);
   if (span == searchforspan){
      //found = true;
      //return;
   }
   if (found == false && ul.hasChildNodes()){
      for (n in ul.childNodes){
         var node = ul.childNodes[n];
         if (node.nodeName && node.nodeName.toLowerCase() == "li"){
            this.ViewSpandex(node,searchforspan,found);
         }
      }
   }
}
function DatatreeViewOpenToSpan(span){
   var li = span.parentNode;
   var ul = li;
   while(li && ul && ul.id != this.ELEMENT_INNER_WRAPPER){
      while (li.nodeName.toLowerCase() != "li"){
         li = li.parentNode;//li containing span
      }
      var ul = li.parentNode;
      while (ul.nodeName.toLowerCase() != "ul"){
         ul = ul.parentNode;//ul containing li
      }
      ul.style.display = "block";
      if (ul.id != this.ELEMENT_INNER_WRAPPER){
         li = ul.parentNode;
         li.getElementsByTagName("a")[0].innerHTML = this.OPEN_ICON;
      }
   }
}
function DatatreeScrollToSpan(span){
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
function DatatreeViewFindSpanFromLi(li){
   var spans = li.getElementsByTagName("span");
   var span;
   for (s in spans){
      if (spans[s].className == "datatree_content"){
         span = spans[s];
         break;
      }
   }
   return span;
}
function DatatreeViewFindLiFromSpan(span){
   var result = null;
   if (span){
      result = span.parentNode;
      while (result.nodeName.toLowerCase() != "li" && result.className != "datatree_li"){
         result = result.parentNode;
      }
   }
   return result;
}
function DatatreeViewFindUlFromSpan(span){
   var result = null;
   if (span){
      var parent = this.ViewFindLiFromSpan(span);
      if (parent){
         result = parent.getElementsByClassName("datatree_ul")[0];
      }
   }
   return result;
}
function DatatreeViewA(link){
   return "<a class='datatree_arrow' style='text-decoration:none;' onclick='return clicktree(event);' href='javascript:void(0);'>" + link + "</a>";
}
function DatatreeViewSpan(text){
   if(text.search("datatree_content") >= 0){//********************************************************10.0
       return text;
   }
   return "<span class='datatree_content' style='white-space:pre-wrap;padding-left:10px;' onmousedown='return DatatreeMouseDownSpan(event);' onmouseup = 'return DatatreeMouseUpSpan(event);' onclick = 'return DatatreeClickSpan(event);'>" + text + "</span>";
   
}
function DatatreeViewUl(display){
   return "<ul class='datatree_ul' style='list-style-type:none;display:" + display + ";'></ul>";
}
function DatatreeViewLi(){
      var li = document.createElement("li");
      li.style.whiteSpace = "nowrap";
      li.className = "datatree_li";
      return li;
}
function DatatreeViewListElement(newnode){
   var li = this.ViewLi();
   var a = this.ViewA(newnode.LINK);
   var span = this.ViewSpan(newnode.TEXT);
   var ul = this.ViewUl(newnode.DISPLAY);
   li.innerHTML = a + span + ul;
   return li;
}
function DatatreeViewOverwrite(newval){ 
   this.SELECTED_SPAN.innerHTML = newval;
}
function DatatreeViewSibling(newnode){
      var source = this.SELECTED_SPAN;
      var parent = source.parentNode;
      while (parent.nodeName.toLowerCase() != "li"){
         parent = parent.parentNode;
      }
      var child = parent;
      while (parent.nodeName.toLowerCase() != "ul"){
         parent = parent.parentNode;
      }
      var li = this.ViewListElement(newnode);
      var children = parent.childNodes.length;
      var index = 0;
      var temp = parent.firstChild;
      while (temp != child){
         ++index;
         temp = temp.nextSibling;
      }
      if (index == children){
         parent.appendChild(li);
      } else if (index+1 <= children){
         parent.insertBefore(li,child.nextSibling);
      }
}
function DatatreeViewChild(newnode){
      var source = this.SELECTED_SPAN;
      var parent = source.parentNode;
      while (parent.nodeName.toLowerCase() != "li"){
         parent = parent.parentNode;
      }
      var grandparent = parent;
      if (parent.getElementsByTagName("ul")){
         parent = parent.getElementsByTagName("ul")[0];
      } else {
         var temp = document.createElement("ul");
         parent.appendChild(temp);
         parent = temp;
      }
      var li = this.ViewListElement(newnode);
      parent.appendChild(li);
      grandparent.getElementsByTagName("a")[0].innerHTML = this.OPEN_ICON;
      grandparent.getElementsByTagName("ul")[0].style.display = "block";
}
function DatatreeViewSwap(node1,node2,parent){
      var temp1 = document.createElement("li");
      var temp2 = document.createElement("li");
      parent.replaceChild(temp1,node1);
      parent.replaceChild(temp2,node2);
      parent.replaceChild(node2,temp1);
      parent.replaceChild(node1,temp2);
}
function DatatreeViewUp(){
      var source = this.SELECTED_SPAN;
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
      for (n in parent.childNodes){//count parents children and find index of span
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
function DatatreeViewDown(){
      var source = this.SELECTED_SPAN;
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
      for (n in parent.childNodes){
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
function DatatreeViewSelright(){
      this.ViewSecright(false);
}
function DatatreeViewSecright(with_children){
   if (DatatreeViewSecright.arguments.length < 1 || with_children === ""){
      with_children = true;
   }
   if (this.MOUSE_DRAG_SPANS.length > 1){
      for (var count = 0; count < this.MOUSE_DRAG_SPANS.length; ++count){
         var result = this.ViewRight(with_children,this.MOUSE_DRAG_SPANS[count]);
         if (result == false){
            break;
         }
      }
   } else if (this.SELECTED_SPAN){
      this.ViewRight(with_children,this.SELECTED_SPAN);
   } else if (this.MOUSE_DRAG_SPANS.length > 0){
      this.ViewRight(with_children,this.MOUSE_DRAG_SPANS[0]);
   } else {
      alert("error in secright");
   }
}
function DatatreeViewRight(with_children,source){
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
         child.getElementsByTagName("a")[0].innerHTML = this.EMPTY_ICON;//make children siblings
      }
      var outerarrow = parent;
      for (var count = 0; count < outerarrow.childNodes.length; ++count){//find previous sibling and change its icon to an arrow
         if (count+1 < outerarrow.childNodes.length && outerarrow.childNodes[count+1] == child){
            outerarrow = outerarrow.childNodes[count];
            outerarrow.getElementsByTagName("a")[0].innerHTML = this.OPEN_ICON;
            outerarrow.getElementsByTagName("ul")[0].style.display = "block";
            break;
         }
      }
      var children = new Array();
      var index = -1;
      var found = false;
      for (n in parent.childNodes){
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
         if (DatatreeViewSecright.arguments.length > 0 && with_children == false && child.getElementsByTagName("ul")[0].hasChildNodes()){
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
            for (n in grandchildren){
               children[index-1].getElementsByTagName("ul")[0].appendChild(grandchildren[n]);
            }
         }
      }
}
function DatatreeViewLeft(){
   if (this.MOUSE_DRAG_SPANS.length > 1){
      for (var count = 0; count < this.MOUSE_DRAG_SPANS.length; ++count){
         this.View_Left(this.MOUSE_DRAG_SPANS[count]);
      }
   } else if (this.SELECTED_SPAN){
      this.View_Left(this.SELECTED_SPAN);
   } else if (this.MOUSE_DRAG_SPANS.length > 0){
      this.View_Left(this.MOUSE_DRAG_SPANS[0]);
   }
}
function DatatreeView_Left(source){
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
      for (n in parent.childNodes){//count parents children and find index of span
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
      if (parent.id == this.ELEMENT_INNER_WRAPPER){//can't go left
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
         for (n in grandparent.childNodes){//count children of grandparent, and find index of parent in grandparent
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
         child.getElementsByTagName("a")[0].innerHTML = this.OPEN_ICON;
         child.getElementsByTagName("ul")[0].style.display = "block";
        }
        if (parent.hasChildNodes() == false){// || parent.childNodes.length == 1 || parent.firstChild == child){
          var outerarrow = parent.parentNode;
          while (outerarrow.nodeName.toLowerCase() != "li"){
             outerarrow = outerarrow.parentNode;
          }
          outerarrow = outerarrow.getElementsByTagName("a")[0];
          outerarrow.innerHTML = this.EMPTY_ICON;
        }

      }
}
function DatatreeViewCut(){
   DATATREE.CLIPBOARD.length = 0;
   if (this.MOUSE_DRAG_SPANS.length > 1){
      for (var count = 0; count < this.MOUSE_DRAG_SPANS.length; ++count){
         this.View_Cut(this.MOUSE_DRAG_SPANS[count]);
      }
   } else if (this.SELECTED_SPAN){
      this.View_Cut(this.SELECTED_SPAN);
   } else if (this.MOUSE_DRAG_SPANS.length > 0){
      this.View_Cut(this.MOUSE_DRAG_SPANS[0]);
   }
}
function DatatreeView_Cut(source){
      var parent = source.parentNode;
      while (parent.nodeName.toLowerCase() != "li"){
         parent = parent.parentNode;
      }
      var child = parent;//li containing span
      while (parent.nodeName.toLowerCase() != "ul"){
         parent = parent.parentNode;//ul containing li
      }
      parent.removeChild(child);
      DATATREE.CLIPBOARD.push(child);
      if (parent.hasChildNodes() == false){
         var grandparent = parent.parentNode;
         while (grandparent.nodeName.toLowerCase() != "li"){
            grandparent = grandparent.parentNode;
         }
         grandparent.getElementsByTagName("a")[0].innerHTML = this.EMPTY_ICON;
      }
}
function DatatreeViewCopysec(){
   DATATREE.CLIPBOARD.length = 0;
   if (this.MOUSE_DRAG_SPANS.length > 1){
      for (var count = 0; count < this.MOUSE_DRAG_SPANS.length; ++count){
         this.ViewCopy(this.MOUSE_DRAG_SPANS[count],true);
      }
   } else if (this.SELECTED_SPAN){
      this.ViewCopy(this.SELECTED_SPAN,true);
   } else if (this.MOUSE_DRAG_SPANS.length > 0){
      this.ViewCopy(this.MOUSE_DRAG_SPANS[0],true);
   }
}
function DatatreeViewCopysel(){
   DATATREE.CLIPBOARD.length = 0;
   if (this.MOUSE_DRAG_SPANS.length > 1){
      for (var count = 0; count < this.MOUSE_DRAG_SPANS.length; ++count){
         this.ViewCopy(this.MOUSE_DRAG_SPANS[count],false);
      }
   } else if (this.SELECTED_SPAN){
      this.ViewCopy(this.SELECTED_SPAN,false);
   } else if (this.MOUSE_DRAG_SPANS.length > 0){
      this.ViewCopy(this.MOUSE_DRAG_SPANS[0],false);
   }
}
function DatatreeViewCopy(source,with_children){
      var parent = source.parentNode;
      while (parent.nodeName.toLowerCase() != "li"){
         parent = parent.parentNode;
      }
      var child = parent;//li containing span
      while (parent.nodeName.toLowerCase() != "ul"){
         parent = parent.parentNode;//ul containing li
      }
      if (DatatreeViewCopy.arguments.length > 1 && with_children == true){
         var clone = child.cloneNode(true);
         if (with_children == false){
            clone.getElementsByTagName("a")[0].innerHTML = this.EMPTY_ICON;
         }
         DATATREE.CLIPBOARD.push(clone);
      } else {
         var clone = child.cloneNode(true);
         if (clone.getElementsByTagName("ul")){
            clone.getElementsByTagName("ul")[0].innerHTML = "";
         }
         if (with_children == false){
            clone.getElementsByTagName("a")[0].innerHTML = this.EMPTY_ICON;
         }
         DATATREE.CLIPBOARD.push(clone);
      }
}
function DatatreeViewPaste(){
   if (this.SELECTED_SPAN && DATATREE.CLIPBOARD.length > 0){
      var temp = this.SELECTED_SPAN;
      for (var count = 0; count < DATATREE.CLIPBOARD.length; ++count){
         this.View_Paste(this.SELECTED_SPAN,DATATREE.CLIPBOARD[count]);
         this.SELECTED_SPAN = this.ViewFindSpanFromLi(DATATREE.CLIPBOARD[count]);//.getElementsByTagName("span")[0];
      }
      this.SELECTED_SPAN = temp;
   }
}
function DatatreeView_Paste(source,li){
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
      for (n in parent.childNodes){//count parents children and find index of span
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
      for (s in spans){
         if (spans[s].className == "datatree_content"){
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
function DatatreeViewRemove(){
      var source = this.SELECTED_SPAN;
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
         grandparent.getElementsByTagName("a")[0].innerHTML = this.EMPTY_ICON;
      }
}
/** 8.4 **/
function DatatreeGetPopupEditInitiator(){
   return DATATREE.POPUP_EDIT_INITIATOR;
}
function DatatreeSetPopupEditInitiator(initiator){
   DATATREE.POPUP_EDIT_INITIATOR = initiator;
}
function DatatreeGetType(){
   return this.TYPE;
}
function DatatreeSetType(type, alt_editor_or_not){ // 7.9.4 used by change, (new, and edit) functions...( ) = commented out
   // problem: alt_editor is property of tree manager rather than tree
   // rule: if explicitly change type with change query, or a new or edit query with an explicit type parameter, also might change other trees on webpage
   // update: don't change alt editor property...instead, have ShowAltEditor check whether tree has changed to plain text and type text...if so, outsource to plain text editor function
   // the update allows ALT_EDITOR = true but some trees can still use plain text editor
   var current_type = this.TYPE;
   type = type.toLowerCase();
   if (current_type == type){
      return;
   }
   switch(type){
      case "text": // switch from html to plain text
         //DATATREE.ALT_EDITOR = false;
         //this.PLAIN_TEXT = true;//7.9.7
         this.TYPE = "text";
         break;
      case "html": // switch from plain text to html
      case "tree": // mostly same as html
         if (current_type != "text"){
            return;
         }
         //this.PLAIN_TEXT = false;//7.9.7
         this.TYPE = type;
         if (DatatreeSetType.arguments.length > 1 && alt_editor_or_not == true){
            //DATATREE.ALT_EDITOR = true;
         }
         break;
      default:
         break;
   }
}
function DatatreeSetTypeConditionally(type, alt_editor_or_not){ // 7.9.4 used by (load and create) functions..( ) = commented out
   // rule: if load text file into html editor, leave as html, don't change other trees on webpage to text
   // just describes rule and contrasts from SetType function
   var current_type = this.TYPE;
   if (current_type == null || current_type == "undefined"){
      current_type = "text"; // default when attribute not set
   }
   current_type = current_type.toLowerCase();
   switch(current_type){ // ignore create or load type, favor preset type (from html or javscript code)
      case "text": 
         //DATATREE.ALT_EDITOR = false;
         //this.PLAIN_TEXT = true;
         break;
      case "html": 
      case "tree": 
         //this.PLAIN_TEXT = false;
         if (DatatreeSetTypeConditionally.arguments.length > 1 && alt_editor_or_not == true){
            //DATATREE.ALT_EDITOR = true;
         }
         break;
      default:
         break;
   }
}
function DatatreeCloneBranch(){
    var tree = this.TREE;
    var branch = new tree.Branch(this.TEXT, this.TREE);
    for (var count = 0; count < this.CHILDREN.length; ++count){
       branch.AddBranch(this.CHILDREN[count].Clone());
       //branch.CHILDREN.push(this.CHILDREN[count].Clone());
    }
    return branch;
}
function DatatreeInit(){
    this.ROOT_NODE = this.TreeFromString(this.CONTENT, this.TITLE, this.TYPE);
    this.VIEW = this.GetView();
    this.InsertClickTreeText();
    this.InsertEditTreeText();
    this.RefreshGUI();
}
function DatatreeGetTreeFromName(name){
   var tree = null;
   if (document.getElementById(name)){
      for (var count = 0; count < DATATREE.TREES.length; ++count){
         var t = DATATREE.TREES[count];
         if (t.NAME == name){
            tree = t;
            break;
         }
      }
   }
   return tree;
}
function DatatreeSetTreeFromName(name){ // 9.6
   if (name != DATATREE.TREE.NAME){ 
     var tree = DATATREE.GetTreeFromName(name); 
     if (tree != null){
         DATATREE.TREE = tree;
		 if (DATATREE.TREES.length > 1){
		    DatatreeHighlightTree(name);
		 }
     }
   }
}
function DatatreeHighlightTree(name){ // 9.6
   try{ 
	  for (t in DATATREE.TREES){
	     document.getElementById(DATATREE.TREES[t].NAME).style.border = "1px solid white";
	  }
      var tree = document.getElementById(name);
	  tree.style.border = "1px solid green";
   }catch(exc){
   }
}
function DatatreeGetFileNameFromPath(path){
    var splits = path.split("/");
    var name = splits[splits.length - 1];
    var names = name.split("\\");
    name = names[names.length - 1];
    return name;
}
function DatatreeSubmitEdit(html, mode, selectedspan){ 
    try{ 

    var TOOLBARTREE = DATATREE.GetInitiator(); //DATATREE.TREE; // .TREE var had problem with popups when multiple trees...couldn't mouse over other tree

    var span = null;
    if (DatatreeSubmitEdit.arguments.length == 3){
       span = selectedspan;
       TOOLBARTREE.ResetToolbarSelect();
    } else if (document.getElementById('datatree_editbox')){
       span = document.getElementById('datatree_editbox').span;//source event passed to ShowEditBox
    } else {
       span = DATATREE.ALT_EDITOR_TARGET_SPAN;
    }
    if (DATATREE.StringTrim(html) == ""){
       return;
    }

    if (html.indexOf('<table') >= 0){ 
       html = html.split("<strong>").join("<b>").split("</strong>").join("</b>").split("<em>").join("<i>").split("</em>").join("</i>");
    }
    var PLAINTEXT = false;
    if (document.getElementsByName('datatree_text_or_html')){//if edited with popup, check if pressed text button
       var radios = document.getElementsByName('datatree_text_or_html');
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

    DATATREE.CloseEditBox();
    if (DATATREE.ALT_EDITOR == true){
        //DatatreeRemoveAltEditorInstance(); //************************************errors
    }

    if (DATATREE.GetBrowser() == "IE"){
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
       if (DATATREE.StringTrim(html) == ""){
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

    var newnode = new TOOLBARTREE.Branch(html, TOOLBARTREE); 
    var macro_index = index - 1;
    var micro_index = 0;

    if (DatatreeSubmitEdit.arguments.length < 2 || mode == "overwrite"){

       TOOLBARTREE.View("overwrite",newnode.TEXT);
    } else if (mode == "sibling") {

       TOOLBARTREE.View("sibling",newnode);
       TOOLBARTREE.UnhighlightSpan(span);
    } else if (mode == "child") {

       TOOLBARTREE.View("child",newnode);
       TOOLBARTREE.UnhighlightSpan(span);
    }
    } catch (exc) {
      if (DATATREE.REPRESS_ALERTS == false){
        alert(exc);
      }
    }
}
function DatatreeEvenSpacing(node){
   if (DatatreeEvenSpacing.arguments.length <= 0){
      node = this.ROOT_NODE;
   }
   this.EvenSpacing2(node);
}
function DatatreeEvenSpacing2(node){
   try{
   if (node == this.ROOT_NODE){
      node.INDENTATION = 0;
   } else {
      node.INDENTATION = node.GetLevel() * node.TREE.INDENTATION;
   }
   for (var count = 0; count < node.CHILDREN.length; ++count){
      var child = node.CHILDREN[count];
      DatatreeEvenSpacing2(child);
   }
   } catch (exc) {  }
}
function DatatreeIndent(node,rightleft,indent_children){
   if (rightleft == "right"){
      node.INDENTATION += node.TREE.INDENTATION;
   } else if (rightleft == "left" && node.INDENTATION - node.TREE.INDENTATION >= 0){
      node.INDENTATION -= node.TREE.INDENTATION;
   } else {
      return;
   }
   if (indent_children){
      for (var count = 0; count < node.CHILDREN.length; ++count){
        var child = node.CHILDREN[count];
        DatatreeIndent(child,rightleft,indent_children);
      }
   }
}
function DatatreeCleanHTML(txt){
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
function DatatreeAddBranch(node,update){
    node.TEXT = DatatreeCleanHTML(node.TEXT);
    this.CHILDREN.push(node);
    node.PARENT_NODE = this;
    this.LINK = this.TREE.OPEN_ICON;
    if (DatatreeAddBranch.arguments.length > 1 && update == true){
      //node.INDENTATION = this.INDENTATION + this.TREE.INDENTATION;//problems with left/right
      var index = this.TREE.NODES.indexOf(this) + 1;
      //var index = this.TREE.NODES.indexOf(this) + node.GetIndex() + 1;
      this.TREE.NODES.splice(index, 0, node);
    }
}
function DatatreeInsertBranch(node, index, update, thisindex){
    try{
        this.CHILDREN.splice(index, 0, node);
        node.PARENT_NODE = this;
        this.LINK = this.TREE.OPEN_ICON;
        if (DatatreeInsertBranch.arguments.length > 3 && update == true && thisindex >= 0){
          //node.INDENTATION = this.INDENTATION + this.TREE.INDENTATION;//problems with left/right
          //var thisindex = this.TREE.NODES.indexOf(this);
          var macro_index = thisindex + index + 1;
          //var macro_index = this.TREE.NODES.indexOf(this) + node.GetIndex() + 1;//what if node has been removed?index=-1
          this.TREE.NODES.splice(macro_index, 0, node);
        }
    } catch (exc) {
       if (DATATREE.REPRESS_ALERTS == false) { alert(exc); }
    }
}
function DatatreeClickTreeText(){
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
    var clicktree = "function clicktree(evt){if (!evt){evt = window.event;}var source = evt.target? evt.target : evt.srcElement;if (source.nodeName.toLowerCase() == 'img' && source.className=='closed'){source = source.parentNode;source.innerHTML = \"" + _OPEN_ + "\";} else if (source.nodeName.toLowerCase() == 'img' && source.className=='open'){source = source.parentNode;source.innerHTML = \"" + _CLOSED_ + "\";} else if (source.nodeName.toLowerCase() == 'span' && source.className == 'closed'){source = source.parentNode;source.innerHTML = \"" + _OPEN_ + "\";} else if (source.nodeName.toLowerCase() == 'span' && source.className == 'open'){source = source.parentNode;source.innerHTML = \"" + _CLOSED_ + "\";}if (source.firstChild.nodeName.toLowerCase() == 'img' && source.firstChild.className != 'empty'){chldrn = source.parentNode.getElementsByTagName('ul')[0];if (chldrn.style.display == 'block'){chldrn.style.display = 'none';} else {chldrn.style.display = 'block';}} else if (source.firstChild.nodeName.toLowerCase() == 'span' && source.firstChild.className != 'empty'){chldrn = source.parentNode.getElementsByTagName('ul')[0];if (chldrn.style.display == 'block'){chldrn.style.display = 'none';} else {chldrn.style.display = 'block';}}}";
    return clicktree;
}
function DatatreeInsertClickTreeText(){
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("id", "tree_script");
    var clicktreeText = document.createTextNode(this.ClickTreeText());
    script.appendChild(clicktreeText);
    document.head.appendChild(script);
}
function DatatreeRefresh(){
    this.VIEW = this.GetView();
    this.RefreshGUI();
}
function DatatreeRefreshGUI(){
    if (this && document.getElementById(this.ELEMENT_OUTER_WRAPPER)){
      if (this.VIEW == "undefined"){
        this.VIEW = this.GetView();
      } else if (this.VIEW == null){
        this.VIEW = this.GetView();
      }
      document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.VIEW;
    } else if (document.getElementById(DATATREE.DEFAULT_OUTER_WRAPPER)){
      document.getElementById(DATATREE.DEFAULT_OUTER_WRAPPER).innerHTML = this.VIEW;
    }
}
function DatatreeQueryDocumentation(){
   if (DATATREE.AltQueryDocumentation != ""){
      DATATREE.AltQueryDocumentation();
   } else {
	   window.open(DATATREE.DOCUMENTATION_ADDRESS,"other");
   }
}
function DatatreeLoadFromTextarea(type, preload){ 
       var text = "";
       if (DatatreeLoadFromTextarea.arguments.length == 2 && preload != null && preload != "undefined" && preload != ""){
          text = preload;
       }
       if (DATATREE.ALT_EDITOR == true){
          DATATREE.ALT_EDITOR = false;
          DATATREE.TEMP = "RESET ALT EDITOR";
       }
       this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML;
       document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return DatatreeRestoreView();'>CANCEL</button><button type='button' onclick='return DatatreeLoadFromTextarea2();'>SUBMIT >>></button><br/><textarea id='datatree_load_area' style='white-space:pre;min-width:500px;min-height:500px;width:100%;' class='" + type + "'>" + text + "</textarea>";
       //this.RefreshGUI();
}
function DatatreeEncodeArrows(txt,spans){//8.0
   var result = txt;
   if (DATATREE.TREE != null && DATATREE.TREE != "undefined" && DATATREE.TREE.TYPE.toLowerCase() != "text"){
      if (DatatreeEncodeArrows.arguments.length == 0 || spans == true){
         result = txt.split("&amp;nbsp;").join(" ").split("&nbsp;").join(" ").split(" &lt; ").join(" < ").split(" &gt; ").join(" > ").split(" &lt;= ").join(" <= ").split(" &gt;= ").join(" >= ").split(" < ").join(" <span><</span> ").split(" <= ").join(" <span><</span>= ").split(" > ").join(" <span>></span> ").split(" >= ").join(" <span>></span>= ");
         // do not remove blanks from around the arrows, or add blanks inside the spans, or else a second encoding would put double-spans around the first spans
      } else {
         result = txt.split("&amp;nbsp;").join(" ").split("&nbsp;").join(" ").split(" &lt; ").join(" < ").split(" &gt; ").join(" > ").split(" &lt;= ").join(" <= ").split(" &gt;= ").join(" >= ").split(" < ").join(" &lt; ").split(" <= ").join(" &lt;= ").split(" > ").join(" &gt; ").split(" >= ").join(" &gt;= ");
      }
   }
   return result;
}
function DatatreeLoadFromTextarea2(type){ 
       var c;
	  if (DatatreeLoadFromTextarea2.arguments.length > 0 && type != null && type != "undefined" && type != ""){
	     c = type;
	  } else {
          c = document.getElementById('datatree_load_area').className;
	  }
       var txt = "";
       if (c == "html" && DATATREE.ALT_EDITOR == true && DatatreeLoadFromTextarea2.arguments.length < 1){
           txt = DatatreeGetAltEditorContent();
           //txt = txt.split("span class=\"table\"").join("table").split("span class=\"tbody\"").join("tbody").split("span class=\"tr\"").join("tr").split("span class=\"td\"").join("td").split("%%%%%</span>").join("</tbody>").split("%%%%</span>").join("</td>").split("%%%</span>").join("</tr>").split("%%</span>").join("</table>");
       } else {
           txt = document.getElementById('datatree_load_area').value;
           txt = DATATREE.EncodeArrows(txt,true);//8.0
           if (DATATREE.TEMP == "RESET ALT EDITOR"){
              DATATREE.ALT_EDITOR = true;
           }
       }
       DATATREE.FULL_SCREEN_MODE = false;
       if (DATATREE.TREE){
          DATATREE.TREE.SELECTED_SPAN = null;//7.8.7
          DATATREE.PLEASE_WAIT = true;
          if (c == 'text' || c == '' || c == 'undefined' || c == null){
             DATATREE.TREE.Query("CREATE FROM TEXT " + txt);
          } else if (c == 'tree' || c == 'file') {
             DATATREE.TREE.Query("CREATE FROM TREE " + txt);
          } else if (c == 'html' || c == 'list') {
		     if (DATATREE.ALT_EDITOR == true && typeof(DATATREE.CleanHTMLFromEditor) == "function"){
                     //txt = DATATREE.CleanHTMLFromEditor(txt); 
                }
                DATATREE.TREE.Query("CREATE FROM HTML " + txt); // ************************* indents unindented tables
          } else {}
       } else {
          this.SELECTED_SPAN = null;//7.8.7
          DATATREE.PLEASE_WAIT = true;
          if (c == 'text' || c == '' || c == 'undefined' || c == null){
             this.Query("CREATE FROM TEXT " + txt);
          } else {
             if (DATATREE.ALT_EDITOR == true && typeof(DATATREE.CleanHTMLFromEditor) == "function"){
                txt = DATATREE.CleanHTMLFromEditor(txt); 
             }
             this.Query("CREATE FROM HTML " + txt);
          }
       }
}
function DatatreeRestoreView(){
   document.getElementById(DATATREE.TREE.ELEMENT_OUTER_WRAPPER).innerHTML = DATATREE.TREE.VIEW;
}
function DatatreeAutoLoadFromToolbar(){
	var datatree = DATATREE.TREE? DATATREE.TREE : this;
	if (datatree){
		datatree.LoadFromToolbar();
	}
}
function DatatreeLoadFromToolbar(){
       var text = "";
       this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML;
       document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return DatatreeRestoreView();'>CANCEL</button>" + "<button type='button' onclick='return DatatreeLoadFromTextarea2(\"text\");'>TEXT FILE</button><button type='button' onclick='return DatatreeLoadFromTextarea2(\"html\");'>HTML FILE</button><!--<button type='button' onclick='return DatatreeLoadFromTextarea2(\"tree\");'>.tree.html FILE</button>--><br/><textarea id='datatree_load_area' style='white-space:pre;min-width:500px;min-height:500px;width:100%;' ></textarea>";
       //this.RefreshGUI();
}
function DatatreeEdit(type, text){
    if (type == "html" && DATATREE.ALT_EDITOR == true){
        DATATREE.AltLoadFromTextarea(type, text);
    } else {
        this.LoadFromTextarea(type, text);
    }
}
function DatatreeAutoToolbarSelect(choice){ 
   var TOOLBARTREE = DATATREE.TREE;
   if (TOOLBARTREE == null || TOOLBARTREE == "undefined"){
      TOOLBARTREE = DATATREE.TREES[0];
      if (TOOLBARTREE == null || TOOLBARTREE == "undefined"){
         return;
      }
   }
   var combobox;
   var selection;
   if (DatatreeAutoToolbarSelect.arguments.length > 0 && choice != ""&& choice != null && choice != "undefined"){
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
         DATATREE.CloseMenu();
         return;
         break;
      case "overwrite":
         if (TOOLBARTREE.MOUSE_DRAG_SPANS.length > 1){
            combobox.selectedIndex = 0;
            return;
         }
         DATATREE.SetInitiator(TOOLBARTREE);
         if (DATATREE.ALT_EDITOR == true){
            DatatreeShowAltEditBox(TOOLBARTREE.CLICK_X, TOOLBARTREE.CLICK_Y, TOOLBARTREE.SELECTED_SPAN,'overwrite');
         } else {
            DatatreeShowEditBox(TOOLBARTREE.CLICK_X, TOOLBARTREE.CLICK_Y, TOOLBARTREE.SELECTED_SPAN,'overwrite');
         }
         break;
      case "child":
         if (TOOLBARTREE.MOUSE_DRAG_SPANS.length > 1){
            combobox.selectedIndex = 0;
            return;
         }
         DATATREE.SetInitiator(TOOLBARTREE);
         if (DATATREE.ALT_EDITOR == true){
            DatatreeShowAltEditBox(TOOLBARTREE.CLICK_X, TOOLBARTREE.CLICK_Y, TOOLBARTREE.SELECTED_SPAN,'child');
         } else {
            DatatreeShowEditBox(TOOLBARTREE.CLICK_X, TOOLBARTREE.CLICK_Y, TOOLBARTREE.SELECTED_SPAN,'child');
         }
         break;
      case "sibling":
         if (TOOLBARTREE.MOUSE_DRAG_SPANS.length > 1){
            combobox.selectedIndex = 0;
            return;
         }
         DATATREE.SetInitiator(TOOLBARTREE);
         if (DATATREE.ALT_EDITOR == true){
            DatatreeShowAltEditBox(TOOLBARTREE.CLICK_X, TOOLBARTREE.CLICK_Y, TOOLBARTREE.SELECTED_SPAN,'sibling');
         } else {
            DatatreeShowEditBox(TOOLBARTREE.CLICK_X, TOOLBARTREE.CLICK_Y, TOOLBARTREE.SELECTED_SPAN,'sibling');
         }
         break;
      case "up":
         if (TOOLBARTREE.MOUSE_DRAG_SPANS.length > 1){
            combobox.selectedIndex = 0;
            return;
         }
         TOOLBARTREE.View("up");
         break;
      case "down":
         if (TOOLBARTREE.MOUSE_DRAG_SPANS.length > 1){
            combobox.selectedIndex = 0;
            return;
         }
         TOOLBARTREE.View("down");
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
         TOOLBARTREE.View("secright");
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
         TOOLBARTREE.View("selright");
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
         TOOLBARTREE.View("left");
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
         if (DATATREE.WAIT_IS_OPEN != true){
	    var wait = DATATREE.Wait();
	    setTimeout(function(){
              var tree = TOOLBARTREE;
              if (tree.MOUSE_DRAG_SPANS.length > 0){
                  DATATREE.CLIPBOARD.length = 0;
                  TOOLBARTREE.View("copysel");
              }
              if (DATATREE.GetBrowser() == "IE"){
                  if (document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME)){
                     document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME).select();
                  }
              }
              DATATREE.CloseWaitBox(wait);
            }, 1);
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
         if (DATATREE.WAIT_IS_OPEN != true){
	    var wait = DATATREE.Wait();
	    setTimeout(function(){
              var tree = TOOLBARTREE;
              var index = 0;
              var index_above;
              if (tree.MOUSE_DRAG_SPANS.length > 0){
                  if (selection == "cut"){
                     TOOLBARTREE.View("cut");
                  } else {
                     TOOLBARTREE.View("copysec");
                  }
              }
              if (DATATREE.GetBrowser() == "IE"){
                  if (document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME)){
                     document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME).select();
                  }
              }
              DATATREE.CloseWaitBox(wait);
            }, 1);
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
         if (DATATREE.CLIPBOARD.length == 0 || !TOOLBARTREE.SELECTED_SPAN){ 
            combobox.selectedIndex = 0; 
            return;
         }
         if (DATATREE.WAIT_IS_OPEN != true){
	    var wait = DATATREE.Wait();
	    setTimeout(function(){
              var tree = TOOLBARTREE;
              var index = 0;
              var index_above = 0;
              if (tree && tree.SELECTED_SPAN && DATATREE.CLIPBOARD.length > 0){
                TOOLBARTREE.View("paste");
                DATATREE.CLIPBOARD.length = 0;
              }
              if (DATATREE.GetBrowser() == "IE"){
                  if (document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME)){
                     document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME).select();
                  }
              }
              DATATREE.CloseWaitBox(wait);
            }, 1);
         }
         break;
      case "remove":
         if (TOOLBARTREE.MOUSE_DRAG_SPANS.length > 1){
            combobox.selectedIndex = 0;
            return;
         }
         TOOLBARTREE.View("remove");
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
function DatatreeMouseDownSpan(evt,span){
   if (!evt){
      evt = window.event;
   }
   DATATREE.MOUSE_DOWN_X = evt.clientX;
   DATATREE.MOUSE_DOWN_Y = evt.clientY;
   var source;
   if (DatatreeMouseDownSpan.arguments.length > 1 && span != null && span != "undefined"){
      source = span;
   } else {
      source = evt.target? evt.target : evt.srcElement;
      while (source.nodeName.toLowerCase() != "span" || source.className != "datatree_content"){
           source = source.parentNode;
      }
   }
   if (source.nodeName.toLowerCase() == "span"){
      if (source.parentNode.nodeName.toLowerCase() == "li" && source.parentNode.parentNode.nodeName.toLowerCase() == "ul" && source.parentNode.parentNode.id == DATATREE.TREE.ELEMENT_INNER_WRAPPER && source.parentNode.parentNode.parentNode.nodeName.toLowerCase() == "div" && source.parentNode.parentNode.parentNode.id == DATATREE.TREE.ELEMENT_OUTER_WRAPPER){
          return;
      } else {
          var tree = DATATREE.TREE;
          if (tree){
             tree.MOUSE_DOWN_SPAN = source;
          }
      }
   }
}
function DatatreeMouseUpSpan(evt,span){
   if (!evt){
      evt = window.event;
   }
   evt.stopPropagation();//*****************************************************************************************************10.0
   DATATREE.MOUSE_UP_X = evt.clientX;
   DATATREE.MOUSE_UP_Y = evt.clientY;
   var source;
   if (DatatreeMouseUpSpan.arguments.length > 1 && span != null && span != "undefined"){
      source = span;
   } else {
      source = evt.target? evt.target : evt.srcElement;
      while (source.nodeName.toLowerCase() != "span" || source.className != "datatree_content"){
           source = source.parentNode;
      }
   }
   //unhighlight
   if (DATATREE.TREE.SELECTED_SPAN){
      DatatreeUnhighlightSpan(DATATREE.TREE.SELECTED_SPAN);
   }
   if (DATATREE.TREE.MOUSE_DRAG_SPANS){
      for (s in DATATREE.TREE.MOUSE_DRAG_SPANS){
         DatatreeUnhighlightSpan(DATATREE.TREE.MOUSE_DRAG_SPANS[s]);
      }
   }
   DATATREE.TREE.MOUSE_DRAG_SPANS.length = 0;
   if (source.nodeName.toLowerCase() == "span"){
      if (source.parentNode.nodeName.toLowerCase() == "li" && source.parentNode.parentNode.nodeName.toLowerCase() == "ul" && source.parentNode.parentNode.id == DATATREE.TREE.ELEMENT_INNER_WRAPPER && source.parentNode.parentNode.parentNode.nodeName.toLowerCase() == "div" && source.parentNode.parentNode.parentNode.id == DATATREE.TREE.ELEMENT_OUTER_WRAPPER){
          return;
      } else {
          var tree = DATATREE.TREE;
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
                      var content = li.getElementsByClassName('datatree_content')[0];
                      if (content == start){
                         startindex = count;
                      } else if (content == stop){
                         stopindex = count;
                         break;
                      }
                   }
                   for (var count = startindex; count <= stopindex; ++count){
                      var highlightspan = parent.childNodes[count].getElementsByClassName('datatree_content')[0];
                      DatatreeHighlightSpan(highlightspan);
                      tree.MOUSE_DRAG_SPANS.push(highlightspan);
                   }
                } else {
                   //unhighlight...already done
                }
}}}}}
function DatatreeClickSpan(evt,span){ 
   if (DATATREE.TREE.SELECTED_SPAN){
      DatatreeUnhighlightSpan(DATATREE.TREE.SELECTED_SPAN);
   }
   for (var count = 0; count < DATATREE.TREE.MOUSE_DRAG_SPANS.length; ++count){
       DatatreeUnhighlightSpan(DATATREE.TREE.MOUSE_DRAG_SPANS[count]);
   }   
   if (!evt){
      evt = window.event;
   }
   DATATREE.MOUSE_DOWN_X = evt.clientX;
   DATATREE.MOUSE_DOWN_Y = evt.clientY;
   var source;
   if (DatatreeClickSpan.arguments.length > 1 && span != null && span != "undefined"){
      source = span;
   } else {
      source = evt.target? evt.target : evt.srcElement;
      while (source.nodeName.toLowerCase() != "span" || source.className != "datatree_content"){
           source = source.parentNode;
      }
   }
   if (source.nodeName.toLowerCase() == "span"){
      if (source.parentNode.nodeName.toLowerCase() == "li" && source.parentNode.parentNode.nodeName.toLowerCase() == "ul" && source.parentNode.parentNode.id == DATATREE.TREE.ELEMENT_INNER_WRAPPER && source.parentNode.parentNode.parentNode.nodeName.toLowerCase() == "div" && source.parentNode.parentNode.parentNode.id == DATATREE.TREE.ELEMENT_OUTER_WRAPPER){
          DATATREE.TREE.SELECTED_SPAN = null; // ***
          return;
      } else {
          DATATREE.TREE.SELECTED_SPAN = source;
          DATATREE.TREE.CLICK_X = evt.clientX;
          DATATREE.TREE.CLICK_Y = evt.clientY;
          if (source.innerHTML.indexOf('search_result') >= 0){
              var search_result = source.getElementsByTagName('span')[0];
              if (search_result.className && search_result.className == 'search_result'){
                  source.innerHTML = search_result.innerHTML;
              }
          }
          DatatreeHighlightSpan(source);
          DATATREE.TREE.MOUSE_DRAG_SPANS.length = 0;
          DATATREE.TREE.MOUSE_DRAG_SPANS.push(source);
          DATATREE.GoToFile(source);
      }
   }
}
function DatatreeGoToFile(line){
   if (DATATREE.GO_TO_FILE != null && DATATREE.GO_TO_FILE != "undefined" && DATATREE.GO_TO_FILE != ""){
      DATATREE.TEMP = line.innerHTML;
      eval(DATATREE.GO_TO_FILE);
   }
}
function DatatreeHighlightSpan(span){
   if (!span.className || span.className != "datatree_content"){
      var prnt = span.parentNode;
      if (prnt.nodeName.toLowerCase() == "a"){
          prnt = prnt.parentNode;
      }
      var contents = prnt.getElementsByTagName('span');
      for (var count2 = 0; count2 < contents.length; ++count2){
         var content = contents[count2];
         if (content.className && content.className == "datatree_content"){
            span = content;
            break;
         }
      }
   }
   span.style.backgroundColor = DATATREE.TREE.HIGHLIGHT_BACKGROUND_COLOR;
   span.style.color = DATATREE.TREE.HIGHLIGHT_TEXT_COLOR;
}
function DatatreeUnhighlightSpan(span){
   if (!span.className || span.className != "datatree_content"){
      var prnt = span.parentNode;
      if (prnt.nodeName.toLowerCase() == "a"){
          prnt = prnt.parentNode;
      }
      var contents = prnt.getElementsByTagName('span');
      for (var count2 = 0; count2 < contents.length; ++count2){
         var content = contents[count2];
         if (content.className && content.className == "datatree_content"){
            span = content;
            break;
         }
      }
   }
   span.style.backgroundColor = "";
   span.style.color = "";
}
function DatatreeEditTreeText(){
    if (document.getElementById("edit_tree_script")){
        document.head.removeChild(document.getElementById("edit_tree_script"));
    }
    var submitfromtoolbar = "function datatree_submit_from_toolbar(e){ evt = e || window.event; if (!evt){ evt = window.event; } evt.preventDefault? evt.preventDefault() : evt.returnValue = false; var source = evt.target? evt.target : evt.srcElement; var html = document.getElementById('datatree_editor').value; var mode = document.getElementById('datatree_editbox_button').innerHTML;/**document.getElementById(DATATREE.TREE.TOOLBAR_SELECT_NAME).options[document.getElementById(DATATREE.TREE.TOOLBAR_SELECT_NAME).selectedIndex].value;**/ DatatreeSubmitEdit(html,mode,DATATREE.TREE.SELECTED_SPAN);   }";
    var altsubmitfromtoolbar = "function datatree_alt_submit_from_toolbar(e){ evt = e || window.event; if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;var source = evt.target? evt.target : evt.srcElement;var html = DatatreeGetAltEditorContent();var mode = document.getElementById('datatree_editbox_button').innerHTML;DatatreeSubmitEdit(html,mode,DATATREE.TREE.SELECTED_SPAN);}";
    /** deprecated
    var edittree = "function edittree(e){ evt = e || window.event; DATATREE.REPRESS_ALERTS = true;DATATREE.PLEASE_WAIT = false;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;var source = evt.target? evt.target : evt.srcElement;DatatreeShowEditBox(evt.clientX, evt.clientY, source);}";
    var submitedit = "function datatree_submit_edit(e){evt = e || window.event;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;var source = evt.target? evt.target : evt.srcElement;var html = document.getElementById('datatree_editor').value;DatatreeSubmitEdit(html);}";
    var insertsibling = "function datatree_insert_sibling(e){evt = e || window.event;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;DatatreeSubmitEdit(document.getElementById('datatree_editor').value,'sibling');}";
    var insertchild = "function datatree_insert_child(e){evt = e || window.event;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;DatatreeSubmitEdit(document.getElementById('datatree_editor').value,'child');}";
    var remove = "function datatree_remove_node(e){evt = e || window.event;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;DatatreeSubmitEdit(document.getElementById('datatree_editor').value,'remove');}";
    var altedittree = "function edittree(e){evt = e || window.event;DATATREE.REPRESS_ALERTS = true;DATATREE.PLEASE_WAIT = false;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;var source = evt.target? evt.target : evt.srcElement;DatatreeShowAltEditBox(evt.clientX, evt.clientY, source);}";
    var altsubmitedit = "function datatree_submit_edit(e){evt = e || window.event;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;DatatreeSubmitEdit(DatatreeGetAltEditorContent(),'overwrite');}";
    var altinsertsibling = "function datatree_insert_sibling(e){evt = e || window.event;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;DatatreeSubmitEdit(DatatreeGetAltEditorContent(),'sibling');}";
    var altinsertchild = "function datatree_insert_child(e){evt = e || window.event;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;DatatreeSubmitEdit(DatatreeGetAltEditorContent(),'child');}";
    if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text" && DATATREE.ALT_EDITOR == false){
       return edittree + submitedit + insertchild + insertsibling + remove + submitfromtoolbar;
    } else if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() != "text" && DATATREE.ALT_EDITOR == true){
       return altedittree + altsubmitedit + altinsertchild + altinsertsibling + remove + altsubmitfromtoolbar;
    } else if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text" && DATATREE.ALT_EDITOR == true){ // 7.9.4
       return altedittree + altsubmitedit + altinsertchild + altinsertsibling + remove + altsubmitfromtoolbar;
    } else {
       return edittree + submitedit + insertchild + insertsibling + remove + submitfromtoolbar;
    }
    **/
    return submitfromtoolbar + altsubmitfromtoolbar;
}
function DatatreeInsertEditTreeText(){
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
function DatatreeResetEditBox(){
	document.getElementById('datatree_editor').innerHTML = "";
}
function DatatreeShowEditBox(x, y, source, toolbar) { 
    try{
    //DATATREE.CloseEditBox();
    var datatree;
    if (DATATREE.TREE){
       datatree = DATATREE.TREE;
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
    if (DATATREE.REPRESS_EDITS == true) { return; }
    while (source.nodeName.toLowerCase() != "span" || source.className != "datatree_content"){
        source = source.parentNode;
    }
    if (document.getElementById('datatree_editbox')){ 
        document.getElementById('datatree_editbox').parentNode.removeChild(document.getElementById('datatree_editbox'));
    }
        var box = document.createElement('div');
        box.id = 'datatree_editbox';
        box.span = source;
        box.style.position = "absolute";
        box.style.zIndex = "100";
        box.style.display = "none";
        box.style.height = "100px";
        box.style.width = "400px";
        box.style.border = DATATREE.POPUP_BORDER;
        box.style.overflow = "auto";
        box.style.borderRadius = "20px";
        box.style.padding = "10px 10px 0px 10px";
        box.style.background = DATATREE.POPUP_BACKGROUND;
        //box.style.background = "white url('" + DATATREE.POPUP_BACKGROUND + "') repeat scroll left top";
        var datatree;
        var radio = "";
        var info = "";
	var reset = "<button type='button' onclick='return DatatreeResetEditBox();'>reset</button>";
	var equation = "";
	var delimiter = "&nbsp;&nbsp;&nbsp;";
        if (datatree){
           if (datatree.TYPE != "text"){ // 7.9.4
              radio = "<input type='radio' name='datatree_text_or_html' value='text'>text</input><input type='radio' name='datatree_text_or_html' value='html' checked='checked'>html</input>";
	      equation = "<a href='https://codecogs.com/latex/eqneditor.php' target='_blank'>equation</a>";
              //info = "&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' onclick='return DATATREE.ShowPopupBox(\"In HTML, these characters are restricted: < and > . To use them, select the text option (converts entire line to plain text), or leave spaces around them like this: x > 0. However, none of these are guaranteed to work, and the best solution is to replace them with words like less than and greater than, or write math with an equation editor.\");'>?</a>";
           }
        }
        if (DatatreeShowEditBox.arguments.length == 4){
           var displaytext = DATATREE.StringTrim(source.innerHTML);
           if (toolbar == "insert"){
               displaytext = "";
           }
           box.innerHTML = "<table><tr><td><span onclick='return DatatreeCloseEditBox();' id='datatree_close_editorbutton' style='position:relative;color:red;font-size:1em;border:1px dotted red;padding:3px;'>X</span><label>&nbsp;&nbsp;&nbsp;</label>" + delimiter + reset + delimiter + radio + info + delimiter + equation + delimiter + "<button type='button' id='datatree_editbox_button' onclick='return datatree_submit_from_toolbar(event);'>" + toolbar + "</button></td></tr><tr><td><textarea id='datatree_editor' rows='3' cols='40'>" + displaytext + "</textarea></td></tr></table>";
        } else {
           return;
        }
        document.body.appendChild(box);
        if (box) { 
            box.style.display = "block";
            boxwidth = box.offsetWidth;
            boxheight = box.offsetHeight;
            screenwidth = window.innerWidth;
            screenheight = window.innerHeight;
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
    } catch (exc) {  }
}
function DatatreeSwapBranches(parnt, first, second, tree, third, fourth){
   var temp = parnt.CHILDREN[first];
   parnt.CHILDREN[first] = parnt.CHILDREN[second];
   parnt.CHILDREN[second] = temp;
   temp = tree.NODES[third];
   tree.NODES[third] = tree.NODES[fourth];
   tree.NODES[fourth] = temp;
}
function DatatreeResetToolbarSelect(){
   var datatree = this? this : DATATREE.TREE;
   if (document.getElementById(datatree.TOOLBAR_SELECT_NAME))
   {
      document.getElementById(datatree.TOOLBAR_SELECT_NAME).selectedIndex = 0;
   }
}
function DatatreeCountAllChildrenOfNode(node,result){ // not working
   if (DatatreeCountAllChildrenOfNode.arguments.length == 1){
      result = 0;
   }
   for (var count = 0; count < node.CHILDREN.length; ++count){
      var newnode = node.CHILDREN[count];
      ++result;
      for (var count2 = 0; count2 < newnode.CHILDREN.length; ++count2){
         var c = newnode.CHILDREN[count2];
         result += DatatreeCountAllChildrenOfNode(c);
      }
   }
   return result;
}
function DatatreeGetMacroIndexForNode(node){ //not working
   var datatree;
   if (DATATREE.TREE){
      datatree = DATATREE.TREE;
   } else if (this){
      datatree = this;
   } else {
      return;
   }
   var result = 0;
   if (node.PARENT_NODE){
       var parent = node.PARENT_NODE;
       var index = parent.CHILDREN.indexOf(node) + 1;
       result += index;
       for (var count = 0; count < node.GetIndex() - 1; ++count){
          var sib = parent.CHILDREN[count];
          result += DatatreeCountAllChildrenOfNode(sib);
       }
       while (parent){
         if (parent.id && parent.id == datatree.ELEMENT_OUTER_WRAPPER){
            break;
         }
         if (parent.PARENT_NODE){
            index = parent.PARENT_NODE.CHILDREN.indexOf(parent);
            result += index;
            for (var count = 0; count < parent.GetIndex() - 1; ++count){
               var sib = parent.PARENT_NODE.CHILDREN[count];
               result += DatatreeCountAllChildrenOfNode(sib);
            }
            parent = parent.PARENT_NODE;
         } else {
            break;
         }
       }
   }
   return result;
}
function DatatreeReplaceBranch(index, newnode){
    try{
        var oldnode = DATATREE.TREE.NODES[index];
        for (c in oldnode.CHILDREN){
           oldnode.CHILDREN[c].PARENT_NODE = newnode;
        }
        oldnode.PARENT_NODE.CHILDREN.splice(oldnode.GetIndex(), 1, newnode);
        DATATREE.TREE.NODES.splice(index - 1, 1, newnode);
    } catch (exc) {
       if (DATATREE.REPRESS_ALERTS == false) { alert(exc); }
    }
}
function DatatreeCloseEditBox() {
        var box = document.getElementById("datatree_editbox");
        if (box) {
            box.style.display = "none";
            box.parentNode.removeChild(box);
        }
        if (document.getElementById(DATATREE.TREE.TOOLBAR_SELECT_NAME)){
           document.getElementById(DATATREE.TREE.TOOLBAR_SELECT_NAME).selectedIndex = 0;
        }
}
function DatatreeAllowBackspace(){
   DATATREE.BACKSPACE_ALLOWED = true;
}
function DatatreeDisallowBackspace(){
   DATATREE.BACKSPACE_ALLOWED = false;
}
function DatatreeAutoSearchMacro(evt){
     if (!evt){
        evt = window.event;
     }
     if (evt){
        evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
     }
     var datatree = DATATREE.TREE? DATATREE.TREE : this;
	var searchterm = document.getElementById(datatree.TOOLBAR_MACRO_SEARCHBOX_NAME).value;
     var case_sensitive = "";
     if (document.getElementById("datatree_case_files") && document.getElementById("datatree_case_files").checked){
        case_sensitive = "CASE_SENSITIVE ";
     }
     var exact_matches = "";
     if (document.getElementById("datatree_exact_files") && document.getElementById("datatree_exact_files").checked){
        exact_matches = "EXACT_MATCHES ";
     }
	if (searchterm != null && searchterm != 'undefined' && searchterm != ""){
	   if (datatree){
		   datatree.Query("SEARCH FILES " + case_sensitive + exact_matches + "FOR " + searchterm);
	   }
	}
}
function DatatreeSearchMacro(searchterm,regular_expression,case_sensitive,exact_matches){
   try{
   searchterm = DATATREE.StringTrim(searchterm);
   if (regular_expression == null || regular_expression == "undefined"){
      regular_expression = false;
   }
   if (case_sensitive == null || case_sensitive == "undefined"){
      case_sensitive = false;
   }
   if (exact_matches == null || exact_matches == "undefined"){
      exact_matches = false;
   }
   DATATREE.ResetMacro();
   if (DATATREE.SITEMAP == "" || DATATREE.SITEMAP == null || DATATREE.SITEMAP == "undefined"){
       alert("Error: the sitemap has not been defined.");
       return;
   }
   var SAVE_REPRESS_ALERTS = DATATREE.REPRESS_ALERTS;
   DATATREE.REPRESS_ALERTS = true;
   DATATREE.PLEASE_WAIT = false;
   var rawfiles = DATATREE.SITEMAP.split(",");
   var files = new Array();
   var LIMIT_FOR_QUICK_SEARCH = 50;
   var LIMIT = LIMIT_FOR_QUICK_SEARCH;
   for (var count = 0; count < rawfiles.length; ++count){
       var filename = DATATREE.StringTrim(rawfiles[count]);
       if (DATATREE.StringTrim(filename) != ""){
          files.push(filename);
       }
   }
   //var temptree = new DATATREE.Tree();
   for (var count = 0; count < files.length; ++count){
      if (count > LIMIT){
	  if (window.confirm("Datatree has searched " + count + " trees and found " + DATATREE.MACRO_SEARCH_RESULTS.length + " results.\n Search another " + LIMIT_FOR_QUICK_SEARCH + " trees?")){
		  LIMIT += LIMIT_FOR_QUICK_SEARCH;
	  } else {
             break;
	  }
      }
      var txt = DatatreeReadFile(files[count]);
      if (txt != null && txt != "undefined" && txt != ""){
		 //txt = DATATREE.StripTagsPHPJS(txt);
         try{
         if (regular_expression == true){
            var pattern = "txt.match(" + searchterm + ")";
            if (eval(pattern)){
               DATATREE.MACRO_SEARCH_RESULTS.push(files[count]);
            }
         } else if (case_sensitive == true && exact_matches == true){
            var pattern = "txt.match(/\\b" + searchterm + "\\b/)";
            if ( eval(pattern) ){
               DATATREE.MACRO_SEARCH_RESULTS.push(files[count]);
            }
         } else if (case_sensitive == true){
            var pattern = "txt.match(/" + searchterm + "/)";
            if ( eval(pattern) ){
               DATATREE.MACRO_SEARCH_RESULTS.push(files[count]);
            }
         } else if (exact_matches == true){
            var pattern = "txt.match(/\\b" + searchterm + "\\b/i)";
            if (eval(pattern)){
               DATATREE.MACRO_SEARCH_RESULTS.push(files[count]);
            }
         } else if (txt.toLowerCase().indexOf(searchterm.toLowerCase()) >= 0){
            DATATREE.MACRO_SEARCH_RESULTS.push(files[count]);
         }
         }catch(exc){alert(exc);}
      }
   }
   DATATREE.REPRESS_ALERTS = SAVE_REPRESS_ALERTS;
   var datatree = DATATREE.TREE? DATATREE.TREE : this;
   if (datatree && datatree.HAS_ERRORS == true){
       datatree.Query("REPLAY");
   }
   return DATATREE.MACRO_SEARCH_RESULTS.length;
   } catch(exc) { return 0; }
}
function DatatreeResetMacro(){
   DATATREE.MACRO.length = 0;
   DATATREE.MACRO_SEARCH_RESULTS.length = 0;
}
function DatatreePreventDefault(evt){
   if (!evt){
      evt = window.event;
   }
   var keycode = evt.which || evt.keyCode || evt.charCode;
   var keypressed = String.fromCharCode(keycode);
   if (keycode == 13){
      if (DATATREE.GetBrowser().toLowerCase() != "edge"){
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
function DatatreeSetToolbar(toolbar_tools){
   toolbar_tools = toolbar_tools.toLowerCase();
   DATATREE.TREE.TOOLBAR_TOOLS = toolbar_tools;
   var TOOLBAR = "";
   DATATREE.TREE = this;
   var trimmed = DATATREE.StringTrim(toolbar_tools);
   if (trimmed.toUpperCase() == 'WRAP'){
                       DATATREE.TOOLBAR_STYLE = DATATREE.TOOLBAR_WRAP_STYLE;
                       toolbar_tools = DATATREE.DEFAULT_TOOLBAR_TOOLS;
   } else if (trimmed.toUpperCase() == 'NOWRAP'){
                       DATATREE.TOOLBAR_STYLE = DATATREE.TOOLBAR_NOWRAP_STYLE;
                       toolbar_tools = DATATREE.DEFAULT_TOOLBAR_TOOLS;
   } else if (trimmed.toUpperCase() == 'DEFAULT'){
         DATATREE.TOOLBAR_FREESTYLE = DATATREE.DEFAULT_TOOLBAR_FREESTYLE;
         toolbar_tools = DATATREE.DEFAULT_TOOLBAR_TOOLS;
   }
   if (DatatreeSetToolbar.arguments.length > 0 && trimmed != "" && trimmed != null && trimmed != "undefined"){
       TOOLBAR = "<div align='" + DATATREE.TOOLBAR_ALIGN + "' id='" + this.TOOLBAR_NAME + "' onmouseover='return DatatreeSetTreeFromName(\"" + this.NAME + "\");' oncontextmenu='return DatatreeRightClick();' style='" + DATATREE.TOOLBAR_STYLE + "' >";
       var tools = toolbar_tools.split(',');
       tools.push('status');
       for (var count = 0; count < tools.length; ++count){
          var tool = DATATREE.StringTrim(tools[count]);
          var separator = DATATREE.TOOLBAR_SEPARATOR;
          switch(tool){
             case "expand":
                TOOLBAR += "<button onclick='return DATATREE.Expand(event);'>EXPAND</button>";
                TOOLBAR += separator;
                break;
             case "collapse":
                TOOLBAR += "<button onclick='return DATATREE.Collapse(event);'>COLLAPSE</button>";
                TOOLBAR += separator;
                break;
             case "replace":
                TOOLBAR += "<span style='white-space:nowrap;'><input type='text' size='3' title='search for' id='" + this.TOOLBAR_REPLACE_NAME + "' onkeydown='return DatatreePreventDefault(event);' onmouseover='return DatatreeAllowBackspace();' onmouseout='return DatatreeDisallowBackspace();' /><input type='text' size='3' title='replace with' id='" + this.TOOLBAR_REPLACE_WITH_NAME + "' onkeydown='return DatatreePreventDefault(event);' onmouseover='return DatatreeAllowBackspace();' onmouseout='return DatatreeDisallowBackspace();' /><button title='press first to search, then press to replace' onclick='return DATATREE.Replace(event);'>REPLACE</button><button onclick='return DATATREE.Skip(event);'>SKIP</button></span>";
                TOOLBAR += separator;
                break;
             case "search":
                TOOLBAR += "<span style='white-space:nowrap;'><input type='text' id='" + this.TOOLBAR_SEARCHBOX_NAME + "' onkeydown='return DatatreePreventDefault(event);' onmouseover='return DatatreeAllowBackspace();' onmouseout='return DatatreeDisallowBackspace();' /><button onclick='return DATATREE.Search(event);'>SEARCH</button></span>";
                TOOLBAR += separator;
                break;
             case "search_horizontal":
                TOOLBAR += "<span style='white-space:nowrap;'><input type='text' id='" + this.TOOLBAR_SEARCHBOX_NAME + "' onkeydown='return DatatreePreventDefault(event);' onmouseover='return DatatreeAllowBackspace();' onmouseout='return DatatreeDisallowBackspace();' /><button onclick='return DATATREE.Search(event);'>SEARCH</button><input type='checkbox' id='datatree_case'>case&nbsp;</input><input type='checkbox' id='datatree_exact'>exact&nbsp;</input></span>";
                TOOLBAR += separator;
                break;
             case "search_vertical":
                TOOLBAR += "<span style='white-space:nowrap;'><table style='display:inline;'><tr><td><input type='text' id='" + this.TOOLBAR_SEARCHBOX_NAME + "' onkeydown='return DatatreePreventDefault(event);' onmouseover='return DatatreeAllowBackspace();' onmouseout='return DatatreeDisallowBackspace();' /></td><td><button onclick='return DATATREE.Search(event);'>SEARCH</button></td></tr><tr><td><input type='checkbox' id='datatree_case'>case</input></td><td><input type='checkbox' id='datatree_exact'>exact</input></td></tr></table></span>";
                TOOLBAR += separator;
                break;
             case "next":
                TOOLBAR += "<button onclick='return DATATREE.Next(event);'>NEXT</button>";
                TOOLBAR += separator;
                break;
             case "previous":
                TOOLBAR += "<button onclick='return DATATREE.Previous(event);'>PREVIOUS</button>";
                TOOLBAR += separator;
                break;
	     case "searchmacro":
 	     case "macrosearch":
	 		   TOOLBAR += "<span style='white-space:nowrap;'><input type='text' id='" + this.TOOLBAR_MACRO_SEARCHBOX_NAME + "' onkeydown='return DatatreePreventDefault(event);' onmouseover='return DatatreeAllowBackspace();' onmouseout='return DatatreeDisallowBackspace();' /><button onclick='return DATATREE.AutoSearchMacro(event);'>SEARCH FILES</button></span>";
	 		   TOOLBAR += separator;
                   break;
           case "searchmacro_horizontal":
           case "macrosearch_horizontal":
                   TOOLBAR += "<span style='white-space:nowrap;'><input type='text' id='" + this.TOOLBAR_MACRO_SEARCHBOX_NAME + "' onkeydown='return DatatreePreventDefault(event);' onmouseover='return DatatreeAllowBackspace();' onmouseout='return DatatreeDisallowBackspace();' /><button onclick='return DATATREE.AutoSearchMacro(event);'>SEARCH FILES</button><input type='checkbox' id='datatree_case_files'>case&nbsp;</input><input type='checkbox' id='datatree_exact_files'>exact&nbsp;</input></span>";
                   TOOLBAR += separator;
                   break;
             case "alphabetize":
             case "sort":
                TOOLBAR += "<span style='white-space:nowrap;'><label>from</label><input type='text' size='2' id='" + this.TOOLBAR_LOWER_BOUND_NAME + "' onkeydown='return DatatreePreventDefault(event);' onmouseover='return DatatreeAllowBackspace();' onmouseout='return DatatreeDisallowBackspace();' /><label>to</label><input type='text' size='2' id='" + this.TOOLBAR_UPPER_BOUND_NAME + "' onkeydown='return DatatreePreventDefault(event);' onmouseover='return DatatreeAllowBackspace();' onmouseout='return DatatreeDisallowBackspace();' /><button onclick='return DATATREE.Alphabetize(event);'>ALPHABETIZE</button></span>";
                TOOLBAR += separator;
                break;
             case "input":
             case "query":
                TOOLBAR += "<span style='white-space:nowrap;'><textarea rows='" + DATATREE.QUERYWINDOW_ROWS + "' cols='" + DATATREE.QUERYWINDOW_COLS + "' type='text' id='" + this.TOOLBAR_QUERYWINDOW_NAME + "' onkeydown='return DatatreePreventDefault(event);' onmouseover='return DatatreeAllowBackspace();' onmouseout='return DatatreeDisallowBackspace();'></textarea><button title='Datatree input commands' onclick='return DATATREE.Query(event);' oncontextmenu='return DATATREE.QueryDocumentation();'>INPUT</button></span>";
                TOOLBAR += separator;
                break;
             case "number":
             case "numbers":
                TOOLBAR += "<button onclick='return DATATREE.Number(event);'>NUMBER</button>";
                TOOLBAR += separator;
                break;
             case "reset":
             case "clear":
                TOOLBAR += "<button onclick='return DATATREE.Reset(event);'>RESET</button>";
                TOOLBAR += separator;
                break;
             case "save":
			 case "savemin":
			 case "save_min":
                TOOLBAR += "<button onclick='return DATATREE.Save(event);'>SAVE</button>";
                TOOLBAR += separator;
                break;
			 case "savemax":
	         case "save_max":
                TOOLBAR += "<button onclick='return DATATREE.SaveMax(event);'>SAVE</button>";
                TOOLBAR += separator;
                break;
  	     case "load":
                TOOLBAR += "<button onclick='return DATATREE.LoadFromToolbar(event);'>LOAD</button>";
                TOOLBAR += separator;
                break;
             case "text":
                TOOLBAR += "<button onclick='return DATATREE.PrintText(event);' title='copy and paste to save your text changes'>TEXT</button>";
                TOOLBAR += separator;
                break;
             case "html":
                TOOLBAR += "<button onclick='return DATATREE.PrintHtml(event);' title='copy and paste to save your text changes'>HTML</button>";
                TOOLBAR += separator;
                break;
             case "custom":
                TOOLBAR += "<button id='datatree_custom_button' onclick='return DATATREE.Custom(event);' title='" + DATATREE.CUSTOM_TOOLTIP + "' >" + DATATREE.CUSTOM_VALUE + "</button>";
                break;
             case "custom2":
                TOOLBAR += "<button id='datatree_custom2_button' onclick='return DATATREE.Custom2(event);' title='" + DATATREE.CUSTOM2_TOOLTIP + "' >" + DATATREE.CUSTOM2_VALUE + "</button>";
                break;
             case "freestyle":
                TOOLBAR += DATATREE.TOOLBAR_FREESTYLE;
                break;
	     case "freestyle2":
		   TOOLBAR += DATATREE.TOOLBAR_FREESTYLE2;
		   break;
             case "edit":
                TOOLBAR += "<select id='" + this.TOOLBAR_SELECT_NAME + "' onchange='return DATATREE.ToolbarSelect();'><option selected='selected'>EDIT</option><option value='overwrite'>overwrite</option><option value='child'>child</option><option value='sibling'>sibling</option><option value='up'>move up</option><option value='down'>move down</option><option value='selection right'>selection right</option><option value='section right'>section right</option><option value='left'>move left</option><option value='copy selected'>copy selected</option><option value='copy w/children'>copy w/children</option><option value='cut'>cut</option><option value='paste'>paste</option><option value='remove'>remove</option><option value='undo'>undo</option><option value='redo'>redo</option></select>";
                TOOLBAR += separator;
                break;
             case "edit_with_popups":
                TOOLBAR += "<select id='" + this.TOOLBAR_SELECT_NAME + "' onclick='return DATATREE.ToolbarSelect();'><option selected='selected'>EDIT</option><option value='overwrite'>overwrite</option><option value='child'>child</option><option value='sibling'>sibling</option><option value='up'>move up</option><option value='down'>move down</option><option value='right_with_popups'>move right</option><option value='left'>move left</option><option value='copy selected'>copy selected</option><option value='copy w/children'>copy w/children</option><option value='cut'>cut</option><option value='paste'>paste</option><option value='remove'>remove</option><option value='undo'>undo</option><option value='redo'>redo</option></select>";
                TOOLBAR += separator;
                break;
             case "menu":
                TOOLBAR += "<span id='" + this.TOOLBAR_SELECT_NAME + "' onmouseover='return DATATREE.OpenMenu(false);' style='background-color:#eeeeee;padding:5px;'>MENU</span>";
                TOOLBAR += separator;
                break;
             case "menu_with_popups":
                TOOLBAR += "<span id='" + this.TOOLBAR_SELECT_NAME + "' onmouseover='return DATATREE.OpenMenu(true);' style='background-color:#eeeeee;padding:5px;'>MENU</span>";
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
function DatatreeOpenMenu(popups){ 
     var menu = document.getElementById(DATATREE.TREE.TOOLBAR_SELECT_NAME);
     var x = menu.offsetLeft;
     var y = menu.offsetTop - 15 + menu.offsetHeight;
     var p = menu.offsetParent;
     while (p != document.body){
        x += p.offsetLeft;
        y += p.offsetTop;
        p = p.offsetParent;
     }
     //x += document.body.scrollLeft;
     //y += document.body.scrollTop;
     var ul = document.createElement('ul');
     ul.style.display = 'inline';
     ul.style.position = 'absolute';
     ul.style.zIndex = '1000';
     ul.style.backgroundColor = '#eeeeee';
     ul.id = 'datatree_menu';
     ul.style.paddingLeft = '0px';
     ul.style.paddingTop = '0px';
     ul.style.listStyleType = 'none';
     ul.style.border = '1px solid gray';
     if (DatatreeOpenMenu.arguments.length > 0 && popups == true){
        ul.innerHTML = "<li class='overwrite' onclick='return DATATREE.MenuMouseClick(event,0);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >overwrite</li><li class='child' onclick='return DATATREE.MenuMouseClick(event,1);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >child</li><li class='sibling' onclick='return DATATREE.MenuMouseClick(event,2);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >sibling</li><li class='up' onclick='return DATATREE.MenuMouseClick(event,3);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >move up</li><li class='down' onclick='return DATATREE.MenuMouseClick(event,4);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >move down</li><li class='right_with_popups' onclick='return DATATREE.MenuMouseClick(event,5);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >move right</li><li class='left' onclick='return DATATREE.MenuMouseClick(event,6);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >move left</li><li class='copy selected' onclick='return DATATREE.MenuMouseClick(event,7);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >copy selected</li><li class='copy w/children' onclick='return DATATREE.MenuMouseClick(event,8);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >copy w/children</li><li class='cut' onclick='return DATATREE.MenuMouseClick(event,9);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >cut</li><li class='paste' onclick='return DATATREE.MenuMouseClick(event,10);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >paste</li><li class='remove' onclick='return DATATREE.MenuMouseClick(event,11);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >remove</li><li class='undo' onclick='return DATATREE.MenuMouseClick(event,12);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >undo</li><li class='redo' onclick='return DATATREE.MenuMouseClick(event,13);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >redo</li><li class='close' onclick='return DATATREE.MenuMouseClick(event,14);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);'>CLOSE</li>";
     } else {
        ul.innerHTML = "<li class='overwrite' onclick='return DATATREE.MenuMouseClick(event,0);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >overwrite</li><li class='child' onclick='return DATATREE.MenuMouseClick(event,1);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >child</li><li class='sibling' onclick='return DATATREE.MenuMouseClick(event,2);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >sibling</li><li class='up' onclick='return DATATREE.MenuMouseClick(event,3);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >move up</li><li class='down' onclick='return DATATREE.MenuMouseClick(event,4);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >move down</li><li class='selection right' onclick='return DATATREE.MenuMouseClick(event,5);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >selection right</li><li class='section right' onclick='return DATATREE.MenuMouseClick(event,6);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >section right</li><li class='left' onclick='return DATATREE.MenuMouseClick(event,7);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >move left</li><li class='copy selected' onclick='return DATATREE.MenuMouseClick(event,8);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >copy selected</li><li class='copy w/children' onclick='return DATATREE.MenuMouseClick(event,9);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >copy w/children</li><li class='cut' onclick='return DATATREE.MenuMouseClick(event,10);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >cut</li><li class='paste' onclick='return DATATREE.MenuMouseClick(event,11);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >paste</li><li class='remove' onclick='return DATATREE.MenuMouseClick(event,12);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >remove</li><li class='undo' onclick='return DATATREE.MenuMouseClick(event,13);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >undo</li><li class='redo' onclick='return DATATREE.MenuMouseClick(event,14);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);' >redo</li><li class='close' onclick='return DATATREE.MenuMouseClick(event,15);' onmouseover='return DATATREE.MenuMouseOver(event);' onmouseout='return DATATREE.MenuMouseOut(event);'>CLOSE</li>";
     }
     ul.style.left = x + "px";
     ul.style.top = y + "px";
     document.body.appendChild(ul);
}
function DatatreeMenuMouseClick(evt,index){ 
   if (!evt){
      evt = window.event;
   }
   var targ = evt.target? evt.target : evt.srcElement;
   if (targ){ 
      document.getElementById(DATATREE.TREE.TOOLBAR_SELECT_NAME).setAttribute('selectedIndex',index);
      DATATREE.ToolbarSelect(targ.className);
   }
}
function DatatreeMenuMouseOver(evt){
   if (!evt){
      evt = window.event;
   }
   var targ = evt.target? evt.target : evt.srcElement;
   if (targ){
      targ.style.backgroundColor = 'gray';
   }
}
function DatatreeMenuMouseOut(evt){
   if (!evt){
      evt = window.event;
   }
   var targ = evt.target? evt.target : evt.srcElement;
   if (targ){
      targ.style.backgroundColor = '';
   }
   var clientX = evt.clientX;
   var clientY = evt.clientY;
   var menu = document.getElementById(DATATREE.TREE.TOOLBAR_SELECT_NAME);
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
         DATATREE.CloseMenu();
      }
   }
}
function DatatreeCloseMenu(){
   document.body.removeChild(document.getElementById('datatree_menu'));
}
function DatatreeAutoInit(outer_wrapper){ 
   if (DatatreeAutoInit.arguments.length >= 1){
       DATATREE.TREE = new DATATREE.Tree(outer_wrapper);
   } else {
       DATATREE.TREE = new DATATREE.Tree();
   }
   if (document.getElementById(DATATREE.TREE.ELEMENT_OUTER_WRAPPER).getAttribute('sitemap')){
	   var temp = DATATREE.REPRESS_ALERTS;
           DATATREE.REPRESS_ALERTS = true;
           DATATREE.PLEASE_WAIT = false;
           var sitemap = document.getElementById(DATATREE.TREE.ELEMENT_OUTER_WRAPPER).getAttribute('sitemap');
           if (DATATREE.StringTrim(sitemap) != ""){ 
              DATATREE.SITEMAP_FILE = sitemap;
              DATATREE.SITEMAP = DATATREE.LoadSitemap(sitemap);
           }
           DATATREE.REPRESS_ALERTS = temp;
   }
   if (document.getElementById(DATATREE.TREE.ELEMENT_OUTER_WRAPPER).getAttribute('src')){
      DATATREE.Load(document.getElementById(DATATREE.TREE.ELEMENT_OUTER_WRAPPER).getAttribute('src'));
      TEXT = DATATREE.TEMP;
   } else {
      if (document.getElementById(DATATREE.TREE.ELEMENT_OUTER_WRAPPER)){
         TEXT = document.getElementById(DATATREE.TREE.ELEMENT_OUTER_WRAPPER).innerHTML;
      }
   }
   DATATREE.TREE.AutoInitialize(TEXT);
}
function DatatreeAutoLoad(src){
   try{
   DATATREE.REQUEST = new XMLHttpRequest();
   var result = "";
   DATATREE.REQUEST.onreadystatechange = DATATREE.Response;
   src = escape(src);
   DATATREE.REQUEST.open("GET", src, false);
   DATATREE.REQUEST.setRequestHeader("Access-Control-Allow-Origin", "*");
   DATATREE.REQUEST.send();
   } catch (exc) {  }
}
function DatatreeAutoResponse(){
   if (DATATREE.REQUEST.readyState == 4 && DATATREE.REQUEST.status == 200){
      var response = DATATREE.REQUEST.responseText;
      DATATREE.TEMP = response;
   }
}
function DatatreeReadFile(path){
   try{
   DATATREE.REQUEST = new XMLHttpRequest();
   var result = "";
   path = escape(path);
   DATATREE.REQUEST.open("GET", path, false);
   DATATREE.REQUEST.setRequestHeader("Access-Control-Allow-Origin", "*");
   DATATREE.REQUEST.send();
   if (DATATREE.REQUEST.readyState == 4 && DATATREE.REQUEST.status == 200){
      var response = DATATREE.REQUEST.responseText;
      return response;
   } else {
      return null;
   }
   } catch (exc) {
      DATATREE.TREE? DATATREE.TREE.ALERTS.push("error loading sitemap") : this.ALERTS.push("error loading sitemap");
   }
}
function DatatreeLoadSitemap(src){
   try{
   DATATREE.REQUEST = new XMLHttpRequest();
   var result = "";
   src = escape(src);
   DATATREE.REQUEST.open("GET", src, false);
   DATATREE.REQUEST.setRequestHeader("Access-Control-Allow-Origin", "*");
   DATATREE.REQUEST.send();
   if (DATATREE.REQUEST.readyState == 4 && DATATREE.REQUEST.status == 200){
          var response = DATATREE.REQUEST.responseText; 
	  if (response == null || response == ""){
		  return null;
	  }
		  var result = "";
                  var lines = response.split("\r").join("").split("\n");
		  for (var count = 0; count < lines.length; ++count){
			  var line = lines[count];
			  var filename = DATATREE.LeftStringTrim(line);
                          var name = filename.toLowerCase();
                          var blanks = line.length - filename.length;
			  var file = false;
			  if (name.length > ".tree.html".length && name.substring(name.length - ".tree.html".length) == ".tree.html"){
				  file = true;
                          } else if ((name.length > ".html".length) && name.substring(name.length - ".html".length) == ".html" || name.substring(name.length - ".htm".length) == ".htm"){
                                  file = true;
                          } else if ((name.length > ".txt".length) && name.substring(name.length - ".txt".length) == ".txt"){
                                  file = true;
                          } else if (DATATREE.StringTrim(name) != ""){
                                  file = true;
                          }
			  if (file){
                                  var curblanks = blanks;
                                  var folders = new Array();
                                  for (var back = count - 1; back >= 0; --back){
                                     var prev = lines[back];
                                     var prevname = DATATREE.LeftStringTrim(prev);
                                     var prevblanks = prev.length - prevname.length;
                                     if (prevblanks < curblanks){
                                        curblanks = prevblanks;
                                        folders.push(DATATREE.StringTrim(prevname));
                                     }
                                  }
                                  for (var back = folders.length; back >= 0; --back){
                                     var folder = folders[back];
                                     if (folder != null && folder != "undefined" && DATATREE.StringTrim(folder) != ""){
                                        result += folder + "/";
                                     }
                                  }
				  result += filename + ",";
		          }
		  }
		  response = result;
                  return response;
   } else {
         return null;
   }
   } catch (exc) { 
      DATATREE.TREE? DATATREE.TREE.ALERTS.push("error loading sitemap") : this.ALERTS.push("error loading sitemap");
   }
}
function DatatreeSetTreeHeight(treeheight){
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
function DatatreeSetIcons(open,closed,empty){
   this.SetOpenIcon(open);
   this.SetClosedIcon(closed);
   this.SetEmptyIcon(empty);
}
function DatatreeSetOpenIcon(open){
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
function DatatreeSetClosedIcon(closed){
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
function DatatreeSetEmptyIcon(empty){
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
function DatatreeGetLettering(){
    return "font-family:" + this.LETTERING + ";";
}
function DatatreeAutoInitialize(TEXT){ 
   var elmnt = document.getElementById(this.ELEMENT_OUTER_WRAPPER);
   if (elmnt.getAttribute('root')){
      this.TITLE = elmnt.getAttribute('root');
   }
   if (elmnt.getAttribute('lettering') != null && elmnt.getAttribute('lettering') != "undefined"){
      this.LETTERING = elmnt.getAttribute('lettering');
      //var lettering = "font-family:" + this.LETTERING + ";";
      //this.ELEMENT_INNER_WRAPPER_STYLE = this.ELEMENT_INNER_WRAPPER_STYLE + lettering;
   }
   if (elmnt.getAttribute('accordion') != null && elmnt.getAttribute('accordion') != "undefined" && parseInt(elmnt.getAttribute('accordion')) >= 0){
      this.ACCORDION = parseInt(elmnt.getAttribute('accordion'));
   }
   if (elmnt.getAttribute('open')){
      this.SetOpenIcon(elmnt.getAttribute('open'));
   }
   if (elmnt.getAttribute('closed')){
      this.SetClosedIcon(elmnt.getAttribute('closed'));
   }
   if (elmnt.getAttribute('leaf')){
      this.SetEmptyIcon(elmnt.getAttribute('leaf'));
   } else if (elmnt.getAttribute('empty')){
      this.SetEmptyIcon(elmnt.getAttribute('empty'));
   }
   if (elmnt.getAttribute('treeheight')){
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
   var TYPE = "TEXT";
   if (elmnt.getAttribute("type")){
      switch(elmnt.getAttribute("type")){
         case "html":
            TYPE = "HTML";
            break;
         case "text":
            TYPE = "TEXT";
            break;
         case "tree":
         case "datatree":
         case "file":
         case "tree.html":
            TYPE = "TREE";
            break;
         default:
            break;
      }
   }
   //DATATREE.PLEASE_WAIT = true;
   var querystring = "CREATE FROM " + TYPE + " " + TEXT;
   this.Query(querystring);
}
function DatatreeAutoExpand(evt){
   if (!evt){ evt = window.event; }
   if (evt){
      evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
   }
   if (DATATREE.TREE){
      DATATREE.TREE.Query("EXPAND");
   }
}
function DatatreeAutoCollapse(evt){
   if (!evt){ evt = window.event; }
   if (evt){
      evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
   }
   if (DATATREE.TREE){
      DATATREE.TREE.Query("COLLAPSE");
   }
}
function DatatreeAutoReplace(){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (DATATREE.TREE){
      var replace = document.getElementById(DATATREE.TREE.TOOLBAR_REPLACE_NAME).value;
      var replace_with = document.getElementById(DATATREE.TREE.TOOLBAR_REPLACE_WITH_NAME).value;
      if (DATATREE.StringTrim(replace) != "" && DATATREE.StringTrim(replace_with) != ""){
         DATATREE.TREE.Query("WITH " + replace_with);
         DATATREE.TREE.Query("REPLACE " + replace);
      } else if (DATATREE.StringTrim(replace) == "" && DATATREE.StringTrim(replace_with) == ""){
         DATATREE.TREE.Query("REPLACE");
      }
   }
}
function DatatreeAutoSkip(){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (DATATREE.TREE){
      DATATREE.TREE.Query('SKIP');
   }
}
function DatatreeAutoSearch(evt){
   if (!evt){ evt = window.event; }
   if (evt){
      evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
   }
   if (DATATREE.TREE){
      var searchterm = document.getElementById(DATATREE.TREE.TOOLBAR_SEARCHBOX_NAME).value;
      if (DATATREE.StringTrim(searchterm) != ""){
         var options = "";
         var cas = document.getElementById('datatree_case');
         var exact = document.getElementById('datatree_exact');
         if (cas && cas.checked == true){
            options += "CASE_SENSITIVE ";
         }
         if (exact && exact.checked == true){
            options += "EXACT_MATCHES ";
         }
         DATATREE.TREE.Query("SEARCH " + options + "FOR " + searchterm);
      }
   }
}
function DatatreeAutoNext(evt){
   if (!evt){ evt = window.event; }
   if (evt){
      evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
   }
   if (DATATREE.TREE){
       DATATREE.TREE.Query("NEXT");
   }
}
function DatatreeAutoPrevious(evt){
   if (!evt){ evt = window.event; }
   if (evt){
      evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
   }
   if (DATATREE.TREE){
       DATATREE.TREE.Query("PREVIOUS");
   }
}
function DatatreeAutoQuery(evt){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   } else if (evt){
      evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
   }
   if (DATATREE.TREE){
      var query = document.getElementById(DATATREE.TREE.TOOLBAR_QUERYWINDOW_NAME).value;
      if (DATATREE.StringTrim(query) != ""){
         DATATREE.TREE.Query(query);
      }
   }
}
function DatatreeAutoNumber(){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (DATATREE.TREE){
      DATATREE.TREE.Query("NUMBER");
   }
}
function DatatreeAutoReset(evt){
   if (!evt){ evt = window.event; }
   if (evt){
      evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
   }
   if (DATATREE.TREE){
      if (document.getElementById(DATATREE.TREE.TOOLBAR_QUERYWINDOW_NAME)){
         document.getElementById(DATATREE.TREE.TOOLBAR_QUERYWINDOW_NAME).value = "";
      }
      DATATREE.TREE.Query("CLEAR ALL");
   }
}
function DatatreeAutoPrintHtml(){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (DATATREE.TREE){
      DATATREE.TREE.Query("PRINT HTML");
   }
}
function DatatreeAutoSave(){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (DATATREE.TREE){
      if (DATATREE.TREE.TYPE == "text"){
         DATATREE.TREE.Query("PRINT TEXTTREE");
         alert('Please save your file as an html file with the double extension .tree.html');
         //DATATREE.TREE.Query("PRINT TEXT");
         //alert('Please save your file as a text file with the extension .txt');
      } else if (DATATREE.TREE.TYPE == "html"){
         DATATREE.TREE.Query("PRINT HTML");
         alert('Please save your file as an html file with the extension .html');
      } else {
         DATATREE.TREE.Query("PRINT FILE");
         alert('Please save your file as an html file with the double extension .tree.html');
      }
   }
}
function DatatreeAutoSaveMax(){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (DATATREE.TREE){
      if (DATATREE.TREE.TYPE == "text"){
         DATATREE.TREE.Query("PRINT TEXTTREE");
         alert('Please save your file as an html file with the double extension .tree.html');
         //DATATREE.TREE.Query("PRINT TEXT");
         //alert('Please save your file as a text file with the extension .txt');
      } else {
         DATATREE.TREE.Query("PRINT FILEMAX");
         alert('Please save your file as an html file with the double extension .tree.html');
      }
   }
}
function DatatreeAutoPrintText(){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (DATATREE.TREE){
      DATATREE.TREE.Query("PRINT TEXT");
   }
}
function DatatreeAutoPrintCode(){
  if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (DATATREE.TREE){
      DATATREE.TREE.Query("PRINT CODE");
   }
}
function DatatreeAutoPrintList(){
  if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (DATATREE.TREE){
      DATATREE.TREE.Query("PRINT LIST");
   }
}
function DatatreeAutoPrintFile(){
  if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (DATATREE.TREE){
      DATATREE.TREE.Query("PRINT FILE");
   }
}
function DatatreeAutoAlphabetize(){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   var datatree = DATATREE.TREE? DATATREE.TREE : this;
   var lower_bound = document.getElementById(datatree.TOOLBAR_LOWER_BOUND_NAME).value;
   var upper_bound = document.getElementById(datatree.TOOLBAR_UPPER_BOUND_NAME).value;
   lower_bound = parseInt(DATATREE.StringTrim(lower_bound));
   upper_bound = parseInt(DATATREE.StringTrim(upper_bound));
   if (typeof lower_bound == "number" && typeof upper_bound == "number" && !isNaN(lower_bound) && !isNaN(upper_bound)){
      var input = "ALPHABETIZE FROM LINE " + lower_bound + " TO LINE " + upper_bound;
      datatree.Query(input);
   } else {
      alert("Line numbers only. Please press/query number, find the appropriate lines, then press/query reset.");
   }
}
function DatatreeHtmlText(){
    return this.CONTENT;
}
function DatatreeHtmlCode(){
    return this.GetCode();
}
function DatatreeGetText(){
    return this.PlainText();
}
function DatatreePlainText(){
    var result = "";
    var lines = new Array();
    lines = this.GetHtmlLines(this.CONTENT, lines);
    //var lines = this.HtmlLineBreaks(this.CONTENT);
    for (var count = 0; count < lines.length; ++count){
       lines[count] = DATATREE.StripTagsPHPJS(lines[count]);
       //lines[count] = DATATREE.StripTagLeaveInner(lines[count], "p");
       //lines[count] = DATATREE.StripTagWithClassNameLeaveInner(lines[count], "span", "linenumber");
       //lines[count] = DATATREE.StripTagWithClassNameLeaveInner(lines[count], "span", "search_result");
    }
    for (var count = 0; count < lines.length; ++count){
       result += lines[count] + "\n";
    }
    return result;
}
function DatatreeStripTagWithClassNameLeaveInner(text, tag, name){
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
function DatatreeStripTagLeaveInner(text, tag){
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
function DatatreeSynchronize(updateGUI){
    try{
       this.NODES.length = 0;
       this.LEVELS.length = 0;
       if (DatatreeSynchronize.arguments.length > 0 && updateGUI == false){}else{
          this.VIEW = "";
       }
       this.SyncFromRootNode(this.ROOT_NODE);
       //this.CONTENT = "";//8.3
       for (var count = 0; count < this.NODES.length; ++count){
          var node = this.NODES[count];
          node.INDENTATION = node.GetLevel();//7.9.6
          //node.INDENTATION = node.GetLevel("simple") - 1;
          //node.INDENTATION = (node.GetLevel("simple") - 1) * this.INDENTATION;
          //node.LINK = this.OPEN_ICON;
          //node.TREE = this;
          var text = node.TEXT;
          text = text.split("\r").join("").split("\n").join("").split("&nbsp;").join(" ");
          if (this.PRESERVE_WHITE_SPACE == true){
              if (text.charAt(0) == " "){
                  node.TEXT = "<span style='white-space:pre;'>" + text + "</span>";
                  //node.TEXT = "<span class='preserve_white_space'></span>" + text;
                  //this.CONTENT += "<p>" + node.TEXT + "</p>";//8.3
              } else {
                  //this.CONTENT += "<p>" + text + "</p>";//8.3
              }
          } else {
              text = DATATREE.StringTrim(text);
              node.TEXT = text;
              /** 8.3
              var indentation = "";
              for (var count2 = 0; count2 <= node.GetLevel(); ++count2){//7.9.6
              //for (var count2 = 0; count2 < node.GetLevel("simple"); ++count2){
                  for (var count3 = 0; count3 < this.INDENTATION; ++count3){
                      indentation += " ";
                  }
              }
              //node.INDENTATION = indentation.length;
              this.CONTENT += "<p>" + indentation + text + "</p>";
              **/
          }
       }
       //this.UpdateContent();
       if (DatatreeSynchronize.arguments.length > 0 && updateGUI == false){}else{
          this.Refresh();
       }
    } catch (exc) {
       if (DATATREE.REPRESS_ALERTS == false){ alert(exc); }
    }
}
function DatatreeSyncFromRootNode(node){
    if (node != this.ROOT_NODE){
        this.NODES.push(node);
    }
    for (var count = 0; count < node.CHILDREN.length; ++count){
        this.LEVELS.push(node.GetLevel());
        this.SyncFromRootNode(node.CHILDREN[count]);
    }
}
function DatatreeSyncFromDataTree(tree, justreturnval){ 
    try{
    tree = this.HtmlBody(tree);
    var div = document.createElement('div');
    div.innerHTML = tree;
    var datatree = DATATREE.TREE? DATATREE.TREE : this;
    var UL = null;
    if (div.getElementsByTagName('ul').length > 0){
       UL = div.getElementsByTagName('ul')[0];
       if (UL.id == datatree.ELEMENT_INNER_WRAPPER){
          var ul2 = UL.innerHTML.toString().substring(UL.innerHTML.toString().indexOf('<ul'));
          div.innerHTML = ul2;
          UL = div.getElementsByTagName('ul')[0];
       }
    } else {
	   if (div.getElementsByTagName('div').length > 0){
		   var dv = div.getElementsByTagName('div')[0];
		   if (dv.id == datatree.ELEMENT_OUTER_WRAPPER){
		      var txt = dv.innerHTML;
		      if (DATATREE.LeftStringTrim(txt).indexOf("<!--") == 0){//7.9.8
                      DATATREE.PLEASE_WAIT = false;
			      this.Query("CREATE FROM TEXT " + txt);
		      }
		   }
	   } else {
           //alert('invalid input');
	   }
       return;
    }
    var count = 0;
    while (UL.getElementsByTagName('a').length > 0 && count < 1000){
       UL = DatatreeRemoveAnchors(UL);
       ++count;
    }
    //var div2 = document.createElement('div');
    //div2.appendChild(UL);
    //UL = div2.children[0];
    UL = DatatreeRemoveEmptyLists(UL);
    //var div3 = document.createElement('div');
    //div3.appendChild(UL);
    UL.style.display = "";
    UL.style.listStyleType = "";
    UL.removeAttribute("style");
    UL.className = "";
    UL.removeAttribute("class");
    UL.removeAttribute("oncontextmenu");
    for (var count = 0; count < UL.getElementsByTagName('li').length; ++count){
       var li = UL.getElementsByTagName('li')[count];
       li.style.whiteSpace = "";
       li.removeAttribute("style");
       li.className = "";
       li.removeAttribute("class");
    }
    for (var count = 0; count < UL.getElementsByTagName('ul').length; ++count){
       var u = UL.getElementsByTagName('ul')[count];
       u.style.display = "";
       u.style.listStyleType = "";
       u.removeAttribute("style");
    }
    DatatreeRemoveContentSpanWrappers(UL);
    var div4 = document.createElement('div');
    div4.appendChild(UL);
    if (DatatreeSyncFromDataTree.arguments.length == 2 && (justreturnval == true || justreturnval == "true" || justreturnval == "justreturnval")){
        return div4.innerHTML;
    } else {
        DATATREE.PLEASE_WAIT = true;
        this.Query("CREATE FROM HTML " + div4.innerHTML);
    }
    } catch(exc) {  }
}
function DatatreeRemoveContentSpanWrappers(ul){
    for (var count = 0; count < ul.getElementsByTagName('li').length; ++count){
        var li = ul.getElementsByTagName('li')[count];
        if (li.getElementsByTagName('span').length > 0){
            var span = li.getElementsByTagName('span')[0];
            if (span.className == 'datatree_content'){
                var inner = span.innerHTML;
                li.removeChild(span);
                li.innerHTML = inner + li.innerHTML;
            }
        }
        if (li.getElementsByTagName('ul').length > 0){
            DatatreeRemoveContentSpanWrappers(li.getElementsByTagName('ul')[0]);
        }
    }
}
function DatatreeRemoveAnchors(elmnt){
    var anchors = elmnt.getElementsByTagName('a');
    for (var count = 0; count < anchors.length; ++count){
        var anchor = anchors[count];
        if (anchor.className == 'datatree_arrow'){
            anchor.parentNode.removeChild(anchor);
        }
    }
    return elmnt;
}
function DatatreeRemoveEmptyLists(elmnt){
    var chils = elmnt.childNodes;
    for (var count = 0; count < chils.length; ++count){
        var c = chils[count];
        if (c.nodeName.toLowerCase() == "ul" && c.children.length <= 0){
            c.parentNode.removeChild(c);
        }
        c = DatatreeRemoveEmptyLists(c);
    }
    return elmnt;
}
function DatatreeUndoPreservedWhiteSpace(){
    this.PRESERVE_WHITE_SPACE = false;
    for (var count = 0; count < this.NODES.length; ++count){
        var node = this.NODES[count];
        node.TEXT = node.TEXT.split("<span class='preserve_white_space'></span>").join("");
    }
    this.Synchronize();
}
function DatatreeStripTags(line,remove_tables){ // remove tables when loading, don't when searching
    if (line.indexOf('table') >= 0){
      var div = document.createElement('div');
      div.innerHTML = line;
      var tables = div.getElementsByTagName('table');
      for (var count = 0; count < tables.length; ++count){
         var t = tables[count];
         if (DatatreeStripTags.arguments.length > 0 && remove_tables == true){
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
function DatatreeStringTrim(strng){
    if (strng == null || strng == "undefined"){
        if (DATATREE.REPRESS_ALERTS == false){ alert("error in string trim"); }
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
function DatatreeLeftStringTrim(strng){
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
function DatatreeRightStringTrim(strng){
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
function DatatreeArraySwap(index1, index2, aray){
    var first = aray.slice(index1)[0];
    var second = aray.slice(index2)[0];
    aray.splice(index1, 1, second);
    aray.splice(index2, 1, first);
    return aray;
}
function DatatreeRemoveBranch(index,update){
    try{
        this.CHILDREN.splice(index, 1);
        var macro_index = this.TREE.NODES.indexOf(this) + index;
        if (DatatreeRemoveBranch.arguments.length > 1 && update == true){
           this.TREE.NODES.splice(macro_index, 1);
        }
    } catch (exc) {
        if (DATATREE.REPRESS_ALERTS == false) { alert(exc); }
    }
}
function DatatreeRemoveAllBranches(update){
    for (var count = 0; count < this.CHILDREN.length; ++count){
          this.RemoveBranch(count);
          count -= 1;
    }
    //this.TREE.NODES.length = 0;
}
function DatatreeListIterate(_click){
       var click = true;
       if (DatatreeListIterate.arguments.length > 0 && _click == false){
           click = false;
       } else {
           this.Click();
       }
       var li = "<li class='datatree_li' style='white-space:nowrap;'>";
       var a = "<a class='datatree_arrow' href='javascript:void(0)' onclick='return clicktree(event);' style='text-decoration:none;' >" + this.LINK + "</a>";
       var datatree = DATATREE.TREE? DATATREE.TREE : this;
       if (datatree.UNDERLINE_ICONS == true){
          a = "<a class='datatree_arrow' href='javascript:void(0)' onclick='return clicktree(event);' >" + this.LINK + "</a>";
       }
       var span = "<span class='datatree_content' style='white-space:pre-wrap;padding-left:10px;' onclick='return DatatreeClickSpan(event);' onmousedown='return DatatreeMouseDownSpan(event);' onmouseup='return DatatreeMouseUpSpan(event);'>";
       var text = DATATREE.StringTrim(this.TEXT);
       text = text.split("\n").join("");
       var _span = "</span>";
       var accordion = datatree.ACCORDION >= 0? "padding-left:" + datatree.ACCORDION + "pt;": "";
       var ul = "<ul class='datatree_ul' style='list-style-type:none;display:" + this.DISPLAY + ";" + accordion + "' >";
       for (var count = 0; count < this.CHILDREN.length; ++count){
          var c = this.CHILDREN[count];
          ul += c.Iterate(click);
       }
       var _ul = "</ul>";
       var _li = "</li>";
       var result = li + a + span + text + _span + ul + _ul + _li;
       if(text.search("datatree_content") >= 0){//*****************************************************************10.0
           result = li + a + text + ul + _ul + _li;
       }
       return result;
}
function DatatreeClick(){
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
function DatatreeClose(){
       //if (this.DISPLAY == "block"){
          this.LINK = this.TREE.CLOSED_ICON;
          if (this.CHILDREN.length < 1){
             this.LINK = this.TREE.EMPTY_ICON;
          }
          this.DISPLAY = "none";
       //}
       for (var count = 0; count < this.CHILDREN.length; ++count){
          this.CHILDREN[count].Close();
       }
}
function DatatreeGetLevel(MODE){
    if (DatatreeGetLevel.arguments.length <= 0){
       MODE = "";
    }
    var node = this;
    var level_count = -1;//7.9.6
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
       // root node...returns -1 as of 7.9.6
    }
    return level_count;//7.9.6
    /**
    if (MODE == "simple"){
       return level_count;
    } else if (MODE != "treenumbers"){
       return (level_count - 1)/2;
    } else if (MODE == "treenumbers"){
       return (level_count - 1);
    } else {
       return (level_count - 1)/2;
    }**/
}
function DatatreeGetChildCount(){
    return this.CHILDREN.length;
}
function DatatreeGetIndex(test){
   var index = -1;
   if (this.PARENT_NODE.TEXT != "undefined" && this.PARENT_NODE.TEXT != null){
      index = this.PARENT_NODE.CHILDREN.indexOf(this);
   }
   return index;
}
function DatatreeCountFromTop(){
   var number = -1;
   if (this.TREE && this.TREE.NODES){
      number = this.TREE.NODES.indexOf(this) + 1;//often finds -1 + 1 = 0
   }
   return number;
}
function DatatreeIndexFromTop(node){
   var index = -1;
   for (var count = 0; count < DATATREE.TREE.NODES.length; ++count){
      var n = DATATREE.TREE.NODES[count];
      if (node == n){
         index = count;
         break;
      }
   }
   return index;
}
function DatatreeRemoveEmptyEndTags(line){
   var break_starts = ["<p>", "<h1>", "<h2>", "<h3>", "<h4>", "<h5>", "<h6>", "<div>", "<table>", "<form>", "<ul>", "<ol>", "<li>", "<blockquote>"];
   var break_half_starts = ["<p ", "<h1 ", "<h2 ", "<h3 ", "<h4 ", "<h5 ", "<h6 ", "<div ", "<table ", "<form ", "<ul ", "<ol ", "<li ", "<blockquote "];
   var break_ends = ["</p>", "</h1>", "</h2>", "</h3>", "</h4>", "</h5>", "</h6>", "</div>", "</table>", "</form>", "</ul>", "</ol>", "</li>", "</blockquote>", "<br/>", "<br>", "<hr/>", "<hr>"];
   var result = "";
   var splits = line.split("<");
   for (var count = 0; count < splits.length; ++count){
      var s = "<" + splits[count];
      var ss = DATATREE.StringTrim(s);
      if (break_ends.indexOf(ss) >= 0 && !line.indexOf(break_starts[break_ends.indexOf(ss)]) >= 0){
      //
      } else {
          result += s;
      }
   }
   return result;
}
function DatatreeIsTableTag(tag){
    var result = false;
    var table_tags = ["<table>","<caption>","<thead>", "<tbody>", "<tr>", "<td>", "</table>","</caption>","</thead>", "</tbody>", "</tr>", "</td>", "<table ","<caption ","<thead ", "<tbody ", "<tr ", "<td "] ;
    for (t in table_tags){
      if (tag.indexOf(table_tags[t]) >= 0){
          result = true;
      }
    }
    return result;
}
function DatatreeHtmlLineBreaks(HTML, nbsp){ 
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
          if (tag == "" && c == ' ' && DatatreeHtmlLineBreaks.arguments.length == 2 && nbsp == true){
              c = "&nbsp;";
          }
          line += c;
          if (count + 1 == html.length){
             if (DATATREE.StringTrim(line) == ""){
               ++SKIPPED_LINES;
             } else if (break_ends.indexOf(DATATREE.StringTrim(line)) >= 0){ // line is just an end tag
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
                if (tag == DATATREE.StringTrim(line) || DATATREE.StringTrim(DATATREE.RemoveEmptyEndTags(line)) == ""){ // line is just an end tag
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
                   if (DATATREE.StringTrim(line) != tag){
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
             //} else if (IsTableTag(tag) == true){
                 //
             } else {
                if (tag.indexOf("style") >= 0){
                   var temp = document.createElement('div');
                   temp.innerHTML = tag + break_ends[break_half_starts.indexOf(tag.split(" ")[0])];
                   var tg = temp.firstChild;
                   var pl = null;
                   if (tg && tg.style){
                      if (tg.style.padding || tg.style.paddingTop || tg.style.paddingBottom || tg.style.paddingRight){}
                      else if (tg.style.paddingLeft && DATATREE.StringTrim(line.replace(tag, "")) == ""){
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
function DatatreeRemoveHtmlComments(html){
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
function DatatreeDivHasSelfIndentingTag(div){
    var result = false;
    if (div.getElementsByTagName('ul').length > 0 || div.getElementsByTagName('ol').length > 0 || div.getElementsByTagName('blockquote').length > 0 || div.getElementsByTagName('hr').length > 0){ // || div.getElementsByTagName('table').length > 0 
        result = true;
    }
    return result;
}
function DatatreeTagRequiresLineBreak(div){ // if don't wrap tables with <p> then require <br> or else two consecutive lines with tables would merge into same line
    var result = false;
    if (div.getElementsByTagName('table').length > 0){
        result = true;
    }
    return result;
}
function DatatreeDivHasKeeperNonTextTag(div){ // components not allowed unless they are listed here (and maybe also DivHasContentTag)
    var result = false;
    if (div.getElementsByTagName('math') > 0 || div.getElementsByTagName('audio').length > 0 || div.getElementsByTagName('video').length > 0 || div.getElementsByTagName('embed').length > 0 || div.getElementsByTagName('object').length > 0 || div.getElementsByTagName('iframe').length > 0 || div.getElementsByTagName('img').length > 0 || div.getElementsByTagName('table').length > 0 || div.getElementsByTagName('ul').length > 0 || div.getElementsByTagName('ol').length > 0 || div.getElementsByTagName('blockquote').length > 0 || div.getElementsByTagName('hr').length > 0){
        result = true;
    }
    return result;
}
function DatatreeDivHasContentTag(div){ // don't count blanks found inside content tag or after it
    var result = false;
    if (div.getElementsByTagName('audio').length > 0 || div.getElementsByTagName('video').length > 0 || div.getElementsByTagName('embed').length > 0 || div.getElementsByTagName('object').length > 0 || div.getElementsByTagName('iframe').length > 0 || div.getElementsByTagName('img').length > 0){ 
        result = true;
    } else if (div.getElementsByTagName('table').length > 0 || div.getElementsByTagName('math').length > 0){
        result = true; // maybe better to allow blanks in these
    }
    return result;
}
function DatatreeIsRemovableFormatTag(tag){
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
function DatatreeDoNotWrapOuterElement(line){
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
       if (result.substring(0, result.indexOf("<")).length > 0 && DATATREE.StringTrim(result.substring(0, result.indexOf("<"))) == ""){
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
          starting_tag = DATATREE.StringTrim(starting_tag);
          ending_tag = DATATREE.RightStringTrim(ending_tag);
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
function DatatreeGetOuterElement(line){
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
       if (result.substring(0, result.indexOf("<")).length > 0 && DATATREE.StringTrim(result.substring(0, result.indexOf("<"))) == ""){
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
           trimmed = DATATREE.StringTrim(line);
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
function DatatreeSetTableStyle(html){
    //html = html.split("</table><p>&nbsp;</p>").join("</table>");
    //html = html.split("</table><p> </p>").join("</table>");
    var div = document.createElement('div');
    div.innerHTML = html;
    var tables = div.getElementsByTagName('table');
    for (var count = 0; count < tables.length; ++count){
        var t = tables[count];
        t.style.display = 'inline-table';
    }
    return div.innerHTML;
}
function DatatreeRemoveTables(html){
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
function DatatreeRemoveTableWrappers(lines){
    var newlines = new Array();
    for (var count = 0; count < lines.length; ++count){
        var l = lines[count];
        var outer = DatatreeGetOuterElement(l);
        if (l.indexOf("<table ") >= 0 && outer.toUpperCase() != "TABLE"){
           if (outer.toUpperCase() == "P"){
              l = l.substring(l.indexOf(">") + 1, l.lastIndexOf("<"));
           }
        }
        newlines.push(l);
    }
    return newlines;
}
function DatatreeGetHtmlLines(content, lines){
           lines.length = 0;
           content = this.HtmlBody(content);
           content = this.RemoveHtmlComments(content);
           lines = this.HtmlLineBreaks(content);
           lines = DATATREE.RemoveTableWrappers(lines);
           for (var count = 0; count < lines.length; ++count){ // strip leading p or div tags, save blanks in front
               var result = lines[count]; 
               // check for blanks before first tag
               var startingblanks = "";
               var startingtext = "";
               if (result.substring(0, result.indexOf("<")).length > 0){ // has blanks or letters/numbers before first tag
                   if (DATATREE.StringTrim(result.substring(0, result.indexOf("<"))) == ""){ // just blanks
                      for (var blanks = 0; blanks < result.indexOf("<"); ++blanks){
                          startingblanks += " ";
                      }
                   } else { // letters/numbers and possibly blanks
                       startingtext = DATATREE.StringTrim(result.substring(0, result.indexOf("<")));
                       var numblanks = result.substring(0, result.indexOf("<")).length - DATATREE.StringTrim(result.substring(0, result.indexOf("<"))).length;
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
                  trimmed = DATATREE.StringTrim(result); // doesnt remove nested blanks, but does remove trailing end blanks
                  tagless = DATATREE.StripTagsPHPJS(this.RemoveTables(result)); // *** not trimmed *** what if line is just a tag, like an image
                  trimmed_and_tagless = DATATREE.StringTrim(tagless); // should be left string trim, might leave nothing
               } else if (this.GetOuterElement(result).toLowerCase() == "table"){
                   trimmed = DATATREE.StringTrim(result);
                   tagless = trimmed;
                   trimmed_and_tagless = tagless;
               } else { 
               }
               var firstcharacter = result.charAt(0);
               var div = document.createElement('div');
               div.innerHTML = lines[count];
               if (trimmed_and_tagless == ""){ // line has just a tag, like img, or just blanks, like <font>   <img/></font>, don't add starting blanks again
                   var numblanks = DATATREE.StripTags(DATATREE.RightStringTrim(result),true).length;
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
function DatatreeTreeFromString(content, title, mode){ 
    if (DatatreeTreeFromString.arguments.length <= 0){ // ??????
        title = 'TREE';
    } else if (DatatreeTreeFromString.arguments.length < 3){ // ????????
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
        case "text":
           if (content.indexOf("\t") >= 0){
              content = content.split("\t").join(DATATREE.TAB);
           }
           if (content.indexOf("\r\n") >= 0){
              lines = content.split("\r\n");
           } else if (content.indexOf("\n") >= 0){
              lines = content.split("\n");
           } else {
              lines.push(content);
           }
           if (DATATREE.StringTrim(lines[0]) == "" && lines.length > 1){//7.9.8 allows newline
              lines.splice(0, 1);
           }
           if (DATATREE.StringTrim(lines[0]).indexOf("<!--") == 0 && DATATREE.StringTrim(lines[lines.length - 1]).indexOf("-->") == DATATREE.StringTrim(lines[lines.length-1]).length - "-->".length){//7.9.8
               lines[0] = lines[0].replace("<!--","");//7.9.8
               if (DATATREE.StringTrim(lines[0]) == ""){
                  lines.splice(0, 1);
               }
               lines[lines.length - 1] = lines[lines.length - 1].replace("-->","");
               if (DATATREE.StringTrim(lines[lines.length - 1]) == ""){
                  lines.splice(lines.length - 1, 1);
               }
           }
           break;
        case "html":
           if (content.indexOf("\t") >= 0){
              content = content.split("\t").join(DATATREE.TAB);
           }
           lines = this.GetHtmlLines(content, lines);
           for (var count = 0; count < lines.length; ++count){ 
               lines[count] = lines[count].replace("<br/>", "").replace("<br>", "");
           }
           break;
        default:
           if (DATATREE.REPRESS_ALERTS == false) { alert("error in tree from string"); }
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
       if (DATATREE.StringTrim(lines[count]) != ""){
          Rawlines.push(lines[count]);
       }
    }
    if (Rawlines.length < 1) {
        EMPTY_FILE = true;
    }
    var empty_test = "";
    for (var count = 0; count < Rawlines.length; ++count){
       empty_test += DATATREE.StringTrim(Rawlines[count]);
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
        if (DATATREE.StringTrim(s) == ""){
            continue;
        }
        if (mode == "text"){
            s = s.split("<").join("&lt;").split(">").join("&gt;");
        }
        Masterlist.push(s);
        Trimmedlines.push(DATATREE.LeftStringTrim(s));
        var key = "";
        var txtstrt = parseInt(s.length) - parseInt(DATATREE.LeftStringTrim(s).length);
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
        if (DATATREE.StringTrim(m) != ""){
           var node = new this.Branch(m, this);
           this.NODES.push(node);
        }
    }
    this.LEVELS.length = 0;
    var TEMPTREE = new this.Branch(title, this);
    this.ProcessTree(-1, 0, this.NODES, TEMPTREE, Keys, Trimmedlines, EMPTY_FILE);
    this.InsertClickTreeText();
    this.InsertEditTreeText();
    return TEMPTREE;
}
function Traverse(branch){
   Traverse2(branch,0);
   return DATATREE.TEMP;
}
function Traverse2(branch,keeptrack){ // debugger
   if (branch == null || branch == "undefined"){
      return null;
   }
   if (keeptrack == 0){
      DATATREE.TEMP = "";
   }
   for (var count = 0; count < branch.CHILDREN.length; ++count){
      var node = branch.CHILDREN[count];
      DATATREE.TEMP += node.TEXT + "\n";
      Traverse2(node,++keeptrack);
   }
}
function DatatreeProcessTree(thisindex, nextindex, nodelist, TEMPTREE, Keys, Trimmedlines, EMPTY_FILE) {
     if (EMPTY_FILE) {
         return;
     }
     for (var start = thisindex; start < nodelist.length; ++start){
        var thisindex = start;
        var nextindex = start + 1;
        if (Keys.length == nextindex) {
            return;
        }
        ++DATATREE.COUNTER;
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
                   if (DATATREE.REPRESS_ALERTS == false) { alert("error in process tree"); }
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
function DatatreeUpdateContent(){
   this.Query("CREATE FROM HTML " + this.ViewGetList());
}
function DatatreeUpdateContentDeprecated(node){
    if (DatatreeUpdateContent.arguments.length <= 0){
        node = this.ROOT_NODE;
        this.CONTENT = "";
    } else if (node == this.ROOT_NODE){
        this.CONTENT = "";
    }
    if (node.GetLevel() >= 0){
       var indentation = '';
       var level = node.GetLevel("simple");// 7.9.6
       //var level = node.GetLevel()*2; // 7.9.6
       //var level = node.GetLevel();
       var blanks = parseInt(level) * node.TREE.INDENTATION;// 7.9.6
       //var blanks = parseInt(level * 10);
       for (var count = 0; count < blanks; ++count){ // v6.4 bug fixed: for (var count = 0; count < node.INDENTATION; ++count){
           indentation += ' ';
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
            this.UpdateContent(node.CHILDREN[count]);
        }
    }
}
function DatatreeContextMenu(popup_text, timing, x, y) {
  try{
    if (document.documentElement.scrollTop){
       y += document.documentElement.scrollTop;
       x += document.documentElement.scrollLeft;
    } else if (document.body.scrollTop){
       y += document.body.scrollTop;
       x += document.body.scrollLeft;
    }
    var datatree = DATATREE.TREE? DATATREE.TREE : this;
    DATATREE.CloseContextMenu();
    //if (DATATREE.REPRESS_ALERTS == true) { return; }
    if (document.getElementById) {
        if (document.getElementById('datatree_contextmenu')){
            document.getElementById('datatree_contextmenu').parentNode.removeChild(document.getElementById('datatree_contextmenu'));
        }
        var box = document.createElement('div');
        box.id = 'datatree_contextmenu';
        box.style.position = "absolute";
        box.style.zIndex = "100";
        box.style.display = "none";
        box.style.border = "1px solid gray";
        box.innerHTML = "<select style='background-color:#f5f2eb;overflow:visible;' id='datatree_context_message' onmouseover='return DatatreeFocusContextMenu();' onblur='return DatatreeCloseContextMenu();' multiple='multiple'></select>";
        document.body.appendChild(box);
        //document.getElementById(datatree.ELEMENT_OUTER_WRAPPER).appendChild(box);
        if (box) {
            box.style.display = "block";
            if (true){
                box.style.left = (x - 10) + "px";
                box.style.top = (y - 10) + "px";
            } else if (false)
            {
                boxwidth = box.offsetWidth;
                boxheight = box.offsetHeight;
                box.style.left = (x - (boxwidth/2)) + "px";
                box.style.top = (y - boxheight) + "px";
            }
            message_text = document.getElementById("datatree_context_message");
            if (message_text) {
                var txts = popup_text.split("\n");
                message_text.innerHTML = "";
                var message = "";
                for (txt in txts) {
                    message += "<option value=''>";
                    message += txts[txt];
                    message += "</option>";
                }
                message_text.innerHTML = message;
            }
            window.clearTimeout(DATATREE.TIMER);
            DATATREE.TIMER = setTimeout(DATATREE.ClosePopupBox, timing);
        }
    }
  } catch (exc) {  }
}
function DatatreeFocusContextMenu(){
   if (document.getElementById('datatree_context_message')){
      document.getElementById('datatree_context_message').focus();
   }
}
function DatatreeCloseContextMenu() { 
    if (document.getElementById('datatree_contextmenu')) {
        box = document.getElementById("datatree_contextmenu");
        if (box) { 
            box.style.display = "none";
            if (DATATREE.TIMER) {
                window.clearTimeout(DATATREE.TIMER);
            }
        }
    }
}
function DatatreeRightClick(){
    if (DATATREE.BACKSPACE_ALLOWED == true){
       return;
    }
    var message = "DATATREE v10.0\nCopyright &copy; 2015 Derek James Smith";
    var evt = window.event;
    var popupx = evt.clientX;
    var popupy = evt.clientY;
    popup_wait = 10000;
    DATATREE.ContextMenu(message, popup_wait, popupx, popupy);
    return false;
    //show_popup_box(instr, popup_wait, (window.screen.width/2) + 30, (window.screen.height/2));
}

function DatatreeShowPopupBox(popup_text, timing, x, y) { 
  try{
    adjust = false;
    if (DatatreeShowPopupBox.arguments.length < 2){
       timing = 100000;
       x = window.innerWidth/2;
       y = window.innerHeight/2;
       adjust = true;
    } else if (DatatreeShowPopupBox.arguments.length < 4){
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
    var datatree = DATATREE.TREE? DATATREE.TREE : this;
    DATATREE.ClosePopupBox();
    if (DATATREE.REPRESS_ALERTS == true) { return; }
    if (document.getElementById) {
        if (document.getElementById('datatree_popupbox')){
            document.getElementById('datatree_popupbox').parentNode.removeChild(document.getElementById('datatree_popupbox'));
        }
        var box = document.createElement('div');
        box.id = 'datatree_popupbox';
        box.style.position = "absolute";
        box.style.zIndex = "100";
        box.style.display = "none";
        //box.style.height = "100px";
        //box.style.width = "300px";
        box.style.border = DATATREE.POPUP_BORDER;
        box.style.overflow = "auto";
        box.style.borderRadius = "20px";
        box.style.padding = "15px";
        box.style.background = "#f5f2eb";// "white url('" + DATATREE.POPUP_BACKGROUND + "') repeat scroll left top";
        box.style.maxWidth = "200px";
        box.innerHTML = "<div onclick='return DatatreeClosePopupBox();' id='datatree_closebutton' style='position:relative;color:red;font-size:1em;top:0px;right:0px;float:right;margin:3px;border:1px dotted red;padding:3px;'>X</div><p id='datatree_popup_message'></p>";
        document.body.appendChild(box);
        //document.getElementById(datatree.ELEMENT_OUTER_WRAPPER).appendChild(box);
        if (box) {
            message_text = document.getElementById("datatree_popup_message");
            if (message_text) {
                var txts = popup_text.split("\n");
                message_text.innerHTML = "";
                for (txt in txts) {
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
            window.clearTimeout(DATATREE.TIMER);
            DATATREE.TIMER = setTimeout(DATATREE.ClosePopupBox, timing);
        }
    }
  } catch (exc) {  }
}

function DatatreeClosePopupBox() {
    if (document.getElementById) {
        box = document.getElementById("datatree_popupbox");
        if (box) {
            box.style.display = "none";
            if (DATATREE.TIMER) {
                window.clearTimeout(DATATREE.TIMER);
            }
        }
    }
}
function DatatreeGetView(click){
    if (this.ROOT_NODE != null && this.ROOT_NODE != "undefined" && this.ROOT_NODE != ""){
       if (DatatreeGetView.arguments.length == 0 || click == true){
try{
           this.CloseTree();
           this.ROOT_NODE.Click();
} catch (exc) {  }//7.8.7
       }
       var ul = "<ul onmouseover='return DatatreeSetTreeFromName(\"" + this.NAME + "\");' oncontextmenu='return DatatreeRightClick();' id='" + this.ELEMENT_INNER_WRAPPER + "' style='" + this.ELEMENT_INNER_WRAPPER_STYLE + this.GetLettering() + "height:" + this.ELEMENT_INNER_WRAPPER_HEIGHT + "'>";
       var _ul = "</ul>";
       return this.TOOLBAR + ul + this.ROOT_NODE.Iterate(false) + _ul;
    } else {
        return "";
    }
}
function DatatreeGetList(){
    return this.ViewGetList();
    //var result = this.SyncFromDataTree(this.GetCode(), true);
    //return result;
}
function DatatreeGetCode(click){
    this.UpdateContent();
    if (this.ROOT_NODE != null && this.ROOT_NODE != "undefined" && this.ROOT_NODE != ""){
       if (DatatreeGetCode.arguments.length == 0 || click == true){
           this.SELECTED_SPAN = null;//7.8.6
           this.CloseTree();
           this.ROOT_NODE.Click();
       }
       var ul = "<ul onmouseover='return DatatreeSetTreeFromName(\"" + this.NAME + "\");' oncontextmenu='return DatatreeRightClick();' id='" + this.ELEMENT_INNER_WRAPPER + "' style='" + this.ELEMENT_INNER_WRAPPER_STYLE + this.GetLettering() + "height:" + this.ELEMENT_INNER_WRAPPER_HEIGHT + "'>";
       var _ul = "</ul>";
       return ul + this.ROOT_NODE.Iterate(false) + _ul;
    } else {
        return "";
    }
}
function DatatreeClear(node, what){
    if (DatatreeClear.arguments.length <= 0){
        node = this.ROOT_NODE;
        what = "search_results";
    } else if (DatatreeClear.arguments.length <= 1){
        what = "search_results";
    } else if (what == "*" || what == "all" || what == "numbers" || what == "linenumbers" || what == "line_numbers" || what == "highlights" || what == "search_results"){
        what = what;
    } else if (what == "title"){
        this.Query('CREATE FROM HTML ' + this.PrintHtml(true));
        return;
    } else if (what == "replace_results"){
    } else {
        if (DATATREE.REPRESS_ALERTS == false) {  }
        return;
    }
    if (what == "replace_results" || what == "all" || what == "*"){
       node.TEXT = node.TEXT.split(DATATREE.SKIP_MESSAGE).join(this.REPLACE);
    }
    var temp_div = document.createElement("div");
    temp_div.innerHTML = node.TEXT;
    var spans = temp_div.getElementsByTagName("span");
    for (var count = 0; count < spans.length; ++count){
        var span = spans[count];
        if (span.className){
            if (span.className == "search_result" && (what == "*" || what == "all" || what == "search_results" || what == "highlights")){
               var inner = span.innerHTML;
               temp_div.removeChild(span);
               count -= 1;
               temp_div.innerHTML = inner;
               node.TEXT = temp_div.innerHTML;
            } else if (span.className == "linenumber" && (what == "*" || what == "all" || what == "linenumbers" || what == "numbers" || what == "line_numbers")){
               var outer = span.parentNode;
               outer.removeChild(span);
               node.TEXT = temp_div.innerHTML;
            } else if (span.className == "replace_result"){
               var txt = span.innerHTML;
               var div = document.createElement('div');
               div.appendChild(span);
               var replace_result = div.innerHTML.toString();
               node.TEXT = node.TEXT.replace(replace_result, txt);
            }
        }
    }
    var amount_of_children = node.GetChildCount();
    if (amount_of_children > 0){
        for (var count = 0; count < amount_of_children; ++count){
            this.Clear(node.CHILDREN[count], what);
        }
    }
}
function DatatreeCloseTree(){
       this.ROOT_NODE.Click();
       this.ROOT_NODE.Close();
       this.SELECTED_SPAN = null;
       var ul = "<ul onmouseover='return DatatreeSetTreeFromName(\"" + this.NAME + "\");' oncontextmenu='return DatatreeRightClick();' id='" + this.ELEMENT_INNER_WRAPPER + "' style='" + this.ELEMENT_INNER_WRAPPER_STYLE + this.GetLettering() + "height:" + this.ELEMENT_INNER_WRAPPER_HEIGHT + "'>";
       var _ul = "</ul>";
       return this.TOOLBAR + ul + this.ROOT_NODE.Iterate(false) + _ul;
}

function DatatreeHtmlBody(html){
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
function DatatreeGetBrowser(){
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
function DatatreeWait(){
   var tree = DATATREE.TREE;
   var name = DATATREE.TREE.NAME;
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
   var browser = DATATREE.GetBrowser();   
   if (browser == "Firefox"){
	   DATATREE.WAIT_IS_OPEN = true;
	   DATATREE.ShowPopupBox("PLEASE WAIT...", 100000, x, y);
       return "popup";
   /**
   } else if (browser == "IE"){
	   DATATREE.WAIT_IS_OPEN = true;
      var left = x;
      var top = y;
      var wait = window.open("", '_blank', 'width=100,height=100,left=' + left + ',top=' + top);
      if (wait == null || typeof(wait) == 'undefined'){
         return null;
      } else {
         wait.document.write("<p align='center'>PLEASE WAIT...</p><p>queries and button presses for this tree might have waits of approximately the length of this wait</p>");
         return wait;
      }
   **/
   } else if (browser == "Chrome"){
	  DATATREE.WAIT_IS_OPEN = true;
	  DATATREE.ShowPopupBox("PLEASE WAIT...", 100000, x, y);
      return "popup";
   } else if (browser == "Safari"){
	  DATATREE.WAIT_IS_OPEN = true;
	  DATATREE.ShowPopupBox("PLEASE WAIT...", 100000, x, y);
      return "popup";
   } else if (browser == "Edge" || browser == "IE"){
      DATATREE.WAIT_IS_OPEN = true;
      DATATREE.ShowPopupBox("PLEASE WAIT...", 100000, x, y);
      return "popup";
   }
}
function DatatreeCloseWaitBox(wait){
    DATATREE.WAIT_IS_OPEN = false;
	if (wait != null) {
	   if (wait == "popup"){
	      DATATREE.ClosePopupBox();
	   } else {
		   wait.close();
	   }
	}
}
function DatatreeResetReplace(){
    this.REPLACE_RESULTS.length = 0;
    this.CURRENT_REPLACE_INDEX = -1;
    this.REPLACE = "";
    this.REPLACE_WITH = "";
    DATATREE.SKIP_MESSAGE = DATATREE.DEFAULT_SKIP_MESSAGE;
}
function DatatreeQuery(query_string){
    DATATREE.TREE = this;
    DATATREE.SetInitiator(this);//7.9.8
    var RESULT = '';
    if (DATATREE.INSERT == true && DATATREE.StringTrim(query_string.toUpperCase()) != "UNINSERT"){
       this.SubmitEdit(query_string,"sibling",this.SELECTED_SPAN);
       var spanindex = 0;
       var spans = this.ViewRoot().getElementsByClassName('datatree_content');
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
        if (DATATREE.StringTrim(strings[count]) == ""){
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
      first = DATATREE.StringTrim(strings[0]);
    }
    if (strings.length > 1){
      second = DATATREE.StringTrim(strings[1]);
    }
    if (strings.length > 2){
      third = DATATREE.StringTrim(strings[2]);
    }
    if (strings.length > 3){
      fourth = DATATREE.StringTrim(strings[3]);
    }
    if (strings.length > 4){
      fifth = DATATREE.StringTrim(strings[4]);
    }
    if (strings.length > 5){
      sixth = DATATREE.StringTrim(strings[5]);
    }
    switch(first.toUpperCase()){
          case "INSERT":
             DATATREE.INSERT = true;
             break;
          case "UNINSERT":
             DATATREE.INSERT = false;
             break;
          case "SELECT":
             try{//do not erase...checks parseInt
             var what = DATATREE.StringTrim(query_string.substring("SELECT".length)).toLowerCase();
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
             var spans = this.ViewRoot().getElementsByClassName('datatree_content');
             if (second != "" && third != "" && DATATREE.StringTrim(second.toUpperCase()) == "LINE"){
                var index = parseInt(DATATREE.StringTrim(third));// - 1;
                if (index > 0 && index < spans.length){
                   if (this.SELECTED_SPAN){
                      DatatreeUnhighlightSpan(this.SELECTED_SPAN);
                   }
                   if (this.MOUSE_DRAG_SPANS){
                      for (var count = 0; count < this.MOUSE_DRAG_SPANS.length; ++count){
                         DatatreeUnhighlightSpan(this.MOUSE_DRAG_SPANS[count]);
                      }
                   }
                   var span = spans[index];
                   this.ViewOpenToSpan(span);
                   this.ScrollToSpan(span);
                   this.HighlightSpan(span);
                   this.SELECTED_SPAN = span;
                }
             } else if (second != "" && third != "" && DATATREE.StringTrim(second.toUpperCase()) == "LINES" && (third.indexOf("-") >= 0 || (fourth != "" && fifth != "" && fourth.toUpperCase() == "TO"))){
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
             }catch(exc){if(DATATREE.REPRESS_ALERTS==false){alert(exc);}}
             break;
          case "OVERWRITE":
             var what = DATATREE.StringTrim(query_string.substring("OVERWRITE".length));
             if (what == ""){
                DATATREE.ToolbarSelect("overwrite");
             } else if (this.SELECTED_SPAN){
                this.SubmitEdit(what,"overwrite",this.SELECTED_SPAN);
             }
             break;
          case "CHI":
          case "CHILD":
             if (first.toUpperCase() == "CHI"){
                query_string = query_string.replace("CHI","CHILD");
             }
             var what = DATATREE.StringTrim(query_string.substring("CHILD".length));
             document.getElementById(this.TOOLBAR_QUERYWINDOW_NAME).value = '';
             if (what == ""){
                DATATREE.ToolbarSelect("child");
             } else if (this.SELECTED_SPAN){
                this.SubmitEdit(what,"child",this.SELECTED_SPAN);
             }
             break;
          case "SIB":
          case "SIBLING":
             if (first.toUpperCase() == "SIB"){
                query_string = query_string.replace("SIB","SIBLING");
             }
             var what = DATATREE.StringTrim(query_string.substring("SIBLING".length));
             document.getElementById(this.TOOLBAR_QUERYWINDOW_NAME).value = '';
             if (what == ""){
                DATATREE.ToolbarSelect("sibling");
             } else if (this.SELECTED_SPAN){
                this.SubmitEdit(what,"sibling",this.SELECTED_SPAN);
             }
             break;
          case "MOVE":
             var what = DATATREE.StringTrim(query_string.substring("RIGHT".length)).toLowerCase();
             what = what.toLowerCase();
             if (what == "selection right"){
                DATATREE.ToolbarSelect("selection right");
             } else if (what == "right" || what == "section right"){
                DATATREE.ToolbarSelect("section right");
             } else if (what == "left" || what == "section left" || what == "selection left"){
                DATATREE.ToolbarSelect("left");
             } else if (what == "up" || what == "section up" || what == "selection up"){
                DATATREE.ToolbarSelect("up");
             } else if (what == "down" || what == "section down" || what == "selection down"){
                DATATREE.ToolbarSelect("down");
             }
             break;
          case "SELECTION":
             var what = DATATREE.StringTrim(query_string.substring("RIGHT".length)).toLowerCase();
             what = what.toLowerCase();
             if (what == "right"){
                DATATREE.ToolbarSelect("selection right");
             } else if (what == "left"){
                DATATREE.ToolbarSelect("left");
             } else if (what == "up"){
                DATATREE.ToolbarSelect("up");
             } else if (what == "down"){
                DATATREE.ToolbarSelect("down");
             }
             break;
          case "SECTION":
             var what = DATATREE.StringTrim(query_string.substring("RIGHT".length)).toLowerCase();
             what = what.toLowerCase();
             if (what == "right"){
                DATATREE.ToolbarSelect("section right");
             } else if (what == "left"){
                DATATREE.ToolbarSelect("left");
             } else if (what == "up"){
                DATATREE.ToolbarSelect("up");
             } else if (what == "down"){
                DATATREE.ToolbarSelect("down");
             }
             break;
          case "RIGHT":
             var what = DATATREE.StringTrim(query_string.substring("RIGHT".length)).toLowerCase();
             what = what.toLowerCase();
             if (what == "selection" || what == "selected" || what == "line" || what == "lines" || what == "outer" || what == "shallow"){
                DATATREE.ToolbarSelect("selection right");
             } else if (what == "" || what == "section" || what == "with children" || what == "w/children" || what == "w/chldrn" || what == "all" || what == "inner" || what == "deep"){
                DATATREE.ToolbarSelect("section right");
             }
             break;
          case "LEFT":
             DATATREE.ToolbarSelect("left");
             break;
          case "UP":
             DATATREE.ToolbarSelect("up");
             break;
          case "DOWN":
             DATATREE.ToolbarSelect("down");
             break;
          case "CUT":
             DATATREE.ToolbarSelect("cut");
             break;
          case "COPY":
             var what = DATATREE.StringTrim(query_string.substring("COPY".length)).toLowerCase();
             what = what.toLowerCase();
             if (what == "" || what == "selection" || what == "selected" || what == "line" || what == "lines" || what == "outer" || what == "shallow"){
                DATATREE.ToolbarSelect("copy selected");
             } else if (what == "section" || what == "with children" || what == "w/children" || what == "w/chldrn" || what == "all" || what == "inner" || what == "deep"){
                DATATREE.ToolbarSelect("copy w/children");
             }
             break;
          case "PASTE":
             DATATREE.ToolbarSelect("paste");
             break;
          case "DELETE":
          case "REMOVE":
             DATATREE.ToolbarSelect("remove");
             break;
          case "UNDO":
             DATATREE.ToolbarSelect("undo");
             break;
          case "REDO":
             DATATREE.ToolbarSelect("redo");
             break;
          case "COUNT":
             var what = DATATREE.StringTrim(query_string.substring("COUNT".length)).toLowerCase();
             var root = DatatreeViewRoot();
             var lines = root.getElementsByClassName('datatree_content');
             if (what == "lines"){
                   var result = lines.length-1;
                   if (DATATREE.REPRESS_ALERTS == false){
                      alert("lines: " + result);
                   }
                   RESULT = result;
             } else if (what == "words"){
                   var result = 0;
                   for (var count = 1; count < lines.length; ++count){
                      var line = lines[count];
                      var text = DATATREE.StripTags(line.innerHTML);
                      result += text.split(" ").length;
                   }
                   if (DATATREE.REPRESS_ALERTS == false){
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
                var type = DATATREE.StringTrim(query.substring("CHANGE TYPE".length)).toLowerCase();
                if (type == "text" || type == "html"){
                   this.SetType(type);
                   if (DATATREE.REPRESS_ALERTS == false){
                      alert("TYPE has been set to " + type);
                   }
                }
             }
             break;
		case "TOOLBAR":
		    var tools = DATATREE.StringTrim(query_string.substring("TOOLBAR".length));
                    if (tools != ""){
				tools = tools.toLowerCase();
				DATATREE.TREE.TOOLBAR_TOOLS = tools;
                      this.SetToolbar(tools);
				//this.Refresh();
                    }
		    break;
          case "HEAD":
                    var head = DATATREE.StringTrim(query_string.substring("HEAD".length));
                    if (head != ""){
                       if (window.confirm("Set head to " + head + "?")){
                          document.head.innerHTML = head;
                       }
                    }
		    break;
		case "SET":
		    if (strings.length >= 2){ // allows setting to nothing
			    var key = second;
			    var value = DATATREE.StringTrim(query_string.substring(query_string.indexOf(second) + second.length));
				if (third == "EQUAL" || third == "EQUALS" || third == "=" || third == "equals" || third == "Equals" || third == "equal" || third == "Equal"){
				    var equals = DATATREE.StringTrim(third);
				    value = DATATREE.StringTrim(query_string.substring(query_string.indexOf(equals) + equals.length));
				} else if (third == "VAR" || third == "VARIABLE" || third == "VAL" || third == "VALUE" || third == "VALUEOF" || third == "VALUE_OF"){
                           var val = DATATREE.StringTrim(third);
                           value = DATATREE.StringTrim(query_string.substring(query_string.indexOf(val) + val.length));
                           value = "" + eval(value) + "";
                     }
				var found = false;
				var error = false;
				var error_message = "";
				for (k in DATATREE){
					if (key == k.toString()){
						if (DATATREE.SETTABLE_PROPERTIES.indexOf(k.toString()) >= 0){} else {
							error = true;
							error_message = "not allowed to set that property";
							break;
						}
						switch(typeof(DATATREE[k])){
							case "string":
                                         if (value == 'default' || value == 'DEFAULT'){
                                            var def = 'DEFAULT_' + key;
                                            for (j in DATATREE){
                                               if (def == j.toString()){
                                                  DATATREE[k] = DATATREE[j];
                                                  found = true;
                                               }
                                            }
                                        } else {
   							      DATATREE[k] = value;
						           found = true;
                                        }
							   break;
							case "number":
							   if (parseInt(DATATREE[k]) === DATATREE[k]){
  							       DATATREE[k] = parseInt(value);
						       } else {
								   DATATREE[k] = parseFloat(value);
							   }
						       found = true;
							   break;
							case "boolean":
							   if (value == 'true'){
 							       DATATREE[k] = true;
							   } else if (value == 'false'){
								   DATATREE[k] = false;
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
				   for (k in this){
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
                                            for (j in DATATREE){
                                               if (def == j.toString()){
                                                  this[k] = DATATREE[j];
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
			if (DATATREE.REPRESS_ALERTS == false){
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
				var key = DATATREE.StringTrim(second.toUpperCase());
				var value = "?";
				var found = false;
				var type = "?";
				var index = 0;
				var index2 = 0;
				for (k in DATATREE){
					if (key == k.toString()){
						value = DATATREE[k];
						type = typeof(DATATREE[k]);
						found = true;
						index = DATATREE.SETTABLE_PROPERTIES.indexOf(k);
						index2 = DATATREE.SETTABLE_PROPERTIES.indexOf(DATATREE[k]);
						break;
					}
				}
				if (found == false){
				   for (k in this){
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
				if (DATATREE.REPRESS_ALERTS == false){
					if (found){
						alert(key + " = " + value + " and has type " + type);
  				    } else {
					    alert("could not find that variable");
					}
				}
			}
		    break;
		case "SITEMAP":
                    var links = new Array();
                    var files;
		    if (DATATREE.SITEMAP != null && DATATREE.SITEMAP != "undefined" && DATATREE.SITEMAP != ""){
				files = DATATREE.SITEMAP.split(",");
				for (var count = 0; count < files.length; ++count){
					var file = files[count];
                                        var name = DATATREE.GetFileNameFromPath(file);
                                        if (DATATREE.StringTrim(name) == ""){
                                           name = file;
                                        }
                                        file = escape(file);
					if (file != ""){
						var a = "<a href ='" + file + "' target='_blank'>" + name + "</a>";
                                                links.push(a);
					}
				}
		    } else {
			    alert("Error - could not load sitemap.");
		    }
		    if (DATATREE.SITEMAP_FILE != null && DATATREE.SITEMAP_FILE != "undefined" && DATATREE.SITEMAP_FILE != ""){
                                var temp = DATATREE.REPRESS_ALERTS;
                                DATATREE.REPRESS_ALERTS = true;
                                DATATREE.PLEASE_WAIT = false;
                                DATATREE.Load(DATATREE.SITEMAP_FILE);
                                var sitemap = DATATREE.TEMP;
                                var linkcount = 0;
                                for (var count = 0; count < files.length; ++count){
                                   var file = files[count];
                                   if (file == ""){
                                      continue;
                                   }
                                   var name = DATATREE.GetFileNameFromPath(file);
                                   if (DATATREE.StringTrim(name) == ""){
                                      name = file;
                                   }
                                   var link = links[count];
                                   if (sitemap.indexOf(" " + name) >= 0){
                                         sitemap = sitemap.replace(" " + name, " " + link);
                                   } else if (sitemap.indexOf(name) == 0){
                                         sitemap = sitemap.replace(name, link);
                                   } else if (sitemap.indexOf("\n" + name) >= 0){
                                         sitemap = sitemap.replace("\n" + name, "\n" + link);
                                   } else if (sitemap.indexOf(file)){
                                         sitemap = sitemap.replace(file,link);
                                   }
                                }
                                sitemap = sitemap.split("\n").join("<br/>");
                                var merges = sitemap.split("<br/>");
                                var merge = true;
                                var mergecount = 0;
                                var newmap = "";
                                for (var count = 0; count < merges.length; ++count){
                                    var line = merges[count];
                                    if (count > 0){
                                          newmap += line + "<br/>";
                                    }
                                    if (line[0] != " "){
                                       ++mergecount;
                                    }
                                    if (mergecount > 1){
                                       merge = false;
                                       break;
                                    }
                                }
                                var title = "";
                                if (merge == true){
                                   title = merges[0];
                                   sitemap = newmap;
                                   var newmaps = newmap.split("<br/>");
                                   var firstline = newmaps[0];
                                   var firstletter = DATATREE.StringTrim(firstline)[0];
                                   var spaces = firstline.indexOf(firstletter);
                                   for (var count = 0; count < newmaps.length; ++count){
                                      var line = newmaps[count];
                                      var letter = DATATREE.StringTrim(line)[0];
                                      var spaces2 = line.indexOf(letter);
                                      if (spaces2 == spaces){
                                         newmaps[count] = DATATREE.StringTrim(newmaps[count]);
                                      }
                                   }
                                   sitemap = newmaps.join("<br/>");
                                   this.Query("SET TITLE " + title);
                                } else {
                                   this.Query("SET TITLE " + "FILE VIEW");
                                }
                                this.Query("CREATE FROM HTML " + sitemap);
                                DATATREE.REPRESS_ALERTS = temp;
			}
			break;
        case "EDIT":
                    var extra = DATATREE.StringTrim(query_string.substring("EDIT".length));
                    if (this.TYPE == null || this.TYPE == "undefined" || this.TYPE.toLowerCase() == "text"){
                       this.Edit("html", this.ViewGetList());
                    } else if (this.TYPE != null && this.TYPE != "undefined" && (this.TYPE.toLowerCase() == "html" || this.TYPE.toLowerCase() == "tree")){
                       if (extra != null && extra != "undefined" && extra.toUpperCase() == "LIST"){//7.9.8
                          this.Edit("html", this.ViewGetList());
                       } else {
                          this.Edit("html", this.ViewGetList());
                       }
                    } else {
                       if (DATATREE.REPRESS_ALERTS == false){
                          alert("problem determining text or html type");
                       }
                    }
            break;
        case "LOAD":
            try{
            var filename = DATATREE.StringTrim(query_string.substring("LOAD".length));
            if (DATATREE.StringTrim(filename) == ""){
               this.LoadFromToolbar();
            } else if (DATATREE.StringTrim(filename).toUpperCase() == "TEXT"){
               this.LoadFromTextarea('text');
            } else if (DATATREE.StringTrim(filename).toUpperCase() == "HTML" || DATATREE.StringTrim(filename).toUpperCase() == "LIST"){
               this.LoadFromTextarea('html');
            } else if (DATATREE.StringTrim(filename).toUpperCase() == "TREE" || DATATREE.StringTrim(filename).toUpperCase() == "FILE") {
               this.LoadFromTextarea('tree');
            } else if (filename.substring(filename.length - ".html".length) == ".html" || filename.substring(filename.length - ".txt".length) == ".txt" || filename.substring(filename.length - ".htm".length) == ".htm"){
               DATATREE.TEMP = "";
               DATATREE.Load(filename);
               var tree = DATATREE.TEMP;
               if (DATATREE.TEMP == "" || DATATREE.TEMP == null || DATATREE.TEMP == "undefined"){
			  if (DATATREE.REPRESS_ALERTS == false){
				 alert("could not find the file: " + filename);
			  } else {
                      this.ALERTS.push("could not find the file: " + filename);
      			this.HAS_ERRORS = true;
			  }
                  return;
               }
               DATATREE.PLEASE_WAIT = true;
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
            DatatreeViewReset();
            var newTree = null;
            if (query_string.indexOf("LINE") >= 0 || query_string.indexOf("line") >= 0){
               if (strings.length >= 5 && DATATREE.StringTrim(second.toUpperCase()) == "FROM" && DATATREE.StringTrim(third.toUpperCase()) == "LINE" && DATATREE.StringTrim(fifth.toUpperCase()) == "TO" && DATATREE.StringTrim(sixth.toUpperCase()) == "LINE"){
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
                     if (DATATREE.REPRESS_ALERTS == false) { alert(exc); }
                     return;
                  }
                  DatatreeViewAlphabetize("numbers",start,finish);
               } else {
                  if (DATATREE.REPRESS_ALERTS == false) { alert("syntax error"); }
               }
            } else if (strings.length >= 4 && strings[1].toUpperCase() == "FROM" && query_string.indexOf("TO")){
               strings[1] = "FROM";
               query_string = strings.join(" ");
               query_string = query_string.split(" to ").join(" TO ").split(" To ").join(" TO ");
               var startstring = "";
               var finishstring = "";
               startstring = DATATREE.StringTrim(query_string.split(" FROM ")[1].split(" TO ")[0]);
               finishstring = DATATREE.StringTrim(query_string.split(" TO ")[1]);
               if (startstring == "" || finishstring == ""){
                   if (POSTERTRO.REPRESS_ALERTS == false) { alert("error in alphabetize"); }
               } else {
                   DatatreeViewAlphabetize("strings",startstring,finishstring);
               }
            }
            break;
        case "CLEAR":
        case "RESET":
            var what = "";
            if (strings.length > 1){
                switch(DATATREE.StringTrim(strings[1].toUpperCase())){
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
                DatatreeViewReset(what);
            } else {
                DatatreeViewReset();
            }
            this.SELECTED_SPAN = null;//7.8.6
            break;
        case "CLOSE":
        case "COLLAPSE":
            this.ViewCollapse(this.SELECTED_SPAN);
            break;
        case "CREATE": 
 		 this.HAS_ERRORS = false;
		 this.ALERTS.length = 0;
            this.SELECTED_SPAN = null;//7.8.7
            if (strings.length >= 2 && (DATATREE.StringTrim(second.toUpperCase()) == "TREE" || DATATREE.StringTrim(second.toUpperCase()) == "DATATREE" || DATATREE.StringTrim(second.toUpperCase()) == "DATA_TREE")){
                strings = strings.splice(1);
            }
            if (strings.length < 3 || DATATREE.StringTrim(strings[1].toUpperCase()) != "FROM" || (DATATREE.StringTrim(strings[2].toUpperCase()) != "HTML" && DATATREE.StringTrim(strings[2].toUpperCase()) != "TEXT" && DATATREE.StringTrim(strings[2].toUpperCase()) != "TREE")){
                if (DATATREE.REPRESS_ALERTS == false) { alert("syntax error"); }
            } else {
                this.AUTO_ADJUST = true;
                this.AUTO_TRIM = true;
                if (DATATREE.TREE == "undefined" || DATATREE.TREE == null){
                    DATATREE.TREE = this;
                }
                var type = DATATREE.StringTrim(strings[2].toUpperCase());
                switch(type){
                    case "TREE":
					    if (DATATREE.PLEASE_WAIT == true && DATATREE.WAIT_IS_OPEN != true){
							var wait = DATATREE.Wait();
							var that = this;
							setTimeout(function(){
								//that.PLAIN_TEXT = false;//7.9.7
                                           //that.SetTypeConditionally(type); // 7.9.4
								var tree = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("CREATE FROM TREE") + "CREATE FROM TREE".length));
								if (tree == ''){
								   return;
								}
								that.SyncFromDataTree(tree);
                                           //that.EvenSpacing();
								RESULT = that;
								DATATREE.CloseWaitBox(wait);
                     if (that.HAS_ERRORS == true && document.getElementById(that.TOOLBAR_STATUS_NAME) != null && document.getElementById(that.TOOLBAR_STATUS_NAME) != 'undefined'){ document.getElementById(that.TOOLBAR_STATUS_NAME).style.display='inline';document.getElementById(that.TOOLBAR_STATUS_NAME).title=that.Replay(true); }
				if (that.HAS_ERRORS == true && DATATREE.REPRESS_ALERTS == false){ that.Query("REPLAY"); }
							}, 1);
						} else {
							//this.PLAIN_TEXT = false;//7.9.7
                                     //this.SetTypeConditionally(type); // 7.9.4
							var tree = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("CREATE FROM TREE") + "CREATE FROM TREE".length));
							if (tree == ''){
							   return;
							}
							this.SyncFromDataTree(tree);
                                      //this.EvenSpacing();
							RESULT = this;
                     if (this.HAS_ERRORS == true && document.getElementById(this.TOOLBAR_STATUS_NAME) != null && document.getElementById(this.TOOLBAR_STATUS_NAME) != 'undefined'){ document.getElementById(this.TOOLBAR_STATUS_NAME).style.display='inline';document.getElementById(this.TOOLBAR_STATUS_NAME).title=this.Replay(true); }
				if (this.HAS_ERRORS == true && DATATREE.REPRESS_ALERTS == false){ this.Query("REPLAY"); }
						}
                        break;
                    case "HTML":
					    if (DATATREE.PLEASE_WAIT == true && DATATREE.WAIT_IS_OPEN != true){
							var wait = DATATREE.Wait();
							var that = this;
							setTimeout(function(){
								//that.PLAIN_TEXT = false;//7.9.7
                                           //that.SetTypeConditionally(type); // 7.9.4
								var content = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("CREATE FROM HTML") + "CREATE FROM HTML".length));
								if (content == ''){
								   return;
								} else {
								   that.CONTENT = content;
								}
								/** might want to check for data tree file here...if so, switch to syncfromdatatree function **/
								that.ROOT_NODE = that.TreeFromString(that.CONTENT, that.TITLE, "html");
                                                                //that.EvenSpacing();
								//that.UpdateContent();
								that.VIEW = that.GetView();
								if (that.REFRESH_GUI == true){
								   that.RefreshGUI();
								}
								RESULT = that;
								DATATREE.CloseWaitBox(wait);
                     if (that.HAS_ERRORS == true && document.getElementById(that.TOOLBAR_STATUS_NAME) != null && document.getElementById(that.TOOLBAR_STATUS_NAME) != 'undefined'){ document.getElementById(that.TOOLBAR_STATUS_NAME).style.display='inline';document.getElementById(that.TOOLBAR_STATUS_NAME).title=that.Replay(true); }
				if (that.HAS_ERRORS == true && DATATREE.REPRESS_ALERTS == false){ that.Query("REPLAY"); }
							}, 1);
						} else {
							//this.PLAIN_TEXT = false;//7.9.7
                                     //this.SetTypeConditionally(type); // 7.9.4
							var content = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("CREATE FROM HTML") + "CREATE FROM HTML".length));
							if (content == ''){
							   return;
							} else {
							   this.CONTENT = content;
							}
							/** might want to check for data tree file here...if so, switch to syncfromdatatree function **/
							this.ROOT_NODE = this.TreeFromString(this.CONTENT, this.TITLE, "html");
                                                        //this.EvenSpacing();
							//this.UpdateContent();
							this.VIEW = this.GetView();
							if (this.REFRESH_GUI == true){
							   this.RefreshGUI();
							}
							RESULT = this;
                     if (this.HAS_ERRORS == true && document.getElementById(this.TOOLBAR_STATUS_NAME) != null && document.getElementById(this.TOOLBAR_STATUS_NAME) != 'undefined'){ document.getElementById(this.TOOLBAR_STATUS_NAME).style.display='inline';document.getElementById(this.TOOLBAR_STATUS_NAME).title=this.Replay(true); }
				if (this.HAS_ERRORS == true && DATATREE.REPRESS_ALERTS == false){ this.Query("REPLAY"); }
						}
                        break;
                    case "TEXT":
					    if (DATATREE.PLEASE_WAIT == true && DATATREE.WAIT_IS_OPEN != true){
							var wait = DATATREE.Wait();
							var that = this;
							setTimeout(function(){
								//that.PLAIN_TEXT = true;//7.9.7
                                           //that.SetTypeConditionally(type); // 7.9.4
								var content = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("CREATE FROM TEXT") + "CREATE FROM TEXT".length));
								if (content == ''){
								   return;
								} else {
								   that.CONTENT = content;
								}
								that.ROOT_NODE = that.TreeFromString(that.CONTENT, that.TITLE, "text");
                                                                //that.EvenSpacing();
								//that.UpdateContent();
								that.VIEW = that.GetView();
								if (that.REFRESH_GUI == true){
								   that.RefreshGUI();
								}
								RESULT = that;
								DATATREE.CloseWaitBox(wait);
                     if (that.HAS_ERRORS == true && document.getElementById(that.TOOLBAR_STATUS_NAME) != null && document.getElementById(that.TOOLBAR_STATUS_NAME) != 'undefined'){ document.getElementById(that.TOOLBAR_STATUS_NAME).style.display='inline';document.getElementById(that.TOOLBAR_STATUS_NAME).title=that.Replay(true); }
				if (that.HAS_ERRORS == true && DATATREE.REPRESS_ALERTS == false){ that.Query("REPLAY"); }
							}, 1);
						} else {
						     //this.PLAIN_TEXT = true;//7.9.7
                                     //this.SetTypeConditionally(type); // 7.9.4
							var content = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("CREATE FROM TEXT") + "CREATE FROM TEXT".length));
							if (content == ''){
							   return;
							} else {
							   this.CONTENT = content;
							}
							this.ROOT_NODE = this.TreeFromString(this.CONTENT, this.TITLE, "text");
                                                        //this.EvenSpacing();
							//this.UpdateContent();
							this.VIEW = this.GetView();
							if (this.REFRESH_GUI == true){
							   this.RefreshGUI();
							}
							RESULT = this;
                     if (this.HAS_ERRORS == true && document.getElementById(this.TOOLBAR_STATUS_NAME) != null && document.getElementById(this.TOOLBAR_STATUS_NAME) != 'undefined'){ document.getElementById(this.TOOLBAR_STATUS_NAME).style.display='inline';document.getElementById(this.TOOLBAR_STATUS_NAME).title=this.Replay(true); }
				if (this.HAS_ERRORS == true && DATATREE.REPRESS_ALERTS == false){ this.Query("REPLAY"); }
						}
                        break;
                    default:
                        if (DATATREE.REPRESS_ALERTS == false) { alert("syntax error"); }
                        break;
                }
            }
            break;
        case "OPEN":
        case "EXPAND":
            this.ViewExpand(this.SELECTED_SPAN);
            break;
        case "NEW":
            if (window.confirm("Erase current document and start over?")){
               if (this.TYPE == null || this.TYPE == "undefined" || this.TYPE.toLowerCase() == "text"){
                  this.Query("CREATE FROM TEXT click here to start");
               } else if (this.TYPE != null && this.TYPE != "undefined" && (this.TYPE.toLowerCase() == "html" || this.TYPE.toLowerCase() == "tree")){
                  this.Query("CREATE FROM HTML <p>click here to start</p>");
               } else {
                  if (DATATREE.REPRESS_ALERTS == false){
                     alert("problem determining text or html type");
                  }
               }
            }
            break;
        case "NUMBER":
            if (strings.length >= 6 && strings[1].toUpperCase() == "NESTED" && strings[2].toUpperCase() == "FROM" && strings[4].toUpperCase() == "TO"){
               DatatreeViewIndex(strings[3],strings[5]);
            } else {
               DatatreeViewNumber(this);
            }
            break;
        case "INDEX":
            if (strings.length >= 5 && strings[1].toUpperCase() == "FROM" && strings[3].toUpperCase() == "TO"){
               DatatreeViewIndex(strings[2],strings[4]);
            }
            break;
        case "SAVE":
        case "PRINT":
            var what = "";
            if (strings.length > 1){
                switch(DATATREE.StringTrim(strings[1].toUpperCase())){
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
                    case "CODE":
                        what = "code";
                        break;
                    case "FILE":
                        what = "file";
                        break;
                    case "FILEMAX":
                        what = "filemax";
                        break;
                    case "TEXTTREE":
                        what = "texttree";
                        break;
                    case "HEAD":
                        what = "head";
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
            } else if (what == "code"){
                this.PrintCode();
            } else if (what == "file"){
                this.PrintFile();
            } else if (what == "filemax"){
                this.PrintFileMax();
            } else if (what == "texttree"){
                this.PrintTextTree();
            } else if (what == "head"){
                this.PrintHead();
            } else {
                this.PrintList();
            }
            break;
        case "REPLAY":
            this.Replay();
            break;
        case "SKIP":
            DATATREE.SKIPPED = true;
            if (this.REPLACE_RESULTS.length > 0 && this.CURRENT_REPLACE_INDEX >= 0 && this.REPLACE != "" && this.REPLACE_WITH != ""){
                var msg = this.GetSkipMessage();
                if (msg == ""){
                   return;
                }
                var search_result = this.REPLACE_RESULTS[this.CURRENT_REPLACE_INDEX];
                var outerspan = search_result;//7.9.8
                while (outerspan.className != "datatree_content"){
                   outerspan = outerspan.parentNode;
                }
                var txt = search_result.innerHTML;
                if (txt.indexOf(this.REPLACE) >= 0){
                    var txtnode = document.createTextNode(DATATREE.SKIP_MESSAGE);//7.9.8
                    var pN = search_result.parentNode;
                    pN.replaceChild(txtnode,search_result);
                    //var line = outerspan.innerHTML;
                    //DATATREE.PLEASE_WAIT = false;
                    //DATATREE.TREE.SubmitEdit(line, "overwrite", pN);//search_result.parentNode);//7.9.8
                    if (DATATREE.TREE.CURRENT_REPLACE_INDEX + 1 < DATATREE.TREE.REPLACE_RESULTS.length){
                        DATATREE.TREE.Query('WITH ' + DATATREE.TREE.REPLACE_WITH);
                        DATATREE.TREE.Query('REPLACE ' + DATATREE.TREE.REPLACE);
                        if (DATATREE.GetBrowser() == "IE" && DATATREE.TREE.CURRENT_REPLACE_INDEX + 1 == DATATREE.TREE.REPLACE_RESULTS.length){
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
            var replace_with = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf('WITH') + 'WITH'.length));
            this.REPLACE_WITH = replace_with;
            this.WITH = true;
            break;
        case "REPLACE":
            if (DATATREE.SKIPPED == false){
                //this.Clear();
            }
            DATATREE.SKIPPED = false;
            if (strings.length > 1 && this.WITH == true){
                this.WITH = false;
                var searchterm = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("REPLACE") + "REPLACE".length));
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
                DatatreeViewReplace(searchterm,this.REPLACE_WITH,true,true);
                DatatreeViewInitReplaceResults();
            } else if (strings.length >= 4 && query_string.toUpperCase().indexOf("WITH") >= 0){
                var searchterm = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("REPLACE") + "REPLACE".length));
                var replace_with = DATATREE.StringTrim(searchterm.substring(searchterm.toUpperCase().indexOf("WITH") + "WITH".length));
                this.REPLACE_WITH = replace_with;
                searchterm = DATATREE.StringTrim(searchterm.substring(0, searchterm.toUpperCase().indexOf("WITH")));
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
                DatatreeViewReplace(searchterm,replace_with,true,true);
                this.ViewInitReplaceResults();
            } else if (strings.length >= 2){
                //
            } else if (strings.length == 1){
                if (this.REPLACE_RESULTS.length > 0 && this.CURRENT_REPLACE_INDEX >= 0 && this.REPLACE != "" && this.REPLACE_WITH != ""){
                    var search_result = this.REPLACE_RESULTS[this.CURRENT_REPLACE_INDEX];//span containing search term
                    var outerspan = search_result;//7.9.8
                    while (outerspan.className != "datatree_content"){
                       outerspan = outerspan.parentNode;
                    }
                    var txt = search_result.innerHTML;
                    if (txt.indexOf(this.REPLACE) >= 0){
                        var txtnode = document.createTextNode(this.REPLACE_WITH);//7.9.8
                        var pN = search_result.parentNode;
                        pN.replaceChild(txtnode,search_result);
						
                        //var line = outerspan.innerHTML;
                        //DATATREE.PLEASE_WAIT = false;
                        //DATATREE.TREE.SubmitEdit(line, "overwrite", pN);//search_result.parentNode);//7.9.8
						
                        if (DATATREE.TREE.CURRENT_REPLACE_INDEX + 1 < DATATREE.TREE.REPLACE_RESULTS.length){
                           DATATREE.TREE.Query('WITH ' + DATATREE.TREE.REPLACE_WITH);
                           DATATREE.TREE.Query('REPLACE ' + DATATREE.TREE.REPLACE);
                           if (DATATREE.GetBrowser() == "IE" && DATATREE.TREE.CURRENT_REPLACE_INDEX + 1 == DATATREE.TREE.REPLACE_RESULTS.length){
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
            //this.Clear();
            DatatreeViewReset();
            if (strings.length >= 3 && second.toUpperCase() == "FOR" && third.toUpperCase() == "PATTERN"){
                   var searchterm = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("PATTERN") + "PATTERN".length));
                   if (searchterm == ''){
                      return;
                   }
                   DatatreeViewSearch(searchterm,false,false,true);
                   //this.InitSearchResults();
            } else if (strings.length >= 2 && second.toUpperCase() == "FOR"){
                   var searchterm = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                   if (searchterm == ''){
                      return;
                   }
                   DatatreeViewSearch(searchterm);
                   //this.InitSearchResults();
            } else if (strings.length >= 3 && second.toUpperCase() == "CASE_SENSITIVE" && third.toUpperCase() == "FOR"){
                   var searchterm = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                   if (searchterm == ''){
                      return;
                   }
                   DatatreeViewSearch(searchterm,true);
                   //this.InitSearchResults();
            } else if (strings.length >= 3 && second.toUpperCase() == "EXACT_MATCHES" && third.toUpperCase() == "FOR"){
                   var searchterm = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                   if (searchterm == ''){
                      return;
                   }
                   DatatreeViewSearch(searchterm,false,true);
                   //this.InitSearchResults();
            } else if (strings.length >= 4 && (second.toUpperCase() == "EXACT_MATCHES" || third.toUpperCase() == "EXACT_MATCHES")
                       && (second.toUpperCase() == "CASE_SENSITIVE" || third.toUpperCase() == "CASE_SENSITIVE")
                       && fourth.toUpperCase() == "FOR"){
                   var searchterm = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                   if (searchterm == ''){
                      return;
                   }
                   DatatreeViewSearch(searchterm,true,true);
                   //this.InitSearchResults();
            } else if (strings.length >= 3 && (second.toUpperCase() == "FILES" || second.toUpperCase() == "TREES") && (third.toUpperCase() == "FOR" || third.toUpperCase() == "CASE_SENSITIVE" || third.toUpperCase() == "EXACT_MATCHES") && query_string.toUpperCase().indexOf("FOR") >= 0) {
                if (DATATREE.SITEMAP == "" || DATATREE.SITEMAP == null || DATATREE.SITEMAP == "undefined"){
                   if (DATATREE.REPRESS_ALERTS == false){
                      alert("Error: the sitemap has not been defined.");
                   }
                   return;
                }
                var searchterm = '';
                var regular_expression = false;
                var case_sensitive = false;
                var exact_matches = false;
                if (strings.length >= 4 && fourth.toUpperCase() == "PATTERN"){
                   searchterm = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("PATTERN") + "PATTERN".length));
                   regular_expression = true;
                } else if (strings.length >= 4 && third.toUpperCase() == "CASE_SENSITIVE" && fourth.toUpperCase() == "FOR"){
                   searchterm = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                   case_sensitive = true;
                } else if (strings.length >= 4 && third.toUpperCase() == "EXACT_MATCHES" && fourth.toUpperCase() == "FOR"){
                   searchterm = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                   exact_matches = true;
                } else if (strings.length >= 5 && (third.toUpperCase() == "EXACT_MATCHES" || fourth.toUpperCase() == "EXACT_MATCHES") && (third.toUpperCase() == "CASE_SENSITIVE" || fourth.toUpperCase() == "CASE_SENSITIVE") && fifth.toUpperCase() == "FOR"){
                   searchterm = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                   case_sensitive = true;
                   exact_matches = true;
                } else {
                   searchterm = DATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                }
                if (searchterm == ''){
                   return;
                }
				var wait = DATATREE.Wait();
				var that = this;
				setTimeout(function(){
					var results = DATATREE.SearchMacro(searchterm,regular_expression,case_sensitive,exact_matches);
					var tree = "";
					for (var count = 0; count < DATATREE.MACRO_SEARCH_RESULTS.length; ++count){
						var link = DATATREE.MACRO_SEARCH_RESULTS[count];
                                if (DATATREE.WENT_TO_FILE == false && (DATATREE.GO_TO_FILE == "" || DATATREE.GO_TO_FILE == null || DATATREE.GO_TO_FILE == "undefined")){
						   tree += "<p><a href='" + link + "' target='_blank'>" + link + "</a></p>";
                                } else {
                                   tree += "<p>" + link + "</p>";
                                   if ((DATATREE.GO_TO_FILE == null || DATATREE.GO_TO_FILE == "undefined" || DATATREE.GO_TO_FILE == "") && DATATREE.WENT_TO_FILE == true){
                                      DATATREE.GO_TO_FILE = DATATREE.DEFAULT_GO_TO_FILE;
                                   } else if (DATATREE.GO_TO_FILE == ""){
                                      DATATREE.DEFAULT_GO_TO_FILE = DATATREE.GO_TO_FILE;//save their version
                                   }
                                   DATATREE.WENT_TO_FILE = true;
                                }
					}
                                        DATATREE.PLEASE_WAIT = false;
                                        var if_repress = DATATREE.REPRESS_ALERTS;
                                        var go_to = DATATREE.GO_TO_FILE;
					DATATREE.REPRESS_ALERTS = true;
					if (tree == ""){
						tree = "no results found";
					}
					that.Query("CREATE FROM HTML " + tree);
                                        DATATREE.REPRESS_ALERTS = if_repress;
                                        DATATREE.GO_TO_FILE = go_to;
					DATATREE.CloseWaitBox(wait);
					if (results != null && results != "" && results != 0){
						//alert("found " + results + " trees");
					} else {
						//alert("no results found");
					}
				}, 1);
            } else {
                if (DATATREE.REPRESS_ALERTS == false) {  }
            }            
            break;
        case "NEXT":
            DatatreeViewNext();
            break;
        case "PREVIOUS":
            DatatreeViewPrevious();
            break;
        default:
            if (DATATREE.REPRESS_ALERTS == false) { alert("syntax error"); }
            break;
    }
    return RESULT;
}
function DatatreeGetSkipMessage(){
   var result = DATATREE.SKIP_MESSAGE;
   if (DATATREE.SKIP_MESSAGE.indexOf(this.REPLACE) >= 0){
       DATATREE.SKIP_MESSAGE = DATATREE.ALT_SKIP_MESSAGE;
       result = DATATREE.SKIP_MESSAGE;
   }
   if (DATATREE.SKIP_MESSAGE.indexOf(this.REPLACE) >= 0){
       DATATREE.SKIP_MESSAGE = DATATREE.SKIP_MESSAGE.split(this.REPLACE).join("");
       result = DATATREE.SKIP_MESSAGE;
   }
   if (DATATREE.SKIP_MESSAGE.length < 5){
       if (DATATREE.REPRESS_ALERTS == false){
          //alert("problem with skipping");
       }
       result = "";
   }
   return result;
}
function DatatreeInitReplaceResults(){
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
function DatatreeInitSearchResults(){
    //this.SEARCH_RESULTS.length = 0;
    //this.CURRENT_SEARCH_INDEX = -1;
    /**
    var spans = document.getElementById(this.ELEMENT_OUTER_WRAPPER).getElementsByTagName("span");
    for (var count = 0; count < spans.length; ++count){
         var span = spans[count];
         if (span.className && span.className == "search_result"){
            this.SEARCH_RESULTS.push(span);
         }
    }
    **/
    if (this.SEARCH_RESULTS.length > 0){
       document.getElementById(this.ELEMENT_INNER_WRAPPER).scrollTop = 0;
       this.CURRENT_SEARCH_INDEX = 0;
       var span = this.SEARCH_RESULTS[0];
       var y = this.GetScrollForSearch(span);
       document.getElementById(this.ELEMENT_INNER_WRAPPER).scrollTop = y;
    }
}

function findPos(obj) { var curleft = 0; var curtop = 0; if(obj.offsetLeft) curleft += parseInt(obj.offsetLeft); if(obj.offsetTop) curtop += parseInt(obj.offsetTop); if(obj.scrollTop && obj.scrollTop > 0) curtop -= parseInt(obj.scrollTop); if(obj.offsetParent) { var pos = findPos(obj.offsetParent); curleft += pos[0]; curtop += pos[1]; } else if(obj.ownerDocument) { var thewindow = obj.ownerDocument.defaultView; if(!thewindow && obj.ownerDocument.parentWindow) thewindow = obj.ownerDocument.parentWindow; if(thewindow) { if(thewindow.frameElement) { var pos = findPos(thewindow.frameElement); curleft += pos[0]; curtop += pos[1]; } } } return [curleft,curtop]; }
function findPos2(obj, foundScrollLeft, foundScrollTop) { var curleft = 0; var curtop = 0; if(obj.offsetLeft) curleft += parseInt(obj.offsetLeft); if(obj.offsetTop) curtop += parseInt(obj.offsetTop); if(obj.scrollTop && obj.scrollTop > 0) { curtop -= parseInt(obj.scrollTop); foundScrollTop = true; } if(obj.scrollLeft && obj.scrollLeft > 0) { curleft -= parseInt(obj.scrollLeft); foundScrollLeft = true; } if(obj.offsetParent) { var pos = findPos(obj.offsetParent, foundScrollLeft, foundScrollTop); curleft += pos[0]; curtop += pos[1]; } else if(obj.ownerDocument) { var thewindow = obj.ownerDocument.defaultView; if(!thewindow && obj.ownerDocument.parentWindow) thewindow = obj.ownerDocument.parentWindow; if(thewindow) { if (!foundScrollTop && thewindow.scrollY && thewindow.scrollY > 0) curtop -= parseInt(thewindow.scrollY); if (!foundScrollLeft && thewindow.scrollX && thewindow.scrollX > 0) curleft -= parseInt(thewindow.scrollX); if(thewindow.frameElement) { var pos = findPos(thewindow.frameElement); curleft += pos[0]; curtop += pos[1]; } } } return [curleft,curtop]; }

function DatatreeGetScrollForSearch(span){
   var y = span.offsetTop;
   var x = span.offsetLeft;
   var _parent = span.offsetParent;
   while (_parent != document.body){
      y += _parent.offsetTop;
      x += _parent.offsetLeft;
      _parent = _parent.offsetParent;
   } 
   var y = findPos2(span,x,y)[1];
   var root = document.getElementById(this.ELEMENT_INNER_WRAPPER).getElementsByTagName('span')[0];
   var top = findPos(root)[1];
   var scroll = y - top;
   return scroll;
}
function DatatreeStripTagsPHPJS(input, allowed) { // phpjs.org/functions/strip_tags/
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
function DatatreeEscapeTags(input, allowed){ // allowed example: "<span></span><font></font>"
   var tags = allowed.split(">");
   var full_tags = new Array();
   var partial_tags = new Array();
   for (var count = 0; count < tags.length; ++count){
      var tag = tags[count];
      full_tags.push(tag + ">");
      if (!tag.indexOf("</") >= 0){
         partial_tags.push(tag + " ");
      }
   }
   var output = input.split("<").join("&lt;").split(">").join("&gt;");
   for (var count = 0; count < full_tags.length; ++count){
      var escape_tag = full_tags[count].split("<").join("&lt;").split(">").join("&gt;");
      output = output.split(escape_tag).join(full_tags[count]);
   }
   for (var count = 0; count < partial_tags.length; ++count){
      var escape_tag = partial_tags[count].split("<").join("&lt;");
      output = output.split(escape_tag).join(partial_tags[count]);
   }
   return output;
}
function DatatreeEscapeTagsForPrint(input, allowed){ // allowed example: "<span></span><font></font>"
   var tags = allowed.split(">");
   var full_tags = new Array();
   var partial_tags = new Array();
   for (var count = 0; count < tags.length; ++count){
      var tag = tags[count];
      full_tags.push(tag + ">");
      if (!tag.indexOf("</") >= 0){
         partial_tags.push(tag + " ");
      }
   }
   var output = input.split("<").join("&amp;lt;").split(">").join("&amp;gt;");
   for (var count = 0; count < full_tags.length; ++count){
      var escape_tag = full_tags[count].split("<").join("&amp;lt;").split(">").join("&amp;gt;");
      output = output.split(escape_tag).join(full_tags[count]);
   }
   for (var count = 0; count < partial_tags.length; ++count){
      var escape_tag = partial_tags[count].split("<").join("&amp;lt;");
      output = output.split(escape_tag).join(partial_tags[count]);
   }
   return output;
}
function DatatreeGetTextForPrint(){
    this.UpdateContent();
    var content = this.CONTENT;
    var chars;
    var lines = new Array();
    content = this.HtmlBody(content);
    lines = this.HtmlLineBreaks(content);
    for (var count = 0; count < lines.length; ++count){
       lines[count] = DATATREE.StripTagsPHPJS(lines[count]);
    }
    var result = "";
    for (var count = 0; count < lines.length; ++count){
        result += lines[count] + "\n";
    }
    return result;
}
function DatatreePrintText(){
     var result = this.GetTextForPrint();
     this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML; 
     document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return DatatreeRestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
}
function DatatreeGetHtmlParagraphs(){
    this.UpdateHtmlContent();
    return this.CONTENT;
}
function DatatreeUpdateHtmlContent(node){
    if (DatatreeUpdateHtmlContent.arguments.length <= 0){
        node = this.ROOT_NODE;
        this.CONTENT = "";
    } else if (node == this.ROOT_NODE){
        this.CONTENT = "";
    }
    if (node.GetLevel() >= 0){
       var indentation = '';
       var level = node.GetLevel("simple");// 7.9.6
       //var level = node.GetLevel()*2; // 7.9.6
       //var level = node.GetLevel();
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
function DatatreePrintHtmlLines(justreturnval){
    try{
    var result;
    result = this.GetHtml();
    if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text"){
            //alert("WARNING: If your document contains computer code, especially html code or javascript, you should leave it as a text file. It is not possible to write about html from within html. Always write about computer code from a text file.");
    }
    if (DatatreePrintHtmlLines.arguments.length < 1 || justreturnval != true){
       result = result.split("&nbsp;").join("&amp;nbsp;");
       result = DATATREE.EncodeArrows(result,true);//8.0
       this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML; 
       document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return DatatreeRestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
       return null;
    } else if (justreturnval == true){
       return result;
    }
    } catch(exc) {
        alert(exc);
    }
}
function DatatreePrintHtml(justreturnval){
    this.PrintList(justreturnval);
}
function DatatreePrintList(justreturnval){
    try{
    var result;
    result = this.ViewGetList();
    if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text"){
            //alert("WARNING: If your document contains computer code, especially html code or javascript, you should leave it as a text file. It is not possible to write about html from within html. Always write about computer code from a text file.");
    }
    if (DatatreePrintList.arguments.length < 1 || justreturnval != true){
       result = result.split("&nbsp;").join("&amp;nbsp;");
       result = DATATREE.EncodeArrows(result,true);//8.0
       this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML; 
       document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return DatatreeRestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
       return null;
    } else if (justreturnval == true){
       return result;
    }
    } catch(exc) {
        
    }
}
function DatatreePrintCode(justreturnval){
    try{
    var result = this.GetCode();
    if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text"){
        //alert("WARNING: If your document contains computer code, especially html code or javascript, you should leave it as a text file. It is not possible to write about html from within html. Always write about computer code from a text file.");
    }
    if (DatatreePrintCode.arguments.length < 1 || justreturnval != true){
       result = result.split("&nbsp;").join("&amp;nbsp;");
       this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML; 
       document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return DatatreeRestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
       return null;
    } else if (justreturnval == true){
       return result;
    }
    } catch(exc) {
        
    }
}
function DatatreePrintHead(){
     var result = document.head.innerHTML;
     this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML; 
     document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return DatatreeRestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
}
function DatatreeGetOnload(datatree){
    var result = "";
    result += "onload = function(){ ";
    result += "DATATREE.REPRESS_ALERTS = " + !!DATATREE.REPRESS_ALERTS + "; ";
    result += "DATATREE.TAB = \"" + DATATREE.TAB + "\"; ";
    result += "DATATREE.ALT_EDITOR = " + DATATREE.ALT_EDITOR + "; ";
    result += "DATATREE.TOOLBAR_ALIGN = \"" + datatree.TOOLBAR_ALIGN + "\"; ";
    result += "DATATREE.TOOLBAR_STYLE = \"" + DATATREE.TOOLBAR_STYLE + "\"; ";
    result += "DATATREE.TOOLBAR_FREESTYLE = \"" + DATATREE.TOOLBAR_FREESTYLE.split("'").join("&apos;").split("\"").join("&quot;") + "\"; ";
    result += "DATATREE.TOOLBAR_FREESTYLE2 = \"" + DATATREE.TOOLBAR_FREESTYLE2.split("'").join("&apos;").split("\"").join("&quot;") + "\"; ";
    result += "DATATREE.GO_TO_FILE = \"" + DATATREE.GO_TO_FILE + "\"; ";
    result += DATATREE.PRINT_EXTRA_SCRIPT_BEFORE;
    result += "DATATREE.PLEASE_WAIT = true;DATATREE.AutoInit('" + datatree.NAME + "');";
    result += DATATREE.PRINT_EXTRA_SCRIPT_AFTER;
    result += "DATATREE.TREE.ACCORDION = " + parseInt(datatree.ACCORDION) + "; ";
    result += "DATATREE.TREE.LETTERING = \"" + datatree.LETTERING + "\"; ";
    result += "DATATREE.TREE.HIGHLIGHT_BACKGROUND_COLOR = \"" + datatree.HIGHLIGHT_BACKGROUND_COLOR + "\"; ";
    result += "DATATREE.TREE.HIGHLIGHT_TEXT_COLOR = \"" + datatree.HIGHLIGHT_TEXT_COLOR + "\"; ";
    result += "DATATREE.PRINT_EXTRA_SCRIPT_BEFORE = \"" + DATATREE.PRINT_EXTRA_SCRIPT_BEFORE.split("\"").join("\\\"") + "\"; ";
    result += "DATATREE.PRINT_EXTRA_SCRIPT_AFTER = \"" + DATATREE.PRINT_EXTRA_SCRIPT_AFTER.split("\"").join("\\\"") + "\"; ";
    result += "}";
    return result;
}
function DatatreeGetFile(){
    this.UpdateContent();
    var datatree = DATATREE.TREE? DATATREE.TREE : this;
    var result = "<!doctype html><html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>";
    result += "<" + "script type='text/javascript' src='" + DATATREE.ADDRESS + "'><" + "/script>";
    result += "<" + "script type='text/javascript'>";
    result += DATATREE.GetOnload(datatree);
    result += "<" + "/script>";
    result += "<" + "/head><" + "body>";
    var SITEMAP = "";
    if (DATATREE.SITEMAP_FILE != null && DATATREE.SITEMAP_FILE != 'undefined' && DATATREE.SITEMAP_FILE != ""){
       SITEMAP = DATATREE.SITEMAP_FILE;
    }
    result += "<div id='" + datatree.ELEMENT_OUTER_WRAPPER + "' type='html' toolbar='" + datatree.TOOLBAR_TOOLS + "' root=\"" + datatree.TITLE + "\" open=\"" + datatree.OPEN_ICON.split("'").join("&apos;").split("\"").join("&quot;") + "\" closed=\"" + datatree.CLOSED_ICON.split("'").join("&apos;").split("\"").join("&quot;") + "\" empty=\"" + datatree.EMPTY_ICON.split("'").join("&apos;").split("\"").join("&quot;") + "\" sitemap='" + SITEMAP + "' >";
    if (this.CONTENT.indexOf('<table') >= 0){
       result += this.CONTENT; // slower, but GetList and SyncFromDataTree indent unindented tables
    } else {
       result += this.GetList(); // faster
    }
    result += "</div>";
    result += "</body></html>";
    return result;
}
function DatatreeGetFileMax(){
    this.UpdateContent();
    var datatree = DATATREE.TREE? DATATREE.TREE : this;
    var result = "<!doctype html><html><head>";
    result += "<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>";
    var top = document.createElement('div');
    top.innerHTML = document.head.innerHTML;
    var scripts = top.getElementsByTagName('script');
    for (var s = 0; s < scripts.length; ++s){
       var script = scripts[s];
       try{
          if (script.id == 'tree_script' || script.innerHTML.indexOf('DATATREE') >= 0){
             top.removeChild(script);
			 --s;
          }
       } catch (exc) {}
    }
    var script = document.createElement('script');
    script.setAttribute('type','text/javascript');
    var onload = DATATREE.GetOnload(datatree);
    script.innerHTML = onload;
    top.appendChild(script);
    result += top.innerHTML;
    result += "<" + "/head><" + "body>";
    var SITEMAP = "";
    if (DATATREE.SITEMAP_FILE != null && DATATREE.SITEMAP_FILE != 'undefined' && DATATREE.SITEMAP_FILE != ""){
       SITEMAP = DATATREE.SITEMAP_FILE;
    }
    var tree = "<div id='" + datatree.ELEMENT_OUTER_WRAPPER + "' type='html' toolbar='" + datatree.TOOLBAR_TOOLS + "' root=\"" + datatree.TITLE + "\" open=\"" + datatree.OPEN_ICON.split("'").join("&apos;").split("\"").join("&quot;") + "\" closed=\"" + datatree.CLOSED_ICON.split("'").join("&apos;").split("\"").join("&quot;") + "\" empty=\"" + datatree.EMPTY_ICON.split("'").join("&apos;").split("\"").join("&quot;") + "\" sitemap='" + SITEMAP + "' >";
    if (this.CONTENT.indexOf('<table') >= 0){
       tree += this.CONTENT; // slower, but GetList and SyncFromDataTree indent unindented tables
    } else {
       tree += this.GetList(); // faster
    }
    tree += "</div>";
    var span = document.createElement('span');
    span.innerHTML = tree;
    var temp = document.body.innerHTML;
    var datatree = document.getElementById(datatree.ELEMENT_OUTER_WRAPPER);
    datatree.parentNode.replaceChild(span,datatree);
    result += document.body.innerHTML;
	while (result.indexOf("<span><span>") >= 0){
	   result = result.replace("<span><span>", "<span>");
	}
    document.body.innerHTML = temp;
    result += "</body></html>";
    return result;
}
function DatatreePrintFile(justreturnval){
    try{
    var result = this.GetFile();
    if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text"){
        //alert("WARNING: If your document contains computer code, especially html code or javascript, you should use PRINT TEXT and save it as a text file. It is often not possible to write about code from within code, especially with html. Always write about computer code from a text file.");
    }
    if (DatatreePrintFile.arguments.length < 1 || justreturnval != true){
       //result = result.split("&nbsp;").join("&amp;nbsp;");
       result = result.split("<").join("&lt;");
       result = result.split(">").join("&gt;");
       this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML; 
       document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return DatatreeRestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
       return null;
    } else if (justreturnval == true){
       return result;
    }
    } catch(exc) {
        
    }
}
function DatatreePrintFileMax(justreturnval){
    try{
    var result = this.GetFileMax();
    if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text"){
        //alert("WARNING: If your document contains computer code, especially html code or javascript, you should use PRINT TEXT and save it as a text file. It is often not possible to write about code from within code, especially with html. Always write about computer code from a text file.");
    }
    if (DatatreePrintFileMax.arguments.length < 1 || justreturnval != true){
       //result = result.split("&nbsp;").join("&amp;nbsp;");
       result = result.split("<").join("&lt;");
       result = result.split(">").join("&gt;");
       this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML; 
       document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return DatatreeRestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
       return null;
    } else if (justreturnval == true){
       return result;
    }
    } catch(exc) {
        
    }
}
function DatatreePrintTextTree(justreturnval){
    try{
    var result = this.GetTextTreeFile();
    if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() != "text"){
       //alert('For plain text trees only.');
       //return;
    }
    if (DatatreePrintTextTree.arguments.length < 1 || justreturnval != true){
       //result = result.split("&nbsp;").join("&amp;nbsp;");
       result = result.split("<").join("&lt;");
       result = result.split(">").join("&gt;");
       this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML; 
       document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return DatatreeRestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
       return null;
    } else if (justreturnval == true){
       return result;
    }
    } catch(exc) {
        
    }
}
function DatatreeGetTextTreeFile(){
    this.UpdateContent();
    var datatree = DATATREE.TREE? DATATREE.TREE : this;
    var result = "<!doctype html><html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>";
    result += "<" + "script type='text/javascript' src='" + DATATREE.ADDRESS + "'><" + "/script>";
    result += "<" + "script type='text/javascript'>";
    result += DATATREE.GetOnload(datatree);
    result += "<" + "/script>";
    result += "<" + "/head><" + "body>";
    var datatree = DATATREE.TREE? DATATREE.TREE : this;
    var SITEMAP = "";
    if (DATATREE.SITEMAP_FILE != null && DATATREE.SITEMAP_FILE != 'undefined' && DATATREE.SITEMAP_FILE != ""){
        SITEMAP = DATATREE.SITEMAP_FILE;
    }
	result += "<div id='" + datatree.ELEMENT_OUTER_WRAPPER + "' type='text' toolbar='" + datatree.TOOLBAR_TOOLS + "' root=\"" + datatree.TITLE + "\" open=\"" + datatree.OPEN_ICON.split("'").join("&apos;").split("\"").join("&quot;") + "\" closed=\"" + datatree.CLOSED_ICON.split("'").join("&apos;").split("\"").join("&quot;") + "\" empty=\"" + datatree.EMPTY_ICON.split("'").join("&apos;").split("\"").join("&quot;") + "\" sitemap='" + SITEMAP + "' >";
    result += "<!-- \n";
    result += this.GetText().split("&lt;!--").join("<!--").split("--&gt;").join("-->").split("&amp;&lt;!--").join("<!--").split("--&amp;&gt;").join("-->").split("<!--").join("&amp;lt;!--").split("-->").join("--&amp;gt;");
    result += "\n -->";
    result += "</div>";
    result += "</body></html>";
    return result;
}
function DatatreePrint(){
    this.PrintList();
    //this.PrintText();
}
function DatatreeReplay(returnvalue){
	if (this.ALERTS.length < 2 && (DatatreeReplay.arguments.length < 1 || returnvalue == false)){
           for (var count = 0; count < this.ALERTS.length; ++count){
              alert(this.ALERTS[count]);
           }
	} else {
	   var alerts = "";
	   for (var count = 0; count < this.ALERTS.length; ++count){
              alerts += this.ALERTS[count] + "\n";
           }
           if (DatatreeReplay.arguments.length < 1 || returnvalue == false){
              DATATREE.ShowPopupBox(alerts, 30000, (window.screen.width/3), (window.screen.height/3));
           } else if (returnvalue == true){
             return alerts;
           }
	}
}
/** END **/

