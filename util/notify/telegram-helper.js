const Telegraf      = require('telegraf');
const axios         = require('axios').default;
const { telegram }  = require("../../configs/index")["PROCESS_CONFIG"]["notification"];

class TELEGRAM_HELPER {
    constructor() {
        this.bot = null;
        this.telegramToken = telegram.telegramToken;
    }

    hasTelegramToken() {
        return (this.telegramToken != null);
    }

    normalizeChatId(chatId) {
        let ret = chatId;
        if (ret.startsWith("g")) ret = ret.substring(1);
        if (!ret.startsWith("-")) ret = "-" + ret;
        return ret;
    }

    async sendMessageToken(chatId, message) {
        if (!chatId) return false;

        try {
            if (this.bot==null) {
                this.bot = new Telegraf(this.telegramToken);
            }

            await this.bot.telegram.sendMessage(normalizeChatId(chatId), message);
            return true;
            
        } catch (error) {
            logger.error(`Unable to send message to chatId ${chatId}`, error);
        }
        return false
    }

    async sendMessageWs(chatId, message) {
        try {
            let link = config.telegramBot.apiUrl + this.normalizeChatId(chatId);

            await axios.post(link, {
                "message": message,
            }, {
                timeout: 60000,
            });

            logger.debug("Response for link", link, resp);
            return true;

        } catch (error) {
            logger.error(`Unable to send mesage to group: ${chatId}`, error);
            return false;
        }
    }

    async  sendMessage(chatId, message) {
        if (hasTelegramToken()) {
            return await this.sendMessageToken(chatId, message);
        } else {
            return await this.sendMessageWs(chatId, message);
        }
    }
}

module.exports = TELEGRAM_HELPER;