import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from 'src/app/player';
import { TrackProgressService } from 'src/app/services/track-progress.service';

@Component({
    selector: 'start-page',
    templateUrl: 'start.page.html',
    styleUrls: ['./start.page.css']
})

export class StartPage implements OnInit {
    hideSection: boolean = false;
    check?: any;

    player1 = new Player;
    player2 = new Player;
    players?: any[];

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

    startGame() {
        this.player1.name = this.startFormGame.value.player1!;
        this.player2.name = this.startFormGame.value.player2!;

        this.players?.push(this.player1);
        this.players?.push(this.player2);

        this.trackProgress.addPlayer(this.player1);
        this.trackProgress.addPlayer(this.player2);
        this.router.navigateByUrl('/first-stage');
    }
}