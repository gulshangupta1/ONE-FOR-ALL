export class SwipeUtils {
    private pauseTime: number = 500;

    async swipe(x: number = 500, startY: number = 800, endY: number = 200): Promise<void> {
        await driver.action('pointer', {
            parameters: {
                pointerType: 'touch'
            }
        })
            .move({ duration: 0, x: x, y: startY })
            .down()
            .pause(this.pauseTime)
            .move({ duration: this.pauseTime, x: x, y: endY })
            .up({ button: 0 })
            .perform();
    }

    async swipeByPercentage(startPercentage: number = 80, endPercentage: number = 20): Promise<void> {
        const screenSize = await driver.getWindowRect();
        const x: number = screenSize.width * (50 / 100);
        const startY: number = screenSize.height * (startPercentage / 100);
        const endY: number = screenSize.height * (endPercentage / 100);

        await this.swipe(x, startY, endY);
    }

    async horizontalSwipe(startX: number = 200, endX: number = 800, y: 500): Promise<void> {
        await driver.action('pointer', {
            parameters: {
                pointerType: 'touch'
            }
        })
            .move({ duration: 0, x: startX, y: y })
            .down()
            .pause(this.pauseTime)
            .move({ duration: this.pauseTime, x: endX, y: y })
            .up({ button: 0 })
            .perform();
    }
}