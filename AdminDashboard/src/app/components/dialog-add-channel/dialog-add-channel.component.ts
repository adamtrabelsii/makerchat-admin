import { Firestore, QuerySnapshot, collection, collectionData, getDocs } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { Channel } from 'src/app/models/channel.class';
import { CurrentDataService } from 'src/app/services/current-data/current-data.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.class';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent {
  channelForm = new FormGroup({
    name: new FormControl('', Validators.required),
    locked: new FormControl('')
  });
  channel: Channel = new Channel();
  locked = false;
  step = -1;

  constructor(public dialogRef: MatDialogRef<DialogAddChannelComponent>, private setFirestore: FirestoreService, private currentData: CurrentDataService, private readonly firestore: Firestore) { }

  onSubmit() {
    if (this.channelForm.valid) {
      this.createNewChannel();
    }
  }
  setStep(index: number) {
    if (this.step == index) {
      this.step = -1;
    } else {
      this.step = index;
    }
  }

  async createNewChannel() {
    this.channel = new Channel();
    this.channel.channelName = this.channelForm.controls.name.value || '';
    this.channel.locked = false;

    const channelId = await this.setFirestore.add(this.channel);
    const usersCollectionRef = collection(this.firestore, '/users');
    const querySnapshot = await getDocs(usersCollectionRef);

    querySnapshot.forEach((doc) => {
      const documentId = doc.id;
      this.setFirestore.pushUserToChannel(channelId, documentId);
    });







    this.dialogRef.close();
  }


  toggleLock() {
    this.locked = !this.locked;
  }
}
