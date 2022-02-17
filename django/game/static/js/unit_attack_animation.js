$(function () {
    attack_animate = [];
    render_defense_unit_hp = (damage) => {
        defense_unit_hp_dom = $('.defense-unit-hit-point');
        const before_defense_unit_hp = defense_unit_hp_dom.text();
        const after_defense_unit_hp = Math.max(before_defense_unit_hp - damage, 0);
        defense_unit_hp_dom.html(after_defense_unit_hp);
    };
    attack_animate.body_blow = (damage, is_critical, is_hit) => {
        return (async () => {
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
                    }, 200)
                    .animate({
                        marginTop: '14em',
                        marginLeft: '5em'
                    }, 700).promise();
            };
            $('.attack-unit-image')
                .animate({
                    rotate: '0deg'
                }, 300);
            $('.defense-unit-image')
                .animate({
                    marginTop: '12em',
                    marginLeft: '10em'
                }, 3000);
            await $('.attack-unit-image').animate({
                marginLeft: '80em'
            }, 2000).promise();
            return new Promise(function (resolve, reject) {
                resolve();
            });
        })();
    };

    create_animate_img = (func_name, class_name, attr) => {
        const material = `
            <img src="/static/image/${func_name}.png"class="${class_name}">
        `;
        return material;
    };

    attack_animate.fin_funnel = (damage, is_critical, is_hit) => {
        atk = $('.attack-unit-image');
        def = $('.defense-unit-image');
        return (async () => {
            await atk
                .css('z-index', '10')
                .animate({
                    rotate: '10deg',
                    marginLeft: '75em'
                }, 1500).promise();
            def.css('z-index', '2');
            $('.attack-animation-content').append(
                create_animate_img('fin_funnel', 'fin_funnel_1 d-none'));
            $('.attack-animation-content').append(
                create_animate_img('fin_funnel', 'fin_funnel_2 d-none'));
            $('.attack-animation-content').append(
                create_animate_img('fin_funnel', 'fin_funnel_3 d-none'));
            $('.attack-animation-content').append(
                create_animate_img('funnel_eff', 'funnel_eff d-none'));
            $('.attack-animation-content').append(
                create_animate_img('hit', 'funnel_hit d-none'));
            let funnels = $('[class^="fin_funnel_"]');
            funnels
                .css('position', 'absolute')
                .css('width', '10em')
                .css('z-index', '5')
                .css('rotate', '30deg');
            const funnel_1 = $('.fin_funnel_1');
            const funnel_2 = $('.fin_funnel_2');
            const funnel_3 = $('.fin_funnel_3');
            const funnel_hit = $('.funnel_hit');
            funnel_hit
                .css('position', 'absolute')
                .css('width', '10em')
                .css('z-index', '3')
                .css('top',
                    (def.offset().top + (def.height() / 3)))
                .css('left',
                    (def.offset().left + (def.width() / 3)));

            let atk_off = atk.offset();
            let def_off = atk.offset();
            const start_funnel_x = atk.width() / 2 + atk_off.left;
            const start_funnel_y = atk.height() / 3 + atk_off.top;
            funnels
                .css('top', start_funnel_y)
                .css('left', start_funnel_x)
                .removeClass('d-none');

            // 斜め上まっすぐ
            move_1 = (__funnel) => {
                const after_left_position = def_off.left + $(__funnel).width() / 2;
                $(__funnel)
                    .animate({
                        marginLeft: `+=3rem`,
                    }, 800)
                    .animate({
                        marginLeft: `-${after_left_position}`,
                    }, 800)
                    .animate({
                        rotate: '-135deg',
                    }, 300)
                    .animate({
                        marginTop: '-=1rem',
                    }, 15)
                    .animate({
                        marginTop: '+=1rem',
                    }, 15)
                    .promise()
                    .then(() => {
                        funnel_hit
                            .css('opacity', '0')
                            .removeClass('d-none')
                            .animate({
                                opacity: '1',
                            }, 50)
                            .animate({
                                marginLeft: '+=1rem',
                            }, 70)
                            .animate({
                                marginLeft: '-=1rem',
                            }, 70)
                            .animate({
                                marginLeft: '+=1rem',
                            }, 70)
                            .animate({
                                marginLeft: '-=1rem',
                            }, 70)
                            .animate({
                                opacity: '0',
                            }, 50);
                        def
                            .animate({
                                opacity: '0.5',
                                marginLeft: '-=1rem',
                            }, 50)
                            .animate({
                                opacity: '1',
                                marginLeft: '+=1rem',
                            }, 50)
                            .animate({
                                opacity: '0.5',
                                marginLeft: '-=1rem',
                            }, 50)
                            .animate({
                                opacity: '1',
                                marginLeft: '+=1rem',
                            }, 50)
                            .animate({
                                opacity: '0.5',
                                marginLeft: '-=1rem',
                            }, 50)
                            .animate({
                                opacity: '1',
                                marginLeft: '+=1rem',
                            }, 50)
                            .promise()
                            .then(() => {
                                $(__funnel).animate({
                                    marginLeft: '-100rem',
                                }, 1000);
                            });
                        render_defense_unit_hp(Math.ceil(damage / 3));
                    });
            };
            // 正面スタート
            move_2 = (__funnel) => {
                const after_left_position = def_off.left - def.width() / 2;
                $(__funnel)
                    .animate({
                        marginTop: '0',
                    }, 200)
                    .animate({
                        marginLeft: `-=${after_left_position}`,
                    }, 800)
                    .animate({
                        marginTop: '+=1rem',
                    }, 15)
                    .animate({
                        marginTop: '-=1rem',
                    }, 15)
                    .promise()
                    .then(() => {
                        funnel_hit
                            .css('opacity', '0')
                            .removeClass('d-none')
                            .animate({
                                opacity: '1',
                            }, 30)
                            .animate({
                                marginLeft: '+=1rem',
                            }, 50)
                            .animate({
                                marginLeft: '-=1rem',
                            }, 50)
                            .animate({
                                marginLeft: '+=1rem',
                            }, 50)
                            .animate({
                                marginLeft: '-=1rem',
                            }, 50)
                            .animate({
                                opacity: '0',
                            }, 30);
                        def
                            .animate({
                                opacity: '0.5',
                                marginLeft: '-=1rem',
                            }, 50)
                            .animate({
                                opacity: '1',
                                marginLeft: '+=1rem',
                            }, 50)
                            .animate({
                                opacity: '0.5',
                                marginLeft: '-=1rem',
                            }, 50)
                            .animate({
                                opacity: '1',
                                marginLeft: '+=1rem',
                            }, 50)
                            .animate({
                                opacity: '0.5',
                                marginLeft: '-=1rem',
                            }, 50)
                            .animate({
                                opacity: '1',
                                marginLeft: '+=1rem',
                            }, 50)
                            .promise()
                            .then(() => {
                                $(__funnel).animate({
                                    marginLeft: '-100rem',
                                }, 1000);
                            });
                        render_defense_unit_hp(Math.ceil(damage / 3));
                    });
            };
            // 下
            move_3 = async (__funnel) => {
                const after_left_position = def_off.left - def.width();
                await $(__funnel)
                    .animate({
                        marginTop: `${$(__funnel).height() / 1.5}`,
                    }, 500)
                    .animate({
                        marginLeft: `-${after_left_position / 2}`,
                    }, 500)
                    .animate({
                        marginLeft: `+=2rem`,
                    }, 600)
                    .animate({
                        marginLeft: `-${after_left_position}`,
                    }, 600)
                    .animate({
                        rotate: '20deg',
                    }, 300)
                    .animate({
                        marginTop: '-=1rem',
                    }, 15)
                    .animate({
                        marginTop: '+=1rem',
                    }, 15)
                    .promise()
                    .then(() => {
                        funnel_hit
                            .css('opacity', '0')
                            .removeClass('d-none')
                            .animate({
                                opacity: '1',
                            }, 50)
                            .animate({
                                marginLeft: '+=1rem',
                            }, 70)
                            .animate({
                                marginLeft: '-=1rem',
                            }, 70)
                            .animate({
                                marginLeft: '+=1rem',
                            }, 70)
                            .animate({
                                marginLeft: '-=1rem',
                            }, 70)
                            .animate({
                                opacity: '0',
                            }, 50);
                        def
                            .animate({
                                opacity: '0.5',
                                marginLeft: '-=1rem',
                            }, 50)
                            .animate({
                                opacity: '1',
                                marginLeft: '+=1rem',
                            }, 50)
                            .animate({
                                opacity: '0.5',
                                marginLeft: '-=1rem',
                            }, 50)
                            .animate({
                                opacity: '1',
                                marginLeft: '+=1rem',
                            }, 50)
                            .animate({
                                opacity: '0.5',
                                marginLeft: '-=1rem',
                            }, 50)
                            .animate({
                                opacity: '1',
                                marginLeft: '+=1rem',
                            }, 50);
                        return new Promise(async (resolve, reject) => {
                            await render_defense_unit_hp(Math.ceil(damage / 3));
                            resolve();
                        });
                    });
                return new Promise(async (resolve, reject) => {
                    await $(__funnel).animate({
                        marginTop: '-40rem',
                        marginLeft: '-180rem',
                    }, 1000).promise();
                    resolve();
                });
            };

            let slide_num = 0;
            for (_funnel of funnels) {
                const height = $(_funnel).height();
                await $(_funnel)
                    .animate({
                        marginTop: - (atk.height() / 1.5) + slide_num,
                        marginLeft: (atk.width() / 2) + slide_num
                    }, 300)
                    .promise();
                slide_num += $(_funnel).height() / 2;
                $(_funnel)
                    .css('z-index', '15')
                    .animate({
                        rotate: '0deg',
                    }, 200);
            };
            move_1(funnel_1);
            move_2(funnel_2);
            await move_3(funnel_3);

            return new Promise(async (resolve, reject) => {
                resolve();
            });
        })();
    };
});