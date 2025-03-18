import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleButtonClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch (error) {
        setInput("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C"
  ];

  return (
    <div className="bg-gray-800 text-white p-4 rounded shadow w-64">
      <div className="mb-2 border border-gray-600 p-2 text-right rounded">
        {input || "0"}
      </div>

     
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => handleButtonClick(btn)}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded font-semibold"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
