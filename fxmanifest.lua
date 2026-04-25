fx_version "cerulean"
use_fxv2_oal "yes"
lua54 "yes"
game "gta5"
version "1.0.0"
description "A simple notification system"
name 'krs_notify'
author "karos7804"

client_scripts {
    'client.lua', 
}

ui_page 'web/index.html'

files {
    'web/*'
}

export 'Alert'