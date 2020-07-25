export class Bus {
    charger: string;
    marquesina: string;
    priority: number;
    parking_zone: number;
    soc: number;
    gun: number;
}

export class Parking {
    chargers: string[];
    prioritys: number[];
    socsGun1: number[];
    socsGun2: number[];
    constructor(){}
}
