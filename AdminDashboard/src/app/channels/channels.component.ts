import { Component, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { Firestore, collectionData, collection, where } from '@angular/fire/firestore';
import { Channel } from 'src/app/models/channel.class';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { CurrentDataService } from '../services/current-data/current-data.service';
import { DialogAddChannelComponent } from '../components/dialog-add-channel/dialog-add-channel.component';
import { FirestoreService } from '../services/firestore/firestore.service';
import { DialogData2, DialogEditChannelComponent } from '../components/dialog-edit-channel/dialog-edit-channel.component';


declare var window: any;

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent {
  channels$ = collectionData(collection(this.firestore, 'channels'),) as Observable<Channel[]>;

  constructor(public dialog: MatDialog, public firestoreService: FirestoreService, private userService: UserService, public currentData: CurrentDataService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private route: ActivatedRoute, private readonly firestore: Firestore) {

  }


  addChannel(): void {
    this.dialog.open(DialogAddChannelComponent);
  }
  editChannel(channel: Channel): void {
    const dialogData: DialogData2 = {
      channel: channel
    };

    this.dialog.open(DialogEditChannelComponent, {
      data: dialogData
    });
  }
  deleteChannel(channel: Channel) {
    if (channel.channelId) {

      this.firestoreService.deleteDocument('channels', channel.channelId);
    } else {
      console.error('Invalid channel ID');
    }
  }
}

