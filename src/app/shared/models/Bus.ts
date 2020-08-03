export class Bus {
    charger: string;
    marquesina: string;
    priority: number;
    parking_zone: number;
    position_line: number;
    soc: number;
    gun: number;
}

// export class Parking {
//     chargers: string[];
//     prioritys: number[];
//     socsGun1: number[];
//     socsGun2: number[];
//     constructor(){}
// }

export class Parking {
    positionLine: PositionLine[];
    constructor(){}
}

export class socGun {
    percent: string;
    stateClass: string;
    priority: number;
}

export class PositionLine {
    chargers: string[];
    prioritys: number[];
    socsGun1: socGun[];
    socsGun2: socGun[];
    stateClass: string;
    constructor(){}
}