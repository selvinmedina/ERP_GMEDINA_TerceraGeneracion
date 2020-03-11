using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ERP_GMEDINA.Models;
using ERP_GMEDINA.Attribute;

namespace ERP_GMEDINA.Controllers
{
    public class TareasController : Controller
    {
        private ERP_GMEDINAEntities db = null;
        Models.Helpers Function = new Models.Helpers();

        // GET: Competencias
        [SessionManager("Tareas/Index")]
        public ActionResult Index()
        {
            tbTareas tbTareas = new tbTareas { tar_Estado = true };
            return View(tbTareas);
        }
        [HttpPost]
        [SessionManager("Tareas/Index")]
        public JsonResult llenarTabla()
        {
            using (db = new ERP_GMEDINAEntities())
                try
                {
                    var tbTareas = db.tbTareas
                        .Select(
                        t => new
                        {
                            tar_Id = t.tar_Id,
                            tar_Descripcion = t.tar_Descripcion,
                            tar_Estado = t.tar_Estado,
                        }
                        ).ToList();

                    return Json(tbTareas, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    ex.ToString();
                    throw;
                }
        }
        [HttpPost]
        [SessionManager("Tareas/Create")]
        public JsonResult Create(tbTareas tbTareas)
        {
            string msj = "";

            if (tbTareas.tar_Descripcion != "")
            {
                var Usuario = (tbUsuario)Session["Usuario"];
                using (db = new ERP_GMEDINAEntities())
                    try
                    {
                        var list = db.UDP_RRHH_tbTareas_Insert(
                                                                     tbTareas.tar_Descripcion,
                                                                     (int)Session["UserLogin"],
                                                                     Function.DatetimeNow());
                        foreach (UDP_RRHH_tbTareas_Insert_Result item in list)
                        {
                            msj = item.MensajeError + " ";
                        }
                    }
                    catch (Exception ex)
                    {
                        msj = "-2";
                        ex.Message.ToString();
                    }
            }
            else
            {
                msj = "-3";
            }
            return Json(msj.Substring(0, 2), JsonRequestBehavior.AllowGet);
        }
        [SessionManager("Tareas/Edit")]
        public ActionResult Edit(int? id)
        {

            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            tbTareas tbTareas = null;
            // using (db = new ERP_GMEDINAEntities())
            try
            {
                db = new ERP_GMEDINAEntities();
                tbTareas = db.tbTareas.Find(id);
                if(tbTareas == null )
                {
                    return HttpNotFound();
                }
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                return HttpNotFound();
            }
            Session["id"] = id;
            var competencias = new tbTareas
            {
                tar_Id = tbTareas.tar_Id,
                tar_Descripcion = tbTareas.tar_Descripcion,
                tar_Estado = tbTareas.tar_Estado,
                tar_RazonInactivo = tbTareas.tar_RazonInactivo,
                tar_UsuarioCrea = tbTareas.tar_UsuarioCrea,
                tar_FechaCrea = tbTareas.tar_FechaCrea,
                tar_UsuarioModifica = tbTareas.tar_UsuarioModifica,
                tar_FechaModifica = tbTareas.tar_FechaModifica,
                tbUsuario = new tbUsuario { usu_NombreUsuario = IsNull(tbTareas.tbUsuario).usu_NombreUsuario },
                tbUsuario1 = new tbUsuario { usu_NombreUsuario = IsNull(tbTareas.tbUsuario1).usu_NombreUsuario }
            };
            return Json(competencias, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [SessionManager("Tareas/Edit")]
        public JsonResult Edit(tbTareas tbTareas)
        {
            string msj = "";
            if (tbTareas.tar_Id != 0 && tbTareas.tar_Descripcion != "")
            {
                var id = (int)Session["id"];
                var usuario = (tbUsuario)Session["Usuario"];

                try
                {
                    db = new ERP_GMEDINAEntities();
                    var list = db.UDP_RRHH_tbTareas_Update(tbTareas.tar_Id,
                                                                 tbTareas.tar_Descripcion,
                                                                 (int)Session["UserLogin"],
                                                                 Function.DatetimeNow());
                    foreach (UDP_RRHH_tbTareas_Update_Result item in list)
                    {
                        msj = item.MensajeError + " ";
                    }
                }
                catch (Exception ex)
                {
                    msj = "-2";
                    ex.Message.ToString();
                }
                Session.Remove("id");
            }
            else
            {
                msj = "-3";
            }
            return Json(msj.Substring(0, 2), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [SessionManager("Tareas/Delete")]
        public ActionResult Delete(int id)
        {
            tbTareas tar = new tbTareas();
            string msj = "...";
            string RazonInactivo = "Se ha Inhabilitado este Registro";
            if (id != 0 && tar.tar_RazonInactivo != "")
            {
                //var id = (int)Session["id"];
                var Usuario = (tbUsuario)Session["Usuario"];

                try
                {
                    db = new ERP_GMEDINAEntities();
                    var list = db.UDP_RRHH_tbTareas_Delete(id,
                                                                 RazonInactivo,
                                                                 (int)Session["UserLogin"],
                                                                 Function.DatetimeNow());
                    foreach (UDP_RRHH_tbTareas_Delete_Result item in list)
                    {
                        msj = item.MensajeError = " ";
                    }
                }
                catch (Exception ex)
                {
                    msj = "-2";
                    ex.Message.ToString();
                }
                Session.Remove("id");
            }
            else
            {
                msj = "-3";
            }
            return Json(msj, JsonRequestBehavior.AllowGet);
        }

        protected tbUsuario IsNull(tbUsuario valor)
        {
            if (valor != null)
            {
                return valor;
            }
            else
            {
                return new tbUsuario { usu_NombreUsuario = "" };
            }
        }
        [HttpPost]
        [SessionManager("Tareas/hablilitar")]
        public JsonResult hablilitar(int id)
        {
            string result = "";
            var Usuario = (tbUsuario)Session["Usuario"];
            using (db = new ERP_GMEDINAEntities())
            {
                try
                {
                    var list = db.UDP_RRHH_tbTareas_Restore(id, 
                                                                  (int)Session["UserLogin"],
                                                                  Function.DatetimeNow());
                    foreach (UDP_RRHH_tbTareas_Restore_Result item in list)
                    {
                        result = item.MensajeError;
                    }
                }
                catch (Exception ex)
                {
                    ex.Message.ToString();
                    result = "-2";
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing && db != null)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
