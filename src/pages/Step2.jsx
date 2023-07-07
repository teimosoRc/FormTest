import React from "react";
import style from "./style/Step2.module.css";
import stepperTwo from "../assets/stepperTwo.svg";

import { useForm, useFieldArray } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dataFormAction } from "../redux/store";
import Button from "../components/UI/Button";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export function Step2() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, control } = useForm({
    mode: "onBlur",
    defaultValues: {
      Checkbox: useSelector((state) => state.dataForm.data.Checkbox),
      RadioGroup: useSelector((state) => state.dataForm.data.RadioGroup),
      Advantages: useSelector((state) => state.dataForm.data.Advantages),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Advantages",
  });

  const onClickBack = () => {
    navigate("/step1");
  };

  const onSubmit = (data) => {
    dispatch(dataFormAction.saveDataAdvantages(data.Advantages));
    dispatch(dataFormAction.saveDataCheckbox(data.Checkbox));
    navigate("/step3");
  };

  return (
    <div className={style.container}>
      <img src={stepperTwo} className={style.stepper} />
      <form onSubmit={handleSubmit(onSubmit)} className={style.formStep2}>
        <div>
          <div className={style.adv}>
            <label className={style.label}>Advantages</label>

            {fields.map((field, index) => (
              <div key={field.id}>
                <div>
                  <input
                    id={`field-advatages-${index + 1}`}
                    type="text"
                    placeholder={"Advantages"}
                    {...register(`Advantages.${index}.value`, {})}
                  />
                  <IconButton
                    id={`button-remove-${index + 1}`}
                    aria-label="delete"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))}

            <Button
              id="button-add"
              type="button"
              className="add"
              onClick={() => append()}
            >
              +
            </Button>
          </div>
          <div className={style.checkbox}>
            <label className={style.label}>Checkbox group</label>
            <div className={style.check}>
              <input
                value={1}
                type="checkbox"
                name="Checkbox"
                id="field-checkbox-group-option-1"
                {...register("Checkbox", {
                  onChange: (e) =>
                    dispatch(
                      dataFormAction.saveDataCheckbox(Number(e.target.value))
                    ),
                })}
              />
              <label htmlFor="field-checkbox-group-option-1">1</label>
            </div>
            <div className={style.check}>
              <input
                value={2}
                type="checkbox"
                name="Checkbox"
                id="field-checkbox-group-option-2"
                {...register("Checkbox", {
                  onChange: (e) =>
                    dispatch(dataFormAction.saveDataCheckbox(e.target.value)),
                })}
              />
              <label htmlFor="field-checkbox-group-option-2">2</label>
            </div>
            <div className={style.check}>
              <input
                value={3}
                type="checkbox"
                name="Checkbox"
                id="field-checkbox-group-option-3"
                {...register("Checkbox", {
                  onChange: (e) =>
                    dispatch(dataFormAction.saveDataCheckbox(e.target.value)),
                })}
              />
              <label htmlFor="field-checkbox-group-option-3">3</label>
            </div>
          </div>
          <div className={style.radioGroup}>
            <label className={style.label}>Radio group</label>
            <div className={style.radio}>
              <input
                value={1}
                type="radio"
                id="field-radio-group-option-1"
                {...register("RadioGroup", {
                  onChange: (e) =>
                    dispatch(dataFormAction.saveDataRadioGroup(e.target.value)),
                })}
              />
              <label htmlFor="field-radio-group-option-1">1</label>
            </div>
            <div className={style.radio}>
              <input
                value={2}
                type="radio"
                id="field-radio-group-option-2"
                {...register("RadioGroup", {
                  onChange: (e) =>
                    dispatch(dataFormAction.saveDataRadioGroup(e.target.value)),
                })}
              />
              <label htmlFor="field-radio-group-option-2">2</label>
            </div>
            <div className={style.radio}>
              <input
                value={3}
                type="radio"
                id="field-radio-group-option-3"
                {...register("RadioGroup", {
                  onChange: (e) =>
                    dispatch(dataFormAction.saveDataRadioGroup(e.target.value)),
                })}
              />
              <label htmlFor="field-radio-group-option-3">3</label>
            </div>
          </div>
        </div>
        <div className={style.click}>
          <Button
            type="button"
            className={"back"}
            id="button-back"
            onClick={onClickBack}
          >
            Назад
          </Button>

          <Button type="submit" className={"next"} id="button-next">
            Далее
          </Button>
        </div>
      </form>
    </div>
  );
}
