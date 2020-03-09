$(document).ready(function () {
    fill = Admin == undefined ? 0 : -1;
    llenarTabla();
});



var fill = 0



$(document).ready(function () {
    llenarTabla();
});
var id = 0;
//Funciones GET



function tablaEditar(ID) {
    id = ID;
    _ajax(null,
        '/Tareas/Edit/' + ID,
        'GET',
        function (obj) {
            if (obj != "-1" && obj != "-2" && obj != "-3") {
                $("#FormEditar").find("#tar_Descripcion").val(obj.comp_Descripcion);
                $('#ModalEditar').modal('show');
            }
        });
}
function tablaDetalles(ID) {
    id = ID;
    _ajax(null,
        '/Tareas/Edit/' + ID,
        'GET',
        function (obj) {
            if (obj != "-1" && obj != "-2" && obj != "-3") {
                $("#ModalDetalles").find("#tar_Descripcion")["0"].innerText = obj.tar_Descripcion;
                $("#ModalDetalles").find("#tar_FechaCrea")["0"].innerText = FechaFormato(obj.tar_FechaCrea);
                $("#ModalDetalles").find("#tar_FechaModifica")["0"].innerText = FechaFormato(obj.tar_FechaModifica);
                $("#ModalDetalles").find("#tbUsuario_usu_NombreUsuario")["0"].innerText = obj.tbUsuario.usu_NombreUsuario;
                $("#ModalDetalles").find("#tbUsuario1_usu_NombreUsuario")["0"].innerText = obj.tbUsuario1.usu_NombreUsuario;
                //$("#ModalDetalles").find("#btnEditar")["0"].dataset.id = ID;
                $('#ModalDetalles').modal('show');
            }
        });
}
function llenarTabla() {
    _ajax(null,
        '/Tareas/llenarTabla',
        'POST',
        function (Lista) {
            tabla.clear().draw();
            if (validarDT(Lista)) {
                return null;
            }
            $.each(Lista, function (index, value) {
                var Acciones = value.tar_Estado == 1
                  ? null :
                   "<div>" +
                       "<a class='btn btn-primary btn-xs' onclick='CallDetalles(this)' >Detalles</a>" +
                       "<a class='btn btn-default btn-xs ' onclick='hablilitar(this)' >Activar</a>" +
                   "</div>";
                if (value.tar_Estado > fill) {
                    tabla.row.add({
                        ID: value.tar_Id,
                        "Número": value.tar_Id,
                        Descripcion: value.tar_Descripcion,
                        "Descripción": value.tar_Descripcion,
                        Estado: value.tar_Estado ? "Activo" : "Inactivo",
                        Acciones: Acciones
                    }).draw();
                }
            });
        });
}




$("#btnAgregar").click(function () {
    var validacionPermiso = userModelState("Tareas/Create");
    if (validacionPermiso.status == true) {
        var modalnuevo = $('#ModalNuevo');
        modalnuevo.modal('show');
        $(modalnuevo).find("#tar_Descripcion").val("");
        $(modalnuevo).find("#tar_Descripcion").focus();
    }
});
$("#btnEditar").click(function () {
    _ajax(null,
        '/Tareas/Edit/' + id,
        'GET',
        function (obj) {
            if (obj != "-1" && obj != "-2" && obj != "-3") {
                CierraPopups();
                $('#ModalEditar').modal('show');
                $("#ModalEditar").find("#tar_Descripcion").val(obj.comp_Descripcion);
                $("#ModalEditar").find("#tar_Descripcion").focus();
            }
        });
});

//$("#btnInactivar").click(function () {
//    CierraPopups();
//    $('#ModalInactivar').modal('show');
//    $("#ModalInactivar").find("#comp_RazonInactivo").val("");
//    $("#ModalInactivar").find("#comp_RazonInactivo").focus();
//});

//botones POST
$("#btnGuardar").click(function () {
    var data = $("#FormNuevo").serializeArray();
    data = serializar(data);
    if (data != null) {
        data = JSON.stringify({ tbTareas: data });
        _ajax(data,
            '/Tareas/Create',
            'POST',
            function (obj) {
                if (obj != "-1" && obj != "-2" && obj != "-3") {
                    CierraPopups();
                    MsgSuccess("¡Éxito!", "El registro se agregó de forma exitosa.");
                    LimpiarControles(["tar_Descripcion", "tar_RazonInactivo"]);
                    llenarTabla();
                } else {
                    MsgError("Error", "No se agregó el registro, contacte al administrador.");
                }
            });
    } else {
        MsgError("Error", "Por favor llene todas las cajas de texto.");
    }
});
//$("#InActivar").click(function () {
//    var data = $("#FormInactivar").serializeArray();
//    data = serializar(data);
//    if (data != null) {
//        data.comp_Id = $("#txtIdDelete").val();
//        data = JSON.stringify({ tbCompetencias: data });
//        _ajax(data,
//            '/Competencias/Delete',
//            'POST',
//            function (obj) {
//                if (obj != "-1" && obj != "-2" && obj != "-3") {
//                    CierraPopups();
//                    MsgSuccess("¡Éxito!", "El registro se inactivó de forma exitosa.");
//                    LimpiarControles(["comp_Descripcion"]);
//                    llenarTabla();
//                } else {
//                    MsgError("Error", "No se inactivó el registro, contacte al administrador.");
//                }
//            });
//    } else {
//        MsgError("Error", "Por favor llene todas las cajas de texto.");
//    }
//});
$("#btnActualizar").click(function () {
    var data = $("#FormEditar").serializeArray();
    data = serializar(data);
    if (data != null) {
        data.tar_Id = id;
        data = JSON.stringify({ tbTareas: data });
        _ajax(data,
            '/Tareas/Edit',
            'POST',
            function (obj) {
                if (obj != "-1" && obj != "-2" && obj != "-3") {
                    CierraPopups();
                    MsgSuccess("¡Éxito!", "El registro se editó de forma exitosa.");
                    llenarTabla();
                } else {
                    MsgError("Error", "No se editó el registro, contacte al administrador.");
                }
            });
    } else {
        MsgError("Error", "Por favor llene todas las cajas de texto.");
    }
});
