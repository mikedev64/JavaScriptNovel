import { beforeAll, describe, expect, it } from "vitest";
import TimelineManager from "../../src/modules/timeline";

let timelineManager: TimelineManager;

beforeAll(() => {
        console.log("///--------------------------------------------");
        timelineManager = TimelineManager.instance();
});

describe('TimelineManager Class', () => {
        it('Start Instance', () => {
                expect(timelineManager).toBeInstanceOf(TimelineManager);
                console.log(timelineManager);
        });

        it('Create History Gram', () => {
                timelineManager.addHistoryEntry(0, 0);
                const historyGram = timelineManager.getHistoryGram();
                expect(historyGram).toBeDefined();
                console.log(historyGram);
        });
});