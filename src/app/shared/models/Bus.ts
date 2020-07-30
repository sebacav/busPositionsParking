export class Bus {
    charger: string;
    marquesina: string;
    priority: number;
    parking_zone: number;
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
    chargers: string[];
    prioritys: number[];
    socsGun1: socGun[];
    socsGun2: socGun[];
    constructor(){}
}

export class socGun {
    percent: string;
    stateClass: string;
    priority: number;
}
