import { Terminal } from 'xterm';

export function prompt(term: Terminal) {
  term.write('\r\n$ ');
};
