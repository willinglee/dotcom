import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';

export function setupTerminal() {
  const term = new Terminal({ cursorBlink: true });
  const fitAddon = new FitAddon();
  const webLinksAddon = new WebLinksAddon();
  const element = document.querySelector<HTMLDivElement>('#terminal')!;

  term.open(element);
  term.loadAddon(fitAddon);
  term.loadAddon(webLinksAddon);

  fitAddon.fit();
}
