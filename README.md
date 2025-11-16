# YouTube Like-Reminder Script

Dieses Skript zeigt automatisch eine kleine Like-Erinnerung an, wenn ein YouTube-Video zu 80% geschaut wurde.  
Die Erinnerung erscheint als kleines Popup rechts unten und verschwindet nach 10 Sekunden wieder.  
Es eignet sich z. B. für Browser-Extensions oder Userscripts.

<kbd>[Features](#features)</kbd>  
<kbd>[Funktionsweise](#funktionsweise)</kbd>  
<kbd>[Verwendung](#verwendung)</kbd>

## Features

- Erkennt automatisch Video-Fortschritt  
- Zeigt einmal pro Video ein Reminder-Popup  
- Blendet sich smooth ein und aus  
- Funktioniert beim Videowechsel (auch über YouTubes interne Navigation)  
- Kompakter, modularer Code

---

## Funktionsweise

Das Skript überwacht:
- die aktuelle Video-ID (`v`)
- den Fortschritt des `<video>`-Elements
- YouTubes event `yt-page-data-updated` (bei Navigation ohne Reload)

Sobald das Video zu mindestens 80% angesehen wurde, erscheint ein Hinweis.

---

## Verwendung

Du kannst das Skript in:

- einer Browser-Extension  
- einem Tampermonkey/Violentmonkey-Userscript  
- oder direkt per DevTools als Test

verwenden.

Stelle sicher, dass das Skript auf YouTube-Seiten ausgeführt wird.

initWatcher();
