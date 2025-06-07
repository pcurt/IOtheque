---
title: 'MAPIO: sécuriser ses données avec un système de sauvegarde (restic)'
description: Comment mettre en place une solution automatique de backup avec restic 
image:
  src: https://back.iotheque.com/wp-content/uploads/2024/05/d8992cda487db3fe87f027a9a7d05477816bd359.png
  alt: Image de Restic.
categories:
- domotique
- homeassistant
authors:
  - name: Pierrick Curt
    social: https://www.linkedin.com/in/pierrick-curt/
publishedAt: 2025-05-20
---


## Présentation

Maintenant que vous utilisez MAPIO au quotidien, il est important de garder en tête qu'il faut toujours sauvegarder les données importantes. Personne n'est à l'abri d'une défaillance matérielle, un incendie, un dégât des eaux, un vol ou tout simplement une mauvaise manipulation. Dans cet article je vais vous expliquer comment configurer un système de sauvegarde automatique et optimisé.

Voici les requis pour le système de sauvegarde à mettre en place :
- être stocké dans un endroit physiquement distan- 
- gérer la sauvegarde par delt- 
- être chiffr- 
- être entièrement configurable (dossiers à sauvegarder, fréquence, politique de rétention, ...)

## Solution retenue

La solution retenue pour gérer les backup sur MAPIO est [restic](https://github.com/restic/restic). Entièrement open source, il répond aux différentes attentes.

Il lui manque simplement de quoi le configurer avec un fichier de configuration et avoir un système de scheduler qui permet de déclencher une mise à jour à la fréquence voulue. Le wrapper open source [resticprofile](https://github.com/creativeprojects/resticprofile) a donc été utilisé.

L'ensemble est pré-installé dans MAPIO OS via le service resticprofile dans le fichier **/home/root/mapio/docker-compose.yml**. Un exemple de fichier de configuration est pré-installé dans **/usr/local/resticprofile/profiles.yaml**.


## Configuration sur MAPIO

### Choix du backend

La première étape est de choisir votre serveur sur lequel vous allez envoyer les sauvegardes. La documentation de restic détaille les différentes solutions prises en charge : [restic-backends](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html)

Dans cet article j'utilise le backend en sftp. J'ai configuré un serveur distant accessible en SSH, et ai donné les accès à ma MAPIO sur ce serveur.

### Configuration docker-compose.yml

Voici la section pour le resticprofile

```
  resticprofile:
    image: creativeprojects/resticprofile:latest
    container_name: resticprofile
    entrypoint: '/bin/sh'
    command:
      - '-c'
      - 'resticprofile schedule --all && crond -f'
    volumes:
      - /usr/local/resticprofile/.ssh:/root/.ssh
      - /usr/local/resticprofile/profiles.yaml:/etc/resticprofile/profiles.yaml:ro
      - /usr/local/resticprofile/key:/etc/resticprofile/key:ro
      - /usr/local/gitea:/gitea
      - /usr/local/nvme/nextcloud:/nextcloud
      - /usr/local/homeassistant:/homeassistant
      - /usr/local/caddy:/caddy
      - /usr/local/mapio:/mapio
      - /usr/local/mattermost-db:/mattermost-db
      - /usr/local/mattermost:/mattermost
      - /usr/local/zigbee2mqtt:/zigbee2mqtt
    environment:
      - TZ=Europe/Paris
````

Il faut ajouter dans les volumes une ligne pour chaque dossier que l'on souhaite sauvegarder. Le fichier /usr/local/resticprofile/key contient la clé pour chiffrer la sauvegarde. restic a besoin d'une configuration spécifique pour le sftp passée dans le dossier /usr/local/resticprofile/.ssh/ (à voir dans la section suivante).

### Configuration de restic

Pour simplifier l'utilisation de restic, je l'installe directement sur mon PC : [restic-install](https://restic.readthedocs.io/en/stable/020_installation.html#installation)

Puis je crée mon serveur de backup

```
restic -r sftp:mapio@xxx.xxx.xxx.xxx:/data/mapio/upload init
```

Le mot de passe généré est celui à copier dans le fichier key présent sur MAPIO. Il faut maintenant faire la configuration côté MAPIO. Tel que décrit dans la documentation de restic, je crée un fichier **/usr/local/resticprofile/.ssh/config **qui contient les champs suivants :

```
Host xxx.xxx.xxx.xxx
  HostName xxx.xxx.xxx.xxx
  StrictHostKeyChecking no
  User mapio
  IdentityFile ~/.ssh/id_rsa
```

Cette configuration permet au sftp de se connecter de manière non interactive.

Il reste plus qu'à compléter le fichier **/usr/local/resticprofile/profiles.yml**. Voici son contenu :

```
global:
  scheduler: crond

default:
  password-file: key
  repository: sftp:xxx.xxx.xxx.xxx:/data/mapio/upload
  initialize: true
  backup:
    source:
      - /gitea
      - /nextcloud
      - /homeassistant
      - /caddy
      - /mapio
      - /mattermost-db
      - /mattermost
      - /zigbee2mqtt
      - /etc/resticprofile
    exclude-caches: true
    one-file-system: true
    schedule: "03:00,00"
    schedule-permission: system
    check-before: true
  retention:
    before-backup: false
    after-backup: true
    keep-monthly: 1
    keep-yearly: 1
    keep-last: 10
    prune: true
```

On retrouve une ligne par dossier sauvegardé correspondant aux volumes du docker-compose.yaml. Le scheduler est configuré de la manière suivante :
- Sauvegarde tous les jours à 3h du mati- 
- Conservation des 10 dernières sauvegarde- 
- Conservation d'une sauvegarde par mois et une par a- 
- Effacement automatique des vieilles sauvegardes

Cette configuration est à adapter en fonction de vos besoins en suivant la documentation de restic.

Démarrage et test de la sauvegarde

Une fois la configuration faite vous n'avez plus qu'à démarrer le service via la commande habituelle de docker-compose :

```
docker-compose -f /home/root/mapio/docker-compose.yml up -d resticprofile
```

Les logs de resticprofile permettent de vérifier que la connexion au serveur s'est bien passée et que la prochaine sauvegarde est prévue.

```
root@mapio:~/mapio# docker-compose logs -f resticprofile
Attaching to resticprofile
resticprofile    | 2024/05/03 11:14:35 using configuration file: /etc/resticprofile/profiles.yaml
resticprofile    |
resticprofile    | Analyzing backup schedule 1/1
resticprofile    | =================================
resticprofile    |   Original form: 03:00,00
resticprofile    | Normalized form: *-*-* 03:00:00
resticprofile    |     Next elapse: Sat May  4 03:00:00 CEST 2024
resticprofile    |        (in UTC): Sat May  4 01:00:00 UTC 2024
resticprofile    |        From now: 15h45m24s left
resticprofile    |
resticprofile    | 2024/05/03 11:14:35 scheduled job default/backup created
resticprofile    | 2024/05/03 11:15:08 using configuration file: /etc/resticprofile/profiles.yaml
resticprofile    |
resticprofile    | Analyzing backup schedule 1/1
resticprofile    | =================================
resticprofile    |   Original form: 03:00,00
resticprofile    | Normalized form: *-*-* 03:00:00
resticprofile    |     Next elapse: Sat May  4 03:00:00 CEST 2024
resticprofile    |        (in UTC): Sat May  4 01:00:00 UTC 2024
resticprofile    |        From now: 15h44m51s left
resticprofile    |
resticprofile    | 2024/05/03 11:15:08 scheduled job default/backup created
```

Une fois la première sauvegarde effectuée, je peux vérifier son contenu et la restaurer si besoin depuis mon PC avec la commande suivante :

```
restic -r sftp:mapio@xxx.xxx.xxx.xxx:/data/mapio/upload snapshots                                                                           ✘ INT  11:18:04
enter password for repository:
repository d473d949 opened (version 2, compression level auto)
ID        Time                 Host          Tags        Paths
---------------------------------------------------------------------------

85adf2e5  2024-04-30 20:10:07  797abed52a9e              /caddy
                                                         /etc/resticprofile
                                                         /gitea
                                                         /homeassistant
                                                         /mapio
                                                         /mattermost
                                                         /mattermost-db
                                                         /nextcloud
                                                         /zigbee2mqtt

340d8bf2  2024-05-02 03:00:10  fc4a284f98da              /caddy
                                                         /etc/resticprofile
                                                         /gitea
                                                         /homeassistant
                                                         /mapio
                                                         /mattermost
                                                         /mattermost-db
                                                         /nextcloud
                                                         /zigbee2mqtt
---------------------------------------------------------------------------
```