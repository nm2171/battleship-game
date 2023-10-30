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

    /**
     * Get a player's information by their position in the players array.
     * @param pos - The position of the player in the array.
     * @returns The player's information.
     */
    getPlayer(pos: number) {
        return this.players[pos];
    }

    /**
     * Find and return the opponent of a player by their ID.
     * @param id - The ID of the player for whom you want to find the opponent.
     * @returns The opponent player's information.
     */
    getOpponent(id: number) {
        return this.players.find(p => p.id !== id);
    }

    /**
     * Add ship placement information for a player.
     * @param id - The ID of the player.
     * @param shipPosition - An array of ship positions.
     */
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

    /**
     * Get ship placement information for a player by their ID.
     * @param id - The ID of the player.
     * @returns An array of ship placement information.
     */
    getShipPlacement(id: number) {
        return this.players.find(p => p.id === id)?.shipPlacement;
    }

    /**
     * Update player scores and check for sunk ships when a field is attacked.
     * @param id - The ID of the player who made the attack.
     * @param attackedFieldPos - The position of the attacked field.
     */
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

    /**
     * Update player scores and check for sunk ships when a field is attacked.
     * @param id - The ID of the player who made the attack.
     * @param attackedFieldPos - The position of the attacked field.
     */
    sinkedShips(id: number) {
        let player = this.players.find(p => p.id === id);
        let ships = player?.shipPlacement;
        ships?.forEach(ship => {
            if(ship.positions.every(p => p.attacked === true)) {
                player!.lostShips++;
            }
        })
    }

    /**
     * Check if a player has won the game (i.e., their opponent has lost all their ships).
     * @param id - The ID of the player to check for a win.
     * @returns `true` if the player is the winner, otherwise `false`.
     */
    isWinner(id: number) {
        return this.players.find(p => p.id !== id)?.lostShips === 5;
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