# Interactive Firebase login + deploy for Harness Cart.
# Run in Windows PowerShell (not Cursor agent shell):
#   cd C:\Projects\Github\cableworld\website
#   .\scripts\firebase-deploy.ps1

$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)

Write-Host 'Harness Cart — Firebase deploy' -ForegroundColor Cyan
Write-Host ''
Write-Host 'Step 1: Sign in to Firebase CLI (browser will open)...' -ForegroundColor Yellow
npx firebase-tools login --reauth

Write-Host ''
Write-Host 'Step 2: Deploy auth providers, Firestore rules, and Storage rules...' -ForegroundColor Yellow
npx firebase-tools deploy --only auth,firestore,storage --project harnesscart

Write-Host ''
Write-Host 'Done. Enable Facebook/Apple manually in Console if needed:' -ForegroundColor Green
Write-Host 'https://console.firebase.google.com/project/harnesscart/authentication/providers'
