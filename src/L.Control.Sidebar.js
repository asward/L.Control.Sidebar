
import { SidebarTab } from "./SidebarTab.js";
import { SidebarButton } from "./SidebarButton.js";
require("./Sidebar.css");
 
/**
 * @name Sidebar
 * @class L.Control.Sidebar
 * @extends L.Control
 * @param {string} id - The id of the sidebar element (without the # character)
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the sidebar: 'left' or 'right'
 * @see L.control.sidebar
 */
L.Control.Sidebar = L.Control.extend(/** @lends L.Control.Sidebar.prototype */ {
    includes: (L.Evented.prototype || L.Mixin.Events),

    options: {
        position: 'left',
        id: 'sidebar',
        max_tab: 4,
    },

    initialize: function (id, options) {
        var i, child;

        L.setOptions(this, options);

        this.id_counter = 1;

        

        ////
        // SIDEBAR DOM
        ////        
        this._sidebar = L.DomUtil.get(id);
        if (this._sidebar === null) {
            this._sidebar = L.DomUtil.create('div', 'sidebar collapsed');
            this._sidebar.id = this.options.id;

            document.body.prepend(this._sidebar);
        } 

        // Attach .sidebar-left/right class
        L.DomUtil.addClass(this._sidebar, 'sidebar-' + this.options.position);

        // Attach touch styling if necessary
        if (L.Browser.touch)
            L.DomUtil.addClass(this._sidebar, 'leaflet-touch');



        ////
        // TABS DOM
        //// 
        this.tabs_dom = this._sidebar.querySelector('sidebar-tabs') || L.DomUtil.create('div', 'sidebar-tabs', this._sidebar);

        //TABs w/ CONTENT
        this.content_dom = this._sidebar.querySelector('.sidebar-content') || L.DomUtil.create('div', 'sidebar-content', this._sidebar);
        this._content_items = this.content_dom.querySelectorAll('div.sidebar-pane');

        this.tabs_list_dom = this._sidebar.querySelector('ul.sidebar-tab-list') || L.DomUtil.create('ul', 'sidebar-tab-list', this.tabs_dom);
        this._tabitems = [];
        this.tabs_list_dom.querySelectorAll('li').forEach((t) => {
            this._tabitems.push(t);
            this.initialize_on_click(t);
        });

        //TABs w/o CONTENT
        this.controls_list_dom = this._sidebar.querySelector('ul.sidebar-control-list') || L.DomUtil.create('ul', 'sidebar-control-list', this.tabs_dom);
        this._control_items = [];
        this.controls_list_dom.querySelectorAll('li').forEach((c) => {
            this._control_items.push(c);
        });

        //TODO
        document.addEventListener('show_data', (e) => {
            var new_data_tab = this.add_tab(e.detail);
            new_data_tab.AddData(e.detail);
            this.OpenTab(new_data_tab);
        }, false);
    },

    add_tab: function(_opts) {
        var tab_opts = Object.assign({
            icon: "fas fa-question-circle",
            id: `control_${this.id_counter++}`,
            title: '',
            removeable: true,
            open_now: false,
            async: true,
            dom: null,
            html: null,
        }, _opts);

        //CREATE TAB
        var new_tab = new SidebarTab(this, tab_opts);
        
        if (tab_opts.removeable) {
            this._tabitems.push(new_tab);
        }

        if (this._tabitems.length > this.options.max_tab) {
            this.remove_tab();
        }

        this.tabs_list_dom.appendChild(new_tab.TabDOMObject);
        this.content_dom.appendChild(new_tab.ContentDOMObject);

        this.initialize_on_click(new_tab.TabDOMObject);

        if (tab_opts.open_now) {
            this.open(new_tab);
        }
        
        return new_tab;
    },

    remove_tab: function(arg) {
        var index = -1;
        if (typeof arg === 'object') {
            index = this._tabitems.indexOf(arg);
        } else if (typeof arg === 'string') {
            //FIND INDEX FROM ID
            index = this._tabitems.findIndex(function (e) { return e.opts.id === arg; });
        } else if (typeof arg === 'number') {
            //USE AS INDEX        
            index = arg;
        } else if (typeof arg === 'undefined') {
            //USE AS INDEX        
            index = 0;
        }

        if (index > -1) {
            this._tabitems[index].TabDOMObject.parentNode.removeChild(this._tabitems[index].TabDOMObject);
            this._tabitems[index].ContentDOMObject.parentNode.removeChild(this._tabitems[index].ContentDOMObject);

            this._tabitems.splice(index, 1);
        }

        this.close();
    },

    add_control: function(_opts) {

        var control_opts = Object.assign({
            icon: "fas fa-question-circle",
            id: `control_${this.id_counter++}`
        }, _opts);

        //control_opts.icon = control_opts.hasOwnProperty('icon') ? control_opts.icon : "fas fa-question-circle";
        //control_opts.id = control_opts.hasOwnProperty('id') ? control_opts.id : `control_${this.id_counter++}`;

        //CREATE TAB
        var new_control = new SidebarButton(this, control_opts);

        this._control_items.push(new_control);

        this.controls_list_dom.appendChild(new_control.TabDOMObject);
        
        return new_control;
    },

    remove_control: function(arg) {
        var index = -1;
        if (typeof arg === 'object') {
            index = this._control_items.indexOf(arg);
        } else if (typeof arg === 'string') {
            //FIND INDEX FROM ID
            index = this._control_items.findIndex(function (e) { return e.id === arg; });
        } else if (typeof arg === 'number') {
            //USE AS INDEX        
            index = arg;
        }

        if (index > -1) {
            this._control_items[index].DOMOject.parentNode.removeChild(this._control_items[index].DOMOject);

            this._control_items.splice(index, 1);
        }
    },

    initialize_on_click: function (tab_dom) {

        var open_btn = tab_dom.querySelector('a');
        if (open_btn !== null && open_btn.hash !== "") {
            open_btn.addEventListener('click', (e) => {
                e.preventDefault();
                this._onClick(tab_dom);
            });

            var tab_content = this.content_dom.querySelector(open_btn.hash)
            if (tab_content !== null) {
                var close_btn = tab_content.querySelector('.sidebar-close');
                if (close_btn !== null) {
                    close_btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.this._onCloseClick();
                    });
                }
            }
        };
    },

    /**
     * Add this sidebar to the specified map.
     *
     * @param {L.Map} map
     * @returns {Sidebar}
     */
    onAdd: function (map) {
        this._map = map;
                
        return this._sidebar;
    },

    addTo: function (map) {
        this._map = map;

        return this;
    },


    /**
     * Remove this sidebar from the map.
     *
     * @param {L.Map} map
     * @returns {Sidebar}
     */
    onRemove: function (map) {
        var i, child;

        this._map = null;

        for (i = this._tabitems.length - 1; i >= 0; i--) {
            child = this._tabitems[i];
            L.DomEvent.off(child.querySelector('a'), 'click', this._onClick);
        }

        for (i = this._control_items.length - 1; i >= 0; i--) {
            child = this._control_items[i];
            L.DomEvent.off(child.querySelector('a'), 'click', this._onClick);
        }

        for (i = this._closeButtons.length - 1; i >= 0; i--) {
            child = this._closeButtons[i];
            L.DomEvent.off(child, 'click', this._onCloseClick, this);
        }

        return this;
    },

    /**
     * Open sidebar (if necessary) and show the specified tab.
     *
     * @param {string} id - The id of the tab to show (without the # character)
     */
    open: function(arg) {
        var i, child;

        //Find ID and Tab if object or string ID is passed in
        var id = '';
        if (typeof arg === 'object') {
            //FIND STRING ID IN OBJECT
            //TODO
            var index = this._tabitems.indexOf(arg);
            id = this._tabitems[index].opts.id;
        } else if (typeof arg === 'string') {
            id = arg;
        }

        //If a valid ID is found
        if (id !== '') {

            // hide old active contents and show new content
            this._sidebar.querySelectorAll('.sidebar-pane').forEach((pane) => {
                pane.classList.remove('active');
                if (pane.id == id)
                    pane.classList.add('active');
            });

            // remove old active highlights and set new highlight
            this._sidebar.querySelectorAll('.sidebar-tab-list > li').forEach((tab) => {
                tab.classList.remove('active');
                if (tab.querySelector('a').hash == '#' + id)
                    tab.classList.add('active');
            });

            this.fire('content', { id: id });

            // open sidebar (if necessary)
            if (L.DomUtil.hasClass(this._sidebar, 'collapsed')) {
                this.fire('opening');
                L.DomUtil.removeClass(this._sidebar, 'collapsed');
            }

        }

        return this;
    },

    /**
     * Close the sidebar (if necessary).
     */
    close: function() {
        // remove old active highlights
        this._sidebar.querySelectorAll('.sidebar-tab-list > li').forEach((tab) => {
            tab.classList.remove('active');
        });

        // close sidebar
        if (!L.DomUtil.hasClass(this._sidebar, 'collapsed')) {
            this.fire('closing');
            L.DomUtil.addClass(this._sidebar, 'collapsed');
        }

        return this;
    },

    /**
     * @private
     */
    _onClick: function (tab_dom) {
        if (L.DomUtil.hasClass(tab_dom, 'active'))
            this.close();
        else if (!L.DomUtil.hasClass(this._sidebar, 'disabled'))
            this.open(tab_dom.querySelector('a').hash.slice(1));
    },

    /**
     * @private
     */
    _onCloseClick: function () {
        this.close();
    }
});

/**
 * Creates a new sidebar.
 *
 * @example
 * var sidebar = L.control.sidebar('sidebar').addTo(map);
 *
 * @param {string} id - The id of the sidebar element (without the # character)
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the sidebar: 'left' or 'right'
 * @returns {Sidebar} A new sidebar instance
 */
L.control.sidebar = function (id, options) {
    return new L.Control.Sidebar(id, options);
};

//export { window.L.control.sidebar };
