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
const contactsApi = new RespApi(
    'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/users/',
);
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
    fetchList();
}

function fetchList() {
    contactsApi.getList().then((data) => {
        contactsList = data;
        renderList();
    });
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
}

function updateContact(contact) {
    contact.id = contact.id;

    const prevContact = contactsList.find((c) => c.id === contact.id);

    contactsList = contactsList.map((c) => (c.id === contact.id ? contact : c));
    renderList();

    contactsApi.update(contact).catch(() => {
        contactsList = contactsList.map((c) =>
            c.id === prevContact.id ? prevContact : c,
        );
        renderList();
    });
}

function addContact(contact) {
    const id = Date.now();

    contactsList.push({ ...contact, id });
    renderList();

    contactsApi
        .create(contact)
        .then((data) => {
            contactsList = contactsList.map((contact) =>
                contact.id === id ? data : contact,
            );
            renderList();
        })
        .catch(() => {
            contactsList = contactsList.filter((contact) => contact.id !== id);
            renderList();
        });
}

function resetForm() {
    formInputs.forEach((inp) => {
        inp.value = '';
    });
}

function getContactRowId(el) {
    return el.closest(CONTACT_ROW_SELECTOR).dataset.id;
}

function renderList() {
    contactsListEl.innerHTML = contactsList.map(generateContactHtml).join('\n');
}

function removeContact(id) {
    const prevIndex = contactsList.findIndex((c) => c.id === id);
    const prevContact = contactsList[prevIndex];

    contactsList = contactsList.filter((contact) => contact.id !== id);

    renderList();

    contactsApi.delete(id).catch(() => {
        contactsList.splice(prevIndex, 0, prevContact);
        renderList();
    });
}

function editContact(id) {
    const contact = contactsList.find((contact) => contact.id === id);
    currentId = id;
    setFormData(contact);
}