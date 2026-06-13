param([string]$CommitMsgFile)

$ErrorActionPreference = "Stop"

$validTypes  = @('feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert')
$typePattern = '^(' + ($validTypes -join '|') + '): .+ \(#\d+\)$'

$content   = Get-Content $CommitMsgFile -Raw -Encoding UTF8
$firstLine = ($content -split "`n")[0].Trim()

# Skip merge / revert / fixup commits
if ($firstLine -match '^(Merge|Revert|fixup!|squash!) ') {
    exit 0
}

if ($firstLine -notmatch $typePattern) {
    Write-Error @"
Commit message format error.
Current : $firstLine

Expected: type: short summary (#issue-number)
Example : feat: add session router for multi-deck app (#3)

Valid types: $($validTypes -join ', ')
"@
    exit 1
}

Write-Host "Commit message check passed."
exit 0
