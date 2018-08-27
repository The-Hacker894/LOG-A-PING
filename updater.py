#
#
#Made by https://github.com/iraizo
#
#
import requests
import sys
import time
import subprocess
import config
url = config.versionurl
r = requests.get(url)
cache = r.text  # version with dots
currentversion = cache.replace(".", "")  # version without dots
try:
    # getting local version.txt to compare it /read it
    file = open("version.txt", "r")
    cache2 = file.read()
    cache2.strip()
except (FileNotFoundError):  # if version.txt isnt found
    print("File version.txt not found.")
    time.sleep(2)
    print("Exiting..")
    time.sleep(2)
    sys.exit()

localversion = cache2.replace(".", "")  # removing dots
localversion.strip()
currentversion.strip()
if int(currentversion) != int(localversion):  # checking if new version is available
    print("update is available")
    # asking for path
    path = input("put in the path where you want to download it: ")
    try:
        print("Downloading update..")
        subprocess.call([
            'git',
            'clone',
            '' + config.repourl,
            str(path)
        ])
    except Exception as e:
        print(e)
        print("Report this error to https://github.com/iraizo")
else:
    print("No update found.")
    print("Youre good to go.")
