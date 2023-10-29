import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Player } from './player';
import { TrackProgressService } from './services/track-progress.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'battleship-game';

}
