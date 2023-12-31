import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from 'src/app/player';
import { TrackProgressService } from 'src/app/services/track-progress.service';
import * as bootstrap from 'bootstrap';

@Component({
    selector: 'start-page',
    templateUrl: 'start.page.html',
    styleUrls: ['./start.page.css']
})

export class StartPage implements OnInit {
    hideSection: boolean = false;

    player1 = new Player;
    player2 = new Player;

    constructor(
        private formBuilder: FormBuilder,
        private trackProgress: TrackProgressService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    startFormGame = this.formBuilder.group({
        player1: '',
        player2: ''
    });

    /**
     * Start a new game with the provided player names.
     * This function assigns names to player1 and player2,
     * uses the TrackProgressService to add the same players to the game's progress tracking service,
     * and navigates to the first-stage route.
     */
    startGame() {
        if(this.startFormGame.value.player1! === '' || this.startFormGame.value.player2! === '') {
            let toast = new bootstrap.Toast(document.getElementById('toast')!);
            toast.show();
        } else {
            this.player1.name = this.startFormGame.value.player1!;
            this.player2.name = this.startFormGame.value.player2!;
    
            this.trackProgress.addPlayer(this.player1);
            this.trackProgress.addPlayer(this.player2);
            this.router.navigateByUrl('/first-stage');
        }
    }
}