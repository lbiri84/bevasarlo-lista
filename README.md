# Bevásárlólista

Egyszerű, mobilbarát bevásárlólista. Egyetlen `index.html`, build nélkül, az adatok a telefon böngészőjében (localStorage) tárolódnak.

- tételek hozzáadása (pl. `2 l tej`, vesszővel több is: `tej, kenyér, alma`)
- automatikus kategória-tipp, szerkeszthető
- pipálás, törlés visszavonással
- gyakran vett dolgok gyorsjavaslatként
- sötét mód, offline működés, telepíthető a kezdőképernyőre (PWA)
- lista megosztása szövegként

## Belépés

Az oldal csak belépve használható. A `<head>` elején a laszlobiri belépési kapu áll (`https://laszlobiri.com/lib/v1/gate.js`): belépés nélkül a `https://laszlobiri.com/belepes/` oldalra irányít, és belépés után visszahoz. Offline is megnyílik, ha a telefonon van munkamenet. A belépés/kilépés a „⋯” menüben van.

A lista egyelőre még a telefonon (localStorage) tárolódik; a közös, szinkronizált lista a következő lépés (laszlobiri-com: `docs/backend-terv.md`, 2. fázis).

A service worker a Supabase-kéréseket (`*.supabase.co`) és a belépőoldalt nem kezeli és nem menti el. A `sw.js`-ben minden kiadásnál emeld a gyorsítótár verzióját (`bevasarlo-vN`).

## Publikálás

GitHub Pages (`main` / root), egyéni domain: `bevasarlas.laszlobiri.com` (a `CNAME` fájl tartalmazza).
DNS (Namecheap): `CNAME` rekord, host `bevasarlas`, érték `lbiri84.github.io`.
