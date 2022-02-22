$(function () {
    const time_margin = (sec = 500) => {
        return new Promise(resolve => setTimeout(resolve, sec));
    };
    exec_cpu = async () => {
        for await (squere of $('.square')) {
            let row = $(squere).data('row');
            let col = $(squere).data('col');
            const unit = get_unit(row, col);
            const player_units = get_all_unit(has_unit = 'player');
            if (
                !unit ||
                unit.has_unit != 'enemy' ||
                !unit.action > 0 ||
                !player_units.length
            ) {
                continue;
            };
            console.log(`${unit.name}の行動`);
            await time_margin();
            // 思考パターン模索。
            // 一番近いプレイヤーユニットに攻撃する。
            // 攻撃できる距離にプレイヤーユニットがいないのであれば
            // 一番近いプレイヤーユニットに向けて移動する。

            let distance_units = {};
            for (p_unit of player_units) {
                const distance = Math.abs(p_unit.row - row) + Math.abs(p_unit.col - col);
                if (!distance_units[distance]) {
                    distance_units[distance] = [];
                };
                distance_units[distance].push(p_unit);
            };

            // 最寄りのプレイヤーユニット
            // 同じ距離に複数ユニットが存在する場合はランダム
            // TODO HPが少ない順でソート
            if (!Object.keys(distance_units).length) {
                continue;
            };
            const min_distanse = Math.min(...Object.keys(distance_units));
            const p_units = shuffle(distance_units[min_distanse]);
            const focus_p_unit = p_units[0];

            // この場所から攻撃できるか
            // 移動後攻撃できるか
            // そもそも移動するのか？
            // 攻撃できない場合一番近くなる位置に移動する。
            // 威力逆順ソートする。

            const high_power_order_attack_functions = unit.attack_functions.concat().sort(
                (a, b) => {
                    return (a.power > b.power) ? -1 : 1;  //オブジェクトの降順ソート
                });
            let choice_atk_func;
            let is_attack = false,
                is_moved_attack = false,
                is_move = true;
            for (atk_func of high_power_order_attack_functions) {
                if (is_attack || is_moved_attack) {
                    continue;
                };
                let atk_range = Math.max(...atk_func.range);
                let max_atk_range = Math.max(...atk_func.range);
                if (atk_func.moved) {
                    max_atk_range += unit.move;
                };
                if (atk_range >= min_distanse) {
                    is_attack = true;
                    choice_atk_func = atk_func;
                    is_move = false;
                } else if (max_atk_range >= min_distanse) {
                    is_moved_attack = true;
                    choice_atk_func = atk_func;
                } else {
                    // この技では攻撃できないのでcontinueする。
                    continue;
                };
            };
            // 行動パターン確定。
            console.log(choice_atk_func, is_attack, is_moved_attack, is_move);
            if (is_move) {
                await time_margin();
                // 移動するのであれば
                // 移動可能マスを全て取得する。
                is_move_squere_all = {};
                for (squere of $('.square')) {
                    const sq_row = $(squere).data('row');
                    const sq_col = $(squere).data('col');
                    if (get_unit(sq_row, sq_col)) {
                        continue;
                    };
                    const distance = Math.abs(sq_row - row) + Math.abs(sq_col - col);
                    if (unit.move >= distance) {
                        const p_unit_moved_distanse =
                            Math.abs(focus_p_unit.row - sq_row) +
                            Math.abs(focus_p_unit.col - sq_col);
                        if (!is_move_squere_all[p_unit_moved_distanse]) {
                            is_move_squere_all[p_unit_moved_distanse] = [];
                        };
                        is_move_squere_all[
                            p_unit_moved_distanse].push([sq_row, sq_col]);
                    };
                };
                console.log(is_move_squere_all);
                const move_target = is_move_squere_all[Math.min(...Object.keys(is_move_squere_all))][0];

                await move_unit([row, col], move_target);
                row = parseInt(move_target[0]);
                col = parseInt(move_target[1]);
                if (!is_attack && !is_moved_attack) {
                    minus_action_count(row, col);
                };
            };
            if (is_attack || is_moved_attack) {
                await time_margin();
                await exec_attack_process(
                    attack_unit = unit,
                    defense_unit = focus_p_unit,
                    attack_function = choice_atk_func,
                    map_gamepad_focus = [focus_p_unit.row, focus_p_unit.col]);
                minus_action_count(row, col);
            };
        };
        exec_turn_end();
        return new Promise(async (resolve, reject) => {
            resolve();
        });
    };
});