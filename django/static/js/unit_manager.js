class Unit {
    constructor(
        code,
        name,
        hp,
        attack,
        defense,
        speed,
        move,
    ) {
        this.code = code;
        this.name = name;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.move = move;
    };
};


class AttackFunction {
    constructor(
        code,
        name,
        power,
    ) {
        this.code = code;
        this.name = name;
        this.power = power;
    };
};


class Beko extends Unit {
    constructor() {
        super(
            'akabeko',
            '赤べこ',
            4000,
            500,
            1000,
            500,
            3
        );
    };
    attack_functions = [
        new AttackFunction(
            'body_blow',
            'たいあたり',
            '1000',
        ),
        new AttackFunction(
            'fire',
            'ほのお',
            '1400'
        )
    ];
};
