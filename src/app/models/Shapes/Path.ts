import PathCommand from 'src/app/interfaces/PathCommand';
import Point from '../Point';
import Shape from '../Shape';

export default class Path extends Shape {
  private commands: PathCommand[] = [];
  d: string;

  constructor(
    id: number,
    color: string,
    commands: PathCommand[],
    styleClass: string = ''
  ) {
    super(id, color, new Point(0,0), styleClass);
    this.type = 'path';
    this.commands = commands;
    this.d = this.getPathDFromCommands(commands);
  }

  override generateSVG(): string {
    return `<path d="${this.d}" fill="${this.color}"/>`;
  }

  override reposition(startingPoint: Point, currentPoint: Point): void {
    if (this.commands.length == 0) return;

    this.commands.forEach((command) => {
      if (command.isRelative) return;

      const offsetX = currentPoint.x - startingPoint.x;
      const offsetY = currentPoint.y - startingPoint.y;

      switch (command.parameters.length) {
        case 1:
          if (command.code == 'V') command.parameters[0] += offsetY;
          if (command.code == 'H') command.parameters[0] += offsetX;
          break;
        case 2:
        case 4:
        case 6:
          command.parameters.forEach((param, i) => {
            if (i % 2 == 0) command.parameters[i] += offsetX;
            else command.parameters[i] += offsetY;
          });
          break;
        case 7:
          command.parameters[5] += offsetX;
          command.parameters[6] += offsetY;
      }
    });

    this.d = this.getPathDFromCommands(this.commands);
  }

  override clone(new_id: number): Shape {
    const commandsDeepCopy = JSON.parse(JSON.stringify(this.commands));
    return new Path(new_id, this.color, commandsDeepCopy, this.styleClass);
  }

  getPathDFromCommands = (commands: PathCommand[]) => {
    const getCommandString = (command: PathCommand) => {
      let commandString = `${command.code}`;
      command.parameters.forEach((param, index) => {
        commandString = commandString.concat(`${param}`);
        const isLastParam = index + 1 === command.parameters.length;
        if (!isLastParam) commandString = commandString.concat(',');
      });
      return commandString;
    };

    let d = '';
    commands.forEach((command) => {
      d = d.concat(getCommandString(command));
    });

    return d;
  };
}
