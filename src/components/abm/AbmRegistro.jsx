import React, { useState, useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AbmRegistro({
  Modo,
  AccionABMC,
  Item,
  Boton1Accion,
  Boton2Accion,
  ConfigRegistro,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitted },
  } = useForm({ values: Item });

  const id = useId();

  const [selectOptions, setSelectOptions] = useState({});
  useEffect(() => {
    ConfigRegistro.forEach(async (field) => {
      if (field.data) {
        setSelectOptions((prev) => ({ ...prev, [field.name]: field.data }));
        return;
      }

      if (field.apiData) {
        try {
          const response = await axios.get(field.apiData);
          setSelectOptions((prev) => ({
            ...prev,
            [field.name]: response.data,
          }));
        } catch (error) {
          console.error("Error al cargar datos del select", error);
        }
      }
    });
  }, [ConfigRegistro]); // necesario pq se monta una vez para varios componentes distintos!!!

  if (Modo === "Buscar" && AccionABMC !== "L") return null;

  if (Modo === "Registro" && AccionABMC === "L") return null;

  let boton1 = {};
  let boton2 = {};
  if (AccionABMC === "L") {
    boton1.label = "Buscar";
    boton1.icon = "fa fa-search";
    boton1.className = "btn btn-primary";

    boton2.label = "Agregar";
    boton2.icon = "fa fa-plus";
    boton2.className = "btn btn-primary";
  } else if ("C,M,A".includes(AccionABMC)) {
    if (AccionABMC === "M" || AccionABMC === "A") {
      boton1.label = "Grabar";
      boton1.icon = "fa fa-check";
      boton1.className = "btn btn-primary";
      boton2.label = "Cancelar";
    } else {
      boton1.label = null;
      boton2.label = "Volver";
    }
    boton2.icon = "fa fa-undo";
    boton2.className = "btn btn-warning";
  }

  

  return (
    <form onSubmit={handleSubmit(Boton1Accion)}>
      <div className="container-fluid">
        <fieldset disabled={AccionABMC === "C"}>
          {ConfigRegistro.map((field, index) => {
            return (
              <div className="row" key={index}>
                {field.typeForm === "subtitulo" ? (
                  <div class="subtitulo col">
                      {field.icon && (  <i className={field.icon + " mx-2"}></i>) }
                      {field.label ?? field.name}
                  </div>
                ) : (
                  <>
                    <div className="col-sm-4 col-md-3 offset-md-1">
                      <label
                        htmlFor={field.name + id}
                        className="col-form-label"
                      >
                        {field.label ?? field.name}
                        {field.required && (
                          <span className="text-danger">*</span>
                        )}
                        :
                      </label>
                    </div>
                    <div className="col-sm-8 col-md-6">
                      {field.typeForm === "textarea" ? (
                        <textarea
                          id={field.name + id}
                          {...register(field.name, field.validation)}
                          className={
                            "form-control " +
                            (errors[field.name] ? "is-invalid" : "")
                          }
                          disabled={field.disabled}
                          rows="10"
                        />
                      ) : field.typeForm === "select" ? (
                        <select
                          id={field.name + id}
                          {...register(field.name, field.validation)}
                          className={
                            "form-select " +
                            (errors[field.name] ? "is-invalid" : "")
                          }
                          disabled={field.disabled}
                        >
                          {selectOptions[field.name]?.map((option, index) => (
                            <option
                              value={option[Object.keys(option)[0]]}
                              key={index}
                            >
                              {option[Object.keys(option)[1]]}
                            </option>
                          ))}
                        </select>
                      ) : field.typeForm === "radio" ? (
                        <div className="form-check">
                          {selectOptions[field.name]?.map((option, index) => (
                            <div key={index}>
                              <input
                                id={
                                  field.name +
                                  id +
                                  option[Object.keys(option)[0]]
                                }
                                type="radio"
                                {...register(field.name, field.validation)}
                                value={option[Object.keys(option)[0]]}
                                className={
                                  "form-check-input " +
                                  (errors[field.name] ? "is-invalid" : "")
                                }
                                disabled={field.disabled}
                              />
                              <label
                                htmlFor={
                                  field.name +
                                  id +
                                  option[Object.keys(option)[0]]
                                }
                                className="form-check-label"
                              >
                                {option[Object.keys(option)[1]]}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : field.type === "B" ? (
                        <input
                          id={field.name + id}
                          type="checkbox"
                          {...register(field.name, field.validation)}
                          className={
                            "form-check-input " +
                            (errors[field.name] ? "is-invalid" : "")
                          }
                          disabled={field.disabled}
                        />
                      ) : field.type?.startsWith("N(10,2)") ? (
                        <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input
                          id={field.name + id}
                          {...register(field.name, field.validation)}
                          type="number"
                          className={
                            "form-control " +
                            (errors[field.name] ? "is-invalid" : "")
                          }
                          disabled={field.disabled}
                          placeholder={field.placeholder}
                          maxLength={field.maxLength}
                        />
                        </div>
                      ): field.type?.startsWith("N(") ? (
                        <input
                          id={field.name + id}
                          {...register(field.name, field.validation)}
                          type="number"
                          className={
                            "form-control " +
                            (errors[field.name] ? "is-invalid" : "")
                          }
                          disabled={field.disabled}
                          placeholder={field.placeholder}
                          maxLength={field.maxLength}
                        />
                      ) : (
                        <input
                          id={field.name + id}
                          {...register(field.name, field.validation)}
                          type={field.type === "F" ? "date" : "text"}
                          className={
                            "form-control " +
                            (errors[field.name] ? "is-invalid" : "")
                          }
                          disabled={field.disabled}
                          placeholder={field.placeholder}
                          maxLength={field.maxLength}
                        />
                      ) }
                      {errors[field.name] && (
                        <div className="invalid-feedback">
                          {errors[field.name].message}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </fieldset>

        {ConfigRegistro.length > 0 && <hr />}

        {/* Botones Grabar, Cancelar/Volver' */}
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {boton1.label && (
              <button type="submit" className={boton1.className}>
                <i className={boton1.icon}></i>
                {" " + boton1.label}
              </button>
            )}
            <button
              type="button"
              className={boton2.className}
              onClick={() => {
                reset(Item);
                Boton2Accion();
              }}
            >
              <i className={boton2.icon}></i>
              {" " + boton2.label}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}
      </div>
    </form>
  );
}
