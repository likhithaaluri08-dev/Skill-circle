@echo off
title Deploy SkillCircle to Netlify (Permanent Live Link)
cd /d "%~dp0"
echo ================================================================
echo   SkillCircle - Deploying to Netlify (Permanent Cloud Hosting)
echo ================================================================
echo.
echo 1. Opening Netlify Drop in your browser: https://app.netlify.com/drop
echo 2. Highlighting "dist.zip" in your folder...
echo.
echo Simply DRAG and DROP "dist.zip" into the Netlify webpage!
echo.
echo Netlify will give you a permanent live HTTPS link in 5 seconds
echo that NEVER disconnects, has NO passwords, and works anywhere!
echo ================================================================
start "" "https://app.netlify.com/drop"
timeout /t 2 /nobreak >nul
explorer /select,"%~dp0dist.zip"
pause
