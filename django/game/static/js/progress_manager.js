turn_count = 0;
order = 1;

const name_mapping = {
    'player': 'あなた',
    'enemy': 'てき',
};

const turn_order = {
    1: 'player',
    2: 'enemy',
};

turn_player = '';

exec_turn_end = () => {
    order += 1;
    if (order > Object.keys(turn_order).length) {
        order = 1;
    };
    turn_player = turn_order[order];
    $('.turn-status').text(`${name_mapping[turn_player]}のターン`);
};

game_init = () => {
    turn_player = turn_order[order];
    $('.turn-manager').append(
        `<p class="turn-status">${name_mapping[turn_player]}のターン</p>`
    );
};

$(function () {
    game_init();
});