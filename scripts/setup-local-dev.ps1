$ErrorActionPreference = 'Stop'

$phpPath = 'C:\Users\TOTI\php-8.3.33\php.exe'
$binDir = 'C:\Users\TOTI\bin'
New-Item -ItemType Directory -Force -Path $binDir | Out-Null

$composerSetup = Join-Path $binDir 'composer-setup.php'
if (-not (Test-Path $composerSetup)) {
    Invoke-WebRequest -Uri 'https://getcomposer.org/installer' -OutFile $composerSetup
}

& $phpPath $composerSetup --install-dir=$binDir --filename=composer --quiet

$composerPhar = Join-Path $binDir 'composer.phar'
$composerExe = Join-Path $binDir 'composer'
if (Test-Path $composerPhar) {
    Write-Host 'Composer PHAR found: ' $composerPhar
    & $phpPath $composerPhar --version
} elseif (Test-Path $composerExe) {
    Write-Host 'Composer executable found: ' $composerExe
    & $composerExe --version
} else {
    Write-Host 'Composer not found in bin dir.'
    Get-ChildItem $binDir | Select-Object Name, FullName | Format-Table -AutoSize
    exit 1
}

$env:Path = "$binDir;$env:Path"
[Environment]::SetEnvironmentVariable('Path', "$binDir;" + [Environment]::GetEnvironmentVariable('Path','User'), 'User')

Write-Host '--- Angular CLI ---'
& 'C:\Program Files\nodejs\npx.cmd' --yes @angular/cli@22 version
