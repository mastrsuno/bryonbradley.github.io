@echo off
cd /d "%~dp0"
echo Pushing Bryon Bradley portfolio to GitHub...
echo.
"C:\Program Files\Git\cmd\git.exe" status --short --branch
echo.
"C:\Program Files\Git\cmd\git.exe" push -u origin main
echo.
echo If GitHub opened a login window, complete it and run this file again if needed.
pause
