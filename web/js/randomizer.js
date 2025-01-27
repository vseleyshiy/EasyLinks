function randomizer_menu() {
	const inner = document.querySelector('#randomizer_modal > .modal__inner')

	inner.innerHTML = `
	<span id="randomizer_error" class="modal__error"></span>
	<div class="modal__form">
		<div class="modal__header">Рандомайзер</div>
		<svg class="randomizer__copy" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
		<div class="randomizer__result">
		</div>
		<div class="modal__buttons">
			<button class="start__button" onclick="start_randomizer()">Запустить</button>
			<button class="modal__button" id="randomizer_close">Закрыть</button>
		</div>
	</div>
	`
}

function randomizer_components_menu() {
	const inner = document.querySelector('#randomizer_modal > .modal__inner')

	let count = 1

	inner.innerHTML = `
	<span id="randomizer_error" class="modal__error"></span>
	<div class="modal__form">
		<div class="randomizer__title modal__title">
			Введите компоненты для рандомного выбора:
		</div>
		<div class="randomizer__rows">
			<div class="form__row randomizer__row">
				<input
					class="modal__input randomizer__input"
					type="text"
					placeholder="Введите ${count} компонент"
				/>
			</div>
		</div>
		<div class="randomizer__icon">Добавить компонент
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="15"
				height="15"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-circle-plus"
			>
				<circle cx="12" cy="12" r="10" />
				<path d="M8 12h8" />
				<path d="M12 8v8" />
			</svg>
		</div>
		<div class="modal__buttons">
			<button class="modal__button" onclick="create_randomizer()">Создать</button>
			<button class="modal__button" id="randomizer_close">Закрыть</button>
		</div>
	</div>
	`

	const icon = document.querySelector('.randomizer__icon')
	const rows = document.querySelector('.randomizer__rows')

	icon.addEventListener('click', () => {
		count++
		const item = document.createElement('div')
		item.className = 'form__row randomizer__row'
		item.innerHTML = `
			<input
				class="modal__input randomizer__input"
				type="text"
				placeholder="Введите ${count} компонент"
			/>
		`
		rows.appendChild(item)
	})
}

function create_randomizer() {
	const all_components = document.querySelectorAll('.randomizer__input')
	const modal = document.getElementById('randomizer_modal')
	const error = document.getElementById('randomizer_error')
	let arr = []

	for (let el of all_components) {
		if (el.value.length > 0) {
			arr.push(el.value)
		}
	}

	if (arr.length > 0) {
		eel.change_randomizer_components(arr)()
		modal.close()
		randomizer()
		modal_window(`Вы успешно создали рандомайзер!`)
		document.body.classList.remove('lock')
	} else {
		error.innerHTML = 'Вы ничего не ввели!'
		setTimeout(() => {
			error.innerHTML = ''
		}, 5000)
	}
}

async function start_randomizer() {
	const res = await eel.get_randomizer_components()()
	const arr = await res

	const i = Math.floor(Math.random() * arr.length)
	const result = arr[i]

	const randomizer_result = document.querySelector('.randomizer__result')

	randomizer_result.innerHTML = `
	Результат:
	<div class="randomizer__result-text">
		Спокойной ночи, <span>${result}</span> снов!
	</div>
	`

	document
		.querySelector('.randomizer__copy')
		.addEventListener('click', function () {
			navigator.clipboard.writeText(
				document.querySelector('.randomizer__result-text').innerText
			)
			this.style.backgroundColor = '#005c94'
			setTimeout(() => {
				this.style.backgroundColor = 'transparent'
			}, 1000)
		})
}
