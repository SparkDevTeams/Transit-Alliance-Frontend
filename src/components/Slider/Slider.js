import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { FaWalking, FaBus } from "react-icons/fa";
import './styles.css'

const Slider = props => {
  const {step, length, setStep, currentStep = 0} = props;
  return (
    <>
      <p>
        {step?.departurePlace} <FiChevronRight />{" "}
        {step?.transitMode === "WALK" ? <FaWalking /> : <FaBus />}{" "}
        <FiChevronRight /> {step?.arrivalPlace}
      </p>
      <input
        className="slider"
        type="range"
        onChange={e => setStep(e.target.value)}
        min="0"
        max={length? length - 1 : 0}
        value={currentStep}
      />
    </>
  );
};

export default Slider;
