const TelegramBot = require('node-telegram-bot-api'),
    token = '793523871:AAGXzZ1w2G09C1-3fShmNv3bkCVvFcKXr3I',
    bot = new TelegramBot(token, {polling: true,}),
    Cron = require('cron').CronJob;

var sleep = require('system-sleep'),
    fs = require('fs'),
    Button = require('./button'),
    id;



bot.on('text', function(msg)
{
    var messageChatId = msg.chat.id;
    id = messageChatId;
    var messageText = msg.text;
    var messageDate = msg.date;
    var messageUsr = msg.from.username;

    if (messageText === '/say') {
        bot.sendMessage(messageChatId, 'Hello World!');
    }


});


bot.onText(/\/start/, (msg) => {
    var messageChatId = msg.chat.id;

    if (msg.chat.username != undefined) {
        fs.readFile('data/dataInfo.json', (err, buffer) => {
            let messageChatId = JSON.parse(buffer.toString());
            messageChatId[0]['UserId'][msg.chat.username] = msg.chat.id;
            fs.writeFileSync('data/dataInfo.json', JSON.stringify(messageChatId, null, 2), messageChatId);
        })
        bot.sendMessage(messageChatId, 'Добро пожаловать!!!\n' +
            'Вы используете информационного БОТА. \n' +
            'Тыкнув по команде /help вы узнаете все подробнее.'
        );
    } else {
        bot.sendMessage(messageChatId, 'Добро пожаловать!!!\n' +
            'Вы используете информационного БОТА. \n'
        );
        sleep(1000);

        bot.sendMessage(messageChatId, 'Извините, у нас не указано имя пользователя.\n' +
            'По этому вы не можете использовать весь функционал Бота \n'
        );
        sleep(1000);
        bot.sendMessage(messageChatId, 'Пожалуйста введите \n' +
            'имя пользователя, сделать это можно в настройках\n' +
            'После ввода имени пользователя кликните на команду\n' +
            '/username\n' +
            'После этого вам станет доступен полный функционал.\n' +
            'Спасибо!!!!\n'
        );
    }
    console.log(msg);
});

bot.onText(/\/username/, (msg) => {
    var messageChatId = msg.chat.id;
    if (msg.chat.username != undefined){
        fs.readFile('data/dataInfo.json', (err, buffer) => {
            let messageChatId = JSON.parse(buffer.toString());
            messageChatId[0]['UserId'][msg.chat.username] = msg.chat.id;
            fs.writeFileSync('data/dataInfo.json', JSON.stringify(messageChatId, null, 2), messageChatId);
        });

        bot.sendMessage(messageChatId, 'Спасибо что уделили время\n' +
            'и придумали свое имя пользователя.\n'
        );
        sleep(1000);
        bot.sendMessage(messageChatId, 'Теперь вам доступен весь функционал Бота'
        );
    }else{
        bot.sendMessage(messageChatId, 'Извините,\n' +
            ' ваше имя пользователя все также не заполнено'
        );
        sleep(1000);
        bot.sendMessage(messageChatId, 'Заполните его,\n' +
            'и тыкните на команду /username снова.'
        );
    }
    console.log(msg);
});

bot.onText(/\/help/, (msg) => {
    bot.sendMessage(id, 'Информация о Боте.\n' + id +
        'Этот бот может сообщать о курсе криптовалют, \n' +
        'Показывать погоду.\n' +
        'А также рассылать информационные сообщения.\n' +
        'О других возможностях Бота вы узнаете тыкнув на /commands\n'
    );

    console.log(msg);
});


bot.onText(/\/commands/, (msg) => {
    var messageChatId = msg.chat.id;
    bot.sendMessage(messageChatId, 'Все доступные команды бота\n' +
        '/start - Запуск бота.\n' +
        '/help - Информация о Боте\n' +
        '/commands - Все доступные команды Бота \n',
    );
    console.log(msg);
});




