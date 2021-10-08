function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
}

describe("Test Windows Cert installation", function() {
    it("Test Windows Cert installation", async function() {
        this.timeout(360000)
        browser.url("https://enriquegh.com")
        await sleep(10000)
    })
})