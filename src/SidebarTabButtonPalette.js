import { SidebarTabItem } from "./SidebarTabItem.js";

export class SidebarTabButtonPalette extends SidebarTabItem {

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
