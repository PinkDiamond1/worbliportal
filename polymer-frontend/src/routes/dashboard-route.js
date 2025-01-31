/*jslint esversion: 6 */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';

setPassiveTouchGestures(true);
setRootPath(WorbliPortalGlobals.rootPath);

class DashboardRoute extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          height: 100vh;
        }
        .center {
          max-width: 1160px;
          margin: 0 auto;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <app-route route="{{route}}" pattern="[[rootPath]]dashboard/:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
      <iron-pages selected="[[page]]" attr-for-selected="name" role="main" class="center">
        <profile-route name="profile" route="{{subroute}}"></profile-route>
        <!-- <verify-route name="verify"></verify-route>
        <claim-route name="claim"></claim-route> -->
        
      </iron-pages>
      
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object,
      jsonrpc: Object,
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page, subroute)'
    ];
  }

  _routePageChanged(page, subroute) {
    if (!page) {
      this.page = 'profile';
    // } else if (['claim', 'profile', 'verify'].indexOf(page) !== -1) {
    } else if (['profile'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'error';
    }
  }
    ready()  {
        super.ready();
        console.log("in the dashboard ready");
        let lsjwt = localStorage.getItem('lsjwt');
        if (lsjwt == null) {
            this.set('route.path', '/');
        }

    }


  _pageChanged(page) {
    switch (page) {
        case 'claim':
            import('./dashboard/claim-route.js');
            break;  
        case 'profile':
            import('./dashboard/profile-route.js');
            break;
        case 'verify':
            import('./dashboard/verify-route.js');
            break;
    }
  }
} window.customElements.define('dashboard-route', DashboardRoute);
