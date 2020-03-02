Admin = true;

//Esta funcion llama al modal de Habilitar
function hablilitar(btn) {
    var validacionPermiso = userModelState("Cargos/hablilitar");
    if (validacionPermiso.status == true) {
        var tr = $(btn).closest('tr');
        var row = tabla.row(tr);
        var id = row.data().ID;
        $("#txtIdRestore").val(id);
        $('#ModalHabilitar').modal('show');
    }
}
//Esta funcion llama al modal de desactivar
function inactivar(btn) {
        var validacionPermiso = userModelState("Cargos/delete");
        if (validacionPermiso.status == true) {
            var tr = $(btn).closest('tr');
            var row = tabla.row(tr);
            var id = row.data().ID;
            $("#txtId").val(id);
            CierraPopups();
            $('#ModalInactivar').modal('show');
            $("#ModalInactivar").find("#car_RazonInactivo").val("");
            $("#ModalInactivar").find("#car_RazonInactivo").focus();
        }
}
$("#btnCerrar").click(function () {
    $('#ModalInactivar').modal('hide');
});
//Cambiar el controlador para ejecutar el UDP de restaurar
$("#btnActivar").click(function () {
    var Id = $("#txtIdRestore").val();
    _ajax(JSON.stringify({ id: Id }), // <<<<<<===================================
        '/Cargos/hablilitar/',
        'POST',
        function (obj) {
            if (obj != "-1" && obj != "-2" && obj != "-3") {
                MsgSuccess("¡Éxito!", "El registro se activó de forma exitosa.");
                llenarTabla(-1);
            }

            else {
                MsgError("Error", "No se activó el registro, contacte al administrador.");
            }
        });
    CierraPopups();
});