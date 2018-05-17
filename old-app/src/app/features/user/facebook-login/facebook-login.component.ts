import { Component, Inject, OnInit, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';

// declare these vars here
// to let the TS compiler know that they exist
declare var window: any;
declare var FB: any;

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.css']
})
export class FacebookLoginComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    // inject the local zone
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (typeof (FB) === 'undefined') {

      // if the FB oject is undefined,
      // it means that it's the first time
      // we visit this page, hence we need
      // to initialize the Facebook SDK

      window.fbAsyncInit = () =>
        // be sure to do this within
        // the local zone, or Angular will be
        // unable to find the local references
        this.zone.run(() => {
          FB.init({
            appId: '1535777516721739',
            xfbml: true,
            version: 'v2.12'
          });
          FB.AppEvents.logPageView();

          // this will trigger right after the user
          // completes the FB SDK Auth roundtrip successfully
          FB.Event.subscribe('auth.statusChange', (
            (result: any) => {
              console.log('FB auth status changed');
              console.log(result);
              if (result.status === 'connected') {
                // login successful
                console.log('Connected to Facebook.');
                this.onConnect(result.authResponse.accessToken);
              }
            })
          );
        });

      // Load the SDK js library (only once)
      (function (d, s, id) {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        const js = d.createElement(s); js.id = id;
        (<any>js).src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=1535777516721739&autoLogAppEvents=1';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

    } else {

      // Reload the FB login button
      window.FB.XFBML.parse();

      // if the user is still connected, log him off.
      FB.getLoginStatus(function (response: any) {
        if (response.status === 'connected') {
          FB.logout(function (res: any) {
            // do nothing
          });
        }
      });
    }
  }

  // this method will be executed
  // upon the user FB SDK Auth roundtrip completion
  // to create/login the local user
  onConnect(accessToken: string) {
    // call TokenController and register/login

    const data = {
      access_token: accessToken,
      client_id: this.authService.clientId
    };
    this.authService.facebookLogin(data).subscribe(res => {
      // store user login data
      this.localStorageService.setAuth(res);

      // redirect user to home
      this.router.navigate(['dashboard']);
    }, error => console.log(error));
  }
}
