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

ArtLab is a cross-platform theme that blends the clarity of Vitesse (by antfu) with the cozy palettes of Catppuccin. Available for VS Code, Home Assistant, Zed, and Ghostty.

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

#### Via HACS (recommended)

1. Open HACS → **Frontend** → Menu (⋮) → **Custom repositories**
2. Add `https://github.com/arthurdanjou/theme-artlab` with category **Theme**
3. Click **Download** on the ArtLab card
4. Go to your Home Assistant **Profile** → select **ArtLab** in the theme dropdown

#### Manual

Copy [`themes/artlab.yaml`](./themes/artlab.yaml) to your Home Assistant `themes/` directory, then reload themes and select **ArtLab** in your profile settings.

### Zed

Copy [`zed/artlab.json`](./zed/artlab.json) to your Zed themes directory (`~/.config/zed/themes/`).

### Ghostty

Copy the theme files from [`ghostty/`](./ghostty/) to your Ghostty config directory, then set:

```ini
theme = artlab-dark
# or
theme = artlab-light
```

## Links

[vitesse](https://github.com/antfu/vitesse) - one of the main inspirations.

[catppuccin](https://github.com/catppuccin/catppuccin) - palette inspiration.

## Thanks

Thanks to [Vitesse](https://github.com/antfu/vitesse) and [Catppuccin](https://github.com/catppuccin/catppuccin) for the inspiration.

Special thanks to [Bubble](https://github.com/Clooos/Bubble) for the Home Assistant theme structure.

## License

MIT - Copyright (c) 2026 Arthur Danjou
