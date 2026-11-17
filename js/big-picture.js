const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const picturesContainer = document.querySelector('.pictures');

let currentComments = [];
let shownCommentsCount = 0;

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatar = document.createElement('img');
  avatar.classList.add('social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  avatar.width = 35;
  avatar.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;

  commentElement.appendChild(avatar);
  commentElement.appendChild(text);

  return commentElement;
};

const updateCommentsCount = () => {
  commentCountBlock.textContent = `${shownCommentsCount} из ${currentComments.length} комментариев`;
};

const renderNextComments = () => {
  const nextComments = currentComments.slice(
    shownCommentsCount,
    shownCommentsCount + COMMENTS_STEP
  );
  const fragment = document.createDocumentFragment();

  nextComments.forEach((comment) => {
    fragment.appendChild(createComment(comment));
  });

  commentsList.appendChild(fragment);
  shownCommentsCount += nextComments.length;
  updateCommentsCount();

  if (shownCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const openBigPicture = (photo) => {
  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  caption.textContent = photo.description;

  currentComments = photo.comments;
  shownCommentsCount = 0;
  commentsList.textContent = '';
  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  renderNextComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const initBigPicture = (photos) => {
  picturesContainer.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');

    if (!picture) {
      return;
    }

    evt.preventDefault();
    const photoId = Number(picture.dataset.photoId);
    const photo = photos.find((item) => item.id === photoId);

    if (photo) {
      openBigPicture(photo);
    }
  });

  commentsLoader.addEventListener('click', renderNextComments);
  closeButton.addEventListener('click', closeBigPicture);
};

export {initBigPicture};
