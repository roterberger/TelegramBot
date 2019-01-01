var TelegramBot = require('node-telegram-bot-api'),
    Cron = require('cron').CronJob,
    request = require('request'),
    token = '793523871:AAGXzZ1w2G09C1-3fShmNv3bkCVvFcKXr3I';

var bot = new TelegramBot(token, {
    polling: true,
});



bot.on('message', function (msg) {
    var id = msg.from.id;
    bot.sendMessage(id, msg.text);
    console.log(msg);
});


var job = new Cron('0,30 * * * * *', function () {

    var chatId = 495108914,
        url = 'http://www.umori.li/api/random?site=bash.im&name=bash&num=1';



    request(url, function (error, response, body) {
        var data = JSON.parse(body);
        bot.sendMessage(chatId, data[0].elementPureHtml);
    })
});
job.start();