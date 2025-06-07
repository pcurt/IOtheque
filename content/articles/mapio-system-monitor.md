---
title: 'Surveiller les métriques système sur MAPIO'
description: Utiliser Home assistant pour surveiller les métriques système de MAPIO.
image:
  src: https://back.iotheque.com/wp-content/uploads/2025/06/Capture-decran-2025-06-04-a-15.49.48.png
  alt: Image de system monitor.
categories:
- domotique
- homeassistant
authors:
  - name: Pierrick Curt
    social: https://www.linkedin.com/in/pierrick-curt/
publishedAt: 2025-06-05
---


## Introduction

En pré requis à cet article, il faut déjà avoir démarré et configuré votre instance de Home Assistant. Home Assistant possède de nombreuses intégrations qui permettent d'ajouter des fonctions supplémentaires à votre installation. Dans cet article nous allons voir comment utiliser l'intégration [System Monitor](https://www.home-assistant.io/integrations/systemmonitor) pour surveiller les métriques systèmes de votre MAPIO.

## Installation

Allez sur sur votre instance de Home Assistant dans la section configuration: **http://YOUR_LOCAL_IP:8123/config** puis choisissez **Appareils et services**. Appuyer sur le bouton **AJOUTER UNE INTEGRATION** et cherchez **SYSTEM MONITOR**. Une fois installée elle apparait dans vos intégrations installées.

![System Monitor](https://back.iotheque.com/wp-content/uploads/2025/06/Capture-decran-2025-06-04-a-15.37.23-1.png)

Comme indiqué dans la documentation de l'intégration, les capteurs sont par défaut tous désactivés. Rendez vous sur l'intégration pour activer les capteurs suivants (vous pouvez en activer d'autres si vous le souhaitez):
- System Monitor Memory usage
- System Monitor Processor temperature 
- System Monitor Memory free 
- System Monitor Processor use

Vous pouvez ensuite créer vos dashboard et suivre les métriques système de votre MAPIO.

![System Monitor](https://back.iotheque.com/wp-content/uploads/2025/06/Capture-decran-2025-06-04-a-15.44.47-3.png)
![System Monitor](https://back.iotheque.com/wp-content/uploads/2025/06/Capture-decran-2025-06-04-a-15.44.07-3.png)
![System Monitor](https://back.iotheque.com/wp-content/uploads/2025/06/Capture-decran-2025-06-04-a-15.43.48-3.png)
![System Monitor](https://back.iotheque.com/wp-content/uploads/2025/06/Capture-decran-2025-06-04-a-15.44.47-2.png)