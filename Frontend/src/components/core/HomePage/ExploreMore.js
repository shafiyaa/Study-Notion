import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skill paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  // functions to set card value
  function setCards(value) {
    setCurrentTab(value);

    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  }

  return (
    <div className="flex flex-col items-center  relative md:h-[60vh] h-[120vh]">
      <h4 className="text-2xl md:text-3xl font-semibold">
        Unlock the <HighlightText text={"Power of Code"}></HighlightText>
      </h4>
      <p className="text-richblack-100 capitalize my-4">
        Learn to build anything you can imagine
      </p>

      {/* tab */}
      <div className="flex sm:rounded-full bg-richblack-800   px-3 ">
        {tabName.map((element, index) => {
          return (
            <div
              key={index}
              onClick={() => setCards(element)}
              className={`sm:text-base text-[14px] w-full gap-2 sm:rounded-full  cursor-pointer transition-all duration-200 hover:bg-richblack-900 hover:text-blue-600 sm:py-2 sm:px-3 py-1 px-2  text-center
                               ${
                                 currentTab === element
                                   ? "bg-richblack-900 text-blue-100 font-medium"
                                   : "text-richblack-600"
                               }
                            `}
            >
              {element}
            </div>
          );
        })}
      </div>

      {/* Card */}
      <div className=" flex flex-col gap-7  md:flex-row justify-evenly md:gap-6 items-center absolute lg:top-[55%] md:top-[37%]  top-[17%] w-11/12 ">
        {courses.map((element, index) => {
          return (
            <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            ></CourseCard>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
