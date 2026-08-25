$ErrorActionPreference = "Stop"

function Install-WithWinget {
    param(
        [string]$Name,
        [string]$Id
    )

    if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
        Write-Warning "winget is not available on PATH. Please install the Microsoft Store or App Installer package for winget first."
        return
    }

    Write-Host "Installing $Name..."
    winget install --id $Id --accept-source-agreements --accept-package-agreements --silent -e
}

Write-Host "Checking required developer tools..."

Install-WithWinget -Name "Node.js LTS" -Id "OpenJS.NodeJS.LTS"
Install-WithWinget -Name "Git" -Id "Git.Git"
Install-WithWinget -Name "PHP 8.3" -Id "PHP.PHP.8.3"
Install-WithWinget -Name "Composer" -Id "Composer.Composer"
Install-WithWinget -Name "Docker Desktop" -Id "Docker.DockerDesktop"

Write-Host ""
Write-Host "If you want MariaDB without Docker, install MariaDB Server from the official package manager."
Write-Host "The default workspace uses Docker for MariaDB 11.4 LTS."
