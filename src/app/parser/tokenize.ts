export const tokenize = (svg: string) => {
  let tagsTokens: string[][] = [];
  let grabInner = false;
  svg = svg.replace(/[^\S ]/g, "") // remove all whitespace except normal spaces

  let i = 0;
  while (i < svg.length) {
    if (grabInner) {
      let current = "";
      while(svg.charAt(i) != '<') {
        current += svg.charAt(i);
        i++;
      }
      tagsTokens.push([current]);
      grabInner = false;
    }
    // keep skipping until the start of a tag is encountered
    if (svg.charAt(i) != '<') {
      i++;
      continue;
    }

    // list to keep track of all tokens encountered in that particular tag
    let currentTagTokens: string[] = [];

    i++; // move to first char after '<'

    while (i < svg.length) {
      let currentToken = '';
      let tokenIsQuotated = false;

      // a token is either a full word without spaces
      // or a quotated string with/without spaces

      // grab a full token
      while (i < svg.length) {
        const charIsQuotation = svg.charAt(i) === '"' || svg.charAt(i) === "'";
        const charIsEqualSign = svg.charAt(i) === '=';
        const charIsSpace = svg.charAt(i) === ' ';
        const charIsTagEnd = svg.charAt(i) === '>';

        const tokenEndEncountered =
          (charIsSpace     && !tokenIsQuotated) ||
          (charIsQuotation &&  tokenIsQuotated) ||
           charIsTagEnd;

        if (tokenEndEncountered) break;

        if (charIsQuotation) {
          tokenIsQuotated = !tokenIsQuotated;
          i++;
          continue;
        }

        if (charIsEqualSign) {
          // push token before equal sign
          currentTagTokens.push(currentToken);
          currentToken = '=';
          break;
        }
        // add current character to the current token
        currentToken += svg.charAt(i);
        i++;
      }
      // add that token if its not empty
      if (currentToken != '') currentTagTokens.push(currentToken);
      if (currentTagTokens[0] == "style") grabInner = true;
      if (svg.charAt(i) === '>') break;
      i++;
    }
    tagsTokens.push(currentTagTokens);
    i++;
  }

  return tagsTokens;
};