param(
  [int]$Port = 4173
)

$root = (Get-Location).Path
$prefix = "http://localhost:$Port/"
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add($prefix)

$contentTypes = @{
  ".html" = "text/html"
  ".css" = "text/css"
  ".js" = "application/javascript"
  ".webmanifest" = "application/manifest+json"
  ".svg" = "image/svg+xml"
  ".png" = "image/png"
  ".json" = "application/json"
}

$listener.Start()
Write-Host "SSH Workbench is running at $prefix"
Write-Host "Press CTRL+C to stop."

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $path = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart("/"))

    if ([string]::IsNullOrWhiteSpace($path)) {
      $path = "index.html"
    }

    $fullPath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($root, $path))

    if (-not $fullPath.StartsWith($root) -or -not [System.IO.File]::Exists($fullPath)) {
      $context.Response.StatusCode = 404
      $context.Response.ContentType = "text/plain"
      $bytes = [Text.Encoding]::UTF8.GetBytes("Not found")
    } else {
      $extension = [System.IO.Path]::GetExtension($fullPath)
      $context.Response.ContentType = $contentTypes[$extension]

      if (-not $context.Response.ContentType) {
        $context.Response.ContentType = "application/octet-stream"
      }

      $bytes = [System.IO.File]::ReadAllBytes($fullPath)
    }

    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $context.Response.Close()
  }
} finally {
  $listener.Stop()
}
