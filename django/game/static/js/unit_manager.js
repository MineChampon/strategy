class Unit {
    constructor(
        code,
        name,
        hp,
        attack,
        defense,
        speed,
        move,
        has_unit,
    ) {
        this.code = code;
        this.name = name;
        this.max_hp = hp;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.move = move;
        this.has_unit = has_unit;
        this.max_action = 1;
        this.action = this.max_action;
    };
};

class Beko extends Unit {
    constructor(has_unit = 'enemy') {
        super(
            'akabeko',
            '赤べこ',
            4000,
            500,
            1000,
            500,
            3,
            has_unit,
        );
    };
    attack_functions = [
        new AttackFunction(
            'body_blow',
            'たいあたり',
            1000,
        ),
        new AttackFunction(
            'fire',
            'ほのお',
            1400,
        )
    ];
};

class Dragon extends Unit {
    constructor(has_unit = 'enemy') {
        super(
            'dragon',
            'ドラゴンべコ',
            3000,
            1000,
            1000,
            1000,
            3,
            has_unit,
        );
    };
    attack_functions = [
        new AttackFunction(
            'body_blow',
            'たいあたり',
            1000,
            [1],
            30,
            true,
        ),
        new AttackFunction(
            'fire',
            'ほのお',
            1500,
            [1, 2],
            -10,
            false,
        )
    ];
};

class Centaur extends Unit {
    constructor(has_unit = 'enemy') {
        super(
            'centaur',
            'ケンタウベコ',
            2500,
            1000,
            1000,
            1000,
            4,
            has_unit,
        );
    };
    attack_functions = [
        new AttackFunction(
            'body_blow',
            'たいあたり',
            1000,
            [1],
            30,
            true,
        ),
        new AttackFunction(
            'fire',
            'ほのお',
            1500,
            [1, 2],
            -10,
            false,
        )
    ];
};

class NewGundam extends Unit {
    constructor(has_unit = 'enemy') {
        super(
            'ν_gundam',
            'νガンダム',
            2000,
            2000,
            1000,
            3000,
            7,
            has_unit,
        );
    };
    attack_functions = [
        new AttackFunction(
            'fighting',
            'かくとう',
            1500,
            [1],
            20,
            true,
        ),
        new AttackFunction(
            'beam_rifle',
            'ビームライフル',
            1800,
            [1, 3],
            -10,
            true,
        ),
        new AttackFunction(
            'fin_funnel',
            'フィン・ファンネル',
            4500,
            [1, 5],
            20,
        ),
    ];
};