const API_KEY = "AIzaSyDENqzosMxBdU0Dvhpy8Z4I9WOYgy5rLvE"; 

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;


const callGemini = async (prompt) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const data = await response.json();
    console.log("FULL RESPONSE:", data);

    
    if (data.error) {
      return "Error: " + data.error.message;
    }

    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";

  } catch (error) {
    console.error(error);
    return "Error: " + error.message;
  }
};


const askAI = async () => {
  const question = document.getElementById("question").value;
  const answerBox = document.getElementById("answer");

  if (!question) {
    answerBox.innerText = "Please enter a question!";
    return;
  }

  answerBox.innerText = "Thinking... 🤔";

  const result = await callGemini(
    `Answer this question deeply but in plain text only. Do not use markdown, no headings, no bold , no symbols like # or *  you can use bullet points. Keep it simple:\n${question}`
  );
  answerBox.innerText = result;
};

//------------------------------------ Summarizer

const summarize = async () => {
  const text = document.getElementById("text").value;
  const summaryBox = document.getElementById("summary");

  if (!text) {
    summaryBox.innerText = "Please enter text!";
    return;
  }

  summaryBox.innerText = "Summarizing... ✍️";

  const result = await callGemini(
    `Summarize this in simple plain text. Do not use markdown, no bullet points, no symbols like # or *. Just normal sentences:\n${text}`
  );
  summaryBox.innerText = result;
};

// -------------------------------------------Idea Generator

const getIdeas = async () => {
  const idea = document.getElementById("idea").value;
  const list = document.getElementById("ideasList");

  if (!idea) {
    list.innerHTML = "<li>Please enter a topic!</li>";
    return;
  }

  list.innerHTML = "<li>Generating ideas... 💡</li>";

  const result = await callGemini(
      `Give exactly 5 creative ideas about: ${idea}.
Each idea must be only one short line.
Do not add any explanation.
Keep each idea under 10 words.
Do not use # or **.`
);

  const ideas = result.split("\n").filter(i => i.trim() !== ""); // convert aI idea in array 

  list.innerHTML = ideas.map(i => `<li>${i}</li>`).join(""); // variable add krraha hai {i}
}