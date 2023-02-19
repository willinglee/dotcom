import { Terminal } from 'xterm';

import { prompt } from './helpers';

enum ECommand {
  HELP = 'help',
  CURRENT = 'current',
  CLEAR = 'clear',
  PROJECTS = 'projects',
  RESUME = 'resume',
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
        ...Object.keys(commands).map(e => `${e}`),
      ].join('\n\r'))
    },
  },
  [ECommand.CURRENT]: {
    func: (term) => {
      term.writeln([
        '',
        'Manager at Unison.',
      ].join('\n\r'))
    }
  },
  [ECommand.CLEAR]: {
    func: (term) => {
      term.reset();
    }
  },
  [ECommand.PROJECTS]: {
    func: (term) => {
      term.writeln('\n\rhttps://legend.fyi\x1b[0;38m');
    }
  },
  [ECommand.RESUME]: {
    func: (term) => {
      term.writeln('\n\rhttps://www.linkedin.com/in/willinglee\x1b[0;38m');
      term.writeln('\rhttps://github.com/willinglee\x1b[0;38m');
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
