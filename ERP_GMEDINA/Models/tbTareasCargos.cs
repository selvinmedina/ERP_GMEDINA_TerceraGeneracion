
namespace ERP_GMEDINA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbTareasCargos
    {
        public int tacar_Id { get; set; }
        public int car_id { get; set; }
        public int tar_id { get; set; }
        public string tacar_RazonInactivo { get; set; }
        public Nullable<bool> tacar_estado { get; set; }
        public Nullable<int> tacar_UsuarioCrea { get; set; }
        public Nullable<int> tacar_UsuarioModifica { get; set; }
        public Nullable<System.DateTime> tacar_FechaCrea { get; set; }
        public Nullable<System.DateTime> tacar_FechaModifica { get; set; }
    
        public virtual tbUsuario tbUsuario { get; set; }
        public virtual tbUsuario tbUsuario1 { get; set; }
        public virtual tbCargos tbCargos { get; set; }
        public virtual tbTareas tbTareas { get; set; }
    }
}
