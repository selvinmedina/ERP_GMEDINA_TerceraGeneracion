$(document).ready(function () {
    var Debito = $('#bcta_TotalDebito').val();

    var Credito = $('#bcta_TotalCredito').val();

    var SaldoActual = parseFloat(Credito) - parseFloat(Debito);
    $('#SaldoActual').val(SaldoActual.toFixed(2));
    //document.getElementById('SaldoActual').value = SaldoActual.toFixed(2);

});

