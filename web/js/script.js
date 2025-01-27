const wrapper = document.querySelector('.wrapper')
const container = document.querySelector('.container')

wrapper.style.backgroundColor = 'black'
container.innerHTML = '<h1>Загрузка...</h1>'

let curdir = ''
let count = 0
let count_now = 0

document.addEventListener('DOMContentLoaded', () => {
	set_default_dir()
	is_empty()
	get_theme_color()
	randomizer()
})
