# Koło fortuny - Losowanie osób do różnych celów

## Krótki opis

Projekt ma na celu ułatwienie podejmowania decyzji w sytuacjach spornych, czyli W momencie w którym nie ma chętnych do wykonania pewnej czynności, bądź jest potrzebny czynnik losowy itp. 

## Użyte technologie

Projekt zostanie zrealizowany w użyciu o technologie:
- Angular
- Firebase
- Github 
- HTML
- CSS

## Platforma
Projekt zostanie zrealizowany na darmowej platformie Firebase dostępnej od Google, która służy do kompleksowego obsługiwania aplikacji webowych oraz mobilnych jako część serwerowa tzw. Backend.

## Sposoby autentykacji
Każdy użytkownik ma kilka możliwości zarejestrowania konta. Jest to jednorazowa operacja, która spowoduje stworzenie konta użytkownika. Przy kolejnych próbach logowania użytkownik nie musi już potwierdzać konta, gdyż wszystko zostanie ręcznie uwierzytelnione. Uwierzytelnić konto można przez:
- Google
- Github 
- Facebook


## Dostępne funkcje po zalogowaniu

Użytkownik po zalogowaniu się ma dostępne dwie funkcje:

- Utwórz - Tworzy nowe koło fortuny. Użytkownik otrzymuje wszystkie funkcje w tym dodawanie nowych użytkowników, losowania i generowania kodu do dołączenia
- Dołącz - Użytkownik może dołączyć do utworzonego już koła fortuny. Aby móc dołączyć trzeba wpisać kod do wygenerowanego już kodu. Wtedy użytkownik wyśle powiadomienie do osoby, co utworzyła koło fortuny i w przypadku jego zatwierdzenia zostanie dodana do koła. Nazwa użytkownika po dołączeniu to jego imię i nazwisko.


## Kod dołączenia

Kod jest automatycznie generowany przy utworzeniu nowego koła. Jest on unikalny dla każdego nowego koła. Składa się on z 6 losowych znaków, który w momencie tworzenia koła zna tylko osoba tworząca koło.

## Pytanie losowania
Administrator ma możliwość zdefiniowania przedmiotu losowania. Taki przedmiot opisany przez administratora jest wyświetlany w momencie tworzenia koła oraz nad kołem


## Możliwe losowania

Administrator każdego koła ma do wyboru trzy opcje przy losowaniu:
- Tradycyjne losowanie - wylosowuje wskazaną ilość osób wśród wszystkich osób co dołączyły do koła
- Losowanie z pominięciem - pomija osoby, które zostały już wylosowane i wśród pozostałych wykonuje losowanie
- Losowanie na podzbiorze - wykonuje losowanie wśród osób obecnie znajdujących się na kole i zapisuje wszystkich do kolejnego losowania

## Rodzaje losowania

Administrator ma do wyboru dwa tryby. Pierwszy tryb z kołem fortuny zawsze wylosowuje jedną osobę, a losowanie trwa przez podany czas przez administratora. Drugim trybem jest generowanie listy. W tym trybie wyniki pojawią się od razu i może być więcej wyników niż 1.

## Ilość możliwych wyników

Administrator koła może wybrać ile osób ma wylosować. Ten wynik jest ręcznie podawany jeśli ma być inny niż 1, który jest minimalną wartością. Maksymalną wartością jest ilość osób obecnych na kole.

## Wyniki

Wyniki losowania są pokazywane na ekranie oraz jest generowany raport który można pobrać. 


## Czas losowania

Administrator ma możliwość zdefiniowania czasu losowania w przypadku koła fortuny. Domyślnie ta wartość wynosi 5 sekund. W przypadku wybrania opcji z generowaniem listy administrator nie ma opcji ustawienia czasu losowania

## Kolory

Kolory na kole formuły będą o dosyć dużym kontraście, aby użytkownicy łatwiej mogli odczytać wyniki. Zostanie zastosowana opcja wyboru jednego z dwóch trybów: jasnego, bądź ciemnego. Każdy użytkownik może sam zdecydować i wybrać z którego będzie chciał korzystać.

## Potencjalni użytkownicy
Aplikacja będzie prosta w użyciu, dlatego będzie ona dostępna dla każdego, niezależnie od płci, wieku, koloru skóry itp. Wszystkie opisy będą w języku angielskim, aby aplikacja była bardziej uniwersalna.

## Dostęp do aplikacji
Każda osoba będzie mogła połączyć się z aplikacją przez stronę internetową z projektem.

## Usunięcie rodzajów losowań

Administrator ma możliwość usunięcia niechcianych przycisków losowań w panelu administratora. Jednak zawsze przynajmniej jedna opcja losowania musi być wyświetlona, co oznacza, że pod kołem będzie dostępne od 1 do 3 przycisków losowań. Domyślnie są zaznaczone wszystkie możliwości losowania.

## Dodanie użytkownika bez konta

Administrator koła w panelu logowania będzie miał możliwość dodania rezultatów do koła, aby umożliwić wzięcie udziału w losowaniu przez osoby nie posiadających konta lub niemogących dołączyć z innych przyczyn.

## Usuniecie osób z koła
Taka funkcje będzie posiadał tylko założyciel koła

## Usuniecie koła
Założyciel koła będzie mógł je usunąć, jednak wtedy przepadają wszystkie dane z nim związane (kod koła, użytkownicy i wyniki)

## Możliwość zmiany kodu
Nie ma możliwości zmiany kodu koła.
