get_unit = (row, col) => {
    return map_over_all[row][col].unit;
};

delete_unit = (row, col) => {
    delete map_over_all[row][col].unit;
};

set_unit = (unit_object, row, col) => {
    map_over_all[row][col].unit = unit_object;
    return map_over_all[row][col].unit;
};

get_all_unit = () => {
    let all_unit = [];
    for (map_row of map_over_all) {
        for (square of map_row) {
            if (square.unit) {
                all_unit.push(square.unit);
            };
        };
    };
    return all_unit;
};