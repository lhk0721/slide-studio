param(
    [string]$RemoteName,
    [string]$RemoteUrl,
    [string]$StdinFile
)

$ErrorActionPreference = "Stop"

# Single-remote model: origin only, default branch `main`.
$protectedBranches = @('main')
$validBranchTypes   = @('feature', 'fix', 'refactor', 'docs', 'test', 'chore', 'ci', 'perf', 'hotfix', 'release')
# Branch format: issue-number-type-short-description (e.g. 3-feature-session-router)
$branchPattern = '^\d+-(' + ($validBranchTypes -join '|') + ')-.+$'

# Read push refs from temp file
$lines = @()
if ($StdinFile -and (Test-Path $StdinFile)) {
    $lines = Get-Content $StdinFile | Where-Object { $_.Trim() -ne '' }
}

foreach ($line in $lines) {
    $parts = $line -split ' '
    if ($parts.Count -lt 4) { continue }

    $localSha  = $parts[1]
    $remoteRef = $parts[2]
    $remoteSha = $parts[3]

    $branch = $remoteRef -replace '^refs/heads/', ''

    # 1. Block direct push to protected branches
    if ($protectedBranches -contains $branch) {
        Write-Error @"
Push blocked: '$branch' is a protected branch.
  - Work on a feature branch and merge via PR.
  - Direct push to '$branch' is not allowed.
"@
        exit 1
    }

    # 2. Detect force push
    $zeroSha = '0000000000000000000000000000000000000000'
    if ($remoteSha -ne $zeroSha -and $localSha -ne $zeroSha) {
        git merge-base --is-ancestor $remoteSha $localSha 2>$null | Out-Null
        if ($LASTEXITCODE -ne 0) {
            Write-Error @"
Push blocked: force push to '$branch' is not allowed.
  - Do not use --force or --force-with-lease.
"@
            exit 1
        }
    }

    # 3. Warn on invalid branch name format (not blocking)
    if ($localSha -ne $zeroSha -and $branch -notmatch $branchPattern) {
        Write-Warning @"
Branch name advisory: '$branch'
  Recommended format: issue-number-type-description  (e.g. 3-feature-session-router)
  Valid types: $($validBranchTypes -join ', ')
"@
    }
}

Write-Host "Push rules check passed. (remote: $RemoteName)"
exit 0
