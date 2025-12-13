# Runtimes

Rust tabanlı agent sistemleri için özenle hazırlanmış runtime görüntüleri koleksiyonu. Her görüntü düzenli olarak
yeniden derlenir ve bağımlılıkların her zaman güncel olduğundan emin olunur.

Görüntüler `ghcr.io` üzerinde barındırılır ve `games`, `installers` ve `runtimes` alanları altında bulunur. Bir görüntünün
hangi alanda yaşayacağını belirlerken aşağıdaki mantık kullanılır:

* `oses` — temel paketleri içeren başlangıç görüntüleri.
* `games` — repository içindeki `games` klasöründeki her şey. Bunlar belirli bir oyun veya oyun türünü çalıştırmak için
oluşturulmuş görüntülerdir.
* `installers` — `installers` dizini içinde bulunan her şey. Bu görüntüler, farklı kurulum scriptleri tarafından kullanılır,
gerçekte bir oyun sunucusu çalıştırmak için değil. Bu görüntüler yalnızca `curl` ve `wget` gibi yaygın kurulum bağımlılıklarını
önceden yükleyerek kurulum süresini ve ağ kullanımını azaltmak için tasarlanmıştır.
* `runtimes` — bunlar farklı türde oyunların veya scriptlerin çalışmasına izin veren daha genel görüntülerdir. Genellikle
belirli bir yazılım sürümüdür ve farklı runtime'ların altta yatan uygulamayı değiştirmesine izin verir. Bunun bir örneği,
botları, Minecraft sunucularını vb. çalıştırmak için kullanılan Java veya Python gibi bir şey olabilir.

Tüm bu görüntüler, aksi belirtilmedikçe `linux/amd64` ve `linux/arm64` sürümleri için mevcuttur. Bu görüntüleri bir arm64
sisteminde kullanmak için bunlarda veya etiketinde herhangi bir değişiklik yapmanız gerekmez, sadece çalışmalıdırlar.

## Katkıda Bulunma

Mevcut bir görüntüye yeni bir sürüm eklerken, örneğin `rust v1.75`, bunu `rust` klasörünün bir alt klasörüne ekleyin,
örneğin `rust/1.75/Dockerfile`. Lütfen ayrıca doğru `.github/workflows` dosyasını güncelleyerek bu yeni sürümün
doğru şekilde etiketlendiğinden emin olun.

## Mevcut Görüntüler

* [`base oses`](https://github.com/rustopic/runtimes/tree/master/oses)
  * [`alpine`](https://github.com/rustopic/runtimes/tree/master/oses/alpine)
    * `ghcr.io/rustopic/runtimes:alpine`
  * [`debian`](https://github.com/rustopic/runtimes/tree/master/oses/debian)
    * `ghcr.io/rustopic/runtimes:debian`
* [`games`](https://github.com/rustopic/runtimes/tree/master/games)
  * [`rust`](https://github.com/rustopic/runtimes/tree/master/games/rust)
    * `ghcr.io/rustopic/games:rust`

### Kurulum Görüntüleri

* [`alpine-install`](https://github.com/rustopic/runtimes/tree/master/installers/alpine)
  * `ghcr.io/rustopic/installers:alpine`

* [`debian-install`](https://github.com/rustopic/runtimes/tree/master/installers/debian)
  * `ghcr.io/rustopic/installers:debian`
