import React, { useState, useEffect, useId } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
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
    control,
    reset,
    getValues,
    formState: { errors, isValid, isSubmitted },
  } = useForm({values: Item});

  const id = useId();

  useEffect(() => {
    ConfigRegistro.forEach(async (field) => {
      // if (field.data) {
      //   setSelectOptions((prev) => ({ ...prev, [field.name]: field.data }));
      //   return;
      // }

      if (field.apiData) {
        try {
          const response = await axios.get(field.apiData);
          // setSelectOptions((prev) => ({
          //   ...prev,
          //   [field.name]: response.data,
          // }));
          field.data = response.data.map((item) => ({
            value: item[Object.keys(item)[0]],
            label: item[Object.keys(item)[1]],
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
          {ConfigRegistro.map((fieldPy, index) => {
            return (
              <div className="row" key={index}>
                {fieldPy.typeForm === "subtitulo" ? (
                  <div className="subtitulo col">
                    {fieldPy.icon && <i className={fieldPy.icon + " mx-2"}></i>}
                    {fieldPy.label ?? fieldPy.name}
                  </div>
                ) : (
                  <>
                    <div className="col-sm-4 col-md-3 offset-md-1">
                      <label
                        htmlFor={fieldPy.name + id}
                        className="col-form-label"
                      >
                        {fieldPy.label ?? fieldPy.name}
                        {fieldPy.required && (
                          <span className="text-danger">*</span>
                        )}
                        :
                      </label>
                    </div>
                    <div className="col-sm-8 col-md-6">
                      {fieldPy.typeForm === "textarea" ? (
                        <textarea
                          id={fieldPy.name + id}
                          {...register(fieldPy.name, fieldPy.validation)}
                          className={
                            "form-control " +
                            (errors[fieldPy.name] ? "is-invalid" : "")
                          }
                          disabled={fieldPy.disabled}
                          rows="10"
                        />
                      ) : fieldPy.typeForm === "select" ? (
                        <Controller
                          name={fieldPy.name}
                          rules={fieldPy.validation}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className={errors[field.name] ? "is-invalid" : ""}
                              options={fieldPy.data}
                              value={fieldPy.data.find(
                                (option) => option.value === field.value
                              )}
                              onChange={(option) =>
                                field.onChange(option.value)
                              }
                              placeholder={fieldPy.placeholder ?? ""}
                              isDisabled={
                                fieldPy.disabled || AccionABMC === "C"
                              }
                            />
                          )}
                        />
                      ) : fieldPy.typeForm === "radio" ? (
                        <div className="form-check">
                          {fieldPy.data?.map((option, index) => (
                            <div key={index}>
                              <input
                                id={fieldPy.name + id + option.value}
                                type="radio"
                                {...register(fieldPy.name, fieldPy.validation)}
                                value={option.value}
                                className={
                                  "form-check-input" +
                                  (errors[fieldPy.name] ? "is-invalid" : "")
                                }
                                disabled={fieldPy.disabled}
                              />
                              <label
                                htmlFor={fieldPy.name + id + option.value}
                                className="form-check-label no-css"
                              >
                                {option.label} 
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : fieldPy.type === "B" ? (
                        <input
                          id={fieldPy.name + id}
                          type="checkbox"
                          {...register(fieldPy.name, fieldPy.validation)}
                          className={
                            "form-check-input " +
                            (errors[fieldPy.name] ? "is-invalid" : "")
                          }
                          disabled={fieldPy.disabled}
                        /> 
                      ) : fieldPy.type?.startsWith("N(10,2)") ? (
                        <div className="input-group mb-3 inputMedio">
                          <span className="input-group-text">$</span>
                          <input
                            id={fieldPy.name + id}
                            {...register(fieldPy.name, fieldPy.validation)}
                            type="number"
                            className={
                              "form-control " +
                              (errors[fieldPy.name] ? "is-invalid" : "")
                            }
                            disabled={fieldPy.disabled}
                            placeholder={fieldPy.placeholder}
                            maxLength={fieldPy.maxLength}
                          />
                        </div>
                      ) : fieldPy.type?.startsWith("N(") ? (
                        <input
                          id={fieldPy.name + id}
                          {...register(fieldPy.name, fieldPy.validation)}
                          type="number"
                          className={
                            "form-control inputMedio " +
                            (errors[fieldPy.name] ? "is-invalid" : "")
                          }
                          disabled={fieldPy.disabled}
                          placeholder={fieldPy.placeholder}
                          maxLength={fieldPy.maxLength}
                        />
                      ) : fieldPy.type==="F" ? (
                        <input
                          id={fieldPy.name + id}
                          {...register(fieldPy.name, fieldPy.validation)}
                          type="date"
                          className={
                            "form-control inputMedio" +
                            (errors[fieldPy.name] ? "is-invalid" : "")
                          }
                          disabled={fieldPy.disabled}
                          placeholder={fieldPy.placeholder}
                          maxLength={fieldPy.maxLength}
                        />
                      ) : (
                        <input
                          id={fieldPy.name + id}
                          {...register(fieldPy.name, fieldPy.validation)}
                          type="text"
                          className={
                            "form-control " +
                            (errors[fieldPy.name] ? "is-invalid" : "")
                          }
                          disabled={fieldPy.disabled}
                          placeholder={fieldPy.placeholder}
                          maxLength={fieldPy.maxLength}
                        />
                      )}
                      {errors[fieldPy.name] && (
                        <div className="invalid-feedback">
                          {errors[fieldPy.name].message}
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

// : fieldPy.typeForm === "select" ? (
//   <select
//     id={fieldPy.name + id}
//     {...register(fieldPy.name, fieldPy.validation)}
//     className={
//       "form-select " +
//       (errors[fieldPy.name] ? "is-invalid" : "")
//     }
//     disabled={fieldPy.disabled}
//   >
//     {selectOptions[fieldPy.name]?.map((option, index) => (
//       <option
//         value={option[Object.keys(option)[0]]}
//         key={index}
//       >
//         {option[Object.keys(option)[1]]}
//       </option>
//     ))}
//   </select>
// )
