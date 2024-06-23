import Section from "./Section";
import Heading from "./Heading";
import { benefits } from "../constants";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { useState, useEffect } from "react";
import { addButton, deleteButton, fitnessHeart, exchangeRate } from "../assets";
import Input from "./Input";
import partialTP from "../partialCalc";

const Ideas = () => {
  const [goals, setGoals] = useState([]);
  const [goalLotSize, setGoalLotSize] = useState("");
  const [goalPartialTPs, setGoalPartialTPs] = useState([""]);
  const [goalFinalTP, setGoalFinalTP] = useState("");

  useEffect(() => {
    const storedGoals = localStorage.getItem("goals");
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  }, []);

  function handleAddGoal() {
    // Validate goalLotSize, goalPartialTPs, and goalFinalTP
    if (
      !goalLotSize ||
      goalPartialTPs.some((partial) => partial.trim() === "") ||
      !goalFinalTP
    ) {
      return;
    }

    const targets = partialTP(
      goalPartialTPs.map(Number),
      Number(goalFinalTP),
      Number(goalLotSize)
    );

    const newGoal = { targets };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setGoalLotSize("");
    setGoalPartialTPs([""]);
    setGoalFinalTP("");
  }

  function handleAddPartialTP() {
    let latestPartialTPs = goalPartialTPs.length;
    latestPartialTPs = goalPartialTPs[latestPartialTPs - 1].length;

    if (latestPartialTPs > 0) {
      setGoalPartialTPs((prevValue) => [...prevValue, ""]);
    }
  }

  function handlePartialTPChange(value, index) {
    const updatedPartialTPs = [...goalPartialTPs];
    updatedPartialTPs[index] = value;
    setGoalPartialTPs(updatedPartialTPs);
  }

  function handleDeleteGoal(index) {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  }

  return (
    <Section id="targets" customPaddings="p-0">
      <div className="container relative z-2 mt-10 lg:mt-5">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Set Targets, Crush Them, and Set More"
        />
        <div className="flex flex-wrap gap-10 mb-10">
          {goals.length > 0 &&
            goals.map((goal, index) => (
              <div
                className="block relative 
                p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] 
                border-2 border-n-4 rounded-s-[2rem] rounded-e-[3rem] overflow-hidden"
                key={index}
              >
                <button
                  onClick={() => {
                    handleDeleteGoal(index);
                  }}
                  className="cursor-pointer absolute top-[12%] left-[70%] z-10"
                >
                  <img
                    width={48}
                    height={48}
                    src={deleteButton}
                    alt="Delete Button"
                    className="cursor-pointer"
                  />
                </button>
                <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                  <div className="flex flex-col justify-center items-start gap-4 min-w-56">
                    {goal.targets.map((target, index) => (
                      <h5
                        key={index}
                        className="h5 my-2 font-code max-w-[12rem] whitespace-normal break-words"
                      >
                        {target}
                      </h5>
                    ))}
                  </div>

                  <div className="flex items-start py-5 border-t border-n-6" />
                  <div className="flex items-center mt-auto">
                    <img
                      src={exchangeRate}
                      width={48}
                      height={48}
                      alt="Exchange Rate"
                    />
                  </div>
                </div>
                {benefits[index % benefits.length].light && <GradientLight />}
                <div
                  className="absolute inset-0.5 bg-n-8"
                  style={{
                    clipPath: "url(#benefits)",
                  }}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                    {benefits[index % benefits.length].imageUrl && (
                      <img
                        src={benefits[index % benefits.length].imageUrl}
                        width={380}
                        height={362}
                        alt={benefits[index % benefits.length].title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <ClipPath />
              </div>
            ))}

          {goals.length < 6 ? (
            <div
              className="block relative p-0.25 bg-no-repeat bg-[length:100%_100%] max-w-fit
            md:max-w-[24rem] border-2 border-n-4 rounded-s-[2rem] rounded-e-[3rem] overflow-hidden"
            >
              <div className="relative z-2 flex flex-col justify-center items-center min-h-[22rem] p-[1.2rem]">
                <div className="flex flex-col justify-center items-center gap-3">
                  <Input
                    handleChange={setGoalLotSize}
                    value={goalLotSize}
                    name="goalLotSize"
                    label="Lot Size"
                  />

                  <div>
                    <label className="font-mono text-xs uppercase text-n-2 font-semibold">
                      Partial TPs
                    </label>
                    <div className="w-full grid grid-cols-2 gap-2">
                      {goalPartialTPs.map((partial, index) => (
                        <div key={index}>
                          <Input
                            handleChange={(value) =>
                              handlePartialTPChange(value, index)
                            }
                            value={partial}
                            name={`goalPartialTP-${index}`}
                            array
                          />
                        </div>
                      ))}
                      {goalPartialTPs.length < 4 ? (
                        <button
                          className={`${
                            goalPartialTPs.length < 4
                              ? "cursor-pointer"
                              : " cursor-not-allowed"
                          } w-[4rem] flex justify-center items-center`}
                          disabled={goalPartialTPs.length >= 4}
                          onClick={handleAddPartialTP}
                        >
                          <img
                            src={addButton}
                            alt="Add Button"
                            width={24}
                            height={24}
                          />
                        </button>
                      ) : null}
                    </div>
                  </div>

                  <Input
                    handleChange={setGoalFinalTP}
                    value={goalFinalTP}
                    name="goalFinalTP"
                    label="Final TP"
                  />
                </div>
                <button
                  className={`${
                    goals.length < 6 ? "cursor-pointer" : " cursor-not-allowed"
                  }`}
                  disabled={goals.length >= 6}
                  onClick={handleAddGoal}
                >
                  <img
                    src={addButton}
                    alt="Add Button"
                    width={48}
                    height={48}
                  />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
};

export default Ideas;
