﻿Admin = true;

//Esta funcion llama al modal de Habilitar
function hablilitar(btn) {
    var validacionPermiso = userModelState("Titulos/habilitar");
    if (validacionPermiso.status == true) {
    var tr = $(btn).closest('tr');
    var row = tabla.row(tr);
    var id = row.data().ID;
    $("#txtIdRestore").val(id);
    $('#ModalHabilitar').modal('show');
    }
}

//Esta funcion llama al modal de inHabilitar
function inactivar(btn) {
    var validacionPermiso = userModelState("Titulos/Delete");
    if (validacionPermiso.status == true) {
        var tr = $(btn).closest('tr');
        var row = tabla.row(tr);
        var id = row.data().ID;
        $("#txtIdDelete").val(id);
        
        CierraPopups();
        $('#ModalInactivar').modal('show');
        $("#ModalInactivar").find("#eqtr_RazonInactivo").val("");
        $("#ModalInactivar").find("#eqtr_RazonInactivo").focus();
    }
}

//Cambiar el controlador para ejecutar el UDP de restaurar
$("#btnActivar").click(function () {
    var Id = $("#txtIdRestore").val();
    _ajax(JSON.stringify({ id: Id }), // <<<<<<===================================
        '/Titulos/hablilitar/',
        'POST',
        function (obj) {
            if (obj != "-1" && obj != "-2" && obj != "-3") {
                MsgSuccess("¡Éxito!", "El registro se activó de forma exitosa.");
                llenarTabla(-1);
            } else {
                MsgError("Error", "No se activó el registro, contacte al administrador.");
            }
        });
    CierraPopups();
});