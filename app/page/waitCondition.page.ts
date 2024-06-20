import { expect } from "@playwright/test";
import { AppPage } from "../abstract";

export class WaitCondition extends AppPage {
    public pagePath: string = "/expected_conditions.html";

    private minMaxWaitBox = this.page.locator("div.card-header.justify-content-center");
    private minInput = this.page.locator("#min_wait");
    private maxInput = this.page.locator("#max_wait");
    private showAlertBtn = (btnName: string) => this.page.getByRole("button", { name: btnName });
    private confirmedPrompt = this.page.getByText("Confirm response: OK");
    private confirmedAlert = this.page.getByText("Alert handled");
    private triggerHiddenBtn = this.page.locator("#visibility_trigger").getByText("Trigger");
    private appearedHiddenBtn = this.page.locator("#visibility_target").getByText("Click Me");
    private appearedHiddenText = this.page.getByText("Can you see me?");

    async expectLoaded(): Promise<void> {
        await expect(this.minMaxWaitBox).toBeVisible();
        await expect(this.minInput).toBeEditable();
    }

    async setMinMaxAmount(min: number, max: number): Promise<void> {
        await this.minInput.fill(min.toString());
        await this.maxInput.fill(max.toString());
        await expect(this.minInput).toHaveValue(min.toString());
        await expect(this.maxInput).toHaveValue(max.toString());
    }
    /**
     * Click on buttons in wait for condition page.
     * @param name "Show Alert" or "Show Propmpt"
     */
    async showBtnClick(name: string): Promise<void> {
        await this.showAlertBtn(name).click();
    }

    async triggerHiddenText() {
        await this.triggerHiddenBtn.click();
        await this.appearedHiddenBtn.click();
    }

    async verifyHiddenText() {
        await expect(this.appearedHiddenText).toBeVisible();
    }

    async verifyShowAlertAccepted(): Promise<void> {
        await expect(this.confirmedAlert).toBeVisible();
    }

    async verifyShowPromptAccepted(): Promise<void> {
        await expect(this.confirmedPrompt).toBeVisible();
    }
}