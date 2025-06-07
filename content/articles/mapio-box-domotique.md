---
title: 'MAPIO : une box domotique modulaire et multifonctions'
description: MAPIO (Modular Automation PI Opensource) est une box domotique et multimédia. Le produit a été entièrement désigné en France avec une logique d'éco conception. 
image:
  src: https://back.iotheque.com/wp-content/uploads/2025/06/mapio.png
  alt: Image de MAPIO.
categories:
- domotique
authors:
  - name: Pierrick Curt
    social: https://www.linkedin.com/in/pierrick-curt/
publishedAt: 2024-01-10
---


## Présentation

MAPIO (Modular Automation PI Opensource) est une box domotique et multimédia. Le produit a été entièrement désigné en France avec une logique d'éco conception. La domotique est aujourd'hui un marché qui intéresse de plus en plus de personnes cherchant à optimiser et rendre plus agréable leur habitat. MAPIO a été imaginé pour répondre à un maximum de cas d'utilisation et de proposer un produit très fiable. Afin de réduire le nombre d'équipements fonctionnant dans nos habitations, nous avons conçu MAPIO pour répondre à des besoins plus vaste que la domotique : multimédia, stockage, services.

L'ensemble du code exécuté sur la box est open source, le produit n'est connecté à aucun cloud externe.

## Caractéristiques techniques

Voici les caractéristiques techniques de MAPIO

- Basée sur un SoM (System On Module) Raspberry PI CM4 : configurations jusqu'à 8Go de RAM et 32Go de - mémoire flash eMMC, avec ou sans WIFI https://www.raspberrypi.com/products/compute-module-4/?- variant=raspberry-pi-cm4001000
- Boîtier Rail DIN pour installation dans un tableau électrique
- Batterie intégrée apportant jusqu'à 5 heures d'autonomie en cas de coupure de courant
- 1 port RJ45 (débit jusqu'à 1Gbits/s)
- 1 port USB A
- 1 port USB C (2.0)
- 1 connecteur PCIe M2 pour disque SSD (ou autre périphérique PCIe)
- Entrée téléinfo pour compteur Linky
- Relai pour pilotage d'un équipement 230V
- Bus RS485
- 3 emplacements pour modules configurable (1 module Zigbee fourni de base)
- Ecran ePaper en façade
- 3 Boutons physiques
- 3 LEDs tricolores (RGB)

MAPIO est livrée avec une distribution Linux dédiée générée pour l'outil Yocto. L'ensemble du projet Yocto est open source et peut être consulté sur le dépôt GitHub du projet. Le linux intègre l'outil Docker permettant de lancer les services que vous souhaitez.

## Que puis-je faire avec MAPIO ?

Les possibilités offertes par MAPIO sont infinies mais voilà une liste d'exemples de services que vous pouvez activer:
- HomeAssistant pour la gestion de la domotique de la maison
- Domoticz pour la gestion de la domotique de la maison
- Nextcloud pour héberger son propre cloud
- Jellyfin pour déployer son propre média center
- Samba pour partager des fichiers sur le réseau local

Ces services, couplés à MAPIO, vous permettront par exemple de :


- **Créer un système d'alarme complet**. La batterie intégrée garantit le fonctionnement même en cas de coupure électrique, et le module Zigbee permet de se connecter à des capteurs de porte, une sirène ou un clavier
- **Optimiser votre consommation et production électrique**. En connectant votre Linky à l'entrée TIC de MAPIO, vous pouvez suivre votre consommation/production électrique, et activer votre chauffe-eau ou la charge de votre véhicule électrique grâce au relai intégré.
- **Créer un serveur multimédia**. Grâce à l'emplacement PCIe, vous pouvez rajouter un SSD et accéder à vos films, musiques et photos partout, sans abonnement.
- **Sauvegardez vos données sans passer par un cloud tiers**. Avec le SSD et le port Ethernet 1Gbits/s, enregistrez automatiquement les données de vos équipements : smartphone, PC, caméra de surveillance.

Vous trouverez dans ce blog des articles vous expliquant comment activer chacun des services.
