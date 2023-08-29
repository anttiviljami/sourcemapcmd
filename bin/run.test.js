const { main } = require("./run");
const { rest } = require('msw')
const { setupServer } = require('msw/node')


describe("cli", () => {
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => null);
  const mockStderr = jest.spyOn(console, 'error').mockImplementation(() => null);
  const mockStdout = jest.spyOn(console, 'log').mockImplementation(() => null);

  test("should display help message with no arguments", async () => {
    // given
    const argv = ["node", "sourcemapcmd"];

    // when
    await main(argv);

    // then
    expect(mockExit).toHaveBeenCalledWith(1);
    expect(mockStderr).toHaveBeenCalledWith(expect.stringContaining("sourcemapcmd"));
  });

  test("--help should display help message", async () => {
    // given
    const argv = ["node", "sourcemapcmd", "--help"];

    // when
    await main(argv);

    // then
    expect(mockExit).toHaveBeenCalledWith(1);
    expect(mockStderr).toHaveBeenCalledWith(expect.stringContaining("sourcemapcmd"));
  });

  test("should print resolved position", async () => {
    // given
    const argv = ["node", "sourcemapcmd", "http://localhost:8080/bundle.js", "1:2"];

    const server = setupServer(
      rest.get('http://localhost:8080/bundle.js.map', (req, res, ctx) => {
        return res(ctx.json({
          version: 3,
          file: 'bundle.js',
          sources: ['webpack:///./src/index.js'],
          sourcesContent: ['console.log("Hello World!")'],
          mappings: 'AAAA,IAAI,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC',
          names: ['', '', 'console', 'log', 'Hello World!']
        }));
      }),
    );
    server.listen();

    // when
    await main(argv);

    // then
    expect(mockStdout).toHaveBeenCalledWith(JSON.stringify({
      source: 'webpack:///src/index.js',
      line: 1,
      column: 0,
      name: null,
    }, null, 2));
  });
});
