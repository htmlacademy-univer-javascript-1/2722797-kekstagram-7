
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
  }
};

function openForm() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeForm() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  uploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
}

uploadInput.addEventListener('change', openForm);
closeButton.addEventListener('click', closeForm);


const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const pristine = new window.Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'form-error'
});

const getHashtags = (value) => value.trim().toLowerCase().split(/\s+/).filter(Boolean);

const validateHashtags = (value) => {
  const hashtags = getHashtags(value);
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;

  return hashtags.length <= 5 &&
    hashtags.every((hashtag) => hashtagPattern.test(hashtag)) &&
    new Set(hashtags).size === hashtags.length;
};

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  'Не более 5 уникальных хэштегов. Каждый начинается с #, содержит только буквы и цифры, максимум 20 символов.'
);

pristine.addValidator(
  descriptionInput,
  (value) => value.length <= 140,
  'Комментарий не должен превышать 140 символов'
);

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

[hashtagsInput, descriptionInput].forEach((input) => {
  input.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
});
