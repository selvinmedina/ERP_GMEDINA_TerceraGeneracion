
namespace ERP_GMEDINA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class UDV_Inv_Inventario_Historico_Por_Fechas
    {
        public int BODEGA_DETALLE_ID { get; set; }
        public int BODEGA_ID { get; set; }
        public string NOMBRE_BODEGA { get; set; }
        public string ENCARGADO { get; set; }
        public string TELEFONO { get; set; }
        public string CODIGO_PRODUCTO { get; set; }
        public string CODIGO_BARRAS { get; set; }
        public string PRODUCTO { get; set; }
        public string CATEGORIA { get; set; }
        public string MARCA { get; set; }
        public string MODELO { get; set; }
        public string TALLA { get; set; }
        public string UNIDAD_DE_MEDIDA { get; set; }
        public decimal CANTIDAD_EXISTENTE_EN_BODEGA { get; set; }
        public Nullable<decimal> CANTIDAD_EXISTENTE_ANTES_DE_ENTRADA { get; set; }
        public int ENTRADA_DETALLE_ID { get; set; }
        public int ENTRADA_ID { get; set; }
        public byte Estado_entrada { get; set; }
        public Nullable<System.DateTime> ent_FechaModifica { get; set; }
        public Nullable<decimal> CANTIDAD_EXISTENTE_ANTES_DE_SALIDA { get; set; }
        public int SALIDA_DETALLE_ID { get; set; }
        public int SALIDA_ID { get; set; }
        public byte Estado_Salida { get; set; }
        public Nullable<System.DateTime> sal_FechaModifica { get; set; }
    }
}
