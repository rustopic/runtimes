# Image Tagging and Channel Policy

This document describes the tagging strategy and channel definitions for Rustopic Runtimes images.

## Channels

### Stable
- **Purpose**: Production-ready images that have been tested and verified
- **Update Policy**: Regular security updates and dependency updates
- **Tag Format**: `{image}:{version}` (e.g., `ghcr.io/rustopic/runtimes:nodejs_22`)
- **Recommendation**: Use for production environments

### Beta
- **Purpose**: Pre-release images for testing new features
- **Update Policy**: Frequent updates, may contain breaking changes
- **Tag Format**: `{image}:{version}-beta` (e.g., `ghcr.io/rustopic/runtimes:nodejs_24-beta`)
- **Recommendation**: Use for staging/testing environments only

### Staging
- **Purpose**: Development images with experimental features
- **Update Policy**: Very frequent updates, unstable
- **Tag Format**: `{image}:{version}-staging` (e.g., `ghcr.io/rustopic/games:rust-staging`)
- **Recommendation**: Use for development only

## Rust Game Server Branch Support

The Rust game server image supports multiple Steam branches through the `BRANCH` environment variable:

### Branch Mapping

| Branch Value | Description | Tag Mapping |
|-------------|-------------|-------------|
| `null` or empty | Public/default branch | `ghcr.io/rustopic/games:rust` |
| `staging` | Staging branch | `ghcr.io/rustopic/games:rust` (with BRANCH=staging) |
| `aux01` | Auxiliary branch 01 | `ghcr.io/rustopic/games:rust` (with BRANCH=aux01) |
| `aux02` | Auxiliary branch 02 | `ghcr.io/rustopic/games:rust` (with BRANCH=aux02) |
| `aux03` | Auxiliary branch 03 | `ghcr.io/rustopic/games:rust` (with BRANCH=aux03) |

### Usage

The branch is controlled via environment variable at runtime, not through image tags:

```bash
docker run -e BRANCH=staging ghcr.io/rustopic/games:rust
```

## Tag Pinning Recommendations

### Production Environments

**Recommended**: Pin to specific version tags
```yaml
image: ghcr.io/rustopic/runtimes:nodejs_22
```

**Best Practice**: Pin to digest for maximum immutability
```yaml
image: ghcr.io/rustopic/runtimes:nodejs_22@sha256:abc123...
```

### Development Environments

You may use floating tags for easier updates:
```yaml
image: ghcr.io/rustopic/runtimes:nodejs_22
```

## Image Naming Convention

All images follow this pattern:
- **Namespace**: `ghcr.io/rustopic/{category}`
- **Category**: `games`, `runtimes`, `installers`
- **Tag**: `{name}_{version}` or `{name}`

Examples:
- `ghcr.io/rustopic/games:rust`
- `ghcr.io/rustopic/runtimes:nodejs_22`
- `ghcr.io/rustopic/runtimes:alpine`
- `ghcr.io/rustopic/installers:debian`

## Platform Support

All images are built for:
- `linux/amd64` (x86_64)
- `linux/arm64` (aarch64)

Multi-platform images are automatically selected based on the host architecture.

