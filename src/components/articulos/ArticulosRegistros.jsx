import React from "react";
import { useForm } from "react-hook-form";

export default function ArticulosRegistro({
  AccionABMC,
  ArticulosFamilias,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });
  const onSubmit = (data) => {
    Grabar(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              <input
                type="text"
                {...register("Nombre")}
                autoFocus
                className="form-control "
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
              <input
                type="number"
                step="0.01"
                {...register("Precio")}
                className= "form-control" 
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
              <input
                type="number"
                {...register("Stock")}
                className="form-control"
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
              <input
                type="text"
                {...register("CodigoDeBarra")}
                className="form-control"
              />
            </div>
          </div>

          {/* campo idarticulofamilia */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="IdArticuloFamilia">
                Familia<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("IdArticuloFamilia")}
                className="form-control"
              >
                <option value="" key={1}></option>
                {ArticulosFamilias?.map((x) => (
                  <option value={x.IdArticuloFamilia} key={x.IdArticuloFamilia}>
                    {x.Nombre}
                  </option>
                ))}
              </select>
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
              <input
                type="date"
                {...register("FechaAlta")}
                className="form-control"
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
              <select
                {...register("Activo")}
                className="form-control"
                disabled
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        <div className="row alert alert-danger mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          Revisar los datos ingresados...
        </div>

      </div>
    </form>
  );
}