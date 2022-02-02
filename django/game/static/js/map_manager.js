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
            data-col="${map_square_info['col']}">
                座標 => ${map_square_info['row']} : ${map_square_info['col']} 
        </div>
    `;
    return map_square_html
};


const map_over_all = [
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
];


$(function () {
    const draw_map = () => {
        for (let [row_index, map_row] of map_over_all.entries()) {
            let squares_html_list = [];
            for (let [col_index, map_square] of map_row.entries()) {
                map_square['row'] = row_index;
                map_square['col'] = col_index;
                squares_html_list.push(
                    create_map_square_html(map_square));
            };
            $('.map-set-container').append(
                add_row_html(squares_html_list.join('')));
        };
    };

    draw_map();
});