﻿const btnGuardar = $('#btnCreateRegistroDeduccion')
const btnGuardarEditar = $('#btnUpdateDeduccion2')
const btnGuardarActivar = $('#btnActivarRegistroDeduccion')
cargandoCrearcargandoCrear = $('#cargandoCrear')
cargandoCrear = $('#cargandoCrear')
cargandoActivar = $('#cargandoCrear') //Div que aparecera cuando se le de click en crear

//
//OBTENER SCRIPT DE FORMATEO DE FECHA
//
$.getScript("../Scripts/app/General/SerializeDate.js")
    .done(function (script, textStatus) {

    })
    .fail(function (jqxhr, settings, exception) {
    });

//VARIABLE PARA INACTIVAR
var InactivarID = 0;
var ActivarID = 0;

//FUNCION GENERICA PARA REUTILIZAR AJAX
function _ajax(params, uri, type, callback) {
    $.ajax({
        url: uri,
        type: type,
        data: {
            params
        },
        success: function (data) {
            callback(data);
        }
    });
}


//FUNCION: CARGAR DATA Y REFRESCAR LA TABLA DEL INDEX
function cargarGridDeducciones() {
    var esAdministrador = $("#rol_Usuario").val();
    _ajax(null,
        '/CatalogoDeDeducciones/GetData',
        'GET',
        (data) => {
            if (data.length == 0) {
                //Validar si se genera un error al cargar de nuevo el grid
                iziToast.error({
                    title: 'Error',
                    message: 'No se cargó la información, contacte al administrador',
                });
            } 
            //GUARDAR EN UNA VARIABLE LA DATA OBTENIDA
            var ListaDeducciones = data,
                template = '';

            $('#tblCatalogoDeducciones').DataTable().clear();

            //Recorrer la data y crear el template que se pondrá en el tbody
            for (var i = 0; i < ListaDeducciones.length; i++) {

                //variable para verificar el estado del registro
                var estadoRegistro = ListaDeducciones[i].cde_Activo == false ? 'Inactivo' : 'Activo';

                //variable boton detalles
                var botonDetalles = '<button data-id = "' + ListaDeducciones[i].cde_IdDeducciones + '" style= "margin-right:3px;" type="button" class="btn btn-primary btn-xs"  id="btnDetalleCatalogoDeducciones">Detalles</button>';

                //variable boton editar
                var botonEditar = ListaDeducciones[i].cde_Activo == true ? '<button data-id = "' + ListaDeducciones[i].cde_IdDeducciones + '" type="button" class="btn btn-default btn-xs"  id="btnEditarCatalogoDeducciones">Editar</button> ' : '';

                //variable boton inactivar
                var botonInactivar = ListaDeducciones[i].cde_Activo == true ? '<button data-id = "' + ListaDeducciones[i].cde_IdDeducciones + '" type="button" class="btn btn-danger btn-xs"  id="btnmodalInactivarCatalogoDeducciones">Inactivar</button>' : '';

                //variable donde está el boton activar
                var botonActivar = ListaDeducciones[i].cde_Activo == false ? esAdministrador == "1" ? '<button data-id = "' + ListaDeducciones[i].cde_IdDeducciones + '" type="button" class="btn btn-default btn-xs"  id="btnActivarCatalogoDeducciones">Activar</button>' : '' : '';

                $('#tblCatalogoDeducciones').dataTable().fnAddData([
                    ListaDeducciones[i].cde_IdDeducciones,
                    ListaDeducciones[i].cde_DescripcionDeduccion,
                    ListaDeducciones[i].cde_PorcentajeColaborador,
                    ListaDeducciones[i].cde_PorcentajeEmpresa,
                    ListaDeducciones[i].tde_Descripcion,
                    estadoRegistro,
                    botonDetalles + botonEditar + botonInactivar + botonActivar  
                ]);
            }
        }); 
    FullBody();
}

//VALIDAR CREATE//

//FUNCION: OCULTAR DATA ANNOTATION CON BOTON INFERIOR CERRAR DEL MODAL.
$("#btnCerrarCrear").click(function () {
    //span
    $("#Editar #validareditar3").css("display", "none");
    $("#Editar #validareditar2").css("display", "none");
    $("#Editar #validareditar1").css("display", "none");
    $("#Crear #Validation_descipcionA").css("display", "none");
    $("#Crear #Validation_descipcion3AR").css("display", "none");
    $("#Crear #Validation_descipcion4AR").css("display", "none");
    $("#Crear #Validation_descipcion2A").css("display", "none");

    //Asteriscos
    $("#Editar #AsteriscoPorcentajeEmpresaEdit").removeClass("text-danger");
    $("#Editar #AsteriscoPorcentajeColaboradorEdit").removeClass("text-danger");
    $("#Editar #AsteriscoDescripcionDeduEdit").removeClass("text-danger");
    $("#Crear #AsteriscoDescripcionDedu").removeClass("text-danger");
    $("#Crear #AsteriscoPorcentajeColaborador").removeClass("text-danger");
    $("#Crear #AsteriscoPorcentajeEmpresa").removeClass("text-danger");
    $("#Crear #AsteriscoTipoDedu").removeClass("text-danger");

    //Campos
    $("#Crear #cde_DescripcionDeduccionA").val("");
    $("#Crear #cde_PorcentajeColaboradorA").val("");
    $("#Crear #cde_PorcentajeEmpresaA").val("");
    $("#Crear #tde_IdTipoDedu").val("0");
});


//FUNCION: OCULTAR DATA ANNOTATION CON BOTON SUPERIOR DE CERRAR (BOTON CON X).
$("#IconCerrarCreate").click(function () {
    $("#Crear #Validation_descipcionA").css("display", "none");
    $("#Crear #Validation_descipcion2A").css("display", "none");
    $("#Crear #Validation_descipcion3A").css("display", "none");
    $("#Crear #Validation_descipcion4A").css("display", "none");
    $("#Crear #cde_DescripcionDeduccionA").val("");
    $("#Crear #cde_PorcentajeColaboradorA").val("");
    $("#Crear #cde_PorcentajeEmpresaA").val("");
    $("#Crear #tde_IdTipoDedu").val("0");
    $("#Crear #AsteriscoDescripcionDedu").removeClass("text-danger");
    $("#Crear #AsteriscoPorcentajeColaborador").removeClass("text-danger");
    $("#Crear #AsteriscoPorcentajeEmpresa").removeClass("text-danger");
    $("#Crear #AsteriscoTipoDedu").removeClass("text-danger");
    ocultarCargandoCrear();
});



//FUNCION: PRIMERA FASE DE AGREGAR UN NUEVO REGISTRO, MOSTRAR MODAL DE CREATE
$(document).on("click", "#btnAgregarCatalogoDeducciones", function () {
    var validacionPermiso = userModelState("CatalogoDeDeducciones/Create");

    if (validacionPermiso.status == true) {
        //PEDIR DATA PARA LLENAR EL DROPDOWNLIST DEL MODAL
        $.ajax({
            url: "/CatalogoDeDeducciones/EditGetDDL",
            method: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8"
        })
            //LLENAR EL DROPDONWLIST DEL MODAL CON LA DATA OBTENIDA
            .done(function (data) {
                $("#Crear #tde_IdTipoDedu").empty();
                $("#Crear #tde_IdTipoDedu").append("<option value='0'>Seleccione una opción...</option>");
                $.each(data, function (i, iter) {
                    $("#Crear #tde_IdTipoDedu").append("<option value='" + iter.Id + "'>" + iter.Descripcion + "</option>");
                });
            });
        //MOSTRAR EL MODAL DE AGREGAR
        $("#AgregarCatalogoDeducciones").modal({
            backdrop: 'static',
            keyboard: false
        });
        $("#Crear #tde_IdTipoDedu").val("0");
    }
});

//FUNCION: CREAR EL NUEVO REGISTRO
$('#btnCreateRegistroDeduccion').click(function () {
    // SIEMPRE HACER LAS RESPECTIVAS VALIDACIONES DEL LADO DEL CLIENTE
    let cde_DescripcionDeduccionA = $("#Crear #cde_DescripcionDeduccionA").val();
    let cde_PorcentajeColaboradorA = $("#Crear #cde_PorcentajeColaboradorA").val();
    let cde_PorcentajeEmpresaA = $("#Crear #cde_PorcentajeEmpresaA").val();
    let tde_IdTipoDeduc = $("#Crear #tde_IdTipoDedu").val();
   
    //CONVERTIR EN ARRAY EL MONTO A PARTIR DEL SEPARADOR DE MILLARES
    var indices = $("#Crear #cde_PorcentajeColaboradorA").val().split(",");
    //VARIABLE CONTENEDORA DEL MONTO
    var MontoporcentajecolFormateado = "";
    //ITERAR LOS INDICES DEL ARRAY MONTO
    for (var i = 0; i < indices.length; i++) {
        //SETEAR LA VARIABLE DE MONTO
        MontoporcentajecolFormateado += indices[i];
    }
    //FORMATEAR A DECIMAL
    MontoporcentajecolFormateado = parseFloat(MontoporcentajecolFormateado);


    //CONVERTIR EN ARRAY EL MONTO A PARTIR DEL SEPARADOR DE MILLARES
    var indices = $("#Crear #cde_PorcentajeEmpresaA").val().split(",");
    //VARIABLE CONTENEDORA DEL MONTO
    var MontoporcentajeEmpFormateado = "";
    //ITERAR LOS INDICES DEL ARRAY MONTO
    for (var i = 0; i < indices.length; i++) {
        //SETEAR LA VARIABLE DE MONTO
        MontoporcentajeEmpFormateado += indices[i];
    }
    //FORMATEAR A DECIMAL
    MontoporcentajeEmpFormateado = parseFloat(MontoporcentajeEmpFormateado);

    if (ValidarCrear(cde_DescripcionDeduccionA, tde_IdTipoDeduc, MontoporcentajecolFormateado, MontoporcentajeEmpFormateado))
    {
        //SERIALIZAR EL FORMULARIO DEL MODAL (ESTÁ EN LA VISTA PARCIAL)
        var data = $("#frmCatalogoDeduccionesCreate").serializeArray();

        $.ajax({
            url: "/CatalogoDeDeducciones/Create",
            method: "POST",
            data: data
        }).done(function (data) {
            if (data != "error") {

                $("#Crear #cde_DescripcionDeduccionA").val("");
                $("#Crear #cde_PorcentajeColaboradorA").val("");
                $("#Crear #cde_PorcentajeEmpresaA").val("");
                $("#Crear #tde_IdTipoDedu").val("0");

                //ocultar el modal
                $("#AgregarCatalogoDeducciones").modal('hide');
               
                // Mensaje de exito cuando un registro se ha guardado bien
                iziToast.success({
                    title: 'Exito',
                    message: '¡El registro se agregó de forma exitosa!',
                });
              
            } else {
                iziToast.error({
                    title: 'Error',
                    message: 'No se guardó el registro, contacte al administrador',
                });
            } 
        });
    }
    else {
        ValidarCrear(cde_DescripcionDeduccionA, tde_IdTipoDeduc, MontoporcentajecolFormateado, MontoporcentajeEmpFormateado);
    }
    window.location = "http://localhost:51144/CatalogoDeDeducciones";
}); 



// EVITAR POSTBACK DE FORMULARIOS
$("#frmCatalogoDeduccionesCreate").submit(function (e) {
    return false;
   
});

//VALIDAR EDIT//

//FUNCION: OCULTAR DATA ANNOTATION CON BOTON INFERIOR CERRAR DEL MODAL.
$("#btnCerrarEditar").click(function () {
    //span
    $("#Editar #validareditar3").css("display", "none");
    $("#Editar #validareditar2").css("display", "none");
    $("#Editar #validareditar1").css("display", "none");
    $("#Crear #Validation_descipcionA").css("display", "none");
    $("#Crear #Validation_descipcion3AR").css("display", "none");
    $("#Crear #Validation_descipcion4AR").css("display", "none");
    $("#Crear #Validation_descipcion2A").css("display", "none");

    //Asteriscos
    $("#Editar #AsteriscoPorcentajeEmpresaEdit").removeClass("text-danger");
    $("#Editar #AsteriscoPorcentajeColaboradorEdit").removeClass("text-danger");
    $("#Editar #AsteriscoDescripcionDeduEdit").removeClass("text-danger");
    $("#Crear #AsteriscoDescripcionDedu").removeClass("text-danger");
    $("#Crear #AsteriscoPorcentajeColaborador").removeClass("text-danger");
    $("#Crear #AsteriscoPorcentajeEmpresa").removeClass("text-danger");
    $("#Crear #AsteriscoTipoDedu").removeClass("text-danger");
});

$('#btnCerrarInhabilitar, #confirmacionEditarNo').click(function () {
    $("#InactivarCatalogoDeducciones").modal('hide');
});

//FUNCION: OCULTAR DATA ANNOTATION CON BOTON SUPERIOR DE CERRAR (BOTON CON X).
$("#IconCerrarEdit").click(function () {
    $("#Validation_descipcion").css("display", "none");
    $("#Validation_descipcion2").css("display", "none");
    $("#Validation_descipcion3").css("display", "none");
    $("#Editar #AsteriscoDescripcionDeduEdit").removeClass("text-danger");
    $("#Editar #AsteriscoPorcentajeColaboradorEdit").removeClass("text-danger");
    $("#Editar #AsteriscoPorcentajeEmpresaEdit").removeClass("text-danger");
    $("#Editar #AsteriscoTipoDeduEdit").removeClass("text-danger")
});
//FUNCION: CERRAR EL MODAL DE CONFIRMACION Y VOLVER AL MODAL DE EDITAR
$("#btnEditarConfirmacion").click(function () {
    $("#EditarCatalogoDeduccionesConfirmacion").modal('hide');
    $("#EditarCatalogoDeducciones").modal();
});


//FUNCION: PRIMERA FASE DE EDICION DE REGISTROS, MOSTRAR MODAL CON LA INFORMACIÓN DEL REGISTRO SELECCIONADO
$(document).on("click", "#tblCatalogoDeducciones tbody tr td #btnEditarCatalogoDeducciones", function () {
    var validacionPermiso = userModelState("CatalogoDeDeducciones/Edit");

    if (validacionPermiso.status == true) {
        var ID = $(this).data('id');
        InactivarID = ID;
        $.ajax({
            url: "/CatalogoDeDeducciones/Edit/" + ID,
            method: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                ID: ID
            })
        }).done(function (data) {
            //SI SE OBTIENE DATA, LLENAR LOS CAMPOS DEL MODAL CON ELLA
            if (data) {
                var PorcentajeColaboradorFormato = (data.cde_PorcentajeColaborador % 1 == 0) ? data.cde_PorcentajeColaborador + ".00" : data.cde_PorcentajeColaborador;
                var PorcentajeEmpresaFormato = (data.cde_PorcentajeEmpresa % 1 == 0) ? data.cde_PorcentajeEmpresa + ".00" : data.cde_PorcentajeEmpresa;
                $("#Editar #cde_IdDeducciones").val(data.cde_IdDeducciones);
                $("#Editar #cde_DescripcionDeduccion").val(data.cde_DescripcionDeduccion);
                $("#Editar #cde_PorcentajeColaborador").val(PorcentajeColaboradorFormato);
                $("#Editar #cde_PorcentajeEmpresa").val(PorcentajeEmpresaFormato);
                //GUARDAR EL ID DEL DROPDOWNLIST (QUE ESTA EN EL REGISTRO SELECCIONADO) QUE NECESITAREMOS PONER SELECTED EN EL DDL DEL MODAL DE EDICION
                var SelectedId = data.tde_IdTipoDedu;
                //CARGAR INFORMACIÓN DEL DROPDOWNLIST PARA EL MODAL
                $.ajax({
                    url: "/CatalogoDeDeducciones/EditGetDDL",
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        ID
                    })
                })
                    .done(function (data) {
                        //LIMPIAR EL DROPDOWNLIST ANTES DE VOLVER A LLENARLO
                        $("#Editar #tde_IdTipoDedu").empty();
                        //LLENAR EL DROPDOWNLIST
                        $.each(data, function (i, iter) {
                            $("#Editar #tde_IdTipoDedu").append("<option" + (iter.Id == SelectedId ? " selected" : " ") + " value='" + iter.Id + "'>" + iter.Descripcion + "</option>");
                        });
                    });
                $("#EditarCatalogoDeducciones").modal({
                    backdrop: 'static',
                    keyboard: false
                });
                $('#btnUpdateDeduccion2').attr('disabled', false);

            } else {
                //Mensaje de error si no hay data
                iziToast.error({
                    title: 'Error',
                    message: 'No se cargó la información, contacte al administrador',
                });
            }
        });
    }
});


$('#btnUpdateDeduccion').click(function () {
    var cde_DescripcionDeduccionE2 = $("#Editar #cde_DescripcionDeduccion").val();
    var cde_PorcentajeColaboradorE2 = $("#Editar #cde_PorcentajeColaborador").val();
    var cde_PorcentajeEmpresaE2 = $("#Editar #cde_PorcentajeEmpresa").val();

    if (ValidarEditar(cde_DescripcionDeduccionE2, cde_PorcentajeColaboradorE2, cde_PorcentajeEmpresaE2)) {
        $("#EditarCatalogoDeducciones").modal('hide');
        $("#EditarCatalogoDeduccionesConfirmacion").modal({
            backdrop: 'static',
            keyboard: false
        });
        $('#btnUpdateDeduccion2').attr('disabled', false);
    } else {
        ValidarEditar(cde_DescripcionDeduccionE2, cde_PorcentajeColaboradorE2, cde_PorcentajeEmpresaE2);
    }
});



//EJECUTAR EDICIÓN DEL REGISTRO EN EL MODAL
$("#btnUpdateDeduccion2").click(function () {
    $('#btnUpdateDeduccion2').attr('disabled', true);

    //SERIALIZAR EL FORMULARIO (QUE ESTÁ EN LA VISTA PARCIAL) DEL MODAL, SE PARSEA A FORMATO JSON
    var data = $("#frmCatalogoDeducciones").serializeArray();
    if (data[7].value == "") {
        data[7].value = "0.00";
    }

    //SE ENVIA EL JSON AL SERVIDOR PARA EJECUTAR LA EDICIÓN
    $.ajax({
        url: "/CatalogoDeDeducciones/Edit",
        method: "POST",
        data: data
    })
        .done(function (data) {
            if (data != "error") {
                // REFRESCAR UNICAMENTE LA TABLA
                cargarGridDeducciones();

                //Ocultar el modal
                $("#EditarCatalogoDeducciones").modal('hide');
                $("#EditarCatalogoDeduccionesConfirmacion").modal('hide');
                //Mensaje de exito de la edicion
                iziToast.success({
                    title: 'Exito',
                    message: '¡El registro se editó de forma exitosa!',
                });
            } else {
                iziToast.error({
                    title: 'Error',
                    message: 'No se editó el registro, contacte al administrador',
                });
                $("#EditarCatalogoDeduccionesConfirmacion").modal('hide');
            }
        });
});


// EVITAR POSTBACK DE FORMULARIOS
$("#frmCatalogoDeducciones").submit(function (e) {
    return false;
});


//FUNCTION: MOSTRAR DETALLE
$(document).on("click", "#tblCatalogoDeducciones tbody tr td #btnDetalleCatalogoDeducciones", function () {
    var validacionPermiso = userModelState("CatalogoDeDeducciones/Details");

    if (validacionPermiso.status == true) {
        var ID = $(this).data('id');
        $.ajax({
            url: "/CatalogoDeDeducciones/Details/" + ID,
            method: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                ID: ID
            })
        })
            .done(function (data) {
                //SI SE OBTIENE DATA, LLENAR LOS CAMPOS DEL MODAL CON ELLA
                if (data) {
                    var FechaCrea = FechaFormato(data[0].cde_FechaCrea);
                    var FechaModifica = FechaFormato(data[0].cde_FechaModifica);
                    $("#Detalles #cde_IdDeducciones").html(data[0].cde_IdDeducciones);
                    $("#Detalles #cde_DescripcionDeduccion").html(data[0].cde_DescripcionDeduccion);
                    $("#Detalles #tde_IdTipoDedu").html(data[0].tde_IdTipoDedu);
                    $("#Detalles #cde_PorcentajeColaborador").html(data[0].cde_PorcentajeColaborador);
                    $("#Detalles #cde_PorcentajeEmpresa").html(data[0].cde_PorcentajeEmpresa);
                    $("#Detalles #cde_UsuarioCrea").html(data[0].cde_UsuarioCrea);
                    $("#Detalles #tbUsuario_usu_NombreUsuario").html(data[0].UsuCrea);
                    $("#Detalles #cde_FechaCrea").html(FechaCrea);
                    data[0].UsuModifica == null ? $("#Detalles #tbUsuario1_usu_NombreUsuario").html('Sin modificaciones') : $("#Detalles #tbUsuario1_usu_NombreUsuario").html(data[0].UsuModifica);
                    $("#Detalles #cde_UsuarioModifica").val(data[0].cde_UsuarioModifica);
                    $("#Detalles #cde_FechaModifica").html(FechaModifica);
                    //GUARDAR EL ID DEL DROPDOWNLIST (QUE ESTA EN EL REGISTRO SELECCIONADO) QUE NECESITAREMOS PONER SELECTED EN EL DDL DEL MODAL DE EDICION
                    var SelectedId = data[0].tde_IdTipoDedu;
                    //CARGAR INFORMACIÓN DEL DROPDOWNLIST PARA EL MODAL
                    $.ajax({
                        url: "/CatalogoDeDeducciones/EditGetDDL",
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            ID
                        })
                    })
                        .done(function (data) {

                            //LLENAR EL DROPDOWNLIST
                            $.each(data, function (i, iter) {
                                if (iter.Id == SelectedId) {
                                    $("#Detalles #tde_IdTipoDedu").html(iter.Descripcion);
                                }
                            });
                        });

                    $("#DetallesCatalogoDeducciones").modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                } else {
                    //Mensaje de error si no hay data
                    iziToast.error({
                        title: 'Error',
                        message: 'No se cargó la información, contacte al administrador',
                    });
                }
            });
    }
});

//MOSTRAR MODAL INACTIVAR
$(document).on("click", "#btnmodalInactivarCatalogoDeducciones", function () {
    var validacionPermiso = userModelState("CatalogoDeDeducciones/Inactivar");

    if (validacionPermiso.status == true) {
        //MOSTRAR EL MODAL DE INACTIVAR
        InactivarID = $(this).data('id');
        $("#InactivarCatalogoDeducciones").modal({
            backdrop: 'static',
            keyboard: false
        });

        //Ocultar el modal editar
        $("#EditarCatalogoDeducciones").modal('hide');
    }
    
});

$("#btnCerrarInhabilitar").click(function () {
    $("#InactivarCatalogoDeducciones").modal('hide');
});

//EJECUTAR INACTIVACION DEL REGISTRO EN EL MODAL
$("#btnInactivarRegistroDeduccion").click(function () {
    document.getElementById('btnInactivarRegistroDeduccion').disabled = true;
    var data = $("#frmCatalogoDeduccionesInactivar").serializeArray();
    //SE ENVIA EL JSON AL SERVIDOR PARA EJECUTAR LA EDICIÓN
    $.ajax({
        url: "/CatalogoDeDeducciones/Inactivar/" + InactivarID,
        method: "POST",
        data: data
    }).done(function (data) {
        if (data == "error") {
            $("#InactivarCatalogoDeducciones").modal('hide');
            $("#EditarCatalogoDeducciones").modal('hide');

            document.getElementById('btnInactivarRegistroDeduccion').disabled = false;

            //Cuando traiga un error del backend al guardar la edicion
            iziToast.error({
                title: 'Error',
                message: 'No se inactivó el registro, contacte al administrador',
            });
        } else {
            // REFRESCAR UNICAMENTE LA TABLA
            cargarGridDeducciones();
            //UNA VEZ REFRESCADA LA TABLA, SE OCULTA EL MODAL
            $("#InactivarCatalogoDeducciones").modal('hide');
            $("#EditarCatalogoDeducciones").modal('hide');
            // OcultarValidacionesEditar();
            document.getElementById('btnInactivarRegistroDeduccion').disabled = false;
            //Mensaje de exito de la edicion
            iziToast.success({
                title: 'Éxito',
                message: '¡El registro se inactivó de forma exitosa!',
            });
        }
    });
});


//MOSTRAR MODAL ACTIVAR
$(document).on("click", "#btnActivarCatalogoDeducciones", function () {
    var validacionPermiso = userModelState("CatalogoDeDeducciones/Activar");

    if (validacionPermiso.status == true) {
        //MOSTRAR EL MODAL DE INACTIVAR
        $("#ActivarCatalogoDeducciones").modal({
            backdrop: 'static',
            keyboard: false
        });
    }
});


//EJECUTAR ACTIVACION DEL REGISTRO EN EL MODAL
$("#btnCerrarInhabilitar").click(function () {
    //Mostrar modal editar nuevamente
   
    //$("html, body").css("overflow", "hidden");
    //$("html, body").css("overflow", "scroll");
    $("#InactivarCatalogoDeducciones").modal('hide');
});

$(document).on("click", "#tblCatalogoDeducciones tbody tr td #btnActivarCatalogoDeducciones", function () {
    var ID = $(this).data('id');
    ActivarID = ID;

});


//EJECUTAR ACTIVACION DEL REGISTRO EN EL MODAL
$("#btnActivarRegistroDeduccion").click(function () {
    document.getElementById('btnActivarRegistroDeduccion').disabled = true;
    var data = $("#frmCatalogoDeduccionesActivar").serializeArray();
    //SE ENVIA EL JSON AL SERVIDOR PARA EJECUTAR LA EDICIÓN
    $.ajax({
        url: "/CatalogoDeDeducciones/Activar/" + ActivarID,
        method: "POST",
        data: data
    }).done(function (data) {
        if (data == "error") {
            $("#ActivarCatalogoDeducciones").modal('hide');
            document.getElementById('btnActivarRegistroDeduccion').disabled = false;
            //Cuando traiga un error del backend al guardar la edicion
            iziToast.error({
                title: 'Error',
                message: 'No se activó el registro, contacte al administrador',
            });
        } else {
            // REFRESCAR UNICAMENTE LA TABLA
            cargarGridDeducciones();
            //UNA VEZ REFRESCADA LA TABLA, SE OCULTA EL MODAL
            $("#ActivarCatalogoDeducciones").modal('hide');
            document.getElementById('btnActivarRegistroDeduccion').disabled = false;
            //Mensaje de exito de la edicion
            iziToast.success({
                title: 'Éxito',
                message: '¡El registro se activó de forma exitosa!',
            });
        }
    });
});


//Region Keyup
function ValidarCrear(Descripcion, tde_IdTipoDedu, PorcentajeColaborador, PorcentajeEmpresa) {
    hayAlgo = true;

    //CONVERTIR EN ARRAY EL MONTO A PARTIR DEL SEPARADOR DE MILLARES
    var indices = $("#Crear #cde_PorcentajeColaboradorA").val().split(",");
    //VARIABLE CONTENEDORA DEL MONTO
    var MontoporcentajecolFormateado = "";
    //ITERAR LOS INDICES DEL ARRAY MONTO
    for (var i = 0; i < indices.length; i++) {
        //SETEAR LA VARIABLE DE MONTO
        MontoporcentajecolFormateado += indices[i];
    }
    //FORMATEAR A DECIMAL
    MontoporcentajecolFormateado = parseFloat(MontoporcentajecolFormateado);


    //CONVERTIR EN ARRAY EL MONTO A PARTIR DEL SEPARADOR DE MILLARES
    var indices = $("#Crear #cde_PorcentajeEmpresaA").val().split(",");
    //VARIABLE CONTENEDORA DEL MONTO
    var MontoporcentajeEmpFormateado = "";
    //ITERAR LOS INDICES DEL ARRAY MONTO
    for (var i = 0; i < indices.length; i++) {
        //SETEAR LA VARIABLE DE MONTO
        MontoporcentajeEmpFormateado += indices[i];
    }
    //FORMATEAR A DECIMAL
    MontoporcentajeEmpFormateado = parseFloat(MontoporcentajeEmpFormateado);

    if (Descripcion != '-1') {

        var LengthString = Descripcion.length;
        if (LengthString > 1) {
            var FirstChar = LengthString - 2;
            var LastChar = Descripcion.substring(FirstChar, LengthString);
        }
        if (LastChar == "  ") {
            $("#Crear #cde_DescripcionDeduccionA").val(Descripcion.substring(0, FirstChar + 1));
        }
        if (Descripcion == "" || Descripcion == " " || Descripcion == "  " || Descripcion == null || Descripcion == undefined) {
            if (Descripcion == ' ')
                $("#Crear #cde_DescripcionDeduccionA").val("");
            hayAlgo = false;
            $("#Crear #Validation_descipcionA").css("display", "block");
            $("#Crear #AsteriscoDescripcionDedu").addClass("text-danger");
        } else {
            $("#Crear #Validation_descipcionA").css("display", "none");
            $("#Crear #AsteriscoDescripcionDedu").removeClass("text-danger");
        }
    }

    if (tde_IdTipoDedu != '-1') {
        if (tde_IdTipoDedu == "" || tde_IdTipoDedu == 0 || tde_IdTipoDedu == "0") {
            hayAlgo = false;
            $("#Crear #Validation_descipcion2A").css("display", "block");
            $("#Crear #AsteriscoTipoDedu").addClass("text-danger");

        } else {
            $("#Crear #Validation_descipcion2A").css("display", "none");
            $("#Crear #AsteriscoTipoDedu").removeClass("text-danger");
        }
    }

    if (PorcentajeColaborador != '-1') {
        if (MontoporcentajecolFormateado == "" || MontoporcentajecolFormateado == null || MontoporcentajecolFormateado == undefined || isNaN(MontoporcentajecolFormateado)) {
            $("#Crear #Validation_descipcion3AR").css("display", "block");
            $("#Crear #AsteriscoPorcentajeColaborador").addClass("text-danger");
            hayAlgo = false;
        } else {
            $("#Crear #Validation_descipcion3AR").css("display", "none");
            $("#Crear #AsteriscoPorcentajeColaborador").removeClass("text-danger");
            if (MontoporcentajecolFormateado < 0 || MontoporcentajecolFormateado < 0.00) {
                $("#Crear #Validation_descipcion3AR").html('Campo Porcentaje Colaborador no puede ser menor a cero.');
                $("#Crear #Validation_descipcion3AR").css("display", "block");
                $("#Crear #AsteriscoPorcentajeColaborador").addClass("text-danger");
                hayAlgo = false;
            } else {
                $("#Crear #Validation_descipcion3AR").html('');
                $("#Crear #Validation_descipcion3AR").css("display", "none");
                $("#Crear #AsteriscoPorcentajeColaborador").removeClass("text-danger");
            }
        }
    }

    if (PorcentajeEmpresa != '-1') {
        if (MontoporcentajeEmpFormateado == "" || MontoporcentajeEmpFormateado == null || MontoporcentajeEmpFormateado == undefined || isNaN(MontoporcentajeEmpFormateado)) {
            $("#Crear #Validation_descipcion4AR").html('Campo Porcentaje Empresa requerido.');
            $("#Crear #Validation_descipcion4AR").css("display", "block");
            $("#Crear #AsteriscoPorcentajeEmpresa").addClass("text-danger");
            hayAlgo = false;
        } else {
            $("#Crear #Validation_descipcion4AR").html('');
            $("#Crear #Validation_descipcion4AR").css("display", "none");
            $("#Crear #AsteriscoPorcentajeEmpresa").removeClass("text-danger");
            if (MontoporcentajeEmpFormateado < 0 || MontoporcentajeEmpFormateado < 0.00) {
                $("#Crear #Validation_descipcion4AR").html('Campo Porcentaje Empresa no puede ser menor a cero.');
                $("#Crear #Validation_descipcion4AR").css("display", "block");
                $("#Crear #AsteriscoPorcentajeEmpresa").addClass("text-danger");
                hayAlgo = false;
            }
            else {
                $("#Crear #Validation_descipcion4AR").html('');
                $("#Crear #Validation_descipcion4AR").css("display", "none");
                $("#Crear #AsteriscoPorcentajeEmpresa").removeClass("text-danger");
            }
        }
    }

    return hayAlgo;
}



function ValidarEditar(Descripcion, PorcentajeColaborador, PorcentajeEmpresa) {
    hayAlgo = true;

    //CONVERTIR EN ARRAY EL MONTO A PARTIR DEL SEPARADOR DE MILLARES
    var indices = $("#Editar #cde_PorcentajeColaborador").val().split(",");
    //VARIABLE CONTENEDORA DEL MONTO
    var MontoporcentajecolFormateado = "";
    //ITERAR LOS INDICES DEL ARRAY MONTO
    for (var i = 0; i < indices.length; i++) {
        //SETEAR LA VARIABLE DE MONTO
        MontoporcentajecolFormateado += indices[i];
    }
    //FORMATEAR A DECIMAL
    MontoporcentajecolFormateado = parseFloat(MontoporcentajecolFormateado);


    //CONVERTIR EN ARRAY EL MONTO A PARTIR DEL SEPARADOR DE MILLARES
    var indices = $("#Editar #cde_PorcentajeEmpresa").val().split(",");
    //VARIABLE CONTENEDORA DEL MONTO
    var MontoporcentajeEmpFormateado = "";
    //ITERAR LOS INDICES DEL ARRAY MONTO
    for (var i = 0; i < indices.length; i++) {
        //SETEAR LA VARIABLE DE MONTO
        MontoporcentajeEmpFormateado += indices[i];
    }
    //FORMATEAR A DECIMAL
    MontoporcentajeEmpFormateado = parseFloat(MontoporcentajeEmpFormateado);

    if (Descripcion != '-1') {
        var LengthString = Descripcion.length;
        if (LengthString > 1) {
            var FirstChar = LengthString - 2;
            var LastChar = Descripcion.substring(FirstChar, LengthString);
        }
        if (LastChar == "  ") {
            $("#Editar #cde_DescripcionDeduccion").val(Descripcion.substring(0, FirstChar + 1));
        }
        if (Descripcion == "" || Descripcion == " " || Descripcion == "  " || Descripcion == null || Descripcion == undefined) {
            if (Descripcion == ' ')
                $("#Editar #cde_DescripcionDeduccion").val("");
            hayAlgo = false;
            $("#Editar #validareditar1").css("display", "block");
            $("#Editar #AsteriscoDescripcionDeduEdit").addClass("text-danger");
        } else {
            $("#Editar #validareditar1").css("display", "none");
            $("#Editar #AsteriscoDescripcionDeduEdit").removeClass("text-danger");
        }
    }

    if (PorcentajeColaborador != '-1') {
        if (MontoporcentajecolFormateado == "" || MontoporcentajecolFormateado == null || MontoporcentajecolFormateado == undefined || isNaN(MontoporcentajecolFormateado)) {
            $("#Editar #Validation_descipcion3AR, #Editar #validareditar2").html('Campo Porcentaje Colaborador requerido.');
            $("#Editar #Validation_descipcion3AR, #Editar #validareditar2").css("display", "block");
            $("#Editar #AsteriscoPorcentajeColaborador, #Editar #AsteriscoPorcentajeColaboradorEdit").addClass("text-danger");
            hayAlgo = false;
        } else {
            $("#Editar #validareditar2").html('');
            $("#Editar #validareditar2").css("display", "none");
            $("#Editar #AsteriscoPorcentajeColaboradorEdit").removeClass("text-danger");
            if (MontoporcentajecolFormateado < 0) {
                $("#Editar #validareditar2").html('Campo Porcentaje Colaborador no puede ser menor a cero.');
                $("#Editar #validareditar2").css("display", "block");
                $("#Editar #AsteriscoPorcentajeColaboradorEdit").addClass("text-danger");
                hayAlgo = false;
            } else {
                $("#Editar #validareditar2").html('');
                $("#Editar #validareditar2").css("display", "none");
                $("#Editar #AsteriscoPorcentajeColaboradorEdit").removeClass("text-danger");
            }
        }
    };

    if (PorcentajeEmpresa != '-1') {
        if (MontoporcentajeEmpFormateado == "" || MontoporcentajeEmpFormateado == null) {
            $("#Editar #validareditar3").html('Campo Porcentaje Empresa requerido.');
            $("#Editar #validareditar3").css("display", "block");
            $("#Editar #AsteriscoPorcentajeEmpresaEdit").addClass("text-danger");
            hayAlgo = false;
        } else {
            $("#Editar #validareditar3").html('');
            $("#Editar #validareditar3").css("display", "none");
            $("#Editar #AsteriscoPorcentajeEmpresaEdit").removeClass("text-danger");
            if (MontoporcentajeEmpFormateado < 0) {
                $("#Editar #validareditar3").html('Campo Porcentaje Empresa no puede ser menor a cero.');
                $("#Editar #validareditar3").css("display", "block");
                $("#Editar #AsteriscoPorcentajeEmpresaEdit").addClass("text-danger");
                hayAlgo = false;
            }
            else {
                $("#Editar #validareditar3").html('');
                $("#Editar #validareditar3").css("display", "none");
                $("#Editar #AsteriscoPorcentajeEmpresaEdit").removeClass("text-danger");
            }
        }
    };

    return hayAlgo;
}