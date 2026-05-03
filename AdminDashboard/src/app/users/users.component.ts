import { User } from 'src/app/models/user.class';
import { Component, ChangeDetectorRef } from '@angular/core';
import { Firestore, collectionData, collection, where, doc, deleteDoc, getDocs, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { CurrentDataService } from '../services/current-data/current-data.service';
import { UserService } from '../services/user/user.service';
import { FirestoreService } from '../services/firestore/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogData2 } from '../components/dialog-edit-channel/dialog-edit-channel.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent {
  users$ = collectionData(collection(this.firestore, 'users'),) as Observable<User[]>;
  constructor(public dialog: MatDialog, public firestoreService: FirestoreService, private userService: UserService, public currentData: CurrentDataService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private route: ActivatedRoute, private readonly firestore: Firestore) {

  }



  async deleteUser(email: string) {
    try {
      const usersCollectionRef = collection(this.firestore, 'users');
      const q = query(usersCollectionRef, where('mail', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 0) {
        console.error('User not found');
        return;
      }

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log('User deleted successfully');
      });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
}
