const CROSS_KEY_UP_DOWN = 5;
const CROSS_KEY_LEFT_RIGHT = 4;

const BUTTON_A = 1;
const BUTTON_B = 0;

let gamepad_focus = [4, 4]

// 要ブロッキング
let map_max_size = 9;
let map_min_size = 9;

$(function () {
    window.addEventListener("gamepadconnected", function (e) {
        let cross_key_up_down_pressed = false;
        let cross_key_left_right_pressed = false;
        let button_a_pressed = false;
        let button_b_pressed = false;
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
                gamepad_focus[0] += gamepad.axes[CROSS_KEY_UP_DOWN];
            };

            if (gamepad.axes[CROSS_KEY_LEFT_RIGHT] == 0) {
                cross_key_left_right_pressed = false;
            } else if (!(cross_key_left_right_pressed)) {
                cross_key_left_right_pressed = true;
                gamepad_focus[1] += gamepad.axes[CROSS_KEY_LEFT_RIGHT];
            };
            console.log(gamepad_focus);
        }, 1000 / 30);
    });
});