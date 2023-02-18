import { Terminal } from 'xterm';

import { prompt } from './helpers';

enum ECommand {
  HELP = 'help',
  CURRENT = 'current'
}

type TCommand = {
  func: (term: Terminal) => void;
}

type TCommands = {
  [key: string]: TCommand
}

const commands: TCommands = {
  [ECommand.HELP]: {
    func: (term) => {
      term.writeln([
        '',
        'Welcome to dotcom. Try some commands to start:',
        '',
        ...Object.keys(commands).map(e => `  ${e}`),
      ].join('\n\r'))
    },
  },
  [ECommand.CURRENT]: {
    func: (term) => {
      term.writeln([
        '',
        'manager at unison',
      ].join('\n\r'))
    }
  }
}

export function enterCommand(term: Terminal, command: string) {
  if (commands[command.trim()] === undefined) {
    term.writeln('');
    term.writeln('Ah ah ah you didn\'t say the magic word!');
    term.writeln('');
    prompt(term);
    return;
  }

  const { func } = commands[command.trim()];
  func(term);
  prompt(term);
}
