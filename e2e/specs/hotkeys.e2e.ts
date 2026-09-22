import { clearPersistedState, resetToFirstStage, wake } from "../support/app.ts";

/**
 * 最值钱的守卫。
 *
 * src/core/hotkeys.ts 顶部注释点名的现场最容易踩的坑：改辩题 / 改时长时，
 * 输入框里的空格、回车、字母被当成快捷键，计时器被误启停。
 * 规则是"焦点在可编辑元素里时单键快捷键一律屏蔽（Esc 例外）"。
 */
describe("输入态快捷键守卫", () => {
  beforeEach(async () => {
    await resetToFirstStage();
  });

  after(async () => {
    // 两个用例都改过辩题，清掉持久状态，下一次启动回到默认值
    await clearPersistedState();
  });

  it("焦点在辩题输入框里时按空格不会误启动计时", async () => {
    await browser.keys(["t"]); // 快捷键 T 打开辩题编辑
    const input = $("input");
    await input.waitForDisplayed();
    // 输入框不会自动聚焦，必须点一下——这也正是现场的真实操作顺序
    await input.click();
    await expect(input).toBeFocused();

    await browser.keys([" "]); // 关键一击
    await browser.pause(300);

    await wake();
    // 计时器仍是 idle：控制条上还是「开始」，没有变成「暂停」
    await expect($("button=开始")).toBeDisplayed();

    await browser.keys(["Escape"]);
    await browser.pause(200);
    await expect($("input")).not.toExist();
  });

  it("辩题可以编辑并提交", async () => {
    await browser.keys(["t"]);
    const input = $("input");
    await input.waitForDisplayed();
    await input.click();

    await input.clearValue();
    await input.addValue("e2e-topic");
    await browser.keys(["Enter"]); // 输入框自己吞掉 Enter 并提交

    await expect($("input")).not.toExist();
    await expect($("header button")).toHaveText("e2e-topic");
  });
});
