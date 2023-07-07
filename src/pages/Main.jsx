import React from "react";
import style from "./style/Main.module.css";

import folder from "../assets/folder.svg";

import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dataFormAction } from "../redux/store";
import Button from "../components/UI/Button";

export function Main(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "teimoso_rc@inbox.ru",
    },
  });

  const firstName = "Никита";
  const lastName = "Садкович";
  const fl = `${firstName[0]}${lastName[0]}`;

  const onSubmit = (data) => {
    navigate("/step1");
  };

  return (
    <div className={style.container}>
      <div className={style.head}>
        <button className={style.avatar}>{fl}</button>
        <div>
          <p className={style.name}>{`${firstName} ${lastName}`}</p>
          <div className={style.link}>
            <a
              href="https://t.me/teimoso_rc"
              target="blanc"
              style={{ textDecoration: "none" }}
            >
              <img className={style.folder} src={folder} />
              Telegram
            </a>
            <a
              href="https://github.com/teimosoRc"
              target="blanc"
              style={{ textDecoration: "none" }}
            >
              <img className={style.folder} src={folder} />
              GitHub
            </a>
            <a
              href="https://hh.ru/resume/b6f6dea2ff0b5ce7150039ed1f4a5a65747732"
              target="blanc"
              style={{ textDecoration: "none" }}
            >
              <img
                className={style.folder}
                src={folder}
                target="blanc"
                style={{ textDecoration: "none" }}
              />
              Resume
            </a>
          </div>
        </div>
      </div>
      <hr className={style.divinder} />
      <div className={style.containerForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Номер телефона
            <InputMask
              disabled
              value={79777797494}
              alwaysShowMask={true}
              mask={"+7 (999) 999-99-99"}
              {...register("phone", {
                required: "Поле обязательно для заполнения",
                onChange: (e) =>
                  dispatch(dataFormAction.saveDataPhone(e.target.value)),
                pattern: {
                  value: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
                  message: "Введите корректный номер",
                },
              })}
            />
          </label>
          <div className={style.error}>
            {errors?.phone && <p>{errors?.phone?.message}</p>}
          </div>
          <label>
            Email
            <input
              disabled
              type="text"
              {...register("email", {
                value: "teimoso_rc@inbox.ru",
                required: "Поле обязательно для заполнения",
                onChange: (e) =>
                  dispatch(dataFormAction.saveDataEmail(e.target.value)),
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Введите корректный email",
                },
              })}
            />
          </label>
          <div className={style.error}>
            {errors?.email && <p>{errors?.email?.message}</p>}
          </div>

          <Button id="button-start" className={"start"}>
            Начать
          </Button>
        </form>
      </div>
    </div>
  );
}
