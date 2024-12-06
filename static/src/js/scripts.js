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
        const totalTime = 120; // Tempo total de 120 segundos (2 minutos)
        let remainingTime = totalTime; // Tempo restante inicial

        // Bloqueia o botão e inicia o carregamento
        $button.addClass('loading').prop('disabled', true);

        // Verifica se o botão tem a classe `generation-button`
        let buttonText = $button.hasClass('generation-button')
            ? 'Gerando sinal em:'
            : 'Realizando entrada em:';

        // Atualiza o texto inicial do botão com tempo formatado
        $button.find('.btn-text').text(`${buttonText} ${formatTime(remainingTime)}`);

        let width = 0; // Largura inicial
        const interval = setInterval(function () {
            width += 1; // Incrementa 1% a cada iteração
            remainingTime--; // Decrementa o tempo restante
            $btnLeft.css('width', `${width}%`); // Atualiza a largura

            // Atualiza o texto com o tempo restante formatado
            $button.find('.btn-text').text(`${buttonText} ${formatTime(remainingTime)}`);

            // Quando atingir 50%, começa a animar os itens da lista
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

            // Quando o progresso atinge 100%
            if (width >= 100) {
                clearInterval(interval); // Para o incremento ao chegar em 100%
                $button.removeClass('loading').prop('disabled', false); // Habilita novamente
                $listWin.addClass('scrolling'); // Inicia a rolagem contínua
                $button.find('.btn-text').text('Realizar Entrada'); // Reseta o texto do botão
            }
        }, totalTime * 10); // Incremento proporcional ao tempo total (120s = 1200ms)
    });

    // Função para formatar o tempo em "X min e Y s"
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60); // Calcula os minutos inteiros
        const remainingSeconds = seconds % 60; // Calcula os segundos restantes
        return minutes > 0
            ? `${minutes} min e ${remainingSeconds}s`
            : `${remainingSeconds}s`; // Se não houver minutos, exibe apenas segundos
    }
});
