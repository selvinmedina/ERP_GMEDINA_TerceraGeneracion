
namespace ERP_GMEDINA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbDocumentoFiscal
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbDocumentoFiscal()
        {
            this.tbPuntoEmisionDetalle = new HashSet<tbPuntoEmisionDetalle>();
        }
    
        public string dfisc_Id { get; set; }
        public string dfisc_Descripcion { get; set; }
        public int dfisc_UsuarioCrea { get; set; }
        public System.DateTime dfisc_FechaCrea { get; set; }
        public Nullable<int> dfisc_UsuarioModifica { get; set; }
        public Nullable<System.DateTime> dfisc_FechaModifica { get; set; }
    
        public virtual tbUsuario tbUsuario { get; set; }
        public virtual tbUsuario tbUsuario1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbPuntoEmisionDetalle> tbPuntoEmisionDetalle { get; set; }
    }
}
