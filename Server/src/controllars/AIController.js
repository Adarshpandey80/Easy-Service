const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");


const handleTextRequest = async (req, res) => {
  try {
    const { message } = req.body;

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      apiKey: process.env.GEN_KEY,
      streaming: true,
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await model.stream(message);
    console.log(stream)
    console.log(stream.content)

    let fullResponse = "";

    for await (const chunk of stream) {
      let text = "";

      if (typeof chunk.content === "string") {
        text = chunk.content;
      } else if (Array.isArray(chunk.content)) {
        text = chunk.content.map(c => c.text || "").join("");
      }

      fullResponse += text;

      // res.write(`data: ${JSON.stringify(text)}\n\n`);
      res.write(`data: ${text}\n\n`);

    }

    res.write("data: [DONE]\n\n");
    res.end();

  } catch (error) {
    console.error("STREAM ERROR:", error);

    if (!res.headersSent) {
      return res.status(500).json({ error: error.message });
    }

    res.write(`data: ERROR: ${error.message}\n\n`);
    res.write("data: [DONE]\n\n");
    res.end();
  }
};

module.exports = {
  handleTextRequest,
};