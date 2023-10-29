import { IShip } from "./IShip";

export interface IPlayer {
    id: number;
    name: string;
    score: number;
    lostShips: number;
    firstStage: boolean;
    shipPlacement: IShip[];
}