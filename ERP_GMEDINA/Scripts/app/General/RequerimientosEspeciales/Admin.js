﻿Admin = true;

//Esta funcion llama al modal de Habilitar
function hablilitar(btn) {
    var validacionPermiso = userModelState("RequerimientosEspeciales/Habilitar");
    if (validacionPermiso.status == true) {
        var tr = $(btn).closest('tr');
        var row = tabla.row(tr);
        var id = row.data().ID;
        $("#txtIdRestore").val(id);
        $('#ModalHabilitar').modal('show');
    }
}

//Cambiar el controlador para ejecutar el UDP de restaurar
$("#btnActivar").click(function () {
    var Id = $("#txtIdRestore").val();
    _ajax(JSON.stringify({ id: Id }), // <<<<<<===================================
        '/RequerimientosEspeciales/hablilitar/',
        'POST',
        function (obj) {
            if (obj != "-1" && obj != "-2" && obj != "-3") {
                MsgSuccess("¡Éxito!", "El registro se activó  de forma exitosa");
                llenarTabla(-1);
            } else {
                MsgError("Error", "No se activó el registro, contacte al administrador.");
            }
        });
    CierraPopups();
});

function inactivar(btn) {
    var validacionPermiso = userModelState("RequerimientosEspeciales/Delete");
    if (validacionPermiso.status == true) {
        var tr = $(btn).closest('tr');
        var row = tabla.row(tr);
        var id = row.data().ID;
        $("#txtIdDelete").val(id);
        CierraPopups();
        $('#ModalInactivar').modal('show');
        $("#ModalInactivar").find("#resp_RazonInactivo").val("");
        $("#ModalInactivar").find("#resp_RazonInactivo").focus();

    }
}


//$("#InActivar").click(function () {

//    var Id = $("#txtIdDelete").val();
//    data = JSON.stringify({ id: Id });
//    _ajax(data,
//        '/RequerimientosEspeciales/Delete',
//        'POST',
//        function (obj) {
//            if (obj != "-1" && obj != "-2" && obj != "-3") {
//                CierraPopups();
//                MsgSuccess("¡Éxito!", "El registro se inactivó de forma exitosa.");
//                LimpiarControles(["comp_Descripcion"]);
//                llenarTabla();
//            } else {
//                MsgError("Error", "No se inactivó el registro, contacte al administrador.");
//            }
//        });

//});

