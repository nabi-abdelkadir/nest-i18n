import {
  ContextId,
  ContextIdFactory,
  ContextIdResolver,
  ContextIdResolverFn,
  ContextIdStrategy,
  HostComponentInfo,
} from '@nestjs/core';
import { Request } from 'express';
import { I18nService } from '../i18n/i18n.service';
import { pick } from 'accept-language-parser';

export class AggregateByLocalContextIdStrategy implements ContextIdStrategy {
  private readonly locals = new Map<string, ContextId>();

  attach(contextId: ContextId, request: Request): ContextIdResolverFn | ContextIdResolver {
    // const localCode = request.headers['x-local-id'] as string;
    const localCode =
      pick(I18nService.supportedLanguages, request.headers['accept-language'] as string) ?? I18nService.defaultLanguage;

 /*   if (!localCode) {
      return () => contextId;
    }*/

    let localSubTreeId: ContextId;
    if (this.locals.has(localCode)) {
      localSubTreeId = this.locals.get(localCode);
    } else {
      //construct a new id
      localSubTreeId = ContextIdFactory.create();
      this.locals.set(localCode, localSubTreeId);
      setTimeout(() => this.locals.delete(localCode), 3000);
    }
    return {
      payload: { localCode },
      resolve: (info: HostComponentInfo) => (info.isTreeDurable ? localSubTreeId : contextId),
    };
  }
}
