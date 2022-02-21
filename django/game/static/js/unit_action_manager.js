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
    let row_index = 0;
    let col_index = 0;
    for (map_row of map_over_all) {
        for (square of map_row) {
            if (square.unit) {
                square.unit.row = row_index;
                square.unit.col = col_index;
                all_unit.push(square.unit);
            };
            col_index += 1;
        };
        col_index = 0;
        row_index += 1;
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
    return Math.min(Math.round(
        (100 * (attack_unit.speed / defense_unit.speed)) *
        (attack_function.critical + 100) / 100), 100);
};

random_number = (range = 100) => {
    return Math.floor(Math.random() * range);
};

calc_is_hit = (hit_rate) => {
    return (hit_rate >= random_number(100));
};

calc_critical_rate = (attack_unit, defense_unit, func_critical) => {
    return Math.min(Math.round(
        (20 * (attack_unit.speed / (defense_unit.speed + defense_unit.defense))) *
        (func_critical + 100) / 100), 100);
};
calc_is_critical = (attack_unit, defense_unit, func_critical) => {
    return (
        calc_critical_rate(
            attack_unit, defense_unit, func_critical) >= random_number(100));
};

calc_damage = (attack_unit, defense_unit, attack_function) => {
    const is_critical = calc_is_critical(
        attack_unit,
        defense_unit,
        attack_function.critical)

    let critical_scale = 1;
    if (is_critical) {
        critical_scale = 1.5
    };
    const damage_width_rate = (95 + random_number(11)) / 100

    return [
        Math.round(
            attack_function.power *
            (attack_unit.attack / defense_unit.defense) *
            critical_scale *
            damage_width_rate),
        is_critical,

    ];
};

is_down = (unit) => {
    if (!unit.hp) {
        return true;
    };
    return false;
};

exec_end_attack_process = (defense_unit, map_gamepad_focus) => {
    if (is_down(defense_unit)) {
        remove_unit_dom(...map_gamepad_focus);
        delete_unit(...map_gamepad_focus);
    };
    draw_unit_status();
    end_attack_process();
};

exec_attack_process = (attack_unit, defense_unit, attack_function, map_gamepad_focus) => {
    const hit_rate = calc_hit_rate(attack_unit, defense_unit, attack_function);
    let damage = 0;
    let is_critical = false;
    let critical_rate = calc_critical_rate(
        attack_unit, defense_unit, attack_function.critical);
    let is_hit = calc_is_hit(hit_rate);
    let before_defense_unit_hp = parseInt(defense_unit.hp);
    if (is_hit) {
        calc_damage_result = calc_damage(attack_unit, defense_unit, attack_function);
        damage = calc_damage_result[0];
        is_critical = calc_damage_result[1];
        console.log('ダメージ:', damage, is_critical);
        defense_unit.hp -= Math.min(damage, defense_unit.hp);
    } else {
        console.log('no hit');
    };
    (async () => {
        await unit_attack_animate(
            attack_unit, defense_unit, attack_function,
            before_defense_unit_hp, damage,
            is_critical, is_hit, critical_rate, hit_rate);
        exec_end_attack_process(defense_unit, map_gamepad_focus);
    })();
};
