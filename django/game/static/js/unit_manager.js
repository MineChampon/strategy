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

class Beko extends Unit {
    constructor() {
        super(
            'akabeko',
            '赤べこ',
            4000,
            500,
            1000,
            500,
            3,
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
            '1400',
        )
    ];
};

class Dragon extends Unit {
    constructor() {
        super(
            'dragon',
            'ドラゴンべコ',
            4500,
            600,
            1000,
            500,
            3,
        );
    };
    attack_functions = [
        new AttackFunction(
            'body_blow',
            'たいあたり',
            '1000',
            [1],
            30,
            true,
        ),
        new AttackFunction(
            'fire',
            'ほのお',
            '1400',
            [1, 3],
            -10,
            true,
        )
    ];
};

class Centaur extends Unit {
    constructor() {
        super(
            'centaur',
            'ケンタウベコ',
            2800,
            400,
            800,
            800,
            4,
        );
    };
    attack_functions = [
        new AttackFunction(
            'body_blow',
            'たいあたり',
            '1000',
        ),
        new AttackFunction(
            'hyper_aura_slash',
            'ハイパーオーラぎり',
            '4100'
        ),
    ];
};

class NewGundam extends Unit {
    constructor() {
        super(
            'ν_gundam',
            'νガンダム',
            2800,
            1200,
            500,
            2500,
            7,
        );
    };
    attack_functions = [
        new AttackFunction(
            'beam_saber',
            'ビームサーベル',
            '1500',
            [1],
            20,
            true,
        ),
        new AttackFunction(
            'beam_rifle',
            'ビームライフル',
            '1600',
            [1, 5],
            -10,
        ),
        new AttackFunction(
            'fin_funnel',
            'フィン・ファンネル',
            '5800',
            [1, 8],
            20,
        ),
    ];
};