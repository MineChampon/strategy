$(function () {
    unit_move_animate = (unit_dom, after_move_square_dom) => {
        const before_offset = unit_dom.offset();
        const after_offset = after_move_square_dom.offset();
        return unit_dom
            .animate({
                'marginTop': `${after_offset.top - before_offset.top}px`,
            })
            .animate({
                'marginLeft': `${after_offset.left - before_offset.left}px`,
            }).promise();
    };
});