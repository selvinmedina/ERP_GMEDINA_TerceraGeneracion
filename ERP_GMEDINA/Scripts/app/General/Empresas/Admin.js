Admin = true;
//Esta funcion llama al modal de Habilitar
function hablilitar(btn) {
    var validacionPermiso = userModelState("Empresas/hablilitar");
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
    var validacionPermiso = userModelState("Empresas/Delete");
    if (validacionPermiso.status == true) {
        var tr = $(btn).closest('tr');
        var row = tabla.row(tr);
        var id = row.data().ID;
        $("#txtIdDelete").val(id);
        CierraPopups();
        $('#ModalInactivar').modal('show');
        $("#ModalInactivar").find("#empr_RazonInactivo").val("");
        $("#ModalInactivar").find("#empr_RazonInactivo").focus();

    }
}
//Cambiar el controlador para ejecutar el UDP de restaurar
$("#btnActivar").click(function () {
 var Id = $("#ModalHabilitar").data("id");
 //$("#txtIdRestore").val();
 _ajax(JSON.stringify({ id: Id }), // <<<<<<===================================
     '/Empresas/hablilitar/',
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