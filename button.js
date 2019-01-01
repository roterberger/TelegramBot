module.exports.keyboard = Button => {
    const openKeyboard = {
        reply_markup: {
            keyboard: [
                ["Aut", "Neg"],
            ],
            one_time_keyboard: true,
            resize_keyboard: true,
        },
    };

}