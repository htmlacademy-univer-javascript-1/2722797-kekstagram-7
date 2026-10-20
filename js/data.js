import {getRandomInteger, getRandomArrayElement} from './util.js';

const PHOTOS_COUNT = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MAX = 30;
const AVATARS_COUNT = 6;

const DESCRIPTIONS = [
  'Закат на набережной',
  'Утренний кофе перед работой',
  'Кот снова занял моё место',
  'Горы, о которых я мечтала весь год',
  'Новый район, новые впечатления',
  'Просто красивое небо',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = ['Артём', 'Мария', 'Кекс', 'Олег', 'Анна', 'Дмитрий', 'Ольга', 'Рудольф'];

let lastCommentId = 0;

const generateCommentId = () => {
  lastCommentId += 1;
  return lastCommentId;
};

const createMessage = () => {
  const firstSentence = getRandomArrayElement(MESSAGES);

  if (getRandomInteger(0, 1) === 0) {
    return firstSentence;
  }

  let secondSentence = getRandomArrayElement(MESSAGES);
  while (secondSentence === firstSentence) {
    secondSentence = getRandomArrayElement(MESSAGES);
  }

  return `${firstSentence} ${secondSentence}`;
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATARS_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createComments = () => {
  const comments = [];
  const commentsCount = getRandomInteger(0, COMMENTS_MAX);

  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment());
  }

  return comments;
};

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
  comments: createComments(),
});

const createPhotos = () => {
  const photos = [];

  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    photos.push(createPhoto(i));
  }

  return photos;
};

export {createPhotos};
