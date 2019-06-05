


export class SidebarButton {
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
