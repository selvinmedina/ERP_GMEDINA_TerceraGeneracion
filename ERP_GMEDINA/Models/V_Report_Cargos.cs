
namespace ERP_GMEDINA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class V_Report_Cargos
    {
        public int IdCargo { get; set; }
        public string Cargo { get; set; }
        public int IdTarea { get; set; }
        public string Tarea { get; set; }
        public int IdPersona { get; set; }
        public string NombreCompleto { get; set; }
    }
}
