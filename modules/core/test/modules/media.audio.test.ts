import { beforeAll, describe, expect, it } from "vitest";
import AudioManager from "../../src/modules/medias/sound";

let audioManager: AudioManager;

beforeAll(() => {
  console.log("///--------------------------------------------");
  audioManager = AudioManager.instance();
});

describe('AudioManager Class', () => {
  it('Start Instance', () => {
    expect(audioManager).toBeInstanceOf(AudioManager);
    console.log(audioManager);
  });

  it('Load Audio', async () => {
    const audio = await audioManager.setAudioElement("mp3", 'exampleSound.mp3', "example");

    expect(audio).toBeDefined();
    console.log(audio!["example"]);
  });

  it('Prepare Audio', async () => {
    const audio = audioManager.prepareMemoryMedia("example");

    expect(audio).toBeDefined();
    console.log(audio!["example"]);
  });

  it('Prepare Audio #2', async () => {
    const audio = audioManager.prepareMemoryMedia("example");

    expect(audio).toBeDefined();
    console.log(audio!["example"]);
  });

  it('Remove Audio', () => {
    const audioElement = audioManager.removeMemoryMedia("example");

    expect(audioElement).toBeDefined();
    console.log(audioElement);
  });
});