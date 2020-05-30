class KeywordSearch {

  static parseSearchString(string) {
    /*
    returns a Map object containing all key:value pairs in the search string
    */

    const acceptableCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789 :,';

    // remove all punctuation except : and ,
    let stringArray = string.toLowerCase().split('');
    stringArray = stringArray.map((char) => {
      return (acceptableCharacters.includes(char))
        ? char
        : ''
    });

    string = stringArray.join('');

    // parse with regex into matches
    const reCommaSplit = /(^|,)([^,]*)/g;
		let matches = Array.from(
			string.matchAll(reCommaSplit),
			(match) => {
				return match[2];
			});

    // parse matches into key:value pairs
		const reKeysValues = /([^,]*):([^,]*)/;
		matches = matches.map((match) => {
			return (reKeysValues.test(match))
				? match.split(':').map(m => m.trim())
				: ['undefinedAttribute'+match.trim(), match.trim()]
		});

		return new Map(matches);
  }


  static checkObject(object, searchTerms) {
    /*
      attribute[0] is the search key
      attribute[1] is the search value

      undefinedAttribute represents an unpaired value (no key)

      the following checks all search values against the object values
    */

    let result = false;

    const objectValues = Object.values(object).map(value => {
      return value.toString().toLowerCase();
    })

    for (let attribute of searchTerms) {
      if (attribute[0].slice(0, 18) === 'undefinedAttribute') {
        result = objectValues.includes(attribute[1]);

      } else {
        result = (object[attribute[0]] === attribute[1])
          ? true
          : false
      }
    }

    return result;
  }
}

export default KeywordSearch;
