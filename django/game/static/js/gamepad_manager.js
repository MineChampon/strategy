const CROSS_KEY_UP_DOWN = 5;
const CROSS_KEY_LEFT_RIGHT = 4;

const BUTTON_A = 1;
const BUTTON_B = 0;

let map_gamepad_focus = [4, 4]

// 要ブロッキング
let map_max_size = 9;
let map_min_size = 9;

$(function () {
    // やらなくていい
    const frame_manager = () => {
        frame_config = {
            'operation_mode': '',
            'frame_map_focus': [4, 4],
        };
        return frame_config;
    };

    const end_frame_fuctions = (frame_config) => {
        // マップ上カーソル移動
        console.log(frame_config['frame_map_focus'], map_gamepad_focus);
        frame_config['frame_map_focus'] = map_gamepad_focus;
        $('[data-map-focus="true"]').removeAttr('data-map-focus');
        $('.square').each(function () {
            if ($(this).data('row') == String(map_gamepad_focus[0]) &&
                $(this).data('col') == String(map_gamepad_focus[1])) {
                $(this).attr('data-map-focus', 'true');
            };
        });
    };

    window.addEventListener("gamepadconnected", function (e) {
        // もろもろのフラグ類
        let cross_key_up_down_pressed = false;
        let cross_key_left_right_pressed = false;
        let button_a_pressed = false;
        let button_b_pressed = false;

        operation_mode = 'map';
        let frame_config = frame_manager();

        setInterval(() => {
            let gamepad = navigator.getGamepads()[e.gamepad.index];

            if (!(gamepad.buttons[BUTTON_A].pressed)) {
                button_a_pressed = false;
            } else if (!(button_a_pressed)) {
                console.log('Aボタン押下');
                button_a_pressed = true;
            };

            if (!(gamepad.buttons[BUTTON_B].pressed)) {
                button_b_pressed = false;
            } else if (!(button_b_pressed)) {
                console.log('Bボタン押下');
                button_b_pressed = true;
            };

            if (gamepad.axes[CROSS_KEY_UP_DOWN] == 0) {
                cross_key_up_down_pressed = false;
            } else if (!(cross_key_up_down_pressed)) {
                cross_key_up_down_pressed = true;
                map_gamepad_focus[0] += gamepad.axes[CROSS_KEY_UP_DOWN];
                console.log('上下キー押下');
            };

            if (gamepad.axes[CROSS_KEY_LEFT_RIGHT] == 0) {
                cross_key_left_right_pressed = false;
            } else if (!(cross_key_left_right_pressed)) {
                cross_key_left_right_pressed = true;
                map_gamepad_focus[1] += gamepad.axes[CROSS_KEY_LEFT_RIGHT];
                console.log('左右キー押下');
            };

            end_frame_fuctions(frame_config);

        }, 1000 / 15);
    });
});