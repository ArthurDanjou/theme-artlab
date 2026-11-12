<h1 align="center">ArtLab Theme</h1>

<p align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=arthurdanjou.theme-artlab" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/v/arthurdanjou.theme-artlab.svg?color=4d9375&amp;label=VS%20Code%20Marketplace&logo=visual-studio-code" alt="Visual Studio Marketplace Version" /></a>
</p>

<p align="center">
<img width="1275" alt="Screenshot Light Mode" src="/artlab-theme-light.png">
<img width="1275" alt="Screenshot Dark Mode" src="/artlab-theme-dark.png">
<sub><samp>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Font | <a href="https://monaspace.githubnext.com/">Monaspace by Github</a><br>
&nbsp;File Icons | <a href="https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc-icons">Catppuccin</a><br>
Product Icons | <a href="https://github.com/antfu/vscode-icons-carbon">Carbon</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Inspiration | <a href="https://github.com/antfu/vitesse">Vitesse</a> + <a href="https://github.com/catppuccin/catppuccin">Catppuccin</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</samp></sub>
</p>

ArtLab is a cross-platform theme that blends the clarity of Vitesse (by antfu) with the cozy palettes of Catppuccin. Available for VS Code, Home Assistant, Mealie, Zed, Ghostty, T3 Code, and Obsidian.

## Match with System

<!--eslint-skip-->

```jsonc
// .vscode/setting.json
{
  "window.autoDetectColorScheme": true,
  "workbench.preferredLightColorTheme": "ArtLab Light",
  "workbench.preferredDarkColorTheme": "ArtLab Dark",
}
```

## Supported Platforms

### VS Code

Install from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=arthurdanjou.theme-artlab).

### Home Assistant

Copy [`exports/homeassistant/artlab.yaml`](./exports/homeassistant/artlab.yaml) to your Home Assistant `themes/` directory, then reload themes and select **ArtLab** in your profile settings.

### Mealie

Copy the variables from [`exports/mealie/artlab.env`](./exports/mealie/artlab.env) into the `environment:` section of your Mealie `docker-compose.yml`, or reference the file with `env_file`:

```yaml
services:
  mealie:
    env_file:
      - path/to/artlab.env
```

Then recreate the container. Clear browser cookies if the old colors persist.

### Zed

Copy [`exports/zed/artlab.json`](./exports/zed/artlab.json) to your Zed themes directory (`~/.config/zed/themes/`).

### Ghostty

Copy the theme files from [`exports/ghostty/`](./exports/ghostty/) to your Ghostty config directory, then set:

```ini
theme = artlab-dark
# or
theme = artlab-light
```

### T3 Code

In T3 Code, open **Settings → Appearance**, choose **Add theme**, and select [`exports/t3code/artlab.json`](./exports/t3code/artlab.json). The file contains both the light and dark palettes, so a single import covers both appearances.

To publish the theme from a T3 Code server, copy [`exports/t3code/artlab.json`](./exports/t3code/artlab.json) to `~/.t3/userdata/themes/artlab.json` (or the `themes` directory under your custom state directory), then run `t3 theme set artlab` or select **ArtLab** in Settings → Appearance.

### Obsidian

Copy the `exports/obsidian/` folder contents into your vault's `.obsidian/themes/ArtLab/` directory (create it if needed), then enable **ArtLab** under Settings → Appearance → Themes. The folder contains a `manifest.json` and a `theme.css` covering both light and dark modes.

## Links

[vitesse](https://github.com/antfu/vitesse) - one of the main inspirations.

[catppuccin](https://github.com/catppuccin/catppuccin) - palette inspiration.

## Thanks

Thanks to [Vitesse](https://github.com/antfu/vitesse) and [Catppuccin](https://github.com/catppuccin/catppuccin) for the inspiration.

Special thanks to [Bubble](https://github.com/Clooos/Bubble) for the Home Assistant theme structure.

## License

MIT - Copyright (c) 2026 Arthur Danjou
