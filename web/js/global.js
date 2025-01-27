async function set_default_dir() {
	const res = await eel.get_default_dir()()
	curdir = await res
}

async function is_empty() {
	const res = await eel.links_is_empty()()
	const data = await res

	if (data) {
		links_quan_menu()
	} else {
		main_menu(curdir)
	}
}

async function get_theme_color() {
	const res = await eel.get_theme_color()()
	const data = await res

	wrapper.style.backgroundColor = data
}

async function randomizer() {
	const res = await eel.get_randomizer_components()()
	const components = await res

	if (components.length > 0) {
		randomizer_menu()
	} else {
		randomizer_components_menu()
	}
}

async function get_first_dir() {
	const res = await eel.get_links()()
	const data = await res

	for (let key in data) {
		curdir = key
		main_menu(curdir)
		break
	}
}
