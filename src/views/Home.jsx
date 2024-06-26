import React, { useState, useEffect } from "react";
import HeroImg from "../assets/img/hero.png";
import LogoWhite from "../assets/img/logo-white.svg";
import IconWhitePaper from "../assets/img/icon-whitepaper.svg";
import IconPlane from "../assets/img/icon-plane.svg";
import IconCamelot from "../assets/img/camelot.svg";
import IconUniswap from "../assets/img/uniswap.png";
import IconArrowGrd from "../assets/img/icon-arrow-02-02.svg";
import IconDollarGrd from "../assets/img/icon-dollar-02.svg";
import IconPersonGrd from "../assets/img/icon-person-02.svg";
import IconCommentsGrd from "../assets/img/icon-comments-02.svg";
import PlaneLaptopPlanet from "../assets/img/plane-laptop-planet-full-2.png";
import BitcoinPeople from "../assets/img/bitcoin-people.png";
import ScelgonoImg1 from "../assets/img/scelgono-img-1.png";
import ScelgonoImg2 from "../assets/img/scelgono-img-2.png";
import ScelgonoImg3 from "../assets/img/scelgono-img-3.png";
import HandToHand from "../assets/img/hand-to-hand.png";
import LeftWave from "../assets/img/left-wave-02.svg";
import RightWave from "../assets/img/right-wave-02.svg";
import PlanetCoreImg from "../assets/img/planet-core-img.png";
import RoboImg from "../assets/img/robo-img.png";
import DaiBg from "../assets/img/dai-bg.png";
import ProfitIcon from "../assets/img/profit-icon-02.svg";
import ValoreIcon from "../assets/img/valore-icon-02.svg";
import BlockChainIcon from "../assets/img/blockchain-icon-02.svg";
import StableIcon from "../assets/img/stable-icon-02.svg";
import HoldingIcon from "../assets/img/holding-icon-02.svg";
import QuiBottomSparkles from "../assets/img/qui-bottom-sparkles.svg";
import ScorpiPlanets from "../assets/img/scorpi-planets.svg";
import RoadmapBg from "../assets/img/roadmap-bg-full.png";
import Planet1 from "../assets/img/planet-1-02.svg";
import Planet2 from "../assets/img/planet-2-02.svg";
import Planet3 from "../assets/img/planet-3-02.svg";
import Planet4 from "../assets/img/planet-4-02.svg";
import Planet5 from "../assets/img/planet-5-02.svg";
import "../styles/home.css";
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MdMenu, MdClear } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Pdf from "../assets/dopot.pdf";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkAdBlock } from "adblock-checker";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [isTempMsgHidden, setIsTempMsgHidden] = useState(false);
  AOS.init();
  

  useEffect(() => {
    if (typeof window.ethereum === "undefined") {
      toast.info(t("web3Notice"));
    }
    const checkAdblock = async () => {
      if (await checkAdBlock()) 
        toast.info(t("adblockNotice"));
    };
    checkAdblock();
   
  }, []);

  return (
    <div className="app">
      <main className="home">
        <ToastContainer />
        {/* Temporary Message */}
        {isTempMsgHidden ? null : (
          <div className="temp-msg">
            <p>Dopot is live on Arbitrum One!</p>
            <div
              onClick={() => {
                setIsTempMsgHidden(true);
              }}
            >
              <MdClear />
            </div>
          </div>
        )}
        {/* Hero Section */}
        <section className="hero-section" id="hero-section">
          <Header />
          <img className="hero-bg" src={HeroImg} alt="HeroImg" />
          <div className="box">
            <div className="hero-content">
              {/* <img src={LogoWhite} alt="LogoWhite" /> */}
              <h1
                data-aos="fade-right"
                data-aos-delay="400"
                data-aos-duration="750"
              >
                {t("title")}
              </h1>

              <h2
                data-aos="fade-right"
                data-aos-delay="700"
                data-aos-duration="750"
              >
                {t("subtitle")}
              </h2>
              <div className="main-btns-box">
                <div style={{ padding: 0 }} className="box">
                  <div className="mbb-content">
                    <a href={"/#/loading"}>
                      <button
                        className="grd-btn dopot-btn-lg-2"
                        data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="650"
                        data-aos-delay="1000"
                      >
                        <img src={IconPlane} alt="IconPlane" /> {t("discovery")}
                      </button>
                    </a>
                    
                    {/*<a style={{marginLeft:"5px"}} href={"https://app.camelot.exchange"}>
                      <button className="grd-btn dopot-btn-lg-2"
                        data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="650"
                        data-aos-delay="1500">
                      {" "}
                      <img src={IconCamelot} alt="" />{" "}
                      Buy DPT
                    </button>
                    </a>*/}
                  </div>
                  <div style={{marginTop:"2rem", display: 'flex', alignItems: 'center'}} className="mbb-content">
                    <a href="https://www.dx.app/dxsale/view?address=0x9672876A9B1D3cB60E6942B068f432fA85CF3EE3&chain=42161" target="_blank" rel="noreferrer">
                      <h4
                        data-aos="fade-right"
                        data-aos-delay="700"
                        data-aos-duration="750"
                        style={{ color: "white", fontWeight: "bold,", textDecoration: "underline" }}
                      >
                        {t("privateSaleLaunch")}
                      </h4>
                      <img data-aos="fade-right"
                      data-aos-delay="700"
                      data-aos-duration="750"
                      style={{ maxWidth: "70px", width: "100%", height: "100%" }} src="https://i.ibb.co/BjTc2Qt/dxsale-logo.png" alt="dx-logo" />
                    </a>
                  </div>
                  {/*<div style={{marginTop:"2rem"}} className="mbb-content">
                  <a href={"https://app.camelot.exchange/nitro"}>
                      <button className="purple-border-transparent-btn dopot-btn-sm"
                        data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="650"
                        data-aos-delay="2000">
                      {" "}
                      <img src={IconCamelot} alt="" />{" "}
                      Stake
                    </button>
                    </a>
                    <a href={"https://app.uniswap.org/pools"}>
                      <button className="purple-border-transparent-btn dopot-btn-sm"
                        data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="650"
                        data-aos-delay="2500">
                      {" "}
                      <img src={IconUniswap} alt="" />{" "}
                      Pool
                    </button>
                    </a>
                  </div>*/}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scopri Cosa Puoi Fare Section */}
        <section className="scorpi-section">
          <img
            className="scorpi-planets"
            src={ScorpiPlanets}
            alt="ScorpiPlanets"
          />
          <div className="box">
            <div className="scorpi-content">
              <h3
                data-aos="zoom-in-up"
                data-aos-duration="800"
                className="section-heading"
              >
                {t("find")}
              </h3>
              <div className="scorpi-grid">
                <div
                  data-aos="fade-up "
                  data-aos-delay="500"
                  data-aos-duration="1000"
                  className="scorpi-grid-card"
                >
                  <img src={IconArrowGrd} alt="IconArrowGrd" />
                  <h4>{t("invest")}</h4>
                  <p>{t("investsub")}</p>
                </div>
                {/* <div
                  data-aos="fade-up"
                  data-aos-delay="750"
                  data-aos-duration="1000"
                  className="scorpi-grid-card"
                >
                  <img src={IconDollarGrd} alt="IconDollarGrd" />
                  <h4>{t("earn")}</h4>
                  <p>{t("earnsub")}</p>
                </div> */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="750"
                  data-aos-duration="1000"
                  className="scorpi-grid-card"
                >
                  <img src={IconPersonGrd} alt="IconPersonGrd" />
                  <h4>{t("learn")}</h4>
                  <p>{t("learnsub")}</p>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="1250"
                  data-aos-duration="1000"
                  className="scorpi-grid-card"
                >
                  <img src={IconCommentsGrd} alt="IconCommentsGrd" />
                  <h4>{t("connect")}</h4>
                  <p>{t("connectsub")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Il web 3.0 è Qui Section */}
        <section className="qui-section">
          <img
            className="plane-laptop-planet-img"
            src={PlaneLaptopPlanet}
            alt="PlaneLaptopPlanet"
          />
          <img
            className="qui-bottom-sparkles"
            src={QuiBottomSparkles}
            alt="QuiBottomSparkles"
          />

          <div className="box">
            <div
              className="ill-web"
              data-aos="zoom-out"
              data-aos-duration="800"
            >
              <div>
                <h4> {t("web3")}</h4>
                <p>{t("web3sub")}</p>
              </div>
            </div>
          </div>
          <img
            data-aos="zoom-out"
            data-aos-duration="800"
            className="bitcoin-people"
            src={BitcoinPeople}
            alt="BitcoinPeople"
          />
          <div className="box">
            <h4 className="crowd-funding" data-aos="zoom-in-up">
              {t("whyinvest")}
            </h4>
            <div className="ill-text-info-box-1">
              <div
                className="ill-text-info-box"
                data-aos="zoom-out-left"
                data-aos-delay="800"
              >
                <h5>{t("decentralization")}</h5>
                <p>{t("decentralizationsub")}</p>
              </div>
            </div>
            <div className="ill-text-info-box-2">
              <div
                className="ill-text-info-box"
                data-aos="zoom-out-right"
                data-aos-delay="500"
              >
                <h5>{t("benefits")}</h5>
                <p>{t("benefitssub")}</p>
              </div>
            </div>
          </div>
        </section>
        {/* Perché le Aziende Scelgono Dopot Section */}
        <section className="scelgono-section">
          <div className="box">
            <h3 id="faq" className="section-heading" data-aos="zoom-in-up">
              {t("whydopot")}
            </h3>
            <div className="scelgono-grid-box">
              <div
                className="scelgono-grid-text-box"
                data-aos="zoom-out-right"
                data-aos-delay="500"
                data-aos-duration="1000"
              >
                <h5>{t("lessbureaucracy")}</h5>
                <p>{t("lessbureaucracysub")}</p>
              </div>
              <img
                src={ScelgonoImg1}
                alt="ScelgonoImg1"
                data-aos="zoom-out-left"
                data-aos-delay="750"
                data-aos-duration="1000"
              />
            </div>
            <div className="scelgono-grid-box">
              <img
                src={ScelgonoImg2}
                alt="ScelgonoImg2"
                data-aos="zoom-out-right"
                data-aos-delay="500"
                data-aos-duration="1000"
              />
              <div
                className="scelgono-grid-text-box"
                data-aos="zoom-out-left"
                data-aos-delay="750"
                data-aos-duration="1000"
              >
                <h5>{t("fasttransaction")}</h5>
                <p>{t("fasttransactionsub")}</p>
              </div>
            </div>
            <div className="scelgono-grid-box">
              <div
                className="scelgono-grid-text-box"
                data-aos="zoom-out-right"
                data-aos-delay="500"
                data-aos-duration="1000"
              >
                <h5>{t("intermediary")}</h5>
                <p>{t("intermediarysub")}</p>
              </div>
              <img
                src={ScelgonoImg3}
                alt="ScelgonoImg3"
                data-aos="zoom-out-left"
                data-aos-delay="750"
                data-aos-duration="1000"
              />
            </div>
          </div>
        </section>
        {/* Roadmap Section */}
        <section className="roadmap-section">
          <img className="roadmap-bg" src={RoadmapBg} alt="RoadmapBg" />
          <div className="box">
            <h3
              style={{ textTransform: "uppercase" }}
              className="section-heading"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              Roadmap
            </h3>
            <div className="roadmap-grid">
              <div className="roadmap-con">
                <div className="roadmap-step-box">
                  <img
                    src={Planet1}
                    alt="Planet1"
                    data-aos="zoom-in-up"
                    data-aos-delay="400"
                    data-aos-duration="1000"
                  />
                  <div
                    className="roadmap-step-content-box"
                    data-aos="zoom-in-up"
                    data-aos-delay="500"
                    data-aos-duration="1000"
                  >
                    <h4>01</h4>
                    <div>
                      <h6>{t("01title")}</h6>
                      <p>Mainnet Launch & Private Sale: Q2 2024</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="roadmap-con">
                <div className="roadmap-step-box">
                  <img
                    src={Planet2}
                    alt="Planet2"
                    data-aos="zoom-in-up"
                    data-aos-delay="500"
                    data-aos-duration="1000"
                  />
                  <div
                    className="roadmap-step-content-box"
                    data-aos="zoom-in-up"
                    data-aos-delay="600"
                    data-aos-duration="1000"
                  >
                    <h4>02</h4>
                    <div>
                      <h6>{t("02title")}</h6>
                      <p>ILO (Pre Sale) with Vesting: Q1 2025</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="roadmap-con">
                <div className="roadmap-step-box">
                  <img
                    src={Planet3}
                    alt="Planet3"
                    data-aos="zoom-in-up"
                    data-aos-delay="600"
                    data-aos-duration="1000"
                  />
                  <div
                    className="roadmap-step-content-box"
                    data-aos="zoom-in-up"
                    data-aos-delay="700"
                    data-aos-duration="1000"
                  >
                    <h4>03</h4>
                    <div>
                      <h6>{t("03title")}</h6>
                      <p>Public Sale: Q2 2025</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="roadmap-con">
                <div className="roadmap-step-box">
                  <img
                    src={Planet4}
                    alt="Planet4"
                    data-aos="zoom-in-up"
                    data-aos-delay="800"
                    data-aos-duration="1000"
                  />
                  <div
                    className="roadmap-step-content-box"
                    data-aos="zoom-in-up"
                    data-aos-delay="900"
                    data-aos-duration="1000"
                  >
                    <h4>04</h4>
                    <div>
                      <h6>{t("04title")}</h6>
                      <p>Listing on CEX in Q4 2025 
                      <br />and Equity launch in Q2 2026</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="roadmap-con">
                <div className="roadmap-step-box">
                  <img src={Planet5} alt="Planet5" />
                  <div className="roadmap-step-content-box">
                    <h4>05</h4>
                    <div>
                      <h6>Fase Marte</h6>
                      <p>Apertura sezione "Equity"</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
        {/* Big Image */}
        {/* <section className="hand-to-hand-section">
          <h4>{t("dst")}</h4>
          <img src={HandToHand} alt="HandToHand" />
        </section> */}
        <section className="supply-section">
          {/* <div className="left-wave-heading">
            <img src={LeftWave} alt="LeftWave" />
            <div className="box">
              <h3>Distibuzione Supply</h3>
            </div>
          </div>
          <div className="planet-img-box">
            <img src={PlanetCoreImg} alt="PlanetCoreImg" />
          </div>
          <div className="right-wave-heading">
            <img src={RightWave} alt="RightWave" />
            <div className="box">
              <h3>Fornitura: 10 milioni di Token </h3>
            </div>
          </div> */}
          <div className="della-msg">
            <div className="box">
              <div className="della-msg-box">
                <img src={RoboImg} alt="RoboImg" />
                <h5>{t("dai")}</h5>
              </div>
            </div>
          </div>
        </section>
        {/* Cos’è DAI Secction */}
        <section className="dai-section">
          <img className="dai-bg" src={DaiBg} alt="DaiBg" />
          <div className="box">
            <div className="dai-right-text-box">
              <div>
                <h4
                  data-aos="zoom-in-up"
                  data-aos-delay="450"
                  data-aos-duration="1000"
                >
                  {t("whatsdai")}
                </h4>
                <p
                  data-aos="fade-down"
                  data-aos-delay="800"
                  data-aos-duration="1000"
                >
                  {t("daisub")}
                </p>
              </div>
            </div>
            <div
              className="dai-grid-box"
              data-aos="fade-right"
              data-aos-delay="1000"
              data-aos-duration="1000"
            >
              <img src={ProfitIcon} alt="ProfitIcon" />
              <p>
                {t("profit")}
                <br />
                {t("profitsub")}
              </p>
            </div>
            <div
              className="dai-grid-box"
              data-aos="fade-right"
              data-aos-delay="700"
              data-aos-duration="1000"
            >
              <img src={BlockChainIcon} alt="BlockChainIcon" />
              <p>
                {t("multibc")}
                <br />
                {t("multibcsub")}
              </p>
            </div>
            <div
              className="dai-grid-box"
              data-aos="fade-right"
              data-aos-delay="800"
              data-aos-duration="1000"
            >
              <img src={ValoreIcon} alt="ValoreIcon" />
              <p>
                {t("value")}
                <br />
                {t("valuesub")}
              </p>
            </div>
            <div
              className="dai-grid-box"
              data-aos="fade-right"
              data-aos-delay="850"
              data-aos-duration="1000"
            >
              <img src={StableIcon} alt="StableIcon" />
              <p>
                {t("stablecoin")}
                <br />
                {t("stablecoinsub")}
              </p>
            </div>
            <div
              className="dai-grid-box"
              data-aos="fade-right"
              data-aos-delay="900"
              data-aos-duration="1000"
            >
              <img src={HoldingIcon} alt="HoldingIcon" />
              <p>
                {t("holding")}
                <br />
                {t("holdingsub")}
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
