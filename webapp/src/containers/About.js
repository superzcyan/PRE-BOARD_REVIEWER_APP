import React from "react";

const About = () => {
  return (
    <div className="flex flex-col justify-start items-center sm:pt-0 pt-6 xl:bg-meditation bg-contain bg-no-repeat bg-right-bottom">
      <h1 className="font-medium leading-tight text-3xl sm:text-5xl mb-2 text-maroon">
        About
      </h1>
      <div className="lg:w-2/3 px-6 text-xs">
        <p className="text-base text-justify font-light leading-relaxed mt-0 mb-4 text-gray-800">
          The <span className="font-semibold text-maroon">LET</span>'s
          <span className="font-semibold text-maroon"> Review</span> in
          <span className="font-semibold text-maroon"> MAPEH</span> is a
          research-based developmental study that aims to assist and help
          pre-service educators specializing in MAPEH to review materials
          effectively and efficiently. The main goal of this web application
          reviewer is to prepare students in taking the Board Licensure
          Examination for Teachers (BLEPT) through the aid of two techniques,
          the spaced repetition, and hypercorrection.
        </p>
        <p className="text-base text-justify font-light leading-relaxed mt-0 mb-4 text-gray-800">
          <span className="font-semibold text-maroon">Spaced repetition</span>{" "}
          is a sensible and cost-effective technique of review and practice that
          intends to improve a variety of learning skills such as remembering,
          problem-solving, and generalization to new settings, and has a huge
          amount of potential for enhancing educational outcomes. The term
          “spaced repetition” pertains to the interval of review when
          test-takers obtained several incorrect answers.
        </p>
        <p className="text-base text-justify font-light leading-relaxed mt-0 mb-4 text-gray-800">
          <span className="font-semibold text-maroon">Hypercorrection </span>
          pertains to the finding that errors committed with a high level of
          confidence are easier to correct rather than low confidence when
          correct feedback is immediately given. Hypercorrection will be
          utilized as one of the techniques in correcting the students' high
          level of confidence in misconceptions.
        </p>
      </div>
    </div>
  );
};

export default About;
