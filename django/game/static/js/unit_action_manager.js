get_unit = (row, col) => {
    return map_over_all[row][col].unit;
};

delete_unit = (row, col) => {
    delete map_over_all[row][col].unit;
};

set_unit = (unit_object, row, col) => {
    map_over_all[row][col].unit = unit_object;
    return map_over_all[row][col].unit;
};

get_all_unit = () => {
    let all_unit = [];
    for (map_row of map_over_all) {
        for (square of map_row) {
            if (square.unit) {
                all_unit.push(square.unit);
            };
        };
    };
    return all_unit;
};

get_attack_function = (unit, attack_function_code) => {
    functions = unit.attack_functions
    for (func of functions) {
        if (func.code == attack_function_code) {
            return func;
        };
    };
    return;
};

calc_hit_rate = (attack_unit, defense_unit, attack_function) => {
    // 100 ☓ (攻撃ユニットのすばやさ / 防御ユニットのすばやさ) ☓ (攻撃技のほせい + 100) ☓ 100
    return Math.round(
        (100 * (attack_unit.speed / defense_unit.speed)) *
        (attack_function.critical + 100) / 100);
};

random_number = (range = 100) => {
    return Math.floor(Math.random() * range);
};

is_hit = (hit_rate) => {
    return (hit_rate >= random_number(100));
};

calc_is_critical = (attack_unit, defense_unit, func_critical) => {
    critical_rate = Math.round(
        (20 * (attack_unit.speed / (defense_unit.speed + defense_unit.defense))) *
        (func_critical + 100) / 100);
    console.log(critical_rate);
    return (critical_rate >= random_number(100));
};

calc_damage = (attack_unit, defense_unit, attack_function) => {
    const is_critical = calc_is_critical(
        attack_unit,
        defense_unit,
        attack_function.critical)

    let critica_scale = 1;
    if (is_critical) {
        critica_scale = 1.5
    };
    const damage_width_rate = (95 + random_number(11)) / 100
    // return [
    //     attack_function.power *
    //     (attack_unit.attack / defense_unit.defense) *
    //     critica_scale *
    //     damage_width_rate,
    //     is_critical
    // ];
    return [
        attack_unit.attack *
        (attack_function.power / defense_unit.defense) *
        critica_scale *
        damage_width_rate,
        is_critical
    ];
};


exec_attack_process = (attack_unit, defense_unit, attack_function) => {
    const hit_rate = calc_hit_rate(attack_unit, defense_unit, attack_function);
    if (is_hit(hit_rate)) {
        calc_damage_result = calc_damage(attack_unit, defense_unit, attack_function);
        const damage = calc_damage_result[0];
        const is_critical = calc_damage_result[1];
        console.log('ダメージ:', damage, is_critical);
    } else {
        console.log('no hit');
    };
};