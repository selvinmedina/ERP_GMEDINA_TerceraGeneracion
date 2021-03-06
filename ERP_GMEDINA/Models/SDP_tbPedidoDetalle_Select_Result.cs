
namespace ERP_GMEDINA.Models
{
    using System;
    
    public partial class SDP_tbPedidoDetalle_Select_Result
    {
        public int pedd_Id { get; set; }
        public int ped_Id { get; set; }
        public string prod_Codigo { get; set; }
        public decimal pedd_Cantidad { get; set; }
        public decimal pedd_CantidadFacturada { get; set; }
        public int pedd_UsuarioCrea { get; set; }
        public System.DateTime pedd_FechaCrea { get; set; }
        public Nullable<int> pedd_UsuarioModifica { get; set; }
        public Nullable<System.DateTime> pedd_FechaModifica { get; set; }
    }
}
