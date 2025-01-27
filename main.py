import eel
import os
import webbrowser as web
import json
import plyer

eel.init('web')

with open('./database.json', "r") as f:
    database = json.load(f)

def update_file():
    with open('./database.json', 'w') as f:
        new_json = json.dumps(database)
        f.write(new_json)

@eel.expose
def links_is_empty():
    if len(database['links']) == 0:
        return True
    else:
        return False

@eel.expose
def add_dir(dirname):
    root = database['links']

    for el in root:
        if el == dirname:
            return 'this name already exist'

    root[dirname] = []
    update_file()


@eel.expose
def add_link(dirname, name, url):
    try:
        dir = database['links'][dirname]
        last_el = dir[len(database['links'][dirname]) - 1]
        if last_el == '':
            link_id = 1
        else:
            link_id = last_el["id"] + 1
        link = {
            "id": link_id,
            "name": name,
            "url": url,
        }
        dir.append(link)
        update_file()
    except:
        database['links'][dirname] = []
        link = {
            "id": 1,
            "name": name,
            "url": url,
        }
        database['links'][dirname].append(link)
        update_file()


@eel.expose
def get_links():
    return database['links']

@eel.expose
def get_default_dir():
    return database['default_dir']

@eel.expose
def change_default_dir(new_dir):
    database['default_dir'] = new_dir
    update_file()

@eel.expose
def open_link(url):
    web.open(url)

@eel.expose
def open_all_links(dirname):
    links = get_links()

    for el in links[dirname]:
        open_link(el['url'])

@eel.expose
def delete_dir(dirname):
    root = database['links']
    del root[dirname]
    update_file()


@eel.expose
def delete_link(dirname, id):
    dir = database['links'][dirname]

    for el in dir:
        if el['id'] == id:
            dir.remove(el)
            update_file()
            break

@eel.expose
def get_theme_color():
    theme_color = database['theme_color']
    return theme_color

@eel.expose
def change_theme_color(theme_color):
    database['theme_color'] = theme_color
    update_file()

@eel.expose
def get_pomodoro_data_backend():
    return database['pomodoro']

@eel.expose
def change_pomodoro_data(arr):
    root = database['pomodoro']
    root['work_time'] = arr[0]
    root['break_time'] = arr[1]
    root['long_break_time'] = arr[2]
    root['rounds_per_day'] = arr[3]
    update_file()

@eel.expose
def get_last_time():
    return {
        "last_session": database['pomodoro']['last_session'],
        "last_time": database['pomodoro']['last_time'],
        "last_rounds": database['pomodoro']['last_rounds']
    }

@eel.expose
def change_last_time(session, time):
    database['pomodoro']['last_session'] = session
    database['pomodoro']['last_time'] = time
    update_file()

@eel.expose
def change_rounds_backend(do, count):
    rounds = database['pomodoro']['rounds_per_day']
    last_rounds = database['pomodoro']['last_rounds']
    forward = last_rounds + count
    back = last_rounds - count

    if do == 'forward':
        if forward < rounds:
            database['pomodoro']['last_rounds'] = forward

    if do == 'back':
        if (back >= 0):
            database['pomodoro']['last_rounds'] = back
    update_file()

@eel.expose
def send_notification_work():
    plyer.notification.notify(
    message='Перерыв окончен. Запусти таймер и начинай работать.',
    app_name='EasyLinks',
    title='Пора работать!'
    )

@eel.expose
def send_notification_break():
    plyer.notification.notify(
    message='Отдыхай, воин. Ты молодец.',
    app_name='EasyLinks',
    title='Перерыв!'
    )

@eel.expose
def send_notification_long_break():
    plyer.notification.notify(
    message='Ты проделал большой путь, ты лучше всех.',
    app_name='EasyLinks',
    title='Длинный перерыв!'
    )

@eel.expose
def get_randomizer_components():
    return database['randomizer']

@eel.expose
def change_randomizer_components(arr):
    database['randomizer'] = arr
    update_file()




eel.start('index.html', size=(700, 700))
