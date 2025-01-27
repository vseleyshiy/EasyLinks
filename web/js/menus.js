function links_quan_menu() {
	container.innerHTML = `
    <main class="main">
        <div class="hello__title">Здравствуйте!</div>
        <div class="title">
            <span>У вас нет сохранённых ссылок.</span>
            <span>Сколько ссылок хотите добавить? <span style="color: rgb(100, 100, 100)">(20
            максимум)</span></span>
        </div>
        <div class="block">
            <div class="input__wrap">
                <input id="num_input" class="input" onkeypress="validate_input(this, 2)" type="text" value="1">
                <button class="button">
                    Далее
                </button>
            </div>
        </div>
    </main>`

	document.querySelector('.button').addEventListener('click', () => {
		count = document.getElementById('num_input').value
		links_menu()
	})
}

function links_menu() {
	container.innerHTML = `
    <main class="main">
      <div class="title">Введите данные о ${count_now + 1} ссылке</div>
        <div class="block">
          <span class="error"></span>
          <div class="form">
            <input class="input" id="link_name" placeholder="Имя ссылки" type="text">
            <input placeholder="Введите ссылку с протоколом https://" class="input" id="link_link" value="https://" type="text">
            <button class="form__button">
              Далее
            </button>
        	</div>
      	</div>
    </main>`

	const title = document.querySelector('.title')
	const block = document.querySelector('.block')
	const link_name = document.getElementById('link_name')
	const link_link = document.getElementById('link_link')
	const button = document.querySelector('.form__button')
	const error = document.querySelector('.error')

	button.addEventListener('click', () => {
		if (link_name.value.length > 0 && link_link.value.includes('https://')) {
			count_now++
			if (count_now + 1 <= count) {
				title.innerHTML = `Введите данные о ${count_now + 1} ссылке`
			} else {
				title.innerHTML = `Ссылки сохранены, перезапустите программу <3`
				block.innerHTML = `
				<button class="button big__button" onclick="location.reload()">Перезапустить приложение</button>`
			}
			eel.add_link('Main', link_name.value, link_link.value)
			link_name.value = ''
			link_link.value = 'https://'
		} else {
			error.innerHTML =
				'Вы не указали имя или ссылка не содержит протокол https://!'
			setTimeout(() => {
				error.innerHTML = ''
			}, 5000)
		}
	})
}

async function main_menu(dirname) {
	const res = await eel.get_links()()
	const data = await res

	container.innerHTML = `
  <main class="main">
		<div class="content">
			<div class="content__col">
				<div class="hello__title">Здравствуйте!</div>
				<div class="title">Список ваших ссылок:</div>
			</div>
			<div class="content__col">
				<div class="subtitle">app made by vseleyshiy</div>
					<button
						class="link__button big__link-button"
						onclick="modal_window('Вы успешно открыли все ссылки! Удачи <3')"
					>
						Открыть все ссылки
					</button>
				</div>
			</div>
			<div class="menu__wrap">
				<div class="menu">
					<div class="menu__buttons">
						<button class="menu__button" id="add_link_open">
							<svg
								class="menu__button-img"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-square-plus"
							>
								<rect width="18" height="18" x="3" y="3" rx="2" />
								<path d="M8 12h8" />
								<path d="M12 8v8" />
							</svg>
						</button>
						<button class="menu__button" id="add_dir_open">
							<svg class="menu__button-img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-plus"><path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
						</button>
						<button class="menu__button" id="randomizer_open">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu__button-img lucide lucide-dices"><rect width="12" height="12" x="2" y="10" rx="2" ry="2"/><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/><path d="M6 18h.01"/><path d="M10 14h.01"/><path d="M15 6h.01"/><path d="M18 9h.01"/></svg>
						</button>
						<button class="menu__button" id="pomodoro_open">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu__button-img lucide lucide-timer"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>
						</button>
						<button class="menu__button" onclick="settings('${dirname}')">
							<svg class="menu__button-img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-2"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
						</button>
					</div>
					<div class="menu__text">Текущая папка:
						<div class="select__container">
							<div class="select__title" id="menu_select_title">
								<span>${dirname}</span>
								<svg class="select__arrow" id="menu_select_arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
							</div>
							<div class="select__options" id="menu_select_options">
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="list"></div>
	</main>`
	show_link(dirname)

	modal('add_link')
	modal('add_dir')
	modal('randomizer')
	modal('pomodoro')

	menu_select(data)
}

async function show_link(dirname) {
	curdir = dirname
	const res = await eel.get_links()()
	const data = await res

	const list = document.querySelector('.list')
	list.innerHTML = ''
	data[curdir].forEach(el => {
		list.innerHTML += `
    <div class="item">
			<div class="item__info">
				<div class="name">${el.name}</div>
					<div class="link">${
						el.url.length > 35 ? el.url.substring(0, 35) + '...' : el.url
					}</div>
			</div>
			<div class="buttons">
				<button class="small__button" onclick="delete_link(this, '${curdir}', ${
			el.id
		}, '${el.name}')">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="small__button-img lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
				</button>
				<button class="link__button" onclick="open_link('${el.name}', '${
			el.url
		}')">Открыть</button>
			</div>
		</div>`
	})
}

function menu_select(data) {
	const title = document.getElementById('menu_select_title')
	const title_dirname = document.querySelector('#menu_select_title > span')
	const arrow = document.getElementById('menu_select_arrow')
	const options = document.getElementById('menu_select_options')

	for (let key in data) {
		options.innerHTML += `
		<div class="select__option">
			${key.length > 11 ? key.substring(0, 11) + '...' : key}
				<svg onclick="delete_dir(this, '${key}')" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="select__button lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
		</div>
		`
	}

	title.addEventListener('click', () => {
		arrow.classList.toggle('select__rotate')
		options.classList.toggle('select__open')
	})

	find_select_active()

	options.addEventListener('click', e => {
		arrow.classList.remove('select__rotate')
		options.classList.remove('select__open')
		show_link(e.target.textContent.trim())
		title_dirname.textContent = curdir
		find_select_active()
	})

	const big_btn = document.querySelector('.big__link-button')
	big_btn.addEventListener('click', () => {
		eel.open_all_links(curdir)()
	})
}
