import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { IPlayer } from 'src/app/intefaces/IPlayer';
import { TrackProgressService } from 'src/app/services/track-progress.service';

@Component({
    selector: 'app-form',
    templateUrl: 'form.component.html',
    styleUrls: ['form.component.css']
})

export class FormComponent implements OnInit {
    @Input() player?: IPlayer;

    constructor(
        private formBuilder: FormBuilder,
        private trackProgress: TrackProgressService
    ) { }

    shipsToBePlaced: number = 5;

    placeShipForm = this.formBuilder.group({
        shipStartRow: 1,
        shipStartCol: 1,
        shipLenght: 1,
        shipPosition: 'vertical',
    });

    ngOnInit() {
    }

    placeShip() {
        let col = this.placeShipForm.value.shipStartCol! - 1;
        let row = this.placeShipForm.value.shipStartRow! - 1;
        let lenght = this.placeShipForm.value.shipLenght!;
        let pos = this.placeShipForm.value.shipPosition!;

        let validPlacement = this.checkIfValidPosition(lenght, col, row, pos);
        if (validPlacement) {
            this.shipsToBePlaced--;

            if (pos === 'horizontal') {
                let tableRow = document.getElementsByClassName(`row-${row}`);
                let position: string[] = [];
                
                for (let i = col; i < col + lenght; i++) {
                    let el = tableRow[i] as HTMLElement;
                    el.dataset['ship'] = "1";
                    position.push(el.className);
                    el.classList.add('active');
                }
                this.trackProgress.addShipPlacement(this.player?.id!, position);
                
            } else {
                let tableColumn = document.getElementsByClassName(`col-${col}`);
                let position: string[] = [];
                for (let i = row; i < row + lenght; i++) {
                    let el = tableColumn[i] as HTMLElement;
                    el.dataset['ship'] = "1";
                    position.push(el.className);
                    el.classList.add('active');
                }
                this.trackProgress.addShipPlacement(this.player?.id!, position);                    
            }
        };

        if (this.shipsToBePlaced === 0) {            
            this.trackProgress.changeStage(this.player?.id!);
        }
    }

    checkIfValidPosition(lenght: number, col: number, row: number, pos: string) {
        let toast = new bootstrap.Toast(document.getElementById('toast')!);

        if (pos === 'horizontal') {
            if (lenght + col - 1 > 6) {
                toast.show();
                return false;
            }
            let tableRow = document.getElementsByClassName(`r-${row}`)[0].childNodes;
            console.log('table row: ', tableRow);
            
            for (let i = col; i < 6; i++) {
                let el = (tableRow[i] as HTMLElement)?.dataset['ship'];                
                if (el === '1') {
                    toast.show();
                    return false;
                }
            }
            return true;
        } else {
            if (lenght + row - 1 > 6) {
                toast.show();
                return false;
            }

            let tableCol = document.getElementsByClassName(`col-${col}`);
            for (let i = row; i < 6; i++) {
                let el = (tableCol[i] as HTMLElement)?.dataset['ship'];                 
                if ( el === '1') {
                    toast.show();
                    return false;
                }
            }
            return true;
        }
    }
}