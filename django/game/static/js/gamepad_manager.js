const CROSS_KEY_UP_DOWN = 5;
const CROSS_KEY_LEFT_RIGHT = 4;

// コントローラー対応
const BUTTON_A = 1;
const BUTTON_B = 0;

const BUTTON_L = 4;
const BUTTON_R = 5;
let unit_select_index = 0;

// 全国津々浦々のフラグ類
let cross_key_up_down_pressed = false;
let cross_key_left_right_pressed = false;
let button_a_pressed = false;
let button_b_pressed = false;
let button_l_pressed = false;
let button_r_pressed = false;

let map_gamepad_focus = [5, 5]

// 使ってない。使うべきである。
let map_max_size = 9;
let map_min_size = 9;

// やらなくていい
const frame_manager = () => {
    __frame_config = {
        'operation_mode': 'map',
        'frame_map_focus': [5, 5]
    };
    return __frame_config;
};

let frame_config = frame_manager();

let operation_mode = 'map';

let choice_unit_position = [5, 5];

// 移動キャンセルに使います
let before_unit_position = [5, 5];

do_not_accept_entry = false;

accept_entry = () => {
    do_not_accept_entry = false;
};

not_accept_entry = () => {
    do_not_accept_entry = true;
};

press_A = () => {
    console.log('Aボタン押下');
    // ボタン長押しさせない
    button_a_pressed = true;
    let __operation_mode = operation_mode;
    // マップ上でのAボタン押下なら
    if (operation_mode == 'map') {
        const unit = get_unit(...map_gamepad_focus);
        // 選択したマスにユニットがいたら？
        if (unit) {
            if (
                0 >= unit.action ||
                unit.has_unit != turn_player
            ) {
                return;
            };
            // 行動選択ウィンドウ出す。
            add_action_window_dom(
                get_square_dom(...map_gamepad_focus));

            // ウィンドウにフォーカスを当てるイメージ。
            __operation_mode = 'action';
        } else {
            add_manage_window_dom(
                get_square_dom(...map_gamepad_focus));
            // ウィンドウにフォーカスを当てるイメージ。
            __operation_mode = 'manage';
        };
    };

    if (operation_mode == 'action') {
        const choice_action = get_choice_action_dom();
        if (choice_action.hasClass('move')) {
            // モード変更
            __operation_mode = 'move';
            // 選択ユニットの座標保持
            choice_unit_position[0] = parseInt(map_gamepad_focus[0]);
            choice_unit_position[1] = parseInt(map_gamepad_focus[1]);
            // 移動モードに切り替える。
            change_move_mode(...map_gamepad_focus);
        };
        if (choice_action.hasClass('attack')) {
            // モード変更
            __operation_mode = 'select_attack';
            // 選択ユニットの座標保持
            choice_unit_position[0] = parseInt(map_gamepad_focus[0]);
            choice_unit_position[1] = parseInt(map_gamepad_focus[1]);
            // 技選択モードに切り替える。
            change_select_attack_functions_mode(...map_gamepad_focus);
        };
        if (choice_action.hasClass('status')) {
            console.log();
        };
    };

    if (operation_mode == 'manage') {
        const choice_manage = get_choice_manage_dom();
        if (choice_manage.hasClass('end')) {
            // モード変更
            remove_manage_window_dom();
            __operation_mode = 'map';
            exec_turn_end();
        };
    };

    if (operation_mode == 'move') {
        // 移動できるマスなら
        if (get_square_dom(...map_gamepad_focus).hasClass('movable')) {
            (async () => {
                // 入力を受け付けない
                await not_accept_entry();
                // 移動範囲表示消す。アクションウィンドウ消す。
                cancel_move_mode();
                // ユニット移動処理、アニメーション。
                await move_unit(choice_unit_position, map_gamepad_focus);
                //移動前避難
                before_unit_position[0] = parseInt(choice_unit_position[0]);
                before_unit_position[1] = parseInt(choice_unit_position[1]);
                // 選択ユニットを移動先へ。参照渡し対策でparseInt
                choice_unit_position[0] = parseInt(map_gamepad_focus[0]);
                choice_unit_position[1] = parseInt(map_gamepad_focus[1]);
                // 入力OK
                await accept_entry();
                operation_mode = 'moved_action';
                add_moved_action_window_dom(get_square_dom(...choice_unit_position));
            })();
        };
    };

    if (operation_mode == 'moved_action') {
        const choice_action = get_choice_action_dom();
        if (choice_action.hasClass('standby')) {
            // モード変更
            remove_action_window_dom();
            minus_action_count(...map_gamepad_focus);
            __operation_mode = 'map';
        };
        // 移動後こうげき
        if (choice_action.hasClass('moved_attack')) {
            // モード変更
            __operation_mode = 'moved_select_attack';
            // 選択ユニットの座標保持
            choice_unit_position[0] = parseInt(map_gamepad_focus[0]);
            choice_unit_position[1] = parseInt(map_gamepad_focus[1]);
            // 技選択モードに切り替える。
            change_select_attack_functions_mode(...map_gamepad_focus, moved = true);
        };
    };

    if (operation_mode == 'select_attack') {
        change_target_select_mode(...map_gamepad_focus);
        __operation_mode = 'target_select';
    };

    if (operation_mode == 'moved_select_attack') {
        change_target_select_mode(...map_gamepad_focus);
        __operation_mode = 'moved_target_select';
    };

    if (operation_mode.match(/target_select/)) {
        if (get_square_dom(...map_gamepad_focus).hasClass('attack-target')) {
            // ユニットがいたら
            attack_unit = get_unit(...choice_unit_position);
            defense_unit = get_unit(...map_gamepad_focus);
            if (attack_unit && defense_unit) {
                exec_attack_process(
                    attack_unit = attack_unit,
                    defense_unit = defense_unit,
                    attack_function = attack_function,
                    map_gamepad_focus = map_gamepad_focus);
                minus_action_count(...choice_unit_position);
                __operation_mode = 'map';
            };
        };
    };

    operation_mode = __operation_mode;
};

press_B = () => {
    console.log('Bボタン押下');
    // ボタン長押しさせない
    button_b_pressed = true;
    // 行動選択中のBボタン押下なら
    if (operation_mode == 'action') {
        remove_action_window_dom();
        operation_mode = 'map';
    };
    // マップ上メニュー選択中のBボタン押下なら
    if (operation_mode == 'manage') {
        remove_manage_window_dom();
        operation_mode = 'map';
    };
    if (operation_mode == 'move') {
        cancel_move_mode();
        // カーソルを元に戻す。参照渡し対策でparseInt
        map_gamepad_focus[0] = parseInt(choice_unit_position[0]);
        map_gamepad_focus[1] = parseInt(choice_unit_position[1]);
        operation_mode = 'action';
    };
    if (operation_mode == 'moved_action') {
        cancel_moved_action_mode(choice_unit_position, before_unit_position);
        choice_unit_position[0] = parseInt(before_unit_position[0]);
        choice_unit_position[1] = parseInt(before_unit_position[1]);
        map_gamepad_focus[0] = parseInt(choice_unit_position[0]);
        map_gamepad_focus[1] = parseInt(choice_unit_position[1]);
        add_action_window_dom(
            get_square_dom(...map_gamepad_focus));
        operation_mode = 'action';
    };
    if (operation_mode == 'select_attack') {
        cancel_select_attack_functions_mode();
        operation_mode = 'action';
    };

    if (operation_mode == 'moved_select_attack') {
        cancel_select_attack_functions_mode();
        operation_mode = 'moved_action';
    };

    if (operation_mode == 'target_select') {
        cancel_target_select_mode();
        map_gamepad_focus[0] = parseInt(choice_unit_position[0]);
        map_gamepad_focus[1] = parseInt(choice_unit_position[1]);
        operation_mode = 'select_attack';
    };

    if (operation_mode == 'moved_target_select') {
        cancel_target_select_mode();
        map_gamepad_focus[0] = parseInt(choice_unit_position[0]);
        map_gamepad_focus[1] = parseInt(choice_unit_position[1]);
        operation_mode = 'moved_select_attack';
    };

};

press_L = () => {
    console.log('Lボタン押下');
    button_l_pressed = true;

    // マップ上でのLキー押下なら
    if (operation_mode == 'map') {
        const units = get_all_unit();
        if (get_unit(...map_gamepad_focus)) {
            if (unit_select_index == 0) {
                unit_select_index = units.length - 1;
            } else {
                unit_select_index -= 1;
            };
        };
        const unit = units[unit_select_index];
        map_gamepad_focus[0] = unit.row;
        map_gamepad_focus[1] = unit.col;
    };

    // 攻撃対象選択モード中のLキー押下なら
    if (operation_mode.match(/target_select/)) {
        const units = get_all_unit();
        if (get_unit(...map_gamepad_focus)) {
            if (unit_select_index == 0) {
                unit_select_index = units.length - 1;
            } else {
                unit_select_index -= 1;
            };
        };
        const unit = units[unit_select_index];
        map_gamepad_focus[0] = unit.row;
        map_gamepad_focus[1] = unit.col;
    };
};

press_R = () => {
    console.log('Rボタン押下');
    button_r_pressed = true;

    // マップ上での上キー押下なら
    if (operation_mode == 'map') {
        const units = get_all_unit();
        if (get_unit(...map_gamepad_focus)) {
            if (unit_select_index == units.length - 1) {
                unit_select_index = 0;
            } else {
                unit_select_index += 1;
            };
        };
        const unit = units[unit_select_index];
        map_gamepad_focus[0] = unit.row;
        map_gamepad_focus[1] = unit.col;
    };

    // 攻撃対象選択モード中のRキー押下なら
    if (operation_mode.match(/target_select/)) {
        const units = get_all_unit();
        if (get_unit(...map_gamepad_focus)) {
            if (unit_select_index == units.length - 1) {
                unit_select_index = 0;
            } else {
                unit_select_index += 1;
            };
        };
        const unit = units[unit_select_index];
        map_gamepad_focus[0] = unit.row;
        map_gamepad_focus[1] = unit.col;
    };
};

press_UP = () => {
    console.log('上キー押下');
    // ボタン長押しさせない
    cross_key_up_down_pressed = true;

    // マップ上での上キー押下なら
    if (operation_mode == 'map') {
        map_gamepad_focus[0] -= 1;
    };

    // 行動選択中の上キー押下なら
    if (operation_mode == 'action') {
        select_action_menu(-1);
    };

    // 移動モード中の上キー押下なら
    if (operation_mode == 'move') {
        // 不安あり
        map_gamepad_focus[0] -= 1;
    };

    // 技選択モード中の上キー押下なら
    if (operation_mode.match(/select_attack/)) {
        // 不安あり
        select_attack_function(-1);
    };

    // 移動後行動選択中の上キー押下なら
    if (operation_mode == 'moved_action') {
        select_action_menu(-1);
    };

    // 攻撃対象選択モード中の上キー押下なら
    if (operation_mode.match(/target_select/)) {
        // 不安あり
        map_gamepad_focus[0] -= 1;
    };
};

press_DOWN = () => {
    console.log('下キー押下');
    // ボタン長押しさせない
    cross_key_up_down_pressed = true;

    // マップ上での下キー押下なら
    if (operation_mode == 'map') {
        map_gamepad_focus[0] += 1;
    };

    // 行動選択中の下キー押下なら
    if (operation_mode == 'action') {
        select_action_menu(1);
    };

    // 移動モード中の下キー押下なら
    if (operation_mode == 'move') {
        // 不安あり
        map_gamepad_focus[0] += 1;
    };

    // 技選択モード中の下キー押下なら
    if (operation_mode.match(/select_attack/)) {
        // 不安あり
        select_attack_function(1);
    };

    // 移動後行動選択中の下キー押下なら
    if (operation_mode == 'moved_action') {
        select_action_menu(1);
    };

    // 攻撃対象選択モード中の下キー押下なら
    if (operation_mode.match(/target_select/)) {
        // 不安あり
        map_gamepad_focus[0] += 1;
    };
};

press_LEFT = () => {
    console.log('左キー押下');
    // ボタン長押しさせない
    cross_key_left_right_pressed = true;

    // マップ上での左キー押下なら
    if (operation_mode == 'map') {
        map_gamepad_focus[1] -= 1;
    };

    // 移動モード中の左キー押下なら
    if (operation_mode == 'move') {
        // 不安あり
        map_gamepad_focus[1] -= 1;
    };

    // 攻撃対象選択モード中の左キー押下なら
    if (operation_mode.match(/target_select/)) {
        // 不安あり
        map_gamepad_focus[1] -= 1;
    };
};

press_RIGHT = () => {
    console.log('右キー押下');
    // ボタン長押しさせない
    cross_key_left_right_pressed = true;

    // マップ上での右キー押下なら
    if (operation_mode == 'map') {
        map_gamepad_focus[1] += 1;
    };

    // 移動モード中の右キー押下なら
    if (operation_mode == 'move') {
        // 不安あり
        map_gamepad_focus[1] += 1;
    };

    // 攻撃対象選択モード中の右キー押下なら
    if (operation_mode.match(/target_select/)) {
        // 不安あり
        map_gamepad_focus[1] += 1;
    };
};

$(function () {
    end_frame_fuctions = (frame_config) => {
        // マップ上カーソル移動
        frame_config['frame_map_focus'] = map_gamepad_focus;
        $('[data-map-focus="true"]').removeAttr('data-map-focus');
        get_square_dom(...map_gamepad_focus).attr('data-map-focus', 'true');
    };

    const main = (e) => {
        let gamepad = navigator.getGamepads()[e.gamepad.index];
        if (!(gamepad) || do_not_accept_entry) {
            return;
        };

        if (!(gamepad.buttons[BUTTON_A].pressed)) {
            button_a_pressed = false;
        } else if (!(button_a_pressed)) {
            press_A();
        };

        if (!(gamepad.buttons[BUTTON_B].pressed)) {
            button_b_pressed = false;
        } else if (!(button_b_pressed)) {
            press_B();
        };

        if (!(gamepad.buttons[BUTTON_L].pressed)) {
            button_l_pressed = false;
        } else if (!(button_l_pressed)) {
            press_L();
        };

        if (!(gamepad.buttons[BUTTON_R].pressed)) {
            button_r_pressed = false;
        } else if (!(button_r_pressed)) {
            press_R();
        };

        if (gamepad.axes[CROSS_KEY_UP_DOWN] == 0) {
            cross_key_up_down_pressed = false;
        } else if (!(cross_key_up_down_pressed)) {
            if (0 > gamepad.axes[CROSS_KEY_UP_DOWN]) {
                press_UP();
            };
            if (gamepad.axes[CROSS_KEY_UP_DOWN] > 0) {
                press_DOWN();
            };
        };

        if (gamepad.axes[CROSS_KEY_LEFT_RIGHT] == 0) {
            cross_key_left_right_pressed = false;
        } else if (!(cross_key_left_right_pressed)) {
            if (0 > gamepad.axes[CROSS_KEY_LEFT_RIGHT]) {
                press_LEFT();
            };
            if (gamepad.axes[CROSS_KEY_LEFT_RIGHT] > 0) {
                press_RIGHT();
            };
        };

        end_frame_fuctions(frame_config);

    };

    window.addEventListener("gamepadconnected", function (e) {
        (function loop() {
            main(e);
            window.requestAnimationFrame(loop);
        }());
    });
});