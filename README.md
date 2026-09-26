# Atelier

Manual de tehnici de cusut, croșetat și tricotat, pas cu pas, cu desene. Aplicație web instalabilă (PWA), un singur fișier, fără server, fără cont. Merge fără internet după prima deschidere.

## Ce conține
**Manualul:** 30 de tehnici în patru secțiuni: La mașină, De mână, Croșetat, Tricotat. Fiecare fișă are ce ai nevoie, pași numerotați cu desene, greșeli frecvente și notițele tale.

**Copiez ceva ce am deja:** fotografiezi o lucrare, pui lângă ea o foaie A4 sau un card, atingi punctele și afli dimensiunile reale și materialul necesar. Totul în telefon, fără server.

**Proiectele:** 8 lucrări calculate din măsurile tale (patru feluri de fustă, poșetă, șorț, față de pernă, săculeț), cu bucățile de tăiat, necesarul de material și pași de bifat.

## Pe GitHub Pages
1. Urcă tot conținutul folderului `dist/` în rădăcina unui repo nou, de exemplu `atelier`.
2. Settings → Pages → Deploy from branch → `main` / root.
3. Aplicația apare la `https://costi1622.github.io/atelier/`.
4. Pe telefon: deschide adresa în Chrome → meniu → „Instalează aplicația”.

## Actualizare
Editezi în `src/`, apoi:
```
python3 build.py      # construiește dist/
node verifica.js      # trebuie să spună GATA DE URCAT
```
Urci din `dist/` doar fișierele schimbate (de obicei `index.html` și `sw.js`). Aplicația instalată arată bara „Actualizează”.

## Date
Notițele, favoritele și exersatele stau doar în telefon, sub cheia `atelier_v1`. Copia de siguranță se face din Setări.

## Pentru cine continuă proiectul
`DOCUMENTATIE.md` descrie aplicația, `DESENE.md` descrie cum se face orice desen, ca toate să rămână în același stil.
