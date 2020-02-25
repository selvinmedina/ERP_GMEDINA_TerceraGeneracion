
namespace ERP_GMEDINA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class UDV_Vent_SolicitudCredito_SolicitudesPorAprobarReporte
    {
        public int clte_Id { get; set; }
        public bool clte_EsPersonaNatural { get; set; }
        public System.DateTime FECHA_SOLICITUD { get; set; }
        public string RTN_CLIENTE { get; set; }
        public string NOMBRE_CLIENTE { get; set; }
        public string TIPO_DE_CLIENTE { get; set; }
        public string SUCURSAL { get; set; }
        public int DÍAS_SOLICITADOS { get; set; }
        public decimal MONTO_SOLICITADO { get; set; }
    }
}
