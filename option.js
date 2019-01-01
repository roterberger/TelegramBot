const TelegramBot = require('node-telegram-bot-api'),
    token = '793523871:AAGXzZ1w2G09C1-3fShmNv3bkCVvFcKXr3I',
    bot = new TelegramBot(token, {polling: true,});

var sleep = require('system-sleep'),
    fs = require('fs'),
    Button = require('./button'),
    id;







var Game = [
    {
        title:'Загадайте число.',
        buttons: [
            [{ text: 'Есть.', callback_data: '0_1' }]
        ],
        right_answer: 1
    },
    {
        title:'Умножте его на 2',
        buttons: [
            [{ text: 'Есть', callback_data: '1_2' }]
        ],
        right_answer: 2
    },
    {
        title:'Умножте его на 10',
        buttons: [
            [{ text: 'Есть', callback_data: '1_3' }],
        ],
        right_answer: 3
    },
    {
        title:'Поделите на число которое задумали',
        buttons: [
            [{ text: 'Есть', callback_data: '1_4' }],
        ],
        right_answer: 4
    },

];
var b;


function newQuestion(msg){
    var arr = 1; // Получаем случайный вопрос
    var text = arr.title; // Вытаскиваем оттуда текст вопроса (Пример: title:'Чему равно 0 || "" || 2 || true ?')
    var options = {
        reply_markup: JSON.stringify({
            inline_keyboard: arr.buttons, // Добавляем кнопки, которые есть в вопросе.
        })
    };
    chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id; // Если сообщение отправлял пользователь, то свойство msg.chat.id, если же он кликал на кнопку, то msg.from.id
    bot.sendMessage(chat, text, options); // Отправляем пользователю сообщение: id пользователя, текст вопроса, кнопки.
}
// Отправив сообщение боту "/start_test", выполнится функция newQuestion(msg);
bot.onText(/\/game/, function (msg, match) {
    newQuestion(msg);
});

// Ответ от кнопок
bot.on('callback_query', function (msg) {
    var answer = msg.data.split('_'); // Делим ответ на две части, превратив в массив. Первый элемент номер вопроса, второй будет вариант ответа.
    var index = answer[0]; // Получаем номер вопроса
    var button = answer[1]; // И вариант ответа

    // Если присланный вариант совпадает с вариантом из массива
    if (questions[index].right_answer==button) {
        bot.sendMessage(msg.from.id, 'Ответ верный ✅');
    } else {
        bot.sendMessage(msg.from.id, 'Ответ неверный ❌');
    }

    // Отправляем еще один вопрос пользователю
    newQuestion(msg);
});