function add_link() {
	const modal = document.getElementById('add_link_modal')
	const link_name = document.getElementById('add_link_name')
	const link_link = document.getElementById('add_link_link')
	const error = document.getElementById('add_link_error')

	if (link_name.value.length > 0 && link_link.value.includes('https://')) {
		eel.add_link(curdir, link_name.value, link_link.value)
		modal.close()
		main_menu(curdir)
		modal_window(`Вы успешно добавили ${link_name.value}!`)
		link_link.value = 'https://'
		link_name.value = ''
		document.body.classList.remove('lock')
	} else {
		error.innerHTML =
			'Вы не указали имя или ссылка не содержит протокол https://!'
		setTimeout(() => {
			error.innerHTML = ''
		}, 5000)
	}
}

function delete_link(item, curdir, id, name) {
	eel.delete_link(curdir, id)()
	modal_window(`Вы успешно удалили ${name}!`)
	item.parentNode.parentNode.remove()
}

function open_link(name, url) {
	eel.open_link(url)()
	modal_window(`Вы успешно открыли ${name}!`)
}

function add_dir() {
	const modal = document.getElementById('add_dir_modal')
	const dir_name = document.getElementById('add_dir_name')
	const error = document.getElementById('add_dir_error')

	if (dir_name.value.length > 0) {
		eel.add_dir(dir_name.value)()
		modal.close()
		curdir = dir_name.value
		main_menu(curdir)
		modal_window(`Вы успешно добавили ${dir_name.value}!`)
		dir_name.value = ''
		document.body.classList.remove('lock')
	} else {
		error.innerHTML = 'Вы не указали имя!'
		setTimeout(() => {
			error.innerHTML = ''
		}, 5000)
	}
}

function delete_dir(option, key) {
	eel.delete_dir(key)()
	modal_window(`Вы успешно удалили ${key}!`)
	get_first_dir()
	option.parentNode.remove()
}

function find_select_active() {
	const optionAll = document.querySelectorAll(
		'#menu_select_options > .select__option'
	)

	for (let el of optionAll) {
		el.classList.remove('select__option-active')
		if (el.textContent.trim() == curdir) {
			el.classList.add('select__option-active')
		}
	}
}

function validate_input(el, num) {
	el.addEventListener('keyup', function (e) {
		e.target.value = e.target.value.replace(/[^\d.]/g, '').substring(0, num)
	})
}
