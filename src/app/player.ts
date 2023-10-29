import { IShip } from "./intefaces/IShip";

export class Player {
    id: number = Math.floor(Math.random() * 1000);
    name: string = '';
    score: number = 0;
    lostShips: number = 0;
    firstStage: boolean = false;
    shipPlacement: IShip[] = [];
}