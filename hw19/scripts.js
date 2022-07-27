'use strict';
const URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers';

const DELETE_NOTE_SELECTOR = '.delete-note';
const DRAG_NOTE_SELECTOR = '.drag-note';
const EDIT_NOTE_CONTROL_SELECTOR = '.edit-note-control';
const NOTE_ELEMENT_SELECTOR = '.note';

const noteTemplate = $('#noteTemplate').html();
const $fieldElement = $('#field')
    .on('click', DELETE_NOTE_SELECTOR, onDeleteStickerClick)
    .on(
        'input',
        EDIT_NOTE_CONTROL_SELECTOR,
        debounce(onStickerDescriptionInput),
    );

$('#addNoteBtn').on('click', onAddNoteBtnClick);

let notesList = [];

init();

function onAddNoteBtnClick() {
    createNote();
}

function onDeleteStickerClick() {
    const $el = $(this);

    deleteNote($el.parent().data('noteIndex'));
}

function onStickerDescriptionInput(e) {
    const $el = $(e.target);

    updateNote($el.parent().data('noteIndex'), { description: $el.val() });
}

function init() {
    getList();
}

function getList() {
    fetch(URL)
        .then((res) => res.json())
        .then(setData)
        .then(renderList);
}

function setData(data) {
    return (notesList = data);
}

function getNoteElement(id) {
    return $fieldElement.find(`[data-note-index="${id}"]`);
}

function createNote() {
    const note = {
        description: '',
        top: 50,
        left: 50,
    };
    const id = Date.now();

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    })
        .then((res) => res.json())
        .then((note) => {
            notesList.push(note);

            getNoteElement(id).replaceWith(createNoteElement(note));
        });

    renderNote({ ...note, id });
}

function updateNote(id, changes) {
    let note = notesList.find((el) => el.id == id);

    note = { ...note, ...changes };

    notesList = notesList.map((el) => (el.id == id ? note : el));

    fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });
}

function deleteNote(id) {
    notesList = notesList.filter((el) => el.id != id);

    deleteNoteElement(id);

    fetch(`${URL}/${id}`, {
        method: 'DELETE',
    });
}

function deleteNoteElement(id) {
    const $el = getNoteElement(id);

    $el.fadeOut(400, () => $el.remove());
}

function renderList(notesList) {
    const noteElements = notesList.map(createNoteElement);

    $fieldElement.empty().append(noteElements);
}

function renderNote(note) {
    $fieldElement.append(createNoteElement(note));
}

function createNoteElement(note) {
    return $(
        noteTemplate
            .replace('{{id}}', note.id)
            .replace('{{left}}', note.left)
            .replace('{{top}}', note.top)
            .replace('{{description}}', note.description),
    ).draggable({
        containment: 'parent',
        handle: DRAG_NOTE_SELECTOR,
        stop: (e, ui) => {
            console.log(ui.helper);

            updateNote(ui.helper.data('noteIndex'), ui.position);
        },
    });
}