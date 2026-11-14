$serverProcess = Start-Process -FilePath "agy-node.cmd" -ArgumentList "c:\Users\rahul\Desktop\LOVE\the-art-of-her\scratch\server.js" -PassThru -NoNewWindow
Start-Sleep -Seconds 2

try {
    Write-Host "Probing server at http://localhost:8085/..."
    $res = Invoke-WebRequest -Uri "http://localhost:8085/index.html" -UseBasicParsing
    Write-Host "Server status code: $($res.StatusCode)"

    $chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
    $outPng = "C:\Users\rahul\Desktop\LOVE\the-art-of-her\assets\screenshots\test_local_server.png"
    $args = @(
        "--headless=new",
        "--no-sandbox",
        "--window-size=1440,900",
        "--screenshot=$outPng",
        "--virtual-time-budget=3000",
        "http://localhost:8085/index.html"
    )
    Start-Process -FilePath $chromePath -ArgumentList $args -Wait -NoNewWindow
    if (Test-Path $outPng) {
        $len = (Get-Item $outPng).Length
        Write-Host "SUCCESS: Captured test_local_server.png ($([math]::Round($len / 1024, 1)) KB)"
    }
} finally {
    Write-Host "Stopping server process..."
    Stop-Process -Id $serverProcess.Id -Force -ErrorAction SilentlyContinue
}
