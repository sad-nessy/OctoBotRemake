module.exports = {
    description: "Greet the user with a random message and a sticker when they say 'hi' or 'hello'",
    role: "user", // Adjust as necessary
    cooldown: 0,
    execute: async function(api, event, args, commands) {
        const message = event.body.toLowerCase();
        const greetings = ["hi", "hello", "yo", "zup"];

        // Array of random welcome messages
        const welcomeMsg = [
            "Hi {name}! How can I assist you today?",
            "Hello {name}! What can I do for you?",
            "Hey {name}! Need any help?",
            "Greetings {name}! How's it going?",
            "Hiya {name}! What brings you here today?"
        ];

        // Check if the message is a greeting without any prefix
        if (greetings.includes(message)) {
            try {
                const userInfo = await api.getUserInfo(event.senderID);
                const userName = userInfo[event.senderID].firstName;

                // Randomly select a welcome message
                const randomMsg = welcomeMsg[Math.floor(Math.random() * welcomeMsg.length)].replace("{name}", userName);

                // Send greeting message
                api.sendMessage(randomMsg, event.threadID, (err) => {
                    if (err) {
                        console.error("Error sending message:", err);
                    } else {
                        // Send stickermoji (replace with actual sticker ID you want to use)
                        const stickerId = '369239263222822'; // Example sticker ID
                        api.sendMessage({ sticker: stickerId }, event.threadID);
                    }
                }, event.messageID);
            } catch (error) {
                console.error("Error fetching user info:", error);

                // Fallback to a generic message if user info fetch fails
                const randomMsg = welcomeMsg[Math.floor(Math.random() * welcomeMsg.length)].replace("{name}", "there");

                // Send greeting message
                api.sendMessage(randomMsg, event.threadID, (err) => {
                    if (err) {
                        console.error("Error sending message:", err);
                    } else {
                        // Send stickermoji (replace with actual sticker ID you want to use)
                        const stickerId = '369239263222822'; // Example sticker ID
                        api.sendMessage({ sticker: stickerId }, event.threadID);
                    }
                }, event.messageID);
            }
        }
    }
};
