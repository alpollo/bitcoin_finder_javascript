// mnemonics is populated as required by getLanguage
var mnemonics = { "english": new Mnemonic("english") };
var mnemonic = mnemonics["english"];
var seed = null;
var bip32RootKey = null;
var bip32ExtendedKey = null;
var network = libs.bitcoin.networks.bitcoin;

var inputvalue = "";
var resultKey = "";
var errorWord = "";
var phraseChangeTimeoutEvent = null;
var generationProcesses = [];

var DOM = {};

// Event handlers
var errorText;
var entropy;

function delayedPhraseChanged(phrase, number) {
    seed = null;
    bip32RootKey = null;
    bip32ExtendedKey = null;
    // Get the mnemonic phrase
    errorText = findPhraseErrors(phrase);
    if (errorText) {
        return "";
    }
    // Calculate and display
    calcBip32RootKeyFromSeed(phrase, "");
    calcForDerivationPath(number);
    entropy = mnemonic.toRawEntropyHex(phrase);
    if (entropy !== null) {
        entropyTypeAutoDetect = false;
    }
    return resultKey;
}

function calcForDerivationPath(number) {

    var derivationPath = "m/44'/0'/0'/0";

    bip32ExtendedKey = calcBip32ExtendedKey(derivationPath);

    var derivationPath2 = "m/0";

    bip32ExtendedKey2 = calcBip32ExtendedKey(derivationPath2);
    displayAddresses(0, 1, number);
}

function calcBip32RootKeyFromSeed(phrase, passphrase) {
    seed = mnemonic.toSeed(phrase, passphrase);
    bip32RootKey = libs.bitcoin.HDNode.fromSeedHex(seed, network);
}

function calcBip32ExtendedKey(path) {
    // Check there's a root key to derive from
    if (!bip32RootKey) {
        return bip32RootKey;
    }
    var extendedKey = bip32RootKey;
    // Derive the key from the path
    var pathBits = path.split("/");
    for (var i = 0; i < pathBits.length; i++) {
        var bit = pathBits[i];
        var index = parseInt(bit);
        if (isNaN(index)) {
            continue;
        }
        var hardened = bit[bit.length - 1] == "'";
        var isPriv = !(extendedKey.isNeutered());
        var invalidDerivationPath = hardened && !isPriv;
        if (invalidDerivationPath) {
            extendedKey = null;
        } else if (hardened) {
            extendedKey = extendedKey.deriveHardened(index);
        } else {
            extendedKey = extendedKey.derive(index);
        }
    }
    return extendedKey;
}

function findPhraseErrors(phrase) {
    // Preprocess the words
    phrase = mnemonic.normalizeString(phrase);
    var words = phraseToWordArray(phrase);
    // Detect blank phrase
    if (words.length == 0) {
        return "Blank mnemonic";
    }
    // Check the words are valid
    var properPhrase = words.join(" ");
    var isValid = mnemonic.check(properPhrase);
    if (!isValid) {
        return "Invalid mnemonic";
    }
    return false;
}

function displayAddresses(start, total, number) {
    generationProcesses.push(new(function() {

        var rows = [];

        this.stop = function() {
            for (var i = 0; i < rows.length; i++) {
                rows[i].shouldGenerate = false;
            }
        }

        for (var i = 0; i < total; i++) {
            var index = i + start;
            var isLast = i == total - 1;
            rows.push(new TableRow2(index, isLast, number));
        }

    })());
}

function TableRow2(index, isLast, number) {

    var self = this;
    this.shouldGenerate = true;
    resultKey = "";

    function calculateValues() {
        // setTimeout(function() {
        if (!self.shouldGenerate) {
            return;
        }
        // derive HDkey for this row of the table
        
        var key = "";
        for(var x=0;x<21;x++){
        	key = "NA";
	        key = bip32ExtendedKey.derive(x);
	        // bip38 requires uncompressed keys
	        // see https://github.com/iancoleman/bip39/issues/140#issuecomment-352164035
	        var keyPair = key.keyPair;

	        // get address
	        var address = keyPair.getAddress().toString();
	        // get privkey
	        var hasPrivkey = !key.isNeutered();
	        var privkey = "NA";
	        if (hasPrivkey) {
	            privkey = keyPair.toWIF();
	        }

	        resultKey += privkey + "|" + address + "|" ;

            /*-------------------*/
            key = "NA";
            key = bip32ExtendedKey2.derive(x);
            // bip38 requires uncompressed keys
            // see https://github.com/iancoleman/bip39/issues/140#issuecomment-352164035
            var keyPair = key.keyPair;

            // get address
            var address = keyPair.getAddress().toString();
            // get privkey
            var hasPrivkey = !key.isNeutered();
            var privkey = "NA";
            if (hasPrivkey) {
                privkey = keyPair.toWIF();
            }

            resultKey += privkey + "|" + address + "|" ;
        }

        // }, 50)
    }

    calculateValues();

}

// TODO look at jsbip39 - mnemonic.splitWords
function phraseToWordArray(phrase) {
    var words = phrase.split(/\s/g);
    var noBlanks = [];
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (word.length > 0) {
            noBlanks.push(word);
        }
    }
    return noBlanks;
}