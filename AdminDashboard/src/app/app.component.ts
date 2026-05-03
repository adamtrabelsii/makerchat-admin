import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { FirestoreService } from './services/firestore/firestore.service';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AdminDashboard';
  mobileQuery: MediaQueryList;

  @ViewChild('workspaceBar') workspaceBar: any;
  @ViewChild('threadBar') threadBar: any;

  private _mobileQueryListener: () => void;

  constructor(public createChannelService: FirestoreService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }



  toggleMode() {
    let side: MatDrawerMode = 'side'
    let over: MatDrawerMode = 'over'
    return (window.innerWidth >= 1000) ? side : over
  }

  toggleLeftSidebar() {
    this.workspaceBar.toggle();
  }
}
