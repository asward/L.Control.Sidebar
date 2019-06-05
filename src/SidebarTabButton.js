import { SidebarTabItem } from "./SidebarTabItem.js";


export class SidebarTabButton extends SidebarTabItem {
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
