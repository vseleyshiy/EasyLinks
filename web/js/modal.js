function modal() {
    const modal = document.querySelector('.modal');
    const open = document.getElementById('open');
    const close = document.getElementById('close');

    open.addEventListener('click', () => {
        modal.showModal();
        document.body.classList.add('lock');
    });

    close.addEventListener('click', () => {
        modal.close();
        document.body.classList.remove('lock');
    })
}

function modal_validate() {
    const modal = document.querySelector('.modal');
    const input = document.querySelector('.modal__input');
    const error = document.querySelector('.modal__error');
    const num = document.querySelectorAll('.item').length + 1;

    if (input.value.includes('https://')) {
        eel.add_link(input.value, num);
        modal.close();
        main_menu();
        modal_window('You have successfully added ' + input.value.substring(0, 35) + '...')
        input.value = '';
    } else {
        error.innerHTML = 'Your link must contain https:// protocol';
        setTimeout(() => {
            error.innerHTML = '';
        }, 5000);
    }
}