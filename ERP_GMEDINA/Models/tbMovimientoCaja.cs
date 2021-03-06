
namespace ERP_GMEDINA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbMovimientoCaja
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbMovimientoCaja()
        {
            this.tbDenominacionArqueo = new HashSet<tbDenominacionArqueo>();
            this.tbPagosArqueo = new HashSet<tbPagosArqueo>();
            this.tbSolicitudEfectivo = new HashSet<tbSolicitudEfectivo>();
        }
    
        public int mocja_Id { get; set; }
        public short cja_Id { get; set; }
        public Nullable<System.DateTime> mocja_FechaApertura { get; set; }
        public int mocja_UsuarioApertura { get; set; }
        public int usu_Id { get; set; }
        public Nullable<System.DateTime> mocja_FechaArqueo { get; set; }
        public int mocja_UsuarioArquea { get; set; }
        public Nullable<System.DateTime> mocja_FechaAceptacion { get; set; }
        public int mocja_UsuarioAceptacion { get; set; }
        public int mocja_UsuarioCrea { get; set; }
        public System.DateTime mocja_FechaCrea { get; set; }
        public Nullable<int> mocja_UsuarioModifica { get; set; }
        public Nullable<System.DateTime> mocja_FechaModifica { get; set; }
    
        public virtual tbUsuario tbUsuario { get; set; }
        public virtual tbUsuario tbUsuario1 { get; set; }
        public virtual tbUsuario tbUsuario2 { get; set; }
        public virtual tbUsuario tbUsuario3 { get; set; }
        public virtual tbUsuario tbUsuario4 { get; set; }
        public virtual tbUsuario tbUsuario5 { get; set; }
        public virtual tbCaja tbCaja { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbDenominacionArqueo> tbDenominacionArqueo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbPagosArqueo> tbPagosArqueo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbSolicitudEfectivo> tbSolicitudEfectivo { get; set; }
    }
}
