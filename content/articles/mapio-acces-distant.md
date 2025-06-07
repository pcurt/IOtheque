---
title: 'MAPIO: Configurer un accès distant'
description: Configuration d'un accès distant via un reverse proxy Caddy sur MAPIO. 
image:
  src: https://back.iotheque.com/wp-content/uploads/2024/01/Caddy-Web-Server-980x668-optimized.png.webp
  alt: Image de Caddy.
categories:
- domotique
authors:
  - name: Pierrick Curt
    social: https://www.linkedin.com/in/pierrick-curt/
publishedAt: 2024-01-30
---


## Introduction

Une fois que vous aurez commencé à utiliser des services sur votre gateway MAPIO, vous aller sûrement vouloir accéder à ces services depuis l'extérieur : Home Assistant, Nextcloud, Jellyfin sont des services auxquels on souhaite accéder depuis n'importe où et pas seulement depuis son réseau local.

Certains services comme Home Assistant proposent un service cloud si vous ne souhaitez pas configurer vous même votre accès distant https://www.home-assistant.io/cloud/. Dans cet article nous allons vous présenter comment configurer votre propre accès distant et configurer les différents services exécutés par votre MAPIO pour qu'ils soient accessibles depuis l'extérieur.

## Prérequis

D'abord un petit rappel sur le fonctionnement d'internet et les différentes machines communiquant entre elles. Tous les équipements connectés à votre box internet ne sont pas vus par le monde extérieur. Ce qui peut être visible de l'extérieur c'est seulement votre box internet. La box internet possède une adresse IP publique, c'est cette IP qui va nous permettre d'accéder à notre MAPIO depuis l'extérieur. On pourrait utiliser directement cette IP publique mais ce n'est pas pratique notamment parce que peu de FAI permettent d'avoir une IP publique fixe.

La première chose est donc d'avoir un nom de domaine. Il existe des services gratuits permettant d'avoir nom de domaine qui suit l'IP publique de la box internet (par exemple https://www.dynu.com). une fois ce nom de domaine configuré, vous pouvez configurer votre box internet pour ouvrir un port extérieur vers un port intérieur sur l'IP de votre MAPIO. Nous vous conseillons de configurer le DHCP de votre box internet pour toujours attribuer la même IP à votre MAPIO et ainsi éviter de refaire cette configuration à l'avenir. Nous allons accéder aux services de MAPIO via une connexion sécurisée HTTPS dont le port par défaut est 443. Vous pouvez utiliser le port extérieur 443 ou un autre de votre choix. Mais si vous choisissez un autre port que le 443 il faudra l'indiquer dans l'URL de votre navigateur.

Donc nous voilà avec les prérequis suivants:
- Un nom de domaine associé à l'IP publique de notre modem
- Un port extérieur ouvert redirigé vers l'IP fixe de MAPIO sur son port 443

## Installation

Nous allons utiliser un reverse proxy installé sur MAPIO pour configurer notre accès extérieur. Voici différents rerverse proxy qui existent :

- Caddy
- Traefik
- Nginx
- Apache


Caddy et Traefik gèrent pour nous toute la partie certificat HTTPS de manière automatique, ce qui facilite grandement leur utilisation. Dans cet article nous utiliserons Caddy (https://caddyserver.com/docs/quick-starts/reverse-proxy).

Sur MAPIO, la configuration de Caddy se passe dans le fichier **/usr/local/caddy/Caddyfile**.

Voici une exemple basique adapté à Home Assistant

```
mondomaine.ddnsfree.com {
        
	reverse_proxy host.docker.internal:8123
}
```

Il faut maintenant autoriser Home Assistant à être accessible depuis une adresse extérieure. Ca se passe dans le fichier de configuration de Home Assistant (/usr/local/homeassistant/configuration.yaml)

```
http:
  use_x_forwarded_for: true
  trusted_proxies:
    - 127.0.0.1
    - 172.16.0.0/12
    - ::1
```

Il ne reste plus qu'a démarrer le conteneur contenant Caddy. Il y a déjà une configuration du conteneur Caddy intégrée à MAPIO OS dans le fichier /home/root/mapio/docker-compose.yml. Il faut ajouter le contenu suivant dans le bloc homeassistant :

```
    depends_on:
      - zigbee2mqtt
      - caddy
```

Avec simplement ces actions et les prérequis cités précédemment vous n'avez plus qu'à démarrer le conteneur docker Caddy avec le docker-compose.yml d'exemple installé par défaut.

```
docker-compose -f /home/root/mapio/docker-compose.yml up -d homeassistant
```

N'hésitez à regarder le contenu du docker-compose.yml pour vous familiariser avec.

Une fois le conteneur démarré, essayez d'accéder depuis par exemple votre téléphone en 4G à l'adresse suivante  https://mondomaine.ddnsfree.com:[PORT SI DIFFERENT DE 443]. Vous devriez arriver sur la page d'accueil de votre Home Assistant. Pensez à mettre un mot de passe robuste à votre page de login.

Le reverse proxy nous permet maintenant de créer des sous-domaines de manière également automatique. Par exemple si je souhaite avoir accès mon instance de Jellyfin depuis l'extérieur. N'oubliez pour chaque nouveau service ajouté, d'ajouter la dépendance dans le bloc correspondant de votre docker-compose.yml afin que les services soient démarrés dans le bon ordre.

```
mondomaine.ddnsfree.com {
	reverse_proxy host.docker.internal:8123
}
jellyfin.mondomaine.ddnsfree {
        reverse_proxy host.docker.internal:8096
}
```

Maintenant en allant sur l'adresse https://jellyfin.mondomaine.ddnsfree, j'accède à mon serveur. 

Et voilà vous avez toutes les infos pour commencer à configurer et utiliser vos services activés sur MAPIO depuis l'extérieur !