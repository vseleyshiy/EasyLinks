print('SIMPLER OPENING OF LINKS')
print('prog made by vseleyshiy\n')

count = open('count.txt', 'r')
count_read = count.read()
if count_read != '':
    file = open('links.txt', 'r')
    links = file.read().split(',')
    file.close()
    count = open('count.txt', 'r')
    counts = count.read().split(',')
    count.close()
    import webbrowser as web

    def validator(func):
        def wrapper(url):
            if 'https://' in url:
                func(url)
                print('Вы открыли ', url)
            else:
                print('Вы ввели неверный url')
        return wrapper

    @validator
    def open(url):
        web.open(url)

    len_counts = len(counts)
    for el in range(len_counts):
        if links[el] == '':
            pass
        else:  
            open(links[el])
    
    count.close()
    print('Ссылки открыты, удачи <3')
else:
    links_count = 0
    mess_count = 0
    
    print('У вас нет сохранённых ссылок. Сколько ссылок хотите добавить?')
    try:
        links_count = int(input('Введите число ссылок: '))
        if links_count == 0:
            print('Вы не можете ввести число 0')
        elif links_count == 1:
            print('Дальше введите корректную ссылку с протоколом https//')
        else:
            print('Дальше введите корректные ссылки с протоколом https//')
    except:
        print('То что вы набрали, не является числом')
        links_count = int(input('Введите число ссылок: '))
        
    file = open('links.txt', 'a')
    count = open('count.txt', 'w')

    for mess_count in range(links_count):
        mess_count += 1
        count.write(str(mess_count) + ',')
        links_count -= 1
        link = input('Введите ' + str(mess_count) + ' ссылку: ')
        file.write(link + ',')
        
    count.close()
    file.close()
    
    print('Ссылки сохранены, перезапустите файл <3')
    
import time
time.sleep(10)