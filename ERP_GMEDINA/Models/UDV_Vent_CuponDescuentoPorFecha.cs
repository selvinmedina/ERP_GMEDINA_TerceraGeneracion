
namespace ERP_GMEDINA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class UDV_Vent_CuponDescuentoPorFecha
    {
        public int cdto_ID { get; set; }
        public string clte_Identificacion { get; set; }
        public string clte_Nombres { get; set; }
        public string suc_Descripcion { get; set; }
        public System.DateTime cdto_FechaEmision { get; set; }
        public System.DateTime cdto_FechaVencimiento { get; set; }
        public Nullable<decimal> cdto_PorcentajeDescuento { get; set; }
        public Nullable<decimal> cdto_MontoDescuento { get; set; }
        public decimal cdto_CantidadCompraMinima { get; set; }
        public bool cdto_Redimido { get; set; }
        public Nullable<bool> cdto_Anulado { get; set; }
    }
}
