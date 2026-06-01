@echo off
setlocal
cd /d "%~dp0"

set "PORT=8080"
set "URL=http://localhost:%PORT%/"

echo Starting Vue3 CDN App...
echo URL: %URL%
echo Press Ctrl+C to stop the server.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Stop'; $port=%PORT%; $root=(Get-Location).Path; $url='http://localhost:'+$port+'/'; $mime=@{'.html'='text/html; charset=utf-8';'.htm'='text/html; charset=utf-8';'.js'='application/javascript; charset=utf-8';'.css'='text/css; charset=utf-8';'.json'='application/json; charset=utf-8';'.vue'='text/plain; charset=utf-8';'.ico'='image/x-icon';'.svg'='image/svg+xml';'.png'='image/png';'.jpg'='image/jpeg';'.jpeg'='image/jpeg'}; $listener=[Net.HttpListener]::new(); $listener.Prefixes.Add($url); $listener.Start(); Start-Process $url; try { while ($listener.IsListening) { $ctx=$listener.GetContext(); try { $path=[Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath); if (!$path -or $path -eq '/') { $path='/index.html' }; $rel=$path.TrimStart('/') -replace '/', [IO.Path]::DirectorySeparatorChar; $file=[IO.Path]::GetFullPath((Join-Path $root $rel)); $rootFull=[IO.Path]::GetFullPath($root); if (!$file.StartsWith($rootFull,[StringComparison]::OrdinalIgnoreCase) -or !(Test-Path -LiteralPath $file -PathType Leaf)) { $ctx.Response.StatusCode=404; $body=[Text.Encoding]::UTF8.GetBytes('Not Found'); $ctx.Response.ContentType='text/plain; charset=utf-8' } else { $body=[IO.File]::ReadAllBytes($file); $ext=[IO.Path]::GetExtension($file).ToLowerInvariant(); if ($mime.ContainsKey($ext)) { $ctx.Response.ContentType=$mime[$ext] } else { $ctx.Response.ContentType='application/octet-stream' } }; $ctx.Response.ContentLength64=$body.Length; $ctx.Response.OutputStream.Write($body,0,$body.Length) } finally { $ctx.Response.Close() } } } finally { $listener.Stop() }"

if errorlevel 1 (
  echo.
  echo Failed to start the server.
  pause
)

endlocal
