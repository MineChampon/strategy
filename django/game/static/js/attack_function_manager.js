class AttackFunction {
    constructor(
        code = '',
        name = '',
        power = 1000,
        range = [1],
        critical = 0,
        moved = false,
    ) {
        this.code = code;
        this.name = name;
        this.power = power;
        this.range = range;
        this.critical = critical;
        this.moved = moved;
    };
};