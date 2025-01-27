function modal_window(text, error = false) {
	const windows = document.querySelector('.windows')
	windows.innerHTML += `
    <div class="window ${error ? 'window__error' : ''}">
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
    </div>`

	const all_window = document.querySelectorAll('.window')

	all_window.forEach(el => {
		setTimeout(() => {
			el.remove()
		}, 5000)
	})
}

function modal(func) {
	const modal = document.getElementById(`${func}_modal`)
	const open = document.getElementById(`${func}_open`)
	const close = document.getElementById(`${func}_close`)

	open.addEventListener('click', () => {
		modal.showModal()
		document.body.classList.add('lock')
	})

	close.addEventListener('click', () => {
		modal.close()
		document.body.classList.remove('lock')
	})
}

function close_modal(modal) {
	modal.parentNode.remove()
}
