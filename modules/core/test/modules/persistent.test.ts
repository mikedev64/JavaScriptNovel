import { beforeAll, describe, expect, it } from "vitest";
import CorePersistent from "../../src/modules/persistent";

let corePersistent: CorePersistent;

beforeAll(() => {
  console.log("///--------------------------------------------");
  corePersistent = CorePersistent.instance();
});

describe('CorePersistent Class', () => {
  it('Start Instance', () => {
    expect(corePersistent).toBeInstanceOf(CorePersistent);
    console.log(corePersistent);
  });

  it('Set Variable', () => {
    const result = corePersistent.setVariable("testKey", "testValue");
    expect(result).toEqual({ testKey: "testValue" });
    console.log(result);
  });

  it('Get Variable', () => {
    const result = corePersistent.getVariable("testKey");
    expect(result).toEqual({ testKey: "testValue" });
    console.log(result);
  });

  it('Update Variable', () => {
    const result = corePersistent.putVariable("testKey", "updatedValue");
    expect(result).toEqual({ testKey: "updatedValue" });
    console.log(result);
  });
});