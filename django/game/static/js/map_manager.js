map_over_all = [
    [{}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, { 'unit': new Centaur() }, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {
        'unit': new Dragon()
    }, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {},],
];

square_types = [
    'grass',
    // 'ocean',
    'mountain',
];

const random_map_square_type = () => {
    if (Math.floor(Math.random() * 4)) {
        return 'grass'
    };
    return square_types[Math.floor(Math.random() * square_types.length)];

};

const add_row_html = (squares_html) => {
    return `
        <div class="map-row w-100">
            ${squares_html}
        </div>
    `;
};

const create_map_square_html = (map_square_info) => {
    let unit_html = '';
    if (map_square_info['unit']) {
        unit = map_square_info['unit'];
        unit_html = `
            <div class="unit w-100 h-100">
                <img class="unit-img w-100 h-100" src="static/image/${unit.code}_map.png">
                </img>
            </div>
        `;
    };

    const map_square_html = `
        <div class="square"
            data-row="${map_square_info['row']}" 
            data-col="${map_square_info['col']}"
            data-type="${map_square_info['type']}">
            ${unit_html}
            ${map_square_info['row']}-${map_square_info['col']} 
        </div>
    `;
    return map_square_html
};


const action_window_html = () => {
    const __action_window_html = `
        <div class="action-window">
            <div class="move action-menu choice-action pt-2">
                <p>いどう<p>
            </div>
            <div class="attack action-menu pt-2">
                <p>こうげき</p>
            </div>
            <div class="status action-menu pt-2">
                <p>のうりょく</p>
            </div>
        </div>
    `;
    return __action_window_html;
};

$(function () {

    get_square_dom = (row, col) => {
        return $(`.square[data-row=${row}][data-col=${col}]`);
    };

    // 行動選択ウィンドウ周り
    get_choice_action_dom = () => {
        return $('.choice-action');
    };

    get_action_window_dom = () => {
        return $('.action-window');
    };

    add_action_window_dom = (focus_square_dom) => {
        focus_square_dom.append(action_window_html());
    };

    remove_action_window_dom = () => {
        $('.action-window').remove();
    };

    select_action_menu = (direction) => {
        choice_action_index = $('.choice-action').index('.action-menu');
        $('.choice-action').removeClass('choice-action');
        $('.action-menu')
            .eq(choice_action_index + direction)
            .addClass('choice-action');
    };

    change_mode_move = (row, col) => {
        const move_range = map_over_all[row][col].unit.move;
        $('.square').filter((index, element) => {
            distance = Math.abs(parseInt(element.dataset.row) - row) + Math.abs(parseInt(element.dataset.col) - col);
            if (move_range >= distance) {
                return true;
            };
            return false;
        }).addClass('movable');
        get_action_window_dom().addClass('d-none');
    };

    draw_map = () => {
        $('.map-set-container').html('');
        for (let [row_index, map_row] of map_over_all.entries()) {
            let squares_html_list = [];
            for (let [col_index, map_square] of map_row.entries()) {
                map_square['row'] = row_index;
                map_square['col'] = col_index;
                map_square['type'] = random_map_square_type();
                squares_html_list.push(
                    create_map_square_html(map_square));
            };
            $('.map-set-container').append(
                add_row_html(squares_html_list.join('')));
        };

        $('.square').each(function () {
            square_type = $(this).data('type');
            $(this).css('background-image', `url("static/image/${square_type}.png")`);
            if ($(this).data('row') == '4' && $(this).data('col') == '4') {
                $(this).attr('data-map-focus', 'true');
            };
        });
    };
    draw_map();
});