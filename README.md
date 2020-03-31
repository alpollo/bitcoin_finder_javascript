# bitcoin_finder_javascript
A bitcoin search engine that uses your CPU, converts 12-word phrases to bitcoin addresses, and then searches for matches in the database.

Disclaimer Notice.
I am not responsible for the use of the system, since it has been uploaded for educational use. (Although you and I both know what to use it for)

# Usage
Select the number of threads (CPU sub-processes, first check how many sub-processes your CPU has)
Press the button "Start Mining"
The system will start taking 12 random words from the database, converting them to bitcoin address and private key, and comparing them to the bitcoin addresses of the database. Once you find it you will save it in the "ganador" table.

# Code Explanation

This is the most difficult part, since I'm not very good with documentation.

Index:
- minero.php: The 2048 words are obtained, stored in an array, sent to calculate.js and the response received with the bitcoin addresses is sent to metodos_generalizados.php to be compared with the bitcoin addresses found in the database.

JS:
There are the libraries that I used for the project, among them are:
- IanCooleman BIP39 library, some modified for project. (bip39-libs.js, jsbip39.js, sjcl-bip39.js, wordlist_english.js): https://github.com/iancoleman/bip39
- calculate.js: A function is created to obtain the words from 12 to 12 and randomly, the bip39 libraries are imported, that 12-word phrase is validated and the first 21 addresses of it are obtained in bip44 and bip32 format, finally the result is sent to minero.php.
- index.js: It is part of the bip39 library but it was modified for a quick use and format change. Convert the 12 word phrase to bitcoin address and private key.
- Jquery bookstores.

PHP:
- enter.php: File connecting to the database.
- general_methods.php: Compare the obtained bitcoin addresses with those found in the database and insert them in the winning table.

Database:
The database name is searcher.
- address: Contains a list of bitcoin addresses with balance, updated in December 2019. You can find the complete list and updated every day here: https://gz.blockchair.com/bitcoin/addresses/
- winner: Here the bitcoin addresses with balance found will be inserted, along with their 12-word phrase and their private key.
- mining: Not used.
- words: The 2048 blockchain words to make your combinations of 12.

# Donations
I put effort and dedication in this project, however I do not expect any great reward, but if you can support me I would appreciate it.
Bitcoin: 12uxnR1NpTj1f31PWvPqewnmZ68caBSQov

However, the best donation you could make would be to improve the code.

# License

This BIP39 tool is released under the terms of the MIT license. See LICENSE for more information or see https://opensource.org/licenses/MIT.
