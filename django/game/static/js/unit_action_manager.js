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