import { SidebarTabButtonPalette } from "./SidebarTabButtonPalette.js";
import { SidebarTabButton } from "./SidebarTabButton.js";
import { SidebarData } from "./SidebarData.js";

export class SidebarTab {
    constructor(sidebar, _opts) {
        this.opts = Object.assign({
            icon: "fas fa-question-circle",
            id: ``,
            title: '',
            data: null,
            loading_msg: 'Loading...',
            async: true,
        }, _opts);
        
        this.tab_dom_object = this._initTab();
        this.content_dom_object = this._initContent();

        this.content_items = [];
    }

    _initTab() {
        var li = document.createElement('li');
        li.innerHTML = `<a href="#${this.opts.id}" role="tab"><i class="${this.opts.icon}"></i></a>`;

        return li; 
    }
    _initContent() {

        var div = document.createElement('div');
        div.classList.add(['sidebar-pane']);
        div.setAttribute('id', this.opts.id);
        div.innerHTML = `<h1 class="sidebar-header">
                            <p style="margin: 0;">${this.opts.title}</p>
                            <span class="sidebar-close"><i class="fa fa-caret-left"></i></span>
                        </h1>`;

        return div;
    }

    AddButton(_opts) {

        //CREATE TAB
        var item_opts = Object.assign({
            icon: "fas fa-question-circle",
            text: ''
        }, _opts);

        var new_button = new SidebarTabButton(item_opts);

        //ADD CONTENT
        this.AddContent(new_button);

        //RETURN NEW BUTTON
        return new_button;
    }

    AddContent(tabItemContent) {
        //TRACK IN CONTENT LIST
        this.content_items.push(tabItemContent);

        //PUSH TO DOM OBJECT 
        this.content_dom_object.append(tabItemContent.DOMObject);
    }

    async AddDataAsync(data) {
        //CREATE DATA
        var new_data = new SidebarData({html:'<h1>loading</h1>'});

        //ADD CONTENT
        this.AddContent(new_data);

        var asyncData = await data();
        new_data.UpdateHTML(asyncData);

        return new_data;
    }

    AddData(_opts) {
        //CREATE DATA
        var new_data = new SidebarData(_opts);

        //ADD CONTENT
        this.AddContent(new_data);

        return new_data;
    }

    AddButtonPalette(_opts) {

        var item_opts = Object.assign({}, _opts);

        //CREATE TAB
        var new_button = new SidebarTabButtonPalette(this, item_opts);
        
        //ADD CONTENT
        this.AddContent(new_button);

        return new_button;
    }

    AddBar() {
        this.AddData({ html: `<hr>` });
    }

    ClearItems(_opts) {

        this.content_items.forEach((c) => {
            //REMOVE FROM DOM
            c.Remove();
        });

        this.content_items = [];
    }

    get ContentDOMObject() {
        return this.content_dom_object;
    }
    get TabDOMObject() {
        return this.tab_dom_object;
    }
}
