
namespace ERP_GMEDINA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbPedido
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbPedido()
        {
            this.tbPedidoDetalle = new HashSet<tbPedidoDetalle>();
        }
    
        public int ped_Id { get; set; }
        public byte esped_Id { get; set; }
        public System.DateTime ped_FechaElaboracion { get; set; }
        public System.DateTime ped_FechaEntrega { get; set; }
        public int clte_Id { get; set; }
        public int suc_Id { get; set; }
        public long fact_Id { get; set; }
        public int ped_UsuarioCrea { get; set; }
        public System.DateTime ped_FechaCrea { get; set; }
        public Nullable<int> ped_UsuarioModifica { get; set; }
        public Nullable<System.DateTime> ped_FechaModifica { get; set; }
        public bool ped_EsAnulado { get; set; }
        public string ped_RazonAnulado { get; set; }
    
        public virtual tbUsuario tbUsuario { get; set; }
        public virtual tbUsuario tbUsuario1 { get; set; }
        public virtual tbSucursales tbSucursales { get; set; }
        public virtual tbCliente tbCliente { get; set; }
        public virtual tbEstadoPedido tbEstadoPedido { get; set; }
        public virtual tbFactura tbFactura { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbPedidoDetalle> tbPedidoDetalle { get; set; }
    }
}
