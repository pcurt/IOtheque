---
title: 'MAPIO : installer Home Assistant'
description: Installation du Home Assistant sur MAPIO pour en faire une box domotique. 
image:
  src: https://back.iotheque.com/wp-content/uploads/2025/06/ha.png
  alt: Image de HA.
categories:
- domotique
- homeassistant
authors:
  - name: Pierrick Curt
    social: https://www.linkedin.com/in/pierrick-curt/
publishedAt: 2024-01-24
---


## Introduction

Home Assistant (home-assistant.io) est une plate-forme de domotique open source bénéficiant d'une très grande communauté. Elle propose de nombreuses extensions pour venir communiquer avec beaucoup d'autres plateformes (Somfy, Xiaomi, Apple home, Google home, ...).

Dans cet article nous allons vous présenter comment démarrer et configurer votre propre serveur Home Assistant sur la gateway MAPIO.

## Démarrage

Démarrez MAPIO en branchant l'alimentation

Connectez votre MAPIO à internet, soit directement en branchant un câble ethernet soit en configurant le réseau WIFI via serveur web de configuration comme décrit ici : [basics-configuration](https://mapio-docs.readthedocs.io/en/latest/os-configure.html#basics-configuration)

Ajoutez votre clé SSH depuis le serveur web de configuration comme décrit ici : [basics-configuration](https://mapio-docs.readthedocs.io/en/latest/os-configure.html#basics-configuration)

Connectez-vous sur MAPIO via la commande :

```
$ ssh root@YOUR_LOCAL_IP
````

Note : pour connaître l'adresse IP de votre MAPIO, vous pouvez consulter la vue principale de l'ePaper.


## Installation

Une fois connecté en SSH, allez dans le dossier homeassistant dans le home directory, puis éditez le fichier **docker-compose.yml** avec votre éditeur favori (nano, vim)

```
cd ~/homeassistant
nano docker-compose.yml
```

Home Assistant est pré-configuré pour fonctionner avec zigbee2mqtt. 
zigbee2mqtt est un service permettant à Home Assistant de dialoguer avec des appareils en Zigbee. Il nécessite un module RF Zigbee inséré dans l'un des des trois emplacements des modules externes de MAPIO.

Si vous souhaitez démarrer zigbee2mqtt en même temps que Home Assistant vous avez simplement à remplacer /dev/ttyS1 par le numéro du port série correspondant à l'emplacement utilisé :
- Emplacement A : /dev/ttyS1
- Emplacement B : /dev/ttyAMA3
- Emplacement C : /dev/ttyAMA5

Si vous ne souhaitez pas utiliser zigbee2mqtt vous pouvez simplement supprimer le bloc dédié:

```
  zigbee2mqtt:
    container_name: zigbee2mqtt
    image: koenkk/zigbee2mqtt
    restart: unless-stopped
    volumes:
      - /usr/local/zigbee2mqtt:/app/data
      - /run/udev:/run/udev:ro
    environment:
      - TZ=Europe/Paris
    devices:
    # Make sure this matched your adapter location
      - /dev/ttyS1:/dev/ttyACM0
    network_mode: host
```

Une fois le fichier docker-compose.yml enregistré, démarrez le service en exécutant la commande suivante:

```
docker-compose up -d
```

Une fois l'installation terminée, rendez-vous à l'adresse **http://YOUR_LOCAL_IP:8123** depuis un navigateur connecté au même réseau que MAPIO, et faites la première configuration (création de l'utilisateur, du mot de passe, paramètres de localisation, ...)

Configuration

La première intégration que l'on vous conseille est MQTT, qui permet d'utiliser le module Zigbee. Elle est à installer avec la configuration suivante :
- Adresse : localhost
- Port : 1883
- (Pas d'utilisateur ni de mot de passe)

Vous aurez ensuite accès au matériel exposé par MAPIO
- Le relai de puissance
- La LED RGB USER (LED du milieu en façade)

A vous maintenant de configurer Home Assistant selon votre besoin en suivant les documentations des intégrations de Home Assistant !

Dans un prochain article nous vous expliquerons comment configurer un accès extérieur à votre Home Assistant pouvoir l'utiliser depuis n'importe où.
