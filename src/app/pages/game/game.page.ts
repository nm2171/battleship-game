import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPlayer } from 'src/app/intefaces/IPlayer';
import { TrackProgressService } from 'src/app/services/track-progress.service';

@Component({
    selector: 'app-game',
    templateUrl: 'game.page.html',
    styleUrls: ['./game.page.css']
})

export class GamePage implements OnInit, AfterViewInit {
    constructor(
        private trackProgress: TrackProgressService,
        private router: Router
    ) { }

    player1?: IPlayer;
    player2?: IPlayer;

    ngOnInit() {
        this.player1 = this.trackProgress.getPlayer(0);
        this.player2 = this.trackProgress.getPlayer(1);
    }
    
    ngAfterViewInit(): void {                
        this.addShipForPlayer(this.player1!);
        this.addShipForPlayer(this.player2!);

        if(this.router.url === '/game')
            document.getElementById(this.player1!.id.toString())?.classList.add('unclickableTable');
    }

    addShipForPlayer(player: IPlayer) {
        let grid = document.getElementById(player?.id.toString()!);
        let positions = player.shipPlacement;

        grid?.querySelectorAll('td').forEach(cell => {
            positions.forEach(pos => {
                pos.positions.forEach(p => {
                    if(p.position === cell.className) {
                        cell.dataset['ship'] = '1';
                    }
                })
            })
        });
    }
}