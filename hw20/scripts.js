'use strict';

$(() => {
    const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
    const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';

    const ALBUM_ITEM_CLASS = 'album-item';
    const PHOTO_ITEM_CLASS = 'photo-item';

    const albumsEl = document.querySelector('#albums');
    const photosEl = document.querySelector('#photos');

    const albumItemTemplate =
        document.querySelector('#albumItemTemplate').innerHTML;
    const photoItemTemplate =
        document.querySelector('#photoItemTemplate').innerHTML;

    const albumsApi = new RestApi(ALBUMS_URL);
    const photosApi = new RestApi(PHOTOS_URL);

    albumsEl.addEventListener('click', onAlbumsElClick);

    init();

    function onAlbumsElClick(e) {
        if (e.target.classList.contains(ALBUM_ITEM_CLASS)) {
            const id = getAlbumId(e.target);

            fetchPhotosList(id);
        }
    }

    function init() {
        fetchAlbumsList().then((albumsList) =>
            fetchPhotosList(albumsList[0].id),
        );
    }

    function fetchAlbumsList() {
        return albumsApi.getList().then(renderAlbumsList);
    }

    function renderAlbumsList(albumsList) {
        albumsEl.innerHTML = albumsList.map(renderAlbumsItem).join('');

        return albumsList;
    }

    function renderAlbumsItem(album) {
        return interpolate(albumItemTemplate, album);
    }

    function getAlbumId(el) {
        return el.dataset.id;
    }

    function fetchPhotosList(albumId) {
        return photosApi.getList({ albumId }).then(renderPhotosList);
    }

    function renderPhotosList(photosList) {
        photosEl.innerHTML = photosList.map(renderPhotosItem).join('');

        $('#photos a').simpleLightbox({
            fileExt: '',
        });

        return photosList;
    }

    function renderPhotosItem(photo) {
        return interpolate(photoItemTemplate, photo);
    }

    function getPhotoUrl(el) {
        return el.dataset.url;
    }
});