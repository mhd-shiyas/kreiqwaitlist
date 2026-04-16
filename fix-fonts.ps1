Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.css" | ForEach-Object {
  $content = Get-Content $_.FullName -Raw
  $updated = $content -replace "font-geist", "font-inter"
  Set-Content $_.FullName $updated -NoNewline
}
Write-Host "Done replacing font-geist -> font-inter"
