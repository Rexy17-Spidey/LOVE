$serverProcess = Start-Process -FilePath "cmd.exe" -ArgumentList "/c agy-node.cmd c:\Users\rahul\Desktop\LOVE\the-art-of-her\scratch\server.js" -PassThru -NoNewWindow
Start-Sleep -Seconds 3

try {
    Write-Host "Probing server at http://127.0.0.1:8085/museum.html..."
    $res = Invoke-WebRequest -Uri "http://127.0.0.1:8085/museum.html" -UseBasicParsing
    Write-Host "Server status code: $($res.StatusCode)"

    $chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
    $outDir = "C:\Users\rahul\Desktop\LOVE\the-art-of-her\assets\screenshots"
    if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force }

    $targets = @(
        @{ Name = "test_museum_entrance.png"; Url = "http://127.0.0.1:8085/museum.html"; Width = 1440; Height = 900 },
        @{ Name = "test_museum_masterpiece.png"; Url = "http://127.0.0.1:8085/museum.html#room-01"; Width = 1440; Height = 900 },
        @{ Name = "test_museum_details.png"; Url = "http://127.0.0.1:8085/museum.html#room-02"; Width = 1440; Height = 900 },
        @{ Name = "test_museum_monochrome.png"; Url = "http://127.0.0.1:8085/museum.html#room-04"; Width = 1440; Height = 900 },
        @{ Name = "test_museum_notes.png"; Url = "http://127.0.0.1:8085/museum.html#room-06"; Width = 1440; Height = 900 },
        @{ Name = "test_museum_final.png"; Url = "http://127.0.0.1:8085/museum.html#room-07"; Width = 1440; Height = 900 },
        @{ Name = "test_museum_mobile_masterpiece.png"; Url = "http://127.0.0.1:8085/museum.html#room-01"; Width = 390; Height = 844 }
    )

    foreach ($t in $targets) {
        $outFile = Join-Path $outDir $t.Name
        $args = @(
            "--headless=new",
            "--no-sandbox",
            "--window-size=$($t.Width),$($t.Height)",
            "--screenshot=$outFile",
            "--virtual-time-budget=3000",
            $t.Url
        )
        Start-Process -FilePath $chromePath -ArgumentList $args -Wait -NoNewWindow
        if (Test-Path $outFile) {
            $kb = [math]::Round((Get-Item $outFile).Length / 1024, 1)
            Write-Host "Captured $($t.Name) ($kb KB)"
        } else {
            Write-Warning "Failed to capture $($t.Name)"
        }
    }
} finally {
    Write-Host "Stopping server process..."
    Stop-Process -Id $serverProcess.Id -Force -ErrorAction SilentlyContinue
}
