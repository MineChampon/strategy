turn_count = 1;
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

exec_turn_end = async () => {
    do_not_accept_entry = true;
    for (unit of get_all_unit()) {
        unit.action = parseInt(unit.max_action);
    };
    remove_class_actiond_unit();
    order += 1;
    turn_count += 1;
    if (order > Object.keys(turn_order).length) {
        order = 1;
    };
    turn_player = turn_order[order];
    $('.turn-status').text(`${name_mapping[turn_player]}のターン`);
    $('.turn-counter').text(`ターン ${Math.ceil(turn_count / 2)}`);

    // 暫定対応
    if (turn_player == 'enemy') {
        await exec_cpu();
        do_not_accept_entry = false;
    };
};

game_init = () => {
    turn_player = turn_order[order];
    $('.turn-manager').append(
        `
            <p class="turn-status">${name_mapping[turn_player]}のターン</p>
            <p class="turn-counter">ターン ${Math.ceil(turn_count / 2)}</p>
        `
    );
};

$(function () {
    game_init();
});