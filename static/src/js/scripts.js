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
