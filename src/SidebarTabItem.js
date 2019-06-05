export class SidebarTabItem {

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
