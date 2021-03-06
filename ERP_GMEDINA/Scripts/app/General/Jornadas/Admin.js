﻿Admin = true;
function inactivar(btn) {
    var tr = $(btn).closest('tr');
    var row = tabla.row(tr);
    var id = row.data().ID;
    tableinactivar(id);
    CierraPopups();
    $('#ModalInactivar').modal('show');
    $("#ModalInactivar").find("#jor_RazonInactivo").val("");
    $("#ModalInactivar").find("#jor_RazonInactivo").focus();
}
//Esta funcion llama al modal de Habilitar
function hablilitar(btn) {
    var tr = $(btn).closest('tr');
    var row = tabla.row(tr);
    var id = row.data().ID;
    $("#txtIdRestore").val(id);
    $('#ModalHabilitar').modal('show');
}

//Esta funcion llama al modal de inHabilitar
function inactivar(btn) {
    var validacionPermiso = userModelState("Jornadas/Delete");
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
        '/Jornadas/habilitar/',
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

//-----------------------------------------------------------------------------------------------------------------
function hablilitarhorario(id) {
    $("#txtIdRestoreH").val(id);
    $('#ModalHabilitarHorario').modal('show');
}

//Cambiar el controlador para ejecutar el UDP de restaurar
$("#btnActivarhorario").click(function () {
    var Id = $("#txtIdRestoreH").val();
    _ajax(JSON.stringify({ id: Id }), // <<<<<<===================================
        '/Jornadas/habilitarHorario/',
        'POST',
        function (obj) {
            if (obj != "-1" && obj != "-2" && obj != "-3") {
                llenarTabla(-1);
                MsgSuccess("¡Éxito!", "El registro se activó de forma exitosa.");
            } else {
                MsgError("Error", "No se activó el registro, contacte al administrador.");
            }
        });
    CierraPopups();
});