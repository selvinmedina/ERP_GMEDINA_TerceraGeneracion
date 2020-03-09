
namespace ERP_GMEDINA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbTareasCargos
    {
        public int tacar_Id { get; set; }
        public int tacar_car_id { get; set; }
        public int tacar_tar_id { get; set; }
        public int tacar_UsuarioCrea { get; set; }
        public int tacar_UsuarioModifica { get; set; }
        public System.DateTime tacar_FechaCrea { get; set; }
        public System.DateTime tacar_FechaModifica { get; set; }
    
        public virtual tbUsuario tbUsuario { get; set; }
        public virtual tbUsuario tbUsuario1 { get; set; }
        public virtual tbCargos tbCargos { get; set; }
        public virtual tbTareas tbTareas { get; set; }
    }
}
