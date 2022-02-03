const map_over_all = [
    [{}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {},],
];

square_types = [
    'grass',
    // 'ocean',
    'mountain',
];

const random_map_square_type = () => {
    if (Math.floor(Math.random() * 2)) {
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
    const map_square_html = `
        <div class="square"
            data-row="${map_square_info['row']}" 
            data-col="${map_square_info['col']}"
            data-type="${map_square_info['type']}"
        >
            ${map_square_info['row']} : ${map_square_info['col']} 
        </div>
    `;
    return map_square_html
};

$(function () {
    const draw_map = () => {
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