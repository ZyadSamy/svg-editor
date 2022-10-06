/* M (X,Y)
    // Any subsequent coordinate pair(s) are interpreted as parameter(s) 
    // for implicit absolute LineTo (L) command(s) (see below).

 L (x,y):
    Draw a line from the current point to the end point specified by x,y. 
     Any subsequent coordinate pair(s) are interpreted as parameter(s) 
     for implicit absolute LineTo (L) command(s).

*/

// useful links
// https://css-tricks.com/svg-path-syntax-illustrated-guide/
// https://svgwg.org/svg2-draft/paths.html#PathDataBNF

// special cases
// 1e2   : 1 exponent 2
// 10-6  : 10,-6


import PathCommand from "../interfaces/PathCommand";

const getPathCommands = (d: string) : PathCommand[] => {
   const commands = [];

   const splitCommandsIfNeeded = () => {
     const SINGLE_PARAM_COMMAND =
       currentCommand.code == 'v' ||
       currentCommand.code == 'V' ||
       currentCommand.code == 'h' ||
       currentCommand.code == 'H';
     const DOUBLE_PARAM_COMMAND =
       currentCommand.code == 'm' ||
       currentCommand.code == 'M' ||
       currentCommand.code == 'l' ||
       currentCommand.code == 'L' ||
       currentCommand.code == 't' ||
       currentCommand.code == 'T';
     const FOUR_PARAM_COMMAND =
       currentCommand.code == 's' ||
       currentCommand.code == 'S' ||
       currentCommand.code == 'q' ||
       currentCommand.code == 'Q';
     const SIX_PARAM_COMMAND =
       currentCommand.code == 'c' || currentCommand.code == 'C';
     const SEVEN_PARAM_COMMAND =
       currentCommand.code == 'a' || currentCommand.code == 'A';

     switch (currentCommand.parameters.length) {
       case 1:
         if (SINGLE_PARAM_COMMAND) splitCommand();
         break;
       case 2:
         if (DOUBLE_PARAM_COMMAND) splitCommand();
         break;
       case 4:
         if (FOUR_PARAM_COMMAND) splitCommand();
         break;
       case 6:
         if (SIX_PARAM_COMMAND) splitCommand();
         break;
       case 7:
         if (SEVEN_PARAM_COMMAND) splitCommand();
         break;
     }
   };

   const splitCommand = () => {
     let newCommandCode = currentCommand.code;
     if (newCommandCode == 'M') newCommandCode = 'L';
     else if (newCommandCode == 'm') newCommandCode = 'l';

     const command = {
       code: newCommandCode,
       isRelative: currentCommand.isRelative,
       parameters: [],
     };

     currentCommand = command;
     commands.push(command);
   };

   let currentCommand: PathCommand = {
     code: 'M',
     isRelative: false,
     parameters: [],
   };

   let numberCharacters = '';

   for (let i = 0; i < d.length; i++) {
     let char = d.charAt(i);
     // convert to upper/lower case to cut the checking in half
     const charInUpperCase = char.toUpperCase();
     const charIsCommandCode =
       charInUpperCase == 'M' ||
       charInUpperCase == 'L' ||
       charInUpperCase == 'H' ||
       charInUpperCase == 'V' ||
       charInUpperCase == 'C' ||
       charInUpperCase == 'S' ||
       charInUpperCase == 'Q' ||
       charInUpperCase == 'T' ||
       charInUpperCase == 'A' ||
       charInUpperCase == 'Z';

     const addNumAsParamToCurCommand = () => {
       currentCommand.parameters.push(parseFloat(numberCharacters));
       numberCharacters = '';
     };

     const createNewCommand = () => {
       const isCommandCodeLowerCase = char.toLowerCase() === char;
       const command = {
         code: char,
         isRelative: isCommandCodeLowerCase,
         parameters: [],
       };
       return command;
     };

     if (charIsCommandCode) {
       if (numberCharacters != '') addNumAsParamToCurCommand();
       currentCommand = createNewCommand();
       commands.push(currentCommand);
     } else {
       switch (char) {
         case ',':
         case ' ':
           if (numberCharacters != '') {
             currentCommand.parameters.push(parseFloat(numberCharacters));
             numberCharacters = '';
           }
           break;
         case '-':
           if (numberCharacters != '')
             currentCommand.parameters.push(parseFloat(numberCharacters));
           numberCharacters = '-';
           break;
         default: // just a digit character
           if (numberCharacters == '') splitCommandsIfNeeded();
           numberCharacters = numberCharacters.concat(char);
       }
     }
   }
   
   return commands;
 }

 export default getPathCommands;