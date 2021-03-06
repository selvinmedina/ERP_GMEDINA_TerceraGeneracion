
namespace ERP_GMEDINA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class UDV_Vent_Busqueda_Factura
    {
        public long fact_Id { get; set; }
        public string fact_Codigo { get; set; }
        public System.DateTime fact_Fecha { get; set; }
        public byte esfac_Id { get; set; }
        public string esfac_Descripcion { get; set; }
        public short cja_Id { get; set; }
        public string cja_Descripcion { get; set; }
        public int suc_Id { get; set; }
        public int clte_Id { get; set; }
        public string pemi_NumeroCAI { get; set; }
        public bool fact_AlCredito { get; set; }
        public int fact_DiasCredito { get; set; }
        public decimal fact_PorcentajeDescuento { get; set; }
        public string fact_Vendedor { get; set; }
        public string clte_Identificacion { get; set; }
        public string clte_Nombres { get; set; }
        public string fact_IdentidadTE { get; set; }
        public string fact_NombresTE { get; set; }
        public Nullable<System.DateTime> fact_FechaNacimientoTE { get; set; }
        public Nullable<int> fact_UsuarioAutoriza { get; set; }
        public Nullable<System.DateTime> fact_FechaAutoriza { get; set; }
        public bool fact_EsAnulada { get; set; }
        public int fact_UsuarioCrea { get; set; }
        public System.DateTime fact_FechaCrea { get; set; }
        public Nullable<int> fact_UsuarioModifica { get; set; }
        public Nullable<System.DateTime> fact_FechaModifica { get; set; }
    }
}
