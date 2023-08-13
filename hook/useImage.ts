import imagePath from '../assets/default_background_image.jpg';
import { ImageReturn } from '../types';
import useLocalStorage from './useLocalStorage';

export const DEFAULT_IMAGE = {
  id: 'mYBybDaWUzM',
  url: 'https://unsplash.com/photos/mYBybDaWUzM',
  short_url: 'https://unsplash.com/photos/mYBybDaWUzM',
  views: 2462,
  favorites: 13,
  source: '',
  purity: 'sfw',
  category: 'general',
  dimension_x: 1920,
  dimension_y: 1080,
  resolution: '1920x1080',
  ratio: '1.78',
  file_size: 174009,
  file_type: 'image/png',
  created_at: '2020-02-01 00:43:48',
  colors: ['#000000', '#cc6633', '#663300', '#996633', '#424153'],
  path: imagePath,
  thumbs: {
    large: 'https://th.wallhaven.cc/lg/zm/zmrz9y.jpg',
    original: 'https://th.wallhaven.cc/orig/zm/zmrz9y.jpg',
    small: 'https://th.wallhaven.cc/small/zm/zmrz9y.jpg',
  },
};

export function useImage() {
  return useLocalStorage<ImageReturn>('image', DEFAULT_IMAGE);
}
