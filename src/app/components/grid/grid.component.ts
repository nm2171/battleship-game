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

     /**
     * Handle cell click events on the grid.
     * Updates the game state based on the clicked cell and checks if the cell is a ship position.
     * Also, it toggles the grids' clickability if the game is not won.
     * @param cell - The clicked cell element.
     */
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

    /**
     * Check if the active player has won the game.
     * @param activePlayer - The player to check for a win.
     * @returns `true` if the player has won, otherwise `false`.
     */
    checkForWin(activePlayer: IPlayer) {
        return this.trackProgress.isWinner(activePlayer.id);
    }
    
    openNewGame() {
        new bootstrap.Modal(document.getElementById('staticBackdropModal')!).hide();
        this.trackProgress.newGame();
        this.router.navigateByUrl('/');
    }
}