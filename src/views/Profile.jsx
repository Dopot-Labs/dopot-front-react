import "../styles/globals.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import ProfileHero from "../assets/img/pc-hero-img.png";
import ProfileIconArrowLeft from "../assets/img/profile-icon-arrow-left.png";
import ProfileImg from "../assets/img/profile-img.png";
import ProfileIcon1 from "../assets/img/profile-icon-1.png";
import ProfileIcon2 from "../assets/img/profile-icon-2.png";
import ProfileIcon3 from "../assets/img/profile-icon-3.png";
import ProfileIcon4 from "../assets/img/profile-icon-4.png";
import ProfileIconGrd1 from "../assets/img/profile-icon-grd-1.png";
import ProfileIconGrd2 from "../assets/img/profile-icon-grd-2.png";
import BlogImg from "../assets/img/void.jpg";
import ProfileCardLeft from "../components/Profile/ProfileCardLeft";
import React, { useState, useEffect } from 'react';
import { getRecoil, setRecoil } from 'recoil-nexus';
import { addressState } from '../recoilState';

import "react-circular-progressbar/dist/styles.css";
import SmallProject from "../components/SmallProject";
import SmallTier from "../components/SmallTier";
import { retriveFavorites, retriveInvestment } from "../utils/firebase/retriveInfo";

const Profile = () => {
  
  const [investedCard, setinvestedCard] = useState([]);
  const [favoriteCard, setfavoriteCard] = useState([]);

  useEffect(() => {
    // Update the document title using the browser API
    async function fetchData() {


      var invested = await retriveInvestment()      
      var tempCard =[] 
      for (let index = 0; index < invested.length; index++) {
        const element = invested[index];
        tempCard.push( <SmallTier address={element.addressContract} tier={element.tier}></SmallTier>)
      }
      setinvestedCard(tempCard)


      var favorites = await retriveFavorites()      
      var tempCard =[] 
      for (let index = 0; index < favorites.length; index++) {
        const element = favorites[index];
        tempCard.push( <SmallProject address={element.addressContract} tier={element.tier}></SmallProject>)
      }
      setfavoriteCard(tempCard)

    }

    fetchData();
    
  },[])


  const percentage = 65;
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
                  <h3>Profilo di {getRecoil(addressState).toString().substring(0, 10) + "..."}</h3>
                  <img src={ProfileImg} alt="ProfileImg" />
                </div>
              </div>
              <div className="pts-right">
                <div className="pts-right-grid">
                  <div className="pts-right-grid-card">
                    <img src={ProfileIcon1} alt="ProfileIcon" />
                    <p>Panoramica</p>
                  </div>
                  <div className="pts-right-grid-card">
                    <img src={ProfileIcon2} alt="ProfileIcon" />
                    <p>Crea Campagna</p>
                  </div>
                  <div className="pts-right-grid-card">
                    <img src={ProfileIcon3} alt="ProfileIcon" />
                    <p>I Miei NFT</p>
                  </div>
                  <div className="pts-right-grid-card">
                    <img src={ProfileIcon4} alt="ProfileIcon" />
                    <p>I Miei Progetti</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="pts-icons-box">
          <div className="pts-icons-card">
            <img src={ProfileIconGrd1} alt="ProfileIconGrd" />
            <p>I miei Investimenti</p>
          </div>
          <div className="pts-icons-card-1">
            <img src={ProfileIconGrd2} alt="ProfileIconGrd" />
            <p>I miei preferiti</p>
          </div>
        </div>

        <section className="profile-bottom">
          <div className="box">
            <div className="profile-main-grid">
            <div className="pmg-left">
            {investedCard}
            </div>
              <div className="pts-icons-box-1">
                <div className="pts-icons-card-1">
                  <img src={ProfileIconGrd1} alt="ProfileIconGrd" />
                  <p>I miei Investimenti</p>
                </div>
                <div className="pts-icons-card">
                  <img src={ProfileIconGrd2} alt="ProfileIconGrd" />
                  <p>I miei preferiti</p>
                </div>
              </div>
              <div className="pmg-right">

              {favoriteCard}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
