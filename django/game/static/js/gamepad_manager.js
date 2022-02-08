const CROSS_KEY_UP_DOWN = 5;
const CROSS_KEY_LEFT_RIGHT = 4;

const BUTTON_A = 1;
const BUTTON_B = 0;

// 全国津々浦々のフラグ類
let cross_key_up_down_pressed = false;
let cross_key_left_right_pressed = false;
let button_a_pressed = false;
let button_b_pressed = false;

let map_gamepad_focus = [4, 4]

// 使ってない。使うべきである。
let map_max_size = 9;
let map_min_size = 9;

// やらなくていい
const frame_manager = () => {
    __frame_config = {
        'operation_mode': '',
        'frame_map_focus': [4, 4]
    };
    return __frame_config;
};

let frame_config = frame_manager();

let operation_mode = 'map';

let choice_unit_position = [4, 4];

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
        // 選択したマスにユニットがいたら？
        if (get_unit(...map_gamepad_focus)) {
            // 行動選択ウィンドウ出す。
            let focus_square_dom = get_square_dom(...map_gamepad_focus);
            add_action_window_dom(focus_square_dom);

            // ウィンドウにフォーカスを当てるイメージ。
            __operation_mode = 'action';
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
            console.log();
        };
        if (choice_action.hasClass('status')) {
            console.log();
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
            __operation_mode = 'map';
        };

        if (choice_action.hasClass('moved_attack')) {
            console.log();
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
    if (operation_mode == 'move') {
        cancel_move_mode();
        // カーソルを元に戻す。参照渡し対策でparseInt
        map_gamepad_focus[0] = parseInt(choice_unit_position[0]);
        map_gamepad_focus[1] = parseInt(choice_unit_position[1]);
        operation_mode = 'action';
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

    // 移動後行動選択中の上キー押下なら
    if (operation_mode == 'moved_action') {
        select_action_menu(-1);
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

    // 移動後行動選択中の下キー押下なら
    if (operation_mode == 'moved_action') {
        select_action_menu(1);
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