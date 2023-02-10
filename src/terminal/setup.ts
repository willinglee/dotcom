import { Terminal } from 'xterm';

export function setup(term: Terminal) {
  term.user = "guest";
  term.host = "rootpc";
}
