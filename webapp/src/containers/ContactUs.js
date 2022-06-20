import React from "react";
import AbigailM from "../assets/contactus/AbigailM.png";
import AlgenrevS from "../assets/contactus/AlgenrevS.png";
import AngelQ from "../assets/contactus/AngelQ.png";
import JohnIvanA from "../assets/contactus/JohnIvanA.png";
import JohnPM from "../assets/contactus/JohnPM.png";
import JuliusC from "../assets/contactus/JuliusC.png";
const ContactUs = () => {
  return (
    <section className="">
      <div className="text-center pt-8">
        <h1 className="font-medium leading-tight text-2xl md:text-5xl mt-0 mb-4 text-maroon">
          Contact Us
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 text-center text-maroon sm:px-16">
        <div className="mb-12 md:mb-0">
          <div className="flex justify-center mb-6">
            <img alt="contact" src={JohnIvanA} className="h-40 w-50" />
          </div>
          <h5 className="text-xl font-semibold">John Ivan F. Almario</h5>
          <h6 className="font-semibold text-blue-600 mb-2">
            2019994462@dhvsu.edu.ph
          </h6>
        </div>
        <div className="mb-12 md:mb-0">
          <div className="flex justify-center mb-6">
            <img alt="contact" src={AngelQ} className="h-40 w-50" />
          </div>
          <h5 className="text-xl font-semibold">Angel S. Quiambao</h5>
          <h6 className="font-semibold text-blue-600 mb-2">
            2019994514@dhvhsu.edu.ph
          </h6>
        </div>
        <div className="mb-12 md:mb-0">
          <div className="flex justify-center mb-6">
            <img alt="contact" src={AlgenrevS} className="h-40 w-50" />
          </div>
          <h5 className="text-xl font-semibold">Algenrev M. Sangalang</h5>
          <h6 className="font-semibold text-blue-600 mb-2">
            2019994603@dhvsu.edu.ph
          </h6>
        </div>
        <div className="mb-12 md:mb-0">
          <div className="flex justify-center mb-6">
            <img alt="contact" src={AbigailM} className="h-40 w-50" />
          </div>
          <h5 className="text-xl font-semibold">Abigail M. Manlutac</h5>
          <h6 className="font-semibold text-blue-600 mb-2">
            2019994623@dhvsu.edu.ph
          </h6>
        </div>
        <div className="mb-12 md:mb-0">
          <div className="flex justify-center mb-6">
            <img alt="contact" src={JuliusC} className="h-40 w-50" />
          </div>
          <h5 className="text-xl font-semibold">
            Julius Ceazar G. Tolentino, MPES, MSHMS
          </h5>
          <h6 className="font-semibold text-blue-600 mb-2">
            jcgtolentino@dhvsu.edu.ph
          </h6>
        </div>
        <div className="mb-12 md:mb-0">
          <div className="flex justify-center mb-6">
            <img alt="contact" src={JohnPM} className="h-40 w-50" />
          </div>
          <h5 className="text-xl font-semibold">John Paul P. Miranda, MIT</h5>
          <h6 className="font-semibold text-blue-600 mb-2">
            jppmiranda@dhvsu.edu.ph
          </h6>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
