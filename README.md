# wsl-safe-delete README

## Features

When using VSCode Remote - WSL, this extension adds "Move to Trash" option, which is safer than "Delete Permanently" option, to the context menu of sidebar file explorer.

## Requirements

You need to install trash-cli on WSL2:
```bash
sudo apt install trash-cli
```

## Limitations

Restoring deleted files from VSCode is not possible.
You can restore them by manually using `trash-restore` command.

## Release Notes

### 0.1.0

First release.
