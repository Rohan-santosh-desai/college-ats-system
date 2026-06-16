function Play-Fahhh {
    $player = New-Object System.Media.SoundPlayer "C:\Users\rohan\sounds\fahhhhhhhhhhhhhh.wav"
$player.Play()
}

function global:Prompt {
    if (-not $?) {
        Play-Fahhh
    }
    "PS " + $(Get-Location) + "> "
}