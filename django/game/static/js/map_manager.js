square_types = [
    'grass',
    'ocean',
    'ground',
    'mountain',
];

const random_map_square_type = () => {
    return 'ground'
    // if (Math.floor(Math.random() * 2)) {
    //     return 'grass';
    // };
    // return square_types[Math.floor(Math.random() * square_types.length)];
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
        const unit = map_square_info['unit'];
        unit_html = `
            <div class="unit has-unit-${unit.has_unit}-body w-100 h-100">
                <img class="unit-img has-unit-${unit.has_unit} w-100 h-100" src="static/image/${unit.code}_map.png">
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
        </div>
    `;
    return map_square_html
};


const action_window_html = () => {
    const __action_window_html = `
        <div class="action-window d-none">
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

const manage_window_html = () => {
    const __manage_window_html = `
        <div class="manage-window">
            <div class="end manage-menu choice-manage pt-2">
                <p>おわり<p>
            </div>
        </div>
    `;
    return __manage_window_html;
};

const moved_action_window_html = () => {
    const __moved_action_window_html = `
        <div class="action-window">
            <div class="standby action-menu choice-action pt-2">
                <p>たいき<p>
            </div>
            <div class="moved_attack action-menu pt-2">
                <p>こうげき</p>
            </div>
        </div>
    `;
    return __moved_action_window_html;
};

const create_unit_html = (unit) => {
    const unit_html = `
        <div class="unit has-unit-${unit.has_unit}-body w-100 h-100">
            <img class="unit-img has-unit-${unit.has_unit} w-100 h-100" src="static/image/${unit.code}_map.png">
            </img>
        </div>
    `;
    return unit_html;
};

const create_attack_functions_window_html = (unit, moved = false) => {
    const window_start_tag = `<div class="attack-functions-window">`;
    let attack_functions_html = '';
    const window_end_tag = `</div>`;

    let choice_attack_function = 'choice-attack-function';
    for (const func of unit.attack_functions) {
        let moved_text = 'つかえる';
        if (!func.moved) {
            moved_text = 'つかえない'
            if (moved) {
                continue;
            };
        };
        attack_functions_html += `
            <div class="attack-function ${choice_attack_function}" data-code="${func.code}">
                <p>${func.name}</p>
                <p>いりょく: ${func.power}</p>
                <p>はんい: ${func.range.join('-')}</p>
                <p>ほせい: ${func.critical}%</p>
                <p>いどうご: ${moved_text}</p>
            </div>
        `;
        choice_attack_function = '';
    };

    return window_start_tag + attack_functions_html + window_end_tag;
};

$(function () {

    get_square_dom = (row, col) => {
        return $(`.square[data-row=${row}][data-col=${col}]`);
    };

    get_unit_dom = (row, col) => {
        // return get_square_dom(row, col).find('.unit');
        return get_square_dom(row, col).children();
    };

    remove_unit_dom = (row, col) => {
        return get_square_dom(row, col).children().remove();
    };

    set_unit_dom = (unit_object, row, col) => {
        return get_square_dom(row, col).html(
            create_unit_html(unit_object));
    };

    // 行動選択ウィンドウ周り
    get_choice_action_dom = () => {
        return $('.choice-action');
    };

    get_action_window_dom = () => {
        return $('.action-window');
    };

    get_choice_manage_dom = () => {
        return $('.choice-manage');
    };

    get_attack_functions_window_dom = () => {
        return $('.attack-functions-window');
    };

    add_action_window_dom = (focus_square_dom) => {
        $('.map-set-container').append(action_window_html());
        if (map_over_all.length / 2 >= map_gamepad_focus[0]) {
            $('.action-window').css('top', `0px`);
        } else {
            console.log(focus_square_dom.offset().top, focus_square_dom.height());
            $('.action-window').css('bottom', `${$(window).height() - focus_square_dom.offset().top - focus_square_dom.height()}px`);
        };
        $('.action-window')
            .css('left', `${focus_square_dom.width() + focus_square_dom.offset().left}px`)
            .removeClass('d-none');
    };

    add_manage_window_dom = (focus_square_dom) => {
        focus_square_dom.append(manage_window_html());
    };

    add_moved_action_window_dom = (focus_square_dom) => {
        focus_square_dom.append(moved_action_window_html());
    };

    remove_action_window_dom = () => {
        $('.action-window').remove();
    };

    remove_manage_window_dom = () => {
        $('.manage-window').remove();
    };

    remove_manage_window_dom = () => {
        $('.manage-window').remove();
    };

    remove_attack_functions_window_dom = () => {
        $('.attack-functions-window').remove();
    };

    add_class_actiond_unit = (row, col) => {
        get_unit_dom(row, col)
            .addClass('actiond-unit');
    };

    remove_class_actiond_unit = () => {
        $('.actiond-unit')
            .removeClass('actiond-unit');
    };

    minus_action_count = (row, col) => {
        const unit = get_unit(row, col);
        unit.action = Math.max(unit.action - 1, 0);
        if (0 >= unit.action) {
            add_class_actiond_unit(row, col);
        };
    };

    select_action_menu = (direction) => {
        choice_action_index = $('.choice-action').index('.action-menu');
        $('.choice-action').removeClass('choice-action');
        const choice_action_dom = $('.action-menu')
            .eq(choice_action_index + direction)
            .addClass('choice-action');
        // eqの仕様対策
        if (!choice_action_dom.length) {
            $('.action-menu')
                .eq(0)
                .addClass('choice-action');
        };
    };

    select_attack_function = (direction) => {
        choice_func_index =
            $('.choice-attack-function').index('.attack-function');
        $('.choice-attack-function').removeClass('choice-attack-function');
        const choice_func_dom = $('.attack-function')
            .eq(choice_func_index + direction)
            .addClass('choice-attack-function');
        // eqの仕様対策
        if (!choice_func_dom.length) {
            $('.attack-function')
                .eq(0)
                .addClass('choice-attack-function');
        };
    };

    window_focus_change = (remove_class) => {
        $(`.${remove_class}`).removeClass(remove_class);
    };

    change_move_mode = (row, col) => {
        const move_range = get_unit(row, col).move;
        $('.square').filter((index, element) => {
            if ($(element).find('.unit').length) {
                return false;
            };
            distance = Math.abs(parseInt(element.dataset.row) - row)
                + Math.abs(parseInt(element.dataset.col) - col);
            if (move_range >= distance) {
                return true;
            };
            return false;
        }).addClass('movable');
        get_action_window_dom().addClass('d-none');
    };

    cancel_move_mode = () => {
        $('.movable').removeClass('movable');
        get_action_window_dom().removeClass('d-none');
    };

    //　ユニット移動関数
    move_unit = async (before_position, after_position) => {
        // ユニット情報取得＆DOM取得　
        unit_object = get_unit(...before_position);
        unit_dom = get_unit_dom(...before_position);

        // 元々ユニットがいたマスからユニットを削除する。
        // ユニット移動アニメーション実行、同期処理
        delete_unit(...before_position);
        remove_action_window_dom();
        await unit_move_animate(
            unit_dom, get_square_dom(...after_position));
        unit_dom.remove();

        // ユニットをセットする。
        set_unit_dom(
            set_unit(unit_object, ...after_position), ...after_position);
    };

    cancel_moved_action_mode = (choice_unit_position, before_unit_position) => {
        // ユニット情報取得＆DOM取得　
        unit_object = get_unit(...choice_unit_position);
        unit_dom = get_unit_dom(...choice_unit_position);
        // 元々ユニットがいたマスからユニットを削除する。
        delete_unit(...choice_unit_position);
        remove_action_window_dom();
        unit_dom.remove();
        // ユニットをセットする。
        set_unit_dom(
            set_unit(unit_object, ...before_unit_position), ...before_unit_position);
    };

    change_select_attack_functions_mode = (row, col, moved = false) => {
        square = get_square_dom(row, col);
        unit = get_unit(row, col);
        square.append($(create_attack_functions_window_html(unit, moved)));
        window_focus_change(
            remove_class = 'choice-action');
    };

    cancel_select_attack_functions_mode = () => {
        $('.attack-functions-window').remove();
        $('.attack').addClass('choice-action');
        $('.moved_attack').addClass('choice-action');
    };

    change_target_select_mode = (row, col) => {
        const unit = get_unit(row, col);
        const func_code = $('.choice-attack-function').attr('data-code');

        let attack_func = get_attack_function(unit, func_code);

        let attack_range_min = attack_func.range[0];
        let attack_range_max = attack_range_min;
        if (attack_func.range.length >= 2) {
            attack_range_max = attack_func.range[1];
        };

        $('.square').filter((index, element) => {
            const distance =
                Math.abs(parseInt(element.dataset.row) - row) +
                Math.abs(parseInt(element.dataset.col) - col);

            if (!distance) {
                return false;
            };

            if (attack_range_max >= distance && distance >= attack_range_min) {
                const unit_img_dom = $(element).find('.unit');
                if (unit_img_dom.length) {
                    const squere_unit = get_unit(
                        element.dataset.row, element.dataset.col);
                    if (unit.has_unit == squere_unit.has_unit) {
                        return false;
                    };
                    $(element).addClass('attack-target');
                };
                return true;
            };
            return false;
        }).addClass('attackable');
        get_action_window_dom().addClass('d-none');
        get_attack_functions_window_dom().addClass('d-none');
        attack_function = attack_func;
    };

    cancel_target_select_mode = () => {
        $('.attackable').removeClass('attackable');
        $('.attack-target').removeClass('attack-target');
        get_action_window_dom().removeClass('d-none');
        get_attack_functions_window_dom().removeClass('d-none');
    };

    end_attack_process = () => {
        $('.attackable').removeClass('attackable');
        $('.attack-target').removeClass('attack-target');
        remove_action_window_dom();
        remove_attack_functions_window_dom();
    };

    draw_unit_status = () => {
        $('.units_status').html('');
        for (unit of get_all_unit()) {
            $(`.${unit.has_unit}-units`).append(
                `
                    <img class="unit-preview ${unit.has_unit}-unit-preview" src="static/image/${unit.code}.png">
                    <p>${unit.name}</p>
                    <p>${unit.hp} / ${unit.max_hp}</p>
                `
            );
        };
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
            $(this)
                .css('background-image', `url("static/image/${square_type}.png")`)
                .css('background-size', 'auto');
            if ($(this).data('row') == '5' && $(this).data('col') == '5') {
                $(this).attr('data-map-focus', 'true');
            };
        });
    };
    draw_map();
    draw_unit_status();
});