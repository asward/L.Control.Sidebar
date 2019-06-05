var sidebar =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/L.Control.Sidebar.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/L.Control.Sidebar.js":
/*!**********************************!*\
  !*** ./src/L.Control.Sidebar.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SidebarTab_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SidebarTab.js */ "./src/SidebarTab.js");
/* harmony import */ var _SidebarButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SidebarButton.js */ "./src/SidebarButton.js");



__webpack_require__(/*! ./Sidebar.css */ "./src/Sidebar.css");
 
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
        var new_tab = new _SidebarTab_js__WEBPACK_IMPORTED_MODULE_0__["SidebarTab"](this, tab_opts);
        
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
        var new_control = new _SidebarButton_js__WEBPACK_IMPORTED_MODULE_1__["SidebarButton"](this, control_opts);

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


/***/ }),

/***/ "./src/Sidebar.css":
/*!*************************!*\
  !*** ./src/Sidebar.css ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/SidebarButton.js":
/*!******************************!*\
  !*** ./src/SidebarButton.js ***!
  \******************************/
/*! exports provided: SidebarButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarButton", function() { return SidebarButton; });
﻿


class SidebarButton {
    constructor(sidebar, _opts) {
        this.opts = Object.assign({}, _opts);
        this.control_list_selector = 'sidebar-control-list';

        this.id = _opts.id;
        this.icon = _opts.icon;
        this.title = _opts.title;
        this.bottom_tab_list = _opts.bottom_tab_list;
        this.tab_item_list = [];
        this.parent_sidebar = sidebar;

        if (this.opts.hasOwnProperty('states')) {
            this.num_states = this.opts.states.length;
            this.cur_state = 0;
        }

        this.control_dom = this.CreateDOMObject();

        this.InitializeEvents(this.opts);
        this.UpdateHTML(this.opts);
    }
    get DOMOject() {
        return this.control_dom;
    }
    ClearDOMObject() {
        while (this.control_dom.firstChild) {
            this.control_dom.removeChild(this.control_dom.firstChild);
        }
    }
    CreateDOMObject() {
        var li = document.createElement('li');

        this.parent_sidebar.dom_element.querySelectorAll(`.${this.control_list_selector}`)[0].appendChild(li);

        return li;
    }


    UpdateHTML(opts) {
        this.ClearDOMObject();

        var cur_opts;
        //USE STATES OR OPTS
        if (opts.hasOwnProperty('states')) {
            cur_opts = opts.states[this.cur_state];
        } else {
            cur_opts = opts;
        }

        var a = document.createElement('a');
        a.id = this.id;
        a.setAttribute('role', 'tab');

        if (cur_opts.hasOwnProperty('icon')) {
            var i = document.createElement('i');
            i.classList.add(...cur_opts.icon.split(" "));
            a.appendChild(i);
        }


        if (cur_opts.hasOwnProperty('argb')) {
            let a, c;
            [a, c] = Utility.color.ARGBToHexAlphaColor(cur_opts.argb);
            a.style['background-color'] = c;
        } else if (cur_opts.hasOwnProperty('color')) {
            a.style['background-color'] = cur_opts.color;
        }

        //FIRE UPDATEEVENT (IF ANY)
        if (cur_opts.hasOwnProperty('update_event')) {
            var update_event = new Event(cur_opts.update_event);
            document.dispatchEvent(update_event);
        }

        this.control_dom.appendChild(a);
    }

    InitializeEvents(opts) {
        //SINGLE CLICK
        this.control_dom.onclick = () => {
            document.dispatchEvent(new CustomEvent(`${this.id}_click`));

            //STATE
            if (opts.hasOwnProperty('states')) {
                //CYCLE STATE
                this.cur_state++;
                this.cur_state = this.cur_state >= this.num_states ? 0 : this.cur_state;

                let state_opts = this.opts.states[this.cur_state];

                //STATE CALLBACK
                if (state_opts.hasOwnProperty('callback')) {
                    state_opts.callback(this);
                }

                //STATE EVENT
                if (state_opts.hasOwnProperty('event')) {
                    let state_event = new Event(state_opts.event);
                    document.dispatchEvent(state_event);
                }
            }


            //CALLBACK
            if (opts.hasOwnProperty('callback')) {
                this.opts.callback(this);
            }

            //EVENT
            if (opts.hasOwnProperty('event')) {
                var event = new Event(this.opts.event);
                document.dispatchEvent(event);
            }

            this.UpdateHTML(opts);
        };


    }
}


/***/ }),

/***/ "./src/SidebarData.js":
/*!****************************!*\
  !*** ./src/SidebarData.js ***!
  \****************************/
/*! exports provided: SidebarData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarData", function() { return SidebarData; });
/* harmony import */ var _SidebarTabItem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SidebarTabItem.js */ "./src/SidebarTabItem.js");
﻿

class SidebarData extends _SidebarTabItem_js__WEBPACK_IMPORTED_MODULE_0__["SidebarTabItem"] {
    constructor(_opts) {
        super(_opts);
    }
}



/***/ }),

/***/ "./src/SidebarTab.js":
/*!***************************!*\
  !*** ./src/SidebarTab.js ***!
  \***************************/
/*! exports provided: SidebarTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarTab", function() { return SidebarTab; });
/* harmony import */ var _SidebarTabButtonPalette_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SidebarTabButtonPalette.js */ "./src/SidebarTabButtonPalette.js");
/* harmony import */ var _SidebarTabButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SidebarTabButton.js */ "./src/SidebarTabButton.js");
/* harmony import */ var _SidebarData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SidebarData.js */ "./src/SidebarData.js");
﻿



class SidebarTab {
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

        var new_button = new _SidebarTabButton_js__WEBPACK_IMPORTED_MODULE_1__["SidebarTabButton"](item_opts);

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
        var new_data = new _SidebarData_js__WEBPACK_IMPORTED_MODULE_2__["SidebarData"]({html:'<h1>loading</h1>'});

        //ADD CONTENT
        this.AddContent(new_data);

        var asyncData = await data();
        new_data.UpdateHTML(asyncData);

        return new_data;
    }

    AddData(_opts) {
        //CREATE DATA
        var new_data = new _SidebarData_js__WEBPACK_IMPORTED_MODULE_2__["SidebarData"](_opts);

        //ADD CONTENT
        this.AddContent(new_data);

        return new_data;
    }

    AddButtonPalette(_opts) {

        var item_opts = Object.assign({}, _opts);

        //CREATE TAB
        var new_button = new _SidebarTabButtonPalette_js__WEBPACK_IMPORTED_MODULE_0__["SidebarTabButtonPalette"](this, item_opts);
        
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


/***/ }),

/***/ "./src/SidebarTabButton.js":
/*!*********************************!*\
  !*** ./src/SidebarTabButton.js ***!
  \*********************************/
/*! exports provided: SidebarTabButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarTabButton", function() { return SidebarTabButton; });
/* harmony import */ var _SidebarTabItem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SidebarTabItem.js */ "./src/SidebarTabItem.js");
﻿


class SidebarTabButton extends _SidebarTabItem_js__WEBPACK_IMPORTED_MODULE_0__["SidebarTabItem"] {
    constructor(_opts) {
        super(_opts);

        this.dom_object = document.createElement('button');
        this.dom_object.classList.add(['sidebar-menu-list-button']);
        this.dom_object.setAttribute('aria-checked', 'true');
        if (this.opts.hasOwnProperty('icon')) {
            this.dom_object.innerHTML += `<i class="${this.opts.icon}"></i>`;
        }
        if (this.opts.hasOwnProperty('text')) {
            this.dom_object.innerHTML += `<label class="sidebar-menu-list-item-label">${this.opts.text}</label>`;
        }
    }
}


/***/ }),

/***/ "./src/SidebarTabButtonPalette.js":
/*!****************************************!*\
  !*** ./src/SidebarTabButtonPalette.js ***!
  \****************************************/
/*! exports provided: SidebarTabButtonPalette */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarTabButtonPalette", function() { return SidebarTabButtonPalette; });
/* harmony import */ var _SidebarTabItem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SidebarTabItem.js */ "./src/SidebarTabItem.js");
﻿

class SidebarTabButtonPalette extends _SidebarTabItem_js__WEBPACK_IMPORTED_MODULE_0__["SidebarTabItem"] {

    constructor(sidebartab, _opts) {
        super(sidebartab, _opts);

        this.dom_object.classList.add(['sidebar-menu-button-palette']);

        this.InsertButtons();
    }


    InsertButtons() {
        this.ClearDOMObject();

        if (this.opts.hasOwnProperty('buttons')) {
            if (Array.isArray(this.opts.buttons)) {
                this.opts.buttons.forEach((b) => {

                    var b_element = document.createElement('button');
                    b_element.classList.add(['palette-button']);
                    var b_html;

                    if (b.hasOwnProperty('icon')) {
                        b_html = document.createElement('i');
                        b_html.classList.add(...b.icon.split(" "));
                    } else {
                        b_html = document.createElement('div');

                    }

                    if (b.hasOwnProperty('color')) {
                        b_element.style['background-color'] = b.color;
                    }

                    b_element.appendChild(b_html);

                    if (b.hasOwnProperty('event')) {
                        b_element.addEventListener('click', function (e) {
                            var event = new Event(b.event);
                            document.dispatchEvent(event);
                        }, false);
                    }

                    this.dom_object.appendChild(b_element);
                });
            }
        }
    }
}


/***/ }),

/***/ "./src/SidebarTabItem.js":
/*!*******************************!*\
  !*** ./src/SidebarTabItem.js ***!
  \*******************************/
/*! exports provided: SidebarTabItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarTabItem", function() { return SidebarTabItem; });
﻿class SidebarTabItem {

    constructor(_opts) {
        this.opts = Object.assign({}, _opts);
        this.dom_object = document.createElement('div');

        if (this.opts.hasOwnProperty('update_event')) {
            document.addEventListener(this.opts.update_event, (e) => {
                this.UpdateHTML(e.detail);
            }, false);
        }


        if (this.opts.hasOwnProperty('event')) {
            this.dom_object.addEventListener('click', (e) => {
                var event = new Event(this.opts.event);
                document.dispatchEvent(event);
            }, false);
        }

        if (this.opts.hasOwnProperty('callback')) {
            this.dom_object.addEventListener('click', (e) => {
                this.opts.callback(e);
            }, false);
        }

        this.SetContent(this.opts);
    }

    get DOMObject() {
        return this.dom_object; 
    }

    SetContent(_args) {
        _args = Object.assign({ standby_content: '<div class="d-flex justify-content-center align-items-center garmin_drawings_loading" style="width:100%;height:100%"><small>Loading...</small></div>'}, _args);
        
        if (_args.hasOwnProperty('standby_content')) {
            this.ReplaceContent(_args.standby_content);
        }

        if (typeof _args == "string") {
            this.ReplaceContent(_args);
        } else if (_args.hasOwnProperty('content')) {
            this.ReplaceContent(_args.content);
        } else if(_args.hasOwnProperty('html')) {
            this.ReplaceContent(_args.html);
        }
    }
    async ReplaceContent(_content) {
        let newContent;
        if (typeof _content === "function") {
            newContent = await _content();
        } else {
            newContent = _content;
        }
        

        if (newContent instanceof Element) {
            this.dom_object.parentNode.replaceChild(newContent, this.dom_object);
        } else if (typeof newContent === "string") {
            this.dom_object.innerHTML = newContent;
        }
    }

    AddEvent(event, callback) {
        this.dom_object.addEventListener(event, async (e) => {
            await callback(e);
        }, false);

        return this;
    }

    Remove() {
        if (null !== this.dom_object) {
            this.dom_object.parentNode.removeChild(this.dom_object);
        }
        this.dom_object = null;
    }

    ClearDOMObject() {
        while (this.dom_object.firstChild) {
            this.dom_object.removeChild(this.dom_object.firstChild);
        }
    }
}


/***/ })

/******/ });
//# sourceMappingURL=L.Control.Sidebar.js.map