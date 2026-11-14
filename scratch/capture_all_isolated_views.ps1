$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$baseDir = "C:\Users\rahul\Desktop\LOVE\the-art-of-her"
$outDir = "$baseDir\assets\screenshots"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

$shots = @(
    @{
        name = "02_theme_emerald_royale.png";
        url = "file:///$baseDir/index.html?theme=emerald-royale&nomodal=1&isolate=editorial";
        size = "1440,900";
        wait = 4000
    },
    @{
        name = "03_theme_ocean_emerald.png";
        url = "file:///$baseDir/index.html?theme=ocean-emerald&nomodal=1&isolate=editorial";
        size = "1440,900";
        wait = 4000
    },
    @{
        name = "05_constellation_3d_mobile.png";
        url = "file:///$baseDir/index.html?theme=emerald-royale&nomodal=1&isolate=constellation";
        size = "390,844";
        wait = 4500
    },
    @{
        name = "06_garden_3d_desktop.png";
        url = "file:///$baseDir/index.html?theme=emerald-royale&nomodal=1&isolate=garden";
        size = "1440,900";
        wait = 5000
    },
    @{
        name = "07_garden_3d_mobile.png";
        url = "file:///$baseDir/index.html?theme=emerald-royale&nomodal=1&isolate=garden";
        size = "390,844";
        wait = 4500
    },
    @{
        name = "08_calls_section_desktop.png";
        url = "file:///$baseDir/index.html?theme=emerald-royale&nomodal=1&isolate=calls";
        size = "1440,900";
        wait = 4000
    },
    @{
        name = "09_promise_beside_you_monument.png";
        url = "file:///$baseDir/index.html?theme=emerald-royale&nomodal=1&isolate=letter";
        size = "1440,900";
        wait = 4000
    }
)

foreach ($shot in $shots) {
    $outPath = Join-Path $outDir $shot.name
    Write-Host "Capturing $($shot.name)..."
    $args = @(
        "--headless=new",
        "--no-sandbox",
        "--allow-file-access-from-files",
        "--window-size=$($shot.size)",
        "--screenshot=$outPath",
        "--virtual-time-budget=$($shot.wait)",
        $shot.url
    )
    Start-Process -FilePath $chromePath -ArgumentList $args -Wait -NoNewWindow
    if (Test-Path $outPath) {
        $len = (Get-Item $outPath).Length
        Write-Host " -> OK: $($shot.name) ($([math]::Round($len / 1024, 1)) KB)"
    } else {
        Write-Host " -> FAILED: $($shot.name)"
    }
}

Write-Host "Batch capture completed!"
