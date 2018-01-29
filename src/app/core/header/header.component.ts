import { Component, OnInit } from '@angular/core';
import { BackupService } from '../../shared/backup.service';
import { Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';
import * as AuthActions from '../../auth/store/auth.actions';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {
  authState: Observable<fromAuth.State>;

  constructor(private backupService: BackupService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.backupService.saveData().subscribe(
      (response: Response) => console.log(response),
      (error) => console.log(error)
    );
  }
  
  onFetchData() {
    this.backupService.fetchData();
  }

  onLogout() {
    this.authService.logout();
  }
}
