$(function () {
    unit_move_animate = (unit_dom, after_move_square_dom) => {
        const before_offset = unit_dom.offset();
        const after_offset = after_move_square_dom.offset();
        return unit_dom
            .animate({
                'marginTop': `+=${after_offset.top - before_offset.top}px`,
            }, { duration: 'fast', }).animate({
                'marginLeft': `+=${after_offset.left - before_offset.left}px`,
            }, { duration: 'fast', }).promise();
    };
    const attack_animation_modal = (
        attack_unit, defense_unit, attack_function,
        before_defense_unit_hp, damage, is_critical, is_hit) => {
        let critical_display_text = '';
        if (is_critical) {
            critical_display_text = 'クリティカル!: ';
        };
        const attack_animation_modal_html = `
            <div class="modal fade" id="modal-attack-animation">
                <div class="modal-dialog modal-attack-dialog">
                    <div class="modal-content h-100">
                        <div class="modal-body attack-animation-body w-100 h-100">
                            <div class="container-fluid animation-container-fluid h-100">
                                <div class="unit-status-container row h-15">
                                    <div class="col-6 defense-unit-container unit-info-container">
                                        <h1 class="unit-hit-point">HP <div class="defense-unit-hit-point">${before_defense_unit_hp}</div> / ${defense_unit.max_hp}</h1>
                                    </div>
                                    <div class="col-6 attack-unit-container unit-info-container">
                                        <h1 class="unit-hit-point">HP ${attack_unit.hp} / ${attack_unit.max_hp}</h1>
                                    </div>
                                </div>
                                <div class="attack-animation-container row h-60">
                                    <div class="col-12 attack-animation-content">
                                        <img class="defense-unit-image d-none"
                                            src="static/image/${defense_unit.code}.png">
                                        <img class="attack-unit-image d-none"
                                            src="static/image/${attack_unit.code}.png">
                                    </div>
                                </div>
                                <div class="row h-25 unit-text-window-container">
                                    <div class="unit-image-container">
                                        <img class="unit-image w-100 h-100"
                                            src="static/image/${attack_unit.code}_map.png">
                                    </div> 
                                    <div class="unit-text-container w-auto h-100">
                                        <div class="unit-name-area">${attack_unit.name}</div>
                                        <div class="unit-text-area">「 デバッグ -> ${attack_function.name} 」</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return attack_animation_modal_html;
    };

    remove_animation_modal = () => {
        $('#modal-attack-animation').modal('hide').remove();
    };

    unit_attack_animate = (
        attack_unit, defense_unit, attack_function,
        before_defense_unit_hp, damage, is_critical, is_hit) => {
        $('.map-container').append(
            attack_animation_modal(
                attack_unit, defense_unit, attack_function,
                before_defense_unit_hp, damage, is_critical, is_hit)
        );
        return (async () => {
            // 入力を受け付けない
            await not_accept_entry();
            $('.defense-unit-image')
                .css('margin-top', '12em')
                .css('margin-left', '10em')
                .removeClass('d-none');
            $('.attack-unit-image')
                .css('margin-top', '12em')
                .css('margin-left', '100em')
                .removeClass('d-none');
            $('#modal-attack-animation').modal('show');
            await $('.attack-unit-image').animate({
                marginLeft: '60em'
            }, 2000).promise();

            await attack_animate[attack_function.code](damage, is_critical, is_hit);
            await new Promise(async (resolve, reject) => {
                setTimeout(resolve, 1000);
            });
            await remove_animation_modal();
            // 入力OK
            await accept_entry();
            return new Promise(async (resolve, reject) => {
                resolve();
            });
        })();
    };
});