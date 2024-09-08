import eel
import webbrowser as web

import os
import sys
import re

eel.init('web')

@eel.expose
def count_is_empty():
    count_read = open('count.txt', 'r')
    
    if count_read.read() != '':
        count_read.close()
        return True
    else:
        count_read.close()
        return False    
    
    
@eel.expose
def add_link(link, num):
    links = open('links.txt', 'a')
    count = open('count.txt', 'a')
    links.write(link + ',')
    count.write(str(num) + ',')
            
    count.close()
    links.close()
    
@eel.expose
def get_links():
    file = open('links.txt', 'r')
    links = file.read().split(',')
    file.close()
    
    return links
    
@eel.expose
def open_link(url):
    web.open(url)
    
@eel.expose
def open_all_links():
    links = get_links()
    links_length = len(links)
    
    for el in range(links_length):
        if links[el] == '':
            pass
        else:  
            open_link(links[el])
            
            
def delete_count():
    with open('count.txt', "r") as count:
        lines = count.readlines()
        arr = lines[0].split(',')
        arr.pop()
        arr.pop()
        count.close()
    with open("count.txt", "w") as f:
        for el in arr:
            f.write(str(el) + ',')
        f.close()
            
@eel.expose
def delete_link(link):
    with open('links.txt') as links:
        lines = links.readlines()
        arr = lines[0].split(',')
        index = arr.index(str(link))
        delete_count()
        arr.pop()
        arr.pop(index)
        links.close()
    with open("links.txt", "w") as f:
        for el in arr:
            f.write(el + ',')
        f.close()


eel.start('index.html', size=(700, 700))
