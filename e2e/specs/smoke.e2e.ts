describe("冒烟：应用能起来", () => {
  it("渲染出主界面", async () => {
    await expect($("main")).toBeDisplayed();
  });

  it("窗口标题是「辩论计时器」", async () => {
    await expect(browser).toHaveTitle("辩论计时器");
  });
});
