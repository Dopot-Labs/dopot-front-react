import React from "react";
import { useState, useCallback } from "react";
import IconInfoCard from "./IconInfoCard";
import IconInfoDai from "./IconInfoDai";
import PCDollarIcon from "../../assets/img/pc-dollar-icon.png";
import PCUserIcon from "../../assets/img/pc-person-icon.png";
import PCCalendarIcon from "../../assets/img/pc-calendar-icon.png";
import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import Flag from "react-world-flags";
import { addFavorites, postpone } from "../../utils/firebase/writeInfos";
// import IconHeart from "../../assets/img/pc-heart-icon-02.svg";
import IconHeart from "../../assets/img/heart-fav.svg";
import IconHeartActive from "../../assets/img/heart-fav-active.svg";
import { useTranslation } from "react-i18next";

const Card = (props) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const percentage = (props.progetto.funds / props.progetto.quota) * 100;
  const fundRaisingDeadline = props.progetto.fundRaisingDeadline;
  const isMyProject = fundRaisingDeadline < 0;
  const address = props.progetto.address;

  function handleRedirect(e) {
    navigate(`/card/${address}`);
    window.scrollTo(0, -1000000);
  }
  let desc = String(props.progetto.descProgetto);
  return (
    <div className="profile-box-dash">
      <div className="pmg-right-card">
        <div className="pmg-rc-left-card" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="settore">
              {/* <span className="box-bk-over-logo">{props.progetto.settore}</span> */}
            </div>
            <div style={{ marginBottom: "1rem" }} className="settore">
              <span className="box-bk-over-logo">
                {props.progetto.tipoCampagna}
              </span>
            </div>
          </div>
          <h3 className="box-bk-over-logo">{props.progetto.nomeAzienda}</h3>
          <h3 style={{ marginBottom: "2rem" }}>
            <span>
              <a
                className="link-social-new  box-bk-over-logo"
                href={props.progetto.sito}
                target="_blank"
              >
                {props.progetto.sito}
              </a>
            </span>
          </h3>

          <input
            type="checkbox"
            class="read-more-state"
            id="post-{props.progetto.nomeAzienda}"
          />
          <p class="read-more-target box-bk-over-logo">{desc}</p>

          {desc.length > 200 ? (
            <label
              for="post-{props.progetto.nomeAzienda}"
              class="read-more-trigger"
            ></label>
          ) : null}
        </div>

        <div className="pmg-rc-right">
          <div className="pc-hero-icon-grid">
            <IconInfoDai
              img={PCDollarIcon}
              text={props.progetto.funds}
              text2={`${t("of")} ${props.progetto.quota}`}
            />
            <IconInfoCard
              img={PCUserIcon}
              text={`${props.progetto.investorsNumber} ${t("investors")}`}
            />
            {
              <IconInfoCard
                img={PCCalendarIcon}
                text={
                  isMyProject
                    ? props.progetto.stateText
                    : `${fundRaisingDeadline} ${t("daysremaining")}`
                }
              />
            }
          </div>
          <div className="pc-70-box box-bk-over-logo">
            <p>
              {t("investmentcard")} <br /> {t("completedat")}
            </p>
            <div className="graph-box">
              <CircularProgressbar
                value={percentage}
                text={`${Math.round(percentage)}%`}
                strokeWidth={15}
              />
            </div>
          </div>
        </div>
        <div className="pmg-btn-box">
          <button onClick={handleRedirect} className="grd-btn dopot-btn-lg">
            {t("findoutmore")}
          </button>
          <div style={{ bottom: 0, right: 0 }}>
            <Flag code={props.progetto.nazioneAzienda} height="16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
