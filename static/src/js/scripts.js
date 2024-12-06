$(document).ready(function () {
    $('.btn-link-atlas').on('click', function () {
        $(this).toggleClass('active'); // Adiciona ou remove a classe 'active'

        // Altera o texto com base na presença da classe 'active'
        if ($(this).hasClass('active')) {
            $(this).text('Fechar Atlas');
        } else {
            $(this).text('Abrir Atlas');
        }
    });
});

$(document).ready(function () {
    $('.btn-realizar').on('click', function (e) {
        e.preventDefault(); // Evita o comportamento padrão

        const $btnLeft = $(this).find('.btn-left');
        const $button = $(this);
        const $listWin = $('.list-win');
        const $items = $listWin.find('p');

        // Bloqueia o botão e inicia o carregamento
        $button.addClass('loading').prop('disabled', true);

        let width = 0; // Largura inicial
        const interval = setInterval(function () {
            width += 1; // Incrementa 1% a cada iteração
            $btnLeft.css('width', `${width}%`); // Atualiza a largura

            // Inicia a aparição dos itens da lista (após 1 minuto)
            if (width === 50) {
                $items.each(function (index) {
                    setTimeout(() => {
                        $(this).css({
                            opacity: 1,
                            transform: 'translateY(0)',
                        });
                    }, index * 500); // Anima cada item com intervalo de 500ms
                });
            }

            if (width >= 100) {
                clearInterval(interval); // Para o incremento ao chegar em 100%
                $button.removeClass('loading').prop('disabled', false); // Habilita novamente
                $listWin.addClass('scrolling'); // Inicia a rolagem contínua
            }
        }, 1200); // Tempo para cada incremento de 1% (120 segundos / 100 = 1200ms)
    });
});
