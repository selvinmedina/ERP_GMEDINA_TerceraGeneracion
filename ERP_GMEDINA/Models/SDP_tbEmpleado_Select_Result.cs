
namespace ERP_GMEDINA.Models
{
    using System;
    
    public partial class SDP_tbEmpleado_Select_Result
    {
        public int emp_Id { get; set; }
        public int per_Id { get; set; }
        public string per_Nombres { get; set; }
        public string per_Apellidos { get; set; }
        public string per_CorreoElectronico { get; set; }
    }
}
