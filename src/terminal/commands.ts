import { Terminal } from 'xterm';

import { prompt } from './helpers';

const commands = {

}

export function enterCommand(term: Terminal) {
  term.writeln('');
  prompt(term);
}
