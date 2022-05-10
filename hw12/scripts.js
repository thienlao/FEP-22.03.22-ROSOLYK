'use-strict;'

const DELETE_BTN_CLASS = 'delete-btn';
const EDIT_BTN_CLASS = 'edit-btn';
const CONTACT_ROW_SELECTOR = '.contact-row';
const STORAGE_KEY = 'contactsList';

const contactForm = document.querySelector('#newContactForm');
const contactsListEl = document.querySelector('#contactsList');
const contactTemplate = document.querySelector('#contactTemplate').innerHTML;
const formInputs = document.querySelectorAll('.form-input');

contactForm.addEventListener('submit', onContactFormSubmit);
contactsListEl.addEventListener('click', onContactsListClick);

let contactsList = [];

init();

function onContactFormSubmit(e) {
    e.preventDefault();

    const contact = getFormData();

    if (isContactValid(contact)) {
        saveContact(contact);
        resetForm();
    } else {
        alert('Not valid');
    }
}

function onContactsListClick(e) {
    if (e.target.classList.contains(DELETE_BTN_CLASS)) {
        const id = getContactRowId(e.target);
        removeContact(id);
    }
    if (e.target.classList.contains(EDIT_BTN_CLASS)) {
        const id = getContactRowId(e.target);
        editContact(id);
    }
}

function init() {
    contactsList = restoreData();
    renderList();
}

function getFormData() {
    const contact = {};

    formInputs.forEach((inp) => {
        contact[inp.name] = inp.value;
    });

    return contact;
}

function setFormData(contact) {
    formInputs.forEach((inp) => {
        inp.value = contact[inp.name];
    });
}

function isContactValid(contact) {
    return (
        isTextFieldValid(contact.name) &&
        isTextFieldValid(contact.surname) &&
        isPhoneFieldValid(contact.phone)
    );
}

function isTextFieldValid(value) {
    return value !== '';
}

function isPhoneFieldValid(value) {
    return isTextFieldValid(value) && !isNaN(value);
}

function generateContactHtml(contact) {
    return interpolate(contactTemplate, contact);
}

function saveContact(contact) {
    if (contact.id) {
        updateContact(contact);
    } else {
        addContact(contact);
    }

    renderList();
    saveData();
}

function updateContact(contact) {
    contact.id = +contact.id;
    contactsList = contactsList.map((c) => (c.id === contact.id ? contact : c));
}

function addContact(contact) {
    contact.id = Date.now();
    contactsList.push(contact);
}

function resetForm() {
    formInputs.forEach((inp) => {
        inp.value = '';
    });

}

function getContactRowId(el) {
    return +el.closest(CONTACT_ROW_SELECTOR).dataset.id;
}

function renderList() {
    contactsListEl.innerHTML = contactsList.map(generateContactHtml).join('\n');
}

function removeContact(id) {
    contactsList = contactsList.filter((contact) => contact.id !== id);

    renderList();
    saveData();
}

function editContact(id) {
    const contact = contactsList.find((contact) => contact.id === id);
    currentId = id;
    setFormData(contact);
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contactsList));
}

function restoreData() {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
}