import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import type {
  RockConfig,
  RockInstanceContext,
} from '@ruiapp/move-style';
import {
  renderRockChildren,
  renderRock,
} from './renderers';

// Mock @ruiapp/move-style
vi.mock('@ruiapp/move-style', async () => {
  const actual = await vi.importActual('@ruiapp/move-style');
  return {
    ...actual,
    fireEvent: vi.fn(),
    MoveStyleUtils: {
      omitSystemRockConfigFields: vi.fn(),
      isEventPropName: (name: string) => name.startsWith('on'),
      localizeConfigProps: vi.fn(),
    },
  };
});

describe('renderRockChildren', () => {
  const createMockContext = (): RockInstanceContext => ({
    framework: {
      getComponent: vi.fn(),
      getConfigProcessors: vi.fn(() => []),
      getLogger: vi.fn(() => ({
        debug: vi.fn(),
        warn: vi.fn(),
        verbose: vi.fn(),
      })),
      getLocaleStringResource: vi.fn((_, key) => key),
    } as any,
    page: {
      getComponent: vi.fn(() => ({ _initialized: true, _state: {} })),
      attachComponent: vi.fn(),
      interpreteComponentProperties: vi.fn(),
    } as any,
    scope: { $id: 'test-scope' } as any,
    logger: { debug: vi.fn(), warn: vi.fn(), verbose: vi.fn() } as any,
  });

  it('should return null for null config', () => {
    const context = createMockContext();
    const result = renderRockChildren({ context, rockChildrenConfig: null });
    expect(result).toBeNull();
  });

  it('should return null for undefined config', () => {
    const context = createMockContext();
    const result = renderRockChildren({ context, rockChildrenConfig: undefined as any });
    expect(result).toBeNull();
  });
});

describe('renderRock', () => {
  const createMockContext = (): RockInstanceContext => ({
    framework: {
      getComponent: vi.fn(),
      getConfigProcessors: vi.fn(() => []),
      getLogger: vi.fn(() => ({
        debug: vi.fn(),
        warn: vi.fn(),
        verbose: vi.fn(),
      })),
      getLocaleStringResource: vi.fn((_, key) => key),
    } as any,
    page: {
      getComponent: vi.fn(),
      attachComponent: vi.fn(),
      interpreteComponentProperties: vi.fn(),
    } as any,
    scope: { $id: 'test-scope' } as any,
    logger: { debug: vi.fn(), warn: vi.fn(), verbose: vi.fn() } as any,
  });

  it('should return the element if it is already a React element', () => {
    const context = createMockContext();
    const element = React.createElement('div', null, 'test');

    const result = renderRock({ context, rockConfig: element as any });
    expect(result).toBe(element);
  });

  it('should return null for null config', () => {
    const context = createMockContext();
    const result = renderRock({ context, rockConfig: null as any });
    expect(result).toBeNull();
  });

  it('should return string as-is', () => {
    const context = createMockContext();
    const result = renderRock({ context, rockConfig: 'test string' as any });
    expect(result).toBe('test string');
  });

  it('should throw error for unknown component type', () => {
    const context = createMockContext();
    context.framework.getComponent = vi.fn(() => null);

    const rockConfig: RockConfig = { $type: 'unknownType', $id: 'test' };

    expect(() => renderRock({ context, rockConfig })).toThrow('unknownComponentType');
  });
});
