
namespace ERP_GMEDINA.Models
{
    using System;
    
    public partial class SDP_tbEmpleado_Select_Result
    {
        public int emp_Id { get; set; }
        public int per_Id { get; set; }
        public int car_Id { get; set; }
        public int area_Id { get; set; }
        public int depto_Id { get; set; }
        public int jor_Id { get; set; }
        public int cpla_IdPlanilla { get; set; }
        public int fpa_IdFormaPago { get; set; }
        public string emp_CuentaBancaria { get; set; }
        public bool emp_Reingreso { get; set; }
        public System.DateTime emp_Fechaingreso { get; set; }
        public string emp_RazonSalida { get; set; }
        public Nullable<int> emp_CargoAnterior { get; set; }
        public Nullable<System.DateTime> emp_FechaDeSalida { get; set; }
        public bool emp_Estado { get; set; }
        public string emp_RazonInactivo { get; set; }
        public int emp_UsuarioCrea { get; set; }
        public System.DateTime emp_FechaCrea { get; set; }
        public Nullable<int> emp_UsuarioModifica { get; set; }
        public Nullable<System.DateTime> emp_FechaModifica { get; set; }
        public Nullable<bool> emp_Temporal { get; set; }
    }
}
