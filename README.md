STEP PUBLIC
====

STEP Soft &amp; Teknik Energy Pad

### Opsætning af miljø
Inden du kan gå igang med at udvikle på løsningen skal der gøres et par enkelte ting.

* Installation af pakker til npm
* Installation af pakker til bower

```
$ cd to application folder
$ sudo npm update
$ sudo bower update
```

### Test
Når du er færdig med at lave dine ændringer skal du have kørt evt tests du måtte have lavet.

```
$ sudo grunt test
```
Hvis alle dine test er ok kan du gå videre til klargøring af pakke.


### Klargøring af pakke
Når du er færdig med at lave dine ændringer skal du lave den endelige pakke.

```
$ sudo grunt build

Done, without errors.

Elapsed time
clean:dist                         77ms
concurrent:dist                    3s
autoprefixer:dist                  86ms
concat:dist/scripts/scripts.js     24ms
osv.....
Total                              6s
```
Dine application er nu blevet optimeret og kopieret over i mappen 

* dist

Det er dist mappen som skal uploades til webserveren.
