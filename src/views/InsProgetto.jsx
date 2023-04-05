import React, { useState } from "react";
import "../styles/globals.css";
import "../styles/ins-progetto.css";
import ProfileIconArrowLeft from "../assets/img/profile-icon-arrow-left.png";
import { Route, Routes, useNavigate } from "react-router-dom";
import { InfBase, InfBaseHeader } from "../components/forms/InfBase";
import {
  Questionario,
  QuestionarioHeader,
} from "../components/forms/Questionario";
import { Progetto, ProgettoHeader } from "../components/forms/Progetto";
import { Prodotto, ProdottoHeader } from "../components/forms/Prodotto";
import { Faq, FaqHeader } from "../components/forms/Faq";

import { addproj } from "../utils/firebase/writeInfos";
import Footer from "../components/Footer";

import { getRecoil, setRecoil } from "recoil-nexus";
import { addressState } from "../recoilState";
import ProfileHero from "../assets/img/pc-hero-img.png";
import ProfileImg from "../assets/img/profile-img.png";
import ProfileIcon1 from "../assets/img/profile-icon-1.png";
import ProfileIcon2 from "../assets/img/profile-icon-camp.png";
import ProfileIcon3 from "../assets/img/profile-icon-3.png";
import ProfileIcon4 from "../assets/img/profile-icon-4.png";

const InsProgetto = () => {
  var step = [];
  const [inputs, setInputs] = useState({});
  const [progressionStep, setprogressionStep] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (event.target.files != null) {
      setInputs((values) => ({
        ...values,
        [name + "ListFiles"]: event.target.files,
      }));
    }

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      addproj(inputs);
      navigate("/loading", { replace: true });
    } catch (error) {}
  };

  const renderCurrentSelection = () => {
    switch (progressionStep) {
      case 0:
        step[0] = (
          <InfBase
            inputs={inputs}
            handleChange={handleChange}
            setState={incrementStep}
          ></InfBase>
        );
        return step;
      case 1:
        step[0] = (
          <InfBase inputs={inputs} handleChange={handleChange}></InfBase>
        );
        step[1] = (
          <Questionario
            inputs={inputs}
            handleChange={handleChange}
            setState={incrementStep}
          ></Questionario>
        );
        return step;

      case 2:
        step[0] = (
          <InfBase inputs={inputs} handleChange={handleChange}></InfBase>
        );
        step[1] = (
          <Questionario
            inputs={inputs}
            handleChange={handleChange}
          ></Questionario>
        );
        step[2] = (
          <Progetto
            inputs={inputs}
            handleChange={handleChange}
            setState={incrementStep}
          ></Progetto>
        );
        return step;

      case 3:
        step[0] = (
          <InfBase inputs={inputs} handleChange={handleChange}></InfBase>
        );
        step[1] = (
          <Questionario
            inputs={inputs}
            handleChange={handleChange}
          ></Questionario>
        );
        step[2] = (
          <Progetto inputs={inputs} handleChange={handleChange}></Progetto>
        );
        step[3] = (
          <Prodotto
            inputs={inputs}
            handleChange={handleChange}
            setState={incrementStep}
          ></Prodotto>
        );
        return step;
      case 4:
        step[0] = (
          <InfBase inputs={inputs} handleChange={handleChange}></InfBase>
        );
        step[1] = (
          <Questionario
            inputs={inputs}
            handleChange={handleChange}
          ></Questionario>
        );
        step[2] = (
          <Progetto inputs={inputs} handleChange={handleChange}></Progetto>
        );
        step[3] = (
          <Prodotto inputs={inputs} handleChange={handleChange}></Prodotto>
        );
        step[4] = <Faq inputs={inputs} handleChange={handleChange}></Faq>;

        return step;

      default:
        return null;
    }
  };

  const renderCurrentSelectionHeader = () => {
    switch (progressionStep) {
      case 0:
        return <InfBaseHeader></InfBaseHeader>;
      case 1:
        return <QuestionarioHeader> </QuestionarioHeader>;
      case 2:
        return <ProgettoHeader></ProgettoHeader>;

      case 3:
        return <ProdottoHeader></ProdottoHeader>;

      case 4:
        return <FaqHeader></FaqHeader>;
      default:
        return null;
    }
  };

  const incrementStep = () => {
    setprogressionStep(progressionStep + 1);
  };

  return (
    <div className="app">
      <main className="ins-progetto-page">
        <section className="profile-top-section">
          <img
            style={{ backgroundColor: "lightgoldenrodyellow" }}
            className="profile-hero"
            src={ProfileHero}
            alt="ProfileHero"
          />
          <div className="box">
            <div className="pts-content">
              <div className="pts-left">
                <a href="#">
                  <img src={ProfileIconArrowLeft} alt="ProfileIconArrowLeft" />
                </a>
                <div className="profile-img-box">
                  <h3>
                    Profilo di{" "}
                    {getRecoil(addressState).toString().substring(0, 5) +
                      "..." +
                      getRecoil(addressState).toString().substring(38, 42)}
                  </h3>

                  <img src={ProfileImg} alt="" />
                </div>
              </div>
              <div className="pts-right">
                <div className="pts-right-grid">
                  <div className="pts-right-grid-card">
                    <a href={"/#/profile"}>
                      <img src={ProfileIcon1} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/profile"}>
                      <p>Panoramica</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/insprogetto"}>
                      <img
                        className="camp-img"
                        src={ProfileIcon2}
                        alt="ProfileIcon"
                      />
                    </a>
                    <a href={"/#/insprogetto"}>
                      <p>Crea Campagna</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/mynft"}>
                      <img src={ProfileIcon3} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/mynft"}>
                      <p>I Miei NFT</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/myprojects"}>
                      <img src={ProfileIcon4} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/myprojects"}>
                      <p>I Miei Progetti</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ins-progetto-content">
          <div className="box">
            <div className="ins-head">
              <a href="#">
                <img src={ProfileIconArrowLeft} alt="ProfileIconArrowLeft" />
              </a>
              <h2>Inserisci il tuo progetto </h2>
            </div>
            {renderCurrentSelectionHeader()}
            <form onSubmit={handleSubmit}>{renderCurrentSelection()}</form>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default InsProgetto;
