$content = Get-Content -Path "d:\myblog\blog\src\codenotes\lc-hot100\二叉树 （共17题）.md" -Raw -Encoding UTF8

$content = $content -replace '<font style="color:rgb\(15, 17, 21\);">', ''
$content = $content -replace '</font>', ''

Set-Content -Path "d:\myblog\blog\src\codenotes\lc-hot100\二叉树 （共17题）.md" -Value $content -Encoding UTF8

Write-Host "Done"
