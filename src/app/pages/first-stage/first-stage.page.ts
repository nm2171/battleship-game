import { Component, Input, OnInit } from '@angular/core';

import { IPlayer } from '../../intefaces/IPlayer';
import { TrackProgressService } from 'src/app/services/track-progress.service';
import { Router } from '@angular/router';

@Component({
    selector: 'first-stage',
    templateUrl: 'first-stage.page.html'
})

export class FirstStagePage implements OnInit {
    @Input() players?: IPlayer[];

    shipsToBePlaced: number = 5;
    player1?: IPlayer;
    player2?: IPlayer;

    constructor(
        private trackProgress: TrackProgressService,
        private router: Router
    ) { 
        this.player1 = this.trackProgress.getPlayer(0);
        this.player2 = this.trackProgress.getPlayer(1);
    }
        
    ngOnInit() {        
        this.player1 = this.trackProgress.getPlayer(0);
        this.player2 = this.trackProgress.getPlayer(1);
    }

    startGame() {
        this.router.navigateByUrl('/game')
    }
}