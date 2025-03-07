import fetch from "node-fetch";

const chatbot = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }],
            }),
        });

        const data = await response.json();
        console.log("API Response:", JSON.stringify(data, null, 2)); // Debugging log

        if (!response.ok || data.error) {
            return res.status(response.status).json({ error: data.error?.message || "Failed to fetch AI response" });
        }

        // Extract AI response
        const botReply = data.candidates?.[0]?.content?.parts?.map(part => part.text).join(" ") || "I'm not sure how to respond.";

        botReply = botReply
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")  // Convert **text** to <strong>text</strong>
            .replace(/\*(.*?)\*/g, "$1")  // Remove * used for bullet points
            .replace(/\n+/g, " ")  // Convert newlines into spaces for a clean paragraph
            .replace(/\s+/g, " ")  // Remove extra spaces

        // Shorten response: Keep key parts only
        const sentences = botReply.split(". ");
        botReply = sentences.slice(0, 3).join(". ") + ".";
        
        res.json({ reply: botReply });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default chatbot;
