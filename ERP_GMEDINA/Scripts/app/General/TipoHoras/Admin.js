Admin = true;

//Esta funcion llama al modal de Habilitar
function hablilitar(btn) {
    var validacionPermiso = userModelState("TipoHoras/hablilitar");
    if (validacionPermiso.status == true) {
        var tr = $(btn).closest('tr');
        var row = tabla.row(tr);
        var id = row.data().ID;
        $("#txtIdRestore").val(id);
        $('#ModalHabilitar').modal('show');
    }
}

function inactivar(btn) {
    var validacionPermiso = userModelState("TipoHoras/hablilitar");
    if (validacionPermiso.status == true) {
        var tr = $(btn).closest('tr');
        var row = tabla.row(tr);
        var id = row.data().ID;
        $("#txtIdDelete").val(id);
        CierraPopups();
        $('#ModalInactivar').modal('show');
        $("#ModalInactivar").find("#habi_RazonInactivo").val("");
        $("#ModalInactivar").find("#habi_RazonInactivo").focus();
    }
}


//Cambiar el controlador para ejecutar el UDP de restaurar
$("#btnActivar").click(function () {
    var Id = $("#txtIdRestore").val();
    _ajax(JSON.stringify({ id: Id }), // <<<<<<===================================
        '/TipoHoras/hablilitar/',
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

//inactivar
$("#InActivar").click(function () {
    var Id = $("#txtIdDelete").val();
    _ajax(JSON.stringify({ id: Id }), // <<<<<<===================================
        '/TipoHoras/Delete',
    'POST',
    function (obj) {
        if (obj != "-1" && obj != "-2" && obj != "-3") {
            CierraPopups();
            MsgSuccess("¡Éxito!", "El registro se inactivó de forma exitosa.");
            LimpiarControles(["tiho_Descripcion", "tiho_Recargo", "tiho_RazonInactivo"]);
            llenarTabla();
        } else {
            MsgError("Error", "No se inactivó el registro, contacte al administrador.");
        }
    });
});