import { Injectable } from '@angular/core';
import { IPlayer } from '../intefaces/IPlayer';
import { IShipPosition } from '../intefaces/IShip';

@Injectable({providedIn: 'root'})
export class TrackProgressService {
    constructor() { }

    players: IPlayer[] = [];

    addPlayer(player: IPlayer) {
        player.firstStage = false;
        this.players.push(player);
    }

    getPlayer(pos: number) {
        return this.players[pos];
    }

    getOpponent(id: number) {
        return this.players.find(p => p.id !== id);
    }

    addShipPlacement(id: number, shipPosition: string[]) {
        let player = this.players.find(p => p.id === id);
        let shipId = player?.id.toString() + (player?.shipPlacement.length! + 1).toString();
        let shipPos: IShipPosition[] = [];
        shipPosition.map(pos => {
            return shipPos.push({
                attacked: false,
                position: pos
            });
        });
        player?.shipPlacement.push({id: Number(shipId), positions: shipPos!});
    }

    getShipPlacement(id: number) {
        return this.players.find(p => p.id === id)?.shipPlacement;
    }

    addSinkedField(id: number, attackedFieldPos: string) {        
        this.players.forEach(p => {
            if(p.id === id) {
                p.score += 1;
            } else {
                p.shipPlacement.forEach(ship => {
                    ship.positions.find(p => p.position === attackedFieldPos)!.attacked = true;
                });
                this.sinkedShips(p.id);
            }
        });
    }

    sinkedShips(id: number) {
        let player = this.players.find(p => p.id === id);
        let ships = player?.shipPlacement;
        ships?.forEach(ship => {
            if(ship.positions.every(p => p.attacked === true)) {
                player!.lostShips++;
            }
        })
    }

    isWinner(id: number) {
        return this.players.find(p => p.id !== id)?.lostShips === 1;
    }

    changeStage(playerId: number) {
        this.players.find(p => p.id === playerId)!.firstStage = true;        
    }

    addScore(playerPos: number, score: number) {
        this.players[playerPos].score += score;
    }   

    newGame() {
        this.players = [];
    }
}