\
    @echo off
    setlocal
    title Mini Mercado Livre - App
    set URL=http://127.0.0.1:5173/
    echo Abrindo como App: %URL%
    start msedge --app="%URL%" --window-size=430,820
    endlocal
