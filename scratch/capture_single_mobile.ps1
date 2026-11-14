$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outPng = "C:\Users\rahul\Desktop\LOVE\the-art-of-her\assets\screenshots\test_museum_mobile_details.png"
if (Test-Path $outPng) { Remove-Item $outPng -Force }

$url = "file:///C:/Users/rahul/Desktop/LOVE/the-art-of-her/museum.html#isolate-room-02"

$args = @(
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--allow-file-access-from-files",
    "--window-size=390,844",
    "--screenshot=$outPng",
    "--virtual-time-budget=3000",
    $url
)

Start-Process -FilePath $chromePath -ArgumentList $args -Wait -NoNewWindow
if (Test-Path $outPng) {
    Write-Host "SUCCESS: Captured fresh mobile screenshot!"
    Get-Item $outPng | Select-Object Name, LastWriteTime, Length
} else {
    Write-Warning "Failed to capture."
}
