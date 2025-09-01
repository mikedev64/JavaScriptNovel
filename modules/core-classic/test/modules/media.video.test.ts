import { beforeAll, describe, expect, it } from "vitest";
import VideosManager from "../../src/modules/medias/videos";

let videoManager: VideosManager;

beforeAll(() => {
        console.log("///--------------------------------------------");
        videoManager = VideosManager.instance();
});

describe('VideoManager Class', () => {
        it('Start Instance', () => {
                expect(videoManager).toBeInstanceOf(VideosManager);
                console.log(videoManager);
        });

        it('Load Video', async () => {
                const video = await videoManager.setVideoElement("mp4", 'exampleIzuna.mp4', "example");

                expect(video).toBeDefined();
                console.log(video!["example"]);
        });

        it('Prepare Video', async () => {
                const video = videoManager.prepareMemoryMedia("example");

                expect(video).toBeDefined();
                console.log(video!["example"]);
        });

        it('Prepare Video #2', async () => {
                const video = videoManager.prepareMemoryMedia("example");

                expect(video).toBeDefined();
                console.log(video!["example"]);
        });

        it('Remove Video', () => {
                const videoElement = videoManager.removeMemoryMedia("example");

                expect(videoElement).toBeDefined();
                console.log(videoElement);
        });
});