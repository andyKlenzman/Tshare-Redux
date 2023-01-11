import { useSelector } from "react-redux";
import { selectFeedbackModeSettings } from "../../../settings/data/selectors";
import FeedbackViewForm from "./FeedbackViewForm";

const FeedbackView = () => {
  const settings = useSelector(selectFeedbackModeSettings);
  return <FeedbackViewForm />;
};

export default FeedbackView;
