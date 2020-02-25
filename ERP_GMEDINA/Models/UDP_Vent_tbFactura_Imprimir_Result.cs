
namespace ERP_GMEDINA.Models
{
    using System;
    
    public partial class UDP_Vent_tbFactura_Imprimir_Result
    {
        public string suc_Direccion { get; set; }
        public string mun_Nombre { get; set; }
        public string dep_Nombre { get; set; }
        public short cja_Id { get; set; }
        public string pemi_NumeroCAI { get; set; }
        public string RangoInicial { get; set; }
        public string RangoFinal { get; set; }
        public System.DateTime FechaLimite { get; set; }
        public string suc_Correo { get; set; }
        public long fact_Id { get; set; }
        public string fact_Codigo { get; set; }
        public System.DateTime fact_Fecha { get; set; }
        public string clte_Identificacion { get; set; }
        public string clte_Nombres { get; set; }
        public bool fact_AlCredito { get; set; }
        public string FormaPago { get; set; }
        public string prod_Descripcion { get; set; }
        public decimal factd_PrecioUnitario { get; set; }
        public decimal factd_Cantidad { get; set; }
        public Nullable<decimal> Importe { get; set; }
        public Nullable<decimal> MontoFactura { get; set; }
        public Nullable<decimal> MontoDescuento { get; set; }
        public Nullable<decimal> MontoImpuesto { get; set; }
        public Nullable<decimal> MontoEfectivo { get; set; }
        public Nullable<decimal> TotalCambio { get; set; }
        public Nullable<decimal> TotalEfectivo { get; set; }
        public Nullable<decimal> TotalPagado { get; set; }
        public string IdentidadTE { get; set; }
        public string NombreTE { get; set; }
        public Nullable<System.DateTime> FechaTE { get; set; }
    }
}
