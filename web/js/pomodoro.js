let seconds = 0
let activeType
let pomodoro_data
let user_data
let interval = null
let workMinutes
let breakMinutes
let breakCount = 0
let roundCount
let workSound
let breakSound
let longBreakSound
const timer = document.querySelector('.pomodoro__timer')
const start_btn = document.getElementById('pomodoro_start')
const stop_btn = document.getElementById('pomodoro_stop')
const resetAll = document.getElementById('pomodoro_reset_all')
const reset = document.getElementById('pomodoro_reset')
const forward = document.getElementById('pomodoro_forward')
const back = document.getElementById('pomodoro_back')
const error = document.getElementById('pomodoro_error')

function setSounds(workS, breakS, longBreakS) {
	workSound = new Audio(`../audio/${workS}.mp3`)
	breakSound = new Audio(`../audio/${breakS}.mp3`)
	longBreakSound = new Audio(`../audio/${longBreakS}.mp3`)
}

setSounds('dobroe-utro', 'tyi-mne-nravishsya', 'chmoki-chsmoki')

resetAll.addEventListener('click', () => {
	reset_all_pomodoro(interval)
})
reset.addEventListener('click', () => {
	reset_pomodoro(interval)
})

forward.addEventListener('click', () => {
	change_rounds('forward', interval)
})
back.addEventListener('click', () => {
	change_rounds('back', interval)
})

stop_btn.style.display = 'none'

document.addEventListener('DOMContentLoaded', () => {
	last_time()
	get_pomodoro_data()
	filling_rounds()
})

async function filling_rounds() {
	const res = await eel.get_pomodoro_data_backend()()
	const data = await res
	pomodoro_data = data

	const container = document.querySelector('.pomodoro__rounds-container')
	container.innerHTML = ''
	let num = 0

	const rounds_per_day = pomodoro_data.rounds_per_day
	const cycles = Math.round(rounds_per_day / 4)

	for (let j = 0; j < cycles; j++) {
		const rounds_container = document.createElement('div')
		rounds_container.className = 'pomodoro__rounds'
		container.append(rounds_container)
		for (let i = 0; i < 4; i++) {
			if (num != rounds_per_day) {
				const item = `
				<div class="pomodoro__round"></div>
				`
				rounds_container.innerHTML += item
				num++
			}
		}
	}
	set_active_rounds(user_data.last_rounds)
}

async function last_time() {
	const res = await eel.get_last_time()()
	const last_times = await res

	user_data = last_times
	set_active_type(user_data.last_session)

	roundCount = user_data.last_rounds
}

async function get_pomodoro_data() {
	const res = await eel.get_pomodoro_data_backend()()
	const data = await res
	pomodoro_data = data

	if (user_data.last_time == '') {
		set_pomodoro_data()
		set_active_type('work')
	} else {
		timer.innerHTML = user_data.last_time
	}
}

function set_pomodoro_data() {
	const timer_content = formatingTime(`${pomodoro_data.work_time}:${seconds}`)
	const timer = document.querySelector('.pomodoro__timer')

	timer.innerHTML = timer_content
}

async function start_pomodoro() {
	const res = await eel.get_last_time()()
	const last_times = await res

	user_data = last_times

	if (user_data.last_time == '') {
		if (user_data.last_session == 'work') {
			workMinutes = pomodoro_data.work_time - 1
		}
		if (user_data.last_session == 'break') {
			workMinutes = pomodoro_data.break_time - 1
		}
		if (user_data.last_session == 'long_break') {
			workMinutes = pomodoro_data.long_break_time - 1
		}
		seconds = 59
	} else {
		workMinutes = Number(user_data.last_time.split(':')[0])
		seconds = Number(user_data.last_time.split(':')[1])
		set_active_type(user_data.last_session)
	}

	let timeFunction = () => {
		timer_content = formatingTime(`${workMinutes}:${seconds}`)
		timer.innerHTML = timer_content

		seconds -= 1

		if (seconds === -1) {
			workMinutes -= 1
			if (workMinutes === -1) {
				if (breakCount % 2 === 0) {
					if (roundCount % 4 === 0 && roundCount > 0) {
						breakCount = 1
						console.log(roundCount)
						longBreakSound.play()
						eel.send_notification_long_break()()
						workMinutes = pomodoro_data.long_break_time - 1
						set_active_type('long_break')
					} else {
						breakCount = 1
						breakSound.play()
						eel.send_notification_break()()
						workMinutes = pomodoro_data.break_time - 1
						set_active_type('break')
					}
				} else {
					breakCount = 0
					console.log(breakCount)
					workSound.play()
					eel.send_notification_work()()
					workMinutes = pomodoro_data.work_time - 1
					set_active_type('work')
					// roundCount++ делается нижней функцией
					change_rounds('forward', interval, true)
				}
			}
			seconds = 59
		}
	}

	interval = setInterval(timeFunction, 1000)
	start_btn.style.display = 'none'
	start_btn.textContent = 'Продолжить'
	stop_btn.style.display = 'block'
	stop_btn.textContent = 'Остановить'

	stop_btn.addEventListener('click', () => {
		start_btn.style.display = 'block'
		stop_btn.style.display = 'none'
		clearInterval(interval)

		eel.change_last_time(activeType, timer.textContent.trim())()
	})
}

function change_type_on_work() {
	stop_btn.style.display = 'none'
	start_btn.style.display = 'block'
	start_btn.textContent = 'Запустить'
	if (interval != null) {
		clearInterval(interval)
	}
	breakCount = 0
	seconds = 0
	workMinutes = pomodoro_data.work_time
	set_active_type('work')
	eel.change_last_time('work', '')()
	timer_content = formatingTime(`${workMinutes}:${seconds}`)
	timer.innerHTML = timer_content
}
function change_type_on_break() {
	if (roundCount % 4 !== 0 || roundCount === 0) {
		stop_btn.style.display = 'none'
		start_btn.style.display = 'block'
		start_btn.textContent = 'Запустить'
		if (interval != null) {
			clearInterval(interval)
		}
		breakCount = 1
		console.log('breakCount', breakCount)
		console.log('roundCount', roundCount)
		seconds = 0
		workMinutes = pomodoro_data.break_time
		set_active_type('break')
		eel.change_last_time('break', '')()
		timer_content = formatingTime(`${workMinutes}:${seconds}`)
		timer.innerHTML = timer_content
	} else {
		error.innerHTML =
			'Во время последнего раунда в круге ты должен отдыхать по длинному перерыву!'
		setTimeout(() => {
			error.innerHTML = ''
		}, 5000)
	}
}
function change_type_on_long_break() {
	if (roundCount % 4 === 0 && roundCount > 0) {
		stop_btn.style.display = 'none'
		start_btn.style.display = 'block'
		start_btn.textContent = 'Запустить'
		breakCount = 1
		seconds = 0
		console.log('breakCount', breakCount)
		console.log('roundCount', roundCount)
		workMinutes = pomodoro_data.long_break_time
		if (interval != null) {
			clearInterval(interval)
		}
		set_active_type('long_break')
		eel.change_last_time('long_break', '')()
		timer_content = formatingTime(`${workMinutes}:${seconds}`)
		timer.innerHTML = timer_content
	} else {
		error.innerHTML =
			'Длинный перерыв доступен во время последнего раунда в круге!'
		setTimeout(() => {
			error.innerHTML = ''
		}, 5000)
	}
}

function set_active_type(type) {
	let old_type = type
	switch (type) {
		case '':
			type = 'Работа'
			break
		case 'work':
			type = 'Работа'
			break
		case 'break':
			type = 'Перерыв'
			break
		case 'long_break':
			type = 'Длинный перерыв'
			break
	}
	const allTypes = document.querySelectorAll('.pomodoro__type')

	for (let el of allTypes) {
		el.classList.remove('active')
		if (el.textContent.trim() == type) {
			activeType = old_type
			el.classList.add('active')
		}
	}
}

function set_active_rounds(count) {
	const rounds = document.querySelectorAll('.pomodoro__round')
	let num = rounds.length

	for (let el of rounds) {
		el.classList.remove('active')
		if (rounds.length - num < count) {
			el.classList.add('active')
		}
		num -= 1
	}
}

function reset_pomodoro(interval = null) {
	const timer = document.querySelector('.pomodoro__timer')

	stop_btn.style.display = 'none'
	start_btn.style.display = 'block'
	start_btn.textContent = 'Запустить'
	if (interval != null) {
		clearInterval(interval)
	}
	set_active_type('work')
	eel.change_last_time('work', '')()
	seconds = 0
	breakCount = 0

	timer.innerHTML = formatingTime(`${pomodoro_data.work_time}:${seconds}`)
}

function reset_all_pomodoro(interval = null) {
	const timer = document.querySelector('.pomodoro__timer')

	stop_btn.style.display = 'none'
	start_btn.style.display = 'block'
	start_btn.textContent = 'Запустить'
	if (interval != null) {
		clearInterval(interval)
	}
	eel.change_last_time('work', '')()
	seconds = 0

	const active_rounds = document.querySelectorAll('.pomodoro__round.active')
	eel.change_rounds_backend('back', active_rounds.length)()
	set_active_rounds(0)
	roundCount = 0
	set_active_type('work')

	timer.innerHTML = formatingTime(`${pomodoro_data.work_time}:${seconds}`)
}

function change_rounds(type, interval = null) {
	const timer = document.querySelector('.pomodoro__timer')
	const active_rounds = document.querySelectorAll('.pomodoro__round.active')
	stop_btn.style.display = 'none'
	start_btn.style.display = 'block'
	start_btn.textContent = 'Запустить'
	if (interval != null) {
		clearInterval(interval)
	}
	eel.change_last_time('work', '')()
	seconds = 0

	timer.innerHTML = formatingTime(`${pomodoro_data.work_time}:${seconds}`)
	if (
		type == 'forward' &&
		active_rounds.length < pomodoro_data.rounds_per_day
	) {
		eel.change_rounds_backend('forward', 1)()
		set_active_rounds(active_rounds.length + 1)
		roundCount++
		breakCount = 0
		console.log('breakCount', breakCount)
		console.log('roundCount', roundCount)
	}
	if (type == 'back' && active_rounds.length > 0) {
		eel.change_rounds_backend('back', 1)()
		set_active_rounds(active_rounds.length - 1)
		roundCount--
		breakCount = 0
		console.log('breakCount', breakCount)
		console.log('roundCount', roundCount)
	}
	set_active_type('work')
	eel.change_last_time('work', '')()
}

function formatingTime(time) {
	const time_arr = time.split(':')

	let minutes = time_arr[0]
	let seconds = time_arr[1]

	if (minutes < 10) {
		minutes = `0${minutes}`
	}

	if (seconds < 10) {
		seconds = `0${seconds}`
	}

	return `${minutes}:${seconds}`
}
