/**
 * TASKS
 * remove SPACER.TREE from strings
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


