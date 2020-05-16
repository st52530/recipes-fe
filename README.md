# NNPIA Semestrální práce

![Continuous Integration](https://github.com/st52530/nnpia-react/workflows/Continuous%20Integration/badge.svg)

Tento repozitář obsahuje zdrojové kódy frontendu (react) semestrální práce na předmět NNPIA.

## Téma

Tématem semestrální práce bylo vytvoření webové aplikace na správu receptů. Aplikace uživatelům umožňuje správu
vlastních receptů. Nejedná se o sociální platformu, kde by uživatelé recepty sdíleli a sbírali lajky. Jedná se o soukromé
úložiště receptů jednotlivých uživatelů. Recepty je možné i vyhledávat pomocí názvu.

U každého receptu je možné nastavit:
- unikátní obrázek,
- název,
- krátký popis/představení receptu,
- celkovou dobu přípravy,
- vybrat jednu nebo více kategorií do které recept patří,
- vybrat potřebné ingredience včetně potřebného množství (ať už se jedná o 1 kg nebo 1 hrnek),
- a také napsat postup v rámci několika kroků, které budou vizuálně odděleny.

## O frontendu

Frontend byl vyvinut v JavaScriptu pomocí knihovny [ReactJS](https://reactjs.org/). Byl využit funkcionální přístup psaní React komponent (s hooky).
Pro navigaci mezi různými stránkami (komponentami) byla využita knihovna [React-router](https://www.npmjs.com/package/react-router-dom).

Pro design projektu byla využita knihovna [Material UI](https://material-ui.com/). Pro psaní CSS stylů bylo využito možnosti této knihovny psát styly
přímo v Javascriptu a využívat globálního stylu UI.

Pro komunikaci s API byla využita knihovna [axios](https://www.npmjs.com/package/axios). Ta nebyla volána přímo z komponent, ale z tzv.
"Service" - i když se v JS nejednalo o skutečné třídy, ale spíš seskupení funkcí pro práci s danou entitou. Větěina API odpovědí
byla ukládána do session storage pro účely lokální cache.

### Kód

Kód projektu byl rozdělen do několika hlavních balíčků:
- **components -** obsahuje všechny React komponenty (dále dělené do balíčků dle sekcí na webu),
- **images -** obsahuje použité obrázky,
- **networking -** obsahuje třídy týkající se API komunikace a cachování,
- **routing -** obsahuje specifické třídy pro zajištění správné navigace na webu,
- **services -** obsahuje výše zmíněné servisní funkce,
- **util -** obsahuje utility funkce.

## Spuštění

Projekt lze spustit v development módu pomocí příkazu `npm start` nebo zbuildit release
verzi pomocí příkazu`npm run build`.

Před spuštěním projektu je potřeba nainstalovat potřebné závislosti pomocí příkazu `npm install`.

Pokud chcete změnit adresu využitého API, vytvořte soubor `.env.local` v rootu projektu.
Následuje příklad lokální konfigurace.

```dotenv
REACT_APP_API_URL="http://localhost:8080/api/"
```

## Zdroje

Icons made by <a href="https://www.flaticon.com/authors/nikita-golubev" title="Nikita Golubev">Nikita Golubev</a>
from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>