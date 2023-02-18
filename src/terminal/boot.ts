import { Terminal } from 'xterm';

import { IState } from './types';
import { prompt } from './helpers';
import { enterCommand } from './commands';

export function boot(term: Terminal, state: IState) {
  if (state._initialized) {
    return;
  }

  state._initialized = true;

  term.focus();
  prompt(term);

  term.onData(e => {
    switch (e) {
      case '\u0003': // ctrl+c
        term.write('^C');
        prompt(term);
        break;
      case '\r': // enter
        const normalBuffer = term.buffer.normal;
        const inputText = normalBuffer.getLine(normalBuffer.cursorY)?.translateToString()
        const command = inputText?.slice(2, inputText.length - 1) ?? '';
        enterCommand(term, command);
        break;
      case '\u007F': // backspace
        // do not delete the prompt
        if (term.buffer.active.cursorX > 2) {
          term.write('\b \b');
        }
        break;
      default: // print all other characters
        if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
          term.write(e);
        }
    }
  });
}
