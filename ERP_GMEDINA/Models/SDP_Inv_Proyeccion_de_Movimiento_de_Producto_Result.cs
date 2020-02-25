
namespace ERP_GMEDINA.Models
{
    using System;
    
    public partial class SDP_Inv_Proyeccion_de_Movimiento_de_Producto_Result
    {
        public string Prod_Codigo { get; set; }
        public string suc_Direccion { get; set; }
        public int Código_Bodega { get; set; }
        public string Nombre_de_la_Bodega { get; set; }
        public Nullable<int> Responsable { get; set; }
        public string Télefono { get; set; }
        public string Codigo_Barras_Producto { get; set; }
        public string Nombre_Producto { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Unidad_Medida { get; set; }
        public string Talla { get; set; }
        public decimal Cantidad_Inventario { get; set; }
        public decimal Promedio_Vent__Diaria { get; set; }
        public Nullable<decimal> Proyección_Días { get; set; }
        public string Creado_por_ { get; set; }
        public System.DateTime Creado_el_ { get; set; }
    }
}
