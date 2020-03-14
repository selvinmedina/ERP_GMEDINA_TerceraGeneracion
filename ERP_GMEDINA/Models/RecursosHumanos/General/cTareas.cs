using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ERP_GMEDINA.Models
{
      [MetadataType(typeof(cTareas))]
    
    public partial class tbTareas
    {
    }
    public class cTareas
    {
        [Display(Name = "ID")]
        public int tar_Id { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "El campo \"{0}\" es requerido.")]
        [MaxLength(50, ErrorMessage = "Excedió el número máximo de carácteres.")]
        [Display(Name = "Tarea")]
        public string tar_Descripcion { get; set; }

        [Display(Name = "Estado")]
        public bool tar_Estado { get; set; }

        [Display(Name = "Razón Inactivo")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "El campo \"{0}\" es requerido.")]
        [MaxLength(50, ErrorMessage = "Excedió el número máximo de caracteres.")]
        public string tar_RazonInactivo { get; set; }

        [Display(Name = "Usuario Crea")]
        public int tar_UsuarioCrea { get; set; }

        [Display(Name = "Fecha Crea")]
        public System.DateTime tar_FechaCrea { get; set; }

        [Display(Name = "Usuario Modifica")]
        public Nullable<int> tar_UsuarioModifica { get; set; }

        [Display(Name = "Fecha Modifica")]
        public Nullable<System.DateTime> tar_FechaModifica { get; set; }

    }
}