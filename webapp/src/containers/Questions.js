import React, { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { getDB } from "../firebase"; //getDatabase
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allQuestions,
  completedExam,
  examItems,
  reviewerInfo,
  timerStarted,
} from "./atoms";
import AnswerInfoModal from "./AnswerInfoModal";
import shuffle from "lodash/shuffle";
const Questions = () => {
  let navigate = useNavigate();
  const [reviewee, setReviewerInfos] = useRecoilState(reviewerInfo);
  const [, setAllQuestionSet] = useRecoilState(allQuestions);
  const [questionSet, setQuestionSet] = useState([]);
  const [completedQuestions, setCompletedQuestions] =
    useRecoilState(completedExam);
  const [currentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState();
  const [hasSelected, setHasSelected] = useState(false);
  const examCount = useRecoilValue(examItems);
  const [isTimerStarted, setIsTimerStarted] = useRecoilState(timerStarted);
  const [time, setTime] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [answerModal, setAnswerModal] = useState(false);
  //const toast = useRef(null);

  useEffect(() => {
    if (!reviewee.name) {
      navigate("../reviewer-info", { replace: true });
    }
  }, [navigate, reviewee.name]);

  //read data from database
  useEffect(() => {
    //setQuestionSet(questionsBank);
    onValue(ref(getDB), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).forEach((question) => {
          setAllQuestionSet(question.filter((x) => x.question !== undefined));
          //setQuestionSet(question.sort(() => 0.5 - Math.random()).splice(0, 5)); //will return random sorted questions
          const shuffledChoices = question
            .filter((x) => x.question !== undefined)
            .map((x) => {
              const shuffledChoices = shuffle(
                x.choices.filter((c) => c !== undefined) //shuffles choices
              );
              return { ...x, choices: shuffledChoices };
            });
          if (examCount === "ALL") {
            setQuestionSet(shuffle(shuffledChoices)); //will return random questions with examCount limit
          } else {
            setQuestionSet(shuffle(shuffledChoices).splice(0, examCount)); //will return random questions with examCount limit
          }
        });
      }
    });

    //reset all fields
    setCompletedQuestions([]);
  }, [examCount, setAllQuestionSet, setCompletedQuestions]);
  //function timer when while answering question.
  useEffect(() => {
    let interval = null;
    if (isTimerStarted && questionSet.length > 0) {
      interval = setInterval(() => {
        setTime((xtime) => xtime + 100);
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [time, isTimerStarted, questionSet]);

  const handleChoicesRadio = (value) => {
    setSelectedChoice(value);
    if (value) {
      setHasSelected(true);
    }
  };

  const onSubmit = () => {
    setTimeTaken(parseFloat(time / 1000));
    setIsTimerStarted(false);
    setAnswerModal(true);
  };

  const onClickAnsModal = () => {
    const toRequeue = questionSet.shift();
    const attempt = toRequeue.attempts ? toRequeue.attempts : 0;
    if (selectedChoice.isCorrect === true) {
      const category =
        timeTaken < 20
          ? "easy"
          : timeTaken > 20 && timeTaken < 60
          ? "moderate"
          : timeTaken > 60
          ? "hard"
          : "";
      //will add total score if select choice is correct
      setScore(score + 1);
      //will push question to completed question if select choice is correct
      setCompletedQuestions([
        ...completedQuestions,
        {
          ...toRequeue,
          category: attempt > 0 ? toRequeue.category : category,
          attempts: attempt + 1,
          timeTaken: attempt > 0 ? toRequeue.timeTaken : timeTaken,
        },
      ]);
    } else {
      if (!toRequeue.attempts) {
        //if answer is incorrect and question falls to easy category, will re-queue to last question item.
        if (timeTaken < 20) {
          questionSet.push({
            ...toRequeue,
            category: "easy",
            attempts: 1,
            timeTaken: timeTaken,
          });
        }
        //if answer is incorrect and question falls to moderate category, will re-queue to 20th item if question still more than 20, if not, will requeue last.
        else if (timeTaken > 20 && timeTaken < 60) {
          //will replace the current 20th position with current question with incorrect answer
          questionSet.splice(
            questionSet.length > 19 ? 19 : questionSet.length,
            0,
            {
              ...toRequeue,
              category: "moderate",
              attempts: 1,
              timeTaken: timeTaken,
            }
          );
        }
        //if answer is incorrect and question falls to hard category, will re-queue to 20th item if question still more than 10, if not, will requeue last.
        else if (timeTaken > 60) {
          //will replace the current 20th position with current question with incorrect answer
          questionSet.splice(
            questionSet.length > 9 ? 9 : questionSet.length,
            0,
            {
              ...toRequeue,
              category: "hard",
              attempts: 1,
              timeTaken: timeTaken,
            }
          );
        }
      } else {
        const currentAttempts = toRequeue.attempts;
        if (toRequeue.category === "easy") {
          questionSet.push({
            ...toRequeue,
            attempts: currentAttempts + 1,
          });
        } else if (toRequeue.category === "moderate") {
          questionSet.splice(
            questionSet.length > 19 ? 19 : questionSet.length,
            0,
            {
              ...toRequeue,
              attempts: currentAttempts + 1,
            }
          );
        } else if (toRequeue.category === "hard") {
          questionSet.splice(
            questionSet.length > 9 ? 9 : questionSet.length,
            0,
            {
              ...toRequeue,
              attempts: currentAttempts + 1,
            }
          );
        }
      }
    }
    if (questionSet.length > 0) {
      setIsTimerStarted(true);
    } else {
      navigate("../exam-completed", { replace: true });
    }
    if (questionSet.length > 1) {
      setHasSelected(false);
    }

    setAnswerModal(false);
    setTime(0);
  };

  return (
    <>
      {/* <span className="text-center">{parseFloat(time / 1000)}</span> */}
      <div
        className="flex justify-center md:items-center items-start pt-8 md:pt-0 
      lg:items-center sm:bg-diary bg-contain bg-no-repeat bg-right-bottom h-screen text-gray-800"
      >
        {questionSet.length > 0 && (
          <div
            className="flex flex-col justify-center sm:w-9/12 bg-white space-y-2 rounded-md md:border-2 
          sm:px-6 px-4 md:pt-2 md:pb-4 sm:shadow-lg"
          >
            <div>
              <div className="text-left py-4">
                {questionSet.length > 0 && questionSet[currentQ].question}
              </div>
              <div className="mx-auto w-full text-left py-2">
                <RadioGroup
                  value={selectedChoice}
                  onChange={handleChoicesRadio}
                >
                  <div className="space-y-2">
                    {questionSet.length > 0 &&
                      questionSet[currentQ].choices.map((choice, index) => (
                        <RadioGroup.Option
                          key={index}
                          value={choice}
                          className={({ active, checked }) =>
                            `${checked && "font-semibold bg-sky-200"}
                    relative flex cursor-pointer px-4 py-2 focus:outline-none rounded-lg `
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center">
                                  <div className="flex flex-row gap-2 items-center text-sm">
                                    <input
                                      className="mt-0.5 cursor-pointer	"
                                      type="radio"
                                      name="choices"
                                      checked={checked}
                                      onChange={() => {}}
                                    />

                                    <RadioGroup.Label as="p">
                                      {choice.choice}
                                    </RadioGroup.Label>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                  </div>
                </RadioGroup>
              </div>
              <div className="w-full sm:py-2 py-4">
                <PrimaryButton
                  buttonText="Submit"
                  type="submit"
                  className={`${!hasSelected && "opacity-25"}`}
                  disabled={!hasSelected}
                  onClick={() => onSubmit()}
                />
              </div>
            </div>
          </div>
        )}

        {answerModal && (
          <AnswerInfoModal
            selectedChoice={selectedChoice}
            correctChoice={
              questionSet[currentQ].choices.filter(
                (choice) => choice.isCorrect === true
              )[0]
            }
            answerModal={answerModal}
            onClickAnsModal={onClickAnsModal}
            setAnswerModal={setAnswerModal}
          />
        )}
      </div>
    </>
  );
};
export default Questions;
