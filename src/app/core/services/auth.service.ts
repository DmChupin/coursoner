import { Injectable, OnInit, signal } from '@angular/core';
import { UserInterface } from '../../shared/interfaces/user.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  /**
   * Закомментированные строки - обмен данных через subject
   */
  // private user: UserInterface | null = null;
  // userChange: Subject<UserInterface> = new Subject<UserInterface>();

  currentUserSig = signal<UserInterface | undefined | null>(undefined);
  ngOnInit(): void {
    // this.userChange.subscribe((value) => {
    //   this.user = value;
    // });
  }

  // changeUser(user: UserInterface) {
  //   this.userChange.next(user);
  // }
}
