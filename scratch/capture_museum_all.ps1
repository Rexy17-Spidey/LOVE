$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outDir = "C:\Users\rahul\Desktop\LOVE\the-art-of-her\assets\screenshots"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force }

$base = "file:///C:/Users/rahul/Desktop/LOVE/the-art-of-her/museum.html"

$tests = @(
    @{ Name = "test_museum_entrance.png"; Url = "$base"; Width = 1440; Height = 900 },
    @{ Name = "test_museum_theme_modal.png"; Url = "$base#theme-modal"; Width = 1440; Height = 900 },
    @{ Name = "test_museum_prologue.png"; Url = "$base#isolate-room-00"; Width = 1440; Height = 900 },
    @{ Name = "test_museum_masterpiece.png"; Url = "$base#isolate-room-01"; Width = 1440; Height = 1000 },
    @{ Name = "test_museum_details.png"; Url = "$base#isolate-room-02"; Width = 1440; Height = 1000 },
    @{ Name = "test_museum_moods.png"; Url = "$base#isolate-room-03"; Width = 1440; Height = 1000 },
    @{ Name = "test_museum_monochrome.png"; Url = "$base#isolate-room-04"; Width = 1440; Height = 1000 },
    @{ Name = "test_museum_archive.png"; Url = "$base#isolate-room-05"; Width = 1440; Height = 1000 },
    @{ Name = "test_museum_curator_notes.png"; Url = "$base#isolate-room-06"; Width = 1440; Height = 1000 },
    @{ Name = "test_museum_final.png"; Url = "$base#isolate-room-07"; Width = 1440; Height = 1000 },
    @{ Name = "test_museum_lightbox.png"; Url = "$base#lightbox"; Width = 1440; Height = 900 },
    @{ Name = "test_museum_secret_note.png"; Url = "$base#secret-note"; Width = 1440; Height = 900 },
    @{ Name = "test_museum_mobile_entrance.png"; Url = "$base"; Width = 390; Height = 844 },
    @{ Name = "test_museum_mobile_masterpiece.png"; Url = "$base#isolate-room-01"; Width = 390; Height = 844 },
    @{ Name = "test_museum_mobile_details.png"; Url = "$base#isolate-room-02"; Width = 390; Height = 844 }
)

foreach ($t in $tests) {
    $outFile = Join-Path $outDir $t.Name
    $args = @(
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--allow-file-access-from-files",
        "--window-size=$($t.Width),$($t.Height)",
        "--screenshot=$outFile",
        "--virtual-time-budget=3000",
        $t.Url
    )
    Start-Process -FilePath $chromePath -ArgumentList $args -Wait -NoNewWindow
    if (Test-Path $outFile) {
        $kb = [math]::Round((Get-Item $outFile).Length / 1024, 1)
        Write-Host "✓ Captured $($t.Name) ($kb KB)"
    } else {
        Write-Warning "✗ Failed to capture $($t.Name)"
    }
}
