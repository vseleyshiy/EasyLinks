async function settings(dirname) {
	const res = await eel.get_default_dir()()
	const default_dir = await res

	const res2 = await eel.get_theme_color()()
	const theme_color = await res2

	const res3 = await eel.get_pomodoro_data_backend()()
	const pomodoro_data = await res3

	container.innerHTML = `
	<div class="settings">
		<div class="settings__header">Настройки</div>
		<div class="settings__row">
			<div class="settings__title">Папка по умолчанию:
				<div class="select__container">
					<div class="select__title" id="settings_select_title">
						<span>${default_dir}</span>
						<svg
							class="select__arrow"
							id="settings_select_arrow"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-chevron-down">
							<path d="m6 9 6 6 6-6" />
						</svg>
					</div>
					<div
						id="settings_select_options"
						class="select__options"
					></div>
				</div>
			</div>
		</div>
		<div class="settings__row">
			<div class="settings__title">
				Основной цвет: 
				<input id="theme_color" value="${theme_color}" class="settings__color" type="color">
			</div>
		</div>
		<div class="settings__block">
			<div class="settings__title">
				Помодоро - время работы (мин):
				<input value="${pomodoro_data.work_time}" class="settings__input" type="text">
			</div>
			<div class="settings__title">
				Помодоро - время перерыва (мин):
				<input value="${pomodoro_data.break_time}" class="settings__input" type="text">
			</div>
			<div class="settings__title">
				Помодоро - время длинного перерыва (мин):
				<input value="${pomodoro_data.long_break_time}" class="settings__input" type="text">
			</div>
			<div class="settings__title">
				Помодоро - раундов за сессию:
				<input value="${pomodoro_data.rounds_per_day}" class="settings__input" type="text">
			</div>
			<button class="settings__button" onclick="pomodoro_settings()">Сохранить</button>
		</div>
		<button class="link__button big__link-button" onclick="main_menu('${dirname}')">Вернуться назад</button>
	</div>
	`

	settings_select()
}

async function settings_select() {
	const res = await eel.get_links()()
	const data = await res

	const title = document.getElementById('settings_select_title')
	const title_dirname = document.querySelector('#settings_select_title > span')
	const arrow = document.getElementById('settings_select_arrow')
	const options = document.getElementById('settings_select_options')

	for (let key in data) {
		options.innerHTML += `
		<div class="select__option">
			${key.length > 11 ? key.substring(0, 11) + '...' : key}
		</div>
		`
	}

	title.addEventListener('click', () => {
		arrow.classList.toggle('select__rotate')
		options.classList.toggle('select__open')
	})

	options.addEventListener('click', e => {
		arrow.classList.remove('select__rotate')
		options.classList.remove('select__open')
		title_dirname.textContent = e.target.textContent.trim()
		eel.change_default_dir(e.target.textContent.trim())()
	})

	const theme_color_input = document.getElementById('theme_color')

	theme_color_input.addEventListener('change', e => {
		wrapper.style.backgroundColor = e.target.value
		eel.change_theme_color(e.target.value)
	})

	const allInputs = document.querySelectorAll('.settings__input')

	for (let el of allInputs) {
		validate_input(el, 3)
	}
}

function pomodoro_settings() {
	const allInputs = document.querySelectorAll('.settings__input')
	const settings = []

	for (let el of allInputs) {
		settings.push(Number(el.value))
	}

	if (settings[3] % 2 !== 0) {
		modal_window('Кол-во раундов должно быть чётным!', true)
	} else {
		eel.change_pomodoro_data(settings)()
		modal_window('Вы успешно сохранили настройки!')
		reset_all_pomodoro()
		last_time()
		get_pomodoro_data()
		filling_rounds()
	}
}
