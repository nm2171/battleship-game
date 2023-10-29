export interface IShipPosition {
    attacked: boolean;
    position: string;
}

export interface IShip {
    id: number;
    positions: IShipPosition[];
}