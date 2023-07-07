import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { dataFormAction } from "../redux/store";
import style from "./style/Step3.module.css";

import stepper from "../assets/stepperLast.svg";
import IconDone from "../assets/IconDone.svg";
import iconErr from "../assets/iconErr.svg";

import Button from "../components/UI/Button";
import Modal from "react-modal";
import axios from "axios";

export function Step3(props) {
  const [counter, setCounter] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sendIsOK, setSendIsOk] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const db = useSelector((state) => state.dataForm);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: useSelector((state) => state.dataForm.data.about),
  });

  const onChangeText = (e) => {
    setCounter(e.split(" ").join("").length);
    dispatch(dataFormAction.saveDataAbout(e));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const ModalSucc = (
    <>
      <h2 className={style.succ}>Форма успешно отправлена</h2>
      <div>
        <img src={IconDone} className={style.icon} />
      </div>
      <Button
        type="button"
        id="button-to-main"
        className="succ"
        onClick={() => navigate("/")}
      >
        На главную
      </Button>
    </>
  );

  const ModalErr = (
    <>
      <h2 className={style.err}>Ошибка</h2>
      <div>
        <img src={iconErr} className={style.icon} />
      </div>
      <Button className="err" onClick={closeModal}>
        Закрыть
      </Button>
    </>
  );

  const sendData = (data) => {
    axios
      .post("https://test-f32d2-default-rtdb.firebaseio.com/data.json", data)
      .then((res) => setSendIsOk(true))
      .catch((err) => {
        console.log(err);
        setSendIsOk(false);
      });
  };

  const onSubmit = () => {
    sendData(db);
    setTimeout(() => {
      openModal();
    }, 1000);
  };

  return (
    <div className={style.container}>
      <img src={stepper} className={style.stepper} />
      <form onSubmit={handleSubmit(onSubmit)} className={style.formStep3}>
        <div className={style.textArea}>
          <label htmlFor="field-about">About</label>
          <textarea
            placeholder="Text"
            id="field-about"
            {...register("about", {
              maxLength: { value: 200, message: "Максимум 200 символов" },
              onChange: (e) => onChangeText(e.target.value),
            })}
          />
        </div>
        {counter > 0 && <div className={style.tip}>{counter}</div>}
        {errors?.about && (
          <div className={style.tip}>{errors?.about.message}</div>
        )}

        <div className={style.click}>
          <Button
            type="button"
            className={"back"}
            id="button-back"
            onClick={() => navigate("/step2")}
          >
            Назад
          </Button>
          <Button type="submit" className={"next"} id="button-next">
            Далее
          </Button>
        </div>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={style.modal}
        overlayClassName={style.overlay}
        ariaHideApp={false}
      >
        {sendIsOK ? ModalSucc : ModalErr}
      </Modal>
    </div>
  );
}
