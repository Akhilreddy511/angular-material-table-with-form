import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlbumService } from './album.service';
import { UserService } from './user.service';
import { Album } from './album.model';
import { User } from './user.model';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'table-form-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];
  displayedColumns = ['id', 'userId', 'title', 'action'];
  constructor(
    private _albumService: AlbumService,
    private _userService: UserService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this._formBuilder.group({
      albums: this._formBuilder.array([])
    });
    this._albumService.getAllAsFormArray().subscribe(albums => {
      console.log('albums', albums);
      this.form.setControl('albums', albums);
    });
    this._userService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  get albums(): FormArray {
    return this.form.get('albums') as FormArray;
  }

  // On user change I clear the title of that album
  onUserChange(event, album: FormGroup) {
    const title = album.get('title');

    title.setValue(null);
    title.markAsUntouched();
    // Notice the ngIf at the title cell definition. The user with id 3 can't set the title of the albums
  }
}
