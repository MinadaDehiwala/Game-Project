import axios from "axios";

export const fetchQuestion = async (setLoading, setImageURL, setSolution, setTimer, level, setMessage) => {
  setLoading(true); // Set loading to true before fetching the question
  try {
    const response = await axios.get("https://marcconrad.com/uob/tomato/api.php");
    const { question, solution } = response.data;
    setImageURL(question);
    setSolution(solution);
    resetTimer(setTimer, level);
    setLoading(false); // Set loading to false after fetching the question
  } catch (error) {
    console.error("Error fetching question:", error);
    setMessage("Failed to fetch the question. Please try again later.");
    setLoading(false); // Set loading to false in case of an error
  }
};

const resetTimer = (setTimer, level) => {
  switch (level) {
    case 10:
      setTimer(10);
      break;
    default:
      setTimer(180 - level * 10);
  }
};
