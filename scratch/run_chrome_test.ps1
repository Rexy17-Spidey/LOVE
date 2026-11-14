$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outPng = "C:\Users\rahul\Desktop\LOVE\the-art-of-her\scratch\test_chrome.png"
$url = "file:///C:/Users/rahul/Desktop/LOVE/the-art-of-her/index.html"

Write-Host "Checking Chrome: $chromePath"
if (Test-Path $chromePath) {
    Write-Host "Chrome found!"
    $args = @(
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--allow-file-access-from-files",
        "--window-size=1280,800",
        "--screenshot=$outPng",
        "--virtual-time-budget=4000",
        $url
    )
    Start-Process -FilePath $chromePath -ArgumentList $args -Wait -NoNewWindow
    if (Test-Path $outPng) {
        Write-Host "SUCCESS: Screenshot saved to $outPng"
        Get-Item $outPng | Select-Object Name, Length
    } else {
        Write-Host "Chrome finished, but output file not found."
    }
} else {
    Write-Host "Chrome not found at $chromePath"
}
