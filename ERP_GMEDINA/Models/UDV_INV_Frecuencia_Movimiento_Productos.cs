
namespace ERP_GMEDINA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class UDV_INV_Frecuencia_Movimiento_Productos
    {
        public int bod_Id { get; set; }
        public string BOD_NOMBRE { get; set; }
        public string RESPONSABLE { get; set; }
        public string bod_Telefono { get; set; }
        public string prod_CodigoBarras { get; set; }
        public string prod_Descripcion { get; set; }
        public string pcat_Nombre { get; set; }
        public string pscat_Descripcion { get; set; }
        public string PROD_MARCA { get; set; }
        public string prod_Modelo { get; set; }
        public string prod_Talla { get; set; }
        public byte tsal_Id { get; set; }
        public decimal sald_Cantidad { get; set; }
        public System.DateTime sal_FechaElaboracion { get; set; }
        public Nullable<decimal> FRECUENCIA { get; set; }
    }
}
