import "../styles/globals.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import ProfileHero from "../assets/img/pc-hero-img.png";
import ProfileIconArrowLeft from "../assets/img/profile-icon-arrow-left.png";
import ProfileImg from "../assets/img/profile-img.png";
import ProfileIcon1 from "../assets/img/profile-icon-1.png";
import ProfileIcon2 from "../assets/img/profile-icon-camp.png";
import ProfileIcon3 from "../assets/img/profile-icon-3.png";
import ProfileIcon4 from "../assets/img/profile-icon-4.png";
import ProfileIconGrd1 from "../assets/img/profile-icon-grd-1.png";
import ProfileIconGrd2 from "../assets/img/profile-icon-grd-2.png";
import BlogImg from "../assets/img/void.jpg";
import ProfileCardLeft from "../components/Profile/ProfileCardLeft";
import React, { useState, useEffect } from "react";
import { getRecoil, setRecoil } from "recoil-nexus";
import { addressState } from "../recoilState";

import "react-circular-progressbar/dist/styles.css";
import SmallProject from "../components/SmallProject";
import SmallTier from "../components/SmallTier";
import {
  retriveFavorites,
  retriveInvestment,
} from "../utils/firebase/retriveInfo";

const Profile = () => {
  return (
    <div className="app">
      <main className="profile-page">
        <section className="profile-top-section">
          <img className="profile-hero" src={ProfileHero} alt="ProfileHero" />
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
                  <img src={ProfileImg} alt="ProfileImg" />
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
                      <img src={ProfileIcon2} alt="ProfileIcon" />
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
                      <img className="" src={ProfileIcon4} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/myprojects"}>
                      <p>I Miei Progetti</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/xdao"}>
                      <img
                        className="myprojects-img"
                        src={ProfileIcon4}
                        alt="ProfileIcon"
                      />
                    </a>
                    <a href={"/#/xdao"}>
                      <p>xDao Widget</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/impostazioni"}>
                      <img src={ProfileIcon4} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/impostazioni"}>
                      <p>Impostazioni</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
