/**
Jdatatree version 10.0
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

var JDATATREE = new Jdatatree();

function Definitions() {
    JDATATREE = new Jdatatree();
    JDATATREE.AltQueryDocumentation = JdatatreeAltQueryDocumentation;
    JDATATREE.Custom = JdatatreeCustom;
    JDATATREE.Custom2 = JdatatreeCustom2;
    JDATATREE.AltLoadFromTextarea = JdatatreeAltLoadFromTextarea;
    JDATATREE.GetAltEditorContent = JdatatreeGetAltEditorContent;
    JDATATREE.InitializeAltEditor = JdatatreeInitializeAltEditor;
    JDATATREE.InsertAltEditor = JdatatreeInsertAltEditor;
    JDATATREE.RemoveAltEditorInstance = JdatatreeRemoveAltEditorInstance;
    JDATATREE.SetAltEditorContent = JdatatreeSetAltEditorContent;
    JDATATREE.ShowAltEditBox = JdatatreeShowAltEditBox;
}

function JdatatreeGetAltEditorContent() {
    
     var PLAINTEXT = false;
     if (document.getElementsByName('jdatatree_text_or_html')){
     var radios = document.getElementsByName('jdatatree_text_or_html');
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
     if (JDATATREE.TREE){
     datatree = JDATATREE.TREE;
     } else if (this){
     datatree = this;
     } else {
     alert('cannot find datatree');
     return;
     }
     if (PLAINTEXT == false && datatree.PLAIN_TEXT == false){
     var content = tinyMCE.activeEditor.getContent();
     if (JDATATREE.FULL_SCREEN_MODE == true){
     content = content.split("span class=\"table\"").join("table").split("span class=\"tbody\"").join("tbody").split("span class=\"tr\"").join("tr").split("span class=\"td\"").join("td").split("%%%%%</span>").join("</tbody>").split("%%%%</span>").join("</td>").split("%%%</span>").join("</tr>").split("%%</span>").join("</table>");
     } else if (content.indexOf("<table") >= 0 && JDATATREE.FULL_SCREEN_MODE == false){
     content = content.substring(0, content.indexOf("</table>") + "</table>".length);
     }
     return content;
     } else if (datatree.PLAIN_TEXT == true){
     return tinyMCE.activeEditor.getBody().textContent;
     } else {
     return tinyMCE.activeEditor.getBody().textContent;
     }
     
}
function JdatatreeSetAltEditorContent(html) {
    tinyMCE.activeEditor.setContent(JDATATREE.StringTrim(html)); // web version
}
function JdatatreeRemoveAltEditorInstance() {
    tinymce.remove(); // web version
}
function JdatatreeAltLoadFromTextarea(type, preload) { // fullscreen  html editor
        try {
        JDATATREE.FULL_SCREEN_MODE = true;
        var html = "";
        if (JdatatreeAltLoadFromTextarea.arguments.length == 2 && preload != null && preload != "undefined" && preload != "") {
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
        var datatree = JDATATREE.TREE ? JDATATREE.TREE : this;
        datatree.VIEW = datatree.TOOLBAR + "<button style='padding:10px;' type='button' onclick='return JdatatreeLoadFromTextarea2();'>SUBMIT >>></button><br/><div id='jdatatree_load_area' class='" + type + "'>" + JDATATREE.InsertAltEditor(txt) + "</div>";
        datatree.RefreshGUI();
        JDATATREE.InitializeAltEditor('textarea.tinymce_fullscreen', '100%', 'auto', true);
    } catch (exc) {
    }
}
function JdatatreeInsertAltEditor(html) {
    try {
        var alteditor = "<textarea style='white-space:pre;' class='tinymce_fullscreen' id='jdatatree_fullscreen_editor' rows='20' cols='150'>" + html + "</textarea>";
        return alteditor;
    } catch (exc) {
        alert(exc);
    }
}
function JdatatreeInitializeAltEditor(s, w, h, full) {
    if (JdatatreeInitializeAltEditor.arguments.length < 2) {
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
    if (JdatatreeInitializeAltEditor.arguments.length > 3 && full == true) {
        tinymce.execCommand('mceAddControl', false, 'jdatatree_fullscreen_editor');
    }
}
function JdatatreeAltQueryDocumentation() {
}
function JdatatreeCustom() { // this is a customizable function...replace this code with your own
    try {
        var custombutton = document.getElementById('jdatatree_custom_button');
        if (custombutton != null && custombutton != 'undefined') {
            JdatatreeQueryDocumentation(); // uncomment for desktop application
        }
    } catch (exc) {
        alert(exc);
    }
}
function JdatatreeCustom2() { // this is a customizable function...replace this code with your own
    try {
        var custombutton = document.getElementById('jdatatree_custom2_button');
        if (custombutton != null && custombutton != 'undefined') {
        }
    } catch (exc) {
        alert(exc);
    }
}
function Jdatatree(){
    this.AltLoadFromTextarea; // ** customizable
    this.CleanHTMLForEditor; // ** customizable
    this.CleanHTMLFromEditor; // ** customizable
    this.GetAltEditorContent; // ** customizable
    this.InitializeAltEditor; // ** customizable
    this.InsertAltEditor; // ** customizable
    this.RemoveAltEditorInstance;// ** customizable
    this.SetAltEditorContent; // ** customizable
    this.ShowAltEditBox; // ** customizable
    this.AllowBackspace = JdatatreeAllowBackspace;
    this.Alphabetize = JdatatreeAutoAlphabetize;
    this.AltQueryDocumentation; // ** customizable
    this.ArraySwap = JdatatreeArraySwap;
    this.AutoInit = JdatatreeAutoInit;
    this.Initialize = JdatatreeAutoInit;
    this.AutoSearchMacro = JdatatreeAutoSearchMacro;
    this.CleanHTML = JdatatreeCleanHTML;
    this.CloseContextMenu = JdatatreeCloseContextMenu;
    this.CloseEditBox = JdatatreeCloseEditBox;
    this.CloseMenu = JdatatreeCloseMenu;
    this.ClosePopupBox = JdatatreeClosePopupBox;
    this.CloseWaitBox = JdatatreeCloseWaitBox;
    this.Collapse = JdatatreeAutoCollapse;
    this.ContextMenu = JdatatreeContextMenu;
    this.Custom; // ** customizable
    this.Custom2; // ** customizable
    this.DisallowBackspace = JdatatreeDisallowBackspace;
    this.EncodeArrows = JdatatreeEncodeArrows;
    this.EscapeTags = JdatatreeEscapeTags;
    this.EscapeTagsForPrint = JdatatreeEscapeTagsForPrint;
    this.Expand = JdatatreeAutoExpand;
    this.FocusContextMenu = JdatatreeFocusContextMenu;
    this.GetBrowser = JdatatreeGetBrowser;
    this.GetFileNameFromPath = JdatatreeGetFileNameFromPath;
    this.GetInitiator = JdatatreeGetPopupEditInitiator;
    this.GetOnload = JdatatreeGetOnload;
    this.GetTreeFromName = JdatatreeGetTreeFromName;
    this.GoToFile = JdatatreeGoToFile;
	this.HighlightTree = JdatatreeHighlightTree;
    this.IsTableTag = JdatatreeIsTableTag;
    this.LeftStringTrim = JdatatreeLeftStringTrim;
    this.Load = JdatatreeAutoLoad;
    this.LoadFromToolbar = JdatatreeAutoLoadFromToolbar;
    this.LoadSitemap = JdatatreeLoadSitemap;
    this.MenuMouseClick = JdatatreeMenuMouseClick;
    this.MenuMouseOver = JdatatreeMenuMouseOver;
    this.MenuMouseOut = JdatatreeMenuMouseOut;
    this.Next = JdatatreeAutoNext;
    this.Number = JdatatreeAutoNumber;
    this.OpenMenu = JdatatreeOpenMenu;
    this.PreventDefault = JdatatreePreventDefault;
    this.Previous = JdatatreeAutoPrevious;
    this.PrintCode = JdatatreeAutoPrintCode;
    this.PrintHtml = JdatatreeAutoPrintHtml;
    this.PrintList = JdatatreeAutoPrintList;
    this.PrintText = JdatatreeAutoPrintText;
    this.Query = JdatatreeAutoQuery;
    this.QueryDocumentation = JdatatreeQueryDocumentation;
    this.ReadFile = JdatatreeReadFile;
    this.RemoveEmptyEndTags = JdatatreeRemoveEmptyEndTags;
    this.RemoveTableWrappers = JdatatreeRemoveTableWrappers;
    this.Replace = JdatatreeAutoReplace;
    this.Reset = JdatatreeAutoReset;
    this.ResetMacro = JdatatreeResetMacro;
    this.Response = JdatatreeAutoResponse;
    this.RightClick = JdatatreeRightClick;
    this.RightStringTrim = JdatatreeRightStringTrim;
    this.Save = JdatatreeAutoSave;
    this.SaveMax = JdatatreeAutoSaveMax;
    this.Search = JdatatreeAutoSearch;
    this.SearchMacro = JdatatreeSearchMacro;
    this.SetInitiator = JdatatreeSetPopupEditInitiator;
    this.SetTreeFromName = JdatatreeSetTreeFromName;
    this.ShowPopupBox = JdatatreeShowPopupBox;
    this.Skip = JdatatreeAutoSkip;
    this.StringTrim = JdatatreeStringTrim;
    this.StripTags = JdatatreeStripTags;
    this.StripTagsPHPJS = JdatatreeStripTagsPHPJS;
    this.StripTagLeaveInner = JdatatreeStripTagLeaveInner;
    this.StripTagWithClassNameLeaveInner = JdatatreeStripTagWithClassNameLeaveInner;
    this.Tree = JdatatreeTree;
    this.ToolbarSelect = JdatatreeAutoToolbarSelect;
    this.Wait = JdatatreeWait;
    // repeats with datatree properties not allowed
    this.ADDRESS = "http://www.jdatatree.com/version/latest/Jdatatree.js";
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
    this.DEFAULT_TOOLBAR_NAME = "jdatatree_toolbar";
    this.DEFAULT_EDITBOX_NAME = "jdatatree_editbox";
    this.DEFAULT_CLOSED_ICON = "<span class='closed'>&rArr;</span>";
    this.DEFAULT_EMPTY_ICON = "<span class='empty'>&EmptySmallSquare;</span>";
    this.DEFAULT_GO_TO_FILE = "if(JDATATREE.TEMP.toLowerCase().indexOf('.txt')>=0 || JDATATREE.TEMP.toLowerCase().indexOf('.html')>=0 || JDATATREE.TEMP.toLowerCase().indexOf('.htm')>=0){JDATATREE.TREE.Query('LOAD ' + JDATATREE.TEMP);JDATATREE.GO_TO_FILE = '';JDATATREE.WENT_TO_FILE = true;JDATATREE.TREE.Query('collapse');};";
    this.DEFAULT_HIGHLIGHT_BACKGROUND_COLOR = "cyan";
    this.DEFAULT_HIGHLIGHT_TEXT_COLOR = "navy";
    this.DEFAULT_OPEN_ICON = "<span class='open'>&dArr;</span>";
    this.DEFAULT_SKIP_MESSAGE = "***** PLEASE WAIT *****";
    this.DEFAULT_TOOLBAR_ALIGN = "left";
    this.DEFAULT_TOOLBAR_TOOLS = "collapse,expand,search_horizontal,next,previous,reset,edit,replace,alphabetize,query,number,freestyle";
    this.DEFAULT_TOOLBAR_FREESTYLE = "";
    this.DOCUMENTATION_ADDRESS = "http://www.jdatatree.com/proxy/documentation.tree.html";
    this.INSERT = false;
    this.FULL_SCREEN_MODE = false;
    this.GO_TO_FILE = ""; // go to file when click on line...insert function behavior here...does not require 'function(){...}'...text of line clicked stored in JDATATREE.TEMP variable
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
    this.NAME_OF_ARROW = 'jdatatree_arrow';
    this.NAME_OF_CONTENT = 'jdatatree_content';
    this.NAME_OF_UL = 'jdatatree_ul';
    this.NAME_OF_LI = 'jdatatree_li';
}
function JdatatreeTree(outer_wrapper) {
    JDATATREE.TREES.push(this);
    this.AutoInitialize = JdatatreeAutoInitialize;
    this.Branch = JdatatreeBranch;
    this.Clear = JdatatreeClear;
    this.ClickTreeText = JdatatreeClickTreeText;
    this.CloseTree = JdatatreeCloseTree;
    this.DivHasSelfIndentingTag = JdatatreeDivHasSelfIndentingTag;
    this.DivHasKeeperNonTextTag = JdatatreeDivHasKeeperNonTextTag;
    this.DivHasContentTag = JdatatreeDivHasContentTag;
    this.DoNotWrapOuterElement = JdatatreeDoNotWrapOuterElement;
    this.Edit = JdatatreeEdit;
    this.EditTreeText = JdatatreeEditTreeText;
    this.EvenSpacing = JdatatreeEvenSpacing;
    this.EvenSpacing2 = JdatatreeEvenSpacing2;
    this.GetCode = JdatatreeGetCode;
    this.GetFile = JdatatreeGetFile;
    this.GetFileMax = JdatatreeGetFileMax;
    this.GetHtml = JdatatreeGetHtmlParagraphs;
    this.GetHtmlLines = JdatatreeGetHtmlLines;
    this.GetLettering = JdatatreeGetLettering;
    this.GetList = JdatatreeGetList;
    this.GetMacroIndexForNode = JdatatreeGetMacroIndexForNode;
    this.GetOuterElement = JdatatreeGetOuterElement;
    this.GetScrollForSearch = JdatatreeGetScrollForSearch;
    this.GetSkipMessage = JdatatreeGetSkipMessage;
    this.GetText = JdatatreeGetText;
    this.GetTextForPrint = JdatatreeGetTextForPrint;
    this.GetTextTreeFile = JdatatreeGetTextTreeFile;
    this.GetType = JdatatreeGetType;
    this.GetView = JdatatreeGetView;
    this.HighlightSpan = JdatatreeHighlightSpan;
    this.HtmlLineBreaks = JdatatreeHtmlLineBreaks;
    this.Indent = JdatatreeIndent;
    this.Init = JdatatreeInit;
    this.InitReplaceResults = JdatatreeInitReplaceResults;
    this.InitSearchResults = JdatatreeInitSearchResults;
    this.InsertClickTreeText = JdatatreeInsertClickTreeText;
    this.InsertEditTreeText = JdatatreeInsertEditTreeText;
    this.IsRemovableFormatTag = JdatatreeIsRemovableFormatTag;
    this.LoadFromTextarea = JdatatreeLoadFromTextarea;
    this.LoadFromTextarea2 = JdatatreeLoadFromTextarea2;
    this.LoadFromToolbar = JdatatreeLoadFromToolbar;
    this.MouseDownSpan = JdatatreeMouseDownSpan;
    this.MouseUpSpan = JdatatreeMouseUpSpan;
    this.HtmlBody = JdatatreeHtmlBody;
    this.HtmlCode = JdatatreeHtmlCode;
    this.HtmlText = JdatatreeHtmlText;
    this.PlainText = JdatatreePlainText;
    this.Print = JdatatreePrint;
    this.PrintCode = JdatatreePrintCode;
    this.PrintFile = JdatatreePrintFile;
    this.PrintFileMax = JdatatreePrintFileMax;
    this.PrintHead = JdatatreePrintHead;
    this.PrintHtml = JdatatreePrintHtml;
    this.PrintHtmlLines = JdatatreePrintHtmlLines;
    this.PrintList = JdatatreePrintList;
    this.PrintText = JdatatreePrintText;
    this.PrintTextTree = JdatatreePrintTextTree;
    this.ProcessTree = JdatatreeProcessTree;
    this.Query = JdatatreeQuery;
    this.Refresh = JdatatreeRefresh;
    this.RefreshGUI = JdatatreeRefreshGUI;
    this.RemoveHtmlComments = JdatatreeRemoveHtmlComments;
    this.RemoveTables = JdatatreeRemoveTables;
    this.ReplaceBranch = JdatatreeReplaceBranch;
    this.ResetReplace = JdatatreeResetReplace;
    this.Replay = JdatatreeReplay;
    this.ResetEditBox = JdatatreeResetEditBox;
    this.ResetToolbarSelect = JdatatreeResetToolbarSelect;
    this.RestoreView = JdatatreeRestoreView;
    this.ScrollToSpan = JdatatreeScrollToSpan;
    this.SetClosedIcon = JdatatreeSetClosedIcon;
    this.SetEmptyIcon = JdatatreeSetEmptyIcon;
    this.SetIcons = JdatatreeSetIcons;
    this.SetOpenIcon = JdatatreeSetOpenIcon;
    this.SetTableStyle = JdatatreeSetTableStyle;
    this.SetToolbar = JdatatreeSetToolbar;
    this.SetType = JdatatreeSetType;
    this.SetTypeConditionally = JdatatreeSetTypeConditionally;
    this.ShowEditBox = JdatatreeShowEditBox;
    this.SubmitEdit = JdatatreeSubmitEdit;
    this.SetTreeHeight = JdatatreeSetTreeHeight;
    this.SwapBranches = JdatatreeSwapBranches;
    this.SyncFromRootNode = JdatatreeSyncFromRootNode;
    this.SyncFromDataTree = JdatatreeSyncFromDataTree;
    this.Synchronize = JdatatreeSynchronize;
    this.TagRequiresLineBreak = JdatatreeTagRequiresLineBreak;
    this.TreeFromString = JdatatreeTreeFromString;
    this.UnhighlightSpan = JdatatreeUnhighlightSpan;
    this.UndoPreservedWhiteSpace = JdatatreeUndoPreservedWhiteSpace;
    this.UpdateContent = JdatatreeUpdateContent;
    this.UpdateHtmlContent = JdatatreeUpdateHtmlContent;
    this.View = JdatatreeView;
    this.ViewIndex = JdatatreeViewIndex;
    this.ViewIndexOfSpan = JdatatreeViewIndexOfSpan;
    this.ViewFindSpanFromLi = JdatatreeViewFindSpanFromLi;
    this.ViewFindLiFromSpan = JdatatreeViewFindLiFromSpan;
    this.ViewFindUlFromSpan = JdatatreeViewFindUlFromSpan;
    this.ViewSpandex = JdatatreeViewSpandex;
    this.ViewA = JdatatreeViewA;
    this.ViewSpan = JdatatreeViewSpan;
    this.ViewUl = JdatatreeViewUl;
    this.ViewLi = JdatatreeViewLi;
    this.ViewListElement = JdatatreeViewListElement;
    this.ViewOverwrite = JdatatreeViewOverwrite;
    this.ViewSibling = JdatatreeViewSibling;
    this.ViewChild = JdatatreeViewChild;
    this.ViewSwap = JdatatreeViewSwap;
    this.ViewUp = JdatatreeViewUp;
    this.ViewDown = JdatatreeViewDown;
    this.ViewSelright = JdatatreeViewSelright;
    this.ViewSecright = JdatatreeViewSecright;
    this.ViewRight = JdatatreeViewRight;
    this.ViewLeft = JdatatreeViewLeft;
    this.View_Left = JdatatreeView_Left;
    this.ViewCut = JdatatreeViewCut;
    this.View_Cut = JdatatreeView_Cut;
    this.ViewCopysel = JdatatreeViewCopysel;
    this.ViewCopysec = JdatatreeViewCopysec;
    this.ViewCopy = JdatatreeViewCopy;
    this.ViewPaste = JdatatreeViewPaste;
    this.View_Paste = JdatatreeView_Paste;
    this.ViewRemove = JdatatreeViewRemove;
    this.ViewOpenToSpan = JdatatreeViewOpenToSpan;
    this.ViewExpand = JdatatreeViewExpand;
    this.ViewCollapse = JdatatreeViewCollapse;
    this.ViewSearch = JdatatreeViewSearch;
    this.ViewSearch2 = JdatatreeViewSearch2;
    this.ViewNext = JdatatreeViewNext;
    this.ViewPrevious = JdatatreeViewPrevious;
    this.ViewReset = JdatatreeViewReset;
    this.ViewTrim = JdatatreeViewTrim;
    this.ViewRoot = JdatatreeViewRoot;
    this.ViewSpanIsRoot = JdatatreeViewSpanIsRoot;
    this.ViewClick = JdatatreeViewClick;
    this.ViewGetList = JdatatreeViewGetList;
    this.ViewGetList2 = JdatatreeViewGetList2;
    this.ViewNumber = JdatatreeViewNumber;
    this.ViewClose = JdatatreeViewClose;
    this.ViewReplace = JdatatreeViewReplace;
    this.ViewInitReplaceResults = JdatatreeViewInitReplaceResults;
    this.ViewAlphabetize = JdatatreeViewAlphabetize;
    // repeats with Jdatatree properties not allowed
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
    this.ELEMENT_INNER_WRAPPER = JDATATREE.DEFAULT_INNER_WRAPPER;
    if (JdatatreeTree.arguments.length >= 1){
        this.ELEMENT_INNER_WRAPPER = outer_wrapper + "_inner";
    }
    this.ELEMENT_INNER_WRAPPER_STYLE = "list-style-type:none;display:block;padding-left:0px;margin-top:0px;border:1px solid gray;width:100%;overflow:scroll;-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;";//webkit-touch-callout disables default browser blue drag highlighting
    this.ELEMENT_INNER_WRAPPER_HEIGHT = "500px";
    this.ELEMENT_OUTER_WRAPPER = JDATATREE.DEFAULT_OUTER_WRAPPER;
    if (JdatatreeTree.arguments.length >= 1){
        this.ELEMENT_OUTER_WRAPPER = outer_wrapper;
    }
    this.ELEMENT_OUTER_WRAPPER_STYLE = "";
    this.EMPTY_ICON = "<span class='empty'>&EmptySmallSquare;</span>";
    this.HAS_ERRORS = false;
    this.HIGHLIGHT_BACKGROUND_COLOR = JDATATREE.DEFAULT_HIGHLIGHT_BACKGROUND_COLOR;
    this.HIGHLIGHT_TEXT_COLOR = JDATATREE.DEFAULT_HIGHLIGHT_TEXT_COLOR;
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
    this.TOOLBAR_NAME = JDATATREE.DEFAULT_TOOLBAR_NAME;
    if (JdatatreeTree.arguments.length >= 1){
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
    this.TOOLBAR_TOOLS = JDATATREE.DEFAULT_TOOLBAR_TOOLS;
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
function JdatatreeBranch(txt, tree) {
    this.AddBranch = JdatatreeAddBranch;
    this.Click = JdatatreeClick;
    this.Clone = JdatatreeCloneBranch;
    this.Close = JdatatreeClose;
    this.CountFromTop = JdatatreeCountFromTop; // vertical top down number from root
    this.GetChildCount = JdatatreeGetChildCount;
    this.GetIndex = JdatatreeGetIndex; // vertical index in children list of parent node
    this.GetLevel = JdatatreeGetLevel; // horizontal depth
    this.InsertBranch = JdatatreeInsertBranch;
    this.Iterate = JdatatreeListIterate;
    this.RemoveAllBranches = JdatatreeRemoveAllBranches;
    this.RemoveBranch = JdatatreeRemoveBranch;
    this.CHILDREN = new Array();
    this.DISPLAY = "block";
    this.TEXT = tree.AUTO_TRIM == true? JDATATREE.StringTrim(txt) : txt;
    this.INDENTATION = txt.indexOf(this.TEXT.charAt(0));
    this.LINK = "";
    this.PARENT_NODE = "";
    this.TREE = tree;
    this.LINK = this.TREE.EMPTY_ICON;
}
function JdatatreeViewExpand(span){
   var ul;
   var root = false;
   if (JdatatreeViewExpand.arguments.length < 1 || span == null || span == "undefined"){
      ul = document.getElementById(JDATATREE.TREE.ELEMENT_INNER_WRAPPER);
      root = true;
   } else {
      ul = this.ViewFindUlFromSpan(span);
   }
   if (ul){
     if (root == false){
        ul.style.display = "block";
        var li = this.ViewFindLiFromSpan(span);
        if (li){
           var arrow = li.getElementsByClassName('jdatatree_arrow')[0];
           if (arrow && arrow.firstChild.className != "empty"){
              arrow.innerHTML = JDATATREE.TREE.OPEN_ICON;
           }
        }
     }
     var uls = ul.getElementsByClassName('jdatatree_ul');
     for (var count = 0; count < uls.length; ++count){
        uls[count].style.display = 'block';
     }
     var arrows = ul.getElementsByClassName('jdatatree_arrow');
     for (var count = 0; count < arrows.length; ++count){
        var arrow = arrows[count];
        if (arrow.firstChild.className != "empty"){
           arrow.innerHTML = JDATATREE.TREE.OPEN_ICON;
        }
     }
     if (root){
        //JdatatreeViewClick(JdatatreeViewRoot());
     }
   }
}
function JdatatreeViewCollapse(span){
   var ul;
   var root = false;
   if (JdatatreeViewCollapse.arguments.length < 1 || span == null || span == "undefined"){
      ul = document.getElementById(JDATATREE.TREE.ELEMENT_INNER_WRAPPER);
      root = true;
   } else {
      ul = this.ViewFindUlFromSpan(span);
   }
   if (ul){
     if (root == false){
        ul.style.display = "none";
        var li = this.ViewFindLiFromSpan(span);
        if (li){
           var arrow = li.getElementsByClassName('jdatatree_arrow')[0];
           if (arrow && arrow.firstChild.className != "empty"){
              arrow.innerHTML = JDATATREE.TREE.CLOSED_ICON;
           }
        }
     }
     var uls = ul.getElementsByClassName('jdatatree_ul');
     for (var count = 0; count < uls.length; ++count){
        uls[count].style.display = 'none';
     }
     var arrows = ul.getElementsByClassName('jdatatree_arrow');
     for (var count = 0; count < arrows.length; ++count){
        var arrow = arrows[count];
        if (arrow.firstChild.className != "empty"){
           arrow.innerHTML = JDATATREE.TREE.CLOSED_ICON;
        }
     }
     if (root){
        JdatatreeViewClick(JdatatreeViewRoot());
     }
   }
}
function JdatatreeViewRoot(){
   return document.getElementById(JDATATREE.TREE.ELEMENT_INNER_WRAPPER).getElementsByTagName('li')[0];
}
function JdatatreeViewClick(li){
   if (li){
     var arrow = li.getElementsByTagName('a')[0];
     var ul = li.getElementsByTagName('ul')[0];
     if (ul.style.display == "block"){
        ul.style.display = "none";
        arrow.innerHTML = JDATATREE.TREE.CLOSED_ICON;
     } else if (ul.style.display == "none"){
        ul.style.display = "block";
        arrow.innerHTML = JDATATREE.TREE.OPEN_ICON;
     }
   }
}
function JdatatreeViewSearch(searchterm,case_sensitive,exact_matches,regular_expression,dont_change_view){
   if (JdatatreeViewSearch.arguments.length < 1 || searchterm == null || searchterm == "undefined" || searchterm == ""){
      searchterm = document.getElementById(JDATATREE.TREE.TOOLBAR_SEARCHBOX_NAME).value;
   }
   if (JdatatreeViewSearch.arguments.length < 2 || case_sensitive != true){
      case_sensitive = false;
   }
   if (JdatatreeViewSearch.arguments.length < 3 || exact_matches != true){
      exact_matches = false;
   }
   if (JdatatreeViewSearch.arguments.length < 4 || regular_expression != true){
      regular_expression = false;
   }
   if (JdatatreeViewSearch.arguments.length < 5 || dont_change_view != true){
      dont_change_view = false;
   }
   if (searchterm == ''){return;}
   var tree = document.getElementById(JDATATREE.TREE.ELEMENT_INNER_WRAPPER);
   if (dont_change_view == false){
     JdatatreeViewCollapse();
     JdatatreeViewReset2(tree);
   }
   JDATATREE.TEMP = 0;
   JdatatreeViewSearch2(searchterm, tree, case_sensitive, exact_matches, regular_expression, dont_change_view);
   if (JDATATREE.REPRESS_ALERTS==false && dont_change_view == false){
      if (JDATATREE.TEMP == 0){
         alert('No results.');
      } else {
         alert('Found ' + JDATATREE.TEMP + ' occurrences.');
      }
   }
}
function JdatatreeViewSearch2(searchterm, ul, case_sensitive, exact_matches, regular_expression, dont_change_view){
   try{
   JDATATREE.TREE.CURRENT_SEARCH_INDEX = -1;
   JDATATREE.TREE.SEARCH_RESULTS.length = 0;
   var chldrn = ul.getElementsByClassName('jdatatree_content');
   for (var count = 0; count < chldrn.length; ++count){
     var span = chldrn[count];
     var ROOT = false;
     if (JdatatreeViewSpanIsRoot(span)){
        ROOT = true;
     }
     var txt = span.innerHTML;
     var MATCHES = false;
     if (ROOT == false){
        var puretext = JDATATREE.StripTags(txt);
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
       ++JDATATREE.TEMP;
       if (dont_change_view == false){
         var TEXT = "<span class='search_result' style='background-color:" + JDATATREE.TREE.HIGHLIGHT_BACKGROUND_COLOR + ";color:" + JDATATREE.TREE.HIGHLIGHT_TEXT_COLOR + ";border:1px solid " + JDATATREE.TREE.HIGHLIGHT_BACKGROUND_COLOR + ";'>" + txt + "</span>";
         span.innerHTML = TEXT;
       }
       JDATATREE.TREE.SEARCH_RESULTS.push(span);
       if (dont_change_view == false){
         var node = span.parentNode;
         while (node.nodeName.toLowerCase() != 'div'){
           if (node.nodeName.toLowerCase() == 'ul'){
             node.style.display = 'block';
           } else if (node.nodeName.toLowerCase() == 'li' && node != span.parentNode && node.getElementsByTagName('ul').length > 0 && node.getElementsByTagName('ul')[0].getElementsByTagName('li').length > 0){
             node.getElementsByTagName('a')[0].innerHTML = JDATATREE.TREE.OPEN_ICON;
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
      JdatatreeViewNext();
   }
   }catch(exc){
      if(JDATATREE.REPRESS_ALERTS==false){
         alert(exc);
      }
   } 
}

function JdatatreeViewSpanIsRoot(span){
     var ROOT = false;
     var li = span.parentNode;
     while (li.nodeName.toLowerCase() != "li"){
        li = li.parentNode;
     }
     var ul = li.parentNode;
     while (ul.nodeName.toLowerCase() != "ul"){
        ul = ul.parentNode;
     }
     if (ul.id == JDATATREE.TREE.ELEMENT_INNER_WRAPPER){
        ROOT = true;
     }
     return ROOT;
}

function JdatatreeViewNext(){
   if (JDATATREE.TREE.CURRENT_SEARCH_INDEX < JDATATREE.TREE.SEARCH_RESULTS.length - 1){
      ++JDATATREE.TREE.CURRENT_SEARCH_INDEX;
   }
   if (JDATATREE.TREE.CURRENT_SEARCH_INDEX < JDATATREE.TREE.SEARCH_RESULTS.length){
      var span = JDATATREE.TREE.SEARCH_RESULTS[JDATATREE.TREE.CURRENT_SEARCH_INDEX];
      if (span){
        JDATATREE.TREE.ViewOpenToSpan(span);
        JDATATREE.TREE.ScrollToSpan(span);
      }
   }
}

function JdatatreeViewPrevious(){
   if (JDATATREE.TREE.CURRENT_SEARCH_INDEX > 0){
      --JDATATREE.TREE.CURRENT_SEARCH_INDEX;
   }
   if (JDATATREE.TREE.CURRENT_SEARCH_INDEX >= 0){
      var span = JDATATREE.TREE.SEARCH_RESULTS[JDATATREE.TREE.CURRENT_SEARCH_INDEX];
      JDATATREE.TREE.ViewOpenToSpan(span);
      JDATATREE.TREE.ScrollToSpan(span);
   }
}

function JdatatreeViewClose(){
   JDATATREE.TREE.SELECTED_SPAN = null;
   JdatatreeViewCollapse();
}
function JdatatreeViewReplace(searchterm,replace_with,case_sensitive,exact_matches){
       document.getElementById(JDATATREE.TREE.TOOLBAR_REPLACE_NAME).value = "";
       document.getElementById(JDATATREE.TREE.TOOLBAR_REPLACE_WITH_NAME).value = "";
       JdatatreeViewSearch(searchterm,case_sensitive,exact_matches,false,true);
       if (JDATATREE.TREE.REPLACE_RESULT_MESSAGE == true){
           if (JDATATREE.TREE.SEARCH_RESULTS.length > 0){
               if (JDATATREE.REPRESS_ALERTS == false) { alert('Your search returned: ' + JDATATREE.TREE.SEARCH_RESULTS.length + ' results. You might have to scroll to view them.'); }
           } else {
               if (JDATATREE.REPRESS_ALERTS == false) { alert('No results.'); }
           }
       }
       var amount = JDATATREE.TREE.SEARCH_RESULTS.length;
       if (JDATATREE.TREE.SEARCH_RESULTS != null && JDATATREE.TREE.SEARCH_RESULTS.length > 0){
          JdatatreeViewClose();
          for (var count = 0; count < JDATATREE.TREE.SEARCH_RESULTS.length; ++count){
             var locate = JDATATREE.TREE.SEARCH_RESULTS[count]; // span
             if (locate != null){
                var replace_result = "<span class=\"replace_result\" style=\"background-color:" + JDATATREE.TREE.HIGHLIGHT_BACKGROUND_COLOR + ";color:" + JDATATREE.TREE.HIGHLIGHT_TEXT_COLOR + ";\">" + searchterm + "</span>";
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
                var stripped = JDATATREE.StripTags(unstripped);
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
                    node.getElementsByTagName('a')[0].innerHTML = JDATATREE.TREE.OPEN_ICON;
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
function JdatatreeViewInitReplaceResults(){
    JDATATREE.TREE.REPLACE_RESULTS.length = 0;
    JDATATREE.TREE.CURRENT_REPLACE_INDEX = -1;
    var spans = document.getElementById(JDATATREE.TREE.ELEMENT_OUTER_WRAPPER).getElementsByClassName("replace_result");
    for (var count = 0; count < spans.length; ++count){
         var span = spans[count];
         //if (span.className && span.className == "replace_result"){
            JDATATREE.TREE.REPLACE_RESULTS.push(span);
         //}
    }
    if (JDATATREE.TREE.REPLACE_RESULTS.length > 0){
       document.getElementById(JDATATREE.TREE.ELEMENT_INNER_WRAPPER).scrollTop = 0;
       JDATATREE.TREE.CURRENT_REPLACE_INDEX = 0;
       var span = JDATATREE.TREE.REPLACE_RESULTS[0];
       var y = JDATATREE.TREE.GetScrollForSearch(span);
       document.getElementById(JDATATREE.TREE.ELEMENT_INNER_WRAPPER).scrollTop = y;
    }
}
function JdatatreeViewCancelFullScreenEdit(){
   document.getElementById(JDATATREE.TREE.ELEMENT_OUTER_WRAPPER).innerHTML = JDATATREE.TREE.VIEW;
}
function JdatatreeViewAlphabetize(mode,start,finish){
   if (mode == "numbers"){
      if (typeof(start) != "number" || typeof(finish) != "number"){
          if (JDATATREE.REPRESS_ALERTS == false) { alert("invalid numbers"); }
          return null;
      }
      if (start >= finish){
          if (JDATATREE.REPRESS_ALERTS == false){ alert("start not less than finish"); }
          return null;
      }
      if (start < 0 || finish < 0){
          if (JDATATREE.REPRESS_ALERTS == false){ alert("out of range error");  }
          return null;
      }
      var root = JdatatreeViewRoot();
      var spans = root.getElementsByClassName("jdatatree_content");
      if (start > spans.length || finish > spans.length){
          if (JDATATREE.REPRESS_ALERTS == false){ alert("out of range error");  }
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
         if (JDATATREE.REPRESS_ALERTS == false){ alert("start and finish do not have the same parent"); }
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
                if (JDATATREE.StripTags(later.innerHTML).toLowerCase() < JDATATREE.StripTags(earlier.innerHTML).toLowerCase()){
                   var temp = earlierparent1.innerHTML;
                   earlierparent1.innerHTML = laterparent1.innerHTML;
                   laterparent1.innerHTML = temp;
                }
              }
           }
        }
      }
   } else if (mode == "strings"){
      var root = JdatatreeViewRoot();
      var spans = root.getElementsByClassName("jdatatree_content");
      var startline = -1;
      var finishline = -1;
      for (var count = 0; count < spans.length; ++count){
         var span = spans[count];
         var text = JDATATREE.StripTags(span.innerHTML);
         if (text == start){
            startline = count;
         } else if (text == finish){
            finishline = count;
         }
         if (startline >= 0 && finishline >= 0){
            break;
         }
      }
      JdatatreeViewAlphabetize("numbers",startline,finishline);
   }
}
function JdatatreeViewNumber(tree){
   //if (JdatatreeViewNumber.arguments.length < 1 || tree == null || tree == "undefined"){
      //tree = JDATATREE.TREE;
   //}
   var root = JdatatreeViewRoot();
   var spans = root.getElementsByClassName('jdatatree_content');
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
function JdatatreeViewIndex(start,stop){
   if (JdatatreeViewIndex.arguments.length != 2)
      return;
   try{
      start = parseInt(start);
      stop = parseInt(stop);
   } catch(exc){
      return;
   }
   if (start >= stop)
      return;
   var root = JdatatreeViewRoot();
   var spans = root.getElementsByClassName('jdatatree_content');
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
function JdatatreeViewReset(what){
   if (JdatatreeViewReset.arguments.length < 1){
      what = "*";
   }
   JDATATREE.CloseEditBox();
   if (what == "title"){
      JDATATREE.TREE.Query('CREATE FROM HTML ' + JDATATREE.TREE.PrintHtml(true));
      return;
   }
   var ul = document.getElementById(JDATATREE.TREE.ELEMENT_INNER_WRAPPER);
   if (ul){
      JdatatreeViewReset2(ul,what);
   } else {//?
      //document.getElementById(JDATATREE.TREE.ELEMENT_OUTER_WRAPPER).innerHTML = JDATATREE.TREE.VIEW;
   }
   if (what == "*"){
     JDATATREE.TREE.SELECTED_SPAN = null;
     JdatatreeViewCollapse();
   }
}
function JdatatreeViewReset2(ul,what){
   if (what == "*"){
      for (s in JDATATREE.TREE.MOUSE_DRAG_SPANS){
         var span = JDATATREE.TREE.MOUSE_DRAG_SPANS[s];
         JdatatreeUnhighlightSpan(span);
      }
      if (JDATATREE.TREE.SELECTED_SPAN){
         JdatatreeUnhighlightSpan(JDATATREE.TREE.SELECTED_SPAN);
      }
      JDATATREE.TREE.SELECTED_SPAN = null;
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
      ul.innerHTML = ul.innerHTML.split(JDATATREE.SKIP_MESSAGE).join(JDATATREE.TREE.REPLACE);
      while (ul.getElementsByClassName('replace_result').length > 0){
        var spans = ul.getElementsByClassName('replace_result');
        for (var count = 0; count < spans.length; ++count){
          var span = spans[count];
          var parent = span.parentNode;
          while (parent.nodeName.toLowerCase() != 'span' && parent.className != 'jdatatree_content'){
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
   JDATATREE.TREE.ResetReplace();
}
function JdatatreeViewReset2_(ul){
   var spans = ul.getElementsByTagName('span');for (var count = 0; count < spans.length; ++count){var span = spans[count];if (span.style.backgroundColor == 'cyan' || span.style.backgroundColor == 'rgb(0, 255, 255)'){if (span.className.indexOf('searchresult') >= 0){span.style.backgroundColor = '';span.style.color = '';span.className = span.className.split('searchresult').join('');if (JdatatreeViewTrim(span.className) == ''){span.className = '';
}}}}}

function JdatatreeViewTrim(strng){
   var result = strng;var index = 0;for (var count = 0; count < result.length; ++count){var chr = result.charAt(count);if (!chr.match(/\\S/)){++index;continue;} else {break;}}if (index < result.length){result = result.substring(index, result.length);} else {result = '';}for (var count = result.length; count >= 0; --count){var chr = result.charAt(count);if (!chr.match(/\\S/)){continue;} else {if (count < result.length){result = result.substring(0, count + 1);}break;}}return result;
}
function JdatatreeViewGetList(){
   var UL = document.getElementById(this.ELEMENT_INNER_WRAPPER);
   var LI = UL.getElementsByTagName("li")[0];
   var list = LI.getElementsByTagName("ul")[0];
   JDATATREE.TEMP = document.createElement("div");
   JDATATREE.TEMP.innerHTML = "<ul>" + list.innerHTML + "</ul>";
   var ul = JDATATREE.TEMP.getElementsByTagName("ul")[0];
   this.ViewGetList2(ul);//***********************************************************************************
   var result = JDATATREE.TEMP.innerHTML;
   return result;
}
function JdatatreeViewGetList2(ul){
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
         if (arrow && arrow.className && arrow.className == "jdatatree_arrow"){
            child.removeChild(arrow);
         }
         if (span && span.className && span.className == "jdatatree_content"){
            var txt = span.innerHTML;
            child.removeChild(span);
            child.removeChild(ul);
            child.innerHTML = txt;
            child.appendChild(ul);
         }
         JdatatreeViewGetList2(ul);
      }
   }
}

function JdatatreeView(action,newval){
      if (JdatatreeView.arguments.length < 2){
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
      } else if (type == "object" || type == "jdatatreebranch"){
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
function JdatatreeViewIndexOfSpan(searchforspan){
   var root = document.getElementById(this.ELEMENT_INNER_WRAPPER);
   var li = root.getElementsByTagName("li")[0];
   JDATATREE.TEMP = new Array();
   this.ViewSpandex(li,searchforspan,false);
   var result = -1;
   for (var count = 0; count < JDATATREE.TEMP.length; ++count){
      var s = JDATATREE.TEMP[count];
      if (s === searchforspan){
         result = count-1;
         break;
      }
   }
   JDATATREE.TEMP.length = 0;
   JDATATREE.TEMP = null;
   return result;
}
function JdatatreeViewSpandex(li,searchforspan,found){
   var span = this.ViewFindSpanFromLi(li);
   var ul = li.getElementsByTagName("ul")[0];
   JDATATREE.TEMP.push(span);
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
function JdatatreeViewOpenToSpan(span){
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
function JdatatreeScrollToSpan(span){
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
function JdatatreeViewFindSpanFromLi(li){
   var spans = li.getElementsByTagName("span");
   var span;
   for (s in spans){
      if (spans[s].className == "jdatatree_content"){
         span = spans[s];
         break;
      }
   }
   return span;
}
function JdatatreeViewFindLiFromSpan(span){
   var result = null;
   if (span){
      result = span.parentNode;
      while (result.nodeName.toLowerCase() != "li" && result.className != "jdatatree_li"){
         result = result.parentNode;
      }
   }
   return result;
}
function JdatatreeViewFindUlFromSpan(span){
   var result = null;
   if (span){
      var parent = this.ViewFindLiFromSpan(span);
      if (parent){
         result = parent.getElementsByClassName("jdatatree_ul")[0];
      }
   }
   return result;
}
function JdatatreeViewA(link){
   return "<a class='jdatatree_arrow' style='text-decoration:none;' onclick='return clicktree(event);' href='javascript:void(0);'>" + link + "</a>";
}
function JdatatreeViewSpan(text){
   if(text.search("jdatatree_content") >= 0){//********************************************************10.0
       return text;
   }
   return "<span class='jdatatree_content' style='white-space:pre-wrap;padding-left:10px;' onmousedown='return JdatatreeMouseDownSpan(event);' onmouseup = 'return JdatatreeMouseUpSpan(event);' onclick = 'return JdatatreeClickSpan(event);'>" + text + "</span>";
   
}
function JdatatreeViewUl(display){
   return "<ul class='jdatatree_ul' style='list-style-type:none;display:" + display + ";'></ul>";
}
function JdatatreeViewLi(){
      var li = document.createElement("li");
      li.style.whiteSpace = "nowrap";
      li.className = "jdatatree_li";
      return li;
}
function JdatatreeViewListElement(newnode){
   var li = this.ViewLi();
   var a = this.ViewA(newnode.LINK);
   var span = this.ViewSpan(newnode.TEXT);
   var ul = this.ViewUl(newnode.DISPLAY);
   li.innerHTML = a + span + ul;
   return li;
}
function JdatatreeViewOverwrite(newval){ 
   this.SELECTED_SPAN.innerHTML = newval;
}
function JdatatreeViewSibling(newnode){
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
function JdatatreeViewChild(newnode){
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
function JdatatreeViewSwap(node1,node2,parent){
      var temp1 = document.createElement("li");
      var temp2 = document.createElement("li");
      parent.replaceChild(temp1,node1);
      parent.replaceChild(temp2,node2);
      parent.replaceChild(node2,temp1);
      parent.replaceChild(node1,temp2);
}
function JdatatreeViewUp(){
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
function JdatatreeViewDown(){
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
function JdatatreeViewSelright(){
      this.ViewSecright(false);
}
function JdatatreeViewSecright(with_children){
   if (JdatatreeViewSecright.arguments.length < 1 || with_children === ""){
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
function JdatatreeViewRight(with_children,source){
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
         if (JdatatreeViewSecright.arguments.length > 0 && with_children == false && child.getElementsByTagName("ul")[0].hasChildNodes()){
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
function JdatatreeViewLeft(){
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
function JdatatreeView_Left(source){
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
function JdatatreeViewCut(){
   JDATATREE.CLIPBOARD.length = 0;
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
function JdatatreeView_Cut(source){
      var parent = source.parentNode;
      while (parent.nodeName.toLowerCase() != "li"){
         parent = parent.parentNode;
      }
      var child = parent;//li containing span
      while (parent.nodeName.toLowerCase() != "ul"){
         parent = parent.parentNode;//ul containing li
      }
      parent.removeChild(child);
      JDATATREE.CLIPBOARD.push(child);
      if (parent.hasChildNodes() == false){
         var grandparent = parent.parentNode;
         while (grandparent.nodeName.toLowerCase() != "li"){
            grandparent = grandparent.parentNode;
         }
         grandparent.getElementsByTagName("a")[0].innerHTML = this.EMPTY_ICON;
      }
}
function JdatatreeViewCopysec(){
   JDATATREE.CLIPBOARD.length = 0;
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
function JdatatreeViewCopysel(){
   JDATATREE.CLIPBOARD.length = 0;
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
function JdatatreeViewCopy(source,with_children){
      var parent = source.parentNode;
      while (parent.nodeName.toLowerCase() != "li"){
         parent = parent.parentNode;
      }
      var child = parent;//li containing span
      while (parent.nodeName.toLowerCase() != "ul"){
         parent = parent.parentNode;//ul containing li
      }
      if (JdatatreeViewCopy.arguments.length > 1 && with_children == true){
         var clone = child.cloneNode(true);
         if (with_children == false){
            clone.getElementsByTagName("a")[0].innerHTML = this.EMPTY_ICON;
         }
         JDATATREE.CLIPBOARD.push(clone);
      } else {
         var clone = child.cloneNode(true);
         if (clone.getElementsByTagName("ul")){
            clone.getElementsByTagName("ul")[0].innerHTML = "";
         }
         if (with_children == false){
            clone.getElementsByTagName("a")[0].innerHTML = this.EMPTY_ICON;
         }
         JDATATREE.CLIPBOARD.push(clone);
      }
}
function JdatatreeViewPaste(){
   if (this.SELECTED_SPAN && JDATATREE.CLIPBOARD.length > 0){
      var temp = this.SELECTED_SPAN;
      for (var count = 0; count < JDATATREE.CLIPBOARD.length; ++count){
         this.View_Paste(this.SELECTED_SPAN,JDATATREE.CLIPBOARD[count]);
         this.SELECTED_SPAN = this.ViewFindSpanFromLi(JDATATREE.CLIPBOARD[count]);//.getElementsByTagName("span")[0];
      }
      this.SELECTED_SPAN = temp;
   }
}
function JdatatreeView_Paste(source,li){
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
         if (spans[s].className == "jdatatree_content"){
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
function JdatatreeViewRemove(){
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
function JdatatreeGetPopupEditInitiator(){
   return JDATATREE.POPUP_EDIT_INITIATOR;
}
function JdatatreeSetPopupEditInitiator(initiator){
   JDATATREE.POPUP_EDIT_INITIATOR = initiator;
}
function JdatatreeGetType(){
   return this.TYPE;
}
function JdatatreeSetType(type, alt_editor_or_not){ // 7.9.4 used by change, (new, and edit) functions...( ) = commented out
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
         //JDATATREE.ALT_EDITOR = false;
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
         if (JdatatreeSetType.arguments.length > 1 && alt_editor_or_not == true){
            //JDATATREE.ALT_EDITOR = true;
         }
         break;
      default:
         break;
   }
}
function JdatatreeSetTypeConditionally(type, alt_editor_or_not){ // 7.9.4 used by (load and create) functions..( ) = commented out
   // rule: if load text file into html editor, leave as html, don't change other trees on webpage to text
   // just describes rule and contrasts from SetType function
   var current_type = this.TYPE;
   if (current_type == null || current_type == "undefined"){
      current_type = "text"; // default when attribute not set
   }
   current_type = current_type.toLowerCase();
   switch(current_type){ // ignore create or load type, favor preset type (from html or javscript code)
      case "text": 
         //JDATATREE.ALT_EDITOR = false;
         //this.PLAIN_TEXT = true;
         break;
      case "html": 
      case "tree": 
         //this.PLAIN_TEXT = false;
         if (JdatatreeSetTypeConditionally.arguments.length > 1 && alt_editor_or_not == true){
            //JDATATREE.ALT_EDITOR = true;
         }
         break;
      default:
         break;
   }
}
function JdatatreeCloneBranch(){
    var tree = this.TREE;
    var branch = new tree.Branch(this.TEXT, this.TREE);
    for (var count = 0; count < this.CHILDREN.length; ++count){
       branch.AddBranch(this.CHILDREN[count].Clone());
       //branch.CHILDREN.push(this.CHILDREN[count].Clone());
    }
    return branch;
}
function JdatatreeInit(){
    this.ROOT_NODE = this.TreeFromString(this.CONTENT, this.TITLE, this.TYPE);
    this.VIEW = this.GetView();
    this.InsertClickTreeText();
    this.InsertEditTreeText();
    this.RefreshGUI();
}
function JdatatreeGetTreeFromName(name){
   var tree = null;
   if (document.getElementById(name)){
      for (var count = 0; count < JDATATREE.TREES.length; ++count){
         var t = JDATATREE.TREES[count];
         if (t.NAME == name){
            tree = t;
            break;
         }
      }
   }
   return tree;
}
function JdatatreeSetTreeFromName(name){ // 9.6
   if (name != JDATATREE.TREE.NAME){ 
     var tree = JDATATREE.GetTreeFromName(name); 
     if (tree != null){
         JDATATREE.TREE = tree;
		 if (JDATATREE.TREES.length > 1){
		    JdatatreeHighlightTree(name);
		 }
     }
   }
}
function JdatatreeHighlightTree(name){ // 9.6
   try{ 
	  for (t in JDATATREE.TREES){
	     document.getElementById(JDATATREE.TREES[t].NAME).style.border = "1px solid white";
	  }
      var tree = document.getElementById(name);
	  tree.style.border = "1px solid green";
   }catch(exc){
   }
}
function JdatatreeGetFileNameFromPath(path){
    var splits = path.split("/");
    var name = splits[splits.length - 1];
    var names = name.split("\\");
    name = names[names.length - 1];
    return name;
}
function JdatatreeSubmitEdit(html, mode, selectedspan){ 
    try{ 

    var TOOLBARTREE = JDATATREE.GetInitiator(); //JDATATREE.TREE; // .TREE var had problem with popups when multiple trees...couldn't mouse over other tree

    var span = null;
    if (JdatatreeSubmitEdit.arguments.length == 3){
       span = selectedspan;
       TOOLBARTREE.ResetToolbarSelect();
    } else if (document.getElementById('jdatatree_editbox')){
       span = document.getElementById('jdatatree_editbox').span;//source event passed to ShowEditBox
    } else {
       span = JDATATREE.ALT_EDITOR_TARGET_SPAN;
    }
    if (JDATATREE.StringTrim(html) == ""){
       return;
    }

    if (html.indexOf('<table') >= 0){ 
       html = html.split("<strong>").join("<b>").split("</strong>").join("</b>").split("<em>").join("<i>").split("</em>").join("</i>");
    }
    var PLAINTEXT = false;
    if (document.getElementsByName('jdatatree_text_or_html')){//if edited with popup, check if pressed text button
       var radios = document.getElementsByName('jdatatree_text_or_html');
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

    JDATATREE.CloseEditBox();
    if (JDATATREE.ALT_EDITOR == true){
        //JdatatreeRemoveAltEditorInstance(); //************************************errors
    }

    if (JDATATREE.GetBrowser() == "IE"){
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
       if (JDATATREE.StringTrim(html) == ""){
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

    if (JdatatreeSubmitEdit.arguments.length < 2 || mode == "overwrite"){

       TOOLBARTREE.View("overwrite",newnode.TEXT);
    } else if (mode == "sibling") {

       TOOLBARTREE.View("sibling",newnode);
       TOOLBARTREE.UnhighlightSpan(span);
    } else if (mode == "child") {

       TOOLBARTREE.View("child",newnode);
       TOOLBARTREE.UnhighlightSpan(span);
    }
    } catch (exc) {
      if (JDATATREE.REPRESS_ALERTS == false){
        alert(exc);
      }
    }
}
function JdatatreeEvenSpacing(node){
   if (JdatatreeEvenSpacing.arguments.length <= 0){
      node = this.ROOT_NODE;
   }
   this.EvenSpacing2(node);
}
function JdatatreeEvenSpacing2(node){
   try{
   if (node == this.ROOT_NODE){
      node.INDENTATION = 0;
   } else {
      node.INDENTATION = node.GetLevel() * node.TREE.INDENTATION;
   }
   for (var count = 0; count < node.CHILDREN.length; ++count){
      var child = node.CHILDREN[count];
      JdatatreeEvenSpacing2(child);
   }
   } catch (exc) {  }
}
function JdatatreeIndent(node,rightleft,indent_children){
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
        JdatatreeIndent(child,rightleft,indent_children);
      }
   }
}
function JdatatreeCleanHTML(txt){
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
function JdatatreeAddBranch(node,update){
    node.TEXT = JdatatreeCleanHTML(node.TEXT);
    this.CHILDREN.push(node);
    node.PARENT_NODE = this;
    this.LINK = this.TREE.OPEN_ICON;
    if (JdatatreeAddBranch.arguments.length > 1 && update == true){
      //node.INDENTATION = this.INDENTATION + this.TREE.INDENTATION;//problems with left/right
      var index = this.TREE.NODES.indexOf(this) + 1;
      //var index = this.TREE.NODES.indexOf(this) + node.GetIndex() + 1;
      this.TREE.NODES.splice(index, 0, node);
    }
}
function JdatatreeInsertBranch(node, index, update, thisindex){
    try{
        this.CHILDREN.splice(index, 0, node);
        node.PARENT_NODE = this;
        this.LINK = this.TREE.OPEN_ICON;
        if (JdatatreeInsertBranch.arguments.length > 3 && update == true && thisindex >= 0){
          //node.INDENTATION = this.INDENTATION + this.TREE.INDENTATION;//problems with left/right
          //var thisindex = this.TREE.NODES.indexOf(this);
          var macro_index = thisindex + index + 1;
          //var macro_index = this.TREE.NODES.indexOf(this) + node.GetIndex() + 1;//what if node has been removed?index=-1
          this.TREE.NODES.splice(macro_index, 0, node);
        }
    } catch (exc) {
       if (JDATATREE.REPRESS_ALERTS == false) { alert(exc); }
    }
}
function JdatatreeClickTreeText(){
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
function JdatatreeInsertClickTreeText(){
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("id", "tree_script");
    var clicktreeText = document.createTextNode(this.ClickTreeText());
    script.appendChild(clicktreeText);
    document.head.appendChild(script);
}
function JdatatreeRefresh(){
    this.VIEW = this.GetView();
    this.RefreshGUI();
}
function JdatatreeRefreshGUI(){
    if (this && document.getElementById(this.ELEMENT_OUTER_WRAPPER)){
      if (this.VIEW == "undefined"){
        this.VIEW = this.GetView();
      } else if (this.VIEW == null){
        this.VIEW = this.GetView();
      }
      document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.VIEW;
    } else if (document.getElementById(JDATATREE.DEFAULT_OUTER_WRAPPER)){
      document.getElementById(JDATATREE.DEFAULT_OUTER_WRAPPER).innerHTML = this.VIEW;
    }
}
function JdatatreeQueryDocumentation(){
   if (JDATATREE.AltQueryDocumentation != ""){
      JDATATREE.AltQueryDocumentation();
   } else {
	   window.open(JDATATREE.DOCUMENTATION_ADDRESS,"other");
   }
}
function JdatatreeLoadFromTextarea(type, preload){ 
       var text = "";
       if (JdatatreeLoadFromTextarea.arguments.length == 2 && preload != null && preload != "undefined" && preload != ""){
          text = preload;
       }
       if (JDATATREE.ALT_EDITOR == true){
          JDATATREE.ALT_EDITOR = false;
          JDATATREE.TEMP = "RESET ALT EDITOR";
       }
       this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML;
       document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return JdatatreeRestoreView();'>CANCEL</button><button type='button' onclick='return JdatatreeLoadFromTextarea2();'>SUBMIT >>></button><br/><textarea id='jdatatree_load_area' style='white-space:pre;min-width:500px;min-height:500px;width:100%;' class='" + type + "'>" + text + "</textarea>";
       //this.RefreshGUI();
}
function JdatatreeEncodeArrows(txt,spans){//8.0
   var result = txt;
   if (JDATATREE.TREE != null && JDATATREE.TREE != "undefined" && JDATATREE.TREE.TYPE.toLowerCase() != "text"){
      if (JdatatreeEncodeArrows.arguments.length == 0 || spans == true){
         result = txt.split("&amp;nbsp;").join(" ").split("&nbsp;").join(" ").split(" &lt; ").join(" < ").split(" &gt; ").join(" > ").split(" &lt;= ").join(" <= ").split(" &gt;= ").join(" >= ").split(" < ").join(" <span><</span> ").split(" <= ").join(" <span><</span>= ").split(" > ").join(" <span>></span> ").split(" >= ").join(" <span>></span>= ");
         // do not remove blanks from around the arrows, or add blanks inside the spans, or else a second encoding would put double-spans around the first spans
      } else {
         result = txt.split("&amp;nbsp;").join(" ").split("&nbsp;").join(" ").split(" &lt; ").join(" < ").split(" &gt; ").join(" > ").split(" &lt;= ").join(" <= ").split(" &gt;= ").join(" >= ").split(" < ").join(" &lt; ").split(" <= ").join(" &lt;= ").split(" > ").join(" &gt; ").split(" >= ").join(" &gt;= ");
      }
   }
   return result;
}
function JdatatreeLoadFromTextarea2(type){ 
       var c;
	  if (JdatatreeLoadFromTextarea2.arguments.length > 0 && type != null && type != "undefined" && type != ""){
	     c = type;
	  } else {
          c = document.getElementById('jdatatree_load_area').className;
	  }
       var txt = "";
       if (c == "html" && JDATATREE.ALT_EDITOR == true && JdatatreeLoadFromTextarea2.arguments.length < 1){
           txt = JdatatreeGetAltEditorContent();
           //txt = txt.split("span class=\"table\"").join("table").split("span class=\"tbody\"").join("tbody").split("span class=\"tr\"").join("tr").split("span class=\"td\"").join("td").split("%%%%%</span>").join("</tbody>").split("%%%%</span>").join("</td>").split("%%%</span>").join("</tr>").split("%%</span>").join("</table>");
       } else {
           txt = document.getElementById('jdatatree_load_area').value;
           txt = JDATATREE.EncodeArrows(txt,true);//8.0
           if (JDATATREE.TEMP == "RESET ALT EDITOR"){
              JDATATREE.ALT_EDITOR = true;
           }
       }
       JDATATREE.FULL_SCREEN_MODE = false;
       if (JDATATREE.TREE){
          JDATATREE.TREE.SELECTED_SPAN = null;//7.8.7
          JDATATREE.PLEASE_WAIT = true;
          if (c == 'text' || c == '' || c == 'undefined' || c == null){
             JDATATREE.TREE.Query("CREATE FROM TEXT " + txt);
          } else if (c == 'tree' || c == 'file') {
             JDATATREE.TREE.Query("CREATE FROM TREE " + txt);
          } else if (c == 'html' || c == 'list') {
		     if (JDATATREE.ALT_EDITOR == true && typeof(JDATATREE.CleanHTMLFromEditor) == "function"){
                     //txt = JDATATREE.CleanHTMLFromEditor(txt); 
                }
                JDATATREE.TREE.Query("CREATE FROM HTML " + txt); // ************************* indents unindented tables
          } else {}
       } else {
          this.SELECTED_SPAN = null;//7.8.7
          JDATATREE.PLEASE_WAIT = true;
          if (c == 'text' || c == '' || c == 'undefined' || c == null){
             this.Query("CREATE FROM TEXT " + txt);
          } else {
             if (JDATATREE.ALT_EDITOR == true && typeof(JDATATREE.CleanHTMLFromEditor) == "function"){
                txt = JDATATREE.CleanHTMLFromEditor(txt); 
             }
             this.Query("CREATE FROM HTML " + txt);
          }
       }
}
function JdatatreeRestoreView(){
   document.getElementById(JDATATREE.TREE.ELEMENT_OUTER_WRAPPER).innerHTML = JDATATREE.TREE.VIEW;
}
function JdatatreeAutoLoadFromToolbar(){
	var datatree = JDATATREE.TREE? JDATATREE.TREE : this;
	if (datatree){
		datatree.LoadFromToolbar();
	}
}
function JdatatreeLoadFromToolbar(){
       var text = "";
       this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML;
       document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return JdatatreeRestoreView();'>CANCEL</button>" + "<button type='button' onclick='return JdatatreeLoadFromTextarea2(\"text\");'>TEXT FILE</button><button type='button' onclick='return JdatatreeLoadFromTextarea2(\"html\");'>HTML FILE</button><!--<button type='button' onclick='return JdatatreeLoadFromTextarea2(\"tree\");'>.tree.html FILE</button>--><br/><textarea id='jdatatree_load_area' style='white-space:pre;min-width:500px;min-height:500px;width:100%;' ></textarea>";
       //this.RefreshGUI();
}
function JdatatreeEdit(type, text){
    if (type == "html" && JDATATREE.ALT_EDITOR == true){
        JDATATREE.AltLoadFromTextarea(type, text);
    } else {
        this.LoadFromTextarea(type, text);
    }
}
function JdatatreeAutoToolbarSelect(choice){ 
   var TOOLBARTREE = JDATATREE.TREE;
   if (TOOLBARTREE == null || TOOLBARTREE == "undefined"){
      TOOLBARTREE = JDATATREE.TREES[0];
      if (TOOLBARTREE == null || TOOLBARTREE == "undefined"){
         return;
      }
   }
   var combobox;
   var selection;
   if (JdatatreeAutoToolbarSelect.arguments.length > 0 && choice != ""&& choice != null && choice != "undefined"){
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
         JDATATREE.CloseMenu();
         return;
         break;
      case "overwrite":
         if (TOOLBARTREE.MOUSE_DRAG_SPANS.length > 1){
            combobox.selectedIndex = 0;
            return;
         }
         JDATATREE.SetInitiator(TOOLBARTREE);
         if (JDATATREE.ALT_EDITOR == true){
            JdatatreeShowAltEditBox(TOOLBARTREE.CLICK_X, TOOLBARTREE.CLICK_Y, TOOLBARTREE.SELECTED_SPAN,'overwrite');
         } else {
            JdatatreeShowEditBox(TOOLBARTREE.CLICK_X, TOOLBARTREE.CLICK_Y, TOOLBARTREE.SELECTED_SPAN,'overwrite');
         }
         break;
      case "child":
         if (TOOLBARTREE.MOUSE_DRAG_SPANS.length > 1){
            combobox.selectedIndex = 0;
            return;
         }
         JDATATREE.SetInitiator(TOOLBARTREE);
         if (JDATATREE.ALT_EDITOR == true){
            JdatatreeShowAltEditBox(TOOLBARTREE.CLICK_X, TOOLBARTREE.CLICK_Y, TOOLBARTREE.SELECTED_SPAN,'child');
         } else {
            JdatatreeShowEditBox(TOOLBARTREE.CLICK_X, TOOLBARTREE.CLICK_Y, TOOLBARTREE.SELECTED_SPAN,'child');
         }
         break;
      case "sibling":
         if (TOOLBARTREE.MOUSE_DRAG_SPANS.length > 1){
            combobox.selectedIndex = 0;
            return;
         }
         JDATATREE.SetInitiator(TOOLBARTREE);
         if (JDATATREE.ALT_EDITOR == true){
            JdatatreeShowAltEditBox(TOOLBARTREE.CLICK_X, TOOLBARTREE.CLICK_Y, TOOLBARTREE.SELECTED_SPAN,'sibling');
         } else {
            JdatatreeShowEditBox(TOOLBARTREE.CLICK_X, TOOLBARTREE.CLICK_Y, TOOLBARTREE.SELECTED_SPAN,'sibling');
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
         if (JDATATREE.WAIT_IS_OPEN != true){
	    var wait = JDATATREE.Wait();
	    setTimeout(function(){
              var tree = TOOLBARTREE;
              if (tree.MOUSE_DRAG_SPANS.length > 0){
                  JDATATREE.CLIPBOARD.length = 0;
                  TOOLBARTREE.View("copysel");
              }
              if (JDATATREE.GetBrowser() == "IE"){
                  if (document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME)){
                     document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME).select();
                  }
              }
              JDATATREE.CloseWaitBox(wait);
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
         if (JDATATREE.WAIT_IS_OPEN != true){
	    var wait = JDATATREE.Wait();
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
              if (JDATATREE.GetBrowser() == "IE"){
                  if (document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME)){
                     document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME).select();
                  }
              }
              JDATATREE.CloseWaitBox(wait);
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
         if (JDATATREE.CLIPBOARD.length == 0 || !TOOLBARTREE.SELECTED_SPAN){ 
            combobox.selectedIndex = 0; 
            return;
         }
         if (JDATATREE.WAIT_IS_OPEN != true){
	    var wait = JDATATREE.Wait();
	    setTimeout(function(){
              var tree = TOOLBARTREE;
              var index = 0;
              var index_above = 0;
              if (tree && tree.SELECTED_SPAN && JDATATREE.CLIPBOARD.length > 0){
                TOOLBARTREE.View("paste");
                JDATATREE.CLIPBOARD.length = 0;
              }
              if (JDATATREE.GetBrowser() == "IE"){
                  if (document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME)){
                     document.getElementById(TOOLBARTREE.TOOLBAR_SEARCHBOX_NAME).select();
                  }
              }
              JDATATREE.CloseWaitBox(wait);
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
function JdatatreeMouseDownSpan(evt,span){
   if (!evt){
      evt = window.event;
   }
   JDATATREE.MOUSE_DOWN_X = evt.clientX;
   JDATATREE.MOUSE_DOWN_Y = evt.clientY;
   var source;
   if (JdatatreeMouseDownSpan.arguments.length > 1 && span != null && span != "undefined"){
      source = span;
   } else {
      source = evt.target? evt.target : evt.srcElement;
      while (source.nodeName.toLowerCase() != "span" || source.className != "jdatatree_content"){
           source = source.parentNode;
      }
   }
   if (source.nodeName.toLowerCase() == "span"){
      if (source.parentNode.nodeName.toLowerCase() == "li" && source.parentNode.parentNode.nodeName.toLowerCase() == "ul" && source.parentNode.parentNode.id == JDATATREE.TREE.ELEMENT_INNER_WRAPPER && source.parentNode.parentNode.parentNode.nodeName.toLowerCase() == "div" && source.parentNode.parentNode.parentNode.id == JDATATREE.TREE.ELEMENT_OUTER_WRAPPER){
          return;
      } else {
          var tree = JDATATREE.TREE;
          if (tree){
             tree.MOUSE_DOWN_SPAN = source;
          }
      }
   }
}
function JdatatreeMouseUpSpan(evt,span){
   if (!evt){
      evt = window.event;
   }
   evt.stopPropagation();//*****************************************************************************************************10.0
   JDATATREE.MOUSE_UP_X = evt.clientX;
   JDATATREE.MOUSE_UP_Y = evt.clientY;
   var source;
   if (JdatatreeMouseUpSpan.arguments.length > 1 && span != null && span != "undefined"){
      source = span;
   } else {
      source = evt.target? evt.target : evt.srcElement;
      while (source.nodeName.toLowerCase() != "span" || source.className != "jdatatree_content"){
           source = source.parentNode;
      }
   }
   //unhighlight
   if (JDATATREE.TREE.SELECTED_SPAN){
      JdatatreeUnhighlightSpan(JDATATREE.TREE.SELECTED_SPAN);
   }
   if (JDATATREE.TREE.MOUSE_DRAG_SPANS){
      for (s in JDATATREE.TREE.MOUSE_DRAG_SPANS){
         JdatatreeUnhighlightSpan(JDATATREE.TREE.MOUSE_DRAG_SPANS[s]);
      }
   }
   JDATATREE.TREE.MOUSE_DRAG_SPANS.length = 0;
   if (source.nodeName.toLowerCase() == "span"){
      if (source.parentNode.nodeName.toLowerCase() == "li" && source.parentNode.parentNode.nodeName.toLowerCase() == "ul" && source.parentNode.parentNode.id == JDATATREE.TREE.ELEMENT_INNER_WRAPPER && source.parentNode.parentNode.parentNode.nodeName.toLowerCase() == "div" && source.parentNode.parentNode.parentNode.id == JDATATREE.TREE.ELEMENT_OUTER_WRAPPER){
          return;
      } else {
          var tree = JDATATREE.TREE;
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
                      var content = li.getElementsByClassName('jdatatree_content')[0];
                      if (content == start){
                         startindex = count;
                      } else if (content == stop){
                         stopindex = count;
                         break;
                      }
                   }
                   for (var count = startindex; count <= stopindex; ++count){
                      var highlightspan = parent.childNodes[count].getElementsByClassName('jdatatree_content')[0];
                      JdatatreeHighlightSpan(highlightspan);
                      tree.MOUSE_DRAG_SPANS.push(highlightspan);
                   }
                } else {
                   //unhighlight...already done
                }
}}}}}
function JdatatreeClickSpan(evt,span){ 
   if (JDATATREE.TREE.SELECTED_SPAN){
      JdatatreeUnhighlightSpan(JDATATREE.TREE.SELECTED_SPAN);
   }
   for (var count = 0; count < JDATATREE.TREE.MOUSE_DRAG_SPANS.length; ++count){
       JdatatreeUnhighlightSpan(JDATATREE.TREE.MOUSE_DRAG_SPANS[count]);
   }   
   if (!evt){
      evt = window.event;
   }
   JDATATREE.MOUSE_DOWN_X = evt.clientX;
   JDATATREE.MOUSE_DOWN_Y = evt.clientY;
   var source;
   if (JdatatreeClickSpan.arguments.length > 1 && span != null && span != "undefined"){
      source = span;
   } else {
      source = evt.target? evt.target : evt.srcElement;
      while (source.nodeName.toLowerCase() != "span" || source.className != "jdatatree_content"){
           source = source.parentNode;
      }
   }
   if (source.nodeName.toLowerCase() == "span"){
      if (source.parentNode.nodeName.toLowerCase() == "li" && source.parentNode.parentNode.nodeName.toLowerCase() == "ul" && source.parentNode.parentNode.id == JDATATREE.TREE.ELEMENT_INNER_WRAPPER && source.parentNode.parentNode.parentNode.nodeName.toLowerCase() == "div" && source.parentNode.parentNode.parentNode.id == JDATATREE.TREE.ELEMENT_OUTER_WRAPPER){
          JDATATREE.TREE.SELECTED_SPAN = null; // ***
          return;
      } else {
          JDATATREE.TREE.SELECTED_SPAN = source;
          JDATATREE.TREE.CLICK_X = evt.clientX;
          JDATATREE.TREE.CLICK_Y = evt.clientY;
          if (source.innerHTML.indexOf('search_result') >= 0){
              var search_result = source.getElementsByTagName('span')[0];
              if (search_result.className && search_result.className == 'search_result'){
                  source.innerHTML = search_result.innerHTML;
              }
          }
          JdatatreeHighlightSpan(source);
          JDATATREE.TREE.MOUSE_DRAG_SPANS.length = 0;
          JDATATREE.TREE.MOUSE_DRAG_SPANS.push(source);
          JDATATREE.GoToFile(source);
      }
   }
}
function JdatatreeGoToFile(line){
   if (JDATATREE.GO_TO_FILE != null && JDATATREE.GO_TO_FILE != "undefined" && JDATATREE.GO_TO_FILE != ""){
      JDATATREE.TEMP = line.innerHTML;
      eval(JDATATREE.GO_TO_FILE);
   }
}
function JdatatreeHighlightSpan(span){
   if (!span.className || span.className != "jdatatree_content"){
      var prnt = span.parentNode;
      if (prnt.nodeName.toLowerCase() == "a"){
          prnt = prnt.parentNode;
      }
      var contents = prnt.getElementsByTagName('span');
      for (var count2 = 0; count2 < contents.length; ++count2){
         var content = contents[count2];
         if (content.className && content.className == "jdatatree_content"){
            span = content;
            break;
         }
      }
   }
   span.style.backgroundColor = JDATATREE.TREE.HIGHLIGHT_BACKGROUND_COLOR;
   span.style.color = JDATATREE.TREE.HIGHLIGHT_TEXT_COLOR;
}
function JdatatreeUnhighlightSpan(span){
   if (!span.className || span.className != "jdatatree_content"){
      var prnt = span.parentNode;
      if (prnt.nodeName.toLowerCase() == "a"){
          prnt = prnt.parentNode;
      }
      var contents = prnt.getElementsByTagName('span');
      for (var count2 = 0; count2 < contents.length; ++count2){
         var content = contents[count2];
         if (content.className && content.className == "jdatatree_content"){
            span = content;
            break;
         }
      }
   }
   span.style.backgroundColor = "";
   span.style.color = "";
}
function JdatatreeEditTreeText(){
    if (document.getElementById("edit_tree_script")){
        document.head.removeChild(document.getElementById("edit_tree_script"));
    }
    var submitfromtoolbar = "function jdatatree_submit_from_toolbar(e){ evt = e || window.event; if (!evt){ evt = window.event; } evt.preventDefault? evt.preventDefault() : evt.returnValue = false; var source = evt.target? evt.target : evt.srcElement; var html = document.getElementById('jdatatree_editor').value; var mode = document.getElementById('jdatatree_editbox_button').innerHTML;/**document.getElementById(JDATATREE.TREE.TOOLBAR_SELECT_NAME).options[document.getElementById(JDATATREE.TREE.TOOLBAR_SELECT_NAME).selectedIndex].value;**/ JdatatreeSubmitEdit(html,mode,JDATATREE.TREE.SELECTED_SPAN);   }";
    var altsubmitfromtoolbar = "function jdatatree_alt_submit_from_toolbar(e){ evt = e || window.event; if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;var source = evt.target? evt.target : evt.srcElement;var html = JdatatreeGetAltEditorContent();var mode = document.getElementById('jdatatree_editbox_button').innerHTML;JdatatreeSubmitEdit(html,mode,JDATATREE.TREE.SELECTED_SPAN);}";
    /** deprecated
    var edittree = "function edittree(e){ evt = e || window.event; JDATATREE.REPRESS_ALERTS = true;JDATATREE.PLEASE_WAIT = false;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;var source = evt.target? evt.target : evt.srcElement;JdatatreeShowEditBox(evt.clientX, evt.clientY, source);}";
    var submitedit = "function jdatatree_submit_edit(e){evt = e || window.event;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;var source = evt.target? evt.target : evt.srcElement;var html = document.getElementById('jdatatree_editor').value;JdatatreeSubmitEdit(html);}";
    var insertsibling = "function jdatatree_insert_sibling(e){evt = e || window.event;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;JdatatreeSubmitEdit(document.getElementById('jdatatree_editor').value,'sibling');}";
    var insertchild = "function jdatatree_insert_child(e){evt = e || window.event;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;JdatatreeSubmitEdit(document.getElementById('jdatatree_editor').value,'child');}";
    var remove = "function jdatatree_remove_node(e){evt = e || window.event;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;JdatatreeSubmitEdit(document.getElementById('jdatatree_editor').value,'remove');}";
    var altedittree = "function edittree(e){evt = e || window.event;JDATATREE.REPRESS_ALERTS = true;JDATATREE.PLEASE_WAIT = false;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;var source = evt.target? evt.target : evt.srcElement;JdatatreeShowAltEditBox(evt.clientX, evt.clientY, source);}";
    var altsubmitedit = "function jdatatree_submit_edit(e){evt = e || window.event;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;JdatatreeSubmitEdit(JdatatreeGetAltEditorContent(),'overwrite');}";
    var altinsertsibling = "function jdatatree_insert_sibling(e){evt = e || window.event;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;JdatatreeSubmitEdit(JdatatreeGetAltEditorContent(),'sibling');}";
    var altinsertchild = "function jdatatree_insert_child(e){evt = e || window.event;if (!evt){evt = window.event;}evt.preventDefault? evt.preventDefault() : evt.returnValue = false;JdatatreeSubmitEdit(JdatatreeGetAltEditorContent(),'child');}";
    if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text" && JDATATREE.ALT_EDITOR == false){
       return edittree + submitedit + insertchild + insertsibling + remove + submitfromtoolbar;
    } else if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() != "text" && JDATATREE.ALT_EDITOR == true){
       return altedittree + altsubmitedit + altinsertchild + altinsertsibling + remove + altsubmitfromtoolbar;
    } else if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text" && JDATATREE.ALT_EDITOR == true){ // 7.9.4
       return altedittree + altsubmitedit + altinsertchild + altinsertsibling + remove + altsubmitfromtoolbar;
    } else {
       return edittree + submitedit + insertchild + insertsibling + remove + submitfromtoolbar;
    }
    **/
    return submitfromtoolbar + altsubmitfromtoolbar;
}
function JdatatreeInsertEditTreeText(){
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
function JdatatreeResetEditBox(){
	document.getElementById('jdatatree_editor').innerHTML = "";
}
function JdatatreeShowEditBox(x, y, source, toolbar) { 
    try{
    //JDATATREE.CloseEditBox();
    var datatree;
    if (JDATATREE.TREE){
       datatree = JDATATREE.TREE;
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
    if (JDATATREE.REPRESS_EDITS == true) { return; }
    while (source.nodeName.toLowerCase() != "span" || source.className != "jdatatree_content"){
        source = source.parentNode;
    }
    if (document.getElementById('jdatatree_editbox')){ 
        document.getElementById('jdatatree_editbox').parentNode.removeChild(document.getElementById('jdatatree_editbox'));
    }
        var box = document.createElement('div');
        box.id = 'jdatatree_editbox';
        box.span = source;
        box.style.position = "absolute";
        box.style.zIndex = "100";
        box.style.display = "none";
        box.style.height = "100px";
        box.style.width = "400px";
        box.style.border = JDATATREE.POPUP_BORDER;
        box.style.overflow = "auto";
        box.style.borderRadius = "20px";
        box.style.padding = "10px 10px 0px 10px";
        box.style.background = JDATATREE.POPUP_BACKGROUND;
        //box.style.background = "white url('" + JDATATREE.POPUP_BACKGROUND + "') repeat scroll left top";
        var datatree;
        var radio = "";
        var info = "";
	var reset = "<button type='button' onclick='return JdatatreeResetEditBox();'>reset</button>";
	var equation = "";
	var delimiter = "&nbsp;&nbsp;&nbsp;";
        if (datatree){
           if (datatree.TYPE != "text"){ // 7.9.4
              radio = "<input type='radio' name='jdatatree_text_or_html' value='text'>text</input><input type='radio' name='jdatatree_text_or_html' value='html' checked='checked'>html</input>";
	      equation = "<a href='https://codecogs.com/latex/eqneditor.php' target='_blank'>equation</a>";
              //info = "&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' onclick='return JDATATREE.ShowPopupBox(\"In HTML, these characters are restricted: < and > . To use them, select the text option (converts entire line to plain text), or leave spaces around them like this: x > 0. However, none of these are guaranteed to work, and the best solution is to replace them with words like less than and greater than, or write math with an equation editor.\");'>?</a>";
           }
        }
        if (JdatatreeShowEditBox.arguments.length == 4){
           var displaytext = JDATATREE.StringTrim(source.innerHTML);
           if (toolbar == "insert"){
               displaytext = "";
           }
           box.innerHTML = "<table><tr><td><span onclick='return JdatatreeCloseEditBox();' id='jdatatree_close_editorbutton' style='position:relative;color:red;font-size:1em;border:1px dotted red;padding:3px;'>X</span><label>&nbsp;&nbsp;&nbsp;</label>" + delimiter + reset + delimiter + radio + info + delimiter + equation + delimiter + "<button type='button' id='jdatatree_editbox_button' onclick='return jdatatree_submit_from_toolbar(event);'>" + toolbar + "</button></td></tr><tr><td><textarea id='jdatatree_editor' rows='3' cols='40'>" + displaytext + "</textarea></td></tr></table>";
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
function JdatatreeSwapBranches(parnt, first, second, tree, third, fourth){
   var temp = parnt.CHILDREN[first];
   parnt.CHILDREN[first] = parnt.CHILDREN[second];
   parnt.CHILDREN[second] = temp;
   temp = tree.NODES[third];
   tree.NODES[third] = tree.NODES[fourth];
   tree.NODES[fourth] = temp;
}
function JdatatreeResetToolbarSelect(){
   var datatree = this? this : JDATATREE.TREE;
   if (document.getElementById(datatree.TOOLBAR_SELECT_NAME))
   {
      document.getElementById(datatree.TOOLBAR_SELECT_NAME).selectedIndex = 0;
   }
}
function JdatatreeCountAllChildrenOfNode(node,result){ // not working
   if (JdatatreeCountAllChildrenOfNode.arguments.length == 1){
      result = 0;
   }
   for (var count = 0; count < node.CHILDREN.length; ++count){
      var newnode = node.CHILDREN[count];
      ++result;
      for (var count2 = 0; count2 < newnode.CHILDREN.length; ++count2){
         var c = newnode.CHILDREN[count2];
         result += JdatatreeCountAllChildrenOfNode(c);
      }
   }
   return result;
}
function JdatatreeGetMacroIndexForNode(node){ //not working
   var datatree;
   if (JDATATREE.TREE){
      datatree = JDATATREE.TREE;
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
          result += JdatatreeCountAllChildrenOfNode(sib);
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
               result += JdatatreeCountAllChildrenOfNode(sib);
            }
            parent = parent.PARENT_NODE;
         } else {
            break;
         }
       }
   }
   return result;
}
function JdatatreeReplaceBranch(index, newnode){
    try{
        var oldnode = JDATATREE.TREE.NODES[index];
        for (c in oldnode.CHILDREN){
           oldnode.CHILDREN[c].PARENT_NODE = newnode;
        }
        oldnode.PARENT_NODE.CHILDREN.splice(oldnode.GetIndex(), 1, newnode);
        JDATATREE.TREE.NODES.splice(index - 1, 1, newnode);
    } catch (exc) {
       if (JDATATREE.REPRESS_ALERTS == false) { alert(exc); }
    }
}
function JdatatreeCloseEditBox() {
        var box = document.getElementById("jdatatree_editbox");
        if (box) {
            box.style.display = "none";
            box.parentNode.removeChild(box);
        }
        if (document.getElementById(JDATATREE.TREE.TOOLBAR_SELECT_NAME)){
           document.getElementById(JDATATREE.TREE.TOOLBAR_SELECT_NAME).selectedIndex = 0;
        }
}
function JdatatreeAllowBackspace(){
   JDATATREE.BACKSPACE_ALLOWED = true;
}
function JdatatreeDisallowBackspace(){
   JDATATREE.BACKSPACE_ALLOWED = false;
}
function JdatatreeAutoSearchMacro(evt){
     if (!evt){
        evt = window.event;
     }
     if (evt){
        evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
     }
     var datatree = JDATATREE.TREE? JDATATREE.TREE : this;
	var searchterm = document.getElementById(datatree.TOOLBAR_MACRO_SEARCHBOX_NAME).value;
     var case_sensitive = "";
     if (document.getElementById("jdatatree_case_files") && document.getElementById("jdatatree_case_files").checked){
        case_sensitive = "CASE_SENSITIVE ";
     }
     var exact_matches = "";
     if (document.getElementById("jdatatree_exact_files") && document.getElementById("jdatatree_exact_files").checked){
        exact_matches = "EXACT_MATCHES ";
     }
	if (searchterm != null && searchterm != 'undefined' && searchterm != ""){
	   if (datatree){
		   datatree.Query("SEARCH FILES " + case_sensitive + exact_matches + "FOR " + searchterm);
	   }
	}
}
function JdatatreeSearchMacro(searchterm,regular_expression,case_sensitive,exact_matches){
   try{
   searchterm = JDATATREE.StringTrim(searchterm);
   if (regular_expression == null || regular_expression == "undefined"){
      regular_expression = false;
   }
   if (case_sensitive == null || case_sensitive == "undefined"){
      case_sensitive = false;
   }
   if (exact_matches == null || exact_matches == "undefined"){
      exact_matches = false;
   }
   JDATATREE.ResetMacro();
   if (JDATATREE.SITEMAP == "" || JDATATREE.SITEMAP == null || JDATATREE.SITEMAP == "undefined"){
       alert("Error: the sitemap has not been defined.");
       return;
   }
   var SAVE_REPRESS_ALERTS = JDATATREE.REPRESS_ALERTS;
   JDATATREE.REPRESS_ALERTS = true;
   JDATATREE.PLEASE_WAIT = false;
   var rawfiles = JDATATREE.SITEMAP.split(",");
   var files = new Array();
   var LIMIT_FOR_QUICK_SEARCH = 50;
   var LIMIT = LIMIT_FOR_QUICK_SEARCH;
   for (var count = 0; count < rawfiles.length; ++count){
       var filename = JDATATREE.StringTrim(rawfiles[count]);
       if (JDATATREE.StringTrim(filename) != ""){
          files.push(filename);
       }
   }
   //var temptree = new JDATATREE.Tree();
   for (var count = 0; count < files.length; ++count){
      if (count > LIMIT){
	  if (window.confirm("Jdatatree has searched " + count + " trees and found " + JDATATREE.MACRO_SEARCH_RESULTS.length + " results.\n Search another " + LIMIT_FOR_QUICK_SEARCH + " trees?")){
		  LIMIT += LIMIT_FOR_QUICK_SEARCH;
	  } else {
             break;
	  }
      }
      var txt = JdatatreeReadFile(files[count]);
      if (txt != null && txt != "undefined" && txt != ""){
		 //txt = JDATATREE.StripTagsPHPJS(txt);
         try{
         if (regular_expression == true){
            var pattern = "txt.match(" + searchterm + ")";
            if (eval(pattern)){
               JDATATREE.MACRO_SEARCH_RESULTS.push(files[count]);
            }
         } else if (case_sensitive == true && exact_matches == true){
            var pattern = "txt.match(/\\b" + searchterm + "\\b/)";
            if ( eval(pattern) ){
               JDATATREE.MACRO_SEARCH_RESULTS.push(files[count]);
            }
         } else if (case_sensitive == true){
            var pattern = "txt.match(/" + searchterm + "/)";
            if ( eval(pattern) ){
               JDATATREE.MACRO_SEARCH_RESULTS.push(files[count]);
            }
         } else if (exact_matches == true){
            var pattern = "txt.match(/\\b" + searchterm + "\\b/i)";
            if (eval(pattern)){
               JDATATREE.MACRO_SEARCH_RESULTS.push(files[count]);
            }
         } else if (txt.toLowerCase().indexOf(searchterm.toLowerCase()) >= 0){
            JDATATREE.MACRO_SEARCH_RESULTS.push(files[count]);
         }
         }catch(exc){alert(exc);}
      }
   }
   JDATATREE.REPRESS_ALERTS = SAVE_REPRESS_ALERTS;
   var datatree = JDATATREE.TREE? JDATATREE.TREE : this;
   if (datatree && datatree.HAS_ERRORS == true){
       datatree.Query("REPLAY");
   }
   return JDATATREE.MACRO_SEARCH_RESULTS.length;
   } catch(exc) { return 0; }
}
function JdatatreeResetMacro(){
   JDATATREE.MACRO.length = 0;
   JDATATREE.MACRO_SEARCH_RESULTS.length = 0;
}
function JdatatreePreventDefault(evt){
   if (!evt){
      evt = window.event;
   }
   var keycode = evt.which || evt.keyCode || evt.charCode;
   var keypressed = String.fromCharCode(keycode);
   if (keycode == 13){
      if (JDATATREE.GetBrowser().toLowerCase() != "edge"){
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
function JdatatreeSetToolbar(toolbar_tools){
   toolbar_tools = toolbar_tools.toLowerCase();
   JDATATREE.TREE.TOOLBAR_TOOLS = toolbar_tools;
   var TOOLBAR = "";
   JDATATREE.TREE = this;
   var trimmed = JDATATREE.StringTrim(toolbar_tools);
   if (trimmed.toUpperCase() == 'WRAP'){
                       JDATATREE.TOOLBAR_STYLE = JDATATREE.TOOLBAR_WRAP_STYLE;
                       toolbar_tools = JDATATREE.DEFAULT_TOOLBAR_TOOLS;
   } else if (trimmed.toUpperCase() == 'NOWRAP'){
                       JDATATREE.TOOLBAR_STYLE = JDATATREE.TOOLBAR_NOWRAP_STYLE;
                       toolbar_tools = JDATATREE.DEFAULT_TOOLBAR_TOOLS;
   } else if (trimmed.toUpperCase() == 'DEFAULT'){
         JDATATREE.TOOLBAR_FREESTYLE = JDATATREE.DEFAULT_TOOLBAR_FREESTYLE;
         toolbar_tools = JDATATREE.DEFAULT_TOOLBAR_TOOLS;
   }
   if (JdatatreeSetToolbar.arguments.length > 0 && trimmed != "" && trimmed != null && trimmed != "undefined"){
       TOOLBAR = "<div align='" + JDATATREE.TOOLBAR_ALIGN + "' id='" + this.TOOLBAR_NAME + "' onmouseover='return JdatatreeSetTreeFromName(\"" + this.NAME + "\");' oncontextmenu='return JdatatreeRightClick();' style='" + JDATATREE.TOOLBAR_STYLE + "' >";
       var tools = toolbar_tools.split(',');
       tools.push('status');
       for (var count = 0; count < tools.length; ++count){
          var tool = JDATATREE.StringTrim(tools[count]);
          var separator = JDATATREE.TOOLBAR_SEPARATOR;
          switch(tool){
             case "expand":
                TOOLBAR += "<button onclick='return JDATATREE.Expand(event);'>EXPAND</button>";
                TOOLBAR += separator;
                break;
             case "collapse":
                TOOLBAR += "<button onclick='return JDATATREE.Collapse(event);'>COLLAPSE</button>";
                TOOLBAR += separator;
                break;
             case "replace":
                TOOLBAR += "<span style='white-space:nowrap;'><input type='text' size='3' title='search for' id='" + this.TOOLBAR_REPLACE_NAME + "' onkeydown='return JdatatreePreventDefault(event);' onmouseover='return JdatatreeAllowBackspace();' onmouseout='return JdatatreeDisallowBackspace();' /><input type='text' size='3' title='replace with' id='" + this.TOOLBAR_REPLACE_WITH_NAME + "' onkeydown='return JdatatreePreventDefault(event);' onmouseover='return JdatatreeAllowBackspace();' onmouseout='return JdatatreeDisallowBackspace();' /><button title='press first to search, then press to replace' onclick='return JDATATREE.Replace(event);'>REPLACE</button><button onclick='return JDATATREE.Skip(event);'>SKIP</button></span>";
                TOOLBAR += separator;
                break;
             case "search":
                TOOLBAR += "<span style='white-space:nowrap;'><input type='text' id='" + this.TOOLBAR_SEARCHBOX_NAME + "' onkeydown='return JdatatreePreventDefault(event);' onmouseover='return JdatatreeAllowBackspace();' onmouseout='return JdatatreeDisallowBackspace();' /><button onclick='return JDATATREE.Search(event);'>SEARCH</button></span>";
                TOOLBAR += separator;
                break;
             case "search_horizontal":
                TOOLBAR += "<span style='white-space:nowrap;'><input type='text' id='" + this.TOOLBAR_SEARCHBOX_NAME + "' onkeydown='return JdatatreePreventDefault(event);' onmouseover='return JdatatreeAllowBackspace();' onmouseout='return JdatatreeDisallowBackspace();' /><button onclick='return JDATATREE.Search(event);'>SEARCH</button><input type='checkbox' id='jdatatree_case'>case&nbsp;</input><input type='checkbox' id='jdatatree_exact'>exact&nbsp;</input></span>";
                TOOLBAR += separator;
                break;
             case "search_vertical":
                TOOLBAR += "<span style='white-space:nowrap;'><table style='display:inline;'><tr><td><input type='text' id='" + this.TOOLBAR_SEARCHBOX_NAME + "' onkeydown='return JdatatreePreventDefault(event);' onmouseover='return JdatatreeAllowBackspace();' onmouseout='return JdatatreeDisallowBackspace();' /></td><td><button onclick='return JDATATREE.Search(event);'>SEARCH</button></td></tr><tr><td><input type='checkbox' id='jdatatree_case'>case</input></td><td><input type='checkbox' id='jdatatree_exact'>exact</input></td></tr></table></span>";
                TOOLBAR += separator;
                break;
             case "next":
                TOOLBAR += "<button onclick='return JDATATREE.Next(event);'>NEXT</button>";
                TOOLBAR += separator;
                break;
             case "previous":
                TOOLBAR += "<button onclick='return JDATATREE.Previous(event);'>PREVIOUS</button>";
                TOOLBAR += separator;
                break;
	     case "searchmacro":
 	     case "macrosearch":
	 		   TOOLBAR += "<span style='white-space:nowrap;'><input type='text' id='" + this.TOOLBAR_MACRO_SEARCHBOX_NAME + "' onkeydown='return JdatatreePreventDefault(event);' onmouseover='return JdatatreeAllowBackspace();' onmouseout='return JdatatreeDisallowBackspace();' /><button onclick='return JDATATREE.AutoSearchMacro(event);'>SEARCH FILES</button></span>";
	 		   TOOLBAR += separator;
                   break;
           case "searchmacro_horizontal":
           case "macrosearch_horizontal":
                   TOOLBAR += "<span style='white-space:nowrap;'><input type='text' id='" + this.TOOLBAR_MACRO_SEARCHBOX_NAME + "' onkeydown='return JdatatreePreventDefault(event);' onmouseover='return JdatatreeAllowBackspace();' onmouseout='return JdatatreeDisallowBackspace();' /><button onclick='return JDATATREE.AutoSearchMacro(event);'>SEARCH FILES</button><input type='checkbox' id='jdatatree_case_files'>case&nbsp;</input><input type='checkbox' id='jdatatree_exact_files'>exact&nbsp;</input></span>";
                   TOOLBAR += separator;
                   break;
             case "alphabetize":
             case "sort":
                TOOLBAR += "<span style='white-space:nowrap;'><label>from</label><input type='text' size='2' id='" + this.TOOLBAR_LOWER_BOUND_NAME + "' onkeydown='return JdatatreePreventDefault(event);' onmouseover='return JdatatreeAllowBackspace();' onmouseout='return JdatatreeDisallowBackspace();' /><label>to</label><input type='text' size='2' id='" + this.TOOLBAR_UPPER_BOUND_NAME + "' onkeydown='return JdatatreePreventDefault(event);' onmouseover='return JdatatreeAllowBackspace();' onmouseout='return JdatatreeDisallowBackspace();' /><button onclick='return JDATATREE.Alphabetize(event);'>ALPHABETIZE</button></span>";
                TOOLBAR += separator;
                break;
             case "input":
             case "query":
                TOOLBAR += "<span style='white-space:nowrap;'><textarea rows='" + JDATATREE.QUERYWINDOW_ROWS + "' cols='" + JDATATREE.QUERYWINDOW_COLS + "' type='text' id='" + this.TOOLBAR_QUERYWINDOW_NAME + "' onkeydown='return JdatatreePreventDefault(event);' onmouseover='return JdatatreeAllowBackspace();' onmouseout='return JdatatreeDisallowBackspace();'></textarea><button title='Jdatatree input commands' onclick='return JDATATREE.Query(event);' oncontextmenu='return JDATATREE.QueryDocumentation();'>INPUT</button></span>";
                TOOLBAR += separator;
                break;
             case "number":
             case "numbers":
                TOOLBAR += "<button onclick='return JDATATREE.Number(event);'>NUMBER</button>";
                TOOLBAR += separator;
                break;
             case "reset":
             case "clear":
                TOOLBAR += "<button onclick='return JDATATREE.Reset(event);'>RESET</button>";
                TOOLBAR += separator;
                break;
             case "save":
			 case "savemin":
			 case "save_min":
                TOOLBAR += "<button onclick='return JDATATREE.Save(event);'>SAVE</button>";
                TOOLBAR += separator;
                break;
			 case "savemax":
	         case "save_max":
                TOOLBAR += "<button onclick='return JDATATREE.SaveMax(event);'>SAVE</button>";
                TOOLBAR += separator;
                break;
  	     case "load":
                TOOLBAR += "<button onclick='return JDATATREE.LoadFromToolbar(event);'>LOAD</button>";
                TOOLBAR += separator;
                break;
             case "text":
                TOOLBAR += "<button onclick='return JDATATREE.PrintText(event);' title='copy and paste to save your text changes'>TEXT</button>";
                TOOLBAR += separator;
                break;
             case "html":
                TOOLBAR += "<button onclick='return JDATATREE.PrintHtml(event);' title='copy and paste to save your text changes'>HTML</button>";
                TOOLBAR += separator;
                break;
             case "custom":
                TOOLBAR += "<button id='jdatatree_custom_button' onclick='return JDATATREE.Custom(event);' title='" + JDATATREE.CUSTOM_TOOLTIP + "' >" + JDATATREE.CUSTOM_VALUE + "</button>";
                break;
             case "custom2":
                TOOLBAR += "<button id='jdatatree_custom2_button' onclick='return JDATATREE.Custom2(event);' title='" + JDATATREE.CUSTOM2_TOOLTIP + "' >" + JDATATREE.CUSTOM2_VALUE + "</button>";
                break;
             case "freestyle":
                TOOLBAR += JDATATREE.TOOLBAR_FREESTYLE;
                break;
	     case "freestyle2":
		   TOOLBAR += JDATATREE.TOOLBAR_FREESTYLE2;
		   break;
             case "edit":
                TOOLBAR += "<select id='" + this.TOOLBAR_SELECT_NAME + "' onchange='return JDATATREE.ToolbarSelect();'><option selected='selected'>EDIT</option><option value='overwrite'>overwrite</option><option value='child'>child</option><option value='sibling'>sibling</option><option value='up'>move up</option><option value='down'>move down</option><option value='selection right'>selection right</option><option value='section right'>section right</option><option value='left'>move left</option><option value='copy selected'>copy selected</option><option value='copy w/children'>copy w/children</option><option value='cut'>cut</option><option value='paste'>paste</option><option value='remove'>remove</option><option value='undo'>undo</option><option value='redo'>redo</option></select>";
                TOOLBAR += separator;
                break;
             case "edit_with_popups":
                TOOLBAR += "<select id='" + this.TOOLBAR_SELECT_NAME + "' onclick='return JDATATREE.ToolbarSelect();'><option selected='selected'>EDIT</option><option value='overwrite'>overwrite</option><option value='child'>child</option><option value='sibling'>sibling</option><option value='up'>move up</option><option value='down'>move down</option><option value='right_with_popups'>move right</option><option value='left'>move left</option><option value='copy selected'>copy selected</option><option value='copy w/children'>copy w/children</option><option value='cut'>cut</option><option value='paste'>paste</option><option value='remove'>remove</option><option value='undo'>undo</option><option value='redo'>redo</option></select>";
                TOOLBAR += separator;
                break;
             case "menu":
                TOOLBAR += "<span id='" + this.TOOLBAR_SELECT_NAME + "' onmouseover='return JDATATREE.OpenMenu(false);' style='background-color:#eeeeee;padding:5px;'>MENU</span>";
                TOOLBAR += separator;
                break;
             case "menu_with_popups":
                TOOLBAR += "<span id='" + this.TOOLBAR_SELECT_NAME + "' onmouseover='return JDATATREE.OpenMenu(true);' style='background-color:#eeeeee;padding:5px;'>MENU</span>";
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
function JdatatreeOpenMenu(popups){ 
     var menu = document.getElementById(JDATATREE.TREE.TOOLBAR_SELECT_NAME);
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
     ul.id = 'jdatatree_menu';
     ul.style.paddingLeft = '0px';
     ul.style.paddingTop = '0px';
     ul.style.listStyleType = 'none';
     ul.style.border = '1px solid gray';
     if (JdatatreeOpenMenu.arguments.length > 0 && popups == true){
        ul.innerHTML = "<li class='overwrite' onclick='return JDATATREE.MenuMouseClick(event,0);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >overwrite</li><li class='child' onclick='return JDATATREE.MenuMouseClick(event,1);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >child</li><li class='sibling' onclick='return JDATATREE.MenuMouseClick(event,2);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >sibling</li><li class='up' onclick='return JDATATREE.MenuMouseClick(event,3);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >move up</li><li class='down' onclick='return JDATATREE.MenuMouseClick(event,4);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >move down</li><li class='right_with_popups' onclick='return JDATATREE.MenuMouseClick(event,5);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >move right</li><li class='left' onclick='return JDATATREE.MenuMouseClick(event,6);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >move left</li><li class='copy selected' onclick='return JDATATREE.MenuMouseClick(event,7);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >copy selected</li><li class='copy w/children' onclick='return JDATATREE.MenuMouseClick(event,8);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >copy w/children</li><li class='cut' onclick='return JDATATREE.MenuMouseClick(event,9);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >cut</li><li class='paste' onclick='return JDATATREE.MenuMouseClick(event,10);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >paste</li><li class='remove' onclick='return JDATATREE.MenuMouseClick(event,11);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >remove</li><li class='undo' onclick='return JDATATREE.MenuMouseClick(event,12);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >undo</li><li class='redo' onclick='return JDATATREE.MenuMouseClick(event,13);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >redo</li><li class='close' onclick='return JDATATREE.MenuMouseClick(event,14);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);'>CLOSE</li>";
     } else {
        ul.innerHTML = "<li class='overwrite' onclick='return JDATATREE.MenuMouseClick(event,0);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >overwrite</li><li class='child' onclick='return JDATATREE.MenuMouseClick(event,1);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >child</li><li class='sibling' onclick='return JDATATREE.MenuMouseClick(event,2);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >sibling</li><li class='up' onclick='return JDATATREE.MenuMouseClick(event,3);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >move up</li><li class='down' onclick='return JDATATREE.MenuMouseClick(event,4);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >move down</li><li class='selection right' onclick='return JDATATREE.MenuMouseClick(event,5);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >selection right</li><li class='section right' onclick='return JDATATREE.MenuMouseClick(event,6);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >section right</li><li class='left' onclick='return JDATATREE.MenuMouseClick(event,7);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >move left</li><li class='copy selected' onclick='return JDATATREE.MenuMouseClick(event,8);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >copy selected</li><li class='copy w/children' onclick='return JDATATREE.MenuMouseClick(event,9);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >copy w/children</li><li class='cut' onclick='return JDATATREE.MenuMouseClick(event,10);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >cut</li><li class='paste' onclick='return JDATATREE.MenuMouseClick(event,11);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >paste</li><li class='remove' onclick='return JDATATREE.MenuMouseClick(event,12);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >remove</li><li class='undo' onclick='return JDATATREE.MenuMouseClick(event,13);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >undo</li><li class='redo' onclick='return JDATATREE.MenuMouseClick(event,14);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);' >redo</li><li class='close' onclick='return JDATATREE.MenuMouseClick(event,15);' onmouseover='return JDATATREE.MenuMouseOver(event);' onmouseout='return JDATATREE.MenuMouseOut(event);'>CLOSE</li>";
     }
     ul.style.left = x + "px";
     ul.style.top = y + "px";
     document.body.appendChild(ul);
}
function JdatatreeMenuMouseClick(evt,index){ 
   if (!evt){
      evt = window.event;
   }
   var targ = evt.target? evt.target : evt.srcElement;
   if (targ){ 
      document.getElementById(JDATATREE.TREE.TOOLBAR_SELECT_NAME).setAttribute('selectedIndex',index);
      JDATATREE.ToolbarSelect(targ.className);
   }
}
function JdatatreeMenuMouseOver(evt){
   if (!evt){
      evt = window.event;
   }
   var targ = evt.target? evt.target : evt.srcElement;
   if (targ){
      targ.style.backgroundColor = 'gray';
   }
}
function JdatatreeMenuMouseOut(evt){
   if (!evt){
      evt = window.event;
   }
   var targ = evt.target? evt.target : evt.srcElement;
   if (targ){
      targ.style.backgroundColor = '';
   }
   var clientX = evt.clientX;
   var clientY = evt.clientY;
   var menu = document.getElementById(JDATATREE.TREE.TOOLBAR_SELECT_NAME);
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
         JDATATREE.CloseMenu();
      }
   }
}
function JdatatreeCloseMenu(){
   document.body.removeChild(document.getElementById('jdatatree_menu'));
}
function JdatatreeAutoInit(outer_wrapper){ 
   if (JdatatreeAutoInit.arguments.length >= 1){
       JDATATREE.TREE = new JDATATREE.Tree(outer_wrapper);
   } else {
       JDATATREE.TREE = new JDATATREE.Tree();
   }
   if (document.getElementById(JDATATREE.TREE.ELEMENT_OUTER_WRAPPER).getAttribute('sitemap')){
	   var temp = JDATATREE.REPRESS_ALERTS;
           JDATATREE.REPRESS_ALERTS = true;
           JDATATREE.PLEASE_WAIT = false;
           var sitemap = document.getElementById(JDATATREE.TREE.ELEMENT_OUTER_WRAPPER).getAttribute('sitemap');
           if (JDATATREE.StringTrim(sitemap) != ""){ 
              JDATATREE.SITEMAP_FILE = sitemap;
              JDATATREE.SITEMAP = JDATATREE.LoadSitemap(sitemap);
           }
           JDATATREE.REPRESS_ALERTS = temp;
   }
   if (document.getElementById(JDATATREE.TREE.ELEMENT_OUTER_WRAPPER).getAttribute('src')){
      JDATATREE.Load(document.getElementById(JDATATREE.TREE.ELEMENT_OUTER_WRAPPER).getAttribute('src'));
      TEXT = JDATATREE.TEMP;
   } else {
      if (document.getElementById(JDATATREE.TREE.ELEMENT_OUTER_WRAPPER)){
         TEXT = document.getElementById(JDATATREE.TREE.ELEMENT_OUTER_WRAPPER).innerHTML;
      }
   }
   JDATATREE.TREE.AutoInitialize(TEXT);
}
function JdatatreeAutoLoad(src){
   try{
   JDATATREE.REQUEST = new XMLHttpRequest();
   var result = "";
   JDATATREE.REQUEST.onreadystatechange = JDATATREE.Response;
   src = escape(src);
   JDATATREE.REQUEST.open("GET", src, false);
   JDATATREE.REQUEST.setRequestHeader("Access-Control-Allow-Origin", "*");
   JDATATREE.REQUEST.send();
   } catch (exc) {  }
}
function JdatatreeAutoResponse(){
   if (JDATATREE.REQUEST.readyState == 4 && JDATATREE.REQUEST.status == 200){
      var response = JDATATREE.REQUEST.responseText;
      JDATATREE.TEMP = response;
   }
}
function JdatatreeReadFile(path){
   try{
   JDATATREE.REQUEST = new XMLHttpRequest();
   var result = "";
   path = escape(path);
   JDATATREE.REQUEST.open("GET", path, false);
   JDATATREE.REQUEST.setRequestHeader("Access-Control-Allow-Origin", "*");
   JDATATREE.REQUEST.send();
   if (JDATATREE.REQUEST.readyState == 4 && JDATATREE.REQUEST.status == 200){
      var response = JDATATREE.REQUEST.responseText;
      return response;
   } else {
      return null;
   }
   } catch (exc) {
      JDATATREE.TREE? JDATATREE.TREE.ALERTS.push("error loading sitemap") : this.ALERTS.push("error loading sitemap");
   }
}
function JdatatreeLoadSitemap(src){
   try{
   JDATATREE.REQUEST = new XMLHttpRequest();
   var result = "";
   src = escape(src);
   JDATATREE.REQUEST.open("GET", src, false);
   JDATATREE.REQUEST.setRequestHeader("Access-Control-Allow-Origin", "*");
   JDATATREE.REQUEST.send();
   if (JDATATREE.REQUEST.readyState == 4 && JDATATREE.REQUEST.status == 200){
          var response = JDATATREE.REQUEST.responseText; 
	  if (response == null || response == ""){
		  return null;
	  }
		  var result = "";
                  var lines = response.split("\r").join("").split("\n");
		  for (var count = 0; count < lines.length; ++count){
			  var line = lines[count];
			  var filename = JDATATREE.LeftStringTrim(line);
                          var name = filename.toLowerCase();
                          var blanks = line.length - filename.length;
			  var file = false;
			  if (name.length > ".tree.html".length && name.substring(name.length - ".tree.html".length) == ".tree.html"){
				  file = true;
                          } else if ((name.length > ".html".length) && name.substring(name.length - ".html".length) == ".html" || name.substring(name.length - ".htm".length) == ".htm"){
                                  file = true;
                          } else if ((name.length > ".txt".length) && name.substring(name.length - ".txt".length) == ".txt"){
                                  file = true;
                          } else if (JDATATREE.StringTrim(name) != ""){
                                  file = true;
                          }
			  if (file){
                                  var curblanks = blanks;
                                  var folders = new Array();
                                  for (var back = count - 1; back >= 0; --back){
                                     var prev = lines[back];
                                     var prevname = JDATATREE.LeftStringTrim(prev);
                                     var prevblanks = prev.length - prevname.length;
                                     if (prevblanks < curblanks){
                                        curblanks = prevblanks;
                                        folders.push(JDATATREE.StringTrim(prevname));
                                     }
                                  }
                                  for (var back = folders.length; back >= 0; --back){
                                     var folder = folders[back];
                                     if (folder != null && folder != "undefined" && JDATATREE.StringTrim(folder) != ""){
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
      JDATATREE.TREE? JDATATREE.TREE.ALERTS.push("error loading sitemap") : this.ALERTS.push("error loading sitemap");
   }
}
function JdatatreeSetTreeHeight(treeheight){
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
function JdatatreeSetIcons(open,closed,empty){
   this.SetOpenIcon(open);
   this.SetClosedIcon(closed);
   this.SetEmptyIcon(empty);
}
function JdatatreeSetOpenIcon(open){
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
function JdatatreeSetClosedIcon(closed){
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
function JdatatreeSetEmptyIcon(empty){
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
function JdatatreeGetLettering(){
    return "font-family:" + this.LETTERING + ";";
}
function JdatatreeAutoInitialize(TEXT){ 
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
   //JDATATREE.PLEASE_WAIT = true;
   var querystring = "CREATE FROM " + TYPE + " " + TEXT;
   this.Query(querystring);
}
function JdatatreeAutoExpand(evt){
   if (!evt){ evt = window.event; }
   if (evt){
      evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
   }
   if (JDATATREE.TREE){
      JDATATREE.TREE.Query("EXPAND");
   }
}
function JdatatreeAutoCollapse(evt){
   if (!evt){ evt = window.event; }
   if (evt){
      evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
   }
   if (JDATATREE.TREE){
      JDATATREE.TREE.Query("COLLAPSE");
   }
}
function JdatatreeAutoReplace(){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (JDATATREE.TREE){
      var replace = document.getElementById(JDATATREE.TREE.TOOLBAR_REPLACE_NAME).value;
      var replace_with = document.getElementById(JDATATREE.TREE.TOOLBAR_REPLACE_WITH_NAME).value;
      if (JDATATREE.StringTrim(replace) != "" && JDATATREE.StringTrim(replace_with) != ""){
         JDATATREE.TREE.Query("WITH " + replace_with);
         JDATATREE.TREE.Query("REPLACE " + replace);
      } else if (JDATATREE.StringTrim(replace) == "" && JDATATREE.StringTrim(replace_with) == ""){
         JDATATREE.TREE.Query("REPLACE");
      }
   }
}
function JdatatreeAutoSkip(){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (JDATATREE.TREE){
      JDATATREE.TREE.Query('SKIP');
   }
}
function JdatatreeAutoSearch(evt){
   if (!evt){ evt = window.event; }
   if (evt){
      evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
   }
   if (JDATATREE.TREE){
      var searchterm = document.getElementById(JDATATREE.TREE.TOOLBAR_SEARCHBOX_NAME).value;
      if (JDATATREE.StringTrim(searchterm) != ""){
         var options = "";
         var cas = document.getElementById('jdatatree_case');
         var exact = document.getElementById('jdatatree_exact');
         if (cas && cas.checked == true){
            options += "CASE_SENSITIVE ";
         }
         if (exact && exact.checked == true){
            options += "EXACT_MATCHES ";
         }
         JDATATREE.TREE.Query("SEARCH " + options + "FOR " + searchterm);
      }
   }
}
function JdatatreeAutoNext(evt){
   if (!evt){ evt = window.event; }
   if (evt){
      evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
   }
   if (JDATATREE.TREE){
       JDATATREE.TREE.Query("NEXT");
   }
}
function JdatatreeAutoPrevious(evt){
   if (!evt){ evt = window.event; }
   if (evt){
      evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
   }
   if (JDATATREE.TREE){
       JDATATREE.TREE.Query("PREVIOUS");
   }
}
function JdatatreeAutoQuery(evt){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   } else if (evt){
      evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
   }
   if (JDATATREE.TREE){
      var query = document.getElementById(JDATATREE.TREE.TOOLBAR_QUERYWINDOW_NAME).value;
      if (JDATATREE.StringTrim(query) != ""){
         JDATATREE.TREE.Query(query);
      }
   }
}
function JdatatreeAutoNumber(){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (JDATATREE.TREE){
      JDATATREE.TREE.Query("NUMBER");
   }
}
function JdatatreeAutoReset(evt){
   if (!evt){ evt = window.event; }
   if (evt){
      evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
   }
   if (JDATATREE.TREE){
      if (document.getElementById(JDATATREE.TREE.TOOLBAR_QUERYWINDOW_NAME)){
         document.getElementById(JDATATREE.TREE.TOOLBAR_QUERYWINDOW_NAME).value = "";
      }
      JDATATREE.TREE.Query("CLEAR ALL");
   }
}
function JdatatreeAutoPrintHtml(){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (JDATATREE.TREE){
      JDATATREE.TREE.Query("PRINT HTML");
   }
}
function JdatatreeAutoSave(){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (JDATATREE.TREE){
      if (JDATATREE.TREE.TYPE == "text"){
         JDATATREE.TREE.Query("PRINT TEXTTREE");
         alert('Please save your file as an html file with the double extension .tree.html');
         //JDATATREE.TREE.Query("PRINT TEXT");
         //alert('Please save your file as a text file with the extension .txt');
      } else if (JDATATREE.TREE.TYPE == "html"){
         JDATATREE.TREE.Query("PRINT HTML");
         alert('Please save your file as an html file with the extension .html');
      } else {
         JDATATREE.TREE.Query("PRINT FILE");
         alert('Please save your file as an html file with the double extension .tree.html');
      }
   }
}
function JdatatreeAutoSaveMax(){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (JDATATREE.TREE){
      if (JDATATREE.TREE.TYPE == "text"){
         JDATATREE.TREE.Query("PRINT TEXTTREE");
         alert('Please save your file as an html file with the double extension .tree.html');
         //JDATATREE.TREE.Query("PRINT TEXT");
         //alert('Please save your file as a text file with the extension .txt');
      } else {
         JDATATREE.TREE.Query("PRINT FILEMAX");
         alert('Please save your file as an html file with the double extension .tree.html');
      }
   }
}
function JdatatreeAutoPrintText(){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (JDATATREE.TREE){
      JDATATREE.TREE.Query("PRINT TEXT");
   }
}
function JdatatreeAutoPrintCode(){
  if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (JDATATREE.TREE){
      JDATATREE.TREE.Query("PRINT CODE");
   }
}
function JdatatreeAutoPrintList(){
  if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (JDATATREE.TREE){
      JDATATREE.TREE.Query("PRINT LIST");
   }
}
function JdatatreeAutoPrintFile(){
  if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   if (JDATATREE.TREE){
      JDATATREE.TREE.Query("PRINT FILE");
   }
}
function JdatatreeAutoAlphabetize(){
   if (window.event){
      window.event.preventDefault? window.event.preventDefault() : window.event.returnValue = false;
   }
   var datatree = JDATATREE.TREE? JDATATREE.TREE : this;
   var lower_bound = document.getElementById(datatree.TOOLBAR_LOWER_BOUND_NAME).value;
   var upper_bound = document.getElementById(datatree.TOOLBAR_UPPER_BOUND_NAME).value;
   lower_bound = parseInt(JDATATREE.StringTrim(lower_bound));
   upper_bound = parseInt(JDATATREE.StringTrim(upper_bound));
   if (typeof lower_bound == "number" && typeof upper_bound == "number" && !isNaN(lower_bound) && !isNaN(upper_bound)){
      var input = "ALPHABETIZE FROM LINE " + lower_bound + " TO LINE " + upper_bound;
      datatree.Query(input);
   } else {
      alert("Line numbers only. Please press/query number, find the appropriate lines, then press/query reset.");
   }
}
function JdatatreeHtmlText(){
    return this.CONTENT;
}
function JdatatreeHtmlCode(){
    return this.GetCode();
}
function JdatatreeGetText(){
    return this.PlainText();
}
function JdatatreePlainText(){
    var result = "";
    var lines = new Array();
    lines = this.GetHtmlLines(this.CONTENT, lines);
    //var lines = this.HtmlLineBreaks(this.CONTENT);
    for (var count = 0; count < lines.length; ++count){
       lines[count] = JDATATREE.StripTagsPHPJS(lines[count]);
       //lines[count] = JDATATREE.StripTagLeaveInner(lines[count], "p");
       //lines[count] = JDATATREE.StripTagWithClassNameLeaveInner(lines[count], "span", "linenumber");
       //lines[count] = JDATATREE.StripTagWithClassNameLeaveInner(lines[count], "span", "search_result");
    }
    for (var count = 0; count < lines.length; ++count){
       result += lines[count] + "\n";
    }
    return result;
}
function JdatatreeStripTagWithClassNameLeaveInner(text, tag, name){
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
function JdatatreeStripTagLeaveInner(text, tag){
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
function JdatatreeSynchronize(updateGUI){
    try{
       this.NODES.length = 0;
       this.LEVELS.length = 0;
       if (JdatatreeSynchronize.arguments.length > 0 && updateGUI == false){}else{
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
              text = JDATATREE.StringTrim(text);
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
       if (JdatatreeSynchronize.arguments.length > 0 && updateGUI == false){}else{
          this.Refresh();
       }
    } catch (exc) {
       if (JDATATREE.REPRESS_ALERTS == false){ alert(exc); }
    }
}
function JdatatreeSyncFromRootNode(node){
    if (node != this.ROOT_NODE){
        this.NODES.push(node);
    }
    for (var count = 0; count < node.CHILDREN.length; ++count){
        this.LEVELS.push(node.GetLevel());
        this.SyncFromRootNode(node.CHILDREN[count]);
    }
}
function JdatatreeSyncFromDataTree(tree, justreturnval){ 
    try{
    tree = this.HtmlBody(tree);
    var div = document.createElement('div');
    div.innerHTML = tree;
    var datatree = JDATATREE.TREE? JDATATREE.TREE : this;
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
		      if (JDATATREE.LeftStringTrim(txt).indexOf("<!--") == 0){//7.9.8
                      JDATATREE.PLEASE_WAIT = false;
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
       UL = JdatatreeRemoveAnchors(UL);
       ++count;
    }
    //var div2 = document.createElement('div');
    //div2.appendChild(UL);
    //UL = div2.children[0];
    UL = JdatatreeRemoveEmptyLists(UL);
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
    JdatatreeRemoveContentSpanWrappers(UL);
    var div4 = document.createElement('div');
    div4.appendChild(UL);
    if (JdatatreeSyncFromDataTree.arguments.length == 2 && (justreturnval == true || justreturnval == "true" || justreturnval == "justreturnval")){
        return div4.innerHTML;
    } else {
        JDATATREE.PLEASE_WAIT = true;
        this.Query("CREATE FROM HTML " + div4.innerHTML);
    }
    } catch(exc) {  }
}
function JdatatreeRemoveContentSpanWrappers(ul){
    for (var count = 0; count < ul.getElementsByTagName('li').length; ++count){
        var li = ul.getElementsByTagName('li')[count];
        if (li.getElementsByTagName('span').length > 0){
            var span = li.getElementsByTagName('span')[0];
            if (span.className == 'jdatatree_content'){
                var inner = span.innerHTML;
                li.removeChild(span);
                li.innerHTML = inner + li.innerHTML;
            }
        }
        if (li.getElementsByTagName('ul').length > 0){
            JdatatreeRemoveContentSpanWrappers(li.getElementsByTagName('ul')[0]);
        }
    }
}
function JdatatreeRemoveAnchors(elmnt){
    var anchors = elmnt.getElementsByTagName('a');
    for (var count = 0; count < anchors.length; ++count){
        var anchor = anchors[count];
        if (anchor.className == 'jdatatree_arrow'){
            anchor.parentNode.removeChild(anchor);
        }
    }
    return elmnt;
}
function JdatatreeRemoveEmptyLists(elmnt){
    var chils = elmnt.childNodes;
    for (var count = 0; count < chils.length; ++count){
        var c = chils[count];
        if (c.nodeName.toLowerCase() == "ul" && c.children.length <= 0){
            c.parentNode.removeChild(c);
        }
        c = JdatatreeRemoveEmptyLists(c);
    }
    return elmnt;
}
function JdatatreeUndoPreservedWhiteSpace(){
    this.PRESERVE_WHITE_SPACE = false;
    for (var count = 0; count < this.NODES.length; ++count){
        var node = this.NODES[count];
        node.TEXT = node.TEXT.split("<span class='preserve_white_space'></span>").join("");
    }
    this.Synchronize();
}
function JdatatreeStripTags(line,remove_tables){ // remove tables when loading, don't when searching
    if (line.indexOf('table') >= 0){
      var div = document.createElement('div');
      div.innerHTML = line;
      var tables = div.getElementsByTagName('table');
      for (var count = 0; count < tables.length; ++count){
         var t = tables[count];
         if (JdatatreeStripTags.arguments.length > 0 && remove_tables == true){
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
function JdatatreeStringTrim(strng){
    if (strng == null || strng == "undefined"){
        if (JDATATREE.REPRESS_ALERTS == false){ alert("error in string trim"); }
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
function JdatatreeLeftStringTrim(strng){
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
function JdatatreeRightStringTrim(strng){
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
function JdatatreeArraySwap(index1, index2, aray){
    var first = aray.slice(index1)[0];
    var second = aray.slice(index2)[0];
    aray.splice(index1, 1, second);
    aray.splice(index2, 1, first);
    return aray;
}
function JdatatreeRemoveBranch(index,update){
    try{
        this.CHILDREN.splice(index, 1);
        var macro_index = this.TREE.NODES.indexOf(this) + index;
        if (JdatatreeRemoveBranch.arguments.length > 1 && update == true){
           this.TREE.NODES.splice(macro_index, 1);
        }
    } catch (exc) {
        if (JDATATREE.REPRESS_ALERTS == false) { alert(exc); }
    }
}
function JdatatreeRemoveAllBranches(update){
    for (var count = 0; count < this.CHILDREN.length; ++count){
          this.RemoveBranch(count);
          count -= 1;
    }
    //this.TREE.NODES.length = 0;
}
function JdatatreeListIterate(_click){
       var click = true;
       if (JdatatreeListIterate.arguments.length > 0 && _click == false){
           click = false;
       } else {
           this.Click();
       }
       var li = "<li class='jdatatree_li' style='white-space:nowrap;'>";
       var a = "<a class='jdatatree_arrow' href='javascript:void(0)' onclick='return clicktree(event);' style='text-decoration:none;' >" + this.LINK + "</a>";
       var datatree = JDATATREE.TREE? JDATATREE.TREE : this;
       if (datatree.UNDERLINE_ICONS == true){
          a = "<a class='jdatatree_arrow' href='javascript:void(0)' onclick='return clicktree(event);' >" + this.LINK + "</a>";
       }
       var span = "<span class='jdatatree_content' style='white-space:pre-wrap;padding-left:10px;' onclick='return JdatatreeClickSpan(event);' onmousedown='return JdatatreeMouseDownSpan(event);' onmouseup='return JdatatreeMouseUpSpan(event);'>";
       var text = JDATATREE.StringTrim(this.TEXT);
       text = text.split("\n").join("");
       var _span = "</span>";
       var accordion = datatree.ACCORDION >= 0? "padding-left:" + datatree.ACCORDION + "pt;": "";
       var ul = "<ul class='jdatatree_ul' style='list-style-type:none;display:" + this.DISPLAY + ";" + accordion + "' >";
       for (var count = 0; count < this.CHILDREN.length; ++count){
          var c = this.CHILDREN[count];
          ul += c.Iterate(click);
       }
       var _ul = "</ul>";
       var _li = "</li>";
       var result = li + a + span + text + _span + ul + _ul + _li;
       if(text.search("jdatatree_content") >= 0){//*****************************************************************10.0
           result = li + a + text + ul + _ul + _li;
       }
       return result;
}
function JdatatreeClick(){
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
function JdatatreeClose(){
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
function JdatatreeGetLevel(MODE){
    if (JdatatreeGetLevel.arguments.length <= 0){
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
function JdatatreeGetChildCount(){
    return this.CHILDREN.length;
}
function JdatatreeGetIndex(test){
   var index = -1;
   if (this.PARENT_NODE.TEXT != "undefined" && this.PARENT_NODE.TEXT != null){
      index = this.PARENT_NODE.CHILDREN.indexOf(this);
   }
   return index;
}
function JdatatreeCountFromTop(){
   var number = -1;
   if (this.TREE && this.TREE.NODES){
      number = this.TREE.NODES.indexOf(this) + 1;//often finds -1 + 1 = 0
   }
   return number;
}
function JdatatreeIndexFromTop(node){
   var index = -1;
   for (var count = 0; count < JDATATREE.TREE.NODES.length; ++count){
      var n = JDATATREE.TREE.NODES[count];
      if (node == n){
         index = count;
         break;
      }
   }
   return index;
}
function JdatatreeRemoveEmptyEndTags(line){
   var break_starts = ["<p>", "<h1>", "<h2>", "<h3>", "<h4>", "<h5>", "<h6>", "<div>", "<table>", "<form>", "<ul>", "<ol>", "<li>", "<blockquote>"];
   var break_half_starts = ["<p ", "<h1 ", "<h2 ", "<h3 ", "<h4 ", "<h5 ", "<h6 ", "<div ", "<table ", "<form ", "<ul ", "<ol ", "<li ", "<blockquote "];
   var break_ends = ["</p>", "</h1>", "</h2>", "</h3>", "</h4>", "</h5>", "</h6>", "</div>", "</table>", "</form>", "</ul>", "</ol>", "</li>", "</blockquote>", "<br/>", "<br>", "<hr/>", "<hr>"];
   var result = "";
   var splits = line.split("<");
   for (var count = 0; count < splits.length; ++count){
      var s = "<" + splits[count];
      var ss = JDATATREE.StringTrim(s);
      if (break_ends.indexOf(ss) >= 0 && !line.indexOf(break_starts[break_ends.indexOf(ss)]) >= 0){
      //
      } else {
          result += s;
      }
   }
   return result;
}
function JdatatreeIsTableTag(tag){
    var result = false;
    var table_tags = ["<table>","<caption>","<thead>", "<tbody>", "<tr>", "<td>", "</table>","</caption>","</thead>", "</tbody>", "</tr>", "</td>", "<table ","<caption ","<thead ", "<tbody ", "<tr ", "<td "] ;
    for (t in table_tags){
      if (tag.indexOf(table_tags[t]) >= 0){
          result = true;
      }
    }
    return result;
}
function JdatatreeHtmlLineBreaks(HTML, nbsp){ 
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
          if (tag == "" && c == ' ' && JdatatreeHtmlLineBreaks.arguments.length == 2 && nbsp == true){
              c = "&nbsp;";
          }
          line += c;
          if (count + 1 == html.length){
             if (JDATATREE.StringTrim(line) == ""){
               ++SKIPPED_LINES;
             } else if (break_ends.indexOf(JDATATREE.StringTrim(line)) >= 0){ // line is just an end tag
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
                if (tag == JDATATREE.StringTrim(line) || JDATATREE.StringTrim(JDATATREE.RemoveEmptyEndTags(line)) == ""){ // line is just an end tag
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
                   if (JDATATREE.StringTrim(line) != tag){
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
                      else if (tg.style.paddingLeft && JDATATREE.StringTrim(line.replace(tag, "")) == ""){
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
function JdatatreeRemoveHtmlComments(html){
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
function JdatatreeDivHasSelfIndentingTag(div){
    var result = false;
    if (div.getElementsByTagName('ul').length > 0 || div.getElementsByTagName('ol').length > 0 || div.getElementsByTagName('blockquote').length > 0 || div.getElementsByTagName('hr').length > 0){ // || div.getElementsByTagName('table').length > 0 
        result = true;
    }
    return result;
}
function JdatatreeTagRequiresLineBreak(div){ // if don't wrap tables with <p> then require <br> or else two consecutive lines with tables would merge into same line
    var result = false;
    if (div.getElementsByTagName('table').length > 0){
        result = true;
    }
    return result;
}
function JdatatreeDivHasKeeperNonTextTag(div){ // components not allowed unless they are listed here (and maybe also DivHasContentTag)
    var result = false;
    if (div.getElementsByTagName('math') > 0 || div.getElementsByTagName('audio').length > 0 || div.getElementsByTagName('video').length > 0 || div.getElementsByTagName('embed').length > 0 || div.getElementsByTagName('object').length > 0 || div.getElementsByTagName('iframe').length > 0 || div.getElementsByTagName('img').length > 0 || div.getElementsByTagName('table').length > 0 || div.getElementsByTagName('ul').length > 0 || div.getElementsByTagName('ol').length > 0 || div.getElementsByTagName('blockquote').length > 0 || div.getElementsByTagName('hr').length > 0){
        result = true;
    }
    return result;
}
function JdatatreeDivHasContentTag(div){ // don't count blanks found inside content tag or after it
    var result = false;
    if (div.getElementsByTagName('audio').length > 0 || div.getElementsByTagName('video').length > 0 || div.getElementsByTagName('embed').length > 0 || div.getElementsByTagName('object').length > 0 || div.getElementsByTagName('iframe').length > 0 || div.getElementsByTagName('img').length > 0){ 
        result = true;
    } else if (div.getElementsByTagName('table').length > 0 || div.getElementsByTagName('math').length > 0){
        result = true; // maybe better to allow blanks in these
    }
    return result;
}
function JdatatreeIsRemovableFormatTag(tag){
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
function JdatatreeDoNotWrapOuterElement(line){
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
       if (result.substring(0, result.indexOf("<")).length > 0 && JDATATREE.StringTrim(result.substring(0, result.indexOf("<"))) == ""){
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
          starting_tag = JDATATREE.StringTrim(starting_tag);
          ending_tag = JDATATREE.RightStringTrim(ending_tag);
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
function JdatatreeGetOuterElement(line){
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
       if (result.substring(0, result.indexOf("<")).length > 0 && JDATATREE.StringTrim(result.substring(0, result.indexOf("<"))) == ""){
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
           trimmed = JDATATREE.StringTrim(line);
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
function JdatatreeSetTableStyle(html){
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
function JdatatreeRemoveTables(html){
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
function JdatatreeRemoveTableWrappers(lines){
    var newlines = new Array();
    for (var count = 0; count < lines.length; ++count){
        var l = lines[count];
        var outer = JdatatreeGetOuterElement(l);
        if (l.indexOf("<table ") >= 0 && outer.toUpperCase() != "TABLE"){
           if (outer.toUpperCase() == "P"){
              l = l.substring(l.indexOf(">") + 1, l.lastIndexOf("<"));
           }
        }
        newlines.push(l);
    }
    return newlines;
}
function JdatatreeGetHtmlLines(content, lines){
           lines.length = 0;
           content = this.HtmlBody(content);
           content = this.RemoveHtmlComments(content);
           lines = this.HtmlLineBreaks(content);
           lines = JDATATREE.RemoveTableWrappers(lines);
           for (var count = 0; count < lines.length; ++count){ // strip leading p or div tags, save blanks in front
               var result = lines[count]; 
               // check for blanks before first tag
               var startingblanks = "";
               var startingtext = "";
               if (result.substring(0, result.indexOf("<")).length > 0){ // has blanks or letters/numbers before first tag
                   if (JDATATREE.StringTrim(result.substring(0, result.indexOf("<"))) == ""){ // just blanks
                      for (var blanks = 0; blanks < result.indexOf("<"); ++blanks){
                          startingblanks += " ";
                      }
                   } else { // letters/numbers and possibly blanks
                       startingtext = JDATATREE.StringTrim(result.substring(0, result.indexOf("<")));
                       var numblanks = result.substring(0, result.indexOf("<")).length - JDATATREE.StringTrim(result.substring(0, result.indexOf("<"))).length;
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
                  trimmed = JDATATREE.StringTrim(result); // doesnt remove nested blanks, but does remove trailing end blanks
                  tagless = JDATATREE.StripTagsPHPJS(this.RemoveTables(result)); // *** not trimmed *** what if line is just a tag, like an image
                  trimmed_and_tagless = JDATATREE.StringTrim(tagless); // should be left string trim, might leave nothing
               } else if (this.GetOuterElement(result).toLowerCase() == "table"){
                   trimmed = JDATATREE.StringTrim(result);
                   tagless = trimmed;
                   trimmed_and_tagless = tagless;
               } else { 
               }
               var firstcharacter = result.charAt(0);
               var div = document.createElement('div');
               div.innerHTML = lines[count];
               if (trimmed_and_tagless == ""){ // line has just a tag, like img, or just blanks, like <font>   <img/></font>, don't add starting blanks again
                   var numblanks = JDATATREE.StripTags(JDATATREE.RightStringTrim(result),true).length;
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
function JdatatreeTreeFromString(content, title, mode){ 
    if (JdatatreeTreeFromString.arguments.length <= 0){ // ??????
        title = 'TREE';
    } else if (JdatatreeTreeFromString.arguments.length < 3){ // ????????
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
              content = content.split("\t").join(JDATATREE.TAB);
           }
           if (content.indexOf("\r\n") >= 0){
              lines = content.split("\r\n");
           } else if (content.indexOf("\n") >= 0){
              lines = content.split("\n");
           } else {
              lines.push(content);
           }
           if (JDATATREE.StringTrim(lines[0]) == "" && lines.length > 1){//7.9.8 allows newline
              lines.splice(0, 1);
           }
           if (JDATATREE.StringTrim(lines[0]).indexOf("<!--") == 0 && JDATATREE.StringTrim(lines[lines.length - 1]).indexOf("-->") == JDATATREE.StringTrim(lines[lines.length-1]).length - "-->".length){//7.9.8
               lines[0] = lines[0].replace("<!--","");//7.9.8
               if (JDATATREE.StringTrim(lines[0]) == ""){
                  lines.splice(0, 1);
               }
               lines[lines.length - 1] = lines[lines.length - 1].replace("-->","");
               if (JDATATREE.StringTrim(lines[lines.length - 1]) == ""){
                  lines.splice(lines.length - 1, 1);
               }
           }
           break;
        case "html":
           if (content.indexOf("\t") >= 0){
              content = content.split("\t").join(JDATATREE.TAB);
           }
           lines = this.GetHtmlLines(content, lines);
           for (var count = 0; count < lines.length; ++count){ 
               lines[count] = lines[count].replace("<br/>", "").replace("<br>", "");
           }
           break;
        default:
           if (JDATATREE.REPRESS_ALERTS == false) { alert("error in tree from string"); }
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
       if (JDATATREE.StringTrim(lines[count]) != ""){
          Rawlines.push(lines[count]);
       }
    }
    if (Rawlines.length < 1) {
        EMPTY_FILE = true;
    }
    var empty_test = "";
    for (var count = 0; count < Rawlines.length; ++count){
       empty_test += JDATATREE.StringTrim(Rawlines[count]);
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
        if (JDATATREE.StringTrim(s) == ""){
            continue;
        }
        if (mode == "text"){
            s = s.split("<").join("&lt;").split(">").join("&gt;");
        }
        Masterlist.push(s);
        Trimmedlines.push(JDATATREE.LeftStringTrim(s));
        var key = "";
        var txtstrt = parseInt(s.length) - parseInt(JDATATREE.LeftStringTrim(s).length);
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
        if (JDATATREE.StringTrim(m) != ""){
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
   return JDATATREE.TEMP;
}
function Traverse2(branch,keeptrack){ // debugger
   if (branch == null || branch == "undefined"){
      return null;
   }
   if (keeptrack == 0){
      JDATATREE.TEMP = "";
   }
   for (var count = 0; count < branch.CHILDREN.length; ++count){
      var node = branch.CHILDREN[count];
      JDATATREE.TEMP += node.TEXT + "\n";
      Traverse2(node,++keeptrack);
   }
}
function JdatatreeProcessTree(thisindex, nextindex, nodelist, TEMPTREE, Keys, Trimmedlines, EMPTY_FILE) {
     if (EMPTY_FILE) {
         return;
     }
     for (var start = thisindex; start < nodelist.length; ++start){
        var thisindex = start;
        var nextindex = start + 1;
        if (Keys.length == nextindex) {
            return;
        }
        ++JDATATREE.COUNTER;
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
                   if (JDATATREE.REPRESS_ALERTS == false) { alert("error in process tree"); }
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
function JdatatreeUpdateContent(){
   this.Query("CREATE FROM HTML " + this.ViewGetList());
}
function JdatatreeUpdateContentDeprecated(node){
    if (JdatatreeUpdateContent.arguments.length <= 0){
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
function JdatatreeContextMenu(popup_text, timing, x, y) {
  try{
    if (document.documentElement.scrollTop){
       y += document.documentElement.scrollTop;
       x += document.documentElement.scrollLeft;
    } else if (document.body.scrollTop){
       y += document.body.scrollTop;
       x += document.body.scrollLeft;
    }
    var datatree = JDATATREE.TREE? JDATATREE.TREE : this;
    JDATATREE.CloseContextMenu();
    //if (JDATATREE.REPRESS_ALERTS == true) { return; }
    if (document.getElementById) {
        if (document.getElementById('jdatatree_contextmenu')){
            document.getElementById('jdatatree_contextmenu').parentNode.removeChild(document.getElementById('jdatatree_contextmenu'));
        }
        var box = document.createElement('div');
        box.id = 'jdatatree_contextmenu';
        box.style.position = "absolute";
        box.style.zIndex = "100";
        box.style.display = "none";
        box.style.border = "1px solid gray";
        box.innerHTML = "<select style='background-color:#f5f2eb;overflow:visible;' id='jdatatree_context_message' onmouseover='return JdatatreeFocusContextMenu();' onblur='return JdatatreeCloseContextMenu();' multiple='multiple'></select>";
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
            message_text = document.getElementById("jdatatree_context_message");
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
            window.clearTimeout(JDATATREE.TIMER);
            JDATATREE.TIMER = setTimeout(JDATATREE.ClosePopupBox, timing);
        }
    }
  } catch (exc) {  }
}
function JdatatreeFocusContextMenu(){
   if (document.getElementById('jdatatree_context_message')){
      document.getElementById('jdatatree_context_message').focus();
   }
}
function JdatatreeCloseContextMenu() { 
    if (document.getElementById('jdatatree_contextmenu')) {
        box = document.getElementById("jdatatree_contextmenu");
        if (box) { 
            box.style.display = "none";
            if (JDATATREE.TIMER) {
                window.clearTimeout(JDATATREE.TIMER);
            }
        }
    }
}
function JdatatreeRightClick(){
    if (JDATATREE.BACKSPACE_ALLOWED == true){
       return;
    }
    var message = "JDATATREE v10.0\nCopyright &copy; 2015 Derek James Smith";
    var evt = window.event;
    var popupx = evt.clientX;
    var popupy = evt.clientY;
    popup_wait = 10000;
    JDATATREE.ContextMenu(message, popup_wait, popupx, popupy);
    return false;
    //show_popup_box(instr, popup_wait, (window.screen.width/2) + 30, (window.screen.height/2));
}

function JdatatreeShowPopupBox(popup_text, timing, x, y) { 
  try{
    adjust = false;
    if (JdatatreeShowPopupBox.arguments.length < 2){
       timing = 100000;
       x = window.innerWidth/2;
       y = window.innerHeight/2;
       adjust = true;
    } else if (JdatatreeShowPopupBox.arguments.length < 4){
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
    var datatree = JDATATREE.TREE? JDATATREE.TREE : this;
    JDATATREE.ClosePopupBox();
    if (JDATATREE.REPRESS_ALERTS == true) { return; }
    if (document.getElementById) {
        if (document.getElementById('jdatatree_popupbox')){
            document.getElementById('jdatatree_popupbox').parentNode.removeChild(document.getElementById('jdatatree_popupbox'));
        }
        var box = document.createElement('div');
        box.id = 'jdatatree_popupbox';
        box.style.position = "absolute";
        box.style.zIndex = "100";
        box.style.display = "none";
        //box.style.height = "100px";
        //box.style.width = "300px";
        box.style.border = JDATATREE.POPUP_BORDER;
        box.style.overflow = "auto";
        box.style.borderRadius = "20px";
        box.style.padding = "15px";
        box.style.background = "#f5f2eb";// "white url('" + JDATATREE.POPUP_BACKGROUND + "') repeat scroll left top";
        box.style.maxWidth = "200px";
        box.innerHTML = "<div onclick='return JdatatreeClosePopupBox();' id='jdatatree_closebutton' style='position:relative;color:red;font-size:1em;top:0px;right:0px;float:right;margin:3px;border:1px dotted red;padding:3px;'>X</div><p id='jdatatree_popup_message'></p>";
        document.body.appendChild(box);
        //document.getElementById(datatree.ELEMENT_OUTER_WRAPPER).appendChild(box);
        if (box) {
            message_text = document.getElementById("jdatatree_popup_message");
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
            window.clearTimeout(JDATATREE.TIMER);
            JDATATREE.TIMER = setTimeout(JDATATREE.ClosePopupBox, timing);
        }
    }
  } catch (exc) {  }
}

function JdatatreeClosePopupBox() {
    if (document.getElementById) {
        box = document.getElementById("jdatatree_popupbox");
        if (box) {
            box.style.display = "none";
            if (JDATATREE.TIMER) {
                window.clearTimeout(JDATATREE.TIMER);
            }
        }
    }
}
function JdatatreeGetView(click){
    if (this.ROOT_NODE != null && this.ROOT_NODE != "undefined" && this.ROOT_NODE != ""){
       if (JdatatreeGetView.arguments.length == 0 || click == true){
try{
           this.CloseTree();
           this.ROOT_NODE.Click();
} catch (exc) {  }//7.8.7
       }
       var ul = "<ul onmouseover='return JdatatreeSetTreeFromName(\"" + this.NAME + "\");' oncontextmenu='return JdatatreeRightClick();' id='" + this.ELEMENT_INNER_WRAPPER + "' style='" + this.ELEMENT_INNER_WRAPPER_STYLE + this.GetLettering() + "height:" + this.ELEMENT_INNER_WRAPPER_HEIGHT + "'>";
       var _ul = "</ul>";
       return this.TOOLBAR + ul + this.ROOT_NODE.Iterate(false) + _ul;
    } else {
        return "";
    }
}
function JdatatreeGetList(){
    return this.ViewGetList();
    //var result = this.SyncFromDataTree(this.GetCode(), true);
    //return result;
}
function JdatatreeGetCode(click){
    this.UpdateContent();
    if (this.ROOT_NODE != null && this.ROOT_NODE != "undefined" && this.ROOT_NODE != ""){
       if (JdatatreeGetCode.arguments.length == 0 || click == true){
           this.SELECTED_SPAN = null;//7.8.6
           this.CloseTree();
           this.ROOT_NODE.Click();
       }
       var ul = "<ul onmouseover='return JdatatreeSetTreeFromName(\"" + this.NAME + "\");' oncontextmenu='return JdatatreeRightClick();' id='" + this.ELEMENT_INNER_WRAPPER + "' style='" + this.ELEMENT_INNER_WRAPPER_STYLE + this.GetLettering() + "height:" + this.ELEMENT_INNER_WRAPPER_HEIGHT + "'>";
       var _ul = "</ul>";
       return ul + this.ROOT_NODE.Iterate(false) + _ul;
    } else {
        return "";
    }
}
function JdatatreeClear(node, what){
    if (JdatatreeClear.arguments.length <= 0){
        node = this.ROOT_NODE;
        what = "search_results";
    } else if (JdatatreeClear.arguments.length <= 1){
        what = "search_results";
    } else if (what == "*" || what == "all" || what == "numbers" || what == "linenumbers" || what == "line_numbers" || what == "highlights" || what == "search_results"){
        what = what;
    } else if (what == "title"){
        this.Query('CREATE FROM HTML ' + this.PrintHtml(true));
        return;
    } else if (what == "replace_results"){
    } else {
        if (JDATATREE.REPRESS_ALERTS == false) {  }
        return;
    }
    if (what == "replace_results" || what == "all" || what == "*"){
       node.TEXT = node.TEXT.split(JDATATREE.SKIP_MESSAGE).join(this.REPLACE);
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
function JdatatreeCloseTree(){
       this.ROOT_NODE.Click();
       this.ROOT_NODE.Close();
       this.SELECTED_SPAN = null;
       var ul = "<ul onmouseover='return JdatatreeSetTreeFromName(\"" + this.NAME + "\");' oncontextmenu='return JdatatreeRightClick();' id='" + this.ELEMENT_INNER_WRAPPER + "' style='" + this.ELEMENT_INNER_WRAPPER_STYLE + this.GetLettering() + "height:" + this.ELEMENT_INNER_WRAPPER_HEIGHT + "'>";
       var _ul = "</ul>";
       return this.TOOLBAR + ul + this.ROOT_NODE.Iterate(false) + _ul;
}

function JdatatreeHtmlBody(html){
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
function JdatatreeGetBrowser(){
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
function JdatatreeWait(){
   var tree = JDATATREE.TREE;
   var name = JDATATREE.TREE.NAME;
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
   var browser = JDATATREE.GetBrowser();   
   if (browser == "Firefox"){
	   JDATATREE.WAIT_IS_OPEN = true;
	   JDATATREE.ShowPopupBox("PLEASE WAIT...", 100000, x, y);
       return "popup";
   /**
   } else if (browser == "IE"){
	   JDATATREE.WAIT_IS_OPEN = true;
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
	  JDATATREE.WAIT_IS_OPEN = true;
	  JDATATREE.ShowPopupBox("PLEASE WAIT...", 100000, x, y);
      return "popup";
   } else if (browser == "Safari"){
	  JDATATREE.WAIT_IS_OPEN = true;
	  JDATATREE.ShowPopupBox("PLEASE WAIT...", 100000, x, y);
      return "popup";
   } else if (browser == "Edge" || browser == "IE"){
      JDATATREE.WAIT_IS_OPEN = true;
      JDATATREE.ShowPopupBox("PLEASE WAIT...", 100000, x, y);
      return "popup";
   }
}
function JdatatreeCloseWaitBox(wait){
    JDATATREE.WAIT_IS_OPEN = false;
	if (wait != null) {
	   if (wait == "popup"){
	      JDATATREE.ClosePopupBox();
	   } else {
		   wait.close();
	   }
	}
}
function JdatatreeResetReplace(){
    this.REPLACE_RESULTS.length = 0;
    this.CURRENT_REPLACE_INDEX = -1;
    this.REPLACE = "";
    this.REPLACE_WITH = "";
    JDATATREE.SKIP_MESSAGE = JDATATREE.DEFAULT_SKIP_MESSAGE;
}
function JdatatreeQuery(query_string){
    JDATATREE.TREE = this;
    JDATATREE.SetInitiator(this);//7.9.8
    var RESULT = '';
    if (JDATATREE.INSERT == true && JDATATREE.StringTrim(query_string.toUpperCase()) != "UNINSERT"){
       this.SubmitEdit(query_string,"sibling",this.SELECTED_SPAN);
       var spanindex = 0;
       var spans = this.ViewRoot().getElementsByClassName('jdatatree_content');
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
        if (JDATATREE.StringTrim(strings[count]) == ""){
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
      first = JDATATREE.StringTrim(strings[0]);
    }
    if (strings.length > 1){
      second = JDATATREE.StringTrim(strings[1]);
    }
    if (strings.length > 2){
      third = JDATATREE.StringTrim(strings[2]);
    }
    if (strings.length > 3){
      fourth = JDATATREE.StringTrim(strings[3]);
    }
    if (strings.length > 4){
      fifth = JDATATREE.StringTrim(strings[4]);
    }
    if (strings.length > 5){
      sixth = JDATATREE.StringTrim(strings[5]);
    }
    switch(first.toUpperCase()){
          case "INSERT":
             JDATATREE.INSERT = true;
             break;
          case "UNINSERT":
             JDATATREE.INSERT = false;
             break;
          case "SELECT":
             try{//do not erase...checks parseInt
             var what = JDATATREE.StringTrim(query_string.substring("SELECT".length)).toLowerCase();
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
             var spans = this.ViewRoot().getElementsByClassName('jdatatree_content');
             if (second != "" && third != "" && JDATATREE.StringTrim(second.toUpperCase()) == "LINE"){
                var index = parseInt(JDATATREE.StringTrim(third));// - 1;
                if (index > 0 && index < spans.length){
                   if (this.SELECTED_SPAN){
                      JdatatreeUnhighlightSpan(this.SELECTED_SPAN);
                   }
                   if (this.MOUSE_DRAG_SPANS){
                      for (var count = 0; count < this.MOUSE_DRAG_SPANS.length; ++count){
                         JdatatreeUnhighlightSpan(this.MOUSE_DRAG_SPANS[count]);
                      }
                   }
                   var span = spans[index];
                   this.ViewOpenToSpan(span);
                   this.ScrollToSpan(span);
                   this.HighlightSpan(span);
                   this.SELECTED_SPAN = span;
                }
             } else if (second != "" && third != "" && JDATATREE.StringTrim(second.toUpperCase()) == "LINES" && (third.indexOf("-") >= 0 || (fourth != "" && fifth != "" && fourth.toUpperCase() == "TO"))){
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
             }catch(exc){if(JDATATREE.REPRESS_ALERTS==false){alert(exc);}}
             break;
          case "OVERWRITE":
             var what = JDATATREE.StringTrim(query_string.substring("OVERWRITE".length));
             if (what == ""){
                JDATATREE.ToolbarSelect("overwrite");
             } else if (this.SELECTED_SPAN){
                this.SubmitEdit(what,"overwrite",this.SELECTED_SPAN);
             }
             break;
          case "CHI":
          case "CHILD":
             if (first.toUpperCase() == "CHI"){
                query_string = query_string.replace("CHI","CHILD");
             }
             var what = JDATATREE.StringTrim(query_string.substring("CHILD".length));
             document.getElementById(this.TOOLBAR_QUERYWINDOW_NAME).value = '';
             if (what == ""){
                JDATATREE.ToolbarSelect("child");
             } else if (this.SELECTED_SPAN){
                this.SubmitEdit(what,"child",this.SELECTED_SPAN);
             }
             break;
          case "SIB":
          case "SIBLING":
             if (first.toUpperCase() == "SIB"){
                query_string = query_string.replace("SIB","SIBLING");
             }
             var what = JDATATREE.StringTrim(query_string.substring("SIBLING".length));
             document.getElementById(this.TOOLBAR_QUERYWINDOW_NAME).value = '';
             if (what == ""){
                JDATATREE.ToolbarSelect("sibling");
             } else if (this.SELECTED_SPAN){
                this.SubmitEdit(what,"sibling",this.SELECTED_SPAN);
             }
             break;
          case "MOVE":
             var what = JDATATREE.StringTrim(query_string.substring("RIGHT".length)).toLowerCase();
             what = what.toLowerCase();
             if (what == "selection right"){
                JDATATREE.ToolbarSelect("selection right");
             } else if (what == "right" || what == "section right"){
                JDATATREE.ToolbarSelect("section right");
             } else if (what == "left" || what == "section left" || what == "selection left"){
                JDATATREE.ToolbarSelect("left");
             } else if (what == "up" || what == "section up" || what == "selection up"){
                JDATATREE.ToolbarSelect("up");
             } else if (what == "down" || what == "section down" || what == "selection down"){
                JDATATREE.ToolbarSelect("down");
             }
             break;
          case "SELECTION":
             var what = JDATATREE.StringTrim(query_string.substring("RIGHT".length)).toLowerCase();
             what = what.toLowerCase();
             if (what == "right"){
                JDATATREE.ToolbarSelect("selection right");
             } else if (what == "left"){
                JDATATREE.ToolbarSelect("left");
             } else if (what == "up"){
                JDATATREE.ToolbarSelect("up");
             } else if (what == "down"){
                JDATATREE.ToolbarSelect("down");
             }
             break;
          case "SECTION":
             var what = JDATATREE.StringTrim(query_string.substring("RIGHT".length)).toLowerCase();
             what = what.toLowerCase();
             if (what == "right"){
                JDATATREE.ToolbarSelect("section right");
             } else if (what == "left"){
                JDATATREE.ToolbarSelect("left");
             } else if (what == "up"){
                JDATATREE.ToolbarSelect("up");
             } else if (what == "down"){
                JDATATREE.ToolbarSelect("down");
             }
             break;
          case "RIGHT":
             var what = JDATATREE.StringTrim(query_string.substring("RIGHT".length)).toLowerCase();
             what = what.toLowerCase();
             if (what == "selection" || what == "selected" || what == "line" || what == "lines" || what == "outer" || what == "shallow"){
                JDATATREE.ToolbarSelect("selection right");
             } else if (what == "" || what == "section" || what == "with children" || what == "w/children" || what == "w/chldrn" || what == "all" || what == "inner" || what == "deep"){
                JDATATREE.ToolbarSelect("section right");
             }
             break;
          case "LEFT":
             JDATATREE.ToolbarSelect("left");
             break;
          case "UP":
             JDATATREE.ToolbarSelect("up");
             break;
          case "DOWN":
             JDATATREE.ToolbarSelect("down");
             break;
          case "CUT":
             JDATATREE.ToolbarSelect("cut");
             break;
          case "COPY":
             var what = JDATATREE.StringTrim(query_string.substring("COPY".length)).toLowerCase();
             what = what.toLowerCase();
             if (what == "" || what == "selection" || what == "selected" || what == "line" || what == "lines" || what == "outer" || what == "shallow"){
                JDATATREE.ToolbarSelect("copy selected");
             } else if (what == "section" || what == "with children" || what == "w/children" || what == "w/chldrn" || what == "all" || what == "inner" || what == "deep"){
                JDATATREE.ToolbarSelect("copy w/children");
             }
             break;
          case "PASTE":
             JDATATREE.ToolbarSelect("paste");
             break;
          case "DELETE":
          case "REMOVE":
             JDATATREE.ToolbarSelect("remove");
             break;
          case "UNDO":
             JDATATREE.ToolbarSelect("undo");
             break;
          case "REDO":
             JDATATREE.ToolbarSelect("redo");
             break;
          case "COUNT":
             var what = JDATATREE.StringTrim(query_string.substring("COUNT".length)).toLowerCase();
             var root = JdatatreeViewRoot();
             var lines = root.getElementsByClassName('jdatatree_content');
             if (what == "lines"){
                   var result = lines.length-1;
                   if (JDATATREE.REPRESS_ALERTS == false){
                      alert("lines: " + result);
                   }
                   RESULT = result;
             } else if (what == "words"){
                   var result = 0;
                   for (var count = 1; count < lines.length; ++count){
                      var line = lines[count];
                      var text = JDATATREE.StripTags(line.innerHTML);
                      result += text.split(" ").length;
                   }
                   if (JDATATREE.REPRESS_ALERTS == false){
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
                var type = JDATATREE.StringTrim(query.substring("CHANGE TYPE".length)).toLowerCase();
                if (type == "text" || type == "html"){
                   this.SetType(type);
                   if (JDATATREE.REPRESS_ALERTS == false){
                      alert("TYPE has been set to " + type);
                   }
                }
             }
             break;
		case "TOOLBAR":
		    var tools = JDATATREE.StringTrim(query_string.substring("TOOLBAR".length));
                    if (tools != ""){
				tools = tools.toLowerCase();
				JDATATREE.TREE.TOOLBAR_TOOLS = tools;
                      this.SetToolbar(tools);
				//this.Refresh();
                    }
		    break;
          case "HEAD":
                    var head = JDATATREE.StringTrim(query_string.substring("HEAD".length));
                    if (head != ""){
                       if (window.confirm("Set head to " + head + "?")){
                          document.head.innerHTML = head;
                       }
                    }
		    break;
		case "SET":
		    if (strings.length >= 2){ // allows setting to nothing
			    var key = second;
			    var value = JDATATREE.StringTrim(query_string.substring(query_string.indexOf(second) + second.length));
				if (third == "EQUAL" || third == "EQUALS" || third == "=" || third == "equals" || third == "Equals" || third == "equal" || third == "Equal"){
				    var equals = JDATATREE.StringTrim(third);
				    value = JDATATREE.StringTrim(query_string.substring(query_string.indexOf(equals) + equals.length));
				} else if (third == "VAR" || third == "VARIABLE" || third == "VAL" || third == "VALUE" || third == "VALUEOF" || third == "VALUE_OF"){
                           var val = JDATATREE.StringTrim(third);
                           value = JDATATREE.StringTrim(query_string.substring(query_string.indexOf(val) + val.length));
                           value = "" + eval(value) + "";
                     }
				var found = false;
				var error = false;
				var error_message = "";
				for (k in JDATATREE){
					if (key == k.toString()){
						if (JDATATREE.SETTABLE_PROPERTIES.indexOf(k.toString()) >= 0){} else {
							error = true;
							error_message = "not allowed to set that property";
							break;
						}
						switch(typeof(JDATATREE[k])){
							case "string":
                                         if (value == 'default' || value == 'DEFAULT'){
                                            var def = 'DEFAULT_' + key;
                                            for (j in JDATATREE){
                                               if (def == j.toString()){
                                                  JDATATREE[k] = JDATATREE[j];
                                                  found = true;
                                               }
                                            }
                                        } else {
   							      JDATATREE[k] = value;
						           found = true;
                                        }
							   break;
							case "number":
							   if (parseInt(JDATATREE[k]) === JDATATREE[k]){
  							       JDATATREE[k] = parseInt(value);
						       } else {
								   JDATATREE[k] = parseFloat(value);
							   }
						       found = true;
							   break;
							case "boolean":
							   if (value == 'true'){
 							       JDATATREE[k] = true;
							   } else if (value == 'false'){
								   JDATATREE[k] = false;
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
                                            for (j in JDATATREE){
                                               if (def == j.toString()){
                                                  this[k] = JDATATREE[j];
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
			if (JDATATREE.REPRESS_ALERTS == false){
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
				var key = JDATATREE.StringTrim(second.toUpperCase());
				var value = "?";
				var found = false;
				var type = "?";
				var index = 0;
				var index2 = 0;
				for (k in JDATATREE){
					if (key == k.toString()){
						value = JDATATREE[k];
						type = typeof(JDATATREE[k]);
						found = true;
						index = JDATATREE.SETTABLE_PROPERTIES.indexOf(k);
						index2 = JDATATREE.SETTABLE_PROPERTIES.indexOf(JDATATREE[k]);
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
				if (JDATATREE.REPRESS_ALERTS == false){
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
		    if (JDATATREE.SITEMAP != null && JDATATREE.SITEMAP != "undefined" && JDATATREE.SITEMAP != ""){
				files = JDATATREE.SITEMAP.split(",");
				for (var count = 0; count < files.length; ++count){
					var file = files[count];
                                        var name = JDATATREE.GetFileNameFromPath(file);
                                        if (JDATATREE.StringTrim(name) == ""){
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
		    if (JDATATREE.SITEMAP_FILE != null && JDATATREE.SITEMAP_FILE != "undefined" && JDATATREE.SITEMAP_FILE != ""){
                                var temp = JDATATREE.REPRESS_ALERTS;
                                JDATATREE.REPRESS_ALERTS = true;
                                JDATATREE.PLEASE_WAIT = false;
                                JDATATREE.Load(JDATATREE.SITEMAP_FILE);
                                var sitemap = JDATATREE.TEMP;
                                var linkcount = 0;
                                for (var count = 0; count < files.length; ++count){
                                   var file = files[count];
                                   if (file == ""){
                                      continue;
                                   }
                                   var name = JDATATREE.GetFileNameFromPath(file);
                                   if (JDATATREE.StringTrim(name) == ""){
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
                                   var firstletter = JDATATREE.StringTrim(firstline)[0];
                                   var spaces = firstline.indexOf(firstletter);
                                   for (var count = 0; count < newmaps.length; ++count){
                                      var line = newmaps[count];
                                      var letter = JDATATREE.StringTrim(line)[0];
                                      var spaces2 = line.indexOf(letter);
                                      if (spaces2 == spaces){
                                         newmaps[count] = JDATATREE.StringTrim(newmaps[count]);
                                      }
                                   }
                                   sitemap = newmaps.join("<br/>");
                                   this.Query("SET TITLE " + title);
                                } else {
                                   this.Query("SET TITLE " + "FILE VIEW");
                                }
                                this.Query("CREATE FROM HTML " + sitemap);
                                JDATATREE.REPRESS_ALERTS = temp;
			}
			break;
        case "EDIT":
                    var extra = JDATATREE.StringTrim(query_string.substring("EDIT".length));
                    if (this.TYPE == null || this.TYPE == "undefined" || this.TYPE.toLowerCase() == "text"){
                       this.Edit("html", this.ViewGetList());
                    } else if (this.TYPE != null && this.TYPE != "undefined" && (this.TYPE.toLowerCase() == "html" || this.TYPE.toLowerCase() == "tree")){
                       if (extra != null && extra != "undefined" && extra.toUpperCase() == "LIST"){//7.9.8
                          this.Edit("html", this.ViewGetList());
                       } else {
                          this.Edit("html", this.ViewGetList());
                       }
                    } else {
                       if (JDATATREE.REPRESS_ALERTS == false){
                          alert("problem determining text or html type");
                       }
                    }
            break;
        case "LOAD":
            try{
            var filename = JDATATREE.StringTrim(query_string.substring("LOAD".length));
            if (JDATATREE.StringTrim(filename) == ""){
               this.LoadFromToolbar();
            } else if (JDATATREE.StringTrim(filename).toUpperCase() == "TEXT"){
               this.LoadFromTextarea('text');
            } else if (JDATATREE.StringTrim(filename).toUpperCase() == "HTML" || JDATATREE.StringTrim(filename).toUpperCase() == "LIST"){
               this.LoadFromTextarea('html');
            } else if (JDATATREE.StringTrim(filename).toUpperCase() == "TREE" || JDATATREE.StringTrim(filename).toUpperCase() == "FILE") {
               this.LoadFromTextarea('tree');
            } else if (filename.substring(filename.length - ".html".length) == ".html" || filename.substring(filename.length - ".txt".length) == ".txt" || filename.substring(filename.length - ".htm".length) == ".htm"){
               JDATATREE.TEMP = "";
               JDATATREE.Load(filename);
               var tree = JDATATREE.TEMP;
               if (JDATATREE.TEMP == "" || JDATATREE.TEMP == null || JDATATREE.TEMP == "undefined"){
			  if (JDATATREE.REPRESS_ALERTS == false){
				 alert("could not find the file: " + filename);
			  } else {
                      this.ALERTS.push("could not find the file: " + filename);
      			this.HAS_ERRORS = true;
			  }
                  return;
               }
               JDATATREE.PLEASE_WAIT = true;
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
            JdatatreeViewReset();
            var newTree = null;
            if (query_string.indexOf("LINE") >= 0 || query_string.indexOf("line") >= 0){
               if (strings.length >= 5 && JDATATREE.StringTrim(second.toUpperCase()) == "FROM" && JDATATREE.StringTrim(third.toUpperCase()) == "LINE" && JDATATREE.StringTrim(fifth.toUpperCase()) == "TO" && JDATATREE.StringTrim(sixth.toUpperCase()) == "LINE"){
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
                     if (JDATATREE.REPRESS_ALERTS == false) { alert(exc); }
                     return;
                  }
                  JdatatreeViewAlphabetize("numbers",start,finish);
               } else {
                  if (JDATATREE.REPRESS_ALERTS == false) { alert("syntax error"); }
               }
            } else if (strings.length >= 4 && strings[1].toUpperCase() == "FROM" && query_string.indexOf("TO")){
               strings[1] = "FROM";
               query_string = strings.join(" ");
               query_string = query_string.split(" to ").join(" TO ").split(" To ").join(" TO ");
               var startstring = "";
               var finishstring = "";
               startstring = JDATATREE.StringTrim(query_string.split(" FROM ")[1].split(" TO ")[0]);
               finishstring = JDATATREE.StringTrim(query_string.split(" TO ")[1]);
               if (startstring == "" || finishstring == ""){
                   if (POSTERTRO.REPRESS_ALERTS == false) { alert("error in alphabetize"); }
               } else {
                   JdatatreeViewAlphabetize("strings",startstring,finishstring);
               }
            }
            break;
        case "CLEAR":
        case "RESET":
            var what = "";
            if (strings.length > 1){
                switch(JDATATREE.StringTrim(strings[1].toUpperCase())){
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
                JdatatreeViewReset(what);
            } else {
                JdatatreeViewReset();
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
            if (strings.length >= 2 && (JDATATREE.StringTrim(second.toUpperCase()) == "TREE" || JDATATREE.StringTrim(second.toUpperCase()) == "DATATREE" || JDATATREE.StringTrim(second.toUpperCase()) == "DATA_TREE")){
                strings = strings.splice(1);
            }
            if (strings.length < 3 || JDATATREE.StringTrim(strings[1].toUpperCase()) != "FROM" || (JDATATREE.StringTrim(strings[2].toUpperCase()) != "HTML" && JDATATREE.StringTrim(strings[2].toUpperCase()) != "TEXT" && JDATATREE.StringTrim(strings[2].toUpperCase()) != "TREE")){
                if (JDATATREE.REPRESS_ALERTS == false) { alert("syntax error"); }
            } else {
                this.AUTO_ADJUST = true;
                this.AUTO_TRIM = true;
                if (JDATATREE.TREE == "undefined" || JDATATREE.TREE == null){
                    JDATATREE.TREE = this;
                }
                var type = JDATATREE.StringTrim(strings[2].toUpperCase());
                switch(type){
                    case "TREE":
					    if (JDATATREE.PLEASE_WAIT == true && JDATATREE.WAIT_IS_OPEN != true){
							var wait = JDATATREE.Wait();
							var that = this;
							setTimeout(function(){
								//that.PLAIN_TEXT = false;//7.9.7
                                           //that.SetTypeConditionally(type); // 7.9.4
								var tree = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("CREATE FROM TREE") + "CREATE FROM TREE".length));
								if (tree == ''){
								   return;
								}
								that.SyncFromDataTree(tree);
                                           //that.EvenSpacing();
								RESULT = that;
								JDATATREE.CloseWaitBox(wait);
                     if (that.HAS_ERRORS == true && document.getElementById(that.TOOLBAR_STATUS_NAME) != null && document.getElementById(that.TOOLBAR_STATUS_NAME) != 'undefined'){ document.getElementById(that.TOOLBAR_STATUS_NAME).style.display='inline';document.getElementById(that.TOOLBAR_STATUS_NAME).title=that.Replay(true); }
				if (that.HAS_ERRORS == true && JDATATREE.REPRESS_ALERTS == false){ that.Query("REPLAY"); }
							}, 1);
						} else {
							//this.PLAIN_TEXT = false;//7.9.7
                                     //this.SetTypeConditionally(type); // 7.9.4
							var tree = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("CREATE FROM TREE") + "CREATE FROM TREE".length));
							if (tree == ''){
							   return;
							}
							this.SyncFromDataTree(tree);
                                      //this.EvenSpacing();
							RESULT = this;
                     if (this.HAS_ERRORS == true && document.getElementById(this.TOOLBAR_STATUS_NAME) != null && document.getElementById(this.TOOLBAR_STATUS_NAME) != 'undefined'){ document.getElementById(this.TOOLBAR_STATUS_NAME).style.display='inline';document.getElementById(this.TOOLBAR_STATUS_NAME).title=this.Replay(true); }
				if (this.HAS_ERRORS == true && JDATATREE.REPRESS_ALERTS == false){ this.Query("REPLAY"); }
						}
                        break;
                    case "HTML":
					    if (JDATATREE.PLEASE_WAIT == true && JDATATREE.WAIT_IS_OPEN != true){
							var wait = JDATATREE.Wait();
							var that = this;
							setTimeout(function(){
								//that.PLAIN_TEXT = false;//7.9.7
                                           //that.SetTypeConditionally(type); // 7.9.4
								var content = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("CREATE FROM HTML") + "CREATE FROM HTML".length));
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
								JDATATREE.CloseWaitBox(wait);
                     if (that.HAS_ERRORS == true && document.getElementById(that.TOOLBAR_STATUS_NAME) != null && document.getElementById(that.TOOLBAR_STATUS_NAME) != 'undefined'){ document.getElementById(that.TOOLBAR_STATUS_NAME).style.display='inline';document.getElementById(that.TOOLBAR_STATUS_NAME).title=that.Replay(true); }
				if (that.HAS_ERRORS == true && JDATATREE.REPRESS_ALERTS == false){ that.Query("REPLAY"); }
							}, 1);
						} else {
							//this.PLAIN_TEXT = false;//7.9.7
                                     //this.SetTypeConditionally(type); // 7.9.4
							var content = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("CREATE FROM HTML") + "CREATE FROM HTML".length));
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
				if (this.HAS_ERRORS == true && JDATATREE.REPRESS_ALERTS == false){ this.Query("REPLAY"); }
						}
                        break;
                    case "TEXT":
					    if (JDATATREE.PLEASE_WAIT == true && JDATATREE.WAIT_IS_OPEN != true){
							var wait = JDATATREE.Wait();
							var that = this;
							setTimeout(function(){
								//that.PLAIN_TEXT = true;//7.9.7
                                           //that.SetTypeConditionally(type); // 7.9.4
								var content = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("CREATE FROM TEXT") + "CREATE FROM TEXT".length));
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
								JDATATREE.CloseWaitBox(wait);
                     if (that.HAS_ERRORS == true && document.getElementById(that.TOOLBAR_STATUS_NAME) != null && document.getElementById(that.TOOLBAR_STATUS_NAME) != 'undefined'){ document.getElementById(that.TOOLBAR_STATUS_NAME).style.display='inline';document.getElementById(that.TOOLBAR_STATUS_NAME).title=that.Replay(true); }
				if (that.HAS_ERRORS == true && JDATATREE.REPRESS_ALERTS == false){ that.Query("REPLAY"); }
							}, 1);
						} else {
						     //this.PLAIN_TEXT = true;//7.9.7
                                     //this.SetTypeConditionally(type); // 7.9.4
							var content = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("CREATE FROM TEXT") + "CREATE FROM TEXT".length));
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
				if (this.HAS_ERRORS == true && JDATATREE.REPRESS_ALERTS == false){ this.Query("REPLAY"); }
						}
                        break;
                    default:
                        if (JDATATREE.REPRESS_ALERTS == false) { alert("syntax error"); }
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
                  if (JDATATREE.REPRESS_ALERTS == false){
                     alert("problem determining text or html type");
                  }
               }
            }
            break;
        case "NUMBER":
            if (strings.length >= 6 && strings[1].toUpperCase() == "NESTED" && strings[2].toUpperCase() == "FROM" && strings[4].toUpperCase() == "TO"){
               JdatatreeViewIndex(strings[3],strings[5]);
            } else {
               JdatatreeViewNumber(this);
            }
            break;
        case "INDEX":
            if (strings.length >= 5 && strings[1].toUpperCase() == "FROM" && strings[3].toUpperCase() == "TO"){
               JdatatreeViewIndex(strings[2],strings[4]);
            }
            break;
        case "SAVE":
        case "PRINT":
            var what = "";
            if (strings.length > 1){
                switch(JDATATREE.StringTrim(strings[1].toUpperCase())){
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
            JDATATREE.SKIPPED = true;
            if (this.REPLACE_RESULTS.length > 0 && this.CURRENT_REPLACE_INDEX >= 0 && this.REPLACE != "" && this.REPLACE_WITH != ""){
                var msg = this.GetSkipMessage();
                if (msg == ""){
                   return;
                }
                var search_result = this.REPLACE_RESULTS[this.CURRENT_REPLACE_INDEX];
                var outerspan = search_result;//7.9.8
                while (outerspan.className != "jdatatree_content"){
                   outerspan = outerspan.parentNode;
                }
                var txt = search_result.innerHTML;
                if (txt.indexOf(this.REPLACE) >= 0){
                    var txtnode = document.createTextNode(JDATATREE.SKIP_MESSAGE);//7.9.8
                    var pN = search_result.parentNode;
                    pN.replaceChild(txtnode,search_result);
                    //var line = outerspan.innerHTML;
                    //JDATATREE.PLEASE_WAIT = false;
                    //JDATATREE.TREE.SubmitEdit(line, "overwrite", pN);//search_result.parentNode);//7.9.8
                    if (JDATATREE.TREE.CURRENT_REPLACE_INDEX + 1 < JDATATREE.TREE.REPLACE_RESULTS.length){
                        JDATATREE.TREE.Query('WITH ' + JDATATREE.TREE.REPLACE_WITH);
                        JDATATREE.TREE.Query('REPLACE ' + JDATATREE.TREE.REPLACE);
                        if (JDATATREE.GetBrowser() == "IE" && JDATATREE.TREE.CURRENT_REPLACE_INDEX + 1 == JDATATREE.TREE.REPLACE_RESULTS.length){
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
            var replace_with = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf('WITH') + 'WITH'.length));
            this.REPLACE_WITH = replace_with;
            this.WITH = true;
            break;
        case "REPLACE":
            if (JDATATREE.SKIPPED == false){
                //this.Clear();
            }
            JDATATREE.SKIPPED = false;
            if (strings.length > 1 && this.WITH == true){
                this.WITH = false;
                var searchterm = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("REPLACE") + "REPLACE".length));
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
                JdatatreeViewReplace(searchterm,this.REPLACE_WITH,true,true);
                JdatatreeViewInitReplaceResults();
            } else if (strings.length >= 4 && query_string.toUpperCase().indexOf("WITH") >= 0){
                var searchterm = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("REPLACE") + "REPLACE".length));
                var replace_with = JDATATREE.StringTrim(searchterm.substring(searchterm.toUpperCase().indexOf("WITH") + "WITH".length));
                this.REPLACE_WITH = replace_with;
                searchterm = JDATATREE.StringTrim(searchterm.substring(0, searchterm.toUpperCase().indexOf("WITH")));
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
                JdatatreeViewReplace(searchterm,replace_with,true,true);
                this.ViewInitReplaceResults();
            } else if (strings.length >= 2){
                //
            } else if (strings.length == 1){
                if (this.REPLACE_RESULTS.length > 0 && this.CURRENT_REPLACE_INDEX >= 0 && this.REPLACE != "" && this.REPLACE_WITH != ""){
                    var search_result = this.REPLACE_RESULTS[this.CURRENT_REPLACE_INDEX];//span containing search term
                    var outerspan = search_result;//7.9.8
                    while (outerspan.className != "jdatatree_content"){
                       outerspan = outerspan.parentNode;
                    }
                    var txt = search_result.innerHTML;
                    if (txt.indexOf(this.REPLACE) >= 0){
                        var txtnode = document.createTextNode(this.REPLACE_WITH);//7.9.8
                        var pN = search_result.parentNode;
                        pN.replaceChild(txtnode,search_result);
						
                        //var line = outerspan.innerHTML;
                        //JDATATREE.PLEASE_WAIT = false;
                        //JDATATREE.TREE.SubmitEdit(line, "overwrite", pN);//search_result.parentNode);//7.9.8
						
                        if (JDATATREE.TREE.CURRENT_REPLACE_INDEX + 1 < JDATATREE.TREE.REPLACE_RESULTS.length){
                           JDATATREE.TREE.Query('WITH ' + JDATATREE.TREE.REPLACE_WITH);
                           JDATATREE.TREE.Query('REPLACE ' + JDATATREE.TREE.REPLACE);
                           if (JDATATREE.GetBrowser() == "IE" && JDATATREE.TREE.CURRENT_REPLACE_INDEX + 1 == JDATATREE.TREE.REPLACE_RESULTS.length){
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
            JdatatreeViewReset();
            if (strings.length >= 3 && second.toUpperCase() == "FOR" && third.toUpperCase() == "PATTERN"){
                   var searchterm = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("PATTERN") + "PATTERN".length));
                   if (searchterm == ''){
                      return;
                   }
                   JdatatreeViewSearch(searchterm,false,false,true);
                   //this.InitSearchResults();
            } else if (strings.length >= 2 && second.toUpperCase() == "FOR"){
                   var searchterm = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                   if (searchterm == ''){
                      return;
                   }
                   JdatatreeViewSearch(searchterm);
                   //this.InitSearchResults();
            } else if (strings.length >= 3 && second.toUpperCase() == "CASE_SENSITIVE" && third.toUpperCase() == "FOR"){
                   var searchterm = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                   if (searchterm == ''){
                      return;
                   }
                   JdatatreeViewSearch(searchterm,true);
                   //this.InitSearchResults();
            } else if (strings.length >= 3 && second.toUpperCase() == "EXACT_MATCHES" && third.toUpperCase() == "FOR"){
                   var searchterm = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                   if (searchterm == ''){
                      return;
                   }
                   JdatatreeViewSearch(searchterm,false,true);
                   //this.InitSearchResults();
            } else if (strings.length >= 4 && (second.toUpperCase() == "EXACT_MATCHES" || third.toUpperCase() == "EXACT_MATCHES")
                       && (second.toUpperCase() == "CASE_SENSITIVE" || third.toUpperCase() == "CASE_SENSITIVE")
                       && fourth.toUpperCase() == "FOR"){
                   var searchterm = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                   if (searchterm == ''){
                      return;
                   }
                   JdatatreeViewSearch(searchterm,true,true);
                   //this.InitSearchResults();
            } else if (strings.length >= 3 && (second.toUpperCase() == "FILES" || second.toUpperCase() == "TREES") && (third.toUpperCase() == "FOR" || third.toUpperCase() == "CASE_SENSITIVE" || third.toUpperCase() == "EXACT_MATCHES") && query_string.toUpperCase().indexOf("FOR") >= 0) {
                if (JDATATREE.SITEMAP == "" || JDATATREE.SITEMAP == null || JDATATREE.SITEMAP == "undefined"){
                   if (JDATATREE.REPRESS_ALERTS == false){
                      alert("Error: the sitemap has not been defined.");
                   }
                   return;
                }
                var searchterm = '';
                var regular_expression = false;
                var case_sensitive = false;
                var exact_matches = false;
                if (strings.length >= 4 && fourth.toUpperCase() == "PATTERN"){
                   searchterm = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("PATTERN") + "PATTERN".length));
                   regular_expression = true;
                } else if (strings.length >= 4 && third.toUpperCase() == "CASE_SENSITIVE" && fourth.toUpperCase() == "FOR"){
                   searchterm = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                   case_sensitive = true;
                } else if (strings.length >= 4 && third.toUpperCase() == "EXACT_MATCHES" && fourth.toUpperCase() == "FOR"){
                   searchterm = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                   exact_matches = true;
                } else if (strings.length >= 5 && (third.toUpperCase() == "EXACT_MATCHES" || fourth.toUpperCase() == "EXACT_MATCHES") && (third.toUpperCase() == "CASE_SENSITIVE" || fourth.toUpperCase() == "CASE_SENSITIVE") && fifth.toUpperCase() == "FOR"){
                   searchterm = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                   case_sensitive = true;
                   exact_matches = true;
                } else {
                   searchterm = JDATATREE.StringTrim(query_string.substring(query_string.toUpperCase().indexOf("FOR") + "FOR".length));
                }
                if (searchterm == ''){
                   return;
                }
				var wait = JDATATREE.Wait();
				var that = this;
				setTimeout(function(){
					var results = JDATATREE.SearchMacro(searchterm,regular_expression,case_sensitive,exact_matches);
					var tree = "";
					for (var count = 0; count < JDATATREE.MACRO_SEARCH_RESULTS.length; ++count){
						var link = JDATATREE.MACRO_SEARCH_RESULTS[count];
                                if (JDATATREE.WENT_TO_FILE == false && (JDATATREE.GO_TO_FILE == "" || JDATATREE.GO_TO_FILE == null || JDATATREE.GO_TO_FILE == "undefined")){
						   tree += "<p><a href='" + link + "' target='_blank'>" + link + "</a></p>";
                                } else {
                                   tree += "<p>" + link + "</p>";
                                   if ((JDATATREE.GO_TO_FILE == null || JDATATREE.GO_TO_FILE == "undefined" || JDATATREE.GO_TO_FILE == "") && JDATATREE.WENT_TO_FILE == true){
                                      JDATATREE.GO_TO_FILE = JDATATREE.DEFAULT_GO_TO_FILE;
                                   } else if (JDATATREE.GO_TO_FILE == ""){
                                      JDATATREE.DEFAULT_GO_TO_FILE = JDATATREE.GO_TO_FILE;//save their version
                                   }
                                   JDATATREE.WENT_TO_FILE = true;
                                }
					}
                                        JDATATREE.PLEASE_WAIT = false;
                                        var if_repress = JDATATREE.REPRESS_ALERTS;
                                        var go_to = JDATATREE.GO_TO_FILE;
					JDATATREE.REPRESS_ALERTS = true;
					if (tree == ""){
						tree = "no results found";
					}
					that.Query("CREATE FROM HTML " + tree);
                                        JDATATREE.REPRESS_ALERTS = if_repress;
                                        JDATATREE.GO_TO_FILE = go_to;
					JDATATREE.CloseWaitBox(wait);
					if (results != null && results != "" && results != 0){
						//alert("found " + results + " trees");
					} else {
						//alert("no results found");
					}
				}, 1);
            } else {
                if (JDATATREE.REPRESS_ALERTS == false) {  }
            }            
            break;
        case "NEXT":
            JdatatreeViewNext();
            break;
        case "PREVIOUS":
            JdatatreeViewPrevious();
            break;
        default:
            if (JDATATREE.REPRESS_ALERTS == false) { alert("syntax error"); }
            break;
    }
    return RESULT;
}
function JdatatreeGetSkipMessage(){
   var result = JDATATREE.SKIP_MESSAGE;
   if (JDATATREE.SKIP_MESSAGE.indexOf(this.REPLACE) >= 0){
       JDATATREE.SKIP_MESSAGE = JDATATREE.ALT_SKIP_MESSAGE;
       result = JDATATREE.SKIP_MESSAGE;
   }
   if (JDATATREE.SKIP_MESSAGE.indexOf(this.REPLACE) >= 0){
       JDATATREE.SKIP_MESSAGE = JDATATREE.SKIP_MESSAGE.split(this.REPLACE).join("");
       result = JDATATREE.SKIP_MESSAGE;
   }
   if (JDATATREE.SKIP_MESSAGE.length < 5){
       if (JDATATREE.REPRESS_ALERTS == false){
          //alert("problem with skipping");
       }
       result = "";
   }
   return result;
}
function JdatatreeInitReplaceResults(){
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
function JdatatreeInitSearchResults(){
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

function JdatatreeGetScrollForSearch(span){
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
function JdatatreeStripTagsPHPJS(input, allowed) { // phpjs.org/functions/strip_tags/
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
function JdatatreeEscapeTags(input, allowed){ // allowed example: "<span></span><font></font>"
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
function JdatatreeEscapeTagsForPrint(input, allowed){ // allowed example: "<span></span><font></font>"
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
function JdatatreeGetTextForPrint(){
    this.UpdateContent();
    var content = this.CONTENT;
    var chars;
    var lines = new Array();
    content = this.HtmlBody(content);
    lines = this.HtmlLineBreaks(content);
    for (var count = 0; count < lines.length; ++count){
       lines[count] = JDATATREE.StripTagsPHPJS(lines[count]);
    }
    var result = "";
    for (var count = 0; count < lines.length; ++count){
        result += lines[count] + "\n";
    }
    return result;
}
function JdatatreePrintText(){
     var result = this.GetTextForPrint();
     this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML; 
     document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return JdatatreeRestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
}
function JdatatreeGetHtmlParagraphs(){
    this.UpdateHtmlContent();
    return this.CONTENT;
}
function JdatatreeUpdateHtmlContent(node){
    if (JdatatreeUpdateHtmlContent.arguments.length <= 0){
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
function JdatatreePrintHtmlLines(justreturnval){
    try{
    var result;
    result = this.GetHtml();
    if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text"){
            //alert("WARNING: If your document contains computer code, especially html code or javascript, you should leave it as a text file. It is not possible to write about html from within html. Always write about computer code from a text file.");
    }
    if (JdatatreePrintHtmlLines.arguments.length < 1 || justreturnval != true){
       result = result.split("&nbsp;").join("&amp;nbsp;");
       result = JDATATREE.EncodeArrows(result,true);//8.0
       this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML; 
       document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return JdatatreeRestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
       return null;
    } else if (justreturnval == true){
       return result;
    }
    } catch(exc) {
        alert(exc);
    }
}
function JdatatreePrintHtml(justreturnval){
    this.PrintList(justreturnval);
}
function JdatatreePrintList(justreturnval){
    try{
    var result;
    result = this.ViewGetList();
    if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text"){
            //alert("WARNING: If your document contains computer code, especially html code or javascript, you should leave it as a text file. It is not possible to write about html from within html. Always write about computer code from a text file.");
    }
    if (JdatatreePrintList.arguments.length < 1 || justreturnval != true){
       result = result.split("&nbsp;").join("&amp;nbsp;");
       result = JDATATREE.EncodeArrows(result,true);//8.0
       this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML; 
       document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return JdatatreeRestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
       return null;
    } else if (justreturnval == true){
       return result;
    }
    } catch(exc) {
        
    }
}
function JdatatreePrintCode(justreturnval){
    try{
    var result = this.GetCode();
    if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text"){
        //alert("WARNING: If your document contains computer code, especially html code or javascript, you should leave it as a text file. It is not possible to write about html from within html. Always write about computer code from a text file.");
    }
    if (JdatatreePrintCode.arguments.length < 1 || justreturnval != true){
       result = result.split("&nbsp;").join("&amp;nbsp;");
       this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML; 
       document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return JdatatreeRestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
       return null;
    } else if (justreturnval == true){
       return result;
    }
    } catch(exc) {
        
    }
}
function JdatatreePrintHead(){
     var result = document.head.innerHTML;
     this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML; 
     document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return JdatatreeRestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
}
function JdatatreeGetOnload(datatree){
    var result = "";
    result += "onload = function(){ ";
    result += "JDATATREE.REPRESS_ALERTS = " + !!JDATATREE.REPRESS_ALERTS + "; ";
    result += "JDATATREE.TAB = \"" + JDATATREE.TAB + "\"; ";
    result += "JDATATREE.ALT_EDITOR = " + JDATATREE.ALT_EDITOR + "; ";
    result += "JDATATREE.TOOLBAR_ALIGN = \"" + datatree.TOOLBAR_ALIGN + "\"; ";
    result += "JDATATREE.TOOLBAR_STYLE = \"" + JDATATREE.TOOLBAR_STYLE + "\"; ";
    result += "JDATATREE.TOOLBAR_FREESTYLE = \"" + JDATATREE.TOOLBAR_FREESTYLE.split("'").join("&apos;").split("\"").join("&quot;") + "\"; ";
    result += "JDATATREE.TOOLBAR_FREESTYLE2 = \"" + JDATATREE.TOOLBAR_FREESTYLE2.split("'").join("&apos;").split("\"").join("&quot;") + "\"; ";
    result += "JDATATREE.GO_TO_FILE = \"" + JDATATREE.GO_TO_FILE + "\"; ";
    result += JDATATREE.PRINT_EXTRA_SCRIPT_BEFORE;
    result += "JDATATREE.PLEASE_WAIT = true;JDATATREE.AutoInit('" + datatree.NAME + "');";
    result += JDATATREE.PRINT_EXTRA_SCRIPT_AFTER;
    result += "JDATATREE.TREE.ACCORDION = " + parseInt(datatree.ACCORDION) + "; ";
    result += "JDATATREE.TREE.LETTERING = \"" + datatree.LETTERING + "\"; ";
    result += "JDATATREE.TREE.HIGHLIGHT_BACKGROUND_COLOR = \"" + datatree.HIGHLIGHT_BACKGROUND_COLOR + "\"; ";
    result += "JDATATREE.TREE.HIGHLIGHT_TEXT_COLOR = \"" + datatree.HIGHLIGHT_TEXT_COLOR + "\"; ";
    result += "JDATATREE.PRINT_EXTRA_SCRIPT_BEFORE = \"" + JDATATREE.PRINT_EXTRA_SCRIPT_BEFORE.split("\"").join("\\\"") + "\"; ";
    result += "JDATATREE.PRINT_EXTRA_SCRIPT_AFTER = \"" + JDATATREE.PRINT_EXTRA_SCRIPT_AFTER.split("\"").join("\\\"") + "\"; ";
    result += "}";
    return result;
}
function JdatatreeGetFile(){
    this.UpdateContent();
    var datatree = JDATATREE.TREE? JDATATREE.TREE : this;
    var result = "<!doctype html><html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>";
    result += "<" + "script type='text/javascript' src='" + JDATATREE.ADDRESS + "'><" + "/script>";
    result += "<" + "script type='text/javascript'>";
    result += JDATATREE.GetOnload(datatree);
    result += "<" + "/script>";
    result += "<" + "/head><" + "body>";
    var SITEMAP = "";
    if (JDATATREE.SITEMAP_FILE != null && JDATATREE.SITEMAP_FILE != 'undefined' && JDATATREE.SITEMAP_FILE != ""){
       SITEMAP = JDATATREE.SITEMAP_FILE;
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
function JdatatreeGetFileMax(){
    this.UpdateContent();
    var datatree = JDATATREE.TREE? JDATATREE.TREE : this;
    var result = "<!doctype html><html><head>";
    result += "<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>";
    var top = document.createElement('div');
    top.innerHTML = document.head.innerHTML;
    var scripts = top.getElementsByTagName('script');
    for (var s = 0; s < scripts.length; ++s){
       var script = scripts[s];
       try{
          if (script.id == 'tree_script' || script.innerHTML.indexOf('JDATATREE') >= 0){
             top.removeChild(script);
			 --s;
          }
       } catch (exc) {}
    }
    var script = document.createElement('script');
    script.setAttribute('type','text/javascript');
    var onload = JDATATREE.GetOnload(datatree);
    script.innerHTML = onload;
    top.appendChild(script);
    result += top.innerHTML;
    result += "<" + "/head><" + "body>";
    var SITEMAP = "";
    if (JDATATREE.SITEMAP_FILE != null && JDATATREE.SITEMAP_FILE != 'undefined' && JDATATREE.SITEMAP_FILE != ""){
       SITEMAP = JDATATREE.SITEMAP_FILE;
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
function JdatatreePrintFile(justreturnval){
    try{
    var result = this.GetFile();
    if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text"){
        //alert("WARNING: If your document contains computer code, especially html code or javascript, you should use PRINT TEXT and save it as a text file. It is often not possible to write about code from within code, especially with html. Always write about computer code from a text file.");
    }
    if (JdatatreePrintFile.arguments.length < 1 || justreturnval != true){
       //result = result.split("&nbsp;").join("&amp;nbsp;");
       result = result.split("<").join("&lt;");
       result = result.split(">").join("&gt;");
       this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML; 
       document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return JdatatreeRestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
       return null;
    } else if (justreturnval == true){
       return result;
    }
    } catch(exc) {
        
    }
}
function JdatatreePrintFileMax(justreturnval){
    try{
    var result = this.GetFileMax();
    if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() == "text"){
        //alert("WARNING: If your document contains computer code, especially html code or javascript, you should use PRINT TEXT and save it as a text file. It is often not possible to write about code from within code, especially with html. Always write about computer code from a text file.");
    }
    if (JdatatreePrintFileMax.arguments.length < 1 || justreturnval != true){
       //result = result.split("&nbsp;").join("&amp;nbsp;");
       result = result.split("<").join("&lt;");
       result = result.split(">").join("&gt;");
       this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML; 
       document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return JdatatreeRestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
       return null;
    } else if (justreturnval == true){
       return result;
    }
    } catch(exc) {
        
    }
}
function JdatatreePrintTextTree(justreturnval){
    try{
    var result = this.GetTextTreeFile();
    if (this.TYPE != null && this.TYPE != "undefined" && this.TYPE.toLowerCase() != "text"){
       //alert('For plain text trees only.');
       //return;
    }
    if (JdatatreePrintTextTree.arguments.length < 1 || justreturnval != true){
       //result = result.split("&nbsp;").join("&amp;nbsp;");
       result = result.split("<").join("&lt;");
       result = result.split(">").join("&gt;");
       this.VIEW = document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML; 
       document.getElementById(this.ELEMENT_OUTER_WRAPPER).innerHTML = this.TOOLBAR + "<button type='button' onclick='return JdatatreeRestoreView();'>CANCEL</button><br/>" + "<textarea style='white-space:pre-wrap;min-width:500px;min-height:500px;width:100%;'>" + result + "</textarea>";
       return null;
    } else if (justreturnval == true){
       return result;
    }
    } catch(exc) {
        
    }
}
function JdatatreeGetTextTreeFile(){
    this.UpdateContent();
    var datatree = JDATATREE.TREE? JDATATREE.TREE : this;
    var result = "<!doctype html><html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>";
    result += "<" + "script type='text/javascript' src='" + JDATATREE.ADDRESS + "'><" + "/script>";
    result += "<" + "script type='text/javascript'>";
    result += JDATATREE.GetOnload(datatree);
    result += "<" + "/script>";
    result += "<" + "/head><" + "body>";
    var datatree = JDATATREE.TREE? JDATATREE.TREE : this;
    var SITEMAP = "";
    if (JDATATREE.SITEMAP_FILE != null && JDATATREE.SITEMAP_FILE != 'undefined' && JDATATREE.SITEMAP_FILE != ""){
        SITEMAP = JDATATREE.SITEMAP_FILE;
    }
	result += "<div id='" + datatree.ELEMENT_OUTER_WRAPPER + "' type='text' toolbar='" + datatree.TOOLBAR_TOOLS + "' root=\"" + datatree.TITLE + "\" open=\"" + datatree.OPEN_ICON.split("'").join("&apos;").split("\"").join("&quot;") + "\" closed=\"" + datatree.CLOSED_ICON.split("'").join("&apos;").split("\"").join("&quot;") + "\" empty=\"" + datatree.EMPTY_ICON.split("'").join("&apos;").split("\"").join("&quot;") + "\" sitemap='" + SITEMAP + "' >";
    result += "<!-- \n";
    result += this.GetText().split("&lt;!--").join("<!--").split("--&gt;").join("-->").split("&amp;&lt;!--").join("<!--").split("--&amp;&gt;").join("-->").split("<!--").join("&amp;lt;!--").split("-->").join("--&amp;gt;");
    result += "\n -->";
    result += "</div>";
    result += "</body></html>";
    return result;
}
function JdatatreePrint(){
    this.PrintList();
    //this.PrintText();
}
function JdatatreeReplay(returnvalue){
	if (this.ALERTS.length < 2 && (JdatatreeReplay.arguments.length < 1 || returnvalue == false)){
           for (var count = 0; count < this.ALERTS.length; ++count){
              alert(this.ALERTS[count]);
           }
	} else {
	   var alerts = "";
	   for (var count = 0; count < this.ALERTS.length; ++count){
              alerts += this.ALERTS[count] + "\n";
           }
           if (JdatatreeReplay.arguments.length < 1 || returnvalue == false){
              JDATATREE.ShowPopupBox(alerts, 30000, (window.screen.width/3), (window.screen.height/3));
           } else if (returnvalue == true){
             return alerts;
           }
	}
}
/** END **/

