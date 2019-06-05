
import { SidebarTab } from "./SidebarTab.js";
import { SidebarButton } from "./SidebarButton.js";


class Sidebar {
    constructor(doucment_id, { id = 'sidebar' } = {}) {
        //this.drawing = _drawing;
        //this.opts = Object.assign({}, _opts);


        this.id = id;//this.opts.hasOwnProperty('id') ? this.opts.id : 'sidebar';

        this.id_counter = 1;

        this.tabs_list = [];
        this.controls_list = [];


        this.dom_element = this.InsertHTML();

        this.leaflet_sidebar = L.control.sidebar(this.id);

        //ADD MARKUP LAYER GROUP TO DWG
        document.dispatchEvent(new CustomEvent('add_to_dwg', { detail: this.leaflet_sidebar }));

        document.addEventListener('show_data', (e) => {
            var new_data_tab = this.AddTab(e.detail);
            new_data_tab.AddData(e.detail);
            this.OpenTab(new_data_tab);

        }, false);

        document.addEventListener('remove_data', (e) => {
            this.RemoveTab(e.detail);
        }, false);

        document.addEventListener('open_tab', this.OpenTab.bind(this), false);
    }
    
    OpenTab(arg) {
        var id = '';
        if (typeof arg === 'object') {
            //FIND STRING ID IN OBJECT
            //TODO
            var index = this.tabs_list.indexOf(arg);
            id = this.tabs_list[index].id;
        } else if (typeof arg === 'string') {
            id = arg;
        } 
        if (id !== '') {
            this.leaflet_sidebar.open(id);
        }
    }

    InsertHTML() {
        var sidebar_div = document.createElement('div');
        sidebar_div.innerHTML = `
            <div id="sidebar" class="sidebar collapsed">
                <div class="sidebar-tabs">
                    <ul role="tablist" class="sidebar-tab-list"></ul>
                    <ul role="tablist" class="sidebar-control-list"></ul>
                </div>
                <div class="sidebar-content">
                </div>
             </div>`;

        document.body.insertBefore(sidebar_div, document.body.firstChild);

        return sidebar_div;
    }

    Reinitialize(_opts) {
        this.leaflet_sidebar.reinitialize();
    }

    AddTab(_opts) {
        var tab_opts = Object.assign({}, _opts);

        var icon = tab_opts.hasOwnProperty('icon') ? tab_opts.icon : "fas fa-question-circle";
        var id = tab_opts.hasOwnProperty('id') ? tab_opts.id : `tab_${this.id_counter++}`;
        var title = tab_opts.hasOwnProperty('title') ? tab_opts.title : ``;
        var removeable = tab_opts.hasOwnProperty('removeable') ? tab_opts.removeable : true;

        //CREATE TAB
        var new_tab = new SidebarTab(this, {
            id: id,
            icon: icon,
            title: title
        });

        if (removeable) {
            this.tabs_list.push(new_tab);
        }
        
        if (this.tabs_list.length > 4) {
            this.RemoveTab();
        }

        this.Reinitialize();

        return new_tab;
    }

    RemoveTab(arg) {
        var index = -1;
        if (typeof arg === 'object') {
            index = this.tabs_list.indexOf(arg);
        } else if (typeof arg === 'string') {
            //FIND INDEX FROM ID
            index = this.tabs_list.findIndex(function(e) { return e.id === arg ; });
        } else if (typeof arg === 'number') {
            //USE AS INDEX        
            index = arg; 
        } else if (typeof arg === 'undefined') {
            //USE AS INDEX        
            index = 0;
        }

        if (index > -1) {
            this.tabs_list[index].tab_dom.parentNode.removeChild(this.tabs_list[index].tab_dom);
            this.tabs_list[index].link_dom.parentNode.removeChild(this.tabs_list[index].link_dom);

            this.tabs_list.splice(index, 1);
        }

        this.leaflet_sidebar.close();
    }

    AddControl(_opts) {

        var control_opts = Object.assign({}, _opts);

        control_opts.icon = control_opts.hasOwnProperty('icon') ? control_opts.icon : "fas fa-question-circle";
        control_opts.id = control_opts.hasOwnProperty('id') ? control_opts.id : `control_${this.id_counter++}`;

        //CREATE TAB
        var new_control = new SidebarButton(this, control_opts);

        this.controls_list.push(new_control);

        this.Reinitialize();

        return new_control;
    }

    RemoveControl(arg) {
        var index = -1;
        if (typeof arg === 'object') {
            index = this.controls_list.indexOf(arg);
        } else if (typeof arg === 'string') {
            //FIND INDEX FROM ID
            index = this.controls_list.findIndex(function(e) { return e.id === arg; });
        } else if (typeof arg === 'number') {
            //USE AS INDEX        
            index = arg;
        }

        if (index > -1) {
            this.controls_list[index].control_dom.parentNode.removeChild(this.controls_list[index].control_dom);

            this.controls_list.splice(index, 1);
        }
    }

}


export { Sidebar };
