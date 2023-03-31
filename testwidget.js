/*!
 * 	Test Widget
 * 	Copyright (c) Agendas Group Ltd. ALL RIGHTS RESERVED
 */
(function () {
    'use strict';

    class ElementMixin extends HTMLElement {
        constructor(template) {
            super();
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(template.content.cloneNode(true));
        }

        $(x) {
            return this.shadowRoot.querySelector(x);
        }
    }
    
    var elementMixin = ElementMixin;

/* START: LAUNCHER */
    var html$testwidget = `<div class="test-widget"></div>`;
    var style$testwidget = `.test-widget { display: none; }`;
    
    const template$testwidget = document.createElement('template');
    template$testwidget.innerHTML = `<style>${style$testwidget}</style>\n${html$testwidget}`;
    class TestWidget extends elementMixin {
        constructor() {
            super(template$testwidget);
            this.apiDomain = 'api.widg.io';
            this.widgetSettings = null;
            this.widgetId = 0;
        }

        static get observedAttributes() {
            return ["widgetsettings"];
        } attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue === newValue) {
                return;
            }
            this.updateWidgetSettings(newValue);
        }

        updateWidgetSettings(settings) {
            this.widgetSettings = JSON.parse(decodeURIComponent(settings));
            this.redrawWidget();
        }

        redrawWidget() {
            let rootEl = this.$('.test-widget');
            if (this.widgetSettings) {
                rootEl.style.display = this.widgetSettings.Display;
                rootEl.style.padding = this.widgetSettings.Padding+'px';
                rootEl.style.fontFamily = this.widgetSettings.FontFamily;
                rootEl.style.fontSize  = this.widgetSettings.FontSize+'px';

                rootEl.style.backgroundColor = this.widgetSettings.BgColour;
                rootEl.style.color = this.widgetSettings.TxtColour;

                rootEl.innerHTML = this.widgetSettings.Content;
            } else {
                rootEl.style.display = 'none';
            }
        }

        isWidgetIdValid(value) {
            const parsed = parseInt(value, 10);
            if (isNaN(parsed) || parsed <= 0) { return false; }
            return true;
        }

        async connectedCallback() {
            if (!('fetch' in window)) {
                console.log('Test Widget: Fetch API not found, try including the polyfill');
                return;
            }

            let cssClass = this.getAttribute('class');
            if (cssClass.indexOf('travelify') > -1) this.apiDomain = 'api.travelify.io';

            let widgetId = this.getAttribute('widgetid');
            if (widgetId && this.isWidgetIdValid(widgetId)) {
                try {
                    this.widgetId = widgetId;
                    let apiHeaders = new Headers({
                        'Content-Type': 'application/json'
                    });
                    await fetch('https://'+this.apiDomain+'/widgetsettings/'+widgetId, { headers: apiHeaders })
                    .then(response => response.json())
                    .then(data => {
                        this.widgetSettings = data;
                        this.redrawWidget();
                    });
                } catch(err) {
                    console.log('Test Widget: ' + err);
                    return;
                }
            } else {
                console.log('Test Widget: widgetid attribute not found or not valid');
                return;
            }
        }
    }
    customElements.define('test-widget', TestWidget);
/* END: LAUNCHER */

}());
