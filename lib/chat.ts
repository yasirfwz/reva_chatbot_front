const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function sendChatMessage(text: string): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}/genai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from the real estate agent.");
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Chat API Error:", error);
    return "Sorry, I'm having trouble connecting right now. Please try again later!";
  }
}
