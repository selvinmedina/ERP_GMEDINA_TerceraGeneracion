
namespace ERP_GMEDINA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class UDV_Inv_Consultar_Existencias_Productos
    {
        public string suc_Descripcion { get; set; }
        public string bod_Nombre { get; set; }
        public string prod_Descripcion { get; set; }
        public string prod_Marca { get; set; }
        public decimal bodd_CantidadExistente { get; set; }
        public decimal bodd_CantidadMinima { get; set; }
        public int bod_Id { get; set; }
        public int bodd_Id { get; set; }
        public string prod_Codigo { get; set; }
    }
}
