
namespace ERP_GMEDINA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbTareas
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbTareas()
        {
            this.tbTareasCargos = new HashSet<tbTareasCargos>();
        }
    
        public int tar_Id { get; set; }
        public string tar_Descripcion { get; set; }
        public Nullable<bool> tar_Estado { get; set; }
        public string tar_RazonInactivo { get; set; }
        public Nullable<int> tar_UsuarioCrea { get; set; }
        public Nullable<System.DateTime> tar_FechaCrea { get; set; }
        public Nullable<int> tar_UsuarioModifica { get; set; }
        public Nullable<System.DateTime> tar_FechaModifica { get; set; }
    
        public virtual tbUsuario tbUsuario { get; set; }
        public virtual tbUsuario tbUsuario1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbTareasCargos> tbTareasCargos { get; set; }
    }
}
