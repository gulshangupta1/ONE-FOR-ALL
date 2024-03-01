export class SwipeUtils {
    private pauseTime: number = 500;

    async swipe(startX: number = 500, endX: number = 500, startY: number = 800, endY: number = 200): Promise<void> {
        await driver.action('pointer', {
            parameters: {
                pointerType: 'touch'
            }
        })
            .move({ duration: 0, x: startX, y: startY })
            .down()
            .pause(this.pauseTime)
            .move({ duration: this.pauseTime, x: endX, y: endY })
            .up({ button: 0 })
            .perform();
    }

    async swipeByPercentage(startPercentage: number = 80, endPercentage: number = 20): Promise<void> {
        const screenSize = await driver.getWindowRect();
        const x: number = screenSize.width * (50 / 100);
        const startY: number = screenSize.height * (startPercentage / 100);
        const endY: number = screenSize.height * (endPercentage / 100);

        await this.swipe(x, x, startY, endY);
    }

    async horizontalSwipe(startX: number = 200, endX: number = 800, startY: number = 500, endY: number = 500): Promise<void> {
        await this.swipe(startX, endX, startY, endY);
    }

    async horizontalSwipeByPercentage(): Promise<void> {
        const screenSize = await driver.getWindowRect();
        const startX: number = screenSize.width - (screenSize.width * 0.1);
        const endX: number = screenSize.width - (screenSize.width * 0.9);
        const y = screenSize.height * 0.5;

        await this.swipe(startX, endX, y, y);
    }
}