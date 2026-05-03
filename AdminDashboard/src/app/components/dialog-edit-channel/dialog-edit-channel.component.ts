import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Channel } from 'src/app/models/channel.class';
import { CurrentDataService } from 'src/app/services/current-data/current-data.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { UserService } from 'src/app/services/user/user.service';


export interface DialogData2 {
  channel: any
}

@Component({
  selector: 'app-dialog-edit-channel',
  templateUrl: './dialog-edit-channel.component.html',
  styleUrls: ['./dialog-edit-channel.component.scss']
})
export class DialogEditChannelComponent implements OnInit {
  step = -1;


  injected: any = {}
  channel: Channel = new Channel();
  currentUserId: string = '';
  editChannelForm = new FormGroup({
    channelName: new FormControl(this.channel.channelName, [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<DialogEditChannelComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData2, private user: UserService, private firestoreService: FirestoreService, public dialog: MatDialog, private currentData: CurrentDataService) { }

  ngOnInit() {
    this.currentUserId = this.user.getUid();
    this.injected = this.data;
    this.channel = new Channel(this.injected.channel);
    console.log('Channel ID:', this.channel.channelId);
    this.setFormGroup();
  }
  setStep(index: number) {
    if (this.step == index) {
      this.step = -1;
    } else {
      this.step = index;
    }
  }
  setFormGroup() {
    this.editChannelForm = new FormGroup({
      channelName: new FormControl(this.channel.channelName, []),
    });

  }

  onSubmit() {
    console.log('Submit button clicked');
    if (this.editChannelForm.valid) {
      this.editChannel();
    }
  }

  editChannel() {
    console.log('Editing channel');
    this.channel.channelName = this.editChannelForm.controls.channelName.value || '';
    console.log('Updated channel:', this.channel);
    const collPath = 'channels/' + this.channel.channelId.trim();
    console.log(collPath);
    this.firestoreService.updateObj(this.channel, collPath)

    this.dialogRef.close(this.channel);

  }

}
