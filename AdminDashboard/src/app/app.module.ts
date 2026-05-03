import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClickStopPropagationDirective } from './click-stop-propagation/click-stop-propagation.directive'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { ChannelsComponent } from './channels/channels.component';
import { UsersComponent } from './users/users.component';
import { WorkspaceBarComponent } from './mat-drawer-left/workspace-bar/workspace-bar.component';
//angular materials
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddChannelComponent } from './components/dialog-add-channel/dialog-add-channel.component';
import { DialogEditChannelComponent } from './components/dialog-edit-channel/dialog-edit-channel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrentDataService } from './services/current-data/current-data.service';

@NgModule({
  declarations: [
    AppComponent,
    ChannelsComponent,
    UsersComponent,
    WorkspaceBarComponent,
    DialogAddChannelComponent,
    DialogEditChannelComponent,
    ClickStopPropagationDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatMenuModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,

    MatSlideToggleModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatTabsModule,
    MatListModule,
    BrowserAnimationsModule
  ],
  providers: [CurrentDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
