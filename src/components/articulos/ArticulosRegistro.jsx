import React, {useEffect} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import moment from "moment";

export default function ArticulosRegistro({
  AccionABMC,
  ArticulosFamilias,
  Item,
  Grabar,
  Volver,
}) {

  useEffect(() => {
      console.log("mounting ArticulosRegistro");
    return () => {console.log("unmounting ArticulosRegistro");};
  }, []);

  const validationSchema = Yup.object().shape({
    Nombre: Yup.string()
      .required("Nombre es requerido")
      .min(4, "Nombre debe tener al menos 4 caracteres"),
    Precio: Yup.number().required("Precio es requerido")
    .typeError("Precio debe ser un número"),
    Stock: Yup.number().required("Stock es requerido"),
    CodigoDeBarra: Yup.string().required("Codigo de barra es requerido"),
    IdArticuloFamilia: Yup.number().required("Familia es requerido"),
    FechaAlta: Yup.date()
      .transform((value, originalValue) => {
        return moment(originalValue, "dd/MM/yyyy").toDate();
      })
      .required("Fecha de alta es requerida")
      .typeError("Fecha invalida, formato dd/mm/yyyy"),

    Activo: Yup.boolean().required("Activo es requerido"),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    //setStatus();
    //setSubmitting(true);
    Grabar(fields);
  }

  return (
    <Formik
      initialValues={Item}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, isValidating}) => {
        return (
          <Form name="FormRegistro">
            <div className="container-fluid">
              <fieldset disabled={AccionABMC === "C"}>
                
                {/* campo nombre */}
                <div className="row">
                  <div className="col-sm-4 col-md-3 offset-md-1">
                    <label className="col-form-label" htmlFor="Nombre">
                      Nombre<span className="text-danger">*</span>:
                    </label>
                  </div>
                  <div className="col-sm-8 col-md-6">
                    <Field autoFocus 
                      name="Nombre"
                      className={
                        "form-control" +
                        (errors.Nombre && touched.Nombre ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="Nombre"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                {/* campo Precio */}
                <div className="row">
                  <div className="col-sm-4 col-md-3 offset-md-1">
                    <label className="col-form-label" htmlFor="Precio">
                      Precio<span className="text-danger">*</span>:
                    </label>
                  </div>
                  <div className="col-sm-8 col-md-6">
                    <Field
                      name="Precio"
                      className={
                        "form-control" +
                        (errors.Precio && touched.Precio ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="Precio"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                {/* campo Stock */}
                <div className="row">
                  <div className="col-sm-4 col-md-3 offset-md-1">
                    <label className="col-form-label" htmlFor="Stock">
                      Stock<span className="text-danger">*</span>:
                    </label>
                  </div>
                  <div className="col-sm-8 col-md-6">
                    <Field
                      name="Stock"
                      className={
                        "form-control" +
                        (errors.Stock && touched.Stock ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="Stock"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                {/* campo CodigoDeBarra */}
                <div className="row">
                  <div className="col-sm-4 col-md-3 offset-md-1">
                    <label className="col-form-label" htmlFor="CodigoDeBarra">
                      Codigo De Barra<span className="text-danger">*</span>:
                    </label>
                  </div>
                  <div className="col-sm-8 col-md-6">
                    <Field
                      name="CodigoDeBarra"
                      className={
                        "form-control" +
                        (errors.CodigoDeBarra && touched.CodigoDeBarra
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="CodigoDeBarra"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                {/* campo idarticulofamilia */}
                <div className="row">
                  <div className="col-sm-4 col-md-3 offset-md-1">
                    <label
                      className="col-form-label"
                      htmlFor="IdArticuloFamilia"
                    >
                      Familia<span className="text-danger">*</span>:
                    </label>
                  </div>
                  <div className="col-sm-8 col-md-6">
                    <Field
                      name="IdArticuloFamilia"
                      as="select"
                      className={
                        "form-control" +
                        (errors.IdArticuloFamilia && touched.IdArticuloFamilia
                          ? " is-invalid"
                          : "")
                      }
                    >
                      <option value="" key={1}></option>
                      {ArticulosFamilias?.map((x) => (
                        <option
                          value={x.IdArticuloFamilia}
                          key={x.IdArticuloFamilia}
                        >
                          {x.Nombre}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="IdArticuloFamilia"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                {/* campo FechaAlta */}
                <div className="row">
                  <div className="col-sm-4 col-md-3 offset-md-1">
                    <label className="col-form-label" htmlFor="FechaAlta">
                      Fecha Alta<span className="text-danger">*</span>:
                    </label>
                  </div>
                  <div className="col-sm-8 col-md-6">
                    <Field
                      name="FechaAlta"
                      className={
                        "form-control" +
                        (errors.FechaAlta && touched.FechaAlta
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="FechaAlta"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                {/* campo Activo */}
                <div className="row">
                  <div className="col-sm-4 col-md-3 offset-md-1">
                    <label className="col-form-label" htmlFor="Activo">
                      Activo<span className="text-danger">*</span>:
                    </label>
                  </div>
                  <div className="col-sm-8 col-md-6">
                    <Field
                      name="Activo"
                      as="select"
                      className={
                        "form-control" +
                        (errors.Activo && touched.Activo ? " is-invalid" : "")
                      }
                    >
                      <option value={null}></option>
                      <option value={false}>NO</option>
                      <option value={true}>SI</option>
                    </Field>
                    <ErrorMessage
                      name="Activo"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Botones Grabar, Cancelar/Volver' */}
              <hr />
              <div className="row justify-content-center botones">
                {"AccionABMC!=='C'" && (
                  <button type="submit" className="btn btn-primary">
                    <i className="fa fa-check"></i> Grabar
                  </button>
                )}

                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => Volver()}
                >
                  <i className="fa fa-undo"></i>{" "}
                  {AccionABMC === "C" ? "Volver" : "Cancelar"}
                </button>
              </div>

              {/* texto: Revisar los datos ingresados... */}
              {Object.values(errors).length > 0  &&  (
                <div className="row alert alert-danger mensajesAlert">
                  <i className="fa fa-exclamation-sign"></i>
                  Revisar los datos ingresados...
                </div>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}


