@echo off
taskkill /f /im CX16xSpeed_Mufanc.exe 2>nul
rmdir /s /q %TEMP%\CX16xSpeed_Mufanc >nul 2>&1
go generate
go build -ldflags "-H windowsgui" -o CX16xSpeed_Mufanc.exe
REM go build -o CX16xSpeed_Mufanc.exe
start "" CX16xSpeed_Mufanc.exe