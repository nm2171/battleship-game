import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPlayer } from 'src/app/intefaces/IPlayer';
import { TrackProgressService } from 'src/app/services/track-progress.service';
import * as bootstrap from 'bootstrap';

@Component({
    selector: 'app-grid',
    templateUrl: 'grid.component.html',
    styleUrls: ['grid.component.css']
})

export class GridComponent implements OnInit {
    @Input() player?: IPlayer;
    numbers = Array.from(Array(6)).map((x, i) => i );
    showModal: boolean = true;
    hideSection: boolean = false;

    constructor(
        private router: Router,
        private trackProgress:  TrackProgressService
    ) { }

    ngOnInit() {
        this.hideSection = this.router.url !== '/game';
    }

    onCellClick(cell: any) {    
        if(this.hideSection) 
            return;

        if(cell.target.dataset['ship'] === "1") {
            this.trackProgress.addSinkedField(this.player!.id, cell.target.className);
            cell.target.classList.add('shipField');
        } else {
            cell.target.classList.add('emptyField');
        }

        if(!this.checkForWin(this.player!))  {
            this.toggleGrids();
        } else {
            new bootstrap.Modal(document.getElementById('staticBackdropModal')!).show();
        }
    }
    
    toggleGrids() {
        document.querySelectorAll('.tables').forEach(table => {
            table.classList.toggle('unclickableTable');          
        });
    }

    checkForWin(activePlayer: IPlayer) {
        return this.trackProgress.isWinner(activePlayer.id);
    }
    
    openNewGame() {
        new bootstrap.Modal(document.getElementById('staticBackdropModal')!).hide();
        this.trackProgress.newGame();
        this.router.navigateByUrl('/');
    }
}