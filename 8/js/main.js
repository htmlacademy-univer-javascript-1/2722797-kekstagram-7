import {createPhotos} from './data.js';
import {renderPhotos} from './render-photos.js';
import {initBigPicture} from './big-picture.js';

const photos = createPhotos();

renderPhotos(photos);
initBigPicture(photos);
