const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String, // имя — это строка
      required: [true, 'Поле "name" должно быть заполнено'], // оно должно быть у каждого пользователя, так что имя — обязательное поле
      minlength: 2, // минимальная длина имени — 2 символа
      maxlength: 30, // а максимальная — 30 символов
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(url) {
          const urlRegex = /https?:\/\/\S+\.\S+/gm;
          return urlRegex.test(url);
        },
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
