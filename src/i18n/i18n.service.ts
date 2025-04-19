import { Inject, Injectable, Scope } from '@nestjs/common';
import type * as Schema from 'src/assets/locals/en/en.json';
import * as en from 'src/assets/locals/en/en.json';
import * as fr from 'src/assets/locals/fr/fr.json';
import { REQUEST } from '@nestjs/core';
import format from "string-format"

@Injectable({ scope: Scope.REQUEST, durable: true })
export class I18nService {
  constructor(
    @Inject(REQUEST)
    private readonly payload: { localCode: string },
  ) {}

  public static readonly defaultLanguage = 'en';
  public static readonly supportedLanguages = ['en', 'fr'];
  private readonly locals: Record<string, typeof Schema> = { en, fr };

  translate(key: keyof typeof Schema, ...args: Array<string | Record<string, unknown>>): string {
    const local = this.locals[this.payload.localCode ?? I18nService.defaultLanguage];
    const text = local[key];
    return format(text , ...args)
  }
}
