/*jslint esversion: 6 */
import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-form/iron-form.js';
import '../css/shared-styles.js';
import { MyURLSetter } from "../mixins/worbli-urlsetter.js";

class WorbliJoin extends MyURLSetter(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        h2 {
            font-size: 22px;
            line-height: 26px;
            margin-bottom:12px;
            margin-top:0px;
            color: var(--blue-text);
            font-weight: 600;
            margin-bottom: 12px;
        }
        p {
        margin: 24px 0 24px 0;
        }
        input.text {
            padding: 8px;
            background: #F0F1F3;
            display: block;
            width: 100%;
            box-shadow: inset 0 1px 1px rgba(0,0,0,.02);
            border: 1px solid;
            border-color: #C9CCD0 #CFD2D6 #CFD2D6;
            border-radius: 3px;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            font-size: 14px;
            height: auto;
            margin-bottom:10px;
        }
        input:focus, select:focus, textarea:focus, button:focus {
            outline: none;
        }
  
        input.text:focus {
            background: #fff;
            border: 1px solid #8bd2d0 !important;
            box-shadow: 0 0 0 2px rgba(133,176,212,0.4);
        }
      
        input.text.error {
            color: #db6265;
            border-color: #d2928c;
            box-shadow: 0 0 0 2px #f0d1ce;
        }
  
        button {
            cursor: pointer;
            vertical-align: middle;
            outline: none;
        }
        label{
            font-size: 11px;
        }
        .center {
            padding: 20px 0 0;
            text-align: center;
            color: #8d919a;
            font-size: 12px;
            line-height: 20px;
        }
        .center span {
            color: #4079B0;
            cursor: pointer;
            font-weight: 600;
        }
        .errorMsg{
            color:red;
        }
      </style>
            <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
            <iron-ajax
                    id="registrationRequest"
                    handle-as="json"
                    on-response="handleRegister"
                    on-error="handleUserError"
                    debounce-duration="300">
            </iron-ajax>
            <div class="joinForm" id="joinForm">
                <h2>Join WORBLI</h2>
                <p>WORBLI is the place to access smarter financial services</p>
                <div id="registrationRequestFailure" style="display:none;" >
                    <p class="errorMsg">There was a problem with your registration request please confirm
                your email and that you don't have an existing request</p>
                </div>

                <iron-form id="join">
                    <form method="POST" >
                        <input type="text" class="text" placeholder="Email Address" id="email" required>
                        <label><input type="checkbox" name="checkbox" value="value" required> I agree to the <span><a href="/terms/">Terms and Privacy Policy</a></span></label></br>
                        <label><input type="checkbox" name="checkbox" value="value" id="optin"> I'm happy to recieve marketing communications from WORBLI</label></br></br>
                        <button class="btn-critical" on-click="_sendEmail">Join</button>
                    </form>
                </iron-form>
            </div>
                <div id="sentNotice" style="display:none;" >
                  <h2>Sent</h2>
                    <p>Please check your email, we have sent you a confirmation email to: {{email}}</p>
                </div>
            <div class="center">Already on WORBLI? <span on-click="_signIn">Log In</span></div>
    `;
  }
    static get properties() {
        return {
            join: {
                type: Boolean,
                reflectToAttribute: true,
                notify: true,
            },
            hide: {
                type: Boolean,
                reflectToAttribute: true,
                notify: true,
            },
            email: {
                type: String,
                default: 'none'
            }
        };
    }

    _sendEmail(){
        if (this.$.join.validate()) {
            console.log("sending email");
            let vals = {"email": this.$.email.value, "optin" : this.$.optin.checked};
            let url = this.baseAPIurl;
            url = url + "/api/registrationRequest/";
            console.log("url:" + url);
            this.$.registrationRequest.body = vals;
            this.$.registrationRequest.url = url;
            this.$.registrationRequest.method="post";
            this.$.registrationRequest.headers['content-type']="application/json";
            this.$.registrationRequest.generateRequest();
        }
    }

    handleRegister(event, request) {
        var email = this.$.email.value;
        this.email = email;
        this.$.joinForm.style.display ='none';
        this.$.sentNotice.style.display ='block';

        var response = request.response;
        this.$.registrationRequestFailure.style.display ='none';
    }

    handleUserError(event, request) {
        this.$.registrationRequestFailure.style.display ='block';

    }

    _signIn(){
        this.join = false;
    }

} window.customElements.define('worbli-join', WorbliJoin);
