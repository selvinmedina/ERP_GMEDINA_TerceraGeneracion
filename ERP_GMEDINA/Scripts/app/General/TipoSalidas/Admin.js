Admin = true;
//Esta funcion llama al modal de Habilitar
function hablilitar(btn) {
    var validacionPermiso = userModelState("TipoSalidas/hablilitar");
    if (validacionPermiso.status == true) {
        var tr = $(btn).closest('tr');
        var row = tabla.row(tr);
        var id = row.data().ID;
        //$("#txtIdRestore").val(id);
        $("#ModalHabilitar").data("id", id);
        $('#ModalHabilitar').modal('show');
    }
}

function inactivar(btn) {
    var validacionPermiso = userModelState("TipoSalidas/Delete");
    if (validacionPermiso.status == true) {
        var tr = $(btn).closest('tr');
        var row = tabla.row(tr);
        var id = row.data().ID;
        $("#txtIdDelete").val(id);
        CierraPopups();
        $('#ModalInactivar').modal('show');
        $("#ModalInactivar").find("#tsal_RazonInactivo").val("");
        $("#ModalInactivar").find("#tsal_RazonInactivo").focus();
    }
}

//Cambiar el controlador para ejecutar el UDP de restaurar
$("#btnActivar").click(function () {
    var validacionPermiso = userModelState("TipoSalidas/hablilitar");
    if (validacionPermiso.status == true) {
        var Id = $("#ModalHabilitar").data("id");
        //$("#txtIdRestore").val();
        _ajax(JSON.stringify({ id: Id }), // <<<<<<===================================
            '/TipoSalidas/hablilitar/',
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
    }
});

//cambia el controlador para ejecutar el udp de eliminar
$("#InActivar").click(function () {
    var Id = $("#txtIdDelete").val();
    _ajax(JSON.stringify({ id: Id }), // <<<<<<===================================
        '/TipoSalidas/Delete',
    'POST',
    function (obj) {
        if (obj != "-1" && obj != "-2" && obj != "-3") {
            CierraPopups();
            MsgSuccess("¡Éxito!", "El registro se inactivó de forma exitosa.");
            LimpiarControles(["tsal_Descripcion", "tsal_RazonInactivo"]);
            llenarTabla();
        } else {
            MsgError("Error", "No se inactivó el registro, contacte al administrador.");
        }
    });


});


