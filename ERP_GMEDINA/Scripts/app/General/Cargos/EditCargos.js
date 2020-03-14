$(document).ready(function () {
   
    $.ajax({
        url: "/Cargos/getTareasDisponibles",
        method: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ carid: $('#car_id').val() }),
    })
    .done(function (data) {
        if (data.length < 1) {
        }
        else {
            $.each(data, function (i, item) {

                newTr = '';
                newTr += '<tr data-id="' + item.tar_Id + '">'
                newTr += '<td><input name="id02" style="background-color:#1ab394" type="checkbox" id="chk' + item.tar_Id + '" /></td>'
                newTr += '<td id="objpantalla' + item.tar_Id + '">' + item.tar_Id + '</td>'
                newTr += '</tr>'
                $('#NoAsignadosEdit tbody').append(newTr)
            })
            $('#NoAsignadosEdit').DataTable({
                "searching": true,
                //"scrollY": "300px",
                //"scrollCollapse": true,
                "paging": false,
                "info": false,
                "oLanguage": {
                    "oPaginate": {
                        "sNext": "Siguiente",
                        "sPrevious": "Anterior",
                    },
                    "sEmptyTable": "No hay registros",
                    "sInfoEmpty": "Mostrando 0 de 0 Entradas",
                    "sSearch": "Buscar",
                    "sLengthMenu": "Mostrar _MENU_ registros por página",
                    "sInfo": "Mostrando _START_ a _END_ Entradas",
                    "sZeroRecords": "No se encontraron resultados",
                    "sInfoFiltered": "(Filtrado de _MAX_ total entradas)",

                },

            });
        }
    })
    $.ajax({
        url: "/Rol/getTareasAsignadas",
        method: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ rolId: $('#car_id').val() }),
    })
    .done(function (data) {
        if (data.length < 1) {
            $('#AsignadosEdit').DataTable({
                "searching": true,
                //"scrollY": "300px",
                //"scrollCollapse": true,
                "paging": false,
                "info": false,
                "oLanguage": {
                    "oPaginate": {
                        "sNext": "Siguiente",
                        "sPrevious": "Anterior",
                    },
                    "sEmptyTable": "No hay registros",
                    "sInfoEmpty": "Mostrando 0 de 0 Entradas",
                    "sSearch": "Buscar",
                    "sLengthMenu": "Mostrar _MENU_ registros por página",
                    "sInfo": "Mostrando _START_ a _END_ Entradas",
                    "sZeroRecords": "No se encontraron resultados",
                    "sInfoFiltered": "(Filtrado de _MAX_ total entradas)",

                },

            });
            $('#AsignadosEdit> tbody > tr').each(function () {
                $(this).remove();
            })
        }
        else {
            $.each(data, function (i, item) {

                newTr = '';
                newTr += '<tr data-id="' + item.tar_Id + '">'
                newTr += '<td><input name="id02" style="background-color:#1ab394" type="checkbox" id="chk' + item.tar_Id + '" /></td>'
                newTr += '<td id="objpantalla' + item.tar_Id + '">' + item.tar_Id + '</td>'
                newTr += '</tr>'
                $('#AsignadosEdit tbody').append(newTr)
            })
            $('#AsignadosEdit').DataTable({
                "searching": true,
                //"scrollY": "300px",
                //"scrollCollapse": true,
                "paging": false,
                "info": false,
                "oLanguage": {
                    "oPaginate": {
                        "sNext": "Siguiente",
                        "sPrevious": "Anterior",
                    },
                    "sEmptyTable": "No hay registros",
                    "sInfoEmpty": "Mostrando 0 de 0 Entradas",
                    "sSearch": "Buscar",
                    "sLengthMenu": "Mostrar _MENU_ registros por página",
                    "sInfo": "Mostrando _START_ a _END_ Entradas",
                    "sZeroRecords": "No se encontraron resultados",
                    "sInfoFiltered": "(Filtrado de _MAX_ total entradas)",

                },

            });
        }
    })
});
$('#Add').click(function () {
    var idRol = $('#tar_id').val()
    var TareaAcceso = []
    $('#NoAsignadosEdit> tbody > tr').each(function () {
        idItem = $(this).data('id');
        var objpantalla;
        if ($('#chk' + idItem).is(':checked')) {
            active = $(this)
            var Asignados = $('#AsignadosEdit').length
            $('#NoAsignadosEdit tbody').append(active)
            $('#chk' + idItem).prop('checked', false);
            $(this).remove();
            $('#AsignadosEdit tbody').append(active)

            var item = {
                tar_Id: idItem,
            }
            TareaAcceso.push(item)


        }
    })
    //$.ajax({
    //    url: "/Rol/AgregarObjeto",
    //    method: "POST",
    //    dataType: 'json',
    //    contentType: "application/json; charset=utf-8",
    //    data: JSON.stringify({ idRol: idRol, RolAcceso: RolAcceso }),
    //    success: function (json) {
    //    },
    //    error: function () {
    //        $('#validationDescripcionRol').after('<ul id="ErrorValidacionGeneral" class="validation-summary-errors text-danger">No se pudo añadir la pantalla, contacte con el administrador</ul>');
    //    }
    //})

                .done(function (data) {
                    if (data == '') {
                        var TableLegth = $("#NoAsignadosEdit tr").length;
                    }
                    else {
                    }
                });
})

$('#Remove').click(function () {
    var idRol = $('#rol_Id').val()
    var TareaAcceso = []
    $('#AsignadosEdit> tbody > tr').each(function () {
        idItem = $(this).data('id');
        var objtarea;

        if ($('#chk' + idItem).is(':checked')) {
            active = $(this)
            $('#chk' + idItem).prop('checked', false);
            $(this).remove();
            $('#NoAsignadosEdit tbody').append(active)
            var item = {
                obj_Id: idItem,
            }
            TareaAcceso.push(item)
        }
    })
    //$.ajax({
    //    url: "/Rol/QuitarObjeto",
    //    method: "POST",
    //    dataType: 'json',
    //    contentType: "application/json; charset=utf-8",
    //    data: JSON.stringify({ idRol: idRol, RolAcceso: RolAcceso }),
    //})
                .done(function (data) {
                    if (data == '') {

                    }
                    else {
                    }
                })
    var TableLeght = $("#NoAsignadosEdit tr").length;



})