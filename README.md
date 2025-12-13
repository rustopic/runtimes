# Runtimes

A curated collection of Docker runtime images designed for Rust-based agent systems. Each image is automatically rebuilt on a regular schedule to ensure dependencies are always up-to-date and secure.

All images are hosted on GitHub Container Registry (`ghcr.io`) and are available under the `games`, `installers`, and `runtimes` namespaces. The following logic determines which namespace an image belongs to:

## Image Categories

### Base Operating Systems (`oses`)
Base images containing essential packages to get you started. These provide a minimal foundation for building custom runtime environments.

- **Alpine**: `ghcr.io/rustopic/runtimes:alpine`
- **Debian**: `ghcr.io/rustopic/runtimes:debian`

### Game Runtimes (`games`)
Images specifically built for running game servers or game-related applications.

- **Rust**: `ghcr.io/rustopic/games:rust`
  - Supports Rust game server with SteamCMD integration
  - Includes branch support (staging, aux01, aux02, aux03)
  - Automatic game server updates

### Runtime Environments (`runtimes`)
Generic runtime images that allow different types of applications or scripts to run. These are typically specific versions of programming languages or frameworks.

#### Node.js Runtimes
- **Node.js 16**: `ghcr.io/rustopic/runtimes:nodejs_16`
- **Node.js 17**: `ghcr.io/rustopic/runtimes:nodejs_17`
- **Node.js 18**: `ghcr.io/rustopic/runtimes:nodejs_18` (LTS)
- **Node.js 20**: `ghcr.io/rustopic/runtimes:nodejs_20` (LTS)
- **Node.js 21**: `ghcr.io/rustopic/runtimes:nodejs_21`
- **Node.js 22**: `ghcr.io/rustopic/runtimes:nodejs_22` (LTS)
- **Node.js 24**: `ghcr.io/rustopic/runtimes:nodejs_24`

### Installer Images (`installers`)
Images used by installation scripts for different applications. These are not designed to run game servers, but rather to reduce installation time and network usage by pre-installing common installation dependencies such as `curl`, `wget`, `git`, and `jq`.

- **Alpine Installer**: `ghcr.io/rustopic/installers:alpine`
- **Debian Installer**: `ghcr.io/rustopic/installers:debian`

## Platform Support

All images are available for both `linux/amd64` and `linux/arm64` architectures, unless otherwise specified. To use these images on an ARM64 system, no modification to the image or tag is needed—they should work out of the box.

## Quick Start

### Pulling an Image

```bash
# Pull a Node.js runtime
docker pull ghcr.io/rustopic/runtimes:nodejs_22

# Pull a game runtime
docker pull ghcr.io/rustopic/games:rust

# Pull a base OS image
docker pull ghcr.io/rustopic/runtimes:alpine
```

### Using in Docker Compose

```yaml
version: '3.8'
services:
  app:
    image: ghcr.io/rustopic/runtimes:nodejs_22
    volumes:
      - ./app:/home/container
    environment:
      - STARTUP=npm start
```

## Contributing

When adding a new version to an existing image, such as `nodejs v25`, add it within a child folder of the runtime directory. For example, create `nodejs/25/Dockerfile`. Please also update the corresponding `.github/workflows` file to ensure the new version is tagged correctly and included in the build matrix.

### Adding a New Runtime

1. Create a new directory under the appropriate category (`nodejs/`, `games/`, etc.)
2. Add a `Dockerfile` with the necessary configuration
3. Update the corresponding workflow file in `.github/workflows/`
4. Update this README with the new image information

## Automated Builds

All images are automatically built and pushed to GitHub Container Registry when:
- Changes are pushed to the `main` branch
- A workflow is manually triggered via GitHub Actions
- Monthly on the 1st of each month (scheduled builds)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

This project includes modified and customized code originally developed by Matthew Penner and licensed under the MIT License. See [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) for third-party license information.

## Support

For issues, questions, or contributions, please visit our [GitHub repository](https://github.com/rustopic/runtimes).
