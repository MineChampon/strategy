$(function () {
    attack_animate = [];
    render_defense_unit_hp = (damage) => {
        defense_unit_hp_dom = $('.defense-unit-hit-point');
        const before_defense_unit_hp = defense_unit_hp_dom.text();
        const after_defense_unit_hp = Math.max(before_defense_unit_hp - damage, 0);
        defense_unit_hp_dom.html(after_defense_unit_hp);
    };
    attack_animate.body_blow = (damage, is_critical, is_hit) => {
        (async () => {
            $('.attack-unit-image')
                .animate({
                    rotate: '-2deg'
                }, 150)
            await $('.attack-unit-image')
                .animate({
                    marginLeft: '30em'
                }, 600).promise();
            $('.attack-unit-image')
                .animate({
                    rotate: '-7deg'
                }, 50)
            if (is_hit) {
                await $('.attack-unit-image')
                    .animate({
                        marginLeft: '17em'
                    }, 195).promise();

                render_defense_unit_hp(damage);
                $('.defense-unit-image')
                    .animate({
                        opacity: '0.5'
                    }, 100)
                    .animate({
                        opacity: '1'
                    }, 100)
                    .animate({
                        opacity: '0.5'
                    }, 100)
                    .animate({
                        opacity: '1'
                    }, 100)
                    .animate({
                        opacity: '0.5'
                    }, 100)
                    .animate({
                        opacity: '1'
                    }, 100);
            } else {
                $('.attack-unit-image')
                    .animate({
                        marginLeft: '17em'
                    }, 150);
                await $('.defense-unit-image')
                    .css('z-index', 2)
                    .animate({
                        marginTop: '14em',
                        marginLeft: '5em'
                    }, 200).promise();
                $('.defense-unit-image')
                    .animate({
                        marginTop: '12em',
                        marginLeft: '10em'
                    }, 4000);
            };
            $('.attack-unit-image')
                .animate({
                    rotate: '0deg'
                }, 300);
            await $('.attack-unit-image').animate({
                marginLeft: '80em'
            }, 2000).promise();
        })();
    };
});