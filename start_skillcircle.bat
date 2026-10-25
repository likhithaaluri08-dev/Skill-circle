@echo off
title SkillCircle - Learn Without Money
cd /d "%~dp0"
echo ================================================================
echo   SkillCircle - AI-Powered Reciprocal Skill Exchange
echo ================================================================
echo.
echo Detecting Wi-Fi IP address for mobile / hotspot sharing...
powershell -NoProfile -Command "Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -like '*Wi-Fi*' } | ForEach-Object { Write-Host ('  >>> Local Wi-Fi Sharing Link: http://' + $_.IPAddress + ':5173') -ForegroundColor Green }"
echo.
echo Opening browser to http://localhost:5173 ...
start "" http://localhost:5173
cd SIH
npm run preview
