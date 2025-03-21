"use client";
import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Parser } from "expr-eval";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (number: string) => {
    if (shouldResetDisplay) {
      setDisplay(number);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === "0" ? number : display + number);
    }
  };

  const handleOperator = (operator: string) => {
    setShouldResetDisplay(true);
    setEquation(equation + " " + display + " " + operator + " ");
  };
  const handleOpenParenthesis = (parenthesis: string) => {
    setShouldResetDisplay(true);
    setEquation(equation + " " + parenthesis);
  };
  const handleCloseParenthesis = (parenthesis: string) => {
    setShouldResetDisplay(true);
    setEquation(equation + " " + display + " " + parenthesis);
  };
  const handleEqual = () => {
    try {
      const parser = new Parser();

      const result = parser.evaluate(equation + display);
      setDisplay(String(result));
      setEquation("");
    } catch (error) {
      setDisplay("Error: " + error);
    }
    setShouldResetDisplay(true);
  };
  const handleRemoveNumber = () => {
    setDisplay(display.slice(0, -1));
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
  };
  return (
    <div
      className="bg-black/70
           rounded-3xl p-4 text-right text-2xl
           text-white font-light border border-white/10; shadow-3xl"
    >
      <div
        className="calc-display bg-white/5 p-4 rounded-2xl overflow-hidden mb-4 justify-end flex
        w-full h-24 text-right text-white font-light"
      >
        <div className="flex flex-col gap-2 w-full">
          <div className="calc-result pb-2 text-xl font-thin h-6">
            {equation}
          </div>
          <div className="calc-input font-medium p-0">{display}</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Button size="lg" onClick={() => handleRemoveNumber()}>
          CN
        </Button>
        <Button size="lg" onClick={() => handleClear()}>
          C
        </Button>
        <Button size="lg" onClick={() => handleOpenParenthesis("(")}>
          (
        </Button>
        <Button size="lg" onClick={() => handleCloseParenthesis(")")}>
          )
        </Button>
        <Button size="lg" onClick={() => handleNumber("7")}>
          7
        </Button>
        <Button size="lg" onClick={() => handleNumber("8")}>
          8
        </Button>
        <Button size="lg" onClick={() => handleNumber("9")}>
          9
        </Button>
        <Button size="lg" onClick={() => handleOperator("*")}>
          *
        </Button>
        <Button size="lg" onClick={() => handleNumber("4")}>
          4
        </Button>
        <Button size="lg" onClick={() => handleNumber("5")}>
          5
        </Button>
        <Button size="lg" onClick={() => handleNumber("6")}>
          6
        </Button>
        <Button size="lg" onClick={() => handleOperator("-")}>
          -
        </Button>
        <Button size="lg" onClick={() => handleNumber("1")}>
          1
        </Button>
        <Button size="lg" onClick={() => handleNumber("2")}>
          2
        </Button>
        <Button size="lg" onClick={() => handleNumber("3")}>
          3
        </Button>
        <Button size="lg" onClick={() => handleOperator("+")}>
          +
        </Button>
        <Button size="lg" onClick={() => handleNumber("0")}>
          0
        </Button>
        <Button size="lg" onClick={() => handleNumber(".")}>
          .
        </Button>
        <Button size="lg" onClick={() => handleEqual()}>
          =
        </Button>
        <Button size="lg" onClick={() => handleOperator("/")}>
          /
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
