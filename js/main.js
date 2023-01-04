'use strict'

document.addEventListener('DOMContentLoaded', function () {

// POPUP
    const popup = document.querySelector('.popup')
    const buttonPopup = document.querySelector('[data-show-popup]')
    let isShowPopup = false;

    const togglePopup = (e) => {
        const overlay = document.querySelector('.overlay');
        const closePopup = document.querySelector('.popup__close')
        e.stopPropagation();
        if (!isShowPopup) {
            isShowPopup = !isShowPopup;
            popup.classList.add('popup_show');
            document.body.classList.add('lock')
            overlay.classList.add('overlay_show')
            popup.addEventListener('click', togglePopup)
        }
        if (isShowPopup && e.target === popup || e.target === closePopup) {
            isShowPopup = !isShowPopup;
            popup.classList.remove('popup_show');
            document.body.classList.remove('lock')
            overlay.classList.remove('overlay_show')
            popup.removeEventListener('click', togglePopup)
        }
    }

    buttonPopup.addEventListener('click', (e) => togglePopup(e))

// FORM
    const formInputs = document.querySelectorAll('.pay-form__input');
    const formButton = document.querySelector('.pay-form__button');
    const newPayButton = document.querySelector('[data-new-pay]');

    const sendForm = () => {
        if (!checkForm()) {
            formInputs.forEach(input => {
                input.value = '';
            });
            togglePayBox();
        }
    }

    const checkForm = () => {
        let isErrors = false;
        const re = {
            text: /^[а-яА-ЯёЁa-zA-Z]{3,30}$/,
            tel: /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
            email: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
        };
        formInputs.forEach(input => {
            const value = input.value.trim();
            if (input.getAttribute('type') === 'text' && !re.text.test(value)) {
                isErrors = true;
                addErrorField(input);
            }
            if (input.getAttribute('type') === 'tel' && !re.tel.test(value)) {
                isErrors = true;
                addErrorField(input);
            }
            if (input.getAttribute('type') === 'email' && !re.email.test(value)) {
                isErrors = true;
                addErrorField(input);
            }
        })
        return isErrors;
    }

    const togglePayBox = () => {
        const success = document.querySelector('.pay__success');
        const form = document.querySelector('.pay-form');
        success.classList.toggle('pay__success_show')
        form.classList.toggle('pay-form_hide')
    }

    const addErrorField = (input) => {
        const field = input.parentNode,
            label = field.querySelector('.pay-form__label'),
            error = field.querySelector('.pay-form__error');
        if (!error) {
            const newError = document.createElement('span');
            newError.classList.add('pay-form__error');
            newError.innerText = 'Поле заполнено некорректно';
            field.append(newError);
            label.classList.add('pay-form__label_error')
            input.classList.add('pay-form__input_error');
        }
    }

    const removeErrorField = (input) => {
        const field = input.parentNode;
        const label = field.querySelector('.pay-form__label');
        const error = field.querySelector('.pay-form__error');
        error.remove();
        label.classList.remove('pay-form__label_error')
        input.classList.remove('pay-form__input_error');
    }

    const toggleActiveField = (input) => {
        const field = input.parentNode;
        const label = field.querySelector('.pay-form__label');
        if (input.classList.contains('pay-form__input_error')) {
            removeErrorField(input);
        }
        label.classList.toggle('pay-form__label_active');
        input.classList.toggle('pay-form__input_active');
    }

    formInputs.forEach(input => {
        input.addEventListener('focusin', () => toggleActiveField(input));
        input.addEventListener('focusout', () => toggleActiveField(input));
    })

    formButton.addEventListener('click', sendForm);
    newPayButton.addEventListener('click', togglePayBox);

});