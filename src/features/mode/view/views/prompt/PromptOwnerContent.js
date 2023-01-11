import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup } from "react-bootstrap";
import { selectPromptDetails } from "../../../settings/data/selectors";

const PromptOwnerContent = () => {
  return (
    <div className="max-w-screen-md mx-auto">
      <PromptHeader />

      <PromptResponses />
    </div>
  );
};

export default PromptOwnerContent;

const PromptHeader = () => {
  const { customPrompt, promptType, promptTitle } =
    useSelector(selectPromptDetails);

  return (
    <div className="border-b mt-5 mb-4 py-4 mx-3 ">
      <div className="my-auto  text-4xl md:text-5xl font-display font-bold mb-2">
        {promptTitle}
      </div>
      <div className="flex justify-center text-lg font-display md:text-2xl font-slate-300 ">
        {promptType === "custom" && <p>{customPrompt}</p>}
        {promptType === "poem" && <p>Craft some organic, communal poetry</p>}
        {promptType === "story" && (
          <p>Spin a yarn. That means tell a story. Together. </p>
        )}
      </div>
    </div>
  );
};

const PromptResponses = () => {
  const { responses } = useSelector(selectPromptDetails);

  return (
    <div className="flex">
      <div className=" ml-3 sm:ml-0 sm:w-1/12 md:w-2/12 "></div>
      <ol class="relative border-l border-gray-200 dark:border-gray-700 ml-3">
        {responses.map((res, idx) => {
          return (
            <li class="mb-10 text-white ml-4 text-start">
              <div class="absolute w-3 h-3 first:bg-green-400 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
              <h3 class="text-lg font-semibold text-gray-200 ">{res.text}</h3>
              <p class="mb-4 text-base font-normal text-gray-400 ">
                {res.name}
              </p>
            </li>
          );
        })}
        <li class="mb-10 ml-4 text-start"> </li>
      </ol>
    </div>
  );
};
