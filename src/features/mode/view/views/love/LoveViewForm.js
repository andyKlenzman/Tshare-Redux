import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addLoveInput } from "../../../settings/data/asyncThunks";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { selectViewerSettings } from "../../../settings/data/selectors";
import { selectUtils } from "../../../settings/data/selectors";
/*
Purpose: Collecting response from viewer, using conditional rendering based on the users conditional settings to render the type of form, including collecting phone number or asking on date. 

*/

const LoveViewForm = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const utils = useSelector(selectUtils);
  const [response, setResponse] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({})
 


  const handleResponse = (response) => {
    setResponse(`${response}`);
  };


  const validate = (values ) => {
    let errors = {}
    
    if(!values.contactInfo) {
      errors.contactInfo = "Required"
    }
    if(values.contactInfo.length > 30) {
      errors.contactInfo = "Too long"
    }
   
    
    if(values.name.length > 30) {
      errors.name = "Too long"
    }
    if(!values.name) {
      errors.name = "Required"
    }
    setErrors(errors)
    return errors

  }



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { contactInfo: "", name: "", pid, response },
    
    onSubmit: (values) => {
      const err = validate(values)
      if(Object.keys(err).length !== 0){
        return
      }
      
      
      dispatch(addLoveInput(values)).then(() => {
        setIsSubmitted(true)
      });
    },
  });

  return (
    <div className="pb-4">
      
      <div className="flex max-w-screen-sm m-auto">
        <div
          onClick={() => handleResponse("yes")}
          className=" text-xl flex-auto p-3 m-2 bg-green-600 rounded-xl bg-opacity-80 hover:bg-opacity-100"
        >
          Yes
        </div>
        <div
          onClick={() => handleResponse("maybe")}
          className="text-xl flex-auto text-slate-200 p-3 m-2 bg-yellow-600 rounded-xl bg-opacity-60 hover:bg-opacity-100"
        >
          Maybe
        </div>
        <div
          onClick={() => handleResponse("no")}
          className="text-xl text-slate-400 flex-auto p-3 m-2 bg-red-600 rounded-xl bg-opacity-30 "
        >
          No
        </div>
      </div>
      <form
        className="flex mt-4 flex-col max-w-screen-md mx-auto"
        onSubmit={formik.handleSubmit}
      >
        {response === "yes" && (
          <div className="flex flex-col border-t ">
            <p className="text-5xl mt-4 mb-2">Cool!</p>
            <p className="text-xl mb-2 text-slate-300  ml-3">
              Submit your contact information here and we can plan a time
            </p>
          </div>
        )}
        {response === "maybe" && (
          <div className="flex flex-col border-t">
            <p className="text-5xl mt-4 mb-2">Think it over!</p>
            <p className="text-xl mb-2 text-slate-300 text-start ml-3">
              If you'd like, submit your contact info here and we can talk about
              it over text
            </p>
          </div>
        )}
        {response === "no" && (
          <p className="text-2xl">
            Thank you for your honesty, have a wonderful day or night. ** insert
            person waving goodbye to someone on a ship
          </p>
        )}

        {(response !== "") & (response !== "no") ? (
          <div className="flex flex-col">
            <label className="ml-3 text-start flex">
            Name {errors.name && <p className="text-red-400 text-start ml-3">{errors.name}</p> }
          </label>
            <input
              name="name"
              type="name"
              placeholder="Your name"
              onChange={formik.handleChange}
              className=" disabled:text-slate-700 bg-[color:var(--hover-menu-bg)] border m-2 h-14 rounded-lg placeholder:text-gray-700 pl-[14px]"
              disabled={isSubmitted}
            />
            

            <label className="text-start ml-3 flex" >
            Phone number  {errors.contactInfo && <p className="text-red-400 text-start ml-3">{errors.contactInfo}</p> }
          </label>
            <input
              name="contactInfo"
              type="tel"
              placeholder="Your phone number"
              onChange={formik.handleChange}
              className="disabled:text-slate-700 bg-[color:var(--hover-menu-bg)] border m-2 h-14 rounded-lg  placeholder:text-gray-700 pl-[14px]"
              disabled={isSubmitted}
            />
           
            
            <button
              type="submit"
              className="text-xl  m-2 mt-2 mb-5 h-14 rounded-lg  hover:bg-[color:var(--hover-menu-bg)] border rounded-lg h-14 transition-all disabled:text-red-400"
            >
              {isSubmitted ? <p >
          Talk soon!
          </p> : <p>Submit</p>}
              
            </button>
            {isSubmitted}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default LoveViewForm;


