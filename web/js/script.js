const container = document.querySelector('.container');

document.addEventListener('DOMContentLoaded', () => {
    is_empty();
})

async function is_empty() {
    const res = await eel.count_is_empty()();
    const data = await res;

    if (data) {
        main_menu();
    } else {
        links_quan_menu();
    }
}

async function main_menu() {
    const res = await eel.get_links()();
    const data = await res;
    data.pop();

    container.innerHTML = `
        <main class="main">
            <div class="content">
                <div class="content__col">
                    <div class="hello__title">Hello!</div>
                    <div class="title">
                        List of your links:
                    </div>
                </div>
                <div class="content__col">
                    <div class="subtitle">app made by vseleyshiy</div>
                    <button class="link__button big__link-button" onclick="eel.open_all_links()();modal_window('You have successfully opened all links! Good luck <3')">
                        Open all links
                    </button>
                </div>
            </div>
            <div class="menu__wrap">
                <div class="menu">
                    <button class="menu__button" id="open">
                        <svg class="menu__button-img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-plus"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                    </button>
                </div>
            </div>
            <div class="list">
            </div>
        </main>`;

    const list = document.querySelector('.list');
    data.forEach(el => {
        list.innerHTML +=
            `<div class="item">
                <div class="link">${el.substring(0, 35) + '...'}</div>
                <div class="buttons">
                    <button class="small__button" onclick="eel.delete_link('${el}')();modal_window('You have successfully deleted ${el.substring(0, 35) + '...'}');this.parentNode.parentNode.remove()">
                        <svg class="small__button-img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                    <button class="link__button" onclick="eel.open_link('${el}')();modal_window('You have successfully opened ${el.substring(0, 35) + '...'}')">Open</button>
                </div>
        </div>`
    });

    modal();
}

let count = 0;
let count_now = 0;

function links_quan_menu() {
    container.innerHTML = `
    <main class="main">
        <div class="hello__title">Hello!</div>
        <div class="title">
            <span>You have no saved links.</span>
            <span>How many links do you want to add?<span style="color: rgb(100, 100, 100)"> (20 maximum)</span></span>
        </div>
        <div class="block">
            <div class="input__wrap">
                <input id="num_input" class="input" type="number" max="20" min="1" value="1" onkeypress="return false">
                <button class="button">
                    Next
                </button>
            </div>
        </div>
    </main>`;

    document.querySelector('.button').addEventListener('click', () => {
        count = document.getElementById('num_input').value;
        links_menu();
    })
}

function links_menu() {
    container.innerHTML = `
                <main class="main">
                    <div class="title link">Enter ${count_now + 1} link</div>
                        <div class="block">
                            <span class="error"></span>
                            <div class="input__wrap">
                                <input class="input" value="https://" type="text">
                                <button class="button">
                                    Next
                                </button>
                            </div>
                        </div>
                </main>
                `;
    const title = document.querySelector('.title.link');
    const block = document.querySelector('.block');
    const input = document.querySelector('.input');
    const error = document.querySelector('.error');

    input.addEventListener('change', (e) => {
        if (e.target.value.includes('https://')) {
            count_now++;
            if (count_now + 1 <= count) {
                title.innerHTML = `Enter ${count_now + 1} link`;
            } else {
                title.innerHTML = `Links saved, please restart the program <3`;
                block.innerHTML = `<button class="button big__button" onclick="restart_window()">Restart app</button>`;
            }
            eel.add_link(input.value, count_now);
            input.value = 'https://';

        } else {
            error.innerHTML = 'Your link must contain https:// protocol';
            setTimeout(() => {
                error.innerHTML = '';
            }, 5000);
        }
    })
}

function modal_window(text) {
    const windows = document.querySelector('.windows');
    windows.innerHTML += `
    <div class="window">
        <div class="window__text">
            ${text}
        </div>
        <div class="cross" onclick="close_modal(this)">
            <svg class="cross__img" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="lucide lucide-x">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
            </svg>
        </div>
    </div>`;

    const all_window = document.querySelectorAll('.window');

    all_window.forEach(el => {
        setTimeout(() => {
            el.remove();
        }, 5000);
    });
}

function close_modal(modal) {
    modal.parentNode.remove();
}

function restart_window() {
    location.reload();
}