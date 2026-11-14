# Bevásárlólista

Mobilbarát, közös bevásárlólista a háztartásnak. Egyetlen `index.html`, build nélkül. A lista a laszlobiri közös Supabase-backendjén van: amit az egyik telefon felír vagy kipipál, a másikon is megjelenik. Offline is működik, a változások visszatérő hálózatnál szinkronizálódnak.

- tételek hozzáadása (pl. `2 l tej`, vesszővel több is: `tej, kenyér, alma`)
- automatikus kategória-tipp, szerkeszthető
- pipálás, törlés visszavonással
- gyakran vett dolgok gyorsjavaslatként
- sötét mód, offline működés, telepíthető a kezdőképernyőre (PWA)
- lista megosztása szövegként (a linkes küldés megszűnt: a lista közös)

## Belépés

Az oldal csak belépve használható. A `<head>` elején a laszlobiri belépési kapu áll (`https://laszlobiri.com/lib/v1/gate.js`): belépés nélkül a `https://laszlobiri.com/belepes/` oldalra irányít, és belépés után visszahoz. Offline is megnyílik, ha a telefonon van munkamenet. A belépés/kilépés a „⋯” menüben van.

## Adat és szinkron

- A lista a háztartás közös listája (`lists`, `items`, `item_history` táblák, RLS-sel védve; laszlobiri-com: `supabase/migrations/`).
- Minden módosítás azonnal megjelenik, és a kimenő sorba (`https://laszlobiri.com/lib/v1/outbox.js`, localStorage `bevasarlo-lista.outbox.v1`) kerül. Hálózatnál sorrendben elmegy, offline megvárja.
- Szinkron: megnyitáskor, előtérbe kerüléskor, visszatérő hálózatnál és minden módosítás után; a másik telefon módosításáról valós idejű értesítés jön (Supabase Realtime).
- Ha két telefon offline ugyanazt a tételt veszi fel, nem lesz dupla: a második a meglévőhöz csatlakozik („már rajta volt”).
- A helyi másolat (`bevasarlo-lista.v2`) csak az offline megnyitást szolgálja. A régi, belépés nélküli lista (`bevasarlo-lista.v1`) az első indításkor törlődik.

A service worker a Supabase-kéréseket (`*.supabase.co`) és a belépőoldalt nem kezeli és nem menti el. A `sw.js`-ben minden kiadásnál emeld a gyorsítótár verzióját (`bevasarlo-vN`).

## Publikálás

GitHub Pages (`main` / root), egyéni domain: `bevasarlas.laszlobiri.com` (a `CNAME` fájl tartalmazza).
DNS (Namecheap): `CNAME` rekord, host `bevasarlas`, érték `lbiri84.github.io`.
