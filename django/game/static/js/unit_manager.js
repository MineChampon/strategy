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
            4500,
            600,
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
            [1],
            30,
            true,
        ),
        new AttackFunction(
            'fire',
            'ほのお',
            1400,
            [1, 3],
            -10,
            true,
        )
    ];
};

class Centaur extends Unit {
    constructor(has_unit = 'enemy') {
        super(
            'centaur',
            'ケンタウベコ',
            2800,
            400,
            800,
            800,
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
            'fin_funnel',
            'フィン・ファンネル',
            4500,
            [1, 8],
            20,
        ),
    ];
};

class NewGundam extends Unit {
    constructor(has_unit = 'enemy') {
        super(
            'ν_gundam',
            'νガンダム',
            2800,
            1200,
            500,
            2500,
            7,
            has_unit,
        );
    };
    attack_functions = [
        new AttackFunction(
            'beam_saber',
            'ビームサーベル',
            1500,
            [1],
            20,
            true,
        ),
        new AttackFunction(
            'beam_rifle',
            'ビームライフル',
            1600,
            [1, 5],
            -10,
        ),
        new AttackFunction(
            'fin_funnel',
            'フィン・ファンネル',
            4500,
            [1, 8],
            20,
        ),
    ];
};