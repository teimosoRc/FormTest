import React from "react";
import style from "./style/Step1.module.css";

import { useForm } from "react-hook-form";

import stepperOne from "../assets/stepperOne.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dataFormAction } from "../redux/store";
import Button from "../components/UI/Button";

export function Step1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      Nickname: useSelector((state) => state.dataForm.data.Nickname),
      Name: useSelector((state) => state.dataForm.data.Name),
      Sername: useSelector((state) => state.dataForm.data.Sername),
      Sex: useSelector((state) => state.dataForm.data.Sex),
    },
  });

  const onSubmit = (data) => {
    navigate("/step2");
  };
  return (
    <div className={style.container}>
      <img className={style.stepper} src={stepperOne} />
      <form onSubmit={handleSubmit(onSubmit)} className={style.formStep1}>
        <div>
          <div className={style.formPole}>
            <label htmlFor="field-nickname">Nickname</label>
            <input
              id="field-nickname"
              {...register("Nickname", {
                required: "Поле обязательно для заполнения",
                onChange: (e) =>
                  dispatch(dataFormAction.saveDataNickname(e.target.value)),
                pattern: {
                  value: /^[а-яА-ЯёЁa-zA-Z0-9]+$/,
                  message: "Введите буквы или цифры",
                },
                maxLength: {
                  value: 30,
                  message: "Максимум 30 символов",
                },
                onBlur: (v) => console.log(v.target.value),
              })}
            />
            <div className={style.tip}>
              {errors?.Nickname && <>{errors?.Nickname?.message}</>}
            </div>
          </div>
          <div className={style.formPole}>
            <label htmlFor="field-name">Name</label>
            <input
              id="field-name"
              {...register("Name", {
                required: "Поле обязательно для заполнения",
                onChange: (e) =>
                  dispatch(dataFormAction.saveDataName(e.target.value)),
                pattern: {
                  value: /^[а-яА-ЯёЁa-zA-Z]+$/,
                  message: "Введите только буквы",
                },
                maxLength: {
                  value: 50,
                  message: "Максимум 50 символов",
                },
              })}
            />
            <div className={style.tip}>
              {errors?.Name && <p>{errors?.Name?.message}</p>}
            </div>
          </div>
          <div className={style.formPole}>
            <label htmlFor="ield-sername">Sername</label>
            <input
              id="field-sername"
              {...register("Sername", {
                required: "Поле обязательно для заполнения",
                onChange: (e) =>
                  dispatch(dataFormAction.saveDataSername(e.target.value)),
                pattern: {
                  value: /^[а-яА-ЯёЁa-zA-Z]+$/,
                  message: "Введите только буквы",
                },
                maxLength: {
                  value: 50,
                  message: "Максимум 50 символов",
                },
              })}
            />
            <div className={style.tip}>
              {errors?.Sername && <p>{errors?.Sername?.message}</p>}
            </div>
          </div>
          <div className={style.formPole}>
            <label htmlFor="field-sex">Sex</label>
            <select
              id="field-sex"
              {...register("Sex", {
                onChange: (e) =>
                  dispatch(dataFormAction.saveDataSex(e.target.value)),
              })}
            >
              <option id="field-sex-option-man" value="Man">
                Man
              </option>
              <option id="field-sex-option-woman" value="Women">
                Women
              </option>
            </select>
            <div className={style.tip}>
              {errors?.Sex && <p>{errors?.Sex?.message}</p>}
            </div>
          </div>
        </div>

        <div className={style.click}>
          <Button
            type="button"
            className={"back"}
            id="button-back"
            onClick={() => navigate("/")}
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
