import React, { useState } from "react";
import PlusGrdIcon from "../../assets/img/plus-grd-icon.png";

const Faq = (props) => {
  const [val, setVal] = useState([]);
  const handleAdd = (e) => {
    e.preventDefault();
    const abc = [...val, []];
    setVal(abc);
  };
  const handleChange = (onChangeValue, i) => {
    const inputdata = [...val];
    inputdata[i] = onChangeValue.target.value;
    setVal(inputdata);
  };
  const handleDelete = (e, i) => {
    e.preventDefault();
    const deletVal = [...val];
    deletVal.splice(i-1, 1);
    const result = e.target.name.match(/^([^.]+)[.]+([^.]+)$/); 
    props.inputs[result[1]].splice(i,1);
    props.inputs[result[2]].splice(i,1);
    setVal(deletVal);
  };
  return (
    <>
      <div className="ins-input-box">
        <h1>Spiega le FAQ della tua campagna</h1>
        <h4>Quali sono le domande più frequenti che potresti ricevere?</h4>
        <div>
          <div className="container-plus">
            <input
              name="titoloDomanda"
              onChange={(e) => props.handleChangeArray(e, 0)}
              type="text"
              placeholder="Scrivi la prima domanda"
            />

            <button key="titoloDomandaAdd" className="btn-plus-minus" onClick={handleAdd}>
              +
            </button>
          </div>
          <textarea
            name="rispostaDomanda"
            onChange={(e) => props.handleChangeArray(e, 0)}
            placeholder="Rispondi alla domanda"
          />
        </div>
        {val.map((data, i) => {
          return (
            <div key={"titolo" + i}>
              <div className="container-plus">
                <input
                  key={"titoloDomanda" + i}
                  name={"titoloDomanda"}
                  type="text"
                  onChange={(e) => props.handleChangeArray(e, i+1)}
                  placeholder="Scrivi la domanda"
                />
                <button
                  key={"titoloDomandaDel" + i}
                  name={"titoloDomanda.rispostaDomanda"}
                  className="btn-plus-minus"
                  onClick={(e) => handleDelete(e, i+1)}
                >
                  x
                </button>
              </div>
              <textarea
                key={"rispostaDomanda" + i}
                name={"rispostaDomanda"}
                placeholder="Rispondi alla domanda"
                onChange={(e) => props.handleChangeArray(e, i+1)}
              />
            </div>
          );
        })}
      </div>

      {(() => {
        if (props.setState != null) {
          return (
            <div className="add-btn-box">
              <a onClick={props.setState}>
                <img src={PlusGrdIcon} alt="PlusGrdIcon" />
              </a>
            </div>
          );
        }
      })()}

      <div className="proceed-btn-box">
        <input className="grd-btn dopot-btn-lg" type="submit" />
      </div>
    </>
  );
};

const FaqHeader = (props) => {
  return (
    <>
      <div className="ins-progress">
        <div className="ins-circle ins-circle-done">
          <p>Informazioni di base</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-done">
          <p>Questionario</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-done">
          <p>Progetto</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-done">
          <p>Prodotto</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-done">
          <p>NFTs Mint</p>
        </div>
        <div className="ins-line ins-line-done"></div>
        <div className="ins-circle ins-circle-active">
          <p>FAQ</p>
        </div>
      </div>
    </>
  );
};

export { Faq, FaqHeader };
