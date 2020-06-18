/// <reference path="../node_modules/@types/ace/"/>
/// <reference path="../node_modules/html-tag-js/dist/tag.d.ts"/>
/// <reference path="../node_modules/@deadlyjack/ajax/index.d.ts"/>

interface DialogOptions {
  title: string;
  loader: boolean;
  message: string;
  buttons: Array<{ id: string, text: string }>;
  oninteract(this: HTMLElement, e: MouseEvent): void;
}

interface DB {
  get(callback: (data: object) => void): void;
  udpate(callback: (data: object) => object): Promise<void>;
}

declare var root: HTMLDivElement;