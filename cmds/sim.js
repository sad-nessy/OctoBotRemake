const axios = require('axios');

module.exports = {
    description: "Talk to sim",
    role: "user",
    cooldown: 3,
    execute: async function(api, event, args, commands) {
        let { messageID, threadID, senderID, body } = event;
        let tid = threadID,
            mid = messageID;
        const content = encodeURIComponent(args.join(" "));
        if (!args[0]) {
            return api.sendMessage("Please type a message...", tid, mid);
        }
        try {
            const res = await axios.get(`https://sim-api-wdew.onrender.com/sim?q=${content}`);
            if (res.data.error) {
                api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
                    if (error) {
                        console.error(error);
                    }
                }, mid);
            } else {
                const response = res.data.response;
                api.sendMessage(response, tid, (error, info) => {
                    if (error) {
                        console.error(error);
                    }
                }, mid);
            }
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while fetching the data.", tid, mid);
        }
    }
};
