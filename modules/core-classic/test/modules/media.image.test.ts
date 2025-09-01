import { beforeAll, describe, expect, it } from "vitest";
import ImageManager from "../../src/modules/medias/images";

let imageManager: ImageManager;

beforeAll(() => {
  console.log("///--------------------------------------------");
  imageManager = ImageManager.instance();
});

describe('ImageManager Class', () => {
  it('Start Instance', () => {
    expect(imageManager).toBeInstanceOf(ImageManager);
    console.log(imageManager);
  });

  it('Load Image', async () => {
    const image = await imageManager.setImageElement("png", 'exampleMeme.png', "example");

    expect(image).toBeDefined();
    console.log(image!["example"]);
  });

  it('Prepare Image', async () => {
    const image = imageManager.prepareMemoryMedia("example");

    expect(image).toBeDefined();
    console.log(image!["example"]);
  });

  it('Prepare Image #2', async () => {
    const image = imageManager.prepareMemoryMedia("example");

    expect(image).toBeDefined();
    console.log(image!["example"]);
  });

  it('Remove Image', () => {
    const imageElement = imageManager.removeMemoryMedia("example");

    expect(imageElement).toBeDefined();
    console.log(imageElement);
  });
});