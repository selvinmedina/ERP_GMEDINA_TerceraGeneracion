
namespace ERP_GMEDINA.Models
{
    using System;
    
    public partial class sdp_rrhh_getTareas_Result
    {
        public int tar_Id { get; set; }
        public string tar_Descripcion { get; set; }
        public Nullable<bool> tar_Estado { get; set; }
        public string tar_RazonInactivo { get; set; }
        public Nullable<int> tar_UsuarioCrea { get; set; }
        public Nullable<System.DateTime> tar_FechaCrea { get; set; }
        public Nullable<int> tar_UsuarioModifica { get; set; }
        public Nullable<System.DateTime> tar_FechaModifica { get; set; }
    }
}
