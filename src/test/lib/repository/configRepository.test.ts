import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { ConfigRepository } from "../../../lib/repository/configRepository";
import { Config } from "../../../type/config";

suite("ConfigRepository Test Suite", () => {
  let configRepository: ConfigRepository;
  let tempDir: string;

  setup(() => {
    configRepository = new ConfigRepository();
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "ghost-pen-test-"));
  });

  teardown(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("hasGhostPenDirectory - ディレクトリが存在しない場合はfalseを返す", () => {
    const result = configRepository.hasGhostPenDirectory(tempDir);
    assert.strictEqual(result, false);
  });

  test("hasGhostPenDirectory - ディレクトリが存在する場合はtrueを返す", () => {
    const ghostPenPath = path.join(tempDir, ".ghost-pen");
    fs.mkdirSync(ghostPenPath);

    const result = configRepository.hasGhostPenDirectory(tempDir);
    assert.strictEqual(result, true);
  });

  test("hasConfigFile - ファイルが存在しない場合はfalseを返す", () => {
    const ghostPenPath = path.join(tempDir, ".ghost-pen");
    fs.mkdirSync(ghostPenPath);

    const result = configRepository.hasConfigFile(tempDir);
    assert.strictEqual(result, false);
  });

  test("hasConfigFile - ファイルが存在する場合はtrueを返す", () => {
    const ghostPenPath = path.join(tempDir, ".ghost-pen");
    const configPath = path.join(ghostPenPath, "config.json");
    fs.mkdirSync(ghostPenPath);
    fs.writeFileSync(configPath, "{}");

    const result = configRepository.hasConfigFile(tempDir);
    assert.strictEqual(result, true);
  });

  test("createGhostPenDirectory - .ghost-penディレクトリを作成する", () => {
    configRepository.createGhostPenDirectory(tempDir);

    const ghostPenPath = path.join(tempDir, ".ghost-pen");
    assert.strictEqual(fs.existsSync(ghostPenPath), true);
    assert.strictEqual(fs.statSync(ghostPenPath).isDirectory(), true);
  });

  test("createConfigFile - config.jsonファイルを作成する", () => {
    const config: Config = { configVersion: "0.0.1" };

    configRepository.createGhostPenDirectory(tempDir);
    configRepository.createConfigFile(tempDir, config);

    const configPath = path.join(tempDir, ".ghost-pen", "config.json");
    assert.strictEqual(fs.existsSync(configPath), true);

    const savedConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
    assert.deepStrictEqual(savedConfig, config);
  });

  test("readConfigFile - config.jsonファイルを読み取る", () => {
    const config: Config = { configVersion: "0.0.1" };

    configRepository.createGhostPenDirectory(tempDir);
    configRepository.createConfigFile(tempDir, config);

    const readConfig = configRepository.readConfigFile(tempDir);
    assert.deepStrictEqual(readConfig, config);
  });

  test("isInitialized - config.jsonが存在する場合はtrueを返す", () => {
    configRepository.createGhostPenDirectory(tempDir);
    const config: Config = { configVersion: "0.0.1" };
    configRepository.createConfigFile(tempDir, config);

    const result = configRepository.isInitialized(tempDir);

    assert.strictEqual(result, true);
  });

  test("isInitialized - 未初期化の場合はfalseを返す", () => {
    const result = configRepository.isInitialized(tempDir);

    assert.strictEqual(result, false);
  });

  test("createGhostPenDirectory - 既存ディレクトリがある場合でもエラーにならない", () => {
    const ghostPenPath = path.join(tempDir, ".ghost-pen");
    fs.mkdirSync(ghostPenPath);

    // エラーが発生しないことを確認
    assert.doesNotThrow(() => {
      configRepository.createGhostPenDirectory(tempDir);
    });

    assert.strictEqual(fs.existsSync(ghostPenPath), true);
    assert.strictEqual(fs.statSync(ghostPenPath).isDirectory(), true);
  });
});
